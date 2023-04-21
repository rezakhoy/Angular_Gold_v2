import {ICommandChild} from "./command-child.models";
import {IPerson} from "./person.models";

enum Status {
  CLEARED = "cleared",
  UNCLEARED = "uncleared",
  OVER = "over",

}
enum Type {
  PAY = "pay",
  RECEIVE  = "receive",
}

export class ICommand {
  id: number;
  person: IPerson;
  amount: number;
  type: Type;
  status: Status;
  accountNumber: string;
  bankName: string;
  accountOwnerName: string;
  editable: boolean
  commandChild: ICommandChild[]
}

