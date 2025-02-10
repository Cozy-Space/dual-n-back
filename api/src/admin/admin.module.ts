import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [StatisticsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
