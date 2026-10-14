import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({ example: 'ZAHRA10', description: 'كود الخصم (أحرف إنجليزية وأرقام)' })
  @IsString()
  @IsNotEmpty({ message: 'كود الخصم مطلوب' })
  code: string;

  @ApiProperty({
    example: 'percentage',
    enum: ['percentage', 'fixed'],
    description: 'نوع الخصم: نسبة مئوية (percentage) أو مبلغ ثابت (fixed)',
  })
  @IsEnum(['percentage', 'fixed'], {
    message: 'نوع الخصم يجب أن يكون percentage أو fixed',
  })
  discount_type: 'percentage' | 'fixed';

  @ApiProperty({ example: 10, description: 'قيمة الخصم (نسبة أو جنيه)' })
  @IsNumber({}, { message: 'قيمة الخصم يجب أن تكون رقماً' })
  @Min(0, { message: 'قيمة الخصم يجب ألا تقل عن 0' })
  discount_value: number;

  @ApiPropertyOptional({ example: 100, description: 'الحد الأدنى لقيمة الطلب لتطبيق الخصم' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  min_order_amount?: number;

  @ApiPropertyOptional({ example: 200, description: 'أقصى قيمة للخصم بالجنيه (في حالة النسبة المئوية)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  max_discount_amount?: number;

  @ApiPropertyOptional({ example: '2026-01-01T00:00:00.000Z', description: 'تاريخ بدء تفعيل الكوبون' })
  @IsOptional()
  @IsString()
  start_date?: string;

  @ApiPropertyOptional({ example: '2027-12-31T23:59:59.000Z', description: 'تاريخ انتهاء صلاحية الكوبون' })
  @IsOptional()
  @IsString()
  end_date?: string;

  @ApiPropertyOptional({ example: 500, description: 'الحد الأقصى لعدد مرات الاستخدام الإجمالي' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  usage_limit?: number;

  @ApiPropertyOptional({ example: true, default: true, description: 'حالة تفعيل الكوبون' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateCouponDto {
  @ApiPropertyOptional({ example: 'percentage', enum: ['percentage', 'fixed'] })
  @IsOptional()
  @IsEnum(['percentage', 'fixed'])
  discount_type?: 'percentage' | 'fixed';

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount_value?: number;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  min_order_amount?: number;

  @ApiPropertyOptional({ example: 300 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  max_discount_amount?: number;

  @ApiPropertyOptional({ example: '2026-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsString()
  start_date?: string;

  @ApiPropertyOptional({ example: '2027-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsString()
  end_date?: string;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  usage_limit?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
