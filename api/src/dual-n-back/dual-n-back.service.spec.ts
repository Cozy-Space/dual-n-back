import { Test, TestingModule } from '@nestjs/testing';
import { DualNBackService } from './dual-n-back.service';
import { DualNBackModule } from './dual-n-back.module';
import { ConfigService } from '../config/config.service';

const mockConfigService = {
  get: jest.fn(),
};

const testCases = [
  {
    config: {
      base_amount_of_trials: 20,
      hit_percentage: 0.3,
      vision_count: 16,
      sound_count: 16,
      image_count: 20,
    },
    n: 1,
    type: 'vision',
  },
  {
    config: {
      base_amount_of_trials: 20,
      hit_percentage: 0.3,
      vision_count: 16,
      sound_count: 16,
      image_count: 40,
    },
    n: 2,
    type: 'sound',
  },
  {
    config: {
      base_amount_of_trials: 30,
      hit_percentage: 0.7,
      vision_count: 200,
      sound_count: 16,
      image_count: 2,
    },
    n: 5,
    type: 'vision',
  },
  {
    config: {
      base_amount_of_trials: 20,
      hit_percentage: 0.3,
      vision_count: 16,
      sound_count: 16,
      image_count: 21,
    },
    n: 1,
    type: 'sound',
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

  describe.each(testCases)('createBlock', ({ config, n, type }) => {
    beforeAll(() => {
      mockConfigService.get.mockImplementation((key: string) => {
        return config[key];
      });
    });

    it('should return a block with block_base_size + n trials', () => {
      const block = service.createBlock(n);

      expect(block.trials.length).toBe(
        mockConfigService.get('base_amount_of_trials') + n,
      );
      expect(block.n).toBe(n);
    });

    it(`every trial should have a ${type}`, () => {
      const block = service.createBlock(n);

      block.trials.forEach((trial) => {
        expect(trial[type]).toBeDefined();
      });
    });

    it(`should return trials, where ${config.hit_percentage * 100} % of ${type} are correct`, () => {
      const block = service.createBlock(n);

      const correctTrials = block.trials.filter(
        (trial) => trial[`f_${type}_correct`],
      );
      const incorrectTrials = block.trials.filter(
        (trial) => !trial[`f_${type}_correct`],
      );

      expect(correctTrials.length).toBe(
        mockConfigService.get('base_amount_of_trials') *
          mockConfigService.get('hit_percentage'),
      );
      expect(incorrectTrials.length).toBe(
        mockConfigService.get('base_amount_of_trials') +
          n -
          correctTrials.length,
      );
    });

    it(`should return trials, where the first correct ${type} ones index is at least n`, () => {
      const block = service.createBlock(n);

      const firstVisualCorrectTrialIndex = block.trials.findIndex(
        (trial) => trial[`f_${type}_correct`],
      );

      expect(firstVisualCorrectTrialIndex).toBeGreaterThanOrEqual(n);
    });

    it(`should return trials, where a correct ${type} ones ${type} is the as the one n steps back`, () => {
      const block = service.createBlock(n);

      for (const trials of block.trials) {
        if (trials[`f_${type}_correct`]) {
          expect(trials[type]).toBe(
            block.trials[block.trials.indexOf(trials) - n][type],
          );
        }
      }
    });

    it(`should return trial, where an incorrect ${type} ones ${type} is not the same as the one n steps back`, () => {
      const block = service.createBlock(n);

      for (const [i, trial] of block.trials.entries()) {
        if (i < n) {
          continue;
        }

        if (!trial[`f_${type}_correct`]) {
          expect(trial[type]).not.toBe(
            block.trials[block.trials.indexOf(trial) - n][type],
          );
        }
      }
    });

    it('should return a block, where every visual image is not repeating itself', () => {
      const block = service.createBlock(n);

      const visualImages = block.trials.map((trial) => trial.vision_image);

      console.log(visualImages);

      for (let i = 0; i < visualImages.length - 1; i++) {
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
      );

      expect(hitArray.length).toBe(config.base_amount_of_trials + n);
    });
    it(`should create an hitArray with exactly ${config.hit_percentage} hits`, () => {
      const hits = Math.floor(
        config.base_amount_of_trials * config.hit_percentage,
      );
      const hitArray = service.createHitArray(
        config.base_amount_of_trials,
        n,
        hits,
      );
      expect(hitArray.filter((hit) => hit).length).toBe(hits);
    });
    it(`should return a random number, that is not the same as the excluded one`, () => {
      const excluded = 5;
      const max = 10;

      const random = service.getExcludedRandomNumber(excluded, max);
      expect(random).not.toBe(excluded);
    });
  });
});
