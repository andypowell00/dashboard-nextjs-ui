import { BaseItem } from '@/app/types/item';

export interface NewsItem extends BaseItem {
  body?: string;
  thumbnail?: string;
}