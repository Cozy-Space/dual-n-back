import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private config: { [key: string]: number } = {
    base_amount_of_trials: 20,
    hit_percentage: 0.3, // per queue type (sound, vision_position), so it is 0.6 in total
    vision_image_count: 20,
    vision_position_count: 16,
    sound_count: 10,
    ms_vision_time: 1000,
    ms_fixation_time: 3000,
  };

  public get(key: string): number {
    return this.config[key];
  }
}
