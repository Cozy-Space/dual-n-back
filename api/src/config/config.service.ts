import { Injectable } from '@nestjs/common';
import { Config } from 'types';

@Injectable()
export class ConfigService {
  private blockConfig: { [key: string]: number } = {
    base_amount_of_trials: 10, // default: 20
    hit_percentage: 0.3, // default: 0.3 | per queue type (sound, vision_position), so 60% of the 'base_amount_of_trials' will be hits. This is not a probability. With 20 base_amount_of_trials, and the hit_percentage set to 0.3, there will safely be 12 hits.
    vision_image_count: 20, // default: 20 | you will need to have this amount of images in the '/frontend/public/images' folder
    vision_position_count: 16, // default: 16
    sound_count: 10, // default: 10 | you will need to have this amount of sound files in the '/frontend/public/audio' folder
    ms_vision_time: 1000,
    ms_fixation_time: 3000,
  };

  public get(key: string): number {
    return this.blockConfig[key];
  }

  public getGameConfig(): Config {
    return {
      amount_of_blocks_to_play: 5,
      consecutive_right_hits_for_upgrade: 3,
      consecutive_wrong_hits_for_downgrade: 5,
    };
  }
}
