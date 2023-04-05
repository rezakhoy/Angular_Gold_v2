import { IPermission } from "./permission.models";


export class IGroup {
  id: number;
  name: string;
  permissions: IPermission[];
}
