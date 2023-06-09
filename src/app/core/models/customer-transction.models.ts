export class IMyTransaction {
  sanad: number;
  tariz: string;
  sh: string;
  v_bed: number;
  v_bes: number;
  v_1: number;
  ayar: number;
  balance_v: number;
  r_bed: number;
  r_bes: number;
  balance_r: number;
}

export class MyTransaction implements IMyTransaction {
  constructor(
    public sanad= 0,
  public tariz: string,
  public sh: string,
  public v_bed = 0,
  public v_bes = 0,
  public v_1 = 0,
  public ayar = 0,
  public balance_v = 0,
  public r_bed = 0,
  public r_bes = 0,
  public balance_r = 0,
  ) {
  }
}

export interface SearchResult {
  tables: MyTransaction[];
  total: number;
}
