import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import {FormBuilder, Validators} from "@angular/forms";
import {ISetPrices} from "../../../core/models/set-price.models";
import {IPrices} from "../../../core/models/price.models";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  isVisible: string;
  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;
  setPrice: ISetPrices;
  isActive: string;
  mas: IPrices[];

  setPriceForm = this.fb.group({
    ab: [],
    as: [],
    price: [null, [Validators.min(0)]],
  });
  orderForm = this.fb.group({
    id: [],
    transaction_type: [null],
    quantity: [null, [Validators.min(0),]],
    fee: [null, Validators.required],
    price: [null, Validators.required],
    status: [null, Validators.required],
    comment: [null, Validators.required]
  });
  goldOrderForm = this.fb.group({
    id: [],
    amount: [null, [Validators.min(0)]],
    to: [null, Validators.required],
    near: [null, Validators.required],
    comment: [null, Validators.required]
  });

  @ViewChild('content') content;
  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private configService: ConfigService,
              private ws: WebsocketService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.ws.price.subscribe(msg => {
      this.mas = msg;
      console.log('mass log', this.mas);
    });
    this.setPriceForm.patchValue({
      ab: false,
      as: false,
      price: 9500000,
    });
    let setPrice = {
      ab: false,
      as: true,
      price: 9500000
    }
    this.setPrice = setPrice;

    this.ws.connect();

    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');

     this.isVisible = attribute;
     const vertical = document.getElementById('layout-vertical');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (attribute == 'horizontal') {
       const horizontal = document.getElementById('layout-horizontal');
       if (horizontal != null) {
         horizontal.setAttribute('checked', 'true');
         console.log(horizontal);
       }
     }

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  ngAfterViewInit() {
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }
  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
   changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
  setlimit() {
    this.ws.setPrice(this.setPriceForm.get('price').value);
  }
  makeOrder(form, price, s) {
    this.orderForm.patchValue({
      transaction_type: s,
      comment: '',
      status: 'w',
      fee: price,
      price: '',
      quantity: ''
    });
    this.modalService.open(form, this.ngbModalOptions);
    document.getElementById('quantity').focus();
  }

  saveGoldOrder() {
    console.log(this.goldOrderForm.value);
  }
  culcPrice() {
    console.log("culc price ab");
    const price = ((this.orderForm.get('fee').value / 4.3317) * this.orderForm.get('quantity').value).toFixed();
    this.orderForm.patchValue({
      price
    });
  }


  culcQuantity() {
    if (this.orderForm.get('transaction_type').value === 's') {
      if (this.orderForm.get('coin_type').value === 'a') {
        const quantity = this.orderForm.get('price').value / this.mas[0].buy * 4.3317;
        this.orderForm.patchValue({
          quantity
        });
      }
    }
  }
}
