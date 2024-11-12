import { classNames } from '../utils/classnames'
import React from 'react'

interface ProgressBarProps {
  className?: string | undefined
  style?: React.CSSProperties
  progress: number // 0-100
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div
      className={classNames(
        'w-full max-w-sm rounded-md h-3 border border-blue-500',
        props.className
      )}
    >
      <div
        className="h-full rounded-md bg-blue-500"
        style={{ ...props.style, width: `${props.progress}%` }}
      />
    </div>
  )
}
