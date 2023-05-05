import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {EventService} from '../../../core/services/event.service';
import {ConfigService} from '../../../core/services/config.service';
import {WebsocketService} from 'src/app/core/services/websocket.service';
import {FormBuilder, Validators} from "@angular/forms";
import {ISetPrices} from "../../../core/models/set-price.models";
import {IPrices} from "../../../core/models/price.models";
import {AuthenticationService} from "../../../core/services/auth.service";
import {ReportsService} from "../../../core/services/reports.service";
import {AdminBalance, IAdminBalance, IMyBalance, MyBalance} from "../../../core/models/balance.models";
import {IOrder} from "../../../core/models/order.models";
import {OrderService} from "../../../core/services/order.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";


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
  setPrice: ISetPrices;
  isActive: string;
  rejectComment: '';
  mas: IPrices[];
  orders:  IOrder[]= [];
  rejectedOrder : IOrder;
  selectedPrice: IPrices;
  myBalance = new MyBalance();
  adminBalance = new AdminBalance()
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
    priceGroupId: [null, Validators.required],
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
              private titleService: Title,
              private reportService: ReportsService,
              private ws: WebsocketService,
              private toastr: ToastrService,
              private orderService: OrderService,
              private auth: AuthenticationService,
              private eventService: EventService) {

  }

  ngOnInit() {
    this.titleService.setTitle("داشبورد")
    this.ws.connect();
    this.reportService.adminBalance().subscribe(res => {
      this.adminBalance = res.body;
    });
    this.reportService.myBalance().subscribe(res => {
      this.myBalance = res.body;
    });

    this.ws.price.subscribe(msg => {
      this.mas = msg;
      console.log(this.mas);
    });

    this.ws.orders.subscribe(ord => {
      console.log('ooooooooooooooooooooooooooo',ord);
      // this.orders = ord;
      this.manageOrders(ord)
    });
    this.setPriceForm.patchValue({
      ab: false,
      as: false,
      price: 112500000,
    });
    let setPrice = {
      ab: false,
      as: true,
      price: 9500000
    }
    this.setPrice = setPrice;


    this.auth.getLastPriceList().subscribe(res => {
      console.log(res.body);
      this.mas = res.body;
      console.log(this.mas);
      this.setPriceForm.patchValue({
        price: this.mas[0].base,
      });
    })

    this.orderService.getOrderToday().subscribe(res => {
      this.manageOrders(res.body)
    })
  }
  manageOrders(ords) {
    var self = this;
      ords.forEach(function (ord) {

          if (self.orders.length === 0) {
            self.orders.push(ord);
          } else {
            const mainObjectIndex = self.orders.findIndex((mainObject) => mainObject.id === ord.id);
            if (mainObjectIndex !== -1 ) {
              self.orders[mainObjectIndex] = ord;
            } else {
              self.orders.push(ord);
              if (self.orders.length>5){
                self.orders.shift()
              }
            }
          }
      })


  }
  ngAfterViewInit() {

  }

  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

  setlimit() {
    this.ws.setPrice(this.setPriceForm.get('price').value);
  }

  makeOrder(form, gid, s) {
    console.log("-------gid----------", gid);
    let obj = this.mas.findIndex(x => x.priceGroupId === gid)
    if (s === 'SELL') {
      this.orderForm.patchValue({
        transaction_type: s,
        priceGroupId: gid,
        comment: '',
        status: 'w',
        fee: this.mas[obj].sell,
        price: '',
        quantity: '',
        description: ''
      });
      console.log('-----------1-------------', this.orderForm.value);
    }

    if (s === 'BUY') {
      this.orderForm.patchValue({
        transaction_type: s,
        priceGroupId: gid,
        comment: '',
        status: 'w',
        fee: this.mas[obj].buy,
        price: '',
        quantity: ''
      });
      console.log('-----------2-------------', this.orderForm.value);
    }

    this.ws.price.subscribe(res => {
      let prices = res;
      let obj = prices.findIndex(x => x.priceGroupId === gid)
      if (s === 'SELL') {
        this.orderForm.patchValue({
          fee: prices[obj].sell,
          priceGroupId: gid
        });
        console.log('-----------3-------------', this.orderForm.value);
      }
      if (s === 'BUY') {
        this.orderForm.patchValue({
          fee: prices[obj].buy,
          priceGroupId: gid
        });
        console.log('-----------4-------------', this.orderForm.value);
      }


      this.culcPrice()
    })
    this.modalService.open(form, this.ngbModalOptions);
    document.getElementById('quantity').focus();
  }

  saveGoldOrder() {
    console.log(this.orderForm.value);
    const order = JSON.stringify({
      'price': this.orderForm.get('fee').value,
      'type': this.orderForm.get('transaction_type').value,
      'amount': this.orderForm.get('quantity').value,
      'priceGroupId': this.orderForm.get('priceGroupId').value,
      'baseProductId': 1,
      'description': "des"

    })
    console.log(order);
    this.ws.sendOrder(order);
  }

  culcPrice() {
    console.log("culc price ab");
    const price = ((this.orderForm.get('fee').value / 4.3317) * this.orderForm.get('quantity').value).toFixed();
    this.orderForm.patchValue({
      price
    });
  }


  culcQuantity() {
      const quantity = this.orderForm.get('price').value / this.orderForm.get('fee').value * 4.3317;
      this.orderForm.patchValue({
        quantity
      });

  }

  confirmOrder(order: IOrder) {
    order.description = this.rejectComment;
    this.ws.orderToConfirm(order)
  }

  rejectOrder(order: IOrder, reject) {
    this.rejectedOrder = order;
    this.modalService.open(reject);
  }
  unconfirmOrder(comment) {
    this.rejectedOrder.description = comment;
    this.ws.orderToUnconfirm(this.rejectedOrder)
    this.rejectComment = ''
  }
}
