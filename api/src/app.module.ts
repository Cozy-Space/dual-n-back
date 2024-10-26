import { Module } from '@nestjs/common';
import { DualNBackModule } from './dual-n-back/dual-n-back.module';
import { ConfigModule } from './config/config.module';
import { UserReactionModule } from './user-reaction/user-reaction.module';

@Module({
  imports: [DualNBackModule, ConfigModule, UserReactionModule],
})
export class AppModule {}
