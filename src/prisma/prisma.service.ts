import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  public isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('✅ Successfully connected to PostgreSQL / Supabase Database via Prisma.');
    } catch (error) {
      this.isConnected = false;
      this.logger.warn(
        '⚠️ Database connection not yet available. Prisma is in offline/fallback mode. ' +
        'Please ensure DATABASE_URL in .env points to your Supabase PostgreSQL database.',
      );
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
    }
  }
}
