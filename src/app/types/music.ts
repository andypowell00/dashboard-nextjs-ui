import { BaseItem } from '@/app/types/item';

export interface MusicItem extends BaseItem {
  thumbnail?: string;
  description?: string;
  artist?: string;
}