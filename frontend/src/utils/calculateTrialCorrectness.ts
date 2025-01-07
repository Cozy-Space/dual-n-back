import { ReactionType } from '../pages/GamePage'
import { Trial } from 'types'

export function calculateTrialCorrectness(
  userReaction: ReactionType,
  currentTrial: Trial
): boolean {
  if (currentTrial.is_auditory_target && currentTrial.is_visual_target) {
    return userReaction === 'auditory_visual'
  } else if (currentTrial.is_auditory_target) {
    return userReaction === 'auditory'
  } else if (currentTrial.is_visual_target) {
    return userReaction === 'visual'
  } else {
    return userReaction === 'none'
  }
}
