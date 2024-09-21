import { Block } from './block.model';

export type Tag = {
  user_id: string;
  date: string;
  blocks: Block[];
  mean_n: number | null;
};
