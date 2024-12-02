import { classNames } from '../utils/classnames'
import React, { useEffect, useRef } from 'react'

export type FeedbackType = 'positive' | 'negative' | 'none'
export type Feedback = { visual: FeedbackType; auditory: FeedbackType }

const POSITIVE_SMILEY_FILE = '/images/positiveSmiley.png'
const NEGATIVE_SMILEY_FILE = '/images/negativeSmiley.png'
const POSITIVE_JINGLE_FILE = '/audio/positiveJingle.mp3'
const NEGATIVE_JINGLE_FILE = '/audio/negativeJingle.mp3'

interface FeedbackProps {
  className?: string | undefined
  feedback: Feedback
  muted: boolean
}

export function Feedback(props: FeedbackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (
      audioRef.current &&
      getJingleForFeedback(props.feedback) !== '' &&
      !props.muted
    ) {
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [props.feedback, props.muted])

  return (
    <div
      className={classNames(
        props.className,
        'absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-gray-500/60 transition-all duration-100',
        shouldShowFeedback(props.feedback)
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      )}
    >
      {getSmileyForFeedback(props.feedback) !== '' && (
        <img
          className={'max-w-lg'}
          src={getSmileyForFeedback(props.feedback)}
          alt="visually feedback"
        />
      )}
      {!props.muted && getJingleForFeedback(props.feedback) !== '' && (
        <audio ref={audioRef}>
          <source src={getJingleForFeedback(props.feedback)} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  )
}

function getJingleForFeedback(feedback: Feedback): string {
  if (feedback.auditory === 'positive') {
    return POSITIVE_JINGLE_FILE
  } else if (feedback.auditory === 'negative') {
    return NEGATIVE_JINGLE_FILE
  }
  return ''
}

function getSmileyForFeedback(feedback: Feedback): string {
  if (feedback.visual === 'positive') {
    return POSITIVE_SMILEY_FILE
  } else if (feedback.visual === 'negative') {
    return NEGATIVE_SMILEY_FILE
  }
  return ''
}

function shouldShowFeedback(feedback: Feedback): boolean {
  return feedback.visual !== 'none' || feedback.auditory !== 'none'
}
