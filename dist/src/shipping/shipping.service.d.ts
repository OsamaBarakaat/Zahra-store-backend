import { PrismaService } from '../prisma/prisma.service';
import { UpdateShippingZoneDto } from './dto/update-shipping-zone.dto';
export declare class ShippingService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllZones(): Promise<{
        id: string;
        governorate_name_ar: string;
        shipping_fee: number;
        estimated_days: string;
        is_active: boolean;
    }[]>;
    getFeeForGovernorate(governorateName: string): Promise<{
        fee: number;
        estimatedDays: string;
        zoneId?: string;
    }>;
    updateZone(id: string, dto: UpdateShippingZoneDto): Promise<{
        id: string;
        governorate_name_ar: string;
        shipping_fee: number;
        estimated_days: string;
        is_active: boolean;
    }>;
}
