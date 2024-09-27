import { classNames } from '../utils/classnames'
import React from 'react'

interface CenteringContainerProps {
  children?: React.ReactNode
  className?: string | undefined
}

export function CenteringContainer(props: CenteringContainerProps) {
  return (
    <div
      className={classNames(
        'flex min-h-screen items-center justify-center bg-blue-100',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
