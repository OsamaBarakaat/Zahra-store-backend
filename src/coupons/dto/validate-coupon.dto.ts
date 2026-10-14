import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ValidateCouponDto {
  @ApiProperty({ example: 'ZAHRA10', description: 'كود الخصم المراد التحقق منه' })
  @IsString()
  @IsNotEmpty({ message: 'يرجى إدخال كود الخصم' })
  code: string;

  @ApiProperty({ example: 450, description: 'مجموع قيمة المنتجات في السلة قبل الشحن والخصومات' })
  @IsNumber({}, { message: 'يجب تحديد قيمة المنتجات' })
  @Min(0, { message: 'قيمة المشتريات يجب أن تكون 0 فأكثر' })
  subtotal: number;
}
