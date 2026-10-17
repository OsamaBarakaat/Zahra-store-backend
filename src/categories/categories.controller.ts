import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Categories (الأقسام والتصنيفات)')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'عرض الأقسام (يمكن جلب الكل للوحة التحكم أو النشطة فقط للمتجر)' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @ApiQuery({ name: 'all', required: false, type: Boolean })
  findAll(@Query('activeOnly') activeOnly?: string, @Query('all') all?: string) {
    const showAll = all === 'true' || activeOnly === 'false';
    return this.categoriesService.findAll(!showAll);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'عرض تفاصيل قسم محدد عبر الـ slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Get(':slug/products')
  @ApiOperation({ summary: 'عرض منتجات قسم محدد' })
  findCategoryProducts(@Param('slug') slug: string) {
    return this.categoriesService.findProducts(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'إضافة قسم جديد (Admin)' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'تعديل قسم (Admin)' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Patch(':id/toggle-visibility')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'إظهار أو إخفاء القسم من المتجر (Admin)' })
  toggleVisibility(@Param('id') id: string, @Body('is_active') is_active?: boolean) {
    return this.categoriesService.toggleVisibility(id, is_active);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'حذف قسم (Admin)' })
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}

