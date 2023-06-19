import { Component, OnInit} from '@angular/core';
import {MyTransaction} from "../../core/models/customer-transction.models";
import {Title} from "@angular/platform-browser";
import {DeviceDetectorService} from "ngx-device-detector";
import {ReportsService} from "../../core/services/reports.service";
import {IPageable} from "../../core/models/pageable.models";


@Component({
  selector: 'app-advancedtable',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})

/**
 * Advanced table component
 */
export class TransactionsComponent implements OnInit {

  displaySpinner = true;
  transaction: MyTransaction[];
  pageable: IPageable;
  total: number;
  page:  number;
  totalPages:  number;
  pageSize:  number;
  size:  number;
  previousPage: number;
  pageNumber:  number;
  editableTable: any;
  totalElements: number = 0;

  public isCollapsed = true;

  constructor(
              private titleService: Title,
              public deviceService: DeviceDetectorService,
              public reportService: ReportsService
              ) {
  }

  ngOnInit() {
    this.deviceService.isMobile()
    this.titleService.setTitle(" لیست تراکنش ها")
    this.getMyTransactions(0, 20, '')
  }


  private getMyTransactions(page, size, sort) {
    this.reportService.getTransactions(page,size,sort)
      .subscribe(data => {
          this.displaySpinner=false;
          this.transaction = data.body['content'];
          this.pageable = data.body['pageable'];
          console.log(this.pageable);
          this.pageable.pageNumber = this.pageable.pageNumber+=1;
          this.totalElements = data.body['totalElements'];
          this.totalPages = data.body['totalPages'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }


  selectPage(event) {
    if (this.previousPage !== event) {
      this.previousPage = event;
      this.getMyTransactions(event, this.size, '');
    }

  }
}
