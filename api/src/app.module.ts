import { Module } from '@nestjs/common';
import { DualNBackModule } from './dual-n-back/dual-n-back.module';
import { ConfigModule } from './config/config.module';
import { UserReactionModule } from './user-reaction/user-reaction.module';
import { StaticModule } from './static.module';
import { UseridModule } from './userid/userid.module';
import { OutputService } from './output/output.service';
import { OutputModule } from './output/output.module';

@Module({
  imports: [
    DualNBackModule,
    ConfigModule,
    UserReactionModule,
    StaticModule,
    UseridModule,
    OutputModule,
  ],
  providers: [OutputService],
})
export class AppModule {}
