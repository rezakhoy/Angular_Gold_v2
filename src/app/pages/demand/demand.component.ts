import {Component, OnInit, ViewChildren, QueryList, TemplateRef} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Demand, IAdminDemand, IDemand} from "../../core/models/demand.models";
import {ReportsService} from "../../core/services/reports.service";
import {AdvancedSortableDirectiveDemands, SortEvent} from "./advanced-sortable.directive";
import {ICommand} from "../../core/models/command.models";
import {IPerson} from "../../core/models/person.models";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-advancedtable',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class DemandComponent implements OnInit {

  public selected: any;
  tables$: Observable<Demand[]>;
  total$: Observable<number>;
  editableTable: any;
  adminDemands: IAdminDemand;

  @ViewChildren(AdvancedSortableDirectiveDemands) headers: QueryList<AdvancedSortableDirectiveDemands>;


  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };


  public isCollapsed = true;
  command: ICommand;
  selectedDemand: IDemand;


  commandForm = this.fb.group({
    id: [],
    person:[],
    amount: [null, [Validators.min(10000)]],
    accountNumber: [null, Validators.required],
    bankName: [null, Validators.required],
    accountOwnerName: [null, Validators.required]
  });


  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private reportService: ReportsService,
              // private userService: UserService
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    this.service.pageSize = 1000
  }

  ngOnInit() {
    this.reportService.adminDemand().subscribe(res => {
        this.adminDemands = res.body;
      console.log(this.adminDemands);
    })
    this.service.tables$.subscribe(res => {
      this._fetchData();
    })
    // this.loadPersons()
  }
  // private loadPersons() {
  //   this.personsLoading = true;
  //   this.userService.getAllPersons().subscribe(res => {
  //     this.persons = res.body;
  //     this.personsLoading = false;
  //   })
  // }

  /**
   * fetches the table value
   */
  _fetchData() {
    // this.tableData = tableData;
    // for (let i = 0; i <= this.tableData.length; i++) {
    //   this.hideme.push(true);
    // }


    // this.editableTable = editableTable;
    // for (let i = 0; i <= this.tableData.length; i++) {
    //   this.hideme.push(true);
    // }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  createUserFunc(cgf) {
    this.modalService.open(cgf, this.ngbModalOptions);
      // document.getElementById('amount').focus();

  }

  saveCommand() {
    console.log(this.selectedDemand);
    console.log(this.commandForm.value);
  }

  makeCommand(table: Demand, commandModal, pay: string) {

    this.selectedDemand = table;
    this.modalService.open(commandModal, this.ngbModalOptions);
    const status = pay


  }
}
