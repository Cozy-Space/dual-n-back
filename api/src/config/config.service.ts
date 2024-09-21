import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private config: { [key: string]: number } = {
    base_amount_of_trials: 20,
    hit_percentage: 0.3,
    vision_count: 16,
    sound_count: 16,
  };

  public get(key: string): number {
    return this.config[key];
  }
}
