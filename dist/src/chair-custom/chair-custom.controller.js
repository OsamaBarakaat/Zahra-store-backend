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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChairCustomController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const chair_custom_service_1 = require("./chair-custom.service");
const create_chair_custom_dto_1 = require("./dto/create-chair-custom.dto");
const query_chair_custom_dto_1 = require("./dto/query-chair-custom.dto");
const update_chair_custom_status_dto_1 = require("./dto/update-chair-custom-status.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ChairCustomController = class ChairCustomController {
    chairCustomService;
    constructor(chairCustomService) {
        this.chairCustomService = chairCustomService;
    }
    async uploadPhoto(file) {
        return this.chairCustomService.uploadPhoto(file);
    }
    create(createDto) {
        return this.chairCustomService.create(createDto);
    }
    findAll(query) {
        return this.chairCustomService.findAll(query);
    }
    findOne(id) {
        return this.chairCustomService.findOne(id);
    }
    updateStatus(id, updateDto) {
        return this.chairCustomService.updateStatus(id, updateDto);
    }
};
exports.ChairCustomController = ChairCustomController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'رفع صورة كرسي العميل إلى باكت chair-custom-uploads' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChairCustomController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'إرسال طلب تلبيسة كرسي جديدة (عمولة أو قياسي)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chair_custom_dto_1.CreateChairCustomDto]),
    __metadata("design:returntype", void 0)
], ChairCustomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'عرض جميع طلبات تلبيسات الكراسي للوحة التحكم (Admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_chair_custom_dto_1.QueryChairCustomDto]),
    __metadata("design:returntype", void 0)
], ChairCustomController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'عرض تفاصيل طلب تلبيسة محدد (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChairCustomController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'تحديث حالة طلب التلبيسة وإضافة ملاحظات الإدارة (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chair_custom_status_dto_1.UpdateChairCustomStatusDto]),
    __metadata("design:returntype", void 0)
], ChairCustomController.prototype, "updateStatus", null);
exports.ChairCustomController = ChairCustomController = __decorate([
    (0, swagger_1.ApiTags)('Chair Custom (طلبات تلبيسات الكراسي والعمولة)'),
    (0, common_1.Controller)('chair-custom'),
    __metadata("design:paramtypes", [chair_custom_service_1.ChairCustomService])
], ChairCustomController);
//# sourceMappingURL=chair-custom.controller.js.map