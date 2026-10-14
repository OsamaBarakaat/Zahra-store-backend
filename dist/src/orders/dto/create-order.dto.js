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
exports.CreateOrderDto = exports.OrderItemInputDto = exports.ShippingAddressDto = exports.CustomerInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CustomerInfoDto {
    firstName;
    lastName;
    phone;
    email;
}
exports.CustomerInfoDto = CustomerInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'سارة' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'الاسم الأول مطلوب' }),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'أحمد' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '01012345678' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'sara@example.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "email", void 0);
class ShippingAddressDto {
    governorate;
    city;
    street;
    apartment;
    notes;
}
exports.ShippingAddressDto = ShippingAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'القاهرة' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'المحافظة مطلوبة' }),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "governorate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'مدينة نصر' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'المدينة / الحي مطلوب' }),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'شارع عباس العقاد، عمارة 14' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'العنوان التفصيلي مطلوب' }),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'الدور الرابع، شقة 8' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "apartment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'التسليم بعد الساعة 5 مساءً' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShippingAddressDto.prototype, "notes", void 0);
class OrderItemInputDto {
    productId;
    slug;
    name;
    price;
    originalPrice;
    image;
    quantity;
    selectedVariants;
    customChairImage;
    customNotes;
}
exports.OrderItemInputDto = OrderItemInputDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'p0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'chair-cover-elastic-jacquard' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'طقم تلبيسات كراسي سفرة 6 قطع' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemInputDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 220 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemInputDto.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://images.unsplash.com/...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, default: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemInputDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { 'لون القماش': 'وردي غامق', 'نوع التلبيسة': 'عمولة (+200 جنيه)' },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], OrderItemInputDto.prototype, "selectedVariants", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://.../chair-custom-uploads/chair_123.jpg',
        description: 'رابط صورة الكرسي المرفوعة في حالة الطلب العمولة',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "customChairImage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'مقاس الظهر مقوس' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "customNotes", void 0);
class CreateOrderDto {
    items;
    customer;
    address;
    paymentMethod;
    paymentReference;
    subtotal;
    shippingCost;
    discount;
    shippingDiscount;
    couponCode;
    total;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OrderItemInputDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemInputDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CustomerInfoDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomerInfoDto),
    __metadata("design:type", CustomerInfoDto)
], CreateOrderDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShippingAddressDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShippingAddressDto),
    __metadata("design:type", ShippingAddressDto)
], CreateOrderDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cod', enum: ['cod', 'vodafone_cash', 'instapay'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'VF-982341' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentReference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 350 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 40 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "shippingCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, default: 0, description: 'قيمة الخصم على الشحن (50% عند الدفع الإلكتروني)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "shippingDiscount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'ZAHRA10', description: 'كود الخصم المستخدم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "couponCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 390 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total", void 0);
//# sourceMappingURL=create-order.dto.js.map