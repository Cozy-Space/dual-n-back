import { Dev, DevText } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Config, Reaction, Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'
import {
  EyeIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/solid'
import { Sound } from '../components/Sound'
import { useNQuery } from '../queries/UseNQuery'
import { Either } from '../components/Either'
import { NChangeNotification } from '../components/NChangeNotification'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DevContainer } from '../components/DevContainer'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

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

type ReactionType = 'none' | 'vision' | 'sound'

export function GamePage() {
  const navigate = useNavigate()
  const [muted, setMuted] = useState(false) //debug purposes
  const [redirectToStart, setRedirectToStart] = useState(false)
  const [searchParams] = useSearchParams()
  const experimenteeId = searchParams.get('id')
  const [config] = useLocalStorage<Config>('config', () => {
    setRedirectToStart(true)
  })
  const [n, setN] = useState<number>(1)
  const [currentBlockNr, setCurrentBlockNr] = useState<number>(0)
  const [listOfN, setListOfN] = useState<number[]>([])
  const [oldN, setOldN] = useState<number | undefined>(undefined)
  const [userReaction, setUserReaction] = useState<ReactionType>('none')
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
        timeoutMs = 5000
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
              // Correct (vision)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'sound' &&
              currentTrial?.f_sound_correct
            ) {
              // Correct (sound)
              setTrialCorrectness((prevState) => [
                ...prevState,
                { correct: true }
              ])
            } else if (
              userReaction === 'none' &&
              !currentTrial?.f_vision_correct &&
              !currentTrial?.f_sound_correct
            ) {
              // Correct (none)
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
              // Incorrect
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
      // Todo: handle error
      // navigate(/error, code: $65423)
      return
    }
    if (blockStatus !== 'success') return
    setCurrentTrialIndex(0)
    if (oldN !== n) {
      setGamePhase('notify_user_about_n_change')
    } else {
      setGamePhase('starting')
    }
  }, [blockStatus, blockData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nStatus === 'error') {
      // Todo: handle error
      // navigate(/error, code: $1234)
      return
    }
    if (nStatus !== 'success') return
    setOldN(n)
    setN(nData)
    setEnableNQuery(false)
    setGamePhase('loading')
  }, [nStatus, nData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CenteringContainer>
      <div
        className={
          'flex h-screen w-screen flex-col items-center justify-center'
        }
      >
        <DevContainer className={'fixed left-0 top-0 z-10'}>
          <Dev
            values={{
              n,
              currentTrialIndex: String(currentTrialIndex),
              gamePhase,
              blockLength: blockData?.trials.length,
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
                gamePhase === 'queue' ? currentTrial?.vision_image : undefined
              }
            />
          }
          showAWhen={gamePhase === 'notify_user_about_n_change'}
        />
        <Sound
          soundId={gamePhase === 'queue' ? currentTrial?.sound : undefined}
          muted={muted}
        />
        <div className={'mt-4 flex gap-8'}>
          <button
            className={
              'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
            }
            onClick={() => setUserReaction('vision')}
          >
            <EyeIcon className={'size-10 cursor-pointer text-white'} />
          </button>
          <button
            className={
              'cursor-pointer rounded-md bg-blue-500 px-16 py-4 text-white hover:bg-blue-600'
            }
            onClick={() => setUserReaction('sound')}
          >
            <SpeakerWaveIcon className={'size-10 text-white'} />
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
  )
}
