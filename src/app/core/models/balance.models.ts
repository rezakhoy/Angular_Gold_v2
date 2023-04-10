import { IPermission } from "./permission.models";


export class IMyBalance {
  balance_v: number;
  balance_r: number;
}

export class MyBalance implements IMyBalance{
  constructor(
    public balance_v: 0,
    public balance_r: 0,
    ) { }
}

export  class IAdminBalance {
  today_sum_8x: number;
  today_sum_9x: number;
  today_avg_maz_8x: number;
  today_avg_maz_9x: number;
  week_sum_8x: number;
  week_sum_9x: number;
  week_avg_maz_8x: number;
  week_avg_maz_9x: number;
  month_sum_8x: number;
  month_sum_9x: number;
  month_avg_maz_8x: number;
  month_avg_maz_9x: number;
  year_sum_8x: number;
  year_sum_9x: number;
  year_avg_maz_8x: number;
  year_avg_maz_9x: number;
}
