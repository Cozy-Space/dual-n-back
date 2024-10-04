import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { DualNBackService } from './dual-n-back.service';

@Controller()
export class DualNBackController {
  private readonly logger = new Logger(DualNBackController.name);
  @Inject() dualNBackService: DualNBackService;

  @Get('dual_n_back.get')
  getDualNBack(@Query('n') n: number) {
    this.logger.log(`Creating block for n=${n}`);
    const block = this.dualNBackService.createBlock(+n);
    return block;
  }
}
