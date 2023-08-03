import {Component, OnInit, ViewChildren, QueryList, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Demand, IAdminDemand, IDemand} from "../../core/models/demand.models";
import {ReportsService} from "../../core/services/reports.service";
import {ICommand} from "../../core/models/command.models";
import {CommandsService} from "../../core/services/command.service";
import {ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {IPageable} from "../../core/models/pageable.models";
import {SmsService} from "../../core/services/sms.service";

@Component({
  selector: 'app-advancedtable',
  templateUrl: './daily-demand.component.html',
  styleUrls: ['./daily-demand.component.scss'],
})

export class DailyDemandComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  columns = [{prop: 'name'}, {name: 'balance_v'}, {prop: 'balance_r'},];
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;
  adminDemands: IAdminDemand[];
  displaySpinner = true;
  selected = [];
  temp = [];
  pageable: IPageable;
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
  size: number;
  previousPage: number;
  pageNumber: number;
  editableTable: any;
  totalElements: number = 0;
  demands: IDemand[];
  selectedDemand: IDemand;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  command: ICommand;
  commandForm = this.fb.group({
    id: [],
    audienceId: [],
    person: [],
    type: [],
    amount: [null, [Validators.min(10000)]],
    accountNumber: [null, Validators.required],
    bankName: [null, Validators.required],
    accountOwnerName: [null, Validators.required]
  });


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private titleService: Title,
    private toastr: ToastrService,
    private reportService: ReportsService,
    private smsService: SmsService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle("سرجمع روزانه")
    this.getAdminDailyDemandList(1, 100, '')
    // this.reportService.adminDemand().subscribe(res => {
    //     this.adminDemands = res.body;
    // })
  }

  private getAdminDailyDemandList(page, size, sort) {
    this.reportService.adminDemandsListToday(page, size, sort)
      .subscribe(data => {
          console.log(data);
          this.displaySpinner = false;
          this.demands = data.body['content'];
          console.log(this.demands);
          this.demands.forEach(x => {
            x.selected = false
          });
          this.pageable = data.body['pageable'];
          this.pageable.pageNumber = this.pageable.pageNumber += 1;
          this.totalElements = data.body['totalElements'];
          this.totalPages = data.body['totalPages'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


  selectPage(event) {
    if (this.previousPage !== event) {
      this.previousPage = event;
      this.getAdminDailyDemandList(event, this.size, '');
    }

  }

  sandSms(rowIndex: any) {
    console.log(rowIndex);

  }

  sendSmsToAll() {
    const body = this.demands;
    this.smsService.sendDemandsMessage(body).subscribe(res => {
      this.toastr.success('با موفقیت ارسال شد')
    });
  }

  sendSmsToSelected() {
    const body = this.demands.filter(x => x.selected === true)
    this.smsService.sendDemandsMessage(body).subscribe(res => {
      this.toastr.success('با موفقیت ارسال شد')
    });
  }

  demandl(dd, event) {
    let obj = this.demands.findIndex(x => x.cod === dd.cod)
    if (event === 'on') {
      this.demands[obj].selected = true;
    } else {
      this.demands[obj].selected = false;
    }
    console.log(this.demands.filter(x => x.selected === true));
  }
}
