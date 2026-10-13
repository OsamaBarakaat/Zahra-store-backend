import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryChairCustomDto {
  @ApiPropertyOptional({
    description: 'تصفية حسب الحالة: new, contacted, in_tailoring, completed, cancelled',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'بحث برقم الهاتف أو الاسم' })
  @IsOptional()
  @IsString()
  search?: string;
}
