"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapApp = bootstrapApp;
exports.default = handler;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const admin_html_1 = require("./admin-html");
const server = (0, express_1.default)();
let isAppInitialized = false;
async function bootstrapApp() {
    if (!isAppInitialized) {
        try {
            const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.resolve(process.cwd(), 'uploads');
            const publicDir = path.resolve(process.cwd(), 'public');
            if (!fs.existsSync(uploadsDir))
                fs.mkdirSync(uploadsDir, { recursive: true });
            if (!process.env.VERCEL && !fs.existsSync(publicDir))
                fs.mkdirSync(publicDir, { recursive: true });
        }
        catch {
        }
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.enableCors({
            origin: '*',
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type,Accept,Authorization',
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: false,
            transformOptions: { enableImplicitConversion: true },
        }));
        server.get(['/', '/admin', '/admin/{*path}', '/index.html'], (req, res) => {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.send(admin_html_1.EMBEDDED_ADMIN_HTML);
        });
        app.setGlobalPrefix('api', {
            exclude: ['uploads/(.*)'],
        });
        const config = new swagger_1.DocumentBuilder()
            .setTitle('🌸 متجر زهرة (Zahra Store) API')
            .setDescription('الواجهة البرمجية المتكاملة للـ Backend ولوحة التحكم لمتجر زهرة (NestJS, Supabase, Prisma ORM).\n\n' +
            'تشمل الموديولات: المنتجات والأقسام، السلة والطلبات، تدفق تفصيل كراسي السفرة العمولة، والمحافظات والشحن.')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'أدخل توكن الـ JWT هنا لحماية مسارات الإدارة',
            in: 'header',
        }, 'JWT')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
if (!process.env.VERCEL) {
    async function startStandalone() {
        const logger = new common_1.Logger('ZahraStoreBackend');
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
async function handler(req, res) {
    const expressInstance = await bootstrapApp();
    return expressInstance(req, res);
}
//# sourceMappingURL=main.js.map