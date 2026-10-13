import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]>;
export declare function resolveUserPermissions(role: string, customPermissions?: string[]): string[];
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            permissions: string[];
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            permissions: string[];
        };
    }>;
    me(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        permissions: string[];
    }>;
}
