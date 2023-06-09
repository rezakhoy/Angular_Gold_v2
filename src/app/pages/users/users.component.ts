import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirectiveUsers, SortEvent} from './advanced-sortable.directive';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../core/services/user.service";
import {IPerson} from "../../core/models/person.models";
import {IUser, User} from "../../core/models/auth.models";
import {IPermission} from "../../core/models/permission.models";
import {IPriceGroup} from "../../core/models/price-group.models";
import { PriceGroupService} from "../../core/services/price-group.service";
import {IGroup} from "../../core/models/group.models";
import {JalaliDateCalculatorService} from "ngx-persian";
import {AuthenticationService} from "../../core/services/auth.service";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-advancedtable',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class UsersComponent implements OnInit {

  public selected: any;
  tables$: Observable<User[]>;
  total$: Observable<number>;
  editableTable: any;
  personsLoading = false;
  groupsLoading = false;
  permissionsLoading = false;
  priceGroupLoading = false;
  permissions: IPermission[];
  priceGroups: IPriceGroup[];
  persons: IPerson[];
  groups: IGroup[];


  @ViewChildren(AdvancedSortableDirectiveUsers) headers: QueryList<AdvancedSortableDirectiveUsers>;
  public isCollapsed = true;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };


  createUserForm = this.fb.group({
    id: [],
    userId: [null],
    personId: [null, Validators.required],
    groupIds: [null, Validators.required],
    priceGroupIds :[],
    dateOfBirth: [null, Validators.required],
    genderEnum: [null, Validators.required],
    email: [null, Validators.required],
    cellPhone: [null, Validators.required],
    phoneNumber: [],
    address: [],
    city: [],
    description: null,
    password: [null, Validators.required],
  });



  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private titleService: Title,
              private modalService: NgbModal,
              private userService: UserService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private priceGroupService: PriceGroupService,
              private jalaliDateService: JalaliDateCalculatorService,
              private datePipe: DatePipe
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.titleService.setTitle(" کاربران")
    this.loadPersons()
    this.loadPermissionGroups()
    this.loadPriceGroups()
  }
  private loadPersons() {
    this.personsLoading = true;
    this.userService.getAllPersons().subscribe(res => {
      this.persons = res.body;
      this.personsLoading = false;
    })
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
    this.createUserForm.reset()
    this.modalService.open(cgf, this.ngbModalOptions);
  }

  saveUser() {
    let date = this.createUserForm.get('dateOfBirth').value;
    let y = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getFullYear()
    let m = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getMonth()
    let d = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getDay()

    let body = this.createUserForm.value;

    body.dateOfBirth = y+'-'+ m+'-'+d
    body.dateOfBirth = this.datePipe.transform(body.dateOfBirth, 'yyyy-MM-dd');
    console.log(body);
    if (body.id){
      this.userService.updateUser(body).subscribe(res => {
        this.toastr.success(`  کاربر ${res.body.person.name}  با موفقیت ویرایش ایجاد شد`)
        this.userService.getAll().subscribe(res => {
          this.service.setData()
        })
      }, error => {
        this.toastr.error(`   ${error.error} `)
      } )
    }else {
      this.userService.register(body).subscribe(res => {
        this.toastr.success(`  کاربر ${res.body.person.name}  با موفقیت ایجاد شد`)
        this.userService.getAll().subscribe(res => {
           this.service.setData()
        })
      }, error => {
        this.toastr.error(`   ${error.error} `)
      } )
    }
 this.createUserForm.reset()
  }

  private loadPermissionGroups() {
    this.groupsLoading = true;
    this.authService.getPermissions().subscribe(res => {
      this.groups = res.body;
      this.groupsLoading = false;
    })

  }

  private loadPriceGroups() {
    this.priceGroupLoading = true;
    this.priceGroupService.getAllGroups().subscribe(res => {
      this.priceGroups = res.body;
      this.priceGroups.map(e => {
        e.fullName = `${e.name} - ${e.description}`;
      }); //Add
      this.priceGroupLoading = false;
    })

  }

  editUser(user: User, createUserModal) {
    let groupIdsList = user.groups.map(item => {
      return item.id;
    });
    let priceGroupIdsList = user.priceGroups.map(item => {
      return item.id;
    });

    // @ts-ignore
    let person:IPerson = user.person
    this.createUserForm.patchValue({
      id: user.id,
      userId: user.id,
      personId: person.id,
      groupIds: groupIdsList,
      priceGroupIds : priceGroupIdsList,
      dateOfBirth: this.jalaliDateService.convertToJalali(new Date(person.dateOfBirth)),
      genderEnum: person.gender,
      email: person.email,
      cellPhone: person.cellPhone,
      phoneNumber: person.phoneNumber,
      city: person.city,
      address: person.address,
      description: person.description,
      password: ''
    })

    this.modalService.open(createUserModal, this.ngbModalOptions);
  }
  changeSelectPerson($event: any) {
    console.log($event);
    document.getElementById('groupIds').click();
  }
}

