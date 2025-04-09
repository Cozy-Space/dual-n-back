import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { UserReactionService } from './user-reaction.service';
import { Reaction } from 'types/src/reaction.model';

@Controller()
export class UserReactionController {
  private readonly logger = new Logger(UserReactionController.name);
  @Inject() userReactionService: UserReactionService;

  @Post('user_reaction.post')
  getNewN(@Query('n') n: number, @Body('reactions') reactions: Reaction[]) {
    if (
      n === undefined ||
      n === 0 ||
      reactions === undefined ||
      reactions.length === 0 ||
      reactions.find((reaction) => reaction.correct === undefined) !==
        undefined ||
      reactions.find((reaction) => reaction.reactionType === undefined) !==
        undefined ||
      reactions.find((reaction) => reaction.trialType === undefined) !==
        undefined
    ) {
      throw new BadRequestException('n and reactions are required');
    }
    this.logger.log(`Get new N. Old-N:${n}`);
    const newN = this.userReactionService.getNFromReaction(n, reactions);
    this.logger.log(`Got new N. New N: ${newN}`);
    return newN;
  }
}
