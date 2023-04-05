import { IGroup } from "./group.models";
import { IPerson } from "./person.models";
import {IPriceGroup} from "./price-group.models";


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
