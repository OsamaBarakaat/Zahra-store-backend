"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const storefrontKey = this.configService.get('STOREFRONT_API_KEY', 'zahra-storefront-key-2026');
        const apiKey = request.headers['x-api-key'] || request.headers['x-storefront-key'];
        if (!authHeader && !apiKey) {
            throw new common_1.UnauthorizedException('يجب تسجيل الدخول أو إرسال API Key للوصول إلى هذا الرابط');
        }
        if (apiKey && apiKey === storefrontKey) {
            request.user = {
                sub: 'storefront',
                role: 'STOREFRONT',
                permissions: ['products', 'categories', 'shipping', 'orders', 'custom_chairs'],
            };
            return true;
        }
        if (!authHeader) {
            throw new common_1.UnauthorizedException('يجب تسجيل الدخول للوصول إلى هذا الرابط (Authorization Token مطلوب)');
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('صيغة التوكن غير صحيحة');
        }
        if (token === storefrontKey) {
            request.user = {
                sub: 'storefront',
                role: 'STOREFRONT',
                permissions: ['products', 'categories', 'shipping', 'orders', 'custom_chairs'],
            };
            return true;
        }
        try {
            const secret = this.configService.get('JWT_SECRET', 'zahra-store-secret-super-key-2026-change-in-production');
            const payload = await this.jwtService.verifyAsync(token, { secret });
            request.user = payload;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('التوكن غير صالح أو منتهي الصلاحية');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map