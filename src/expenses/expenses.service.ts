import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    if (this.prisma.isConnected) {
      try {
        const expenses = await this.prisma.expense.findMany({
          orderBy: { date: 'desc' },
        });

        return expenses.map((e) => ({
          id: e.id,
          title: e.title,
          category: e.category,
          amount: Number(e.amount),
          date: e.date,
          notes: e.notes || '',
        }));
      } catch (err) {
        console.warn('Prisma error in ExpensesService.findAll:', err.message);
      }
    }

    return [];
  }

  async create(dto: {
    title: string;
    category: string;
    amount: number;
    date?: string;
    notes?: string;
  }) {
    if (this.prisma.isConnected) {
      const created = await this.prisma.expense.create({
        data: {
          title: dto.title,
          category: dto.category,
          amount: dto.amount,
          date: dto.date ? new Date(dto.date) : new Date(),
          notes: dto.notes,
        },
      });

      return {
        id: created.id,
        title: created.title,
        category: created.category,
        amount: Number(created.amount),
        date: created.date,
        notes: created.notes || '',
      };
    }

    return { id: `exp-${Date.now()}`, ...dto, date: new Date() };
  }

  async delete(id: string) {
    if (this.prisma.isConnected) {
      return this.prisma.expense.delete({ where: { id } });
    }
    return { success: true };
  }
}
