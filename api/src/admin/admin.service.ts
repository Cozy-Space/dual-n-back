import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { StatisticsService } from '../statistics/statistics.service';
import { DetailedInfos, Infos } from 'types';

@Injectable()
export class AdminService {
  @Inject() statisticsService: StatisticsService;

  loginAdmin(password: string): boolean {
    return this.isPasswordCorrect(password);
  }

  getInfos(password: string): Infos {
    if (!this.isPasswordCorrect(password)) {
      return undefined;
    }
    return this.statisticsService.getInfos();
  }

  getDetailedInfos(password: string, experimenteeId: string): DetailedInfos {
    if (!this.isPasswordCorrect(password) || !experimenteeId) {
      return undefined;
    }
    return this.statisticsService.getDetailedInfos(experimenteeId);
  }

  isPasswordCorrect(password: string): boolean {
    const origPasswordHash =
      '$2b$10$XycWEJYLfc4HPlKdtekymuQ9vam2kyvYIMaGJ/6gKZMKKE7UYqfoC';
    return bcrypt.compareSync(password, origPasswordHash);
  }
}
