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
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {API_URL} from "../../../environments/environment";
import {Lightbox} from "ngx-lightbox";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  selector: 'app-advancedtable',
  templateUrl: './command-child.component.html',
  styleUrls: ['./command-child.component.scss'],
})

/**
 * Advanced table component
 */
export class CommandChildComponent implements OnInit {



  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'xl'
  };

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  currentIndex: 0;
  imageObject: Array<object> =[];

  command: ICommand;
  preview: string;
  audiences: IAudiences[];
  audiencesLoading = false;
  commandChildren: ICommandChild[];

  payInfoForm = this.fb.group({
    payImage:[],
    description:[],
    amount: [null, [Validators.min(10000)]],
    commandChildId: [null, Validators.required],
    receiptNumber: [null, Validators.required],
  });

  constructor(private route: ActivatedRoute,
              private lightbox: Lightbox,
              private _sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private http: HttpClient,
              private modalService: NgbModal,
              private commandService: CommandsService,
              private audiencesService: AudiencesService
              ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.commandService.getCommandChild(+id).subscribe(res => {
        this.commandChildren = res.body;
      })
    })

    this.loadPersons()
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
  getListChildCommand(id: number, modal) {
    const url = `${API_URL}command/`+id;
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
      avatar: file
    });
    this.payInfoForm.get('avatar').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
