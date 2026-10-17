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
exports.ShippingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shipping_service_1 = require("./shipping.service");
const update_shipping_zone_dto_1 = require("./dto/update-shipping-zone.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ShippingController = class ShippingController {
    shippingService;
    constructor(shippingService) {
        this.shippingService = shippingService;
    }
    findAllZones() {
        return this.shippingService.findAllZones();
    }
    updateAllZones(items) {
        return this.shippingService.updateAllZones(items);
    }
    updateZone(id, updateDto) {
        return this.shippingService.updateZone(id, updateDto);
    }
};
exports.ShippingController = ShippingController;
__decorate([
    (0, common_1.Get)('zones'),
    (0, swagger_1.ApiOperation)({ summary: 'عرض قائمة محافظات مصر وأسعار الشحن والمدة التقديرية' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "findAllZones", null);
__decorate([
    (0, common_1.Put)('zones-bulk'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'تعديل وحفظ جميع أسعار الشحن والمحافظات دفعة واحدة (Admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "updateAllZones", null);
__decorate([
    (0, common_1.Put)('zones/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'تعديل سعر الشحن أو مدة التوصيل أو حالة التفعيل للمحافظة (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipping_zone_dto_1.UpdateShippingZoneDto]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "updateZone", null);
exports.ShippingController = ShippingController = __decorate([
    (0, swagger_1.ApiTags)('Shipping (مناطق الشحن والمحافظات)'),
    (0, common_1.Controller)('shipping'),
    __metadata("design:paramtypes", [shipping_service_1.ShippingService])
], ShippingController);
//# sourceMappingURL=shipping.controller.js.map