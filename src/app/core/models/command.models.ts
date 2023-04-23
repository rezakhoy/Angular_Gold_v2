import {ICommandChild} from "./command-child.models";
import {IPerson} from "./person.models";
import {Demand, IDemand} from "./demand.models";

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
  pCode: string;
  amount: number;
  balance: number;
  cleared: number;
  type: Type;
  status: Status;
  accountNumber: string;
  audienceName: string;
  bankName: string;
  accountOwnerName: string;
  editable: boolean
  commandChild: ICommandChild[]
}
export class Command implements ICommand {
  constructor(
    public id: number,
  public person: IPerson,
  public pCode: string,
  public amount: number,
  public cleared: number,
  public balance: number,
  public type: Type,
  public status: Status,
  public accountNumber: string,
  public audienceName: string,
  public bankName: string,
  public accountOwnerName: string,
  public editable: boolean,
  public commandChild: ICommandChild[],
  ) {
  }
}


export interface CommandSearchResult {
  tables: Command[];
  total: number;
}
