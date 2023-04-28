

enum Status {
  REQUEST = "request",
  CONFIRM  = "receive",
  UNCONFIRM  = "receive",
}

export class IPayInformation {
  id: number;
  description: string;
  amount: number;
  receiptNumber: string;
  status: Status;
  image: any;
  commandChildId: number
}

