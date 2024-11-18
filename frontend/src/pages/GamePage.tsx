import { Dev, DevText } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DayConfig, Reaction, Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'
import {
  ArrowPathIcon,
  EyeIcon,
  PlusCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/solid'
import { Sound } from '../components/Sound'
import { useNQuery } from '../queries/UseNQuery'
import { Either } from '../components/Either'
import { NChangeNotification } from '../components/NChangeNotification'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DevContainer } from '../components/DevContainer'
import { Feedback, FeedbackType } from '../components/Feedback'

// occurs in the order of the enum
type GamePhase =
  | 'loading'
  | 'notify_user_about_n_change'
  | 'starting'
  | 'queue'
  | 'user_can_react'
  | 'feedback'
  | 'wait_for_feedback_is_done'
  | 'block_finished'

type ReactionType = 'none' | 'auditory' | 'visual' | 'auditory_visual'

export function GamePage() {
  const navigate = useNavigate()
  const [muted, setMuted] = useState(false) //debug purposes
  const [redirectToStart, setRedirectToStart] = useState(false)
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [config] = useLocalStorage<DayConfig>('config', () => {
    setRedirectToStart(true)
  })
  const [n, setN] = useState<number>(1)
  const [currentBlockNr, setCurrentBlockNr] = useState<number>(0)
  const [listOfN, setListOfN] = useState<number[]>([])
  const [userReaction, setUserReaction] = useState<ReactionType>('none')
  const [feedback, setFeedback] = useState<FeedbackType>('none')
  const {
    data: blockData,
    status: blockStatus,
    refetch: blockRefetch
  } = useBlockQuery(n)

  const [currentTrialIndex, setCurrentTrialIndex] = useState<
    number | undefined
  >(undefined)

  const [gamePhase, setGamePhase] = useState<GamePhase>('loading')
  const [trialCorrectness, setTrialCorrectness] = useState<Reaction[]>([])

  const [enableNQuery, setEnableNQuery] = useState(false)
  const { data: nData, status: nStatus } = useNQuery(
    n,
    trialCorrectness,
    enableNQuery
  )

  const currentTrial = useMemo<Trial | undefined>(() => {
    if (currentTrialIndex === undefined || !blockData) return undefined
    return blockData.trials[currentTrialIndex]
  }, [currentTrialIndex, blockData])

  useEffect(() => {
    if (!experimenteeId) {
      setRedirectToStart(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (redirectToStart) {
      navigate(`/`)
    }
  }, [redirectToStart]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let timeoutMs: number
    let callback: () => void
    switch (gamePhase) {
      case 'loading':
        timeoutMs = 0
        callback = () => {
          setTrialCorrectness([])
          setListOfN((prevState) => [...prevState, n])
          void blockRefetch()
        }
        break
      case 'notify_user_about_n_change':
        timeoutMs = 10000
        callback = () => {
          setGamePhase('starting')
        }
        break
      case 'starting':
        timeoutMs = 500
        callback = () => {
          setCurrentTrialIndex(0)
          setCurrentBlockNr((prevState) => prevState + 1)
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
        timeoutMs = currentTrial?.ms_reaction_time || 0
        callback = () => {
          setGamePhase('feedback')
        }
        break
      case 'feedback':
        timeoutMs = 0
        callback = () => {
          // give feedback to trial if possible
          if (currentTrial !== undefined && currentTrialIndex !== undefined) {
            if (
              userReaction === 'auditory_visual' &&
              currentTrial.is_auditory_target &&
              currentTrial.is_visual_target
            ) {
              // Correct (auditory and visual)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'visual' &&
              currentTrial.is_visual_target
            ) {
              // Correct (vision)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'auditory' &&
              currentTrial.is_auditory_target
            ) {
              // Correct (sound)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'none' &&
              !currentTrial.is_visual_target &&
              !currentTrial.is_auditory_target
            ) {
              // Correct (none)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else {
              let fb: FeedbackType
              if (
                currentTrial.is_auditory_target &&
                currentTrial.is_visual_target
              ) {
                fb = 'both'
              } else if (currentTrial.is_auditory_target) {
                fb = 'audio'
              } else if (currentTrial.is_visual_target) {
                fb = 'visual'
              } else {
                // clicked none, but he should have clicked something
                fb = 'both'
              }
              setFeedback(fb)
              console.log('Incorrect! Should have pressed', fb)
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
          setFeedback('none')
          if (!blockData || currentTrialIndex === undefined) {
            return
          }
          if (currentTrialIndex === blockData.trials.length - 1) {
            setGamePhase('block_finished')
          } else {
            setCurrentTrialIndex(currentTrialIndex + 1)
            setGamePhase('queue')
          }
        }
        break
      case 'block_finished':
        timeoutMs = 100
        callback = () => {
          if (currentBlockNr === config.amount_of_blocks_to_play) {
            console.log('Game finished!')
            const avgN = listOfN.reduce((a, b) => a + b) / listOfN.length
            // Todo: send avgN, day and experimenteeId to backend
            navigate(`/result?id=${experimenteeId}`, { state: { avgN } })
          } else {
            setEnableNQuery(true)
            // nQuery will trigger the next block automatically
          }
        }
        break
    }
    setTimeout(callback, timeoutMs)
  }, [gamePhase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (blockStatus === 'error') {
      navigate(`/error`, { state: { errorCode: 1804 } })
      return
    }
    if (blockStatus !== 'success') return
    setCurrentTrialIndex(0)
    setGamePhase('notify_user_about_n_change')
  }, [blockStatus, blockData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nStatus === 'error') {
      navigate(`/error`, { state: { errorCode: 1306 } })
      return
    }
    if (nStatus !== 'success') return
    setN(nData)
    setEnableNQuery(false)
    setGamePhase('loading')
  }, [nStatus, nData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CenteringContainer>
        <div
          className={
            'flex h-screen w-screen flex-col items-center justify-center'
          }
        >
          <DevContainer className={'fixed left-0 top-0 z-10'}>
            <Dev
              values={{
                currentBlockNr,
                n,
                currentTrialIndex: String(currentTrialIndex),
                gamePhase,
                blockLength: blockData?.trials.length,
                visionPosition: currentTrial?.vision_position,
                imageContent: (currentTrial?.image_file ?? -100) + 1,
                shouldClickVision: currentTrial?.is_visual_target ? (
                  <DevText truthy={true} />
                ) : (
                  <DevText truthy={false} />
                ),
                shouldClickSound: currentTrial?.is_auditory_target ? (
                  <DevText truthy={true} />
                ) : (
                  <DevText truthy={false} />
                ),
                userReaction,
                trialCorrectness: trialCorrectness.map((r) =>
                  r.correct ? '✅' : '❌'
                ),
                blockQStatus: blockStatus,
                nQStatus: nStatus
              }}
            />
          </DevContainer>
          <Either
            className={'flex size-5/6 flex-col items-center justify-center'}
            a={NChangeNotification({ n })}
            b={
              <Matrix
                activeId={
                  gamePhase === 'queue'
                    ? currentTrial?.vision_position
                    : undefined
                }
                imageId={
                  gamePhase === 'queue' ? currentTrial?.image_file : undefined
                }
              />
            }
            showAWhen={gamePhase === 'notify_user_about_n_change'}
          />
          <Sound
            soundId={
              gamePhase === 'queue' ? currentTrial?.sound_file : undefined
            }
            muted={muted}
          />
          <div className={'mt-4 flex gap-8'}>
            <button
              className={
                'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => setUserReaction('visual')}
            >
              <EyeIcon className={'size-10 cursor-pointer text-white'} />
            </button>
            <button
              className={
                'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => setUserReaction('auditory')}
            >
              <SpeakerWaveIcon className={'size-10 text-white'} />
            </button>
            <button
              className={
                'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
              }
              onClick={() => setUserReaction('auditory_visual')}
            >
              <PlusCircleIcon className={'size-10 text-white'} />
            </button>
          </div>
        </div>
        <DevContainer
          className={
            'absolute left-full top-full flex -translate-x-full -translate-y-full flex-col gap-2'
          }
        >
          <button
            className={
              'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
            }
            onClick={() => {
              setMuted((prevState) => !prevState)
            }}
          >
            {muted ? (
              <SpeakerXMarkIcon className={'size-10 text-white'} />
            ) : (
              <SpeakerWaveIcon className={'size-10 text-white'} />
            )}
          </button>
          <button
            className={
              'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
            }
            onClick={() => {
              console.clear()
              navigate('/')
            }}
          >
            <ArrowPathIcon className={'size-10 text-white'} />
          </button>
        </DevContainer>
      </CenteringContainer>
      <Feedback feedback={feedback} muted={muted} />
    </>
  )
}
