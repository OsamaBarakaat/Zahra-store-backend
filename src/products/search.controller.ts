import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';

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
