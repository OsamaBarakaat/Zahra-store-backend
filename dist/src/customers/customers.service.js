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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomersService = class CustomersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search) {
        if (this.prisma.isConnected) {
            try {
                const where = {};
                if (search) {
                    where.OR = [
                        { full_name: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search } },
                        { city: { contains: search, mode: 'insensitive' } },
                        { governorate: { contains: search, mode: 'insensitive' } },
                    ];
                }
                const customers = await this.prisma.customer.findMany({
                    where,
                    orderBy: { created_at: 'desc' },
                });
                if (customers.length > 0) {
                    return customers.map((c) => ({
                        id: c.id,
                        name: c.full_name,
                        phone: c.phone,
                        email: c.email || '',
                        governorate: c.governorate || '',
                        city: c.city || '',
                        street_address: c.street_address || '',
                        notes: c.notes || '',
                        totalSpend: Number(c.total_spent),
                        totalOrders: c.orders_count,
                        created_at: c.created_at,
                    }));
                }
            }
            catch (err) {
                console.warn('Prisma error in CustomersService.findAll:', err.message);
            }
        }
        return [];
    }
    async findOne(id) {
        if (this.prisma.isConnected) {
            const c = await this.prisma.customer.findUnique({ where: { id } });
            if (c) {
                const orders = await this.prisma.order.findMany({
                    where: { customer_phone: c.phone },
                    include: { items: true },
                    orderBy: { created_at: 'desc' },
                });
                return {
                    id: c.id,
                    name: c.full_name,
                    phone: c.phone,
                    email: c.email || '',
                    governorate: c.governorate || '',
                    city: c.city || '',
                    street_address: c.street_address || '',
                    notes: c.notes || '',
                    totalSpend: Number(c.total_spent),
                    totalOrders: c.orders_count,
                    created_at: c.created_at,
                    orders,
                };
            }
        }
        throw new common_1.NotFoundException('العميل غير موجود');
    }
    async create(dto) {
        if (this.prisma.isConnected) {
            const existing = await this.prisma.customer.findUnique({
                where: { phone: dto.phone },
            });
            if (existing) {
                throw new common_1.ConflictException('رقم الهاتف مسجل بالفعل لعميل آخر');
            }
            const created = await this.prisma.customer.create({
                data: {
                    full_name: dto.name,
                    phone: dto.phone,
                    email: dto.email,
                    governorate: dto.governorate,
                    city: dto.city,
                    street_address: dto.street_address,
                    notes: dto.notes,
                },
            });
            return {
                id: created.id,
                name: created.full_name,
                phone: created.phone,
                email: created.email || '',
                governorate: created.governorate || '',
                city: created.city || '',
                street_address: created.street_address || '',
                notes: created.notes || '',
                totalSpend: 0,
                totalOrders: 0,
            };
        }
        return { id: `cust-${Date.now()}`, ...dto, totalSpend: 0, totalOrders: 0 };
    }
    async update(id, dto) {
        if (this.prisma.isConnected) {
            const updated = await this.prisma.customer.update({
                where: { id },
                data: {
                    full_name: dto.name,
                    phone: dto.phone,
                    email: dto.email,
                    governorate: dto.governorate,
                    city: dto.city,
                    street_address: dto.street_address,
                    notes: dto.notes,
                },
            });
            return {
                id: updated.id,
                name: updated.full_name,
                phone: updated.phone,
                email: updated.email || '',
                governorate: updated.governorate || '',
                city: updated.city || '',
                street_address: updated.street_address || '',
                notes: updated.notes || '',
                totalSpend: Number(updated.total_spent),
                totalOrders: updated.orders_count,
            };
        }
        throw new common_1.NotFoundException('العميل غير موجود');
    }
    async delete(id) {
        if (this.prisma.isConnected) {
            return this.prisma.customer.delete({
                where: { id },
            });
        }
        return { success: true };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map