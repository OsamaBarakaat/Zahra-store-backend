import { PrismaService } from '../prisma/prisma.service';
import { ShippingService } from '../shipping/shipping.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
export declare class OrdersService {
    private prisma;
    private shippingService;
    constructor(prisma: PrismaService, shippingService: ShippingService);
    private mapPrismaOrder;
    createOrder(dto: CreateOrderDto): Promise<any>;
    findAll(query?: QueryOrdersDto): Promise<{
        total: number;
        page: number;
        limit: number;
        orders: {
            id: any;
            orderNumber: any;
            customer: {
                firstName: any;
                lastName: any;
                phone: any;
                email: any;
            };
            address: {
                governorate: any;
                city: any;
                street: any;
                apartment: any;
                notes: any;
            };
            items: any;
            paymentMethod: any;
            paymentReference: any;
            subtotal: number;
            shippingCost: number;
            discount: number;
            shippingDiscount: number;
            couponCode: any;
            total: number;
            status: any;
            createdAt: any;
            estimatedDelivery: any;
        }[];
    }>;
    findByIdOrNumber(idOrNumber: string): Promise<{
        id: string;
        orderNumber: string;
        customer: {
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
        };
        address: {
            governorate: string;
            city: string;
            street: string;
            apartment: string;
            notes: string;
        };
        items: {
            id: string;
            productId: string;
            slug: string;
            name: string;
            price: number;
            originalPrice: number;
            image: string;
            quantity: number;
            selectedVariants: {
                '\u0644\u0648\u0646 \u0627\u0644\u0642\u0645\u0627\u0634': string;
                '\u0634\u0643\u0644 \u0627\u0644\u0646\u0642\u0634\u0629': string;
                '\u0646\u0648\u0639 \u0627\u0644\u062A\u0644\u0628\u064A\u0633\u0629': string;
            };
            customChairImage: string;
            customNotes: string;
        }[];
        paymentMethod: string;
        subtotal: number;
        shippingCost: number;
        discount: number;
        total: number;
        status: string;
        createdAt: string;
        estimatedDelivery: string;
    } | {
        id: any;
        orderNumber: any;
        customer: {
            firstName: any;
            lastName: any;
            phone: any;
            email: any;
        };
        address: {
            governorate: any;
            city: any;
            street: any;
            apartment: any;
            notes: any;
        };
        items: any;
        paymentMethod: any;
        paymentReference: any;
        subtotal: number;
        shippingCost: number;
        discount: number;
        shippingDiscount: number;
        couponCode: any;
        total: number;
        status: any;
        createdAt: any;
        estimatedDelivery: any;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        orderNumber: string;
        customer: {
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
        };
        address: {
            governorate: string;
            city: string;
            street: string;
            apartment: string;
            notes: string;
        };
        items: {
            id: string;
            productId: string;
            slug: string;
            name: string;
            price: number;
            originalPrice: number;
            image: string;
            quantity: number;
            selectedVariants: {
                '\u0644\u0648\u0646 \u0627\u0644\u0642\u0645\u0627\u0634': string;
                '\u0634\u0643\u0644 \u0627\u0644\u0646\u0642\u0634\u0629': string;
                '\u0646\u0648\u0639 \u0627\u0644\u062A\u0644\u0628\u064A\u0633\u0629': string;
            };
            customChairImage: string;
            customNotes: string;
        }[];
        paymentMethod: string;
        subtotal: number;
        shippingCost: number;
        discount: number;
        total: number;
        status: string;
        createdAt: string;
        estimatedDelivery: string;
    } | {
        id: any;
        orderNumber: any;
        customer: {
            firstName: any;
            lastName: any;
            phone: any;
            email: any;
        };
        address: {
            governorate: any;
            city: any;
            street: any;
            apartment: any;
            notes: any;
        };
        items: any;
        paymentMethod: any;
        paymentReference: any;
        subtotal: number;
        shippingCost: number;
        discount: number;
        shippingDiscount: number;
        couponCode: any;
        total: number;
        status: any;
        createdAt: any;
        estimatedDelivery: any;
    }>;
    trackOrder(query: string): Promise<{
        id: string;
        orderNumber: string;
        customer: {
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
        };
        address: {
            governorate: string;
            city: string;
            street: string;
            apartment: string;
            notes: string;
        };
        items: {
            id: string;
            productId: string;
            slug: string;
            name: string;
            price: number;
            originalPrice: number;
            image: string;
            quantity: number;
            selectedVariants: {
                '\u0644\u0648\u0646 \u0627\u0644\u0642\u0645\u0627\u0634': string;
                '\u0634\u0643\u0644 \u0627\u0644\u0646\u0642\u0634\u0629': string;
                '\u0646\u0648\u0639 \u0627\u0644\u062A\u0644\u0628\u064A\u0633\u0629': string;
            };
            customChairImage: string;
            customNotes: string;
        }[];
        paymentMethod: string;
        subtotal: number;
        shippingCost: number;
        discount: number;
        total: number;
        status: string;
        createdAt: string;
        estimatedDelivery: string;
    }[] | {
        id: any;
        orderNumber: any;
        customer: {
            firstName: any;
            lastName: any;
            phone: any;
            email: any;
        };
        address: {
            governorate: any;
            city: any;
            street: any;
            apartment: any;
            notes: any;
        };
        items: any;
        paymentMethod: any;
        paymentReference: any;
        subtotal: number;
        shippingCost: number;
        discount: number;
        shippingDiscount: number;
        couponCode: any;
        total: number;
        status: any;
        createdAt: any;
        estimatedDelivery: any;
    }[]>;
    delete(id: string): Promise<{
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
    } | {
        id: string;
        orderNumber: string;
        customer: {
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
        };
        address: {
            governorate: string;
            city: string;
            street: string;
            apartment: string;
            notes: string;
        };
        items: {
            id: string;
            productId: string;
            slug: string;
            name: string;
            price: number;
            originalPrice: number;
            image: string;
            quantity: number;
            selectedVariants: {
                '\u0644\u0648\u0646 \u0627\u0644\u0642\u0645\u0627\u0634': string;
                '\u0634\u0643\u0644 \u0627\u0644\u0646\u0642\u0634\u0629': string;
                '\u0646\u0648\u0639 \u0627\u0644\u062A\u0644\u0628\u064A\u0633\u0629': string;
            };
            customChairImage: string;
            customNotes: string;
        }[];
        paymentMethod: string;
        subtotal: number;
        shippingCost: number;
        discount: number;
        total: number;
        status: string;
        createdAt: string;
        estimatedDelivery: string;
    }>;
}
