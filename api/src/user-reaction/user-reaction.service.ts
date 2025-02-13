import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Reaction } from 'types/src/reaction.model';

@Injectable()
export class UserReactionService {
  @Inject() configService: ConfigService;

  public getNFromReaction(usedN: number, reactions: Reaction[]): number {
    let newN = usedN;
    // upgrade when hitting x consecutive correct reactions, without using (trialType: none => reactionType: none) reactions
    const shouldUpgrade = this.hasConsecutiveElements(
      reactions
        .slice(usedN) // don't use the first n reactions for upgrading
        .filter(
          (reaction) =>
            !(
              reaction.trialType === 'none' && reaction.reactionType === 'none'
            ), // filter out (trialType: none => reactionType: none) reactions
        ),
      this.configService.getGameConfig().consecutive_right_hits_for_upgrade,
      (reaction) => reaction.correct,
    );
    if (shouldUpgrade) {
      newN++;
    }

    const shouldDowngrade = this.hasConsecutiveElements(
      reactions // use the first n reactions for downgrading
        .filter(
          (reaction) =>
            !(
              reaction.trialType === 'none' && reaction.reactionType === 'none'
            ), // filter out (trialType: none => reactionType: none) reactions
        ),
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
