import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
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
  permissions: IPermission[];
  priceGroups: IPriceGroup[];

  @ViewChildren(AdvancedSortableDirectiveUsers) headers: QueryList<AdvancedSortableDirectiveUsers>;
  public isCollapsed = true;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };

  persons: IPerson[];


  createUserForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    limit : [null, [Validators.min(0), Validators.required]],
    difference: [null, Validators.required],
    gap: [null, Validators.required]
  });


  constructor(public service: AdvancedService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private userService: UserService
              ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.loadPersons()

    this.service.tables$.subscribe(res => {
      this._fetchData();
    })

  }
  private loadPersons() {
    this.personsLoading = true;
    this.userService.getAllPersons().subscribe(res => {
      this.persons = res.body;
      console.log(this.persons);
      this.personsLoading = false;
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

  saveUser() {

  }
}
