import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerInfoDto {
  @ApiProperty({ example: 'سارة' })
  @IsString()
  @IsNotEmpty({ message: 'الاسم الأول مطلوب' })
  firstName: string;

  @ApiProperty({ example: 'أحمد' })
  @IsString()
  @IsNotEmpty({ message: 'اسم العائلة مطلوب' })
  lastName: string;

  @ApiProperty({ example: '01012345678' })
  @IsString()
  @IsNotEmpty({ message: 'رقم الهاتف مطلوب' })
  phone: string;

  @ApiPropertyOptional({ example: 'sara@example.com' })
  @IsOptional()
  @IsString()
  email?: string;
}

export class ShippingAddressDto {
  @ApiProperty({ example: 'القاهرة' })
  @IsString()
  @IsNotEmpty({ message: 'المحافظة مطلوبة' })
  governorate: string;

  @ApiProperty({ example: 'مدينة نصر' })
  @IsString()
  @IsNotEmpty({ message: 'المدينة / الحي مطلوب' })
  city: string;

  @ApiProperty({ example: 'شارع عباس العقاد، عمارة 14' })
  @IsString()
  @IsNotEmpty({ message: 'العنوان التفصيلي مطلوب' })
  street: string;

  @ApiPropertyOptional({ example: 'الدور الرابع، شقة 8' })
  @IsOptional()
  @IsString()
  apartment?: string;

  @ApiPropertyOptional({ example: 'التسليم بعد الساعة 5 مساءً' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class OrderItemInputDto {
  @ApiPropertyOptional({ example: 'p0' })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({ example: 'chair-cover-elastic-jacquard' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'طقم تلبيسات كراسي سفرة 6 قطع' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 220 })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/...' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 1, default: 1 })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({
    example: { 'لون القماش': 'وردي غامق', 'نوع التلبيسة': 'عمولة (+200 جنيه)' },
  })
  @IsOptional()
  selectedVariants?: Record<string, string>;

  @ApiPropertyOptional({
    example: 'https://.../chair-custom-uploads/chair_123.jpg',
    description: 'رابط صورة الكرسي المرفوعة في حالة الطلب العمولة',
  })
  @IsOptional()
  @IsString()
  customChairImage?: string;

  @ApiPropertyOptional({ example: 'مقاس الظهر مقوس' })
  @IsOptional()
  @IsString()
  customNotes?: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];

  @ApiProperty({ type: CustomerInfoDto })
  @ValidateNested()
  @Type(() => CustomerInfoDto)
  customer: CustomerInfoDto;

  @ApiProperty({ type: ShippingAddressDto })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  address: ShippingAddressDto;

  @ApiProperty({ example: 'cod', enum: ['cod', 'vodafone_cash', 'instapay'] })
  @IsString()
  paymentMethod: 'cod' | 'vodafone_cash' | 'instapay';

  @ApiPropertyOptional({ example: 'VF-982341' })
  @IsOptional()
  @IsString()
  paymentReference?: string;

  @ApiProperty({ example: 350 })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: 40 })
  @IsNumber()
  shippingCost: number;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ example: 0, default: 0, description: 'قيمة الخصم على الشحن (50% عند الدفع الإلكتروني)' })
  @IsOptional()
  @IsNumber()
  shippingDiscount?: number;

  @ApiPropertyOptional({ example: 'ZAHRA10', description: 'كود الخصم المستخدم' })
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiProperty({ example: 390 })
  @IsNumber()
  total: number;
}
