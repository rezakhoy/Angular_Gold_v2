export interface IPrices {
  id?: number;
  activeBuy?: boolean;
  activeSell?: boolean;
  priceGroupId?: number;
  priceGroupName?: string;
  priceGroupDescription?: string;
  sell?: number;
  buy?: number;
  time?: string;
  base?: number;
}
