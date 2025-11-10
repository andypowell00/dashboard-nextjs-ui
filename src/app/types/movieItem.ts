import { BaseItem } from '@/app/types/item';

export interface MovieItem extends BaseItem { 
  thumbnail?: string
  description?: string
}