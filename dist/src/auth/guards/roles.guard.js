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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
const DEFAULT_ROLE_PERMS = {
    ADMIN: ['overview', 'products', 'categories', 'orders', 'custom_chairs', 'customers', 'expenses', 'shipping', 'staff'],
    MANAGER: ['overview', 'products', 'categories', 'orders', 'custom_chairs', 'customers', 'shipping'],
    SUPPORT: ['overview', 'orders', 'custom_chairs'],
};
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const { user } = req;
        if (!user || !user.role) {
            throw new common_1.ForbiddenException('ليس لديك الصلاحيات الكافية للوصول إلى هذا الإجراء');
        }
        if (user.role === 'ADMIN') {
            return true;
        }
        if (requiredRoles.includes(user.role)) {
            return true;
        }
        const path = (req.route?.path || req.url || '').toLowerCase();
        const method = (req.method || 'GET').toUpperCase();
        if (user.role === 'STOREFRONT') {
            if (method === 'GET' && (path.includes('product') || path.includes('categor') || path.includes('shipping') || path.includes('search'))) {
                return true;
            }
            if (method === 'POST' && (path.includes('orders') || path.includes('chair'))) {
                return true;
            }
            throw new common_1.ForbiddenException('صلاحية مفتاح المتجر تقتصر على تصفح المنتجات وتقديم الطلبات فقط');
        }
        const perms = Array.isArray(user.permissions) && user.permissions.length > 0
            ? user.permissions
            : DEFAULT_ROLE_PERMS[user.role] || [];
        if (path.includes('order') && perms.includes('orders'))
            return true;
        if (path.includes('chair') && perms.includes('custom_chairs'))
            return true;
        if (path.includes('product') && perms.includes('products'))
            return true;
        if (path.includes('categor') && perms.includes('categories'))
            return true;
        if ((path.includes('storage') || path.includes('upload')) && (perms.includes('products') || perms.includes('categories')))
            return true;
        if (path.includes('customer') && perms.includes('customers'))
            return true;
        if (path.includes('expense') && perms.includes('expenses'))
            return true;
        if (path.includes('shipping') && perms.includes('shipping'))
            return true;
        if (path.includes('admin/users') && perms.includes('staff'))
            return true;
        if (path.includes('admin/overview') && perms.includes('overview'))
            return true;
        throw new common_1.ForbiddenException(`يتطلب هذا الإجراء صلاحيات: ${requiredRoles.join(', ')}`);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map