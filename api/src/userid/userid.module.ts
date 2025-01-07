import { Module } from '@nestjs/common';
import { UseridService } from './userid.service';
import { UseridController } from './userid.controller';
import { OutputModule } from '../output/output.module';

@Module({
  imports: [OutputModule],
  providers: [UseridService],
  exports: [UseridService],
  controllers: [UseridController],
})
export class UseridModule {}
