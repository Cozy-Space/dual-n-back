import { classNames } from '../utils/classnames'
import React from 'react'

interface BottomBarProps {
  children?: React.ReactNode
  className?: string | undefined
}

export function BottomBar(props: BottomBarProps) {
  return (
    <div className={classNames('absolute bottom-0', props.className)}>
      {props.children}
    </div>
  )
}
