import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Reaction } from 'types/src/reaction.model';

@Injectable()
export class UserReactionService {
  @Inject() configService: ConfigService;

  public getNFromReaction(usedN: number, reactions: Reaction[]): number {
    let newN = usedN;
    const shouldUpgrade = this.hasConsecutiveElements(
      reactions,
      this.configService.getGameConfig().consecutive_right_hits_for_upgrade,
      (reaction) => reaction.correct,
    );
    if (shouldUpgrade) {
      newN++;
    }
    const shouldDowngrade = this.hasConsecutiveElements(
      reactions,
      this.configService.getGameConfig().consecutive_wrong_hits_for_downgrade,
      (reaction) => !reaction.correct,
    );
    if (shouldDowngrade) {
      newN--;
    }
    return newN >= 1 ? newN : 1;
  }

  hasConsecutiveElements<T>(
    array: T[],
    amount: number,
    filter: (reaction: T) => boolean,
  ): boolean {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
      if (filter(array[i])) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter === amount) {
        return true;
      }
    }
    return false;
  }
}
