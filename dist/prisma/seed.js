"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const GOVERNORATES = [
    { name: 'القاهرة', fee: 40, days: '1-2 أيام عمل' },
    { name: 'الجيزة', fee: 40, days: '1-2 أيام عمل' },
    { name: 'الإسكندرية', fee: 50, days: '2-3 أيام عمل' },
    { name: 'القليوبية', fee: 45, days: '2-3 أيام عمل' },
    { name: 'الدقهلية', fee: 55, days: '2-4 أيام عمل' },
    { name: 'الغربية', fee: 55, days: '2-4 أيام عمل' },
    { name: 'الشرقية', fee: 55, days: '2-4 أيام عمل' },
    { name: 'المنوفية', fee: 55, days: '2-4 أيام عمل' },
    { name: 'البحيرة', fee: 55, days: '2-4 أيام عمل' },
    { name: 'كفر الشيخ', fee: 55, days: '2-4 أيام عمل' },
    { name: 'دمياط', fee: 60, days: '2-4 أيام عمل' },
    { name: 'بورسعيد', fee: 60, days: '2-4 أيام عمل' },
    { name: 'الإسماعيلية', fee: 60, days: '2-4 أيام عمل' },
    { name: 'السويس', fee: 60, days: '2-4 أيام عمل' },
    { name: 'الفيوم', fee: 60, days: '3-5 أيام عمل' },
    { name: 'بني سويف', fee: 65, days: '3-5 أيام عمل' },
    { name: 'المنيا', fee: 65, days: '3-5 أيام عمل' },
    { name: 'أسيوط', fee: 70, days: '3-5 أيام عمل' },
    { name: 'سوهاج', fee: 70, days: '3-5 أيام عمل' },
    { name: 'قنا', fee: 75, days: '3-5 أيام عمل' },
    { name: 'الأقصر', fee: 75, days: '3-5 أيام عمل' },
    { name: 'أسوان', fee: 80, days: '3-6 أيام عمل' },
    { name: 'البحر الأحمر', fee: 85, days: '3-6 أيام عمل' },
    { name: 'جنوب سيناء', fee: 85, days: '3-6 أيام عمل' },
    { name: 'شمال سيناء', fee: 90, days: '4-7 أيام عمل' },
    { name: 'مطروح', fee: 85, days: '3-6 أيام عمل' },
    { name: 'الوادي الجديد', fee: 90, days: '4-7 أيام عمل' },
];
const CATEGORIES = [
    {
        slug: 'living-room',
        name_ar: 'مفروشات أنتريه وركنة',
        description: 'مفروشات غرفة المعيشة والأنتريه وتلبيسات الكراسي المطاطية الفاخرة',
        image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
        sort_order: 1,
        is_featured: true,
    },
    {
        slug: 'bedding',
        name_ar: 'بياضات',
        description: 'بياضات وأغطية سرير فاخرة بأجود أنواع القطن المصري',
        image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
        sort_order: 2,
        is_featured: true,
    },
    {
        slug: 'home-furnishings',
        name_ar: 'مفروشات منزلية',
        description: 'كل ما يحتاجه منزلك من مفروشات ومفارش مائدة عالية الجودة',
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        sort_order: 3,
        is_featured: true,
    },
    {
        slug: 'curtains',
        name_ar: 'إسدالات وستائر',
        description: 'ستائر وإسدالات بتصاميم عصرية وأنيقة',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        sort_order: 4,
        is_featured: true,
    },
    {
        slug: 'headscarves',
        name_ar: 'طرح',
        description: 'طرح وأوشحة بأجود الخامات الشيفون والحرير',
        image_url: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=400&h=300&fit=crop',
        sort_order: 5,
        is_featured: true,
    },
    {
        slug: 'pajamas',
        name_ar: 'بيجامات حريمي',
        description: 'بيجامات نسائية مريحة وأنيقة من الحرير والقطن',
        image_url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
        sort_order: 6,
        is_featured: true,
    },
];
async function main() {
    console.log('🌱 Starting Zahra Store database seeding...');
    console.log('🚚 Seeding 27 Egyptian Governorates...');
    for (const gov of GOVERNORATES) {
        await prisma.shippingZone.upsert({
            where: { governorate_name_ar: gov.name },
            update: { shipping_fee: gov.fee, estimated_days: gov.days, is_active: true },
            create: {
                governorate_name_ar: gov.name,
                shipping_fee: gov.fee,
                estimated_days: gov.days,
                is_active: true,
            },
        });
    }
    console.log('👤 Seeding default admin user...');
    const adminPasswordHash = await bcrypt.hash('admin123456', 10);
    await prisma.adminUser.upsert({
        where: { email: 'admin@zahra-store.com' },
        update: {
            password_hash: adminPasswordHash,
            full_name: 'مدير متجر زهرة',
            role: 'ADMIN',
            is_active: true,
        },
        create: {
            email: 'admin@zahra-store.com',
            password_hash: adminPasswordHash,
            full_name: 'مدير متجر زهرة',
            role: 'ADMIN',
            is_active: true,
        },
    });
    console.log('📁 Seeding Categories...');
    const categoryMap = new Map();
    for (const cat of CATEGORIES) {
        const record = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {
                name_ar: cat.name_ar,
                description: cat.description,
                image_url: cat.image_url,
                sort_order: cat.sort_order,
                is_featured: cat.is_featured,
            },
            create: {
                slug: cat.slug,
                name_ar: cat.name_ar,
                description: cat.description,
                image_url: cat.image_url,
                sort_order: cat.sort_order,
                is_featured: cat.is_featured,
            },
        });
        categoryMap.set(cat.slug, record.id);
    }
    console.log('🛋️ Seeding Products with Variants and Images...');
    const chairCoverCatId = categoryMap.get('living-room');
    if (chairCoverCatId) {
        const chairProduct = await prisma.product.upsert({
            where: { slug: 'chair-cover-elastic-jacquard' },
            update: {
                name_ar: 'طقم تلبيسات كراسي سفرة 6 قطع ليكرا جاكار مطاطية (عادي وعمولة)',
                description_ar: 'طقم تلبيسات متكامل يباع طقم على بعضه يشمل 6 تلبيسات كراسي لطقم سفرة 6 كراسي بالكامل. مصنوع من خامة الليكرا الجاكار المطاطية الفاخرة المقاومة للبقع وسهلة الفك والتركيب والغسيل. متوفر بـ 10 ألوان غنية، ونقشتين بارزتين مختلفتين، مع إمكانية الاختيار بين المقاس القياسي أو التفصيل العمولة بالمللي على مقاس كراسيك (+200 جنيه للطقم بالكامل) مع إرفاق صورة الكرسي.',
                base_price: 150,
                original_price: 220,
                discount_percent: 32,
                material: 'ليكرا جاكار مطاطية فاخرة',
                rating: 4.9,
                review_count: 318,
                is_featured: true,
                isOnSale: true,
                is_new: true,
                is_chair_cover: true,
                stock_quantity: 85,
                in_stock: true,
            },
            create: {
                category_id: chairCoverCatId,
                slug: 'chair-cover-elastic-jacquard',
                name_ar: 'طقم تلبيسات كراسي سفرة 6 قطع ليكرا جاكار مطاطية (عادي وعمولة)',
                description_ar: 'طقم تلبيسات متكامل يباع طقم على بعضه يشمل 6 تلبيسات كراسي لطقم سفرة 6 كراسي بالكامل. مصنوع من خامة الليكرا الجاكار المطاطية الفاخرة المقاومة للبقع وسهلة الفك والتركيب والغسيل. متوفر بـ 10 ألوان غنية، ونقشتين بارزتين مختلفتين، مع إمكانية الاختيار بين المقاس القياسي أو التفصيل العمولة بالمللي على مقاس كراسيك (+200 جنيه للطقم بالكامل) مع إرفاق صورة الكرسي.',
                base_price: 150,
                original_price: 220,
                discount_percent: 32,
                material: 'ليكرا جاكار مطاطية فاخرة',
                rating: 4.9,
                review_count: 318,
                is_featured: true,
                isOnSale: true,
                is_new: true,
                is_chair_cover: true,
                stock_quantity: 85,
                in_stock: true,
            },
        });
        await prisma.productVariant.deleteMany({ where: { product_id: chairProduct.id } });
        await prisma.productImage.deleteMany({ where: { product_id: chairProduct.id } });
        await prisma.productImage.createMany({
            data: [
                {
                    product_id: chairProduct.id,
                    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
                    alt_text: 'ألوان تلبيسة الكرسي الـ 10',
                    is_primary: true,
                    sort_order: 1,
                },
                {
                    product_id: chairProduct.id,
                    image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop',
                    alt_text: 'نقشة مربعات وجواها زهور',
                    is_primary: false,
                    sort_order: 2,
                },
                {
                    product_id: chairProduct.id,
                    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
                    alt_text: 'نقشة زهور دائرية وأوراق شجر',
                    is_primary: false,
                    sort_order: 3,
                },
            ],
        });
        const chairColors = [
            { name: 'رمادي فاتح', value: '#9BA8B5' },
            { name: 'وردي غامق', value: '#A34E62' },
            { name: 'أزرق', value: '#006C9C' },
            { name: 'بيج', value: '#C4B1A0' },
            { name: 'أحمر غامق', value: '#8D0A1C' },
            { name: 'كريمي', value: '#D2C1A8' },
            { name: 'بني', value: '#4D3227' },
            { name: 'رمادي', value: '#738090' },
            { name: 'رمادي غامق', value: '#3C424E' },
            { name: 'بترولي', value: '#045266' },
        ];
        for (const c of chairColors) {
            await prisma.productVariant.create({
                data: {
                    product_id: chairProduct.id,
                    variant_type: 'color',
                    name_ar: c.name,
                    value: c.value,
                    price_adjustment: 0,
                    is_available: true,
                },
            });
        }
        await prisma.productVariant.createMany({
            data: [
                {
                    product_id: chairProduct.id,
                    variant_type: 'pattern',
                    name_ar: 'مربعات وجواها زهور',
                    value: 'مربعات',
                    price_adjustment: 0,
                    is_available: true,
                },
                {
                    product_id: chairProduct.id,
                    variant_type: 'pattern',
                    name_ar: 'زهور دائرية وأوراق شجر',
                    value: 'زهور دائرية',
                    price_adjustment: 0,
                    is_available: true,
                },
            ],
        });
        await prisma.productVariant.createMany({
            data: [
                {
                    product_id: chairProduct.id,
                    variant_type: 'cover_type',
                    name_ar: 'عادي (للكرسي الخشبي القياسي)',
                    value: 'standard',
                    price_adjustment: 0,
                    is_available: true,
                },
                {
                    product_id: chairProduct.id,
                    variant_type: 'cover_type',
                    name_ar: 'عمولة (تفصيل مخصوص على شكل ومقاس كرسيك)',
                    value: 'custom',
                    price_adjustment: 200,
                    is_available: true,
                },
            ],
        });
    }
    const beddingCatId = categoryMap.get('bedding');
    if (beddingCatId) {
        const p1 = await prisma.product.upsert({
            where: { slug: 'set-bedding-floral-roses' },
            update: {},
            create: {
                category_id: beddingCatId,
                slug: 'set-bedding-floral-roses',
                name_ar: 'طقم بياضات زهور الورد الفاخر',
                description_ar: 'طقم بياضات فاخر مصنوع من القطن المصري الخالص بتصميم زهور الورد الرقيق. يشمل الطقم غطاء لحاف وأكياس وشيلة سرير.',
                base_price: 450,
                original_price: 650,
                discount_percent: 31,
                material: 'قطن مصري',
                rating: 4.8,
                review_count: 124,
                is_featured: true,
                isOnSale: true,
                is_new: false,
                stock_quantity: 15,
                in_stock: true,
            },
        });
        await prisma.productImage.deleteMany({ where: { product_id: p1.id } });
        await prisma.productVariant.deleteMany({ where: { product_id: p1.id } });
        await prisma.productImage.createMany({
            data: [
                {
                    product_id: p1.id,
                    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
                    alt_text: 'طقم بياضات زهور الورد',
                    is_primary: true,
                    sort_order: 1,
                },
            ],
        });
        await prisma.productVariant.createMany({
            data: [
                { product_id: p1.id, variant_type: 'color', name_ar: 'وردي', value: '#E8A4A0', price_adjustment: 0 },
                { product_id: p1.id, variant_type: 'color', name_ar: 'أبيض', value: '#FFFFFF', price_adjustment: 0 },
                { product_id: p1.id, variant_type: 'size', name_ar: 'مفرد', value: 'مفرد', price_adjustment: 0 },
                { product_id: p1.id, variant_type: 'size', name_ar: 'دبل', value: 'دبل', price_adjustment: 80 },
            ],
        });
    }
    const curtainsCatId = categoryMap.get('curtains');
    if (curtainsCatId) {
        const p2 = await prisma.product.upsert({
            where: { slug: 'curtain-royal-velvet' },
            update: {},
            create: {
                category_id: curtainsCatId,
                slug: 'curtain-royal-velvet',
                name_ar: 'ستارة مخمل رويال بورجوندي',
                description_ar: 'ستارة مخمل فاخرة بلون البورجوندي الكلاسيكي. تعطي إحساساً بالفخامة والأناقة لأي غرفة. متوفرة بأطوال مختلفة.',
                base_price: 380,
                original_price: 520,
                discount_percent: 27,
                material: 'مخمل فاخر',
                rating: 4.7,
                review_count: 89,
                is_featured: true,
                isOnSale: true,
                is_new: true,
                stock_quantity: 8,
                in_stock: true,
            },
        });
        await prisma.productImage.deleteMany({ where: { product_id: p2.id } });
        await prisma.productImage.create({
            data: {
                product_id: p2.id,
                image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
                alt_text: 'ستارة مخمل',
                is_primary: true,
                sort_order: 1,
            },
        });
    }
    console.log('📦 Seeding initial demo order and custom chair request...');
    const cairoZone = await prisma.shippingZone.findUnique({ where: { governorate_name_ar: 'القاهرة' } });
    const existingOrder = await prisma.order.findUnique({ where: { order_number: 'ZHR-749201' } });
    if (!existingOrder) {
        const demoOrder = await prisma.order.create({
            data: {
                order_number: 'ZHR-749201',
                customer_name: 'سارة أحمد محمود',
                customer_phone: '01012345678',
                governorate: 'القاهرة',
                city: 'مدينة نصر',
                street_address: 'شارع عباس العقاد، عمارة 14 الدور الرابع',
                shipping_zone_id: cairoZone?.id,
                subtotal: 350,
                shipping_cost: 40,
                discount: 0,
                total_amount: 390,
                payment_method: 'cod',
                status: 'pending',
                notes: 'برجاء الاتصال قبل الوصول بنصف ساعة',
                items: {
                    create: [
                        {
                            product_name: 'طقم تلبيسات كراسي سفرة 6 قطع ليكرا جاكار مطاطية (عمولة)',
                            product_image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
                            selected_variants: JSON.stringify({
                                'لون القماش': 'وردي غامق',
                                'شكل النقشة': 'مربعات وجواها زهور',
                                'نوع التلبيسة': 'عمولة (+200 جنيه)',
                            }),
                            custom_chair_image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop',
                            custom_notes: 'الكراسي خشب زان وظهرها مقوس قليلاً',
                            quantity: 1,
                            unit_price: 350,
                            total_price: 350,
                        },
                    ],
                },
            },
            include: { items: true },
        });
        await prisma.customChairRequest.create({
            data: {
                order_id: demoOrder.id,
                order_item_id: demoOrder.items[0].id,
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
            },
        });
    }
    await prisma.customer.upsert({
        where: { phone: '01012345678' },
        update: {},
        create: {
            full_name: 'سارة أحمد محمود',
            phone: '01012345678',
            email: 'sara@example.com',
            governorate: 'القاهرة',
            city: 'مدينة نصر',
            street_address: 'شارع عباس العقاد، عمارة 14',
            total_spent: 390,
            orders_count: 1,
        },
    });
    const expCount = await prisma.expense.count();
    if (expCount === 0) {
        await prisma.expense.createMany({
            data: [
                { title: 'شراء أقمشة جاكار ليكرا تركي (دفعة جديدة)', category: 'خامات_وتفصيل', amount: 3500 },
                { title: 'شحن وتوصيل طلبات الأسبوع لشركة الشحن', category: 'شحن', amount: 1200 },
                { title: 'حملة إعلانات ممولة فيسبوك وإنستغرام', category: 'تسويق', amount: 1500 },
            ],
        });
    }
    console.log('✅ Database seeding finished successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map