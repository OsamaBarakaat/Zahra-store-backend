export declare class CreateCouponDto {
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_order_amount?: number;
    max_discount_amount?: number;
    start_date?: string;
    end_date?: string;
    usage_limit?: number;
    is_active?: boolean;
}
export declare class UpdateCouponDto {
    discount_type?: 'percentage' | 'fixed';
    discount_value?: number;
    min_order_amount?: number;
    max_discount_amount?: number;
    start_date?: string;
    end_date?: string;
    usage_limit?: number;
    is_active?: boolean;
}
