import { TrialType } from './trial.model'

export type Reaction = {
  correct: boolean;
  trialType: TrialType;
  reactionType: TrialType;
};
