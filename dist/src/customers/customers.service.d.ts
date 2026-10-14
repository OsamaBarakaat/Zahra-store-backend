import { PrismaService } from '../prisma/prisma.service';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string;
        governorate: string;
        city: string;
        street_address: string;
        notes: string;
        totalSpend: number;
        totalOrders: number;
        created_at: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string;
        governorate: string;
        city: string;
        street_address: string;
        notes: string;
        totalSpend: number;
        totalOrders: number;
        created_at: Date;
        orders: ({
            items: {
                id: string;
                product_id: string | null;
                product_name: string;
                product_image: string | null;
                selected_variants: string | null;
                custom_chair_image: string | null;
                custom_notes: string | null;
                quantity: number;
                unit_price: import("@prisma/client/runtime/library").Decimal;
                total_price: import("@prisma/client/runtime/library").Decimal;
                order_id: string;
            }[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            order_number: string;
            customer_name: string;
            customer_phone: string;
            customer_alternate_phone: string | null;
            customer_email: string | null;
            shipping_zone_id: string | null;
            governorate: string;
            city: string;
            street_address: string;
            apartment: string | null;
            notes: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            shipping_cost: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            shipping_discount: import("@prisma/client/runtime/library").Decimal;
            coupon_code: string | null;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_method: string;
            payment_reference: string | null;
            status: string;
            estimated_delivery: string | null;
        })[];
    }>;
    create(dto: {
        name: string;
        phone: string;
        email?: string;
        governorate?: string;
        city?: string;
        street_address?: string;
        notes?: string;
    }): Promise<{
        totalSpend: number;
        totalOrders: number;
        name: string;
        phone: string;
        email?: string;
        governorate?: string;
        city?: string;
        street_address?: string;
        notes?: string;
        id: string;
    }>;
    update(id: string, dto: {
        name?: string;
        phone?: string;
        email?: string;
        governorate?: string;
        city?: string;
        street_address?: string;
        notes?: string;
    }): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string;
        governorate: string;
        city: string;
        street_address: string;
        notes: string;
        totalSpend: number;
        totalOrders: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        email: string | null;
        full_name: string;
        governorate: string | null;
        city: string | null;
        street_address: string | null;
        notes: string | null;
        phone: string;
        total_spent: import("@prisma/client/runtime/library").Decimal;
        orders_count: number;
    } | {
        success: boolean;
    }>;
}
