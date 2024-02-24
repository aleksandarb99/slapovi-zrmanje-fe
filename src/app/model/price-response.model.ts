import { PriceItem } from './price-item.model';

export interface PriceResponse {
  totalPrice: number;
  priceItems: PriceItem[];
}
