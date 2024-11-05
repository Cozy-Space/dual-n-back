import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Block, Trial } from 'types';

type HitType = 'auditory' | 'visual' | 'auditory_visual' /* = both */ | 'none';

@Injectable()
export class DualNBackService {
  private readonly logger = new Logger(DualNBackService.name);
  @Inject() configService: ConfigService;

  public createBlock(n: number): Block {
    const config = this.configService.getGameConfig();
    this.logger.log(`Using config: ${config}`);

    const trials: Trial[] = this.createTrials(n);
    const hitArray: HitType[] = this.createHitArray(
      config.base_amount_of_trials,
      n,
      config.amount_of_auditory_targets,
      config.amount_of_visual_targets,
      config.amount_of_auditory_visual_targets,
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
          this.configService.getGameConfig().amount_of_positions,
        );
        trials[i].sound_file = this.getExcludedRandomNumber(
          undefined,
          this.configService.getGameConfig().amount_of_sounds,
        );

        continue;
      }
      const hitType = hitArray[i];
      if (hitType === 'visual') {
        trials[i].vision_position = trials[i - n].vision_position;
        trials[i].sound_file = this.getExcludedRandomNumber(
          trials[i - n].sound_file,
          this.configService.getGameConfig().amount_of_sounds,
        );
      } else if (hitType === 'auditory') {
        trials[i].vision_position = this.getExcludedRandomNumber(
          trials[i - n].vision_position,
          this.configService.getGameConfig().amount_of_positions,
        );
        trials[i].sound_file = trials[i - n].sound_file;
      } else if (hitType === 'auditory_visual') {
        trials[i].vision_position = trials[i - n].vision_position;
        trials[i].sound_file = trials[i - n].sound_file;
      } else {
        trials[i].vision_position = this.getExcludedRandomNumber(
          trials[i - n].vision_position,
          this.configService.getGameConfig().amount_of_positions,
        );
        trials[i].sound_file = this.getExcludedRandomNumber(
          trials[i - n].sound_file,
          this.configService.getGameConfig().amount_of_sounds,
        );
      }
      trials[i].is_visual_target =
        hitType === 'visual' || hitType === 'auditory_visual';
      trials[i].is_auditory_target =
        hitType === 'auditory' || hitType === 'auditory_visual';
    }
  }

  private createTrials(n: number): Trial[] {
    const trials: Trial[] = [];

    for (
      let i = 0;
      i < this.configService.getGameConfig().base_amount_of_trials + n;
      i++
    ) {
      trials.push(this.createBaseTrial());
    }

    return trials;
  }

  private createBaseTrial(): Trial {
    return {
      sound_file: 0,
      is_auditory_target: false,
      vision_position: -1,
      image_file: 0,
      is_visual_target: false,
      ms_vision_time: this.configService.getGameConfig().ms_vision_time,
      ms_reaction_time: this.configService.getGameConfig().ms_reaction_time,
    };
  }

  private addRandomVisionImages(trials: Trial[]): void {
    const images = Array.from(
      { length: this.configService.getGameConfig().amount_of_images },
      (_, i) => i,
    );
    images.sort(() => Math.random() - 0.5);

    for (let i = 0; i < trials.length; i++) {
      trials[i].image_file =
        images[i % this.configService.getGameConfig().amount_of_images];
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
    baseAmountOfTrials: number,
    n: number,
    auditoryHits: number,
    visualHits: number,
    auditoryVisualHits: number,
  ): HitType[] {
    const hitArray: HitType[] = Array.from(
      { length: baseAmountOfTrials },
      () => 'none',
    ); // none of the trials are hits
    // set given amount of hits
    for (let i = 0; i < auditoryVisualHits; i++) {
      hitArray[i] = 'auditory_visual';
    }
    for (let i = 0; i < visualHits; i++) {
      hitArray[auditoryVisualHits + i] = 'visual';
    }
    for (let i = 0; i < auditoryHits; i++) {
      hitArray[auditoryVisualHits + visualHits + i] = 'auditory';
    }
    hitArray.sort(() => Math.random() - 0.5); // shuffle the hits
    // add n non-hits to the beginning of the array to match the array length
    for (let i = 0; i < n; i++) {
      hitArray.splice(0, 0, 'none');
    }
    return hitArray;
  }
}
