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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const MOCK_PRODUCTS = [
    {
        id: 'p0',
        slug: 'chair-cover-elastic-jacquard',
        name: 'طقم تلبيسات كراسي سفرة 6 قطع ليكرا جاكار مطاطية (عادي وعمولة)',
        description: 'طقم تلبيسات متكامل يباع طقم على بعضه يشمل 6 تلبيسات كراسي لطقم سفرة 6 كراسي بالكامل. مصنوع من خامة الليكرا الجاكار المطاطية الفاخرة المقاومة للبقع وسهلة الفك والتركيب والغسيل. متوفر بـ 10 ألوان غنية، ونقشتين بارزتين مختلفتين، مع إمكانية الاختيار بين المقاس القياسي أو التفصيل العمولة بالمللي على مقاس كراسيك (+200 جنيه للطقم بالكامل) مع إرفاق صورة الكرسي.',
        price: 150,
        originalPrice: 220,
        discount: 32,
        images: [
            { id: 'img-chair-1', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop', alt: 'ألوان تلبيسة الكرسي الـ 10' },
            { id: 'img-chair-2', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop', alt: 'نقشة مربعات وجواها زهور' },
            { id: 'img-chair-3', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop', alt: 'نقشة زهور دائرية وأوراق شجر' },
        ],
        category: 'living-room',
        categoryName: 'مفروشات أنتريه وركنة',
        isChairCover: true,
        variants: [
            { id: 'col-1', name: 'رمادي فاتح', type: 'color', value: '#9BA8B5', available: true },
            { id: 'col-2', name: 'وردي غامق', type: 'color', value: '#A34E62', available: true },
            { id: 'col-3', name: 'أزرق', type: 'color', value: '#006C9C', available: true },
            { id: 'col-4', name: 'بيج', type: 'color', value: '#C4B1A0', available: true },
            { id: 'col-5', name: 'أحمر غامق', type: 'color', value: '#8D0A1C', available: true },
            { id: 'col-6', name: 'كريمي', type: 'color', value: '#D2C1A8', available: true },
            { id: 'col-7', name: 'بني', type: 'color', value: '#4D3227', available: true },
            { id: 'col-8', name: 'رمادي', type: 'color', value: '#738090', available: true },
            { id: 'col-9', name: 'رمادي غامق', type: 'color', value: '#3C424E', available: true },
            { id: 'col-10', name: 'بترولي', type: 'color', value: '#045266', available: true },
            { id: 'pat-1', name: 'مربعات وجواها زهور', type: 'pattern', value: 'مربعات', available: true },
            { id: 'pat-2', name: 'زهور دائرية وأوراق شجر', type: 'pattern', value: 'زهور دائرية', available: true },
            { id: 'typ-1', name: 'عادي (للكرسي الخشبي القياسي)', type: 'cover_type', value: 'standard', available: true, priceModifier: 0 },
            { id: 'typ-2', name: 'عمولة (تفصيل مخصوص على شكل ومقاس كرسيك)', type: 'cover_type', value: 'custom', available: true, priceModifier: 200 },
        ],
        rating: 4.9,
        reviewCount: 318,
        isNew: true,
        isFeatured: true,
        isOnSale: true,
        inStock: true,
        stockCount: 85,
        material: 'ليكرا جاكار مطاطية فاخرة',
    },
    {
        id: 'p1',
        slug: 'set-bedding-floral-roses',
        name: 'طقم بياضات زهور الورد الفاخر',
        description: 'طقم بياضات فاخر مصنوع من القطن المصري الخالص بتصميم زهور الورد الرقيق. يشمل الطقم غطاء لحاف وأكياس وشيلة سرير.',
        price: 450,
        originalPrice: 650,
        discount: 31,
        images: [
            { id: 'img1', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop', alt: 'طقم بياضات زهور الورد' },
        ],
        category: 'bedding',
        categoryName: 'بياضات',
        variants: [
            { id: 'v1', name: 'وردي', type: 'color', value: '#E8A4A0', available: true },
            { id: 'v2', name: 'أبيض', type: 'color', value: '#FFFFFF', available: true },
            { id: 'v3', name: 'مفرد', type: 'size', value: 'مفرد', available: true },
            { id: 'v4', name: 'دبل', type: 'size', value: 'دبل', available: true, priceModifier: 80 },
        ],
        rating: 4.8,
        reviewCount: 124,
        isNew: false,
        isFeatured: true,
        isOnSale: true,
        inStock: true,
        stockCount: 15,
        material: 'قطن مصري',
    },
    {
        id: 'p2',
        slug: 'curtain-royal-velvet',
        name: 'ستارة مخمل رويال بورجوندي',
        description: 'ستارة مخمل فاخرة بلون البورجوندي الكلاسيكي. تعطي إحساساً بالفخامة والأناقة لأي غرفة.',
        price: 380,
        originalPrice: 520,
        discount: 27,
        images: [
            { id: 'img1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop', alt: 'ستارة مخمل' },
        ],
        category: 'curtains',
        categoryName: 'إسدالات وستائر',
        variants: [
            { id: 'v1', name: 'بورجوندي', type: 'color', value: '#800020', available: true },
            { id: 'v2', name: 'كحلي', type: 'color', value: '#1B3A6B', available: true },
        ],
        rating: 4.7,
        reviewCount: 89,
        isNew: true,
        isFeatured: true,
        isOnSale: true,
        inStock: true,
        stockCount: 8,
        material: 'مخمل فاخر',
    },
    {
        id: 'p3',
        slug: 'pajama-silk-rose',
        name: 'بيجاما حرير ورد ناعمة',
        description: 'بيجاما نسائية فاخرة من الحرير الصناعي الناعم بتصميم زهري أنيق. مريحة جداً ومناسبة لكل المناسبات.',
        price: 280,
        images: [
            { id: 'img1', url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop', alt: 'بيجاما حرير' },
        ],
        category: 'pajamas',
        categoryName: 'بيجامات حريمي',
        variants: [
            { id: 'v1', name: 'وردي', type: 'color', value: '#FFB6C1', available: true },
            { id: 'v3', name: 'S', type: 'size', value: 'S', available: true },
            { id: 'v4', name: 'M', type: 'size', value: 'M', available: true },
        ],
        rating: 4.9,
        reviewCount: 203,
        isNew: true,
        isFeatured: true,
        isOnSale: false,
        inStock: true,
        stockCount: 20,
        material: 'حرير صناعي',
    },
];
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapPrismaProduct(p) {
        return {
            id: p.id,
            slug: p.slug,
            name: p.name_ar,
            name_ar: p.name_ar,
            description: p.description_ar,
            description_ar: p.description_ar,
            price: Number(p.base_price),
            base_price: Number(p.base_price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            original_price: p.original_price ? Number(p.original_price) : undefined,
            discount: p.discount_percent ?? undefined,
            discount_percent: p.discount_percent ?? undefined,
            images: (p.images || []).map((img) => ({
                id: img.id,
                url: img.image_url,
                alt: img.alt_text || p.name_ar,
            })),
            category: p.category?.slug || '',
            categoryName: p.category?.name_ar || '',
            category_id: p.category_id,
            variants: (p.variants || []).map((v) => ({
                id: v.id,
                name: v.name_ar,
                name_ar: v.name_ar,
                type: v.variant_type,
                variant_type: v.variant_type,
                value: v.value,
                available: v.is_available,
                is_available: v.is_available,
                priceModifier: Number(v.price_adjustment || 0),
                price_adjustment: Number(v.price_adjustment || 0),
                image: v.image_url || undefined,
            })),
            rating: p.rating ?? 4.9,
            reviewCount: p.review_count ?? 0,
            isNew: p.is_new,
            is_new: p.is_new,
            isFeatured: p.is_featured,
            is_featured: p.is_featured,
            isOnSale: p.isOnSale,
            is_on_sale: p.isOnSale,
            inStock: p.in_stock,
            in_stock: p.in_stock,
            stockCount: p.stock_quantity,
            stock_quantity: p.stock_quantity,
            material: p.material,
            dimensions: p.dimensions,
            isChairCover: p.is_chair_cover,
            is_chair_cover: p.is_chair_cover,
        };
    }
    async findAll(query = {}) {
        if (this.prisma.isConnected) {
            try {
                const where = { is_active: true };
                if (query.category) {
                    where.category = { slug: query.category };
                }
                if (query.minPrice !== undefined || query.maxPrice !== undefined) {
                    where.base_price = {};
                    if (query.minPrice !== undefined)
                        where.base_price.gte = query.minPrice;
                    if (query.maxPrice !== undefined)
                        where.base_price.lte = query.maxPrice;
                }
                if (query.inStock !== undefined)
                    where.in_stock = query.inStock;
                if (query.onSale !== undefined)
                    where.isOnSale = query.onSale;
                if (query.isFeatured !== undefined)
                    where.is_featured = query.isFeatured;
                if (query.isChairCover !== undefined)
                    where.is_chair_cover = query.isChairCover;
                if (query.q) {
                    where.OR = [
                        { name_ar: { contains: query.q, mode: 'insensitive' } },
                        { description_ar: { contains: query.q, mode: 'insensitive' } },
                    ];
                }
                let orderBy = { created_at: 'desc' };
                if (query.sort === 'price_asc')
                    orderBy = { base_price: 'asc' };
                else if (query.sort === 'price_desc')
                    orderBy = { base_price: 'desc' };
                else if (query.sort === 'best_selling')
                    orderBy = { review_count: 'desc' };
                else if (query.sort === 'top_rated')
                    orderBy = { rating: 'desc' };
                const take = query.limit || 20;
                const skip = ((query.page || 1) - 1) * take;
                const products = await this.prisma.product.findMany({
                    where,
                    include: {
                        category: true,
                        images: { orderBy: { sort_order: 'asc' } },
                        variants: true,
                    },
                    orderBy,
                    take,
                    skip,
                });
                if (products.length > 0) {
                    return products.map((p) => this.mapPrismaProduct(p));
                }
            }
            catch (err) {
                console.warn('Prisma error in findAll products:', err.message);
            }
        }
        let list = [...MOCK_PRODUCTS];
        if (query.category)
            list = list.filter((p) => p.category === query.category);
        if (query.isFeatured !== undefined)
            list = list.filter((p) => p.isFeatured === query.isFeatured);
        if (query.onSale !== undefined)
            list = list.filter((p) => p.isOnSale === query.onSale);
        if (query.inStock !== undefined)
            list = list.filter((p) => p.inStock === query.inStock);
        if (query.isChairCover !== undefined)
            list = list.filter((p) => p.isChairCover === query.isChairCover);
        if (query.q) {
            const q = query.q.toLowerCase();
            list = list.filter((p) => p.name.includes(q) || p.description.includes(q));
        }
        return list;
    }
    async findBySlug(slug) {
        if (this.prisma.isConnected) {
            try {
                const product = await this.prisma.product.findUnique({
                    where: { slug },
                    include: {
                        category: true,
                        images: { orderBy: { sort_order: 'asc' } },
                        variants: true,
                    },
                });
                if (product) {
                    return this.mapPrismaProduct(product);
                }
            }
            catch (err) {
                console.warn('Prisma error in findBySlug:', err.message);
            }
        }
        const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
        if (!found)
            throw new common_1.NotFoundException(`المنتج غير موجود: ${slug}`);
        return found;
    }
    async getFeatured() {
        return this.findAll({ isFeatured: true });
    }
    async getSale() {
        return this.findAll({ onSale: true });
    }
    async search(q) {
        return this.findAll({ q });
    }
    async create(dto) {
        if (this.prisma.isConnected) {
            let cat = await this.prisma.category.findUnique({ where: { slug: dto.category } });
            if (!cat) {
                cat = await this.prisma.category.findUnique({ where: { id: dto.category } });
            }
            if (!cat) {
                cat = await this.prisma.category.findFirst();
            }
            const created = await this.prisma.product.create({
                data: {
                    category_id: cat?.id || '',
                    name_ar: dto.name,
                    slug: dto.slug,
                    description_ar: dto.description,
                    base_price: dto.price,
                    original_price: dto.originalPrice,
                    discount_percent: dto.discount,
                    material: dto.material,
                    dimensions: dto.dimensions,
                    stock_quantity: dto.stockCount ?? 10,
                    in_stock: dto.inStock ?? true,
                    is_chair_cover: dto.isChairCover ?? false,
                    is_featured: dto.isFeatured ?? false,
                    isOnSale: dto.isOnSale ?? false,
                    is_new: dto.isNew ?? true,
                    images: {
                        create: (dto.images || []).map((img, i) => ({
                            image_url: img.url,
                            alt_text: img.alt || dto.name,
                            is_primary: img.is_primary ?? i === 0,
                            sort_order: i + 1,
                        })),
                    },
                    variants: {
                        create: (dto.variants || []).map((v) => ({
                            variant_type: v.type,
                            name_ar: v.name,
                            value: v.value,
                            price_adjustment: v.priceModifier ?? 0,
                            is_available: v.available ?? true,
                            image_url: v.image,
                        })),
                    },
                },
                include: {
                    category: true,
                    images: true,
                    variants: true,
                },
            });
            return this.mapPrismaProduct(created);
        }
        const newProd = {
            id: `p-${Date.now()}`,
            ...dto,
            images: (dto.images || []).map((img, i) => ({ id: `img-${i}`, ...img })),
            variants: (dto.variants || []).map((v, i) => ({ id: `v-${i}`, ...v })),
            rating: 5.0,
            reviewCount: 0,
        };
        MOCK_PRODUCTS.push(newProd);
        return newProd;
    }
    async update(id, dto) {
        if (this.prisma.isConnected) {
            const prod = await this.prisma.product.findFirst({
                where: { OR: [{ id }, { slug: id }] },
            });
            if (!prod)
                throw new common_1.NotFoundException('المنتج غير موجود');
            let categoryId = prod.category_id;
            if (dto.category) {
                let cat = await this.prisma.category.findUnique({ where: { slug: dto.category } });
                if (!cat)
                    cat = await this.prisma.category.findUnique({ where: { id: dto.category } });
                if (cat)
                    categoryId = cat.id;
            }
            if (dto.images && dto.images.length > 0) {
                await this.prisma.productImage.deleteMany({ where: { product_id: prod.id } });
                await this.prisma.productImage.createMany({
                    data: dto.images.map((img, i) => ({
                        product_id: prod.id,
                        image_url: img.url,
                        alt_text: img.alt || dto.name || prod.name_ar,
                        is_primary: img.is_primary ?? i === 0,
                        sort_order: i + 1,
                    })),
                });
            }
            if (dto.variants && dto.variants.length > 0) {
                await this.prisma.productVariant.deleteMany({ where: { product_id: prod.id } });
                await this.prisma.productVariant.createMany({
                    data: dto.variants.map((v) => ({
                        product_id: prod.id,
                        variant_type: v.type,
                        name_ar: v.name,
                        value: v.value,
                        price_adjustment: v.priceModifier ?? 0,
                        is_available: v.available ?? true,
                        image_url: v.image,
                    })),
                });
            }
            const updated = await this.prisma.product.update({
                where: { id: prod.id },
                data: {
                    category_id: categoryId,
                    name_ar: dto.name,
                    slug: dto.slug,
                    description_ar: dto.description,
                    base_price: dto.price !== undefined ? dto.price : undefined,
                    original_price: dto.originalPrice !== undefined ? dto.originalPrice : undefined,
                    discount_percent: dto.discount !== undefined ? dto.discount : undefined,
                    material: dto.material,
                    dimensions: dto.dimensions,
                    stock_quantity: dto.stockCount !== undefined ? dto.stockCount : undefined,
                    in_stock: dto.inStock !== undefined ? dto.inStock : undefined,
                    is_chair_cover: dto.isChairCover !== undefined ? dto.isChairCover : undefined,
                    is_featured: dto.isFeatured !== undefined ? dto.isFeatured : undefined,
                    isOnSale: dto.isOnSale !== undefined ? dto.isOnSale : undefined,
                    is_new: dto.isNew !== undefined ? dto.isNew : undefined,
                },
                include: {
                    category: true,
                    images: true,
                    variants: true,
                },
            });
            return this.mapPrismaProduct(updated);
        }
        const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id || p.slug === id);
        if (idx !== -1) {
            MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...dto };
            return MOCK_PRODUCTS[idx];
        }
        throw new common_1.NotFoundException('المنتج غير موجود');
    }
    async toggleStock(id, inStock) {
        if (this.prisma.isConnected) {
            return this.prisma.product.update({
                where: { id },
                data: { in_stock: inStock },
            });
        }
        const item = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);
        if (item) {
            item.inStock = inStock;
            return item;
        }
        throw new common_1.NotFoundException('المنتج غير موجود');
    }
    async delete(id) {
        if (this.prisma.isConnected) {
            return this.prisma.product.delete({
                where: { id },
            });
        }
        const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id || p.slug === id);
        if (idx !== -1) {
            const deleted = MOCK_PRODUCTS.splice(idx, 1);
            return deleted[0];
        }
        throw new common_1.NotFoundException('المنتج غير موجود');
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map