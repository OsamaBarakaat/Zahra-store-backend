import { ChairCustomService } from './chair-custom.service';
import { CreateChairCustomDto } from './dto/create-chair-custom.dto';
import { QueryChairCustomDto } from './dto/query-chair-custom.dto';
import { UpdateChairCustomStatusDto } from './dto/update-chair-custom-status.dto';
export declare class ChairCustomController {
    private readonly chairCustomService;
    constructor(chairCustomService: ChairCustomService);
    uploadPhoto(file: Express.Multer.File): Promise<{
        url: string;
        fileName: string;
    }>;
    create(createDto: CreateChairCustomDto): Promise<any>;
    findAll(query: QueryChairCustomDto): Promise<{
        custom_extra_fee: number;
        whatsapp_link: string;
        order: {
            created_at: Date;
            order_number: string;
            governorate: string;
            city: string;
            total_amount: import("@prisma/client/runtime/library").Decimal;
        } | null;
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
        admin_notes: string | null;
        order_id: string | null;
        order_item_id: string | null;
    }[] | {
        whatsapp_link: string;
        id: string;
        order_id: string;
        customer_name: string;
        customer_phone: string;
        chair_type: string;
        fabric_color: string;
        pattern_type: string;
        chairs_count: number;
        uploaded_photo_url: string;
        custom_extra_fee: number;
        status: string;
        admin_notes: string;
        created_at: string;
        order: {
            order_number: string;
        };
    }[]>;
    findOne(id: string): Promise<{
        custom_extra_fee: number;
        whatsapp_link: string;
        order: ({
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
        }) | null;
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
        admin_notes: string | null;
        order_id: string | null;
        order_item_id: string | null;
    } | {
        whatsapp_link: string;
        id: string;
        order_id: string;
        customer_name: string;
        customer_phone: string;
        chair_type: string;
        fabric_color: string;
        pattern_type: string;
        chairs_count: number;
        uploaded_photo_url: string;
        custom_extra_fee: number;
        status: string;
        admin_notes: string;
        created_at: string;
        order: {
            order_number: string;
        };
    }>;
    updateStatus(id: string, updateDto: UpdateChairCustomStatusDto): Promise<{
        custom_extra_fee: number;
        whatsapp_link: string;
        order: {
            order_number: string;
        } | null;
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
        admin_notes: string | null;
        order_id: string | null;
        order_item_id: string | null;
    } | {
        whatsapp_link: string;
        id: string;
        order_id: string;
        customer_name: string;
        customer_phone: string;
        chair_type: string;
        fabric_color: string;
        pattern_type: string;
        chairs_count: number;
        uploaded_photo_url: string;
        custom_extra_fee: number;
        status: string;
        admin_notes: string;
        created_at: string;
        order: {
            order_number: string;
        };
    }>;
}
