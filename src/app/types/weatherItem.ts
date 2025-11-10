import { BaseItem } from '@/app/types/item';


export interface WeatherItem extends BaseItem {
  high_temp?: number;
  low_temp?: number;
  status?: string;
}