import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShippingZoneDto {
  @ApiPropertyOptional({ example: 45, description: 'سعر الشحن بالجنيه المصري' })
  @IsOptional()
  @IsNumber()
  shipping_fee?: number;

  @ApiPropertyOptional({ example: '1-3 أيام عمل', description: 'المدة التقديرية للتوصيل' })
  @IsOptional()
  @IsString()
  estimated_days?: string;

  @ApiPropertyOptional({ example: true, description: 'حالة التفعيل للمحافظة' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
