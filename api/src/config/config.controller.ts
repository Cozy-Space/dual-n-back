import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  private readonly logger = new Logger(ConfigController.name);
  @Inject() configService: ConfigService;

  @Get('get') getGameConfig() {
    this.logger.log(`Getting config`);
    return this.configService.getGameConfig();
  }
}
