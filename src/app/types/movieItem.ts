import { BaseItem } from '@/app/types/item';

export interface MovieItem extends BaseItem {
  type: 'trailer';  
  thumbnail?: string
  description?: string
}