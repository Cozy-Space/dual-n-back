import { Test, TestingModule } from '@nestjs/testing';
import { DualNBackService } from './dual-n-back.service';
import { DualNBackModule } from './dual-n-back.module';
import { ConfigService } from '../config/config.service';
import { GameConfig } from 'types';

const mockConfigService = {
  getGameConfig: jest.fn(),
};

const testCases: [{ config: GameConfig; n: number }] = [
  {
    config: {
      base_amount_of_trials: 20,
      amount_of_auditory_targets: 4,
      amount_of_visual_targets: 4,
      amount_of_auditory_visual_targets: 2,
      amount_of_images: 20,
      amount_of_positions: 16,
      amount_of_sounds: 16,
      ms_vision_time: 500,
      ms_reaction_time: 2500,
      consecutive_right_hits_for_upgrade: 3,
      consecutive_wrong_hits_for_downgrade: 5,
    },
    n: 1,
  },
];

describe('DualNBackService', () => {
  let service: DualNBackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DualNBackModule],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<DualNBackService>(DualNBackService);
  });

  describe.each(testCases)('createBlock', ({ config, n }) => {
    beforeAll(() => {
      mockConfigService.getGameConfig.mockReturnValue(config);
    });

    it(`should return a block with base_amount_of_trials(${config.base_amount_of_trials}) + n(${n}) trials`, () => {
      const block = service.createBlock(n);

      expect(block.trials.length).toBe(config.base_amount_of_trials + n);
      expect(block.n).toBe(n);
    });

    it(`should return trials, where ${config.amount_of_visual_targets + config.amount_of_auditory_targets + config.amount_of_auditory_visual_targets} trials are targeted correctly`, () => {
      const block = service.createBlock(n);

      const auditoryTargets = block.trials.filter(
        (trial) => !trial.is_visual_target && trial.is_auditory_target,
      );
      const visualTargets = block.trials.filter(
        (trial) => trial.is_visual_target && !trial.is_auditory_target,
      );
      const auditoryVisualTargets = block.trials.filter(
        (trial) => trial.is_visual_target && trial.is_auditory_target,
      );
      const nonTargets = block.trials.filter(
        (trial) => !trial.is_visual_target && !trial.is_auditory_target,
      );

      expect(auditoryTargets.length).toBe(config.amount_of_auditory_targets);
      expect(visualTargets.length).toBe(config.amount_of_visual_targets);
      expect(auditoryVisualTargets.length).toBe(
        config.amount_of_auditory_visual_targets,
      );
      expect(nonTargets.length).toBe(
        config.base_amount_of_trials +
          n -
          config.amount_of_auditory_targets -
          config.amount_of_visual_targets -
          config.amount_of_auditory_visual_targets,
      );
    });

    it(`should return trials, where the first target trials index is at least n (${n})`, () => {
      const block = service.createBlock(n);

      const firstVisualCorrectTrialIndex = block.trials.findIndex(
        (trial) => trial.is_visual_target || trial.is_auditory_target,
      );

      expect(firstVisualCorrectTrialIndex).toBeGreaterThanOrEqual(n);
    });

    it(`should return trials, where a target queue is the same as the one n steps back`, () => {
      const block = service.createBlock(n);

      for (const [i, trial] of block.trials.entries()) {
        if (trial.is_visual_target) {
          expect(trial.vision_position).toBe(
            block.trials[i - n].vision_position,
          );
        }
        if (trial.is_auditory_target) {
          expect(trial.sound_file).toBe(block.trials[i - n].sound_file);
        }
      }
    });

    it(`should return trial, where an nontarget queue is not the same as the one n (${n}) steps back`, () => {
      const block = service.createBlock(n);

      for (const [i, trial] of block.trials.entries()) {
        if (i < n) {
          continue;
        }

        if (!trial.is_visual_target) {
          expect(trial.vision_position).not.toBe(
            block.trials[i - n].vision_position,
          );
        }
        if (!trial.is_auditory_target) {
          expect(trial.sound_file).not.toBe(block.trials[i - n].sound_file);
        }
      }
    });

    it('should return a block, where every visual image is not repeating itself => images are shuffled', () => {
      const block = service.createBlock(n);

      const visualImages = block.trials.map((trial) => trial.image_file);

      for (let i = 0; i < visualImages.length; i++) {
        expect(visualImages[i]).not.toBe(visualImages[i + 1]);
      }
    });
  });

  describe.each(testCases)('utils', ({ config, n }) => {
    it(`should create an hitArray with ${config.base_amount_of_trials} + ${n} elements`, () => {
      const hitArray = service.createHitArray(
        config.base_amount_of_trials,
        n,
        0,
        0,
        0,
      );

      expect(hitArray.length).toBe(config.base_amount_of_trials + n);
    });
    it(`should create an hitArray with exactly ${config.amount_of_visual_targets + config.amount_of_auditory_targets + config.amount_of_auditory_visual_targets} hits`, () => {
      const hitArray = service.createHitArray(
        config.base_amount_of_trials,
        n,
        config.amount_of_auditory_targets,
        config.amount_of_visual_targets,
        config.amount_of_auditory_visual_targets,
      );
      const actualHits = hitArray.filter((hit) => hit !== 'none');
      expect(actualHits.length).toBe(
        config.amount_of_visual_targets +
          config.amount_of_auditory_targets +
          config.amount_of_auditory_visual_targets,
      );
    });
    it(`should return an array where each element is either 'auditory', 'visual', 'auditory_visual' or 'none'`, () => {
      const hitArray = service.createHitArray(
        config.base_amount_of_trials,
        n,
        config.amount_of_auditory_targets,
        config.amount_of_visual_targets,
        config.amount_of_auditory_visual_targets,
      );

      hitArray.forEach((hit) => {
        expect(['auditory', 'visual', 'auditory_visual', 'none']).toContain(
          hit,
        );
      });
    });
    it(`should return a random number, that is not the same as the excluded one`, () => {
      const excluded = 5;
      const max = 10;

      expect([
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
        service.getExcludedRandomNumber(excluded, max),
      ]).not.toContain(excluded);
    });
  });
});
