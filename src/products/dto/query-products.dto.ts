import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean, IsIn } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class QueryProductsDto {
  @ApiPropertyOptional({ description: 'تصفية حسب القسم (slug)' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'الحد الأدنى للسعر' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({ description: 'الحد الأقصى للسعر' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'متوفر في المخزون فقط' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ description: 'في العروض والخصومات فقط' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  onSale?: boolean;

  @ApiPropertyOptional({ description: 'منتجات مميزة فقط' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'تلبيسات كراسي فقط' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isChairCover?: boolean;

  @ApiPropertyOptional({ description: 'بحث بالاسم أو الوصف' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: 'ترتيب حسب: newest, price_asc, price_desc, best_selling, top_rated',
    enum: ['newest', 'price_asc', 'price_desc', 'best_selling', 'top_rated'],
  })
  @IsOptional()
  @IsIn(['newest', 'price_asc', 'price_desc', 'best_selling', 'top_rated'])
  sort?: string;

  @ApiPropertyOptional({ description: 'رقم الصفحة', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'عدد العناصر في الصفحة', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 20;
}
