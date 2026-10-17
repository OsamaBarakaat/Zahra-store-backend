import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Search (البحث)')
@Controller('search')
export class SearchController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'البحث النصي الذكي عن المنتجات' })
  @ApiQuery({ name: 'q', required: true, description: 'كلمة البحث' })
  search(@Query('q') query: string) {
    return this.productsService.search(query || '');
  }
}

