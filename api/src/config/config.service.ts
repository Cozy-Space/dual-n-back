import { Injectable } from '@nestjs/common';
import { Config } from 'types';

@Injectable()
export class ConfigService {
  private blockConfig: { [key: string]: number } = {
    base_amount_of_trials: 20,
    hit_percentage: 0.3, // per queue type (sound, vision_position), so it is 0.6 in total
    vision_image_count: 20,
    vision_position_count: 16,
    sound_count: 10,
    ms_vision_time: 1000,
    ms_fixation_time: 3000,
  };

  public get(key: string): number {
    return this.blockConfig[key];
  }

  public getGameConfig(): Config {
    return {
      amount_of_blocks_to_play: 1,
      consecutive_right_hits_for_upgrade: 3,
      consecutive_wrong_hits_for_downgrade: 5,
    };
  }
}
