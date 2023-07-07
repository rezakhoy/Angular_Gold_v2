
enum Status {
  REQUEST = "request",
  CONFIRM = "confirm",
  UNCONFIRM = "unconfim",
  REJECT  = "reject",
  Waiting  = "waiting",
}
enum Type {
  SELL = "sell",
  BUY  = "buy",
}

export class IOrder {
  id: number;
  price: number;
  priceGroupId: number;
  name: string;
  status: string;
  type: Type;
  amount: number;
  reyall: number;
  description: string;
  baseProductId: number;
  userId: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  time: string;
}

