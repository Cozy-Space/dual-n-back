import { classNames } from '../utils/classnames'
import React from 'react'
import { isDev } from '../hooks/useProductionVariable'

interface DevContainerProps {
  children?: React.ReactNode
  className?: string | undefined
}

export function DevContainer(props: DevContainerProps) {
  return (
    <>
      {isDev() && (
        <div
          className={classNames(
            'border-2 border-pink-500 border-dashed rounded-md',
            props.className
          )}
        >
          {props.children}
        </div>
      )}
    </>
  )
}
