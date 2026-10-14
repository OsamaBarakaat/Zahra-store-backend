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
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const MOCK_ZONES = [
    { id: 'zone-1', governorate_name_ar: 'القاهرة', shipping_fee: 40, estimated_days: '1-2 أيام عمل', is_active: true },
    { id: 'zone-2', governorate_name_ar: 'الجيزة', shipping_fee: 40, estimated_days: '1-2 أيام عمل', is_active: true },
    { id: 'zone-3', governorate_name_ar: 'الإسكندرية', shipping_fee: 50, estimated_days: '2-3 أيام عمل', is_active: true },
    { id: 'zone-4', governorate_name_ar: 'القليوبية', shipping_fee: 45, estimated_days: '2-3 أيام عمل', is_active: true },
    { id: 'zone-5', governorate_name_ar: 'الدقهلية', shipping_fee: 55, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-6', governorate_name_ar: 'الغربية', shipping_fee: 55, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-7', governorate_name_ar: 'الشرقية', shipping_fee: 55, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-8', governorate_name_ar: 'المنوفية', shipping_fee: 55, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-9', governorate_name_ar: 'البحيرة', shipping_fee: 55, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-10', governorate_name_ar: 'كفر الشيخ', shipping_fee: 55, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-11', governorate_name_ar: 'دمياط', shipping_fee: 60, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-12', governorate_name_ar: 'بورسعيد', shipping_fee: 60, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-13', governorate_name_ar: 'الإسماعيلية', shipping_fee: 60, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-14', governorate_name_ar: 'السويس', shipping_fee: 60, estimated_days: '2-4 أيام عمل', is_active: true },
    { id: 'zone-15', governorate_name_ar: 'الفيوم', shipping_fee: 60, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-16', governorate_name_ar: 'بني سويف', shipping_fee: 65, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-17', governorate_name_ar: 'المنيا', shipping_fee: 65, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-18', governorate_name_ar: 'أسيوط', shipping_fee: 70, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-19', governorate_name_ar: 'سوهاج', shipping_fee: 70, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-20', governorate_name_ar: 'قنا', shipping_fee: 75, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-21', governorate_name_ar: 'الأقصر', shipping_fee: 75, estimated_days: '3-5 أيام عمل', is_active: true },
    { id: 'zone-22', governorate_name_ar: 'أسوان', shipping_fee: 80, estimated_days: '3-6 أيام عمل', is_active: true },
    { id: 'zone-23', governorate_name_ar: 'البحر الأحمر', shipping_fee: 85, estimated_days: '3-6 أيام عمل', is_active: true },
    { id: 'zone-24', governorate_name_ar: 'جنوب سيناء', shipping_fee: 85, estimated_days: '3-6 أيام عمل', is_active: true },
    { id: 'zone-25', governorate_name_ar: 'شمال سيناء', shipping_fee: 90, estimated_days: '4-7 أيام عمل', is_active: true },
    { id: 'zone-26', governorate_name_ar: 'مطروح', shipping_fee: 85, estimated_days: '3-6 أيام عمل', is_active: true },
    { id: 'zone-27', governorate_name_ar: 'الوادي الجديد', shipping_fee: 90, estimated_days: '4-7 أيام عمل', is_active: true },
];
let ShippingService = class ShippingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllZones() {
        if (this.prisma.isConnected) {
            try {
                const zones = await this.prisma.shippingZone.findMany({
                    orderBy: { governorate_name_ar: 'asc' },
                });
                return zones.map((z) => ({
                    id: z.id,
                    governorate_name_ar: z.governorate_name_ar,
                    shipping_fee: Number(z.shipping_fee),
                    estimated_days: z.estimated_days,
                    is_active: z.is_active,
                }));
            }
            catch (err) {
                console.warn('Prisma error in findAllZones:', err?.message);
            }
        }
        return MOCK_ZONES;
    }
    async getFeeForGovernorate(governorateName) {
        if (this.prisma.isConnected) {
            try {
                const zone = await this.prisma.shippingZone.findUnique({
                    where: { governorate_name_ar: governorateName },
                });
                if (zone) {
                    return {
                        fee: Number(zone.shipping_fee),
                        estimatedDays: zone.estimated_days,
                        zoneId: zone.id,
                    };
                }
            }
            catch (err) {
                console.warn('Prisma error looking up shipping zone:', err.message);
            }
        }
        const found = MOCK_ZONES.find((z) => z.governorate_name_ar === governorateName);
        if (found) {
            return { fee: found.shipping_fee, estimatedDays: found.estimated_days, zoneId: found.id };
        }
        return { fee: 50, estimatedDays: '2-4 أيام عمل' };
    }
    async updateZone(id, dto) {
        if (this.prisma.isConnected) {
            const updated = await this.prisma.shippingZone.update({
                where: { id },
                data: {
                    shipping_fee: dto.shipping_fee,
                    estimated_days: dto.estimated_days,
                    is_active: dto.is_active,
                },
            });
            return {
                id: updated.id,
                governorate_name_ar: updated.governorate_name_ar,
                shipping_fee: Number(updated.shipping_fee),
                estimated_days: updated.estimated_days,
                is_active: updated.is_active,
            };
        }
        const idx = MOCK_ZONES.findIndex((z) => z.id === id);
        if (idx !== -1) {
            MOCK_ZONES[idx] = { ...MOCK_ZONES[idx], ...dto };
            return MOCK_ZONES[idx];
        }
        throw new common_1.NotFoundException('منطقة الشحن غير موجودة');
    }
    async updateAllZones(items) {
        const results = [];
        for (const item of items) {
            if (!item.id)
                continue;
            try {
                const res = await this.updateZone(item.id, {
                    shipping_fee: item.shipping_fee,
                    estimated_days: item.estimated_days,
                    is_active: item.is_active,
                });
                results.push(res);
            }
            catch (err) {
                console.warn(`Failed to update zone ${item.id}:`, err?.message);
            }
        }
        return { success: true, count: results.length, zones: results };
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShippingService);
//# sourceMappingURL=shipping.service.js.map