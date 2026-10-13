import {
  Controller,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Storage (التخزين السحابي ورفع الملفات)')
@Controller('storage')
export class StorageController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'رفع صورة جديدة (منتجات، بنرات) إلى Supabase Storage (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'bucket', required: false, description: 'اسم الباكت: products, banners, chair-custom-uploads' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('bucket') bucket = 'products',
  ) {
    if (!file) {
      throw new BadRequestException('لم يتم إرسال أي ملف');
    }

    const ext = file.originalname.split('.').pop() || 'jpg';
    const fileName = `${bucket}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

    const url = await this.supabaseService.uploadFile(
      bucket,
      fileName,
      file.buffer,
      file.mimetype,
    );

    return {
      url,
      fileName,
      bucket,
    };
  }
}
