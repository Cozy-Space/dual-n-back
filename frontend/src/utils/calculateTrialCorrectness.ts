import { Trial, TrialType } from 'types'

export function calculateTrialCorrectness(
  userReaction: TrialType,
  currentTrial: Trial
): boolean {
  return userReaction === currentTrial.trialType
}
