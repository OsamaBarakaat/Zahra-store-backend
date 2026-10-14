import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ShippingService } from './shipping.service';
import { UpdateShippingZoneDto } from './dto/update-shipping-zone.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Shipping (مناطق الشحن والمحافظات)')
@Controller('shipping')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('zones')
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiOperation({ summary: 'عرض قائمة محافظات مصر وأسعار الشحن والمدة التقديرية' })
  findAllZones() {
    return this.shippingService.findAllZones();
  }

  @Put('zones-bulk')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'تعديل وحفظ جميع أسعار الشحن والمحافظات دفعة واحدة (Admin)' })
  updateAllZones(@Body() items: Array<{ id: string; shipping_fee?: number; estimated_days?: string; is_active?: boolean }>) {
    return this.shippingService.updateAllZones(items);
  }

  @Put('zones/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'تعديل سعر الشحن أو مدة التوصيل أو حالة التفعيل للمحافظة (Admin)' })
  updateZone(@Param('id') id: string, @Body() updateDto: UpdateShippingZoneDto) {
    return this.shippingService.updateZone(id, updateDto);
  }
}
