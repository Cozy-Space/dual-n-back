import { Dev, DevText } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Reaction, Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'
import { EyeIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import { Sound } from '../components/Sound'

type GamePhase =
  // occurs in the order of the enum
  | 'loading'
  | 'starting'
  | 'queue'
  | 'user_can_react'
  | 'feedback'
  | 'wait_for_feedback_is_done'
  | 'block_finished'

export function GamePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [n, setN] = useState<number>(1)
  const [userReaction, setUserReaction] = useState<'none' | 'vision' | 'sound'>(
    'none'
  )
  const { data, status, refetch } = useBlockQuery(n)
  const [currentTrialIndex, setCurrentTrialIndex] = useState<
    number | undefined
  >(undefined)
  const [gamePhase, setGamePhase] = useState<GamePhase>('loading')

  const [trialCorrectness, setTrialCorrectness] = useState<Reaction[]>([])

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
      case 'queue':
        timeoutMs = currentTrial?.ms_vision_time || 0
        callback = () => {
          setGamePhase('user_can_react')
        }
        break
      case 'user_can_react':
        timeoutMs = currentTrial?.ms_fixation_time || 0
        callback = () => {
          setGamePhase('feedback')
        }
        break
      case 'feedback':
        timeoutMs = 1
        callback = () => {
          // give feedback to trial if possible
          if (currentTrial !== undefined && currentTrialIndex !== undefined) {
            if (userReaction === 'vision' && currentTrial?.f_vision_correct) {
              console.log('Correct! (vision)')
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'sound' &&
              currentTrial?.f_sound_correct
            ) {
              console.log('Correct! (sound)')
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'none' &&
              !currentTrial?.f_vision_correct &&
              !currentTrial?.f_sound_correct
            ) {
              console.log('Correct! (none)')
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else {
              let shouldHavePressed: string
              switch (true) {
                case currentTrial?.f_vision_correct:
                  shouldHavePressed = 'vision'
                  break
                case currentTrial?.f_sound_correct:
                  shouldHavePressed = 'sound'
                  break
                default:
                  shouldHavePressed = 'none'
              }
              console.log('Incorrect! Should have pressed', shouldHavePressed)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: false }
              ])
            }
          }
          setUserReaction('none')
          setGamePhase('wait_for_feedback_is_done')
        }
        break
      case 'wait_for_feedback_is_done':
        timeoutMs = 1200
        callback = () => {
          // proceed to next trial
          if (!data || currentTrialIndex === undefined) {
            return
          }
          if (currentTrialIndex === data.trials.length - 1) {
            setGamePhase('block_finished')
          } else {
            setCurrentTrialIndex(currentTrialIndex + 1)
            setGamePhase('queue')
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
            n,
            currentTrialIndex: String(currentTrialIndex),
            gamePhase,
            blockLength: data?.trials.length,
            visionPosition: currentTrial?.vision_position,
            imageContent: (currentTrial?.vision_image ?? -100) + 1,
            shouldClickVision: currentTrial?.f_vision_correct ? (
              <DevText truthy={true} />
            ) : (
              <DevText truthy={false} />
            ),
            shouldClickSound: currentTrial?.f_sound_correct ? (
              <DevText truthy={true} />
            ) : (
              <DevText truthy={false} />
            ),
            queryStatus: status,
            userReaction,
            trialCorrectness: trialCorrectness.map((r) =>
              r.correct ? '✅' : '❌'
            )
          }}
        />
        <div
          className={'flex size-full flex-col items-center justify-center py-4'}
        >
          <Matrix
            activeId={
              gamePhase === 'queue' ? currentTrial?.vision_position : undefined
            }
            imageId={
              gamePhase === 'queue' ? currentTrial?.vision_image : undefined
            }
          />
          <Sound
            soundId={gamePhase === 'queue' ? currentTrial?.sound : undefined}
          />
          <div className={''}>
            <button
              className={
                'mr-8 mt-4 cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => setUserReaction('vision')}
            >
              <EyeIcon className={'size-10 cursor-pointer text-white'} />
            </button>
            <button
              className={
                'ml-8 mt-4 cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => setUserReaction('sound')}
            >
              <SpeakerWaveIcon
                className={'size-10 cursor-pointer text-white'}
              />
            </button>
            <button
              className={
                'ml-16 mt-4 cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => navigate('/')}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </CenteringContainer>
  )
}
