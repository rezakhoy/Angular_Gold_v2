import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {PriceGroupService} from "../../core/services/price-group.service";
import {IPriceGroup} from "../../core/models/price-group.models";

import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-userlist',
  templateUrl: './price-group.component.html',
  styleUrls: ['./price-group.component.scss']
})

/**
 * Contacts user-list component
 */
export class PriceGroupComponent implements OnInit {

  groupForm = this.fb.group({
    id: [],
    name: [null, Validators.required],
    limit : [null, [Validators.min(0), Validators.required]],
    difference: [null, Validators.required],
    description: null,
    gap: [null, Validators.required]
  });
  groups: IPriceGroup[];
  constructor( private fb: FormBuilder,
               private titleService: Title,
               private modalService: NgbModal,
               private priceGroupService: PriceGroupService) { }

  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };

  ngOnInit() {
    this.titleService.setTitle("گروههای قیمتی")
    this.priceGroupService.getAllGroups().subscribe(res => {
      this.groups = res.body;
      console.log(this.groups);
    })
  }

  groupModal(cgf) {
    this.modalService.open(cgf, this.ngbModalOptions);
    document.getElementById('name').focus();
  }

  saveGroup() {
    const body = this.groupForm.value;
    body.sell = true;
    body.buy = false;
    this.priceGroupService.createGroup(body).subscribe(res => {
      this.priceGroupService.getAllGroups().subscribe(res => {
        this.groups = res.body;
      });
    });

  }

  editPriceGroup(group: IPriceGroup, createGroupForm) {
    this.groupForm.patchValue({
      id: group.id,
      name: group.name,
      description: group.description,
      limit : group.limit,
      difference: group.difference,
      gap: group.gap
    })
    this.modalService.open(createGroupForm, this.ngbModalOptions);
  }
}
