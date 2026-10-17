import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

const DEFAULT_ROLE_PERMS: Record<string, string[]> = {
  ADMIN: ['overview', 'products', 'categories', 'orders', 'custom_chairs', 'customers', 'expenses', 'shipping', 'staff'],
  MANAGER: ['overview', 'products', 'categories', 'orders', 'custom_chairs', 'customers', 'shipping'],
  SUPPORT: ['overview', 'orders', 'custom_chairs'],
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { user } = req;
    if (!user || !user.role) {
      throw new ForbiddenException('ليس لديك الصلاحيات الكافية للوصول إلى هذا الإجراء');
    }

    // ADMIN has full unrestricted access
    if (user.role === 'ADMIN') {
      return true;
    }

    // Direct role match
    if (requiredRoles.includes(user.role)) {
      return true;
    }

    const path: string = (req.route?.path || req.url || '').toLowerCase();
    const method: string = (req.method || 'GET').toUpperCase();

    // STOREFRONT role is only allowed for customer browsing and ordering
    if (user.role === 'STOREFRONT') {
      if (method === 'GET' && (path.includes('product') || path.includes('categor') || path.includes('shipping') || path.includes('search'))) {
        return true;
      }
      if (method === 'POST' && (path.includes('orders') || path.includes('chair'))) {
        return true;
      }
      throw new ForbiddenException('صلاحية مفتاح المتجر تقتصر على تصفح المنتجات وتقديم الطلبات فقط');
    }

    // Dynamic Permission check
    const perms: string[] =
      Array.isArray(user.permissions) && user.permissions.length > 0
        ? user.permissions
        : DEFAULT_ROLE_PERMS[user.role] || [];

    if (path.includes('order') && perms.includes('orders')) return true;
    if (path.includes('chair') && perms.includes('custom_chairs')) return true;
    if (path.includes('product') && perms.includes('products')) return true;
    if (path.includes('categor') && perms.includes('categories')) return true;
    if ((path.includes('storage') || path.includes('upload')) && (perms.includes('products') || perms.includes('categories'))) return true;
    if (path.includes('customer') && perms.includes('customers')) return true;
    if (path.includes('expense') && perms.includes('expenses')) return true;
    if (path.includes('shipping') && perms.includes('shipping')) return true;
    if (path.includes('admin/users') && perms.includes('staff')) return true;
    if (path.includes('admin/overview') && perms.includes('overview')) return true;

    throw new ForbiddenException(`يتطلب هذا الإجراء صلاحيات: ${requiredRoles.join(', ')}`);
  }
}
