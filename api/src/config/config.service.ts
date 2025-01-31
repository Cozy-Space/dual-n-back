import { Injectable } from '@nestjs/common';
import { DayConfig, GameConfig } from 'types';

@Injectable()
export class ConfigService {
  public getDayConfig(): DayConfig {
    return {
      amount_of_blocks_to_play: 1, // default: 20
    };
  }

  public getGameConfig(): GameConfig {
    return {
      base_amount_of_trials: 20, // default: 20
      amount_of_auditory_targets: 4, // default: 4 | experimentee has to click auditiv-button
      amount_of_visual_targets: 4, // default: 4 | experimentee has to click visual-button
      amount_of_auditory_visual_targets: 2, // default: 2 | experimentee has to click both-button
      // with the default values above, there will be 10 hits in total
      amount_of_images: 20, // default: 20 | you will need to have this amount of images in the '/frontend/public/images' folder
      amount_of_positions: 16, // default: 16
      amount_of_sounds: 10, // default: 10 | you will need to have this amount of sound files in the '/frontend/public/audio' folder
      ms_vision_time: 500,
      ms_reaction_time: 2500,
      consecutive_right_hits_for_upgrade: 3,
      consecutive_wrong_hits_for_downgrade: 5,
    };
  }
}
