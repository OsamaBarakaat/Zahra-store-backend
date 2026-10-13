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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { QueryProductsDto } from './dto/query-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Products (المنتجات)')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiOperation({ summary: 'تصفح جميع المنتجات مع الفلترة والترتيب والبحث' })
  findAll(@Query() query: QueryProductsDto) {
    return this.productsService.findAll(query);
  }

  @Get('featured')
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiOperation({ summary: 'عرض المنتجات المميزة' })
  getFeatured() {
    return this.productsService.getFeatured();
  }

  @Get('sale')
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiOperation({ summary: 'عرض المنتجات ذات الخصومات والعروض' })
  getSale() {
    return this.productsService.getSale();
  }

  @Get(':slug')
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiOperation({ summary: 'عرض تفاصيل منتج عبر الـ Slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'إضافة منتج جديد (Admin)' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'تعديل منتج (Admin)' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'تغيير حالة توفر المخزون للمنتج (Admin)' })
  toggleStock(@Param('id') id: string, @Body('inStock') inStock: boolean) {
    return this.productsService.toggleStock(id, inStock);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'حذف منتج (Admin)' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
