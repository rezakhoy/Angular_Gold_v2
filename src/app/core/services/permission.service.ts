import { Injectable } from '@angular/core';
import {PermissionStore, RoleStore} from 'ng2-permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private permissionStore: PermissionStore, private roleStore: RoleStore) { }
  init() {
    this.permissionStore.definePermission('Read', function () {
      return true;
    });
    this.permissionStore.definePermission('Write', function () {
      return true;
    });
    this.permissionStore.definePermission('Delete', function () {
      return true;
    });

  }

 seRole(role){
   this.roleStore.defineRoles(role, function () {
     return true;
   });
 }
 remove(role){
    this.roleStore.removeRoleDefinition(role);
 }
  clearStore(){
    this.roleStore.clearStore();
 }

}
