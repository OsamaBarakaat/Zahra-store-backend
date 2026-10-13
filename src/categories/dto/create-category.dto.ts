import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'مفروشات أنتريه وركنة', description: 'اسم القسم بالعربية' })
  @IsString()
  @IsNotEmpty({ message: 'اسم القسم مطلوب' })
  name_ar: string;

  @ApiProperty({ example: 'living-room', description: 'المعرف الفريد (Slug)' })
  @IsString()
  @IsNotEmpty({ message: 'المعرف الفريد مطلوب' })
  slug: string;

  @ApiProperty({ example: 'مفروشات غرفة المعيشة والأنتريه وتلبيسات الكراسي', description: 'وصف القسم', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/...', description: 'رابط صورة القسم', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ example: 1, description: 'ترتيب الظهور', required: false })
  @IsOptional()
  @IsInt()
  sort_order?: number;

  @ApiProperty({ example: true, description: 'هل يظهر في الأقسام المميزة؟', required: false })
  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @ApiProperty({ example: true, description: 'هل القسم نشط؟', required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
