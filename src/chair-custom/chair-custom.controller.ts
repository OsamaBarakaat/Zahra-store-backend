import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { ChairCustomService } from './chair-custom.service';
import { CreateChairCustomDto } from './dto/create-chair-custom.dto';
import { QueryChairCustomDto } from './dto/query-chair-custom.dto';
import { UpdateChairCustomStatusDto } from './dto/update-chair-custom-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Chair Custom (طلبات تلبيسات الكراسي والعمولة)')
@Controller('chair-custom')
export class ChairCustomController {
  constructor(private readonly chairCustomService: ChairCustomService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'رفع صورة كرسي العميل إلى باكت chair-custom-uploads' })
  @ApiConsumes('multipart/form-data')
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return this.chairCustomService.uploadPhoto(file);
  }

  @Post()
  @ApiOperation({ summary: 'إرسال طلب تلبيسة كرسي جديدة (عمولة أو قياسي)' })
  create(@Body() createDto: CreateChairCustomDto) {
    return this.chairCustomService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'عرض جميع طلبات تلبيسات الكراسي للوحة التحكم (Admin)' })
  findAll(@Query() query: QueryChairCustomDto) {
    return this.chairCustomService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'عرض تفاصيل طلب تلبيسة محدد (Admin)' })
  findOne(@Param('id') id: string) {
    return this.chairCustomService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'تحديث حالة طلب التلبيسة وإضافة ملاحظات الإدارة (Admin)' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateChairCustomStatusDto,
  ) {
    return this.chairCustomService.updateStatus(id, updateDto);
  }
}
