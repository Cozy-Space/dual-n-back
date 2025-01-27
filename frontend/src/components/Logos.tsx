import React from 'react'
import { classNames } from '../utils/classnames'

interface LogosProps {
  className?: string | undefined
}

export function Logos(props: LogosProps) {
  return (
    <div
      className={classNames(
        'flex w-full max-w-sm flex-row justify-between',
        props.className
      )}
    >
      <img
        className={'h-20 object-scale-down'}
        src={'images/allgpsyLogo.png'}
        alt={'Screenshot'}
      />
      <img
        className={'h-20 object-scale-down'}
        src={'images/udeLogo.png'}
        alt={'Screenshot'}
      />
    </div>
  )
}
