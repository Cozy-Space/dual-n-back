import { classNames } from '../utils/classnames'
import React from 'react'
import { TimedProgressBar } from './TimedProgressBar'

interface NChangeNotificationProps {
  n: number
  timeout: number
  className?: string | undefined
}

export function NChangeNotification(props: NChangeNotificationProps) {
  return (
    <div
      className={classNames(
        'aspect-square w-full max-w-screen-md flex items-center justify-center flex-col',
        props.className
      )}
    >
      <span className={'text-center text-2xl'}>
        In den folgenden Durchgängen gibt es eine Übereinstimmung, wenn die
        Position/das Wort identisch ist, wie die Position/ das Wort{' '}
        <b>{mapNToDurchgang(props.n)}</b> zuvor.
      </span>
      <TimedProgressBar durationMs={props.timeout} className={'mt-14'} />
    </div>
  )
}

function mapNToDurchgang(n: number) {
  switch (n) {
    case 1:
      return 'ein Durchgang'
    case 2:
      return 'zwei Durchgänge'
    case 3:
      return 'drei Durchgänge'
    case 4:
      return 'vier Durchgänge'
    case 5:
      return 'fünf Durchgänge'
    case 6:
      return 'sechs Durchgänge'
    case 7:
      return 'sieben Durchgänge'
    case 8:
      return 'acht Durchgänge'
    case 9:
      return 'neun Durchgänge'
    case 10:
      return 'zehn Durchgänge'
    default:
      return n + ' Durchgänge'
  }
}
