import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(): Promise<{
        description: string | null;
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        key: string;
        module: string;
        icon: string | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        key: string;
        module: string;
        icon: string | null;
    }>;
    create(dto: CreatePermissionDto): Promise<{
        description: string | null;
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        key: string;
        module: string;
        icon: string | null;
    }>;
    update(id: string, dto: UpdatePermissionDto): Promise<{
        description: string | null;
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        key: string;
        module: string;
        icon: string | null;
    }>;
    delete(id: string): Promise<{
        description: string | null;
        id: string;
        created_at: Date;
        updated_at: Date;
        name_ar: string;
        key: string;
        module: string;
        icon: string | null;
    }>;
}
