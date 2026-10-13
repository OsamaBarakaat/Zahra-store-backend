import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Customers (إدارة العملاء CRM)')
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
@ApiBearerAuth('JWT')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'عرض قائمة العملاء مع البحث' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search?: string) {
    return this.customersService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'تفاصيل عميل وسجل طلباته' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'إضافة عميل جديد' })
  create(
    @Body()
    dto: {
      name: string;
      phone: string;
      email?: string;
      governorate?: string;
      city?: string;
      street_address?: string;
      notes?: string;
    },
  ) {
    return this.customersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'تعديل بيانات عميل' })
  update(
    @Param('id') id: string,
    @Body()
    dto: {
      name?: string;
      phone?: string;
      email?: string;
      governorate?: string;
      city?: string;
      street_address?: string;
      notes?: string;
    },
  ) {
    return this.customersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف عميل' })
  delete(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}
