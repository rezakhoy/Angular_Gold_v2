import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

/**
 * Contacts user-list component
 */
export class PriceGroupComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  groupForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    limit : [null, [Validators.min(0), Validators.required]],
    difference: [null, Validators.required],
    gap: [null, Validators.required]
  });
  constructor( private fb: FormBuilder,  private modalService: NgbModal,) { }
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };
  ngOnInit() {
  }
  groupModal(cgf) {
    this.modalService.open(cgf, this.ngbModalOptions);
    document.getElementById('name').focus();
  }
  saveGroup() {
    const group = this.groupForm.value;
    // this.groupService.createGroup(group).subscribe(res => {
    //   console.log(res);
    // });
    this.groupForm.reset();
  }
}
