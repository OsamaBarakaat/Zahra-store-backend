import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.permission.findMany({
      orderBy: { created_at: 'asc' },
    });
  }

  async findOne(id: string) {
    const perm = await this.prisma.permission.findFirst({
      where: { OR: [{ id }, { key: id }] },
    });
    if (!perm) {
      throw new NotFoundException('الصلاحية غير موجودة');
    }
    return perm;
  }

  async create(dto: CreatePermissionDto) {
    const cleanKey = dto.key.trim().toLowerCase().replace(/\s+/g, '_');
    const existing = await this.prisma.permission.findUnique({
      where: { key: cleanKey },
    });
    if (existing) {
      throw new ConflictException(`معرف الصلاحية "${cleanKey}" مسجل مسبقاً في النظام`);
    }

    return this.prisma.permission.create({
      data: {
        key: cleanKey,
        name_ar: dto.name_ar.trim(),
        description: dto.description?.trim(),
        module: dto.module?.trim().toLowerCase() || cleanKey,
        icon: dto.icon?.trim() || 'fa-shield-halved',
      },
    });
  }

  async update(id: string, dto: UpdatePermissionDto) {
    await this.findOne(id);

    return this.prisma.permission.update({
      where: { id },
      data: {
        ...(dto.name_ar && { name_ar: dto.name_ar.trim() }),
        ...(dto.description !== undefined && { description: dto.description?.trim() }),
        ...(dto.module && { module: dto.module.trim().toLowerCase() }),
        ...(dto.icon && { icon: dto.icon.trim() }),
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
