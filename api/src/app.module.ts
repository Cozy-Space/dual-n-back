import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DualNBackModule } from './dual-n-back/dual-n-back.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [DualNBackModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
