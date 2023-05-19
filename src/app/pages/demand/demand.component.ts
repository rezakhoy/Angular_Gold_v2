import {Component, OnInit, ViewChildren, QueryList, TemplateRef, ViewChild} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
// import { AdvancedService } from './advanced.service';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Demand, IAdminDemand, IDemand} from "../../core/models/demand.models";
import {ReportsService} from "../../core/services/reports.service";
import {ICommand} from "../../core/models/command.models";
import {CommandsService} from "../../core/services/command.service";
import {ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-advancedtable',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
})

export class DemandComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  columns = [{ prop: 'name' }, { name: 'balance_v' }, { prop: 'balance_r' }, ];
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;
  adminDemands: IAdminDemand;
  displaySpinner = true;
  selected = [];
  temp = [];
  demands: IDemand[];
  selectedDemand: IDemand;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };
  command: ICommand;
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


  constructor(
              private fb: FormBuilder,
              private modalService: NgbModal,
              private titleService: Title,
              private reportService: ReportsService,
              private commandService: CommandsService
              ) {

  }

  ngOnInit() {
    this.titleService.setTitle(" لیست  مطالبات ")
    this.reportService.adminDemandList().subscribe(res => {
      this.demands = res.body;
      this.displaySpinner = false;
      console.log(this.demands);
    })
    this.reportService.adminDemand().subscribe(res => {
        this.adminDemands = res.body;
    })
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.demands = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  saveCommand() {
    let command = this.commandForm.value;
    console.log(command);
    if (command.type === 'PAY'){
      this.commandService.createPayCommand(command).subscribe(res => {
        console.log(res);
      })
    }else if (command.type === 'RECEIVE')
    this.commandService.createReceiveCommand(command).subscribe(res => {
      console.log(res);
    })
  }

  makeCommand(index, commandModal, pay: string) {
    console.log(index);
    this.selectedDemand = this.demands[index];
    console.log(this.selectedDemand);
    this.modalService.open(commandModal, this.ngbModalOptions);
    this.commandForm.patchValue({
      audienceId: this.selectedDemand.audienceId,
      type: pay
    })
  }
}
