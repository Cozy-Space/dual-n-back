import { Module } from '@nestjs/common';
import { UserReactionController } from './user-reaction.controller';
import { UserReactionService } from './user-reaction.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [UserReactionService],
  exports: [UserReactionService],
  controllers: [UserReactionController],
})
export class UserReactionModule {}
