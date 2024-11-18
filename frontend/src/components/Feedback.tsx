import { classNames } from '../utils/classnames'
import React, { useEffect, useRef } from 'react'

export type FeedbackType = 'visual' | 'audio' | 'both' | 'none'

interface FeedbackProps {
  className?: string | undefined
  feedback: FeedbackType
  muted: boolean
}

export function Feedback(props: FeedbackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (
      audioRef.current &&
      (props.feedback === 'audio' || props.feedback === 'both') &&
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
      {shouldShowVisual(props.feedback) && (
        <img
          className={'max-w-lg'}
          src="/images/visuallyFeedback.jpg"
          alt="visually feedback"
        />
      )}
      {shouldPlayAudio(props.feedback, props.muted) && (
        <audio ref={audioRef}>
          <source src="/audio/auditoryFeedback.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  )
}

function shouldPlayAudio(feedback: FeedbackType, muted: boolean) {
  return (feedback === 'audio' || feedback === 'both') && !muted
}

function shouldShowVisual(feedback: FeedbackType) {
  return feedback === 'visual' || feedback === 'both'
}

function shouldShowFeedback(feedback: FeedbackType) {
  return feedback !== 'none'
}
