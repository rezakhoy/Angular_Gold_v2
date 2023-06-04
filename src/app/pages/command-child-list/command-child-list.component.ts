import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import {ICommandChild} from "../../core/models/command-child.models";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CommandsService} from "../../core/services/command.service";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-advancedtable',
  templateUrl: './command-child-list.component.html',
  styleUrls: ['./command-child-list.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class CommandChildListComponent implements OnInit {

  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
  };
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<ICommandChild[]>;
  total$: Observable<number>;
  imageObject: Array<object> =[];
  showFlag: boolean = false;
  preview: string;
  selectedImageIndex: number = -1;
  editableTable: any;
  percentDone: any = 0;
  payInfoForm = this.fb.group({
    payImage:[null],
    description:[],
    amount: [null, Validators.required],
    commandChildId: [null, Validators.required],
    receiptNumber: [null, Validators.required],
  });
  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(public service: AdvancedService,
              private _sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private commandService: CommandsService,
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Glenna Reichert', title: 'Glenna Reichert' },
              { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
              { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
            ],
          },
        },
      },
      email: {
        title: 'Email',
        filter: {
          type: 'completer',
          config: {
            completer: {
              // data: editableTable,
              searchFields: 'email',
              titleField: 'email',
            },
          },
        },
      },
    },
  };

  ngOnInit() {
    this._fetchData();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
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
          this._fetchData()
          break;
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
  transform(image){
    return this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  showLightbox(index) {
    const image = {
      image: 'data:image/jpeg;base64,' + index,
      alt: 'tf',
      title: "reza"
    }
    this.imageObject.push(image)
    this.selectedImageIndex = 0;
    this.showFlag = true;
  }
  onclick($event: MouseEvent) {
    this.showFlag = false;
  }
  /**
   * fetches the table value
   */
  _fetchData() {
    this.service.setData();
  }
  makePayInfo(child, modal){

    this.payInfoForm.patchValue({
      commandChildId: child.id
    })
    this.modalService.open(modal, this.ngbModalOptions);
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
