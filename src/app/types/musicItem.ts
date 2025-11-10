import { BaseItem } from '@/app/types/item';

export interface MusicItem extends BaseItem {
  type: 'music';
  thumbnail?: string;
  description?: string;
  artist?: string;
}