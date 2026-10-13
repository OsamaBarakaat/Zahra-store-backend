import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryOrdersDto {
  @ApiPropertyOptional({
    description: 'تصفية حسب الحالة: pending, confirmed, processing, shipped, delivered, cancelled',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'بحث برقم الطلب أو اسم العميل أو الهاتف' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'رقم الصفحة', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'عدد الطلبات في الصفحة', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 20;
}
