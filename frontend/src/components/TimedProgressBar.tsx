import React, { useEffect, useState } from 'react'
import { classNames } from '../utils/classnames'

interface TimedProgressBarProps {
  className?: string | undefined
  durationMs: number
}

export function TimedProgressBar(props: TimedProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 0)
    return () => {
      clearTimeout(timer)
      setProgress(0)
    }
  }, [])

  return (
    <div
      className={classNames(
        'h-4 w-full max-w-md overflow-hidden rounded-md bg-gray-300',
        props.className
      )}
    >
      <div
        className={classNames(
          'h-full rounded-md bg-blue-500 transition-all ease-linear',
          `duration-[${props.durationMs}ms]`
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
