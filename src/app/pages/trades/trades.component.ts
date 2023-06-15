import { Component, OnInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import {MyTransaction} from "../../core/models/customer-transction.models";
import {Title} from "@angular/platform-browser";
import {DeviceDetectorService} from "ngx-device-detector";
import {ReportsService} from "../../core/services/reports.service";
import {ITrade} from "../../core/models/trade.models";


@Component({
  selector: 'app-advancedtable',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
  providers: [DecimalPipe]
})

/**
 * Advanced table component
 */
export class TradesComponent implements OnInit {
  trades: ITrade[];

  constructor(
              private service: ReportsService,
              private titleService: Title,
              public deviceService: DeviceDetectorService
              ) {

  }

  ngOnInit() {
    this.deviceService.isMobile()
    this.titleService.setTitle("لیست معاملات")
    console.log('in trade page');
    this.service.adminTrades().subscribe(res=> {
      console.log(res.body);
      console.log(res);
      this.trades = res;
    })
  }

}
