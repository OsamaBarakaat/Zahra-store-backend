import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Check in database if connected
    if (this.prisma.isConnected) {
      try {
        const user = await this.prisma.adminUser.findUnique({
          where: { email },
        });

        if (user && user.is_active) {
          const isPasswordValid = await bcrypt.compare(password, user.password_hash);
          if (isPasswordValid) {
            const payload = { sub: user.id, email: user.email, role: user.role, name: user.full_name };
            const accessToken = this.jwtService.sign(payload);
            return {
              accessToken,
              user: {
                id: user.id,
                email: user.email,
                name: user.full_name,
                role: user.role,
              },
            };
          }
        }
      } catch (err) {
        console.warn('Database error during login, attempting fallback check:', err.message);
      }
    }

    // Default admin fallback for immediate development / initial setup
    if (email === 'admin@zahra-store.com' && password === 'admin123456') {
      const payload = {
        sub: 'default-admin-id',
        email: 'admin@zahra-store.com',
        role: 'ADMIN',
        name: 'مدير متجر زهرة',
      };
      const accessToken = this.jwtService.sign(payload);
      return {
        accessToken,
        user: {
          id: 'default-admin-id',
          email: 'admin@zahra-store.com',
          name: 'مدير متجر زهرة',
          role: 'ADMIN',
        },
      };
    }

    throw new UnauthorizedException('بيانات الدخول غير صحيحة (البريد الإلكتروني أو كلمة المرور)');
  }

  async register(registerDto: RegisterDto) {
    if (!this.prisma.isConnected) {
      throw new UnauthorizedException('قاعدة البيانات غير متصلة حالياً، يرجى ضبط DATABASE_URL');
    }

    const existing = await this.prisma.adminUser.findUnique({
      where: { email: registerDto.email },
    });

    if (existing) {
      throw new ConflictException('هذا البريد الإلكتروني مسجل مسبقاً');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.adminUser.create({
      data: {
        email: registerDto.email,
        password_hash: passwordHash,
        full_name: registerDto.full_name,
        role: registerDto.role || 'ADMIN',
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role, name: user.full_name };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
      },
    };
  }

  async me(userId: string) {
    if (this.prisma.isConnected) {
      const user = await this.prisma.adminUser.findUnique({
        where: { id: userId },
      });
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          role: user.role,
        };
      }
    }

    return {
      id: userId,
      email: 'admin@zahra-store.com',
      name: 'مدير متجر زهرة',
      role: 'ADMIN',
    };
  }
}
