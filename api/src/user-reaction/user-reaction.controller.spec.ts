import { Test, TestingModule } from '@nestjs/testing';
import { UserReactionController } from './user-reaction.controller';

describe('UserReactionController', () => {
  let controller: UserReactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserReactionController],
    }).compile();

    controller = module.get<UserReactionController>(UserReactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
