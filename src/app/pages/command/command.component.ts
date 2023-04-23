import {Component, OnInit, ViewChildren, QueryList, TemplateRef} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Command, ICommand} from "../../core/models/command.models";
import {CommandsService} from "../../core/services/command.service";
import {AudiencesService} from "../../core/services/audiences.service";
import {IAudiences} from "../../core/models/audiences.models";
import {ICommandChild} from "../../core/models/command-child.models";
import {API_URL} from "../../../environments/environment";
import {AdvancedSortableDirective, SortEvent} from "../transactions/advanced-sortable.directive";

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
    keyboard : false,
    size: 'xl'
  };


  public isCollapsed = true;
  command: ICommand;
  selectedDemand: ICommand;
  audiences: IAudiences[];
  audiencesLoading = false;
  commandChildren: ICommandChild[];

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
  commandChildForm = this.fb.group({
    audienceId:[],
    amount: [null, [Validators.min(10000)]],
    commandId: [null, Validators.required],
  });

  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private reportService: CommandsService,
              private commandService: CommandsService,
              private audiencesService: AudiencesService
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
    this.loadPersons()
  }

  private loadPersons() {
    this.audiencesLoading = true;
    this.audiencesService.getAllAudiences().subscribe(res => {
      this.audiences = res.body;
      this.audiencesLoading = false;
    })
  }

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


  saveCommandChild() {
    let commandChild = this.commandChildForm.value
    this.commandService.createReceiveCommandChild(commandChild).subscribe(res => {
      console.log(res);
    })
  }

  makeCommandChild(table, commandChildModal) {
    this.commandChildForm.patchValue({
      commandId: table.id
    })
    this.modalService.open(commandChildModal, this.ngbModalOptions);
  }

  getListChildCommand(id: number, modal) {
    const url = `${API_URL}persons`;
    window.open(url, '_blank');
  }
  //   this.commandService.getCommandChild(id).subscribe(res => {
  //     this.commandChildren = res.body;
  //     console.log(this.commandChildren);
  //     this.modalService.open(modal, {
  //       backdrop: 'static',
  //       keyboard: false,
  //       size: 'xl'
  //     })
  //   })
  // }
}
