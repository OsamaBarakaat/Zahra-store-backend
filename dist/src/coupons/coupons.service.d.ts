import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/create-coupon.dto';
import { ValidateCouponDto } from './dto/validate-coupon.dto';
export declare class CouponsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        code: string;
        discount_type: string;
        discount_value: import("@prisma/client/runtime/library").Decimal;
        min_order_amount: import("@prisma/client/runtime/library").Decimal | null;
        max_discount_amount: import("@prisma/client/runtime/library").Decimal | null;
        start_date: Date;
        end_date: Date | null;
        usage_limit: number | null;
        used_count: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        code: string;
        discount_type: string;
        discount_value: import("@prisma/client/runtime/library").Decimal;
        min_order_amount: import("@prisma/client/runtime/library").Decimal | null;
        max_discount_amount: import("@prisma/client/runtime/library").Decimal | null;
        start_date: Date;
        end_date: Date | null;
        usage_limit: number | null;
        used_count: number;
    }>;
    create(dto: CreateCouponDto): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        code: string;
        discount_type: string;
        discount_value: import("@prisma/client/runtime/library").Decimal;
        min_order_amount: import("@prisma/client/runtime/library").Decimal | null;
        max_discount_amount: import("@prisma/client/runtime/library").Decimal | null;
        start_date: Date;
        end_date: Date | null;
        usage_limit: number | null;
        used_count: number;
    }>;
    update(id: string, dto: UpdateCouponDto): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        code: string;
        discount_type: string;
        discount_value: import("@prisma/client/runtime/library").Decimal;
        min_order_amount: import("@prisma/client/runtime/library").Decimal | null;
        max_discount_amount: import("@prisma/client/runtime/library").Decimal | null;
        start_date: Date;
        end_date: Date | null;
        usage_limit: number | null;
        used_count: number;
    }>;
    toggleActive(id: string): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        code: string;
        discount_type: string;
        discount_value: import("@prisma/client/runtime/library").Decimal;
        min_order_amount: import("@prisma/client/runtime/library").Decimal | null;
        max_discount_amount: import("@prisma/client/runtime/library").Decimal | null;
        start_date: Date;
        end_date: Date | null;
        usage_limit: number | null;
        used_count: number;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    validateCoupon(dto: ValidateCouponDto): Promise<{
        valid: boolean;
        code: string;
        discountType: string;
        discountValue: number;
        discountAmount: number;
        minOrderAmount: number;
        maxDiscountAmount: number | null;
        message: string;
    }>;
}
