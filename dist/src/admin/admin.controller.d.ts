import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getOverview(): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        netProfit: number;
        totalOrders: number;
        pendingOrders: number;
        totalProducts: number;
        totalClients: number;
        customRequestsCount: number;
        lowStockCount: number;
        lowStockProducts: {
            id: string;
            slug: string;
            name_ar: string;
            in_stock: boolean;
            stock_quantity: number;
        }[];
        recentOrders: ({
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
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_method: string;
            payment_reference: string | null;
            status: string;
            estimated_delivery: string | null;
        })[];
        recentCustomRequests: ({
            order: {
                order_number: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            customer_name: string;
            customer_phone: string;
            status: string;
            chair_type: string;
            fabric_color: string;
            pattern_type: string;
            chairs_count: number;
            uploaded_photo_url: string;
            custom_extra_fee: import("@prisma/client/runtime/library").Decimal;
            admin_notes: string | null;
            order_id: string | null;
            order_item_id: string | null;
        })[];
        salesChart: {
            day: string;
            sales: number;
        }[];
    }>;
    getStaffUsers(): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        email: string;
        full_name: string;
        role: string;
    }[]>;
    createStaffUser(dto: {
        email: string;
        password: string;
        full_name: string;
        role: string;
    }): Promise<{
        id: string;
        email: string;
        full_name: string;
        role: string;
        is_active: boolean;
        created_at: Date;
    } | {
        is_active: boolean;
        email: string;
        password: string;
        full_name: string;
        role: string;
        id: string;
        created_at?: undefined;
    }>;
    updateStaffUser(id: string, dto: {
        full_name?: string;
        role?: string;
        is_active?: boolean;
    }): Promise<{
        id: string;
        is_active: boolean;
        email: string;
        full_name: string;
        role: string;
    }>;
    deleteStaffUser(id: string): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        email: string;
        password_hash: string;
        full_name: string;
        role: string;
    } | {
        success: boolean;
    }>;
}
