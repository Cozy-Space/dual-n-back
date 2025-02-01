import { useState } from 'react'
import { BlockStatistics, Statistics, TrialType } from 'types'

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics>({
    blockStatistics: []
  })
  const getBlockStatistics = (blockNr: number): BlockStatistics => {
    return statistics.blockStatistics.length > blockNr
      ? statistics.blockStatistics[blockNr]
      : {
          n: 0,
          overallTrialCnt: 0,
          overallCorrectCnt: 0,
          overallFalseCnt: 0,
          visualsTrailCnt: 0,
          visualsCorrectCnt: 0,
          visualsFalseCnt: 0,
          auditoryTrailCnt: 0,
          auditoryCorrectCnt: 0,
          auditoryFalseCnt: 0,
          visualsAndAuditoryTrailCnt: 0,
          visualsAndAuditoryCorrectCnt: 0,
          visualsAndAuditoryFalseCnt: 0,
          noPressTrailCnt: 0,
          noPressCorrectCnt: 0,
          noPressFalseCnt: 0
        }
  }
  const saveN = (n: number, blockNr: number): void => {
    setStatistics((prev) => {
      const blockStatistics = prev.blockStatistics
      const block = getBlockStatistics(blockNr)
      block.n = n
      blockStatistics[blockNr] = block
      return { blockStatistics }
    })
  }
  const addTrial = (
    blockNr: number,
    isCorrect: boolean,
    trialType: TrialType
  ): void => {
    setStatistics((prev) => {
      const blockStatistics = prev.blockStatistics
      const block = getBlockStatistics(blockNr)
      block.overallTrialCnt += 1
      if (isCorrect) {
        block.overallCorrectCnt += 1
      } else {
        block.overallFalseCnt += 1
      }
      if (trialType === 'auditory_visual') {
        block.visualsAndAuditoryTrailCnt += 1
        if (isCorrect) {
          block.visualsAndAuditoryCorrectCnt += 1
        } else {
          block.visualsAndAuditoryFalseCnt += 1
        }
      } else if (trialType === 'visual') {
        block.visualsTrailCnt += 1
        if (isCorrect) {
          block.visualsCorrectCnt += 1
        } else {
          block.visualsFalseCnt += 1
        }
      } else if (trialType === 'auditory') {
        block.auditoryTrailCnt += 1
        if (isCorrect) {
          block.auditoryCorrectCnt += 1
        } else {
          block.auditoryFalseCnt += 1
        }
      } else {
        block.noPressTrailCnt += 1
        if (isCorrect) {
          block.noPressCorrectCnt += 1
        } else {
          block.noPressFalseCnt += 1
        }
      }
      blockStatistics[blockNr] = block
      return { blockStatistics }
    })
  }

  return [statistics, saveN, addTrial] as const
}
