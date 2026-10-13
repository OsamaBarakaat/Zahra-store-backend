import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const MOCK_CATEGORIES = [
  {
    id: 'cat-1',
    slug: 'home-furnishings',
    name: 'مفروشات منزلية',
    name_ar: 'مفروشات منزلية',
    description: 'كل ما يحتاجه منزلك من مفروشات عالية الجودة',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    productCount: 24,
    featured: true,
    is_featured: true,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'cat-2',
    slug: 'bedding',
    name: 'بياضات',
    name_ar: 'بياضات',
    description: 'بياضات وأغطية سرير فاخرة',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    productCount: 18,
    featured: true,
    is_featured: true,
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'cat-3',
    slug: 'living-room',
    name: 'مفروشات أنتريه وركنة',
    name_ar: 'مفروشات أنتريه وركنة',
    description: 'مفروشات غرفة المعيشة والأنتريه وتلبيسات الكراسي',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
    productCount: 12,
    featured: true,
    is_featured: true,
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'cat-4',
    slug: 'curtains',
    name: 'إسدالات وستائر',
    name_ar: 'إسدالات وستائر',
    description: 'ستائر وإسدالات بتصاميم عصرية وأنيقة',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    productCount: 15,
    featured: true,
    is_featured: true,
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'cat-5',
    slug: 'headscarves',
    name: 'طرح',
    name_ar: 'طرح',
    description: 'طرح وأوشحة بأجود الخامات',
    image: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=400&h=300&fit=crop',
    productCount: 30,
    featured: true,
    is_featured: true,
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'cat-6',
    slug: 'pajamas',
    name: 'بيجامات حريمي',
    name_ar: 'بيجامات حريمي',
    description: 'بيجامات نسائية مريحة وأنيقة',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
    image_url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
    productCount: 22,
    featured: true,
    is_featured: true,
    sort_order: 6,
    is_active: true,
  },
];

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(activeOnly = false) {
    if (this.prisma.isConnected) {
      try {
        const categories = await this.prisma.category.findMany({
          where: activeOnly ? { is_active: true } : undefined,
          orderBy: [{ sort_order: 'asc' }, { created_at: 'asc' }],
          include: {
            _count: {
              select: { products: true },
            },
          },
        });

        if (categories.length > 0) {
          return categories.map((cat) => ({
            id: cat.id,
            slug: cat.slug,
            name: cat.name_ar,
            name_ar: cat.name_ar,
            description: cat.description || '',
            image: cat.image_url || '',
            image_url: cat.image_url || '',
            productCount: cat._count.products,
            featured: cat.is_featured,
            is_featured: cat.is_featured,
            sort_order: cat.sort_order,
            is_active: cat.is_active,
          }));
        }
      } catch (err) {
        console.warn('Prisma error in findAll categories:', err.message);
      }
    }

    return MOCK_CATEGORIES;
  }

  async findBySlug(slug: string) {
    if (this.prisma.isConnected) {
      try {
        const cat = await this.prisma.category.findUnique({
          where: { slug },
          include: {
            _count: {
              select: { products: true },
            },
          },
        });

        if (cat) {
          return {
            id: cat.id,
            slug: cat.slug,
            name: cat.name_ar,
            name_ar: cat.name_ar,
            description: cat.description || '',
            image: cat.image_url || '',
            image_url: cat.image_url || '',
            productCount: cat._count.products,
            featured: cat.is_featured,
            is_featured: cat.is_featured,
            sort_order: cat.sort_order,
            is_active: cat.is_active,
          };
        }
      } catch (err) {
        console.warn('Prisma error in findBySlug:', err.message);
      }
    }

    const found = MOCK_CATEGORIES.find((c) => c.slug === slug);
    if (!found) throw new NotFoundException(`القسم غير موجود: ${slug}`);
    return found;
  }

  async create(dto: CreateCategoryDto) {
    if (this.prisma.isConnected) {
      const existing = await this.prisma.category.findUnique({
        where: { slug: dto.slug },
      });
      if (existing) {
        throw new ConflictException(`المعرف الفريد ${dto.slug} مستخدم بالفعل`);
      }

      return this.prisma.category.create({
        data: {
          name_ar: dto.name_ar,
          slug: dto.slug,
          description: dto.description,
          image_url: dto.image_url,
          sort_order: dto.sort_order ?? 0,
          is_featured: dto.is_featured ?? false,
          is_active: dto.is_active ?? true,
        },
      });
    }

    const newCat = {
      id: `cat-${Date.now()}`,
      ...dto,
      name: dto.name_ar,
      image: dto.image_url || '',
      productCount: 0,
      featured: dto.is_featured ?? false,
      sort_order: dto.sort_order ?? 0,
      is_active: dto.is_active ?? true,
    };
    MOCK_CATEGORIES.push(newCat as any);
    return newCat;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    if (this.prisma.isConnected) {
      return this.prisma.category.update({
        where: { id },
        data: {
          name_ar: dto.name_ar,
          slug: dto.slug,
          description: dto.description,
          image_url: dto.image_url,
          sort_order: dto.sort_order,
          is_featured: dto.is_featured,
          is_active: dto.is_active,
        },
      });
    }

    const idx = MOCK_CATEGORIES.findIndex((c) => c.id === id || c.slug === id);
    if (idx !== -1) {
      MOCK_CATEGORIES[idx] = { ...MOCK_CATEGORIES[idx], ...dto };
      return MOCK_CATEGORIES[idx];
    }
    throw new NotFoundException('القسم غير موجود');
  }

  async findProducts(slug: string) {
    if (this.prisma.isConnected) {
      try {
        const prods = await this.prisma.product.findMany({
          where: { category: { slug }, is_active: true },
          include: {
            category: true,
            images: { orderBy: { sort_order: 'asc' } },
            variants: true,
          },
        });
        if (prods.length > 0) {
          return prods.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name_ar,
            name_ar: p.name_ar,
            description: p.description_ar,
            price: Number(p.base_price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            discount: p.discount_percent ?? undefined,
            images: p.images.map((img) => ({ id: img.id, url: img.image_url, alt: img.alt_text || p.name_ar })),
            category: p.category.slug,
            categoryName: p.category.name_ar,
            variants: p.variants.map((v) => ({
              id: v.id,
              name: v.name_ar,
              type: v.variant_type,
              value: v.value,
              available: v.is_available,
              priceModifier: Number(v.price_adjustment || 0),
            })),
            rating: p.rating,
            reviewCount: p.review_count,
            isNew: p.is_new,
            isFeatured: p.is_featured,
            isOnSale: p.isOnSale,
            inStock: p.in_stock,
            stockCount: p.stock_quantity,
            isChairCover: p.is_chair_cover,
          }));
        }
      } catch (err) {
        console.warn('Prisma error in findProducts:', err.message);
      }
    }
    return [
      {
        id: 'p0',
        slug: 'chair-cover-elastic-jacquard',
        name: 'طقم تلبيسات كراسي سفرة 6 قطع ليكرا جاكار مطاطية (عادي وعمولة)',
        description: 'طقم تلبيسات متكامل يباع طقم على بعضه يشمل 6 تلبيسات كراسي لطقم سفرة 6 كراسي بالكامل.',
        price: 150,
        originalPrice: 220,
        discount: 32,
        images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop', alt: 'كراسي' }],
        category: 'living-room',
        categoryName: 'مفروشات أنتريه وركنة',
        variants: [],
        rating: 4.9,
        reviewCount: 318,
        inStock: true,
        isChairCover: true,
      },
    ].filter((p) => p.category === slug);
  }

  async delete(id: string) {
    if (this.prisma.isConnected) {
      return this.prisma.category.delete({
        where: { id },
      });
    }

    const idx = MOCK_CATEGORIES.findIndex((c) => c.id === id || c.slug === id);
    if (idx !== -1) {
      const deleted = MOCK_CATEGORIES.splice(idx, 1);
      return deleted[0];
    }
    throw new NotFoundException('القسم غير موجود');
  }
}
