import { FullStatistics, Statistics } from 'types/src/statistics.model'

export function fillUpStatistics(
  statistics: Statistics,
  experimenteeId: string
): FullStatistics {
  // amountOfCharsInId * amountOfUniqueCharsInId + everyVisualsFalseCnt * everyOverallCorrectCnt + dateInMs
  const now = new Date()
  const dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const timeInMs = dateOnly.getTime()

  const securityToken =
    experimenteeId.length * new Set(experimenteeId).size +
    statistics.blockStatistics.reduce(
      (acc, block) => acc + block.visualsFalseCnt,
      0
    ) *
      statistics.blockStatistics.reduce(
        (acc, block) => acc + block.overallCorrectCnt,
        0
      ) +
    timeInMs

  //remove the first block, because we never play blockNr0
  statistics.blockStatistics.shift()
  return { experimenteeId, statistics, securityToken }
}
