import { Dev } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'
import { EyeIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'

type GamePhase =
  | 'loading'
  | 'starting'
  | 'fixation'
  | 'queue'
  | 'block_finished'

export function GamePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [n, setN] = useState<number>(1)

  const { data, status, refetch } = useBlockQuery(n)

  const [currentTrialIndex, setCurrentTrialIndex] = useState<
    number | undefined
  >(undefined)

  const [gamePhase, setGamePhase] = useState<GamePhase>('loading')

  const currentTrial = useMemo<Trial | undefined>(() => {
    if (currentTrialIndex === undefined || !data) return undefined
    return data.trials[currentTrialIndex]
  }, [currentTrialIndex, data])

  useEffect(() => {
    if (!experimenteeId) {
      navigate(`/`)
    }
  }, [])

  useEffect(() => {
    let timeoutMs: number
    let callback: () => void
    switch (gamePhase) {
      case 'loading':
        timeoutMs = 0
        callback = () => {
          console.log('loading')
        }
        break
      case 'starting':
        timeoutMs = 5000
        callback = () => {
          setCurrentTrialIndex(0)
          setGamePhase('queue')
        }
        break
      case 'fixation':
        timeoutMs = currentTrial?.ms_fixation_time || 0
        callback = () => {
          setGamePhase('queue')
        }
        break
      case 'queue':
        timeoutMs = currentTrial?.ms_vision_time || 0
        callback = () => {
          if (!data || currentTrialIndex === undefined) {
            return
          }
          if (currentTrialIndex === data.trials.length - 1) {
            setGamePhase('block_finished')
          } else {
            setCurrentTrialIndex(currentTrialIndex + 1)
            setGamePhase('fixation')
          }
        }
        break
      case 'block_finished':
        timeoutMs = 5000
        callback = () => {
          setN(n + 1)
          setGamePhase('loading')
        }
        break
    }

    setTimeout(callback, timeoutMs)
  }, [gamePhase])

  useEffect(() => {
    if (status !== 'success') return
    setCurrentTrialIndex(0)
    setGamePhase('starting')
  }, [status])

  return (
    <CenteringContainer>
      <div className={'h-screen w-screen'}>
        <Dev
          values={{
            currentTrialIndex: String(currentTrialIndex),
            gamePhase,
            n,
            blockLength: data?.trials.length,
            visionBlock: currentTrial?.vision_position,
            shouldClickVision: currentTrial?.f_vision_correct ? 'yes' : 'no',
            queryStatus: status
          }}
        />
        <div
          className={'flex size-full flex-col items-center justify-center py-4'}
        >
          <Matrix
            activeId={
              gamePhase === 'queue' ? currentTrial?.vision_position : undefined
            }
          />
          <div className={''}>
            <button
              className={
                'mr-8 mt-4 cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => void refetch()}
            >
              <EyeIcon className={'size-10 cursor-pointer text-white'} />
            </button>
            <button
              className={
                'ml-8 mt-4 cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => void refetch()}
            >
              <SpeakerWaveIcon
                className={'size-10 cursor-pointer text-white'}
              />
            </button>
          </div>
        </div>
      </div>
    </CenteringContainer>
  )
}
