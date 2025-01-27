import React from 'react'
import { BottomBar } from './BottomBar'
import { useNavigate } from 'react-router-dom'
import { classNames } from '../utils/classnames'

interface FooterProps {
  className?: string | undefined
}

export function Footer(props: FooterProps) {
  const navigate = useNavigate()

  return (
    <BottomBar
      className={classNames(
        'flex w-screen justify-center gap-8 pb-1 text-xs',
        props.className
      )}
    >
      <p className={'cursor-pointer'} onClick={() => navigate('/impressum')}>
        Impressum
      </p>
      <p className={'cursor-pointer'} onClick={() => navigate('/datenschutz')}>
        Datenschutz
      </p>
    </BottomBar>
  )
}
