import {IPayInformation} from "./pay-information.models";
import {IUser, User} from "./auth.models";

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
  accountNumber: string;
  audienceName: string;
  bankName: string;
  accountOwnerName: string;
  amount: number;
  type: Type;
  status: Status;
  payInformationList: IPayInformation[];

}

export class CommandChild implements ICommandChild {
  constructor(

  ) {
  }

  accountNumber: string;
  accountOwnerName: string;
  amount: number;
  audienceName: string;
  bankName: string;
  id: number;
  name: string;
  payInformationList: IPayInformation[];
  person: number;
  status: Status;
  type: Type;
}

export interface CommandChildResult {
  tables: CommandChild[];
  total: number;
}
