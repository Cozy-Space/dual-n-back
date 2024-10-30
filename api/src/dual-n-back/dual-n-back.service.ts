import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Block, Trial } from 'types';

type HitType = 'sound' | 'vision_position' | 'none';

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
    const hitArray: HitType[] = this.createHitArray(
      this.configService.get('base_amount_of_trials'),
      n,
      hits,
    );
    this.hitifyTrials(trials, hitArray, n);

    this.addRandomVisionImages(trials);

    return {
      n,
      trials,
    };
  }

  private hitifyTrials(trials: Trial[], hitArray: HitType[], n: number): void {
    if (trials.length !== hitArray.length) {
      throw new Error(
        `trials(${trials.length}) and hitArray(${hitArray.length}) must have the same length`,
      );
    }
    for (let i = 0; i < trials.length; i++) {
      if (i < n) {
        trials[i].vision_position = this.getExcludedRandomNumber(
          undefined,
          this.configService.get('vision_position_count'),
        );
        trials[i].sound = this.getExcludedRandomNumber(
          undefined,
          this.configService.get('sound_count'),
        );

        continue;
      }
      const hitType = hitArray[i];
      if (hitType === 'vision_position') {
        trials[i].vision_position = trials[i - n].vision_position;
        trials[i].sound = this.getExcludedRandomNumber(
          trials[i - n].sound,
          this.configService.get('sound_count'),
        );
      } else if (hitType === 'sound') {
        trials[i].vision_position = this.getExcludedRandomNumber(
          trials[i - n].vision_position,
          this.configService.get('vision_position_count'),
        );
        trials[i].sound = trials[i - n].sound;
      } else {
        trials[i].vision_position = this.getExcludedRandomNumber(
          trials[i - n].vision_position,
          this.configService.get('vision_position_count'),
        );
        trials[i].sound = this.getExcludedRandomNumber(
          trials[i - n].sound,
          this.configService.get('sound_count'),
        );
      }
      trials[i].f_vision_correct = hitType === 'vision_position';
      trials[i].f_sound_correct = hitType === 'sound';
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
      vision_position: -1,
      vision_image: 0,
      f_vision_correct: false,
      ms_vision_time: this.configService.get('ms_vision_time'),
      ms_fixation_time: this.configService.get('ms_fixation_time'),
    };
  }

  private addRandomVisionImages(trials: Trial[]): void {
    const visionImages = Array.from(
      { length: this.configService.get('vision_image_count') },
      (_, i) => i,
    );
    visionImages.sort(() => Math.random() - 0.5);

    for (let i = 0; i < trials.length; i++) {
      trials[i].vision_image =
        visionImages[i % this.configService.get('vision_image_count')];
    }
  }

  getExcludedRandomNumber(excluded: number | undefined, max: number): number {
    let random = Math.floor(Math.random() * max);
    while (random === excluded) {
      random = Math.floor(Math.random() * max);
    }
    return random;
  }

  createHitArray(
    baseAmountOfTrials: number = this.configService.get(
      'base_amount_of_trials',
    ),
    n: number,
    hits: number,
  ): HitType[] {
    const hitArray: HitType[] = Array.from(
      { length: baseAmountOfTrials },
      () => 'none',
    ); // none of the trials are hits
    // set given amount of hits
    for (let i = 0; i < hits * 2; i++) {
      if (i < hits) {
        hitArray[i] = 'vision_position';
      } else {
        hitArray[i] = 'sound';
      }
    }
    hitArray.sort(() => Math.random() - 0.5); // shuffle the hits
    // add n non-hits to the beginning of the array to match the array length
    for (let i = 0; i < n; i++) {
      hitArray.splice(0, 0, 'none');
    }
    return hitArray;
  }
}
