import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateChairCustomStatusDto {
  @ApiProperty({
    example: 'contacted',
    description: 'الحالة: new, contacted, in_tailoring, completed, cancelled',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['new', 'contacted', 'in_tailoring', 'completed', 'cancelled'], {
    message: 'الحالة يجب أن تكون: new أو contacted أو in_tailoring أو completed أو cancelled',
  })
  status: string;

  @ApiPropertyOptional({ example: 'تم الاتصال بالعميل وأكد أبعاد ظهر الكرسي 95 سم' })
  @IsOptional()
  @IsString()
  admin_notes?: string;
}
