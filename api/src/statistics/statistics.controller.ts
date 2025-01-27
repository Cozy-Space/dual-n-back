import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { FullStatistics } from 'types/src/statistics.model';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  private readonly logger = new Logger(StatisticsController.name);
  @Inject() statisticsService: StatisticsService;

  @Post() setStatistics(@Body('statistics') statistics: FullStatistics) {
    this.logger.log(
      `Got new statistics for experimentee ${statistics.experimenteeId}`,
    );
    return this.statisticsService.saveStatistics(statistics);
  }
}
