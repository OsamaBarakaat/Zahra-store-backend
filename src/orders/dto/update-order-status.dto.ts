import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'confirmed',
    description: 'حالة الطلب: pending, confirmed, processing, shipped, delivered, cancelled',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], {
    message: 'الحالة غير صحيحة',
  })
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
