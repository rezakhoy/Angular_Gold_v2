export interface IPrices {
  id?: number;
  activeBuy?: boolean;
  activeSell?: boolean;
  priceGroupId?: number;
  priceGroupName?: string;
  priceGroupDescription?: string;
  sell?: number;
  limit?: number;
  buy?: number;
  dateTime?: string;
  base?: number;
}
