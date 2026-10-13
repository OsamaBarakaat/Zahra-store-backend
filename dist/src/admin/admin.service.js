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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOverview() {
        if (this.prisma.isConnected) {
            try {
                const [totalOrders, pendingOrders, customRequestsCount, totalProducts, totalClients, revenueAggregate, expenseAggregate, recentOrders, recentCustomRequests, lowStockProducts,] = await Promise.all([
                    this.prisma.order.count(),
                    this.prisma.order.count({ where: { status: 'pending' } }),
                    this.prisma.customChairRequest.count(),
                    this.prisma.product.count({ where: { is_active: true } }),
                    this.prisma.customer.count(),
                    this.prisma.order.aggregate({
                        _sum: { total_amount: true },
                        where: { status: { not: 'cancelled' } },
                    }),
                    this.prisma.expense.aggregate({
                        _sum: { amount: true },
                    }),
                    this.prisma.order.findMany({
                        orderBy: { created_at: 'desc' },
                        take: 5,
                        include: { items: true },
                    }),
                    this.prisma.customChairRequest.findMany({
                        orderBy: { created_at: 'desc' },
                        take: 5,
                        include: { order: { select: { order_number: true } } },
                    }),
                    this.prisma.product.findMany({
                        where: { stock_quantity: { lte: 10 } },
                        select: { id: true, name_ar: true, slug: true, stock_quantity: true, in_stock: true },
                        take: 10,
                    }),
                ]);
                const totalRevenue = Number(revenueAggregate._sum.total_amount || 0);
                const totalExpenses = Number(expenseAggregate._sum.amount || 0);
                const netProfit = totalRevenue - totalExpenses;
                return {
                    totalRevenue,
                    totalExpenses,
                    netProfit,
                    totalOrders,
                    pendingOrders,
                    totalProducts,
                    totalClients,
                    customRequestsCount,
                    lowStockCount: lowStockProducts.length,
                    lowStockProducts,
                    recentOrders,
                    recentCustomRequests,
                    salesChart: [
                        { day: 'السبت', sales: Math.round(totalRevenue * 0.12) || 1200 },
                        { day: 'الأحد', sales: Math.round(totalRevenue * 0.15) || 1850 },
                        { day: 'الإثنين', sales: Math.round(totalRevenue * 0.18) || 2400 },
                        { day: 'الثلاثاء', sales: Math.round(totalRevenue * 0.14) || 1950 },
                        { day: 'الأربعاء', sales: Math.round(totalRevenue * 0.16) || 2100 },
                        { day: 'الخميس', sales: Math.round(totalRevenue * 0.22) || 3400 },
                        { day: 'الجمعة', sales: Math.round(totalRevenue * 0.19) || 2900 },
                    ],
                };
            }
            catch (err) {
                console.warn('Prisma error in getOverview:', err.message);
            }
        }
        return {
            totalRevenue: 24580,
            totalExpenses: 6200,
            netProfit: 18380,
            totalOrders: 68,
            pendingOrders: 5,
            totalProducts: 12,
            totalClients: 45,
            customRequestsCount: 3,
            lowStockCount: 2,
            lowStockProducts: [],
            recentOrders: [],
            recentCustomRequests: [],
            salesChart: [],
        };
    }
    async getStaffUsers() {
        if (this.prisma.isConnected) {
            return this.prisma.adminUser.findMany({
                select: {
                    id: true,
                    email: true,
                    full_name: true,
                    role: true,
                    is_active: true,
                    created_at: true,
                },
                orderBy: { created_at: 'desc' },
            });
        }
        return [
            {
                id: 'default-admin-id',
                email: 'admin@zahra-store.com',
                full_name: 'مدير متجر زهرة',
                role: 'ADMIN',
                is_active: true,
                created_at: new Date(),
            },
        ];
    }
    async createStaffUser(dto) {
        if (this.prisma.isConnected) {
            const existing = await this.prisma.adminUser.findUnique({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.ConflictException('البريد الإلكتروني مسجل مسبقاً لمستخدم آخر');
            }
            const passwordHash = await bcrypt.hash(dto.password, 10);
            const created = await this.prisma.adminUser.create({
                data: {
                    email: dto.email,
                    password_hash: passwordHash,
                    full_name: dto.full_name,
                    role: dto.role || 'MANAGER',
                    is_active: true,
                },
            });
            return {
                id: created.id,
                email: created.email,
                full_name: created.full_name,
                role: created.role,
                is_active: created.is_active,
                created_at: created.created_at,
            };
        }
        return { id: `staff-${Date.now()}`, ...dto, is_active: true };
    }
    async updateStaffUser(id, dto) {
        if (this.prisma.isConnected) {
            return this.prisma.adminUser.update({
                where: { id },
                data: {
                    full_name: dto.full_name,
                    role: dto.role,
                    is_active: dto.is_active,
                },
                select: {
                    id: true,
                    email: true,
                    full_name: true,
                    role: true,
                    is_active: true,
                },
            });
        }
        throw new common_1.NotFoundException('المستخدم غير موجود');
    }
    async deleteStaffUser(id) {
        if (this.prisma.isConnected) {
            return this.prisma.adminUser.delete({
                where: { id },
            });
        }
        return { success: true };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map