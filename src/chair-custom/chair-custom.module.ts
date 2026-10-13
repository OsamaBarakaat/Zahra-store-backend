import { Module } from '@nestjs/common';
import { ChairCustomService } from './chair-custom.service';
import { ChairCustomController } from './chair-custom.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChairCustomController],
  providers: [ChairCustomService],
  exports: [ChairCustomService],
})
export class ChairCustomModule {}
