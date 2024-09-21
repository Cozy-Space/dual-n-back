import { Test, TestingModule } from '@nestjs/testing';
import { DualNBackController } from './dual-n-back.controller';

describe('DualNBackController', () => {
  let controller: DualNBackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DualNBackController],
    }).compile();

    controller = module.get<DualNBackController>(DualNBackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
