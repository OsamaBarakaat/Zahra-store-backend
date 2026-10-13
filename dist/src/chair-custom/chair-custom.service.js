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
exports.ChairCustomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_service_1 = require("../supabase/supabase.service");
const config_1 = require("@nestjs/config");
const MOCK_CUSTOM_REQUESTS = [
    {
        id: 'req-demo-1',
        order_id: 'ord-101',
        customer_name: 'سارة أحمد محمود',
        customer_phone: '01012345678',
        chair_type: 'عمولة',
        fabric_color: 'وردي غامق',
        pattern_type: 'مربعات وجواها زهور',
        chairs_count: 6,
        uploaded_photo_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop',
        custom_extra_fee: 200,
        status: 'new',
        admin_notes: 'طلب جديد، يحتاج تأكيد أبعاد الظهر المقوس عبر الواتساب',
        created_at: new Date().toISOString(),
        order: { order_number: 'ZHR-749201' },
    },
];
let ChairCustomService = class ChairCustomService {
    prisma;
    supabase;
    configService;
    chairBucket;
    constructor(prisma, supabase, configService) {
        this.prisma = prisma;
        this.supabase = supabase;
        this.configService = configService;
        this.chairBucket =
            this.configService.get('SUPABASE_CHAIR_BUCKET') || 'chair-custom-uploads';
    }
    generateWhatsAppLink(request) {
        const rawPhone = (request.customer_phone || '').replace(/\D/g, '');
        let cleanPhone = rawPhone;
        if (cleanPhone.startsWith('0')) {
            cleanPhone = '2' + cleanPhone;
        }
        else if (!cleanPhone.startsWith('20') && cleanPhone.length === 10) {
            cleanPhone = '20' + cleanPhone;
        }
        const orderRef = request.order?.order_number || request.id?.slice(-6) || 'جديد';
        const msg = `مرحباً ${request.customer_name} 🌸\n` +
            `نتواصل معك من متجر زهرة بخصوص طلب تفصيل تلبيسة الكراسي العمولة (كود الطلب: ${orderRef}):\n` +
            `• اللون: ${request.fabric_color}\n` +
            `• النقشة: ${request.pattern_type}\n` +
            `• عدد الكراسي: ${request.chairs_count} كراسي\n` +
            `• معاينة صورة كرسيك: ${request.uploaded_photo_url}\n\n` +
            `يسعدنا تأكيد الأبعاد والمقاسات الدقيقة معك للبدء في التفصيل الفوري بالمللي! ✨`;
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    }
    async uploadPhoto(file) {
        if (!file) {
            throw new common_1.BadRequestException('لم يتم رفع أي ملف');
        }
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/heic'];
        if (!allowed.includes(file.mimetype)) {
            throw new common_1.BadRequestException('صيغة الملف غير مدعومة. يرجى رفع صورة بصيغة JPG أو PNG أو WEBP');
        }
        if (file.size > 8 * 1024 * 1024) {
            throw new common_1.BadRequestException('حجم الصورة كبير جداً. الحد الأقصى 8 ميجابايت');
        }
        const ext = file.originalname.split('.').pop() || 'jpg';
        const fileName = `chair_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const url = await this.supabase.uploadFile(this.chairBucket, fileName, file.buffer, file.mimetype);
        return { url, fileName };
    }
    async create(dto) {
        if (this.prisma.isConnected) {
            const created = await this.prisma.customChairRequest.create({
                data: {
                    customer_name: dto.customer_name,
                    customer_phone: dto.customer_phone,
                    chair_type: dto.chair_type || 'عمولة',
                    fabric_color: dto.fabric_color,
                    pattern_type: dto.pattern_type,
                    chairs_count: dto.chairs_count ?? 6,
                    uploaded_photo_url: dto.uploaded_photo_url,
                    custom_extra_fee: dto.custom_extra_fee ?? 200,
                    status: 'new',
                    order_id: dto.order_id,
                    order_item_id: dto.order_item_id,
                    admin_notes: dto.notes,
                },
                include: {
                    order: { select: { order_number: true, created_at: true } },
                },
            });
            return {
                ...created,
                whatsapp_link: this.generateWhatsAppLink(created),
            };
        }
        const newReq = {
            id: `req-${Date.now()}`,
            ...dto,
            status: 'new',
            created_at: new Date().toISOString(),
            order: { order_number: `ZHR-${Date.now().toString().slice(-6)}` },
        };
        newReq.whatsapp_link = this.generateWhatsAppLink(newReq);
        MOCK_CUSTOM_REQUESTS.unshift(newReq);
        return newReq;
    }
    async findAll(query = {}) {
        if (this.prisma.isConnected) {
            try {
                const where = {};
                if (query.status)
                    where.status = query.status;
                if (query.search) {
                    where.OR = [
                        { customer_name: { contains: query.search, mode: 'insensitive' } },
                        { customer_phone: { contains: query.search } },
                    ];
                }
                const requests = await this.prisma.customChairRequest.findMany({
                    where,
                    orderBy: { created_at: 'desc' },
                    include: {
                        order: {
                            select: {
                                order_number: true,
                                created_at: true,
                                city: true,
                                governorate: true,
                                total_amount: true,
                            },
                        },
                    },
                });
                return requests.map((req) => ({
                    ...req,
                    custom_extra_fee: Number(req.custom_extra_fee),
                    whatsapp_link: this.generateWhatsAppLink(req),
                }));
            }
            catch (err) {
                console.warn('Prisma error in findAll custom requests:', err.message);
                return [];
            }
        }
        return [];
    }
    async findOne(id) {
        if (this.prisma.isConnected) {
            const req = await this.prisma.customChairRequest.findUnique({
                where: { id },
                include: {
                    order: {
                        include: { items: true },
                    },
                },
            });
            if (req) {
                return {
                    ...req,
                    custom_extra_fee: Number(req.custom_extra_fee),
                    whatsapp_link: this.generateWhatsAppLink(req),
                };
            }
        }
        const found = MOCK_CUSTOM_REQUESTS.find((r) => r.id === id);
        if (!found)
            throw new common_1.NotFoundException('طلب التفصيل غير موجود');
        return {
            ...found,
            whatsapp_link: this.generateWhatsAppLink(found),
        };
    }
    async updateStatus(id, dto) {
        if (this.prisma.isConnected) {
            const updated = await this.prisma.customChairRequest.update({
                where: { id },
                data: {
                    status: dto.status,
                    admin_notes: dto.admin_notes,
                },
                include: {
                    order: { select: { order_number: true } },
                },
            });
            return {
                ...updated,
                custom_extra_fee: Number(updated.custom_extra_fee),
                whatsapp_link: this.generateWhatsAppLink(updated),
            };
        }
        const idx = MOCK_CUSTOM_REQUESTS.findIndex((r) => r.id === id);
        if (idx !== -1) {
            MOCK_CUSTOM_REQUESTS[idx].status = dto.status;
            if (dto.admin_notes)
                MOCK_CUSTOM_REQUESTS[idx].admin_notes = dto.admin_notes;
            return {
                ...MOCK_CUSTOM_REQUESTS[idx],
                whatsapp_link: this.generateWhatsAppLink(MOCK_CUSTOM_REQUESTS[idx]),
            };
        }
        throw new common_1.NotFoundException('طلب التفصيل غير موجود');
    }
};
exports.ChairCustomService = ChairCustomService;
exports.ChairCustomService = ChairCustomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService,
        config_1.ConfigService])
], ChairCustomService);
//# sourceMappingURL=chair-custom.service.js.map