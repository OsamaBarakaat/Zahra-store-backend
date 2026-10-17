import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductImageDto {
  @ApiProperty({ example: 'https://images.unsplash.com/...' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ example: 'صورة المنتج' })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}

export class ProductVariantDto {
  @ApiProperty({ example: 'color', description: 'نوع المتغير: color, size, material, pattern, cover_type' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'وردي غامق' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '#A34E62' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  priceModifier?: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ example: 'https://...' })
  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'طقم تلبيسات كراسي سفرة 6 قطع' })
  @IsString()
  @IsNotEmpty({ message: 'اسم المنتج مطلوب' })
  name: string;

  @ApiProperty({ example: 'chair-cover-elastic-jacquard' })
  @IsString()
  @IsNotEmpty({ message: 'الـ Slug مطلوب' })
  slug: string;

  @ApiProperty({ example: 'living-room', description: 'معرف القسم أو الـ Slug' })
  @IsString()
  @IsNotEmpty({ message: 'القسم مطلوب' })
  category: string;

  @ApiProperty({ example: 'وصف تفصيلي للمنتج...' })
  @IsString()
  @IsNotEmpty({ message: 'الوصف مطلوب' })
  description: string;

  @ApiProperty({ example: 150, description: 'السعر الحالي' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 220, description: 'السعر الأصلي قبل الخصم' })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiPropertyOptional({ example: 32, description: 'نسبة الخصم %' })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ example: 'ليكرا جاكار مطاطية فاخرة' })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({ example: 'طقم 6 كراسي' })
  @IsOptional()
  @IsString()
  dimensions?: string;

  @ApiPropertyOptional({ example: 50, default: 10 })
  @IsOptional()
  @IsNumber()
  stockCount?: number;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isChairCover?: boolean;

  @ApiPropertyOptional({ example: 200, default: 200, description: 'سعر العمولة الإضافي' })
  @IsOptional()
  @IsNumber()
  customFee?: number;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isOnSale?: boolean;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @ApiPropertyOptional({ type: [ProductImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images?: ProductImageDto[];

  @ApiPropertyOptional({ type: [ProductVariantDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];
}
