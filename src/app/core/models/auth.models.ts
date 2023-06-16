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
    user: IUser;
    userId: number;
    credential: boolean;
    groups: IGroup[];
    priceGroups: IPriceGroup[];
    person: IPerson;
   authorization: string;
    refreshToken:string;
    password: string;
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
  public refreshToken= '',
  ) {
  }
}

export interface UserSearchResult {
  tables: User[];
  total: number;
}


export class IRefreshToken {
  accessToken: string
  refreshToken: string
}
