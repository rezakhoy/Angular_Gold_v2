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
  @Input()
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;


  public selected: any;
  tables$: Observable<Command[]>;
  total$: Observable<number>;
  editableTable: any;





  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'xl'
  };

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  currentIndex: 0;
  imageObject: Array<object> =[];
  public isCollapsed = true;
  command: ICommand;
  selectedDemand: ICommand;
  audiences: IAudiences[];
  audiencesLoading = false;
  commandChildren: ICommandChild[];

  commandChildForm = this.fb.group({
    audienceId:[],
    amount: [null, [Validators.min(10000)]],
    commandId: [null, Validators.required],
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
  closeEventHandler() {
    console.log("clooooosssssss");
    this.showFlag = false;

  }

  onFileSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      console.log(formData);

      const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })


      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
