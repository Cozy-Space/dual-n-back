import { Inject, Injectable, Logger } from '@nestjs/common';
import { FullStatistics } from 'types/src/statistics.model';
import { OutputService } from '../output/output.service';

@Injectable()
export class StatisticsService {
  @Inject() outputService: OutputService;
  private readonly logger = new Logger(StatisticsService.name);

  saveStatistics(statistics: FullStatistics) {
    const securityToken = this.calculateSecurityToken(statistics);
    if (statistics.securityToken !== securityToken) {
      this.logger.error(
        'Security token does not match. Got: ' +
          statistics.securityToken +
          ' Expected: ' +
          securityToken,
      );
      throw new Error('Security token does not match');
    }
    const experimenteeId = statistics.experimenteeId;
    const date = this.outputService.getTimeStamp();
    const amountOfPlayedBlocks = statistics.statistics.blockStatistics.length;
    const meanN =
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.n,
        0,
      ) / amountOfPlayedBlocks;
    const highestN = Math.max(
      ...statistics.statistics.blockStatistics.map((block) => block.n),
    );
    const correctOverallPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.overallTrialCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.overallCorrectCnt,
        0,
      ),
    );
    const correctVisualsPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsCorrectCnt,
        0,
      ),
    );
    const correctAuditoryPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.auditoryTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.auditoryCorrectCnt,
        0,
      ),
    );
    const correctVisualAuditoryPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsAndAuditoryTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsAndAuditoryCorrectCnt,
        0,
      ),
    );
    const correctNoPressPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.noPressTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.noPressCorrectCnt,
        0,
      ),
    );
    const falseOverallPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.overallTrialCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.overallFalseCnt,
        0,
      ),
    );
    const falseVisualsPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsFalseCnt,
        0,
      ),
    );
    const falseAuditoryPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.auditoryTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.auditoryFalseCnt,
        0,
      ),
    );
    const falseVisualAuditoryPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsAndAuditoryTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsAndAuditoryFalseCnt,
        0,
      ),
    );
    const falseNoPressPercent = this.getPercent(
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.noPressTrailCnt,
        0,
      ),
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.noPressFalseCnt,
        0,
      ),
    );
    const fileStatistics = {
      experimenteeId,
      date,
      amountOfPlayedBlocks,
      meanN,
      highestN,
      correctOverallPercent,
      correctVisualsPercent,
      correctAuditoryPercent,
      correctVisualAuditoryPercent,
      correctNoPressPercent,
      falseOverallPercent,
      falseVisualsPercent,
      falseAuditoryPercent,
      falseVisualAuditoryPercent,
      falseNoPressPercent,
    };
    this.outputService.saveStatistics(fileStatistics);
  }

  private getPercent(total: number, part: number): number {
    return (part / total) * 100;
  }

  private calculateSecurityToken(statistics: FullStatistics) {
    const now = new Date();
    const dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const timeInMs = dateOnly.getTime();
    return (
      statistics.experimenteeId.length *
        new Set(statistics.experimenteeId).size +
      statistics.statistics.blockStatistics.reduce(
        (acc, block) => acc + block.visualsFalseCnt,
        0,
      ) *
        statistics.statistics.blockStatistics.reduce(
          (acc, block) => acc + block.overallCorrectCnt,
          0,
        ) +
      timeInMs
    );
  }
}
