import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'
import { SoundPlayer } from '../components/SoundPlayer'
import BahnSound from 'assets/bahn.mp3'
import { PencilIcon } from '@heroicons/react/20/solid'

export function PreparationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [playedTestAudio, setPlayedTestAudio] = useState(false)

  useEffect(() => {
    if (!experimenteeId) {
      navigate(`/`)
    }
  }, [])

  const changeExperimenteeId = () => {
    navigate(`/`)
  }
  const setAudioPlayed = () => {
    setPlayedTestAudio(true)
  }
  const startGame = () => {
    navigate(`/game?id=${experimenteeId}`)
  }

  return (
    <CenteringContainer>
      <Card>
        <span className={'mb-2 block text-sm'}>
          Bitte überprüfen Sie Ihre <b>Probandennummer</b> und stellen Sie die{' '}
          <b>Lautstärke</b> so ein, dass Sie den Test-Ton gut hören können.
        </span>
        <div className={'my-8'}>
          <div className={'flex'}>
            <span className={'mb-2 block text-sm'}>
              Probandennummer: {experimenteeId}
            </span>
            <PencilIcon
              onClick={changeExperimenteeId}
              className={
                'ml-2 size-5 cursor-pointer text-blue-500 hover:text-blue-700'
              }
            />
          </div>

          <SoundPlayer
            buttonText={'Test-Ton abspielen'}
            soundFile={BahnSound}
            callback={setAudioPlayed}
          />
        </div>
        <button
          disabled={!playedTestAudio}
          onClick={startGame}
          className={
            'w-full rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition duration-1000 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300'
          }
        >
          Die Probandennummer ist korrekt, die Laustärke ist eingestellt und ich
          bin bereit mit dem Spiel zu beginnen
        </button>
      </Card>
    </CenteringContainer>
  )
}
