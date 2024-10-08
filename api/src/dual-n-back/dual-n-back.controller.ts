import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Logger,
  Query,
} from '@nestjs/common';
import { DualNBackService } from './dual-n-back.service';

@Controller()
export class DualNBackController {
  private readonly logger = new Logger(DualNBackController.name);
  @Inject() dualNBackService: DualNBackService;

  @Get('dual_n_back.get')
  getDualNBack(@Query('n') n: number) {
    if (n === undefined || n === 0) {
      throw new BadRequestException('n is required');
    }
    this.logger.log(`Creating block for n=${n}`);
    return this.dualNBackService.createBlock(+n);
  }
}
