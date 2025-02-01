import { Dev, DevText } from 'components/Dev'
import { useBlockQuery } from 'queries/BlockQuery'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DayConfig, FullStatistics, Reaction, TrialType, Trial } from 'types'
import { CenteringContainer } from '../components/CenteringContainer'
import { Matrix } from '../components/Matrix'
import {
  ArrowPathIcon,
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
import { Feedback, FeedbackType } from '../components/Feedback'
import { PlusIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils/classnames'
import { calculateTrialCorrectness } from '../utils/calculateTrialCorrectness'
import { useStatistics } from '../hooks/useStatistics'
import { useStatisticsQuery } from '../queries/StatisticsQuery'
import { fillUpStatistics } from '../utils/fillUpStatistics'
import { ReactionButton } from '../components/ReactionButton'

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
  const [statistics, addNToStatistics, addTrialToStatistics] = useStatistics()
  const [statisticsToSend, setStatisticsToSend] =
    useState<FullStatistics | null>(null)

  const [userReaction, setUserReaction] = useState<TrialType>('none')
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
  const [trialReactions, setTrialReactions] = useState<Reaction[]>([])

  const [enableNQuery, setEnableNQuery] = useState(false)
  const { data: nData, status: nStatus } = useNQuery(
    n,
    trialReactions,
    enableNQuery
  )
  const { data: statisticsData, status: statisticsStatus } =
    useStatisticsQuery(statisticsToSend)

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
    if (statisticsStatus === 'error') {
      navigate(`/error`, { state: { errorCode: 2005, experimenteeId } })
      return
    }
    if (statisticsData) {
      navigate(`/result?id=${experimenteeId}`, { state: { statistics } })
    }
  }, [statisticsStatus, statisticsData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let timeoutMs: number
    let callback: () => void
    switch (gamePhase) {
      case 'loading':
        timeoutMs = 0
        callback = () => {
          setTrialReactions([])
          addNToStatistics(n, currentBlockNr)
          void blockRefetch()
        }
        break
      case 'notify_user_about_n_change':
        timeoutMs = 0
        callback = () => {
          // do nothing and wait for user to click start
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
        timeoutMs = currentTrial?.visionTimeMs || 0
        callback = () => {
          setGamePhase('user_can_react')
        }
        break
      case 'user_can_react':
        timeoutMs = currentTrial?.reactionTimeMs || 0
        callback = () => {
          setGamePhase('feedback')
        }
        break
      case 'feedback':
        timeoutMs = 0
        callback = () => {
          // give feedback to trial
          if (currentTrial !== undefined && currentTrialIndex !== undefined) {
            const correct = calculateTrialCorrectness(
              userReaction,
              currentTrial
            )
            setTrialReactions((prevState) => [...prevState, { correct }])
            setFeedback(correct ? 'positive' : 'negative')
            addTrialToStatistics(
              currentBlockNr,
              correct,
              currentTrial.trialType
            )
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
            setStatisticsToSend(
              fillUpStatistics(statistics, experimenteeId || '')
            )
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
      navigate(`/error`, { state: { errorCode: 1804, experimenteeId } })
      return
    }
    if (blockStatus !== 'success') return
    setCurrentTrialIndex(0)
    setGamePhase('notify_user_about_n_change')
  }, [blockStatus, blockData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nStatus === 'error') {
      navigate(`/error`, { state: { errorCode: 1306, experimenteeId } })
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
                amountOfBlocks: config.amount_of_blocks_to_play,
                blockLength: blockData?.trials.length,
                visionPosition: currentTrial?.visionPosition,
                imageContent: (currentTrial?.imageFile ?? -100) + 1,
                shouldClickVision: (
                  <DevText
                    truthy={['visual', 'auditory_visual'].includes(
                      currentTrial?.trialType || 'none'
                    )}
                  />
                ),
                shouldClickSound: (
                  <DevText
                    truthy={['auditory', 'auditory_visual'].includes(
                      currentTrial?.trialType || 'none'
                    )}
                  />
                ),
                userReaction,
                feedback: feedback,
                trialCorrectness: trialReactions.map((r) =>
                  r.correct ? '✅' : '❌'
                ),
                blockQStatus: blockStatus,
                nQStatus: nStatus
              }}
            />
          </DevContainer>
          <Either
            className={'flex size-5/6 flex-col items-center justify-center'}
            a={
              <NChangeNotification
                n={n}
                onStart={() => {
                  setGamePhase('starting')
                }}
              />
            }
            b={
              <Matrix
                activeId={
                  gamePhase === 'queue'
                    ? currentTrial?.visionPosition
                    : undefined
                }
                imageId={
                  gamePhase === 'queue' ? currentTrial?.imageFile : undefined
                }
              />
            }
            showAWhen={gamePhase === 'notify_user_about_n_change'}
          />
          <Sound
            soundId={
              gamePhase === 'queue' ? currentTrial?.soundFileId : undefined
            }
            muted={muted}
          />
          <div
            className={classNames(
              'mt-4 flex gap-8',
              gamePhase === 'notify_user_about_n_change'
                ? 'opacity-0'
                : 'opacity-100'
            )}
          >
            <ReactionButton
              userReaction={userReaction}
              targetReaction={'visual'}
              onClick={() => setUserReaction('visual')}
            >
              <PlusIcon className={'invisible size-10 text-white'} />
              <EyeIcon className={'size-10 text-white'} />
              <SpeakerWaveIcon className={'invisible size-10 text-white'} />
            </ReactionButton>
            <ReactionButton
              userReaction={userReaction}
              targetReaction={'auditory'}
              onClick={() => setUserReaction('auditory')}
            >
              <EyeIcon className={'invisible size-10 text-white'} />
              <SpeakerWaveIcon className={'size-10 text-white'} />
              <PlusIcon className={'invisible size-10 text-white'} />
            </ReactionButton>
            <ReactionButton
              userReaction={userReaction}
              targetReaction={'auditory_visual'}
              onClick={() => setUserReaction('auditory_visual')}
            >
              <EyeIcon className={'size-10 text-white'} />
              <PlusIcon className={'size-10 text-white'} />
              <SpeakerWaveIcon className={'size-10 text-white'} />
            </ReactionButton>
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
