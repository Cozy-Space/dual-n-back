import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Block, Trial } from 'types';

@Injectable()
export class DualNBackService {
  private readonly logger = new Logger(DualNBackService.name);
  @Inject() configService: ConfigService;

  public createBlock(n: number): Block {
    this.logger.log(`Using config: ${JSON.stringify(this.configService)}`);

    const hits = Math.floor(
      this.configService.get('base_amount_of_trials') *
        this.configService.get('hit_percentage'),
    );
    this.logger.log(`Creating block with ${hits} hits`);

    const trials: Trial[] = this.createTrials(n);

    do {
      this.logger.log(`Ensuring ${hits} hits for vision`);
      this.hitifyTrials(trials, 'vision', hits, n);
    } while (trials.filter((trial) => trial.f_vision_correct).length !== hits);

    do {
      this.logger.log(`Ensuring ${hits} hits for sound`);
      this.hitifyTrials(trials, 'sound', hits, n);
    } while (trials.filter((trial) => trial.f_sound_correct).length !== hits);

    return {
      n,
      trials,
    };
  }

  private hitifyTrials(
    trials: Trial[],
    type: 'sound' | 'vision',
    hits: number,
    n: number,
  ): void {
    const hitArray = this.createHitArray(hits, n);

    for (let i = 0; i < trials.length; i++) {
      const isHit = hitArray[i];

      trials[i][type] = isHit
        ? trials[i - n][type]
        : this.getExcludedRandomNumber(
            trials[i - n]?.[type],
            this.configService.get(`${type}_count`),
          );
      trials[i][`f_${type}_correct`] = isHit;
    }
  }

  private createTrials(n: number): Trial[] {
    const trials: Trial[] = [];

    for (
      let i = 0;
      i < this.configService.get('base_amount_of_trials') + n;
      i++
    ) {
      trials.push(this.createBaseTrial());
    }

    return trials;
  }

  private createBaseTrial(): Trial {
    return {
      sound: 0,
      f_sound_correct: false,
      vision: 0,
      f_vision_correct: false,
      ms_vision_time: this.configService.get('ms_vision_time'),
      ms_fixation_time: this.configService.get('ms_fixation_time'),
    };
  }

  private getExcludedRandomNumber(
    excluded: number | undefined,
    max: number,
  ): number {
    let random = Math.floor(Math.random() * max);
    while (random === excluded) {
      random = Math.floor(Math.random() * max);
    }
    return random;
  }

  private createHitArray(hits: number, n: number): boolean[] {
    const baseAmountOfTrials = this.configService.get('base_amount_of_trials');
    const hitArray = Array.from({ length: baseAmountOfTrials }, () => false); // none of the trials are hits
    // set given amount of hits
    for (let i = 0; i < hits; i++) {
      hitArray[i] = true;
    }
    hitArray.sort(() => Math.random() - 0.5); // shuffle the hits
    // add n non-hits to the beginning of the array to match the array length
    for (let i = 0; i < n; i++) {
      hitArray.splice(0, 0, false);
    }
    return hitArray;
  }
}
