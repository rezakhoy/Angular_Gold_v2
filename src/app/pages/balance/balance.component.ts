import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {Title} from "@angular/platform-browser";
import {DeviceDetectorService} from "ngx-device-detector";
import {ReportsService} from "../../core/services/reports.service";
import {ITrade} from "../../core/models/trade.models";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {JalaliDateCalculatorService} from "ngx-persian";
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment';
import {PermissionService} from "../../core/services/permission.service";
import {AdminBalance} from "../../core/models/balance.models";


@Component({
  selector: 'app-advancedtable',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  providers: [DecimalPipe]
})

/**
 * Advanced table component
 */
export class BalanceComponent implements OnInit {
  adminBalance = new AdminBalance()
  constructor(
    private reportService: ReportsService,
    private permissionService: PermissionService,
              ) {

  }

  ngOnInit() {

  }
  public getAdminBalance(){
    if (this.permissionService.hasPermission('admin') || this.permissionService.hasPermission('acc')){
      this.reportService.adminBalance().subscribe(res => {
        this.adminBalance = res.body;
      });
    }
  }
}
