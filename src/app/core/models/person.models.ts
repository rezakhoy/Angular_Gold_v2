import {IAdminBalance} from "./balance.models";
import {User} from "./auth.models";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export class IPerson {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  cellPhone: string;
  phoneNumber: string;
  address: string;
  city: string;
  description: string;
  pCode: string;
  vip: boolean;
  gender: Gender;
}

export class Person implements IPerson {
  constructor(
    public id = 0,
    public name = '',
    public dateOfBirth = '',
    public email = '',
    public cellPhone = '',
    public phoneNumber = '',
    public city = '',
    public address = '',
    public description = '',
    public pCode = '',
    public vip = false,
    public gender = Gender.MALE,
  ) {

  }
}


export interface PersonSearchResult {
  tables: Person[];
  total: number;
}
