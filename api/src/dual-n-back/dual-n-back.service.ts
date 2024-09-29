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

    this.logger.log(`Ensuring ${hits} hits for vision`);

    do {
      this.hitifyTrials(trials, 'vision', n);
    } while (trials.filter((trial) => trial.f_vision_correct).length !== hits);

    this.logger.log(`Ensuring ${hits} hits for sound`);
    do {
      this.hitifyTrials(trials, 'sound', n);
    } while (trials.filter((trial) => trial.f_sound_correct).length !== hits);

    return {
      n,
      trials,
    };
  }

  private hitifyTrials(
    trials: Trial[],
    type: 'sound' | 'vision',
    n: number,
  ): void {
    for (let i = 0; i < trials.length; i++) {
      const isHit =
        i < n ? false : this.isHit(this.configService.get('hit_percentage'));

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

  private createBaseTrial() {
    return {
      sound: 0,
      f_sound_correct: false,
      vision: 0,
      f_vision_correct: false,
      ms_vision_time: 0,
      ms_fixation_time: 0,
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

  private isHit(percentage: number): boolean {
    return Math.random() < percentage;
  }
}
