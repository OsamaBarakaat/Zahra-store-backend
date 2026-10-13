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
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Accept,Authorization',
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

    // Serve HTML dashboard directly on Express for non-api routes
    server.get(['/', '/admin', '/admin/{*path}', '/index.html'], (req, res) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(EMBEDDED_ADMIN_HTML);
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
  const expressInstance = await bootstrapApp();
  return expressInstance(req, res);
}
