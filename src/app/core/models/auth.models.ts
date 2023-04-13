import { IGroup } from "./group.models";
import {IPerson, Person} from "./person.models";
import {IPriceGroup} from "./price-group.models";
import {IMyTransaction} from "./customer-transction.models";


export class IUser {
    id: number;
    username: string;
    lock: boolean;
    enable: boolean;
    expired: string;
    credential: boolean;
    groups: IGroup[];
    priceGroups: IPriceGroup[];
    person: IPerson;
   authorization: string;
}


// @ts-ignore
export class User implements IUser {
  constructor(
    public id= 0,
  public username= '',
  public lock= true,
  public enable= true,
  public expired= '',
  public credential= true,
  public groups= [],
  public priceGroups= [],
  public person= {},
  public authorization= '',
  ) {
  }
}

export interface UserSearchResult {
  tables: User[];
  total: number;
}
