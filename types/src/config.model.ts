export type DayConfig = {
  amount_of_blocks_to_play: number;
};
export type GameConfig = {
  base_amount_of_trials: number;
  amount_of_auditory_targets: number;
  amount_of_visual_targets: number;
  amount_of_auditory_visual_targets: number;

  amount_of_images: number;
  amount_of_positions: number;
  amount_of_sounds: number;
  ms_vision_time: number;
  ms_reaction_time: number;
  consecutive_right_hits_for_upgrade: number;
  consecutive_wrong_hits_for_downgrade: number;
};
