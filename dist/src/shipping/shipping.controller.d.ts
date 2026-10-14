import { ShippingService } from './shipping.service';
import { UpdateShippingZoneDto } from './dto/update-shipping-zone.dto';
export declare class ShippingController {
    private readonly shippingService;
    constructor(shippingService: ShippingService);
    findAllZones(): Promise<{
        id: string;
        governorate_name_ar: string;
        shipping_fee: number;
        estimated_days: string;
        is_active: boolean;
    }[]>;
    updateAllZones(items: Array<{
        id: string;
        shipping_fee?: number;
        estimated_days?: string;
        is_active?: boolean;
    }>): Promise<{
        success: boolean;
        count: number;
        zones: any[];
    }>;
    updateZone(id: string, updateDto: UpdateShippingZoneDto): Promise<{
        id: string;
        governorate_name_ar: string;
        shipping_fee: number;
        estimated_days: string;
        is_active: boolean;
    }>;
}
