import { BaseItem } from '@/app/types/item';

export interface NewsItem extends BaseItem {
  type: 'news';
  body?: string;
  thumbnail?: string;
}