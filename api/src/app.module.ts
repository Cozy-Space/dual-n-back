import { Module } from '@nestjs/common';
import { DualNBackModule } from './dual-n-back/dual-n-back.module';
import { ConfigModule } from './config/config.module';
import { UserReactionModule } from './user-reaction/user-reaction.module';
import { StaticModule } from './static.module';
import { OutputService } from './output/output.service';
import { OutputModule } from './output/output.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DualNBackModule,
    ConfigModule,
    UserReactionModule,
    StaticModule,
    OutputModule,
    StatisticsModule,
    AdminModule,
  ],
  providers: [OutputService],
})
export class AppModule {}
