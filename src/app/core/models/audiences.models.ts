import { IGroup } from "./group.models";
import {IPerson, Person} from "./person.models";
import {IPriceGroup} from "./price-group.models";
import {IMyTransaction} from "./customer-transction.models";
import {IBank} from "./bank.models";

export class IAudiences {
    id: number;
    name: string;
    balanceR: number;
    person: IPerson;
    bank: IBank;
    laboratory: string;
}

