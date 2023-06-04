import {Component, OnInit, ViewChildren, QueryList, TemplateRef, Input} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {Observable, Subscription} from 'rxjs';

import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Command, ICommand} from "../../core/models/command.models";
import {CommandsService} from "../../core/services/command.service";
import {AudiencesService} from "../../core/services/audiences.service";
import {IAudiences} from "../../core/models/audiences.models";
import {ICommandChild} from "../../core/models/command-child.models";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {API_URL} from "../../../environments/environment";
import {Lightbox} from "ngx-lightbox";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";
import {DomSanitizer, Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-advancedtable',
  templateUrl: './command-child-list.component.html',
  styleUrls: ['./command-child-list.component.scss'],
})

/**
 * Advanced table component
 */
export class CommandChildListComponent implements OnInit {



  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
  };

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  currentIndex: 0;
  imageObject: Array<object> =[];
  percentDone: any = 0;
  command: ICommand;
  preview: string;
  audiences: IAudiences[];
  audiencesLoading = false;
  commandChildren: ICommandChild[];

  payInfoForm = this.fb.group({
    payImage:[null],
    description:[],
    amount: [null, Validators.required],
    commandChildId: [null, Validators.required],
    receiptNumber: [null, Validators.required],
  });

  commandChildForm = this.fb.group({
    id: [null],
    name: [null],
    accountNumber: [null],
    audienceName: [null],
    bankName: [null],
    accountOwnerName: [null],
    amount: [null],
    type: [null],
    status: [null]
  })

  constructor(private route: ActivatedRoute,
              private lightbox: Lightbox,
              private _sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private http: HttpClient,
              private modalService: NgbModal,
              public router: Router,
              private titleService: Title,
              private commandService: CommandsService,
              private audiencesService: AudiencesService
              ) {

  }

  ngOnInit() {
    this.callCommandChild()
    this.callCommand()
  }

  callCommandChild() {
      this.commandService.getCommandChildren().subscribe(res => {
        this.commandChildren = res.body;
        console.log(this.commandChildren);
      })
  }

  callCommand() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.commandService.getCommand(+id).subscribe(res => {
        this.command = res.body;
        console.log('cooooooooommmmmmmand', this.command);
        this.titleService.setTitle(this.command.audienceName +'--' + this.command.amount)
      })
    })

  }

  transform(image){
    return this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  private loadPersons() {
    this.audiencesLoading = true;
    this.audiencesService.getAllAudiences().subscribe(res => {
      this.audiences = res.body;
      this.audiencesLoading = false;
    })
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
         this.callCommandChild();
         break;
      }
    })
  }
  makePayInfo(child, modal){

    this.payInfoForm.patchValue({
      commandChildId: child.id
    })
    this.modalService.open(modal, this.ngbModalOptions);
  }

  confirmPay(id) {
    this.commandService.confirmPayInfo(id).subscribe(res => {
      this.callCommandChild();
    })

  }

  unConfirmPay(id: number) {

  }

  editCommandChild(child: ICommandChild, payInfoModal) {
    console.log(child);
    this.modalService.open(payInfoModal, this.ngbModalOptions);
    console.log(child);
    this.commandChildForm.patchValue({
      id: child.id,
    });
  }

  updateCommandChild() {
    let commandChild = this.commandChildForm.value;
    console.log(commandChild);
    this.commandService.updateCommandChild(commandChild).subscribe(res => {
      console.log(res);
    })

  }

  deleteCommandChild(child: ICommandChild) {
    this.commandService.deleteCommandChild(child.id).subscribe(res => {
      console.log(res);
    })
  }

  deletePayInfo(pay) {
    this.commandService.deletePayInformation(pay.id).subscribe(res => {
      this.toastr.error(`  پرداخت با شناسه  ${res}  حذف شد`)
    })

  }
}
