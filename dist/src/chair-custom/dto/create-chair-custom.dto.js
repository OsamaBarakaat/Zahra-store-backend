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
exports.CreateChairCustomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateChairCustomDto {
    customer_name;
    customer_phone;
    chair_type;
    fabric_color;
    pattern_type;
    chairs_count;
    uploaded_photo_url;
    custom_extra_fee;
    order_id;
    order_item_id;
    notes;
}
exports.CreateChairCustomDto = CreateChairCustomDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'سارة أحمد محمود', description: 'اسم العميل' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'اسم العميل مطلوب' }),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "customer_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01012345678', description: 'رقم هاتف العميل للتواصل' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'رقم الهاتف مطلوب' }),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "customer_phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'عمولة', description: 'نوع التلبيسة: عادي أو عمولة', default: 'عمولة' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "chair_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'وردي غامق', description: 'لون القماش المختار من الـ 10 ألوان' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'لون القماش مطلوب' }),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "fabric_color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'مربعات وجواها زهور', description: 'شكل النقشة المختارة' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'شكل النقشة مطلوب' }),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "pattern_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6, description: 'عدد الكراسي للطقم', default: 6 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateChairCustomDto.prototype, "chairs_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://images.unsplash.com/...',
        description: 'رابط صورة الكرسي المرفوعة من العميل',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'رابط صورة الكرسي مطلوب' }),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "uploaded_photo_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 200, description: 'رسوم التفصيل الإضافية للعمولة', default: 200 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateChairCustomDto.prototype, "custom_extra_fee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'معرف الطلب المرتبط (إن وجد)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'معرف عنصر الطلب المرتبط (إن وجد)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "order_item_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ملاحظات العميل الخاصة' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChairCustomDto.prototype, "notes", void 0);
//# sourceMappingURL=create-chair-custom.dto.js.map