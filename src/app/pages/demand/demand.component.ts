import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdvancedService } from './advanced.service';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../core/services/user.service";
import {IPerson} from "../../core/models/person.models";
import {IPermission} from "../../core/models/permission.models";
import {IPriceGroup} from "../../core/models/price-group.models";
import { PriceGroupService} from "../../core/services/price-group.service";
import {IGroup} from "../../core/models/group.models";
import {JalaliDateCalculatorService} from "ngx-persian";
import {AuthenticationService} from "../../core/services/auth.service";
import {AdvancedSortableDirectiveUsers, SortEvent} from "../users/advanced-sortable.directive";
import {Demand} from "../../core/models/demand.models";

@Component({
  selector: 'app-advancedtable',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class DemandComponent implements OnInit {

  public selected: any;
  tables$: Observable<Demand[]>;
  total$: Observable<number>;
  editableTable: any;
  personsLoading = false;
  groupsLoading = false;
  permissionsLoading = false;
  priceGroupLoading = false;
  permissions: IPermission[];
  priceGroups: IPriceGroup[];

  @ViewChildren(AdvancedSortableDirectiveUsers) headers: QueryList<AdvancedSortableDirectiveUsers>;
  public isCollapsed = true;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };

  // persons: IPerson[];
  // groups: IGroup[];


  // createUserForm = this.fb.group({
  //   personId: [null, Validators.required],
  //   groupIds: [null, Validators.required],
  //   priceGroupIds :[],
  //   dateOfBirth: [null, Validators.required],
  //   genderEnum: [null, Validators.required],
  //   email: [null, Validators.required],
  //   cellPhone: [null, Validators.required],
  //   phoneNumber: [],
  //   address: [],
  //   description: [],
  //   password: [null, Validators.required],
  //   password1: [null, Validators.required],
  // });



  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private userService: UserService,
              private authService: AuthenticationService,
              private priceGroupService: PriceGroupService,
              private jalaliDateService: JalaliDateCalculatorService,
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    // this.loadPersons()
    //
    // this.loadPermissionGroups()
    // this.loadPriceGroups()
    this.service.tables$.subscribe(res => {
      this._fetchData();
    })

  }
  // private loadPersons() {
  //   this.personsLoading = true;
  //   this.userService.getAllPersons().subscribe(res => {
  //     this.persons = res.body;
  //     console.log(this.persons);
  //     this.personsLoading = false;
  //   })
  // }



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
    console.log(column);
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
    document.getElementById('name').focus();
  }

  // saveUser() {
  //   let date = this.createUserForm.get('dateOfBirth').value;
  //   let y = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getFullYear()
  //   let m = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getMonth()
  //   let d = this.jalaliDateService.convertToGeorgian(date.year, date.month, date.day).getDay()
  //   console.log(this.createUserForm.value);
  //   let body = this.createUserForm.value;
  //   body.dateOfBirth = y+'-'+ m+'-'+d
  //   this.userService.register(body).subscribe(res => {
  //     console.log(res);
  //   })
  // }

  // private loadPermissionGroups() {
  //   this.groupsLoading = true;
  //   this.authService.getPermissions().subscribe(res => {
  //     this.groups = res.body;
  //     this.groupsLoading = false;
  //   })
  //
  // }
  //
  // private loadPriceGroups() {
  //   this.priceGroupLoading = true;
  //   this.priceGroupService.getAllGroups().subscribe(res => {
  //     this.priceGroups = res.body;
  //     this.priceGroupLoading = false;
  //   })
  //
  // }
}
