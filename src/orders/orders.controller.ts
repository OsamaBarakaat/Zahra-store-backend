import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Orders (الطلبات والمبيعات)')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'إنشاء طلب شراء جديد (Checkout)' })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('track')
  @ApiOperation({ summary: 'تتبع الطلب برقم الطلب أو رقم هاتف العميل' })
  @ApiQuery({ name: 'q', required: true, description: 'رقم الطلب (ZHR-XXXXXX) أو رقم الهاتف' })
  trackOrder(@Query('q') query: string) {
    return this.ordersService.trackOrder(query || '');
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'عرض وتصفية جميع طلبات المتجر للوحة التحكم (Admin)' })
  findAll(@Query() query: QueryOrdersDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'عرض تفاصيل طلب محدد بالمعرف أو برقم الطلب' })
  findByIdOrNumber(@Param('id') id: string) {
    return this.ordersService.findByIdOrNumber(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'تحديث حالة الطلب (Admin)' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateDto.status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'حذف طلب (Admin)' })
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
