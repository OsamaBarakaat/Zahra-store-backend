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
exports.UpdatePermissionDto = exports.CreatePermissionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePermissionDto {
    key;
    name_ar;
    description;
    module;
    icon;
}
exports.CreatePermissionDto = CreatePermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'المعرف الفريد للصلاحية (slug/key)', example: 'reports' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'معرف الصلاحية مطلوب' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'اسم الصلاحية بالعربية', example: 'التقارير المتقدمة' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'اسم الصلاحية بالعربية مطلوب' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "name_ar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'وصف الصلاحية والمهام المسموحة', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'القسم التابع له الصلاحية', required: false, example: 'reports' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'أيقونة FontAwesome', required: false, example: 'fa-chart-simple' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "icon", void 0);
class UpdatePermissionDto {
    name_ar;
    description;
    module;
    icon;
}
exports.UpdatePermissionDto = UpdatePermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'اسم الصلاحية بالعربية', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "name_ar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'وصف الصلاحية', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'القسم التابع له', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'أيقونة FontAwesome', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionDto.prototype, "icon", void 0);
//# sourceMappingURL=create-permission.dto.js.map