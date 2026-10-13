import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ description: 'المعرف الفريد للصلاحية (slug/key)', example: 'reports' })
  @IsNotEmpty({ message: 'معرف الصلاحية مطلوب' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'اسم الصلاحية بالعربية', example: 'التقارير المتقدمة' })
  @IsNotEmpty({ message: 'اسم الصلاحية بالعربية مطلوب' })
  @IsString()
  name_ar: string;

  @ApiProperty({ description: 'وصف الصلاحية والمهام المسموحة', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'القسم التابع له الصلاحية', required: false, example: 'reports' })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiProperty({ description: 'أيقونة FontAwesome', required: false, example: 'fa-chart-simple' })
  @IsOptional()
  @IsString()
  icon?: string;
}

export class UpdatePermissionDto {
  @ApiProperty({ description: 'اسم الصلاحية بالعربية', required: false })
  @IsOptional()
  @IsString()
  name_ar?: string;

  @ApiProperty({ description: 'وصف الصلاحية', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'القسم التابع له', required: false })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiProperty({ description: 'أيقونة FontAwesome', required: false })
  @IsOptional()
  @IsString()
  icon?: string;
}
