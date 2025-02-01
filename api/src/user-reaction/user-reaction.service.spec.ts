import { Test, TestingModule } from '@nestjs/testing';
import { UserReactionService } from './user-reaction.service';
import { UserReactionModule } from './user-reaction.module';
import { Reaction } from 'types/src/reaction.model';
import { ConfigService } from '../config/config.service';
import { GameConfig } from 'types';

describe('UserReactionService', () => {
  let service: UserReactionService;
  const gameConfigMock: GameConfig = {
    base_amount_of_trials: 20,
    amount_of_auditory_targets: 4,
    amount_of_visual_targets: 4,
    amount_of_auditory_visual_targets: 2,
    amount_of_images: 20,
    amount_of_positions: 16,
    amount_of_sounds: 10,
    ms_vision_time: 500,
    ms_reaction_time: 2500,
    consecutive_right_hits_for_upgrade: 3,
    consecutive_wrong_hits_for_downgrade: 5,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserReactionModule],
    }).compile();

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
    const array = [false, false, true, false, true, true, false, true, false];
    const amount = 4;
    const filter = (b: boolean) => b;
    expect(service.hasConsecutiveElements(array, amount, filter)).toBe(false);
  });

  it('should return the usedN if the amount of consecutive correct reactions is equal to the config value but first n and none-none elements will be deleted', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
    ];
    const expectedN = 2;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN + 1 if the amount of consecutive correct reactions is equal to the config value even if first n and none-none elements will be deleted', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      {
        correct: true,
        trialType: 'auditory_visual',
        reactionType: 'auditory_visual',
      },
      { correct: false, trialType: 'none', reactionType: 'none' },
    ];
    const expectedN = 3;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN + 1 if the amount of consecutive correct reactions is more then the config value', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: true, trialType: 'visual', reactionType: 'visual' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
    ];
    const expectedN = 3;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN - 1 if the amount of consecutive wrong reactions is equal to the config value', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
    ];
    const expectedN = 1;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN - 1 if the amount of consecutive wrong reactions is more the config value', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
    ];
    const expectedN = 1;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN if the amount of consecutive wrong and correct reactions is less then the config value', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
    ];
    const expectedN = 2;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN if the amount of consecutive wrong and correct reactions is less then the config value after filtering none none elements', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
    ];
    const expectedN = 2;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
  it('should return the usedN if the amount of consecutive wrong and correct reactions is equal to the config value', () => {
    const configServiceMock = jest.spyOn(
      ConfigService.prototype,
      'getGameConfig',
    );
    configServiceMock.mockImplementation(() => gameConfigMock);
    const usedN = 2;
    const reactions: Reaction[] = [
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'none', reactionType: 'none' }, // will be deleted
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: false, trialType: 'auditory', reactionType: 'none' },
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
      { correct: true, trialType: 'auditory', reactionType: 'auditory' },
    ];
    const expectedN = 2;
    expect(service.getNFromReaction(usedN, reactions)).toBe(expectedN);
  });
});
