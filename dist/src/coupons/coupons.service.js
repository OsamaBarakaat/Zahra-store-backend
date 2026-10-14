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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CouponsService = class CouponsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.coupon.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const coupon = await this.prisma.coupon.findFirst({
            where: {
                OR: [{ id }, { code: id.toUpperCase() }],
            },
        });
        if (!coupon) {
            throw new common_1.NotFoundException('كود الخصم غير موجود');
        }
        return coupon;
    }
    async create(dto) {
        const cleanCode = dto.code.trim().toUpperCase().replace(/\s+/g, '');
        const existing = await this.prisma.coupon.findUnique({
            where: { code: cleanCode },
        });
        if (existing) {
            throw new common_1.ConflictException(`كود الخصم "${cleanCode}" مسجل مسبقاً`);
        }
        const startDate = dto.start_date ? new Date(dto.start_date) : new Date();
        const endDate = dto.end_date ? new Date(dto.end_date) : null;
        if (endDate && endDate <= startDate) {
            throw new common_1.BadRequestException('تاريخ انتهاء الصلاحية يجب أن يكون بعد تاريخ البدء');
        }
        return this.prisma.coupon.create({
            data: {
                code: cleanCode,
                discount_type: dto.discount_type,
                discount_value: dto.discount_value,
                min_order_amount: dto.min_order_amount ?? null,
                max_discount_amount: dto.max_discount_amount ?? null,
                start_date: startDate,
                end_date: endDate,
                usage_limit: dto.usage_limit ?? null,
                is_active: dto.is_active ?? true,
            },
        });
    }
    async update(id, dto) {
        const coupon = await this.findOne(id);
        const startDate = dto.start_date
            ? new Date(dto.start_date)
            : coupon.start_date;
        const endDate = dto.end_date !== undefined
            ? (dto.end_date ? new Date(dto.end_date) : null)
            : coupon.end_date;
        if (startDate && endDate && endDate <= startDate) {
            throw new common_1.BadRequestException('تاريخ انتهاء الصلاحية يجب أن يكون بعد تاريخ البدء');
        }
        return this.prisma.coupon.update({
            where: { id: coupon.id },
            data: {
                ...(dto.discount_type && { discount_type: dto.discount_type }),
                ...(dto.discount_value !== undefined && { discount_value: dto.discount_value }),
                ...(dto.min_order_amount !== undefined && { min_order_amount: dto.min_order_amount }),
                ...(dto.max_discount_amount !== undefined && { max_discount_amount: dto.max_discount_amount }),
                ...(dto.start_date !== undefined && { start_date: startDate }),
                ...(dto.end_date !== undefined && { end_date: endDate }),
                ...(dto.usage_limit !== undefined && { usage_limit: dto.usage_limit }),
                ...(dto.is_active !== undefined && { is_active: dto.is_active }),
            },
        });
    }
    async toggleActive(id) {
        const coupon = await this.findOne(id);
        return this.prisma.coupon.update({
            where: { id: coupon.id },
            data: { is_active: !coupon.is_active },
        });
    }
    async delete(id) {
        const coupon = await this.findOne(id);
        await this.prisma.coupon.delete({
            where: { id: coupon.id },
        });
        return { success: true, message: 'تم حذف كود الخصم بنجاح' };
    }
    async validateCoupon(dto) {
        const cleanCode = (dto.code || '').trim().toUpperCase();
        if (!cleanCode) {
            throw new common_1.BadRequestException('يرجى كتابة كود الخصم');
        }
        const coupon = await this.prisma.coupon.findUnique({
            where: { code: cleanCode },
        });
        if (!coupon) {
            throw new common_1.BadRequestException('كود الخصم المدخل غير صحيح أو غير موجود');
        }
        if (!coupon.is_active) {
            throw new common_1.BadRequestException('كود الخصم غير مفعّل حالياً');
        }
        const now = new Date();
        if (coupon.start_date && new Date(coupon.start_date) > now) {
            throw new common_1.BadRequestException('كود الخصم لم يبدأ تفعيله بعد');
        }
        if (coupon.end_date && new Date(coupon.end_date) < now) {
            throw new common_1.BadRequestException('عذراً، انتهت صلاحية كود الخصم');
        }
        if (coupon.usage_limit !== null && coupon.used_count >= coupon.usage_limit) {
            throw new common_1.BadRequestException('عذراً، تم استنفاذ الحد الأقصى لاستخدام كود الخصم');
        }
        const subtotal = Number(dto.subtotal || 0);
        if (coupon.min_order_amount !== null && subtotal < Number(coupon.min_order_amount)) {
            throw new common_1.BadRequestException(`الحد الأدنى لقيمة المشتريات لاستخدام هذا الكود هو ${Number(coupon.min_order_amount)} ج.م`);
        }
        let discountAmount = 0;
        const discountVal = Number(coupon.discount_value);
        if (coupon.discount_type === 'percentage') {
            discountAmount = (subtotal * discountVal) / 100;
            if (coupon.max_discount_amount !== null && discountAmount > Number(coupon.max_discount_amount)) {
                discountAmount = Number(coupon.max_discount_amount);
            }
        }
        else {
            discountAmount = Math.min(discountVal, subtotal);
        }
        discountAmount = Math.round(discountAmount * 100) / 100;
        return {
            valid: true,
            code: coupon.code,
            discountType: coupon.discount_type,
            discountValue: discountVal,
            discountAmount,
            minOrderAmount: coupon.min_order_amount ? Number(coupon.min_order_amount) : 0,
            maxDiscountAmount: coupon.max_discount_amount ? Number(coupon.max_discount_amount) : null,
            message: `تم تطبيق كود الخصم بنجاح! خصم بقيمة ${discountAmount} ج.م`,
        };
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map