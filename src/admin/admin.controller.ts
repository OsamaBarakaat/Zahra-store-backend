import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Admin Dashboard & Staff (الإحصائيات وإدارة المشرفين والصلاحيات)')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth('JWT')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  @Roles('ADMIN', 'MANAGER', 'SUPPORT', 'CUSTOM')
  @ApiOperation({ summary: 'إحصائيات الإيرادات والمصروفات وصافي الأرباح والأعداد' })
  getOverview() {
    return this.adminService.getOverview();
  }

  // ── Staff Users & Roles ──
  @Get('users')
  @ApiOperation({ summary: 'عرض قائمة المشرفين والموظفين وصلاحياتهم' })
  getStaffUsers() {
    return this.adminService.getStaffUsers();
  }

  @Post('users')
  @ApiOperation({ summary: 'إضافة مشرف جديد وتحديد دوره (ADMIN, MANAGER, SUPPORT, CUSTOM) وصلاحياته' })
  createStaffUser(
    @Body()
    dto: {
      email: string;
      password: string;
      full_name: string;
      role: string;
      permissions?: string[];
    },
  ) {
    return this.adminService.createStaffUser(dto);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'تعديل دور المشرف أو صلاحياته أو حالة التفعيل' })
  updateStaffUser(
    @Param('id') id: string,
    @Body()
    dto: {
      full_name?: string;
      role?: string;
      permissions?: string[];
      is_active?: boolean;
      password?: string;
    },
  ) {
    return this.adminService.updateStaffUser(id, dto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'حذف مشرف' })
  deleteStaffUser(@Param('id') id: string) {
    return this.adminService.deleteStaffUser(id);
  }
}
