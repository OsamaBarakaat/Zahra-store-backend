export declare class CustomerInfoDto {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
}
export declare class ShippingAddressDto {
    governorate: string;
    city: string;
    street: string;
    apartment?: string;
    notes?: string;
}
export declare class OrderItemInputDto {
    productId?: string;
    slug?: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    quantity: number;
    selectedVariants?: Record<string, string>;
    customChairImage?: string;
    customNotes?: string;
}
export declare class CreateOrderDto {
    items: OrderItemInputDto[];
    customer: CustomerInfoDto;
    address: ShippingAddressDto;
    paymentMethod: 'cod' | 'vodafone_cash' | 'instapay';
    paymentReference?: string;
    subtotal: number;
    shippingCost: number;
    discount?: number;
    total: number;
}
