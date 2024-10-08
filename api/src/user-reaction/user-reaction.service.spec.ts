import { Test, TestingModule } from '@nestjs/testing';
import { UserReactionService } from './user-reaction.service';
import { UserReactionModule } from './user-reaction.module';
import { ConfigService } from '../config/config.service';
import { Reaction } from 'types/src/reaction.model';

const mockConfigService = {
  get: jest.fn(),
};

describe('UserReactionService', () => {
  let service: UserReactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserReactionModule],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<UserReactionService>(UserReactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if the given amount of consecutive elements was found', () => {
    const array = [false, false, false, false, true, true, true, true, false];
    const amount = 4;
    const filter = (b: boolean) => b;
    expect(service.hasConsecutiveElements(array, amount, filter)).toBe(true);
  });

  it('should return false if the given amount of consecutive elements was not found', () => {
    const array = [false, false, false, false, true, true, false, true, false];
    const amount = 4;
    const filter = (b: boolean) => b;
    expect(service.hasConsecutiveElements(array, amount, filter)).toBe(false);
  });

  it('should return the usedN + 1 if the amount of consecutive correct reactions is equal to the config value', () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'consecutive_wrong_hits_for_downgrade') {
        return 5;
      } else if (key === 'consecutive_right_hits_for_upgrade') {
        return 3;
      }
      return 0;
    });
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: false },
    ];
    const expectedN = 3;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN + 1 if the amount of consecutive correct reactions is more then the config value', () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'consecutive_wrong_hits_for_downgrade') {
        return 5;
      } else if (key === 'consecutive_right_hits_for_upgrade') {
        return 3;
      }
      return 0;
    });
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: false },
    ];
    const expectedN = 3;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN - 1 if the amount of consecutive wrong reactions is equal to the config value', () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'consecutive_wrong_hits_for_downgrade') {
        return 5;
      } else if (key === 'consecutive_right_hits_for_upgrade') {
        return 3;
      }
      return 0;
    });
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: true },
    ];
    const expectedN = 1;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN - 1 if the amount of consecutive wrong reactions is more the config value', () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'consecutive_wrong_hits_for_downgrade') {
        return 5;
      } else if (key === 'consecutive_right_hits_for_upgrade') {
        return 3;
      }
      return 0;
    });
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: true },
    ];
    const expectedN = 1;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN if the amount of consecutive wrong and correct reactions is less then the config value', () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'consecutive_wrong_hits_for_downgrade') {
        return 5;
      } else if (key === 'consecutive_right_hits_for_upgrade') {
        return 3;
      }
      return 0;
    });
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false },
      { correct: false },
      { correct: true },
      { correct: true },
      { correct: false },
    ];
    const expectedN = 2;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN if the amount of consecutive wrong and correct reactions is equal to the config value', () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'consecutive_wrong_hits_for_downgrade') {
        return 5;
      } else if (key === 'consecutive_right_hits_for_upgrade') {
        return 3;
      }
      return 0;
    });
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: true },
      { correct: true },
      { correct: true },
    ];
    const expectedN = 2;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
});
