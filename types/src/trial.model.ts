export type Trial = {
  soundFileId: number;
  visionPosition: number;
  trialType: TrialType;

  imageFile: number;

  visionTimeMs: number;
  reactionTimeMs: number;
};


export type TrialType = 'none' | 'auditory' | 'visual' | 'auditory_visual'

