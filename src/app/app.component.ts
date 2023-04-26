import { Component , OnInit} from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {permission} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private permService: NgxPermissionsService) {
  }

  ngOnInit() {
    // this.permService.loadPermissions([permission])
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
