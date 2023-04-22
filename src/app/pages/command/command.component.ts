import {Component, OnInit, ViewChildren, QueryList, TemplateRef} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

import {Command, ICommand} from "../../core/models/command.models";
import {CommandsService} from "../../core/services/command.service";

import {AdvancedSortableDirective} from "../transactions/advanced-sortable.directive";
import {SortEvent} from "../users/advanced-sortable.directive";

@Component({
  selector: 'app-advancedtable',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class CommandComponent implements OnInit {

  public selected: any;
  tables$: Observable<Command[]>;
  total$: Observable<number>;
  editableTable: any;


  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;


  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };


  public isCollapsed = true;
  command: ICommand;
  selectedDemand: ICommand;


  commandForm = this.fb.group({
    id: [],
    audienceId:[],
    person:[],
    type: [],
    amount: [null, [Validators.min(10000)]],
    accountNumber: [null, Validators.required],
    bankName: [null, Validators.required],
    accountOwnerName: [null, Validators.required]
  });


  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private reportService: CommandsService,
              private commandService: CommandsService
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    this.service.pageSize = 1000
  }

  ngOnInit() {

    this.service.tables$.subscribe(res => {
      this._fetchData();
    })
    this.commandService.getAllCommand().subscribe(res => {
      console.log(res);
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

  // saveCommand() {
  //   let command = this.commandForm.value;
  //   if (command.type === 'PAY'){
  //     this.commandService.createPayCommand(command).subscribe(res => {
  //       console.log(res);
  //     })
  //   }else if (command.type === 'RECEIVE')
  //   this.commandService.createReceiveCommand(command).subscribe(res => {
  //     console.log(res);
  //   })
  // }

  // makeCommand(table: Command, commandModal, pay: string) {
  //   this.selectedDemand = table;
  //   this.modalService.open(commandModal, this.ngbModalOptions);
  //   this.commandForm.patchValue({
  //     audienceId: table.audienceId,
  //     type: pay
  //   })
  // }
}
