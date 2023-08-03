enum Type {
  SELL = "sell",
  BUY  = "buy",
}

export class ISystemSetting {
  id: number;
  rejectTime: number;
  payImageDirectory: string;
  textMessageUsername: string;
  textMessagePassword: string;
  textMessageNumber: string;
  sendMessageForOrderConfirm: boolean;
  sendMessageForOrderConfirmAmount:number;
}

