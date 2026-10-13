import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChairCustomDto {
  @ApiProperty({ example: 'سارة أحمد محمود', description: 'اسم العميل' })
  @IsString()
  @IsNotEmpty({ message: 'اسم العميل مطلوب' })
  customer_name: string;

  @ApiProperty({ example: '01012345678', description: 'رقم هاتف العميل للتواصل' })
  @IsString()
  @IsNotEmpty({ message: 'رقم الهاتف مطلوب' })
  customer_phone: string;

  @ApiPropertyOptional({ example: 'عمولة', description: 'نوع التلبيسة: عادي أو عمولة', default: 'عمولة' })
  @IsOptional()
  @IsString()
  chair_type?: string;

  @ApiProperty({ example: 'وردي غامق', description: 'لون القماش المختار من الـ 10 ألوان' })
  @IsString()
  @IsNotEmpty({ message: 'لون القماش مطلوب' })
  fabric_color: string;

  @ApiProperty({ example: 'مربعات وجواها زهور', description: 'شكل النقشة المختارة' })
  @IsString()
  @IsNotEmpty({ message: 'شكل النقشة مطلوب' })
  pattern_type: string;

  @ApiPropertyOptional({ example: 6, description: 'عدد الكراسي للطقم', default: 6 })
  @IsOptional()
  @IsInt()
  chairs_count?: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/...',
    description: 'رابط صورة الكرسي المرفوعة من العميل',
  })
  @IsString()
  @IsNotEmpty({ message: 'رابط صورة الكرسي مطلوب' })
  uploaded_photo_url: string;

  @ApiPropertyOptional({ example: 200, description: 'رسوم التفصيل الإضافية للعمولة', default: 200 })
  @IsOptional()
  @IsNumber()
  custom_extra_fee?: number;

  @ApiPropertyOptional({ description: 'معرف الطلب المرتبط (إن وجد)' })
  @IsOptional()
  @IsString()
  order_id?: string;

  @ApiPropertyOptional({ description: 'معرف عنصر الطلب المرتبط (إن وجد)' })
  @IsOptional()
  @IsString()
  order_item_id?: string;

  @ApiPropertyOptional({ description: 'ملاحظات العميل الخاصة' })
  @IsOptional()
  @IsString()
  notes?: string;
}
