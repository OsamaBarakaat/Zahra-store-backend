import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    if (this.prisma.isConnected) {
      try {
        const where: any = {};
        if (search) {
          where.OR = [
            { full_name: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search } },
            { city: { contains: search, mode: 'insensitive' } },
            { governorate: { contains: search, mode: 'insensitive' } },
          ];
        }

        const customers = await this.prisma.customer.findMany({
          where,
          orderBy: { created_at: 'desc' },
        });

        if (customers.length > 0) {
          return customers.map((c) => ({
            id: c.id,
            name: c.full_name,
            phone: c.phone,
            email: c.email || '',
            governorate: c.governorate || '',
            city: c.city || '',
            street_address: c.street_address || '',
            notes: c.notes || '',
            totalSpend: Number(c.total_spent),
            totalOrders: c.orders_count,
            created_at: c.created_at,
          }));
        }
      } catch (err) {
        console.warn('Prisma error in CustomersService.findAll:', err.message);
      }
    }

    return [];
  }

  async findOne(id: string) {
    if (this.prisma.isConnected) {
      const c = await this.prisma.customer.findUnique({ where: { id } });
      if (c) {
        // Also fetch orders for this customer
        const orders = await this.prisma.order.findMany({
          where: { customer_phone: c.phone },
          include: { items: true },
          orderBy: { created_at: 'desc' },
        });

        return {
          id: c.id,
          name: c.full_name,
          phone: c.phone,
          email: c.email || '',
          governorate: c.governorate || '',
          city: c.city || '',
          street_address: c.street_address || '',
          notes: c.notes || '',
          totalSpend: Number(c.total_spent),
          totalOrders: c.orders_count,
          created_at: c.created_at,
          orders,
        };
      }
    }
    throw new NotFoundException('العميل غير موجود');
  }

  async create(dto: {
    name: string;
    phone: string;
    email?: string;
    governorate?: string;
    city?: string;
    street_address?: string;
    notes?: string;
  }) {
    if (this.prisma.isConnected) {
      const existing = await this.prisma.customer.findUnique({
        where: { phone: dto.phone },
      });
      if (existing) {
        throw new ConflictException('رقم الهاتف مسجل بالفعل لعميل آخر');
      }

      const created = await this.prisma.customer.create({
        data: {
          full_name: dto.name,
          phone: dto.phone,
          email: dto.email,
          governorate: dto.governorate,
          city: dto.city,
          street_address: dto.street_address,
          notes: dto.notes,
        },
      });

      return {
        id: created.id,
        name: created.full_name,
        phone: created.phone,
        email: created.email || '',
        governorate: created.governorate || '',
        city: created.city || '',
        street_address: created.street_address || '',
        notes: created.notes || '',
        totalSpend: 0,
        totalOrders: 0,
      };
    }

    return { id: `cust-${Date.now()}`, ...dto, totalSpend: 0, totalOrders: 0 };
  }

  async update(
    id: string,
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
    if (this.prisma.isConnected) {
      const updated = await this.prisma.customer.update({
        where: { id },
        data: {
          full_name: dto.name,
          phone: dto.phone,
          email: dto.email,
          governorate: dto.governorate,
          city: dto.city,
          street_address: dto.street_address,
          notes: dto.notes,
        },
      });

      return {
        id: updated.id,
        name: updated.full_name,
        phone: updated.phone,
        email: updated.email || '',
        governorate: updated.governorate || '',
        city: updated.city || '',
        street_address: updated.street_address || '',
        notes: updated.notes || '',
        totalSpend: Number(updated.total_spent),
        totalOrders: updated.orders_count,
      };
    }
    throw new NotFoundException('العميل غير موجود');
  }

  async delete(id: string) {
    if (this.prisma.isConnected) {
      return this.prisma.customer.delete({
        where: { id },
      });
    }
    return { success: true };
  }
}
