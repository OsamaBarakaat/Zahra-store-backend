import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ShippingModule } from './shipping/shipping.module';
import { OrdersModule } from './orders/orders.module';
import { ChairCustomModule } from './chair-custom/chair-custom.module';
import { StorageModule } from './storage/storage.module';
import { AdminModule } from './admin/admin.module';
import { CustomersModule } from './customers/customers.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: path.resolve(process.cwd(), 'uploads'),
        serveRoot: '/uploads',
      },
      {
        rootPath: path.resolve(process.cwd(), 'public'),
        serveRoot: '/admin',
      },
    ),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    ShippingModule,
    OrdersModule,
    ChairCustomModule,
    StorageModule,
    AdminModule,
    CustomersModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
