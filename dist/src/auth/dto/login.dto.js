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
exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@zahra-store.com', description: 'البريد الإلكتروني' }),
    (0, class_validator_1.IsEmail)({}, { message: 'يرجى إدخال بريد إلكتروني صحيح' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'البريد الإلكتروني مطلوب' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin123456', description: 'كلمة المرور' }),
    (0, class_validator_1.IsString)({ message: 'كلمة المرور يجب أن تكون نصاً' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'كلمة المرور مطلوبة' }),
    (0, class_validator_1.MinLength)(6, { message: 'كلمة المرور يجب ألا تقل عن 6 أحرف' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
//# sourceMappingURL=login.dto.js.map