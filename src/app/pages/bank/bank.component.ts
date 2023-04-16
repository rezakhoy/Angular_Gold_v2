import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {PriceGroupService} from "../../core/services/price-group.service";
import {IGroup} from "../../core/models/group.models";
import {IPriceGroup} from "../../core/models/price-group.models";
import {ReportsService} from "../../core/services/reports.service";
import {IAdminBanks, IBank} from "../../core/models/bank.models";

@Component({
  selector: 'app-userlist',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})

/**
 * Contacts user-list component
 */
export class BankComponent implements OnInit {

 banks: IBank[];
 bankBalance: IAdminBanks;
  constructor( private reportService: ReportsService) { }



  ngOnInit() {
    this.reportService.bankBalanceList().subscribe(res => {
      this.banks = res.body;
    })
    this.reportService.bankBalance().subscribe(res =>{
      this.bankBalance = res.body;
      console.log(this.bankBalance);
    })
  }





}
