import { classNames } from '../utils/classnames'
import React from 'react'
import { TrialType } from 'types'

interface ReactionButtonProps {
  children?: React.ReactNode
  userReaction: TrialType
  targetReaction: TrialType
  onClick: () => void
  className?: string | undefined
}

export function ReactionButton(props: ReactionButtonProps) {
  return (
    <button
      className={classNames(
        'flex cursor-pointer flex-row rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600 border-8',
        isActive(props) ? 'border-blue-800' : 'border-transparent',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

function isActive(props: ReactionButtonProps) {
  return props.userReaction === props.targetReaction
}
