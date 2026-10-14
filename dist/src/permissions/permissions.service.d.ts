import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        description: string | null;
        key: string;
        module: string;
        icon: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        description: string | null;
        key: string;
        module: string;
        icon: string | null;
    }>;
    create(dto: CreatePermissionDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        description: string | null;
        key: string;
        module: string;
        icon: string | null;
    }>;
    update(id: string, dto: UpdatePermissionDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        description: string | null;
        key: string;
        module: string;
        icon: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        description: string | null;
        key: string;
        module: string;
        icon: string | null;
    }>;
}
