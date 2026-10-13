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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PermissionsService = class PermissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.permission.findMany({
            orderBy: { created_at: 'asc' },
        });
    }
    async findOne(id) {
        const perm = await this.prisma.permission.findFirst({
            where: { OR: [{ id }, { key: id }] },
        });
        if (!perm) {
            throw new common_1.NotFoundException('الصلاحية غير موجودة');
        }
        return perm;
    }
    async create(dto) {
        const cleanKey = dto.key.trim().toLowerCase().replace(/\s+/g, '_');
        const existing = await this.prisma.permission.findUnique({
            where: { key: cleanKey },
        });
        if (existing) {
            throw new common_1.ConflictException(`معرف الصلاحية "${cleanKey}" مسجل مسبقاً في النظام`);
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
    async update(id, dto) {
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
    async delete(id) {
        await this.findOne(id);
        return this.prisma.permission.delete({
            where: { id },
        });
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map