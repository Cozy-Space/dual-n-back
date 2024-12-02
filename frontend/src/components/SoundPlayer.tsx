import React, { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { classNames } from '../utils/classnames'

interface SoundPlayerProps {
  className?: string | undefined
  soundFile: string
  buttonText: string
  callback?: () => void
}

export function SoundPlayer(props: SoundPlayerProps) {
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#1D4ED8',
        progressColor: '#3B82F6',
        barWidth: 2,
        cursorWidth: 1,
        height: 60
      })

      // Load the audio file
      wavesurferRef.current.load(props.soundFile)

      return () => {
        // Clean up Wavesurfer on unmount
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy()
        }
      }
    }
  }, [props.soundFile])

  const playPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
      props.callback && props.callback()
    }
  }

  return (
    <div
      className={classNames(
        'mb-4 flex w-full items-center space-x-4',
        props.className
      )}
    >
      <button
        onClick={playPause}
        className="rounded-md border-2 border-solid border-blue-500 px-4 py-2 text-sm hover:border-blue-700 hover:bg-blue-50"
      >
        {props.buttonText}
      </button>
      <div ref={waveformRef} className="w-full"></div>
    </div>
  )
}
