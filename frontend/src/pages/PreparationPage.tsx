import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { CenteringContainer } from '../components/CenteringContainer'
import { SoundPlayer } from '../components/SoundPlayer'
import BahnSound from 'assets/bahn.mp3'
import { PencilIcon } from '@heroicons/react/20/solid'
import { useConfigQuery } from '../queries/ConfigQuery'
import { DevContainer } from '../components/DevContainer'
import { audioCues, imageCues, preloadCues } from '../utils/preloadCues'
import { Logos } from '../components/Logos'
import { Footer } from '../components/Footer'

export function PreparationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [playedTestAudio, setPlayedTestAudio] = useState(false)
  const [preloadedCues, setPreloadedCues] = useState(false)
  const { data: configData, status: configStatus } = useConfigQuery()

  useEffect(() => {
    if (!experimenteeId) {
      navigate(`/`)
    } else {
      preloadCues(audioCues, imageCues).then(() => setPreloadedCues(true))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (configStatus !== 'success') return
    localStorage.setItem('config', JSON.stringify(configData))
  }, [configStatus, configData])

  const changeExperimenteeId = () => {
    navigate(`/`)
  }
  const setAudioPlayed = () => {
    setPlayedTestAudio(true)
  }
  const startGame = () => {
    if (configStatus === 'success' && preloadedCues) {
      navigate(`/instruction?id=${experimenteeId}`)
    } else if (!preloadedCues) {
      alert(
        'Das Spiel ist noch nicht bereit zum Starten. Einige Dateien werden noch geladen. Bitte warten Sie einige Sekunden und klicken Sie dann erneut auf den blauen Knopf.'
      )
    } else {
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
      navigate(`/?id=${experimenteeId}`)
    }
  }

  return (
    <>
      <CenteringContainer className={'flex-col gap-8'}>
        <Logos />
        <Card>
          <span className={'mb-2 block text-sm'}>
            Bitte überprüfen Sie Ihre <b>Proband:innen-ID</b> und stellen Sie
            die <b>Lautstärke</b> Ihres Gerätes so ein, dass Sie den Test-Ton
            gut hören können.
          </span>
          <div className={'my-8'}>
            <div className={'flex'}>
              <span className={'mb-2 block text-sm'}>
                Proband:innen-ID: {experimenteeId}
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
            Die Proband:innen-ID ist korrekt, die Laustärke ist passend
            eingestellt und ich bin bereit mit dem Spiel zu beginnen
          </button>
          <DevContainer className={'mt-8'}>
            <button
              className={
                'w-full rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
              }
              onClick={() => {
                navigate(`/result?id=${experimenteeId}`, {
                  state: { highestN: '6' }
                })
              }}
            >
              Go to very end
            </button>
          </DevContainer>
        </Card>
      </CenteringContainer>
      <Footer />
    </>
  )
}
