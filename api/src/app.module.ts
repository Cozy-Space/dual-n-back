import { Module } from '@nestjs/common';
import { DualNBackModule } from './dual-n-back/dual-n-back.module';
import { ConfigModule } from './config/config.module';
import { UserReactionModule } from './user-reaction/user-reaction.module';
import { StaticModule } from './static.module';

@Module({
  imports: [DualNBackModule, ConfigModule, UserReactionModule, StaticModule],
})
export class AppModule {}
