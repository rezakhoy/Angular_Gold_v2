export class IBank {
  cod: string;
  name: string;
  balance_r: number;
}

export class Bank implements IBank {
  constructor(
  public cod: string,
  public name: string,
  public balance_r = 0,
  ) {
  }
}


export class IAdminBanks {
  balance_r: number;
}
