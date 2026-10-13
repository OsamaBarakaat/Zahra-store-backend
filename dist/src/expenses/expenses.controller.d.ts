import { ExpensesService } from './expenses.service';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(): Promise<{
        id: string;
        title: string;
        category: string;
        amount: number;
        date: Date;
        notes: string;
    }[]>;
    create(dto: {
        title: string;
        category: string;
        amount: number;
        date?: string;
        notes?: string;
    }): Promise<{
        date: Date;
        title: string;
        category: string;
        amount: number;
        notes?: string;
        id: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        category: string;
        notes: string | null;
        title: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        date: Date;
    } | {
        success: boolean;
    }>;
}
