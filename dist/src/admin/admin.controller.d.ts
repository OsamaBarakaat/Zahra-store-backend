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
        totalCategories: number;
        totalClients: number;
        totalStaff: number;
        customRequestsCount: number;
        lowStockCount: number;
        lowStockProducts: {
            id: string;
            name_ar: string;
            slug: string;
            in_stock: boolean;
            stock_quantity: number;
        }[];
        recentOrders: ({
            items: {
                id: string;
                product_id: string | null;
                quantity: number;
                product_name: string;
                product_image: string | null;
                selected_variants: string | null;
                custom_chair_image: string | null;
                custom_notes: string | null;
                unit_price: import("@prisma/client/runtime/library").Decimal;
                total_price: import("@prisma/client/runtime/library").Decimal;
                order_id: string;
            }[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            discount: import("@prisma/client/runtime/library").Decimal;
            governorate: string;
            city: string;
            apartment: string | null;
            notes: string | null;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            status: string;
            order_number: string;
            customer_name: string;
            customer_phone: string;
            customer_alternate_phone: string | null;
            customer_email: string | null;
            street_address: string;
            shipping_cost: import("@prisma/client/runtime/library").Decimal;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            payment_method: string;
            payment_reference: string | null;
            estimated_delivery: string | null;
            shipping_zone_id: string | null;
        })[];
        recentCustomRequests: ({
            order: {
                order_number: string;
            } | null;
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            status: string;
            customer_name: string;
            customer_phone: string;
            order_id: string | null;
            chair_type: string;
            fabric_color: string;
            pattern_type: string;
            chairs_count: number;
            uploaded_photo_url: string;
            custom_extra_fee: import("@prisma/client/runtime/library").Decimal;
            admin_notes: string | null;
            order_item_id: string | null;
        })[];
        salesChart: {
            day: string;
            sales: number;
        }[];
    }>;
    getStaffUsers(): Promise<{
        email: string;
        full_name: string;
        role: string;
        id: string;
        permissions: string[];
        is_active: boolean;
        created_at: Date;
    }[]>;
    createStaffUser(dto: {
        email: string;
        password: string;
        full_name: string;
        role: string;
        permissions?: string[];
    }): Promise<{
        id: string;
        email: string;
        full_name: string;
        role: string;
        permissions: string[];
        is_active: boolean;
        created_at: Date;
    } | {
        permissions: string[];
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
        permissions?: string[];
        is_active?: boolean;
        password?: string;
    }): Promise<{
        email: string;
        full_name: string;
        role: string;
        id: string;
        permissions: string[];
        is_active: boolean;
    }>;
    deleteStaffUser(id: string): Promise<{
        email: string;
        full_name: string;
        role: string;
        id: string;
        password_hash: string;
        permissions: string[];
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    } | {
        success: boolean;
    }>;
}
