import { Dev } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'

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

  console.log(currentTrial, currentTrialIndex)

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
      <div
        className={
          'flex h-screen w-screen flex-col items-center justify-center'
        }
      >
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
        <Matrix
          activeId={
            timeState === 'queue' ? currentTrial?.vision_position : undefined
          }
        />
        <div>
          <button
            className={
              'mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            }
            onClick={() => void refetch()}
          >
            bla
          </button>
        </div>
      </div>
    </CenteringContainer>
  )
}
