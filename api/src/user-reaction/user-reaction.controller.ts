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

  // curl -X POST "localhost:3000/api/user_reaction.post?n=2" -H "Content-Type: application/json" --data '{"reactions":[{"correct": false}, {"correct": false}, {"correct": false}, {"correct": false}, {"correct": false}]}'
  // -> 1
  // curl -X POST "localhost:3000/api/user_reaction.post?n=2" -H "Content-Type: application/json" --data '{"reactions":[{"correct": true}, {"correct": false}, {"correct": true}, {"correct": false}, {"correct": true}]}'
  // -> 2
  // curl -X POST "localhost:3000/api/user_reaction.post?n=2" -H "Content-Type: application/json" --data '{"reactions":[{"correct": true}, {"correct": false}, {"correct": true}, {"correct": true}, {"correct": true}]}'
  // -> 3
  @Post('user_reaction.post')
  getNewN(@Query('n') n: number, @Body('reactions') reactions: Reaction[]) {
    if (
      n === undefined ||
      n === 0 ||
      reactions === undefined ||
      reactions.length === 0 ||
      reactions.find((reaction) => reaction.correct === undefined) !== undefined
    ) {
      throw new BadRequestException('n and reactions are required');
    }
    this.logger.log(
      `Creating block for n=${n} and reactions=${JSON.stringify(reactions)}`,
    );
    return this.userReactionService.getNFromReaction(n, reactions);
  }
}
