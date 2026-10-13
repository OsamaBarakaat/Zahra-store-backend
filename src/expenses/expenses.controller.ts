import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Expenses (إدارة المصروفات والتكاليف)')
@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth('JWT')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'عرض جميع المصروفات المسجلة' })
  findAll() {
    return this.expensesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'تسجيل بند مصروف جديد' })
  create(
    @Body()
    dto: {
      title: string;
      category: string;
      amount: number;
      date?: string;
      notes?: string;
    },
  ) {
    return this.expensesService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف بند مصروف' })
  delete(@Param('id') id: string) {
    return this.expensesService.delete(id);
  }
}
