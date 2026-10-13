import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import { CreateChairCustomDto } from './dto/create-chair-custom.dto';
import { QueryChairCustomDto } from './dto/query-chair-custom.dto';
import { UpdateChairCustomStatusDto } from './dto/update-chair-custom-status.dto';

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
    uploaded_photo_url:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop',
    custom_extra_fee: 200,
    status: 'new',
    admin_notes: 'طلب جديد، يحتاج تأكيد أبعاد الظهر المقوس عبر الواتساب',
    created_at: new Date().toISOString(),
    order: { order_number: 'ZHR-749201' },
  },
];

@Injectable()
export class ChairCustomService {
  private chairBucket: string;

  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
    private configService: ConfigService,
  ) {
    this.chairBucket =
      this.configService.get<string>('SUPABASE_CHAIR_BUCKET') || 'chair-custom-uploads';
  }

  generateWhatsAppLink(request: any): string {
    const rawPhone = (request.customer_phone || '').replace(/\D/g, '');
    let cleanPhone = rawPhone;
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '2' + cleanPhone; // Egypt country code
    } else if (!cleanPhone.startsWith('20') && cleanPhone.length === 10) {
      cleanPhone = '20' + cleanPhone;
    }

    const orderRef = request.order?.order_number || request.id?.slice(-6) || 'جديد';
    const msg =
      `مرحباً ${request.customer_name} 🌸\n` +
      `نتواصل معك من متجر زهرة بخصوص طلب تفصيل تلبيسة الكراسي العمولة (كود الطلب: ${orderRef}):\n` +
      `• اللون: ${request.fabric_color}\n` +
      `• النقشة: ${request.pattern_type}\n` +
      `• عدد الكراسي: ${request.chairs_count} كراسي\n` +
      `• معاينة صورة كرسيك: ${request.uploaded_photo_url}\n\n` +
      `يسعدنا تأكيد الأبعاد والمقاسات الدقيقة معك للبدء في التفصيل الفوري بالمللي! ✨`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  }

  async uploadPhoto(file: Express.Multer.File): Promise<{ url: string; fileName: string }> {
    if (!file) {
      throw new BadRequestException('لم يتم رفع أي ملف');
    }

    // Validate mime type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/heic'];
    if (!allowed.includes(file.mimetype)) {
      throw new BadRequestException('صيغة الملف غير مدعومة. يرجى رفع صورة بصيغة JPG أو PNG أو WEBP');
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      throw new BadRequestException('حجم الصورة كبير جداً. الحد الأقصى 8 ميجابايت');
    }

    const ext = file.originalname.split('.').pop() || 'jpg';
    const fileName = `chair_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const url = await this.supabase.uploadFile(
      this.chairBucket,
      fileName,
      file.buffer,
      file.mimetype,
    );

    return { url, fileName };
  }

  async create(dto: CreateChairCustomDto) {
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

    const newReq: any = {
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

  async findAll(query: QueryChairCustomDto = {}) {
    if (this.prisma.isConnected) {
      try {
        const where: any = {};
        if (query.status) where.status = query.status;
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
      } catch (err) {
        console.warn('Prisma error in findAll custom requests:', err.message);
      }
    }

    let list = [...MOCK_CUSTOM_REQUESTS];
    if (query.status) list = list.filter((r) => r.status === query.status);
    if (query.search) {
      const s = query.search.toLowerCase();
      list = list.filter((r) => r.customer_name.includes(s) || r.customer_phone.includes(s));
    }

    return list.map((r) => ({
      ...r,
      whatsapp_link: this.generateWhatsAppLink(r),
    }));
  }

  async findOne(id: string) {
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
    if (!found) throw new NotFoundException('طلب التفصيل غير موجود');
    return {
      ...found,
      whatsapp_link: this.generateWhatsAppLink(found),
    };
  }

  async updateStatus(id: string, dto: UpdateChairCustomStatusDto) {
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
      if (dto.admin_notes) MOCK_CUSTOM_REQUESTS[idx].admin_notes = dto.admin_notes;
      return {
        ...MOCK_CUSTOM_REQUESTS[idx],
        whatsapp_link: this.generateWhatsAppLink(MOCK_CUSTOM_REQUESTS[idx]),
      };
    }

    throw new NotFoundException('طلب التفصيل غير موجود');
  }
}
