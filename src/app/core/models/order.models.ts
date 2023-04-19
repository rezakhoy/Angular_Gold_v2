
enum Status {
  REQUEST = "request",
  CONFIRM = "confirm",
  UNCONFIRM = "unconfim",
  REJECT  = "reject",
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
  status: Status;
  type: Type;
  amount: number;
  description: string;
  baseProductId: number;
  userId: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

