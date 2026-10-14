import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express, { Express, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { EMBEDDED_ADMIN_HTML } from './admin-html';

const server: Express = express();
let isAppInitialized = false;

export async function bootstrapApp(): Promise<Express> {
  if (!isAppInitialized) {
    // Ensure upload & public directories exist safely (avoid crash on read-only serverless filesystems)
    try {
      const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.resolve(process.cwd(), 'uploads');
      const publicDir = path.resolve(process.cwd(), 'public');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      if (!process.env.VERCEL && !fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    } catch {
      // Ignore read-only filesystem errors in serverless environments
    }

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    // Enable CORS for Next.js storefront & admin clients
    app.enableCors({
      origin: true,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Accept,Authorization,x-api-key,X-API-KEY',
    });

    // Global validation pipe with transformation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    // Serve HTML dashboard directly on Express for non-api routes with cache busting
    const serveAdminHtml = (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      const localHtmlPath = path.resolve(process.cwd(), 'public/index.html');
      if (fs.existsSync(localHtmlPath)) {
        return res.sendFile(localHtmlPath);
      }
      return res.send(EMBEDDED_ADMIN_HTML);
    };

    server.get('/', serveAdminHtml);
    server.get('/admin', serveAdminHtml);
    server.get('/index.html', serveAdminHtml);

    // Serve favicon and logo directly to ensure tab icon and navbar display properly and prevent loops
    server.get(['/favicon.ico', '/favicon.png'], (req, res) => {
      const faviconPath = path.resolve(process.cwd(), 'public/favicon.png');
      if (fs.existsSync(faviconPath)) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.sendFile(faviconPath);
      }
      const TRANSPARENT_PNG = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAA=',
        'base64',
      );
      res.setHeader('Content-Type', 'image/png');
      return res.send(TRANSPARENT_PNG);
    });

    server.get('/zahra-logo.png', (req, res) => {
      const logoPath = path.resolve(process.cwd(), 'public/zahra-logo.png');
      if (fs.existsSync(logoPath)) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.sendFile(logoPath);
      }
      return res.status(404).end();
    });


    // Global API Prefix for all REST controllers
    app.setGlobalPrefix('api', {
      exclude: ['uploads/(.*)'],
    });

    // Swagger OpenAPI Documentation
    const config = new DocumentBuilder()
      .setTitle('🌸 متجر زهرة (Zahra Store) API')
      .setDescription(
        'الواجهة البرمجية المتكاملة للـ Backend ولوحة التحكم لمتجر زهرة (NestJS, Supabase, Prisma ORM).\n\n' +
        'تشمل الموديولات: المنتجات والأقسام، السلة والطلبات، تدفق تفصيل كراسي السفرة العمولة، والمحافظات والشحن.',
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'أدخل توكن الـ JWT هنا لحماية مسارات الإدارة',
          in: 'header',
        },
        'JWT',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'توثيق واجهات متجر زهرة | Zahra Store API Docs',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
      ],
      customCss: `
        .swagger-ui .topbar { background-color: #be185d; }
        .swagger-ui .info .title { color: #831843; font-family: Cairo, Tahoma, sans-serif; }
      `,
    });

    await app.init();
    isAppInitialized = true;
  }
  return server;
}

// If running in local standalone node environment (not Vercel)
if (!process.env.VERCEL) {
  async function startStandalone() {
    const logger = new Logger('ZahraStoreBackend');
    const expressInstance = await bootstrapApp();
    const port = process.env.PORT || 3000;
    expressInstance.listen(port, () => {
      logger.log(`🚀 خادم متجر زهرة يعمل الآن بنجاح على: http://localhost:${port}`);
      logger.log(`📚 توثيق Swagger التفاعلي متاح على: http://localhost:${port}/api/docs`);
      logger.log(`🎛️ لوحة تحكم المتجر (Admin Dashboard) متاحة على: http://localhost:${port}/admin`);
    });
  }
  startStandalone();
}

// Export default serverless handler for Vercel
export default async function handler(req: Request, res: Response) {
  try {
    const expressInstance = await bootstrapApp();
    return expressInstance(req, res);
  } catch (err: any) {
    Logger.error('Vercel Handler Bootstrap Error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Bootstrap Error',
        message: err?.message || String(err),
        stack: err?.stack || undefined,
      });
    }
  }
}
