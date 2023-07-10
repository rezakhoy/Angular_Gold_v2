export class IDemand {
  cod: string;
  name: string;
  balance_v: number;
  balance_r: number;
  audienceId: number;
  risk_amount: number;
  selected: boolean;
}

export class Demand implements IDemand {
  constructor(
  public cod: string,
  public name: string,
  public balance_v = 0,
  public balance_r = 0,
  public audienceId = 0,
  public risk_amount = 0,
  public selected = false,
  ) {
  }
}

export interface DemandSearchResult {
  tables: Demand[];
  total: number;
}

export class IAdminDemand {
  demands_v: number;
  demands_r: number;
}
