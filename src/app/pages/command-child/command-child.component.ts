import {Component, OnInit, ViewChildren, QueryList, TemplateRef} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Command, ICommand} from "../../core/models/command.models";
import {CommandsService} from "../../core/services/command.service";
import {AudiencesService} from "../../core/services/audiences.service";
import {IAudiences} from "../../core/models/audiences.models";
import {ICommandChild} from "../../core/models/command-child.models";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";



@Component({
  selector: 'app-advancedtable',
  templateUrl: './command-child.component.html',
  styleUrls: ['./command-child.component.scss'],
})

/**
 * Advanced table component
 */
export class CommandChildComponent implements OnInit {

  public selected: any;
  tables$: Observable<Command[]>;
  total$: Observable<number>;
  editableTable: any;





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

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private commandService: CommandsService,
              private audiencesService: AudiencesService
              ) {

  }

  ngOnInit() {
    console.log('this.route.params');
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log(id);
      this.commandService.getCommandChild(+id).subscribe(res => {
        this.commandChildren = res.body;
        console.log(this.commandChildren);
      })
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
    // const url = `${API_URL}persons`;
    // window.open(url, '_blank');
  // }
    this.commandService.getCommandChild(id).subscribe(res => {
      this.commandChildren = res.body;
      console.log(this.commandChildren);
      this.modalService.open(modal, {
        backdrop: 'static',
        keyboard: false,
        size: 'xl'
      })
    })
  }
}
