import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { UseridService } from './userid.service';

@Controller()
export class UseridController {
  private readonly logger = new Logger(UseridController.name);
  @Inject() useridService: UseridService;

  @Post('userid.post')
  saveUserid(@Body('userId') userid: string) {
    if (userid === undefined || userid === '') {
      throw new BadRequestException('userid is required');
    }
    this.logger.log(`Saving userid: ${userid}`);
    const filename = this.useridService.saveUserid(userid);
    return { filename };
  }
}
