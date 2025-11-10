import { BaseItem } from '@/app/types/item';


export interface WeatherItem extends BaseItem {
  type: 'weather';
  high_temp?: number;
  low_temp?: number;
  status?: string;
}