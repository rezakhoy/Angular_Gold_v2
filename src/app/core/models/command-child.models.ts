import {IPayInformation} from "./pay-information.models";

enum Status {
  CLEARED = "cleared",
  UNCLEARED = "uncleared",
  OVER = "over",

}
enum Type {
  PAY = "pay",
  RECEIVE  = "receive",
}

export class ICommandChild {
  id: number;
  person: number;
  name: string;
  amount: number;
  type: Type;
  status: Status;
  payInformationList: IPayInformation[];

}

