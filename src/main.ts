import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const logger = new Logger('ZahraStoreBackend');

  // Ensure upload & public directories exist
  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const app = await NestFactory.create(AppModule);

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

  // Global API Prefix
  app.setGlobalPrefix('api', {
    exclude: ['admin', 'uploads'],
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
    customCss: `
      .swagger-ui .topbar { background-color: #be185d; }
      .swagger-ui .info .title { color: #831843; font-family: Cairo, Tahoma, sans-serif; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 خادم متجر زهرة يعمل الآن بنجاح على: http://localhost:${port}`);
  logger.log(`📚 توثيق Swagger التفاعلي متاح على: http://localhost:${port}/api/docs`);
  logger.log(`🎛️ لوحة تحكم المتجر (Admin Dashboard) متاحة على: http://localhost:${port}/admin`);
}

bootstrap();
