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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shipping_service_1 = require("../shipping/shipping.service");
const MOCK_ORDERS = [
    {
        id: 'ord-101',
        orderNumber: 'ZHR-749201',
        customer: {
            firstName: 'سارة',
            lastName: 'أحمد محمود',
            phone: '01012345678',
            email: 'sara@example.com',
        },
        address: {
            governorate: 'القاهرة',
            city: 'مدينة نصر',
            street: 'شارع عباس العقاد، عمارة 14 الدور الرابع',
            apartment: 'شقة 8',
            notes: 'برجاء الاتصال قبل الوصول بنصف ساعة',
        },
        items: [
            {
                id: 'item-1',
                productId: 'p0',
                slug: 'chair-cover-elastic-jacquard',
                name: 'طقم تلبيسات كراسي سفرة 6 قطع ليكرا جاكار مطاطية (عمولة)',
                price: 350,
                originalPrice: 420,
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
                quantity: 1,
                selectedVariants: {
                    'لون القماش': 'وردي غامق',
                    'شكل النقشة': 'مربعات وجواها زهور',
                    'نوع التلبيسة': 'عمولة (+200 جنيه)',
                },
                customChairImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop',
                customNotes: 'الكراسي خشب زان وظهرها مقوس قليلاً',
            },
        ],
        paymentMethod: 'cod',
        subtotal: 350,
        shippingCost: 40,
        discount: 0,
        total: 390,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: 'خلال 1-2 أيام عمل',
    },
];
let OrdersService = class OrdersService {
    prisma;
    shippingService;
    constructor(prisma, shippingService) {
        this.prisma = prisma;
        this.shippingService = shippingService;
    }
    mapPrismaOrder(o) {
        const nameParts = (o.customer_name || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        return {
            id: o.id,
            orderNumber: o.order_number,
            customer: {
                firstName,
                lastName,
                phone: o.customer_phone,
                email: o.customer_email || undefined,
            },
            address: {
                governorate: o.governorate,
                city: o.city,
                street: o.street_address,
                apartment: o.apartment || undefined,
                notes: o.notes || undefined,
            },
            items: (o.items || []).map((item) => {
                let variants = {};
                if (item.selected_variants) {
                    try {
                        variants = JSON.parse(item.selected_variants);
                    }
                    catch (_) {
                        variants = {};
                    }
                }
                return {
                    id: item.id,
                    productId: item.product_id,
                    name: item.product_name,
                    image: item.product_image || '',
                    price: Number(item.unit_price),
                    quantity: item.quantity,
                    selectedVariants: variants,
                    customChairImage: item.custom_chair_image || undefined,
                    customNotes: item.custom_notes || undefined,
                };
            }),
            paymentMethod: o.payment_method,
            paymentReference: o.payment_reference || undefined,
            subtotal: Number(o.subtotal),
            shippingCost: Number(o.shipping_cost),
            discount: Number(o.discount || 0),
            total: Number(o.total_amount),
            status: o.status,
            createdAt: o.created_at instanceof Date ? o.created_at.toISOString() : o.created_at,
            estimatedDelivery: o.estimated_delivery || undefined,
        };
    }
    async createOrder(dto) {
        const cleanPhone = (dto.customer.phone || '').replace(/[\s-]/g, '');
        const egPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
        if (!egPhoneRegex.test(cleanPhone)) {
            throw new common_1.BadRequestException('رقم الهاتف غير صالح. يرجى إدخال رقم محمول مصري صحيح مكون من 11 رقماً (مثال: 01012345678)');
        }
        const zoneInfo = await this.shippingService.getFeeForGovernorate(dto.address.governorate);
        const shippingCost = dto.shippingCost || zoneInfo.fee;
        const estimatedDelivery = zoneInfo.estimatedDays;
        const orderNumber = `ZHR-${Math.floor(100000 + Math.random() * 900000)}`;
        const fullName = `${dto.customer.firstName} ${dto.customer.lastName}`.trim();
        if (this.prisma.isConnected) {
            try {
                const createdOrder = await this.prisma.order.create({
                    data: {
                        order_number: orderNumber,
                        customer_name: fullName,
                        customer_phone: cleanPhone,
                        customer_email: dto.customer.email,
                        shipping_zone_id: zoneInfo.zoneId,
                        governorate: dto.address.governorate,
                        city: dto.address.city,
                        street_address: dto.address.street,
                        apartment: dto.address.apartment,
                        notes: dto.address.notes,
                        subtotal: dto.subtotal,
                        shipping_cost: shippingCost,
                        discount: dto.discount ?? 0,
                        total_amount: dto.total,
                        payment_method: dto.paymentMethod,
                        payment_reference: dto.paymentReference,
                        status: 'pending',
                        estimated_delivery: estimatedDelivery,
                        items: {
                            create: dto.items.map((item) => ({
                                product_id: item.productId,
                                product_name: item.name,
                                product_image: item.image,
                                selected_variants: item.selectedVariants ? JSON.stringify(item.selectedVariants) : null,
                                custom_chair_image: item.customChairImage,
                                custom_notes: item.customNotes,
                                quantity: item.quantity,
                                unit_price: item.price,
                                total_price: item.price * item.quantity,
                            })),
                        },
                    },
                    include: {
                        items: true,
                    },
                });
                for (const item of createdOrder.items) {
                    let hasCustomCover = false;
                    let fabricColor = 'افتراضي';
                    let patternType = 'افتراضي';
                    if (item.selected_variants) {
                        try {
                            const vars = JSON.parse(item.selected_variants);
                            if (vars['نوع التلبيسة']?.includes('عمولة') || item.custom_chair_image) {
                                hasCustomCover = true;
                            }
                            if (vars['لون القماش'])
                                fabricColor = vars['لون القماش'];
                            if (vars['شكل النقشة'])
                                patternType = vars['شكل النقشة'];
                        }
                        catch (_) { }
                    }
                    if (hasCustomCover || item.custom_chair_image) {
                        await this.prisma.customChairRequest.create({
                            data: {
                                order_id: createdOrder.id,
                                order_item_id: item.id,
                                customer_name: fullName,
                                customer_phone: cleanPhone,
                                chair_type: 'عمولة',
                                fabric_color: fabricColor,
                                pattern_type: patternType,
                                chairs_count: 6,
                                uploaded_photo_url: item.custom_chair_image || '',
                                custom_extra_fee: 200,
                                status: 'new',
                                admin_notes: item.custom_notes || 'طلب تلبيسة عمولة مرفق مع الطلب',
                            },
                        });
                    }
                }
                return this.mapPrismaOrder(createdOrder);
            }
            catch (err) {
                console.warn('Prisma createOrder error, saving to mock list:', err.message);
            }
        }
        const newOrder = {
            id: `ord_${Date.now()}`,
            orderNumber,
            customer: {
                firstName: dto.customer.firstName,
                lastName: dto.customer.lastName,
                phone: cleanPhone,
                email: dto.customer.email,
            },
            address: dto.address,
            items: dto.items,
            paymentMethod: dto.paymentMethod,
            paymentReference: dto.paymentReference,
            subtotal: dto.subtotal,
            shippingCost,
            discount: dto.discount ?? 0,
            total: dto.total,
            status: 'pending',
            createdAt: new Date().toISOString(),
            estimatedDelivery,
        };
        MOCK_ORDERS.unshift(newOrder);
        return newOrder;
    }
    async findAll(query = {}) {
        const take = query.limit || 20;
        const skip = ((query.page || 1) - 1) * take;
        if (this.prisma.isConnected) {
            try {
                const where = {};
                if (query.status)
                    where.status = query.status;
                if (query.search) {
                    where.OR = [
                        { order_number: { contains: query.search, mode: 'insensitive' } },
                        { customer_name: { contains: query.search, mode: 'insensitive' } },
                        { customer_phone: { contains: query.search } },
                    ];
                }
                const [total, orders] = await Promise.all([
                    this.prisma.order.count({ where }),
                    this.prisma.order.findMany({
                        where,
                        include: { items: true },
                        orderBy: { created_at: 'desc' },
                        take,
                        skip,
                    }),
                ]);
                return {
                    total,
                    page: query.page || 1,
                    limit: take,
                    orders: orders.map((o) => this.mapPrismaOrder(o)),
                };
            }
            catch (err) {
                console.warn('Prisma error in findAll orders:', err.message);
                return {
                    total: 0,
                    page: 1,
                    limit: take,
                    orders: [],
                };
            }
        }
        return {
            total: 0,
            page: 1,
            limit: 20,
            orders: [],
        };
    }
    async findByIdOrNumber(idOrNumber) {
        if (this.prisma.isConnected) {
            const order = await this.prisma.order.findFirst({
                where: {
                    OR: [{ id: idOrNumber }, { order_number: idOrNumber }],
                },
                include: {
                    items: true,
                    custom_requests: true,
                },
            });
            if (order) {
                return this.mapPrismaOrder(order);
            }
        }
        const found = MOCK_ORDERS.find((o) => o.id === idOrNumber || o.orderNumber === idOrNumber);
        if (!found)
            throw new common_1.NotFoundException('الطلب غير موجود');
        return found;
    }
    async updateStatus(id, status) {
        if (this.prisma.isConnected) {
            const updated = await this.prisma.order.update({
                where: { id },
                data: { status },
                include: { items: true },
            });
            return this.mapPrismaOrder(updated);
        }
        const idx = MOCK_ORDERS.findIndex((o) => o.id === id || o.orderNumber === id);
        if (idx !== -1) {
            MOCK_ORDERS[idx].status = status;
            return MOCK_ORDERS[idx];
        }
        throw new common_1.NotFoundException('الطلب غير موجود');
    }
    async trackOrder(query) {
        const clean = query.trim();
        if (!clean)
            throw new common_1.BadRequestException('يرجى إدخال رقم الهاتف أو رقم الطلب');
        if (this.prisma.isConnected) {
            const orders = await this.prisma.order.findMany({
                where: {
                    OR: [
                        { order_number: { equals: clean, mode: 'insensitive' } },
                        { customer_phone: { contains: clean } },
                    ],
                },
                include: { items: true },
                orderBy: { created_at: 'desc' },
            });
            return orders.map((o) => this.mapPrismaOrder(o));
        }
        return MOCK_ORDERS.filter((o) => o.orderNumber.toLowerCase() === clean.toLowerCase() ||
            o.customer.phone.includes(clean));
    }
    async delete(id) {
        if (this.prisma.isConnected) {
            return this.prisma.order.delete({
                where: { id },
            });
        }
        const idx = MOCK_ORDERS.findIndex((o) => o.id === id || o.orderNumber === id);
        if (idx !== -1) {
            const deleted = MOCK_ORDERS.splice(idx, 1);
            return deleted[0];
        }
        throw new common_1.NotFoundException('الطلب غير موجود');
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        shipping_service_1.ShippingService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map