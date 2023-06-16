import { Component, OnInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import {MyTransaction} from "../../core/models/customer-transction.models";
import {Title} from "@angular/platform-browser";
import {DeviceDetectorService} from "ngx-device-detector";
import {ReportsService} from "../../core/services/reports.service";


@Component({
  selector: 'app-advancedtable',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class TransactionsComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: MyTransaction[];
  public selected: any;
  hideme: boolean[] = [];
  displaySpinner = true;
  tables$: Observable<MyTransaction[]>;
  total$: Observable<number>;
  editableTable: any;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(public service: AdvancedService,
              private titleService: Title,
              public deviceService: DeviceDetectorService,
              public reportService: ReportsService
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {

    this.deviceService.isMobile()
    this.titleService.setTitle(" لیست تراکنش ها")


    this.tables$.subscribe(res => {
      console.log(res)
    })
  }







  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
