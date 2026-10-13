"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExpensesService = class ExpensesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
            }
            catch (err) {
                console.warn('Prisma error in ExpensesService.findAll:', err.message);
            }
        }
        return [];
    }
    async create(dto) {
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
    async delete(id) {
        if (this.prisma.isConnected) {
            return this.prisma.expense.delete({ where: { id } });
        }
        return { success: true };
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map