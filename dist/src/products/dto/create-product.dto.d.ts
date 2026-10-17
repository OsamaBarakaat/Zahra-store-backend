export declare class ProductImageDto {
    url: string;
    alt?: string;
    is_primary?: boolean;
}
export declare class ProductVariantDto {
    type: string;
    name: string;
    value?: string;
    priceModifier?: number;
    available?: boolean;
    image?: string;
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    category: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    material?: string;
    dimensions?: string;
    stockCount?: number;
    inStock?: boolean;
    isChairCover?: boolean;
    customFee?: number;
    isFeatured?: boolean;
    isOnSale?: boolean;
    isNew?: boolean;
    images?: ProductImageDto[];
    variants?: ProductVariantDto[];
}
