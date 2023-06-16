import { Injectable } from '@angular/core';
import {PermissionStore, RoleStore} from 'ng2-permission';
import {AuthenticationService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private permissionStore: PermissionStore, private roleStore: RoleStore, private authService: AuthenticationService,) {
    authService.getUser().subscribe(res => {
      const roles = res.body.groups.map(function(a) {return a.name;});
      roleStore.defineRoles(roles, function () {
        return true;
      });
    });

  }


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

 seRole(roles){
   this.roleStore.defineRoles(roles, function () {
     return true;
   });
 }
 remove(role){
    this.roleStore.removeRoleDefinition(role);
 }
  clearStore(){
    this.roleStore.clearStore();
 }
  hasPermission(per){
    return this.roleStore.hasRoleDefinition(per)
  }
}
