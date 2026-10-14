import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // 1. Check for Storefront API Key (via header or token)
    const storefrontKey = this.configService.get<string>(
      'STOREFRONT_API_KEY',
      'zahra-storefront-key-2026',
    );
    const apiKey = request.headers['x-api-key'] || request.headers['x-storefront-key'];

    if (!authHeader && !apiKey) {
      throw new UnauthorizedException('يجب تسجيل الدخول أو إرسال API Key للوصول إلى هذا الرابط');
    }

    // Direct Storefront API Key header
    if (apiKey && apiKey === storefrontKey) {
      request.user = {
        sub: 'storefront',
        role: 'STOREFRONT',
        permissions: ['products', 'categories', 'shipping', 'orders', 'custom_chairs'],
      };
      return true;
    }

    if (!authHeader) {
      throw new UnauthorizedException('يجب تسجيل الدخول للوصول إلى هذا الرابط (Authorization Token مطلوب)');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('صيغة التوكن غير صحيحة');
    }

    // Bearer token matches Storefront key
    if (token === storefrontKey) {
      request.user = {
        sub: 'storefront',
        role: 'STOREFRONT',
        permissions: ['products', 'categories', 'shipping', 'orders', 'custom_chairs'],
      };
      return true;
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET', 'zahra-store-secret-super-key-2026-change-in-production');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('التوكن غير صالح أو منتهي الصلاحية');
    }
  }
}
