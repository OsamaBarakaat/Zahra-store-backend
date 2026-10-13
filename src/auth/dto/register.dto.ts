import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin@zahra-store.com', description: 'البريد الإلكتروني' })
  @IsEmail({}, { message: 'يرجى إدخال بريد إلكتروني صحيح' })
  @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
  email: string;

  @ApiProperty({ example: 'admin123456', description: 'كلمة المرور' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'كلمة المرور يجب ألا تقل عن 6 أحرف' })
  password: string;

  @ApiProperty({ example: 'مدير متجر زهرة', description: 'الاسم الكامل' })
  @IsString()
  @IsNotEmpty({ message: 'الاسم الكامل مطلوب' })
  full_name: string;

  @ApiProperty({ example: 'ADMIN', description: 'الدور (ADMIN أو MANAGER)', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
