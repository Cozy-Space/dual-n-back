export type FullStatistics = {
  experimenteeId: string;
  statistics: Statistics;
  securityToken: number;
};

export type Statistics = {
  blockStatistics: BlockStatistics[];
}

export type BlockStatistics = {
  n: number;
  overallTrialCnt: number;
  overallCorrectCnt: number;
  overallFalseCnt: number;
  visualsTrailCnt: number;
  visualsCorrectCnt: number;
  visualsFalseCnt: number;
  auditoryTrailCnt: number;
  auditoryCorrectCnt: number;
  auditoryFalseCnt: number;
  visualsAndAuditoryTrailCnt: number;
  visualsAndAuditoryCorrectCnt: number;
  visualsAndAuditoryFalseCnt: number;
  noPressTrailCnt: number;
  noPressCorrectCnt: number;
  noPressFalseCnt: number;
};

export type FileStatistics = {
  experimenteeId: string;
  date: string;
  amountOfPlayedBlocks: number;
  meanN: number;
  highestN: number;
  correctOverallPercent: number;
  correctVisualsPercent: number;
  correctAuditoryPercent: number;
  correctVisualAuditoryPercent: number;
  correctNoPressPercent: number;
  falseOverallPercent: number;
  falseVisualsPercent: number;
  falseAuditoryPercent: number;
  falseVisualAuditoryPercent: number;
  falseNoPressPercent: number;
}

