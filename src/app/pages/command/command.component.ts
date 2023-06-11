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
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import Swal from 'sweetalert2';
import {ToastrService} from "ngx-toastr";

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
  preview: string;
  percentDone: any = 0;

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

  payInfoForm = this.fb.group({
    payImage:[null],
    personId:[null],
    description:[],

    amount: [null, Validators.required],
    commandChildId: [null, Validators.required],
    receiptNumber: [null, Validators.required],
  });

  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private route: Router,
              private toastr: ToastrService,
              private titleService: Title,
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
    this.titleService.setTitle(" لیست دریافت و پرداخت")
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
  changeSelectPerson($event: any) {
    console.log($event);
    document.getElementById('amount').focus();
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
    console.log('in coooooooomand....', commandChild);
    this.commandService.createCommandChild(commandChild).subscribe(res => {
      this.commandService.getAllCommand().subscribe(res => {
       this.service.commands = res.body;
      })
    })
  }

  makeCommandChild(table, commandChildModal) {
    this.commandChildForm.patchValue({
      commandId: table.id
    })
    this.modalService.open(commandChildModal, this.ngbModalOptions);
  }

  getListChildCommand(id: number, modal) {
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['/command/']));
    window.open( url+'/'+id , '_blank');
  }

  getClearCommandChild(table: Command, commandChildInformation) {
    Swal.fire({
      title: ` از تسویه دستور پرداخت با شناسه  ${table.id} اطمینان دارید؟`,
      text: "در صورت تسویه قابل برگشت نمی باشد",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      confirmButtonText: 'بله تسویه شود!',
      cancelButtonText: 'انصراف'

    }).then((result) => {
      if (result.isConfirmed) {
        this.commandService.clearCommand(table.id).subscribe(res => {
          this.service.setData();
          this.toastr.success('دستور با موفقیت تسویه شد ')
        })
      }
    })
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.payInfoForm.patchValue({
      payImage: file
    });
    this.payInfoForm.get('payImage').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    var formData: any = new FormData();
    console.log(this.payInfoForm.value);
    const payInfo = {
      amount: this.payInfoForm.get('amount').value,
      description: this.payInfoForm.get('description').value,
      receiptNumber:this.payInfoForm.get('receiptNumber').value,
      commandChildId:this.payInfoForm.get('commandChildId').value,
    }
    // @ts-ignore
    formData.append('payInfo', JSON.stringify(payInfo) )
    formData.append('payImage',  this.payInfoForm.value.payImage)

    this.commandService.createPayInfo(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.commandService.getAllCommand().subscribe(res => {
            this.service.commands = res.body;

          })
          break;
      }
    })
  }
}
