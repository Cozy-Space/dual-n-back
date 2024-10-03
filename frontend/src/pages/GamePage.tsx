import { Dev } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'
import { EyeIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'

type TimeState = 'fixation' | 'queue'

export function GamePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [n, setN] = useState<number>(1)

  const { data, isLoading, status, refetch } = useBlockQuery(n)

  const [currentTrialIndex, setCurrentTrialIndex] = useState<
    number | undefined
  >(undefined)

  const [timeState, setTimeState] = useState<TimeState | undefined>(undefined)

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
    if (!currentTrial || currentTrialIndex === undefined || !timeState) return

    if (timeState === 'fixation') {
      setTimeout(() => {
        setTimeState('queue')
      }, currentTrial.ms_fixation_time)
      return
    }

    if (timeState === 'queue') {
      setTimeout(() => {
        setTimeState('fixation')
        setCurrentTrialIndex(currentTrialIndex + 1)
      }, currentTrial.ms_vision_time)
      return
    }
  }, [currentTrialIndex, currentTrial, timeState])

  useEffect(() => {
    if (status !== 'success') return
    setCurrentTrialIndex(0)
    setTimeState('fixation')
  }, [status])

  return (
    <CenteringContainer>
      <div className={'h-screen w-screen'}>
        {isLoading && <div>Loading...</div>}
        <Dev
          values={{
            currentTrialIndex: String(currentTrialIndex),
            timeState,
            n,
            blockLength: data?.trials.length,
            visionBlock: currentTrial?.vision_position,
            shouldClickVision: currentTrial?.f_vision_correct ? 'yes' : 'no'
          }}
        />
        <div
          className={'flex size-full flex-col items-center justify-center py-4'}
        >
          <Matrix
            activeId={
              timeState === 'queue' ? currentTrial?.vision_position : undefined
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
