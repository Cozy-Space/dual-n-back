import React from 'react'

interface EitherProps {
  a: React.ReactNode
  b: React.ReactNode
  showAWhen: boolean
  className?: string | undefined
}

export function Either(props: EitherProps) {
  function render() {
    if (props.showAWhen) {
      return props.a
    } else {
      return props.b
    }
  }

  return <div className={props.className}>{render()}</div>
}
