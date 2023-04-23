import {IPermission} from "./permission.models";


export class IMyBalance {
  balance_v: number;
  balance_r: number;
}

export class MyBalance implements IMyBalance {
  constructor(
    public balance_v =0,
    public balance_r = 0,
  ) {
  }
}

export class IAdminBalance {
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
  total_sum_8x: number;
  total_sum_9x: number;
  total_avg_maz_8x: number;
  total_avg_maz_9x: number;
}

export class AdminBalance implements IAdminBalance {
  constructor(
    public today_sum_8x= 0,
    public today_sum_9x = 0,
    public today_avg_maz_8x = 0,
    public today_avg_maz_9x = 0,
    public week_sum_8x = 0,
    public week_sum_9x = 0,
    public week_avg_maz_8x = 0,
    public week_avg_maz_9x = 0,
    public month_sum_8x = 0,
    public month_sum_9x = 0,
    public month_avg_maz_8x = 0,
    public month_avg_maz_9x = 0,
    public total_sum_8x = 0,
    public total_sum_9x = 0,
    public total_avg_maz_8x = 0,
    public total_avg_maz_9x = 0,
  ) {

  }
}
