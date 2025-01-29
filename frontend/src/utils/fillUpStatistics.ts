import { FullStatistics, Statistics } from 'types/src/statistics.model'

export function fillUpStatistics(
  statistics: Statistics,
  experimenteeId: string
): FullStatistics {
  // amountOfCharsInId * amountOfUniqueCharsInId + everyVisualsFalseCnt * everyOverallCorrectCnt

  const securityToken =
    experimenteeId.length * new Set(experimenteeId).size +
    statistics.blockStatistics.reduce(
      (acc, block) => acc + block.visualsFalseCnt,
      0
    ) *
      statistics.blockStatistics.reduce(
        (acc, block) => acc + block.overallCorrectCnt,
        0
      )

  //remove the first block, because we never play blockNr0
  statistics.blockStatistics.shift()
  return { experimenteeId, statistics, securityToken }
}
