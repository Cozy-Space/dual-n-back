import { useEffect, useRef } from 'react'

interface SoundProps {
  soundId: number | undefined
}

export function Sound(props: SoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current && props.soundId !== undefined) {
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [props.soundId])

  return (
    <audio ref={audioRef}>
      <source src={idToAsset(props.soundId)} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  )
}

function idToAsset(id: number | undefined): string {
  return id === undefined ? '' : `audio/a${id + 1}.mp3`
}
