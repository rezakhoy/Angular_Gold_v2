import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';

import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../core/services/user.service";
import {IPerson, Person} from "../../core/models/person.models";
import {JalaliDateCalculatorService} from "ngx-persian";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {AdvancedSortableDirectiveUsers, SortEvent} from "../users/advanced-sortable.directive";


@Component({
  selector: 'app-advancedtable',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class PersonComponent implements OnInit {

  public selected: any;
  tables$: Observable<Person[]>;
  total$: Observable<number>;
  editableTable: any;
  personsLoading = false;
  persons: IPerson[];



  @ViewChildren(AdvancedSortableDirectiveUsers) headers: QueryList<AdvancedSortableDirectiveUsers>;
  public isCollapsed = true;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };


  updatePersonForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    dateOfBirth: [null, Validators.required],
    email: [null, Validators.required],
    cellPhone: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    address: [null, Validators.required],
    city: [null, Validators.required],
    vip:[],
    description: [],
    pCode: [null, Validators.required],
    gender: [null, Validators.required],
  });



  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private titleService: Title,
              private modalService: NgbModal,
              private userService: UserService,
              private toastr: ToastrService,
              private jalaliDateService: JalaliDateCalculatorService,
              private datePipe: DatePipe
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.titleService.setTitle(" مخاطبین")
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

  createUserFunc(cgf) {
    this.modalService.open(cgf, this.ngbModalOptions);
  }


  editUser(per: Person, createUserModal) {
    console.log("in edit user", per);
    this.updatePersonForm.patchValue({
      id: per.id,
      name: per.name,
      city: per.city,
      vip: per.vip,
      dateOfBirth: this.jalaliDateService.convertToJalali(new Date(per.dateOfBirth)),
      gender: per.gender,
      email: per.email,
      cellPhone: per.cellPhone,
      phoneNumber: per.phoneNumber,
      address: per.phoneNumber,
      pCode: per.pCode,
      description: per.description,
    })
    this.modalService.open(createUserModal, this.ngbModalOptions);
  }

  savePerson() {
    let date = this.updatePersonForm.get('dateOfBirth').value;
    let y = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getFullYear()
    let m = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getMonth()
    let d = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getDay()

    let body = this.updatePersonForm.value;

    body.dateOfBirth = y+'-'+ m+'-'+d
    body.dateOfBirth = this.datePipe.transform(body.dateOfBirth, 'yyyy-MM-dd');
    console.log(body);
    this.userService.updatePerson(body).subscribe(res => {
      this.toastr.success(` کاربر${res.body.name}  با موقت ایجاد شد`)
      this.userService.getAll().subscribe(res => {
        this.tables$ = this.service.tables$;
      })
    })
  }
}
