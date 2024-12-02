import { ReactionType } from '../pages/GamePage'
import { Feedback } from '../components/Feedback'
import { Trial } from 'types'

export function calculateFeedback(
  userReaction: ReactionType,
  currentTrial: Trial
): { correct: boolean; feedback: Feedback } {
  if (currentTrial.is_auditory_target && currentTrial.is_visual_target) {
    return calculateFeedbackForAuditoryAndVisualTarget(userReaction)
  } else if (currentTrial.is_auditory_target) {
    return calculateFeedbackForAuditoryTarget(userReaction)
  } else if (currentTrial.is_visual_target) {
    return calculateFeedbackForVisualTarget(userReaction)
  } else {
    return calculateFeedbackForNoTarget(userReaction)
  }
}

function calculateFeedbackForNoTarget(userReaction: ReactionType): {
  correct: boolean
  feedback: Feedback
} {
  switch (userReaction) {
    case 'auditory_visual':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'negative'
        }
      }
    case 'auditory':
      return {
        correct: false,
        feedback: {
          visual: 'none',
          auditory: 'negative'
        }
      }
    case 'visual':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'none'
        }
      }
    case 'none':
      return {
        correct: true,
        feedback: {
          visual: 'positive',
          auditory: 'positive'
        }
      }
  }
}

function calculateFeedbackForVisualTarget(userReaction: ReactionType): {
  correct: boolean
  feedback: Feedback
} {
  switch (userReaction) {
    case 'auditory_visual':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'negative'
        }
      }
    case 'auditory':
      return {
        correct: false,
        feedback: {
          visual: 'none',
          auditory: 'negative'
        }
      }
    case 'visual':
      return {
        correct: true,
        feedback: {
          visual: 'positive',
          auditory: 'none'
        }
      }
    case 'none':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'none'
        }
      }
  }
}

function calculateFeedbackForAuditoryTarget(userReaction: ReactionType): {
  correct: boolean
  feedback: Feedback
} {
  switch (userReaction) {
    case 'auditory_visual':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'negative'
        }
      }
    case 'auditory':
      return {
        correct: true,
        feedback: {
          visual: 'none',
          auditory: 'positive'
        }
      }
    case 'visual':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'none'
        }
      }
    case 'none':
      return {
        correct: false,
        feedback: {
          visual: 'none',
          auditory: 'negative'
        }
      }
  }
}

function calculateFeedbackForAuditoryAndVisualTarget(
  userReaction: ReactionType
): {
  correct: boolean
  feedback: Feedback
} {
  switch (userReaction) {
    case 'auditory_visual':
      return {
        correct: true,
        feedback: {
          visual: 'positive',
          auditory: 'positive'
        }
      }
    case 'auditory':
      return {
        correct: false,
        feedback: {
          visual: 'none',
          auditory: 'negative'
        }
      }
    case 'visual':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'none'
        }
      }
    case 'none':
      return {
        correct: false,
        feedback: {
          visual: 'negative',
          auditory: 'negative'
        }
      }
  }
}
