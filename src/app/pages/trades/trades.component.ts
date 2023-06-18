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
  startDate: NgbDateStruct;
  totalBuy: number;
  totalSell: number;
  endDate: NgbDateStruct;
  constructor(
              private service: ReportsService,
              private titleService: Title,
              private toastr: ToastrService,
              public deviceService: DeviceDetectorService,
              private jalaliDateService: JalaliDateCalculatorService,
              private datePipe: DatePipe
              ) {

  }

  ngOnInit() {
    const now = this.jalaliDateService.convertToJalali(new Date());
    this.startDate = {year: now.year, month: now.month+1, day: now.day};
    this.endDate = {year: now.year, month: now.month+1, day: now.day};
    this.deviceService.isMobile()
    this.titleService.setTitle("لیست معاملات")
    this.service.adminTrades(this.ngbToString(this.startDate), this.ngbToString(this.endDate)).subscribe(res=> {
      this.trades = res;
    })
  }
  ngbToString(date: NgbDateStruct){
   const dateString = date.year.toString() + '/' + date.month.toString() + '/' + date.day.toString()
    return   this.datePipe.transform(dateString, 'yyyy/MM/dd').toString();
  }

  checkDate() {
    if(moment(this.endDate) <moment(this.startDate)){
      this.toastr.warning('تاریخ پایان باید بزرگتر از شروع باشد!')
    }else {
      this.service.adminTrades(this.ngbToString(this.startDate), this.ngbToString(this.endDate)).subscribe(res=> {
        this.trades = res;

       let totalBuy = this.trades.filter((x) =>   x.n_sanad == '81' || x.n_sanad == '83'
        ).reduce((total,line) => total + line.v_750 ,0)
        let total = this.trades.reduce((total,line) => total + line.v_750 ,0)
        // this.trades.reduce((tt, trade)=> trade.v_750 += tt.v_750)
        this.totalBuy = totalBuy;
       this.totalSell = total - totalBuy;
      })
    }
  }
}
