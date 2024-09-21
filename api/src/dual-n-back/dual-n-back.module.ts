import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DualNBackService } from './dual-n-back.service';
import { DualNBackController } from './dual-n-back.controller';

@Module({
  imports: [ConfigModule],
  providers: [DualNBackService],
  exports: [DualNBackService],
  controllers: [DualNBackController],
})
export class DualNBackModule {}
