import { classNames } from '../utils/classnames'
import React from 'react'

interface CardProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string | undefined
}

export function Card(props: CardProps) {
  return (
    <div
      className={classNames(
        'w-full max-w-sm rounded-lg bg-white p-6 shadow-md',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
