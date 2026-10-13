# 🌸 متجر زهرة | Backend & Admin Dashboard (NestJS & Supabase)

نظام خلفي (Backend API) متكامل وقوي مع لوحة تحكم إدارية حديثة لمتجر **زهرة (Zahra Store)** مبني بأحدث التقنيات السحابية: **NestJS 11** و **Prisma ORM** و **Supabase** (PostgreSQL, Storage, Auth).

---

## 🚀 روابط سريعة (Quick Links)

- 🎛️ **لوحة التحكم الإدارية (Admin Dashboard)**: [http://localhost:3000/admin](http://localhost:3000/admin)
- 📚 **توثيق Swagger التفاعلي (OpenAPI UI)**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- 🛍️ **نقطة وصول الـ API الأساسية**: [http://localhost:3000/api](http://localhost:3000/api)

### 🔑 بيانات تسجيل دخول الإدارة الافتراضية:
- **البريد الإلكتروني:** `admin@zahra-store.com`
- **كلمة المرور:** `admin123456`

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| المكون | التقنية | التفاصيل |
| :--- | :--- | :--- |
| **Framework** | **NestJS 11** (TypeScript) | معمارية موديولية صارمة، DTOs مع `class-validator` |
| **Database** | **PostgreSQL (Supabase)** | مدارة سحابياً أو محلياً |
| **ORM** | **Prisma ORM 6** | Type-safe migrations, queries, and seeding |
| **Object Storage** | **Supabase Storage** | باكتات: `products`, `chair-custom-uploads`, `banners` |
| **Authentication** | **JWT & RBAC** | حماية الصلاحيات برتبة `ADMIN` عبر `@Roles('ADMIN')` |
| **Documentation** | **Swagger / OpenAPI** | توثيق تفاعلي كامل ومترجم بالعربية عند `/api/docs` |
| **Admin UI** | **Modern Arabic RTL Dashboard** | مدمجة في مسار `/admin` مع رسوم بيانية تفاعلية وزر واتساب مباشر |

---

## 📂 بنية المشروع الموديولية (Modules Architecture)

```
d:\Zahra-store-backend/
├── prisma/
│   ├── schema.prisma            # مخطط قاعدة البيانات الشامل (7 جداول + علاقات كاملة)
│   └── seed.ts                  # بذر بيانات الـ 27 محافظة، الأقسام الـ 6، المنتجات، والمدير
├── public/
│   └── index.html               # واجهة لوحة التحكم الإدارية بالعربية (Tailwind + Chart.js)
├── uploads/                     # مجلد الرفع المحلي الاحتياطي في حالة عدم الاتصال بالسحابة
├── src/
│   ├── admin/                   # موديول إحصائيات الإدارة ونظرة عامة والـ CRM
│   ├── auth/                    # موديول المصادقة، JWT Guards، والصلاحيات (RBAC)
│   ├── categories/              # موديول الأقسام والتصنيفات (Public & Admin CRUD)
│   ├── products/                # موديول المنتجات، المتغيرات، الفلاتر والبحث
│   ├── chair-custom/            # موديول طلبات تفصيل وتلبيسات الكراسي والعمولة + الواتساب
│   ├── orders/                  # موديول السلة والدفع وحساب الشحن وتتبع الطلبات
│   ├── shipping/                # موديول الـ 27 محافظة مصرية وتكلفة ومدة الشحن
│   ├── storage/                 # موديول رفع الصور لـ Supabase Storage Buckets
│   ├── supabase/                # تهيئة عميل Supabase Client
│   ├── prisma/                  # خدمة واتصال Prisma Client المرنة
│   ├── app.module.ts            # الموديول الجذري
│   └── main.ts                  # نقطة الانطلاق وإعداد Swagger و CORS و Static Serving
├── .env                         # متغيرات البيئة المحلية
├── .env.example                 # نموذج إعداد المتغيرات لـ Supabase
└── package.json
```

---

## 🪑 تدفق تلبيسة الكراسي والعمولة (Chair Custom Flow)

تم بناء تدفق متخصص لمنتج تلبيسة كراسي السفرة:
1. **رفع صورة الكرسي:** عبر نقطة النهاية `POST /api/chair-custom/upload` (تحميل إلى باكت `chair-custom-uploads` مع التحقق من نوع وحجم الصورة).
2. **إنشاء الطلب:** عبر `POST /api/orders` أو `POST /api/chair-custom` مع تحديد اللون من بين الـ 10 ألوان، النقشة، ونوع التلبيسة (عادي أو عمولة +200 جنيه).
3. **لوحة التحكم والتواصل الفوري:** شاشة مخصصة في لوحة التحكم تعرض صورة كرسي العميل بدقة عالية مع إمكانية التكبير (Zoom)، وزر مباشر يفتح **محادثة واتساب مجهزة بنقرة واحدة** مع العميل بتفاصيل طلبه ومقاساته.

---

## 🚚 المحافظات والشحن (Egyptian Shipping Zones)

تم تضمين كافة محافظات مصر الـ 27 مع أسعار شحن واقعية ومدة تسليم تقديرية:
- القاهرة والجيزة: 40 ج.م (1-2 أيام عمل)
- الإسكندرية والقليوبية: 45 - 50 ج.م (2-3 أيام عمل)
- الدلتا والقناة: 55 - 60 ج.م (2-4 أيام عمل)
- الصعيد والوجه القبلي: 65 - 80 ج.م (3-5 أيام عمل)
- المحافظات الحدودية وسيناء: 85 - 90 ج.م (3-7 أيام عمل)
يمكن للإدارة تعديل أسعار الشحن وأيام التوصيل أو تفعيل/تعطيل التوصيل لأي محافظة من لوحة التحكم مباشرة.

---

## ⚡ تشغيل المشروع (Running the Server)

### 1. تثبيت الحزم (إن لم تكن مثبتة):
```bash
npm install
```

### 2. توليد عميل Prisma:
```bash
npx prisma generate
```

### 3. تشغيل وضع التطوير:
```bash
npm run start:dev
```

### 4. بناء المشروع للإنتاج:
```bash
npm run build
npm run start:prod
```

---

## ☁️ خطوات الربط مع Supabase (Connecting Supabase)

1. أنشئ مشروعاً جديداً على [supabase.com](https://supabase.com).
2. من قائمة **Project Settings -> Database -> Connection String (URI)** انسخ الرابط وضع كلمة المرور الخاصة بك في ملف `.env`:
   ```env
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   ```
3. من قائمة **Project Settings -> API** انسخ `Project URL` و `anon / service_role key` وضعها في `.env`:
   ```env
   SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
   SUPABASE_ANON_KEY="..."
   SUPABASE_SERVICE_ROLE_KEY="..."
   ```
4. أنشئ باكتات التخزين (Storage Buckets) في Supabase:
   - `products` (Public)
   - `chair-custom-uploads` (Public)
   - `banners` (Public)
5. نفّذ الـ Migration والبذر الأولي لقاعدة البيانات:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

---

## 🔗 ربط متجر الواجهة الأمامية (Connecting Next.js Storefront)

في مشروع الواجهة الأمامية `Zahra-store-frontend/zahra-store`:
أضف السطر التالي في ملف `.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```
سيتحول المتجر فورياً من البيانات التجريبية (Mock Data) إلى جلب البيانات الحقيقية من الخادم وتخزين الطلبات وتتبعها سحابياً!
