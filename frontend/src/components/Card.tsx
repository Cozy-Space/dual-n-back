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

interface StatsCardProps {
  value: string
  description: string
}

export function StatsCard(props: StatsCardProps) {
  return (
    <Card className={'flex flex-col justify-center text-center'}>
      <span className="pr-1 text-3xl font-bold italic">{props.value}</span>
      <span className="font-semibold text-gray-400">{props.description}</span>
    </Card>
  )
}
