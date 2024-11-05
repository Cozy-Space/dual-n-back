export type Trial = {
  sound_file: number;
  is_auditory_target: boolean;

  vision_position: number;
  is_visual_target: boolean;
  image_file: number;

  ms_vision_time: number;
  ms_reaction_time: number;
};
