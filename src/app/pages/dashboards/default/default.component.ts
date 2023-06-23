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
import {IPerson} from "../../../core/models/person.models";
import {UserService} from "../../../core/services/user.service";
import {PermissionService} from "../../../core/services/permission.service";
import {CommandsService} from "../../../core/services/command.service";
import {ICommandChild} from "../../../core/models/command-child.models";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {DeviceDetectorService} from "ngx-device-detector";


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
  orders: IOrder[] = [];
  userCommandUnclearedList: ICommandChild[];
  requestedOrders: IOrder[] = [];
  personsLoading = false;
  preview: string;
  persons: IPerson[];
  rejectedOrder: IOrder;
  selectedPrice: IPrices;
  myBalance = new MyBalance();
  loadingMyBalance = true;
  adminBalance = new AdminBalance()
  setPriceForm = this.fb.group({
    ab: [],
    as: [],
    price: [null, [Validators.min(0)]],
  });
  orderForm = this.fb.group({
    id: [],
    transaction_type: [null],
    personId: [null],
    quantity: [null, [Validators.min(0),]],
    fee: [null, Validators.required],
    priceGroupId: [],
    price: [null, Validators.required],
    userId: [null],
    status: [],
    comment: [null]
  });
  goldRemitForm = this.fb.group({
    id: [],
    amount: [null, [Validators.min(0)]],
    to: [null, Validators.required],
    near: [null, Validators.required],
    comment: [null, Validators.required]
  });

  payInfoForm = this.fb.group({
    payImage:[null],
    description:[],
    amount: [null, Validators.required],
    commandChildId: [null, Validators.required],
    receiptNumber: [null, Validators.required],
  });
  @ViewChild('content') content;

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private configService: ConfigService,
              private titleService: Title,
              private reportService: ReportsService,
              private ws: WebsocketService,
              private toastr: ToastrService,
              private userService: UserService,
              public deviceService: DeviceDetectorService,
              private orderService: OrderService,
              private authService: AuthenticationService,
              private auth: AuthenticationService,
              private commandService: CommandsService,
              private permissionService: PermissionService,
              private eventService: EventService) {
    permissionService.init()
  }

  ngOnInit() {
    this.titleService.setTitle("داشبورد")

    this.ws.connect();

    if (this.permissionService.hasPermission('user')){
      this.commandService.getCommandChildrenUncleared().subscribe(res =>{
        this.userCommandUnclearedList = res.body;
      })
    }

    this.getAdminBalance();

    this.reportService.myBalance().subscribe(res => {
      this.myBalance = res.body;
      this.loadingMyBalance = false;
    });
    this.ws.price.subscribe(msg => {
      this.mas = msg;
    });

    this.ws.orders.subscribe(ord => {
      this.manageOrders(ord)
    });

    this.auth.getLastPriceList().subscribe(res => {
      this.mas = res.body;
      this.setPriceForm.patchValue({
        price: this.mas[0].base,
      });
    })

    this.orderService.getOrderToday().subscribe(res => {
      this.manageOrders(res.body)
    })
    this.loadPersons()
  }

  public getAdminBalance(){
  if (this.permissionService.hasPermission('admin') || this.permissionService.hasPermission('acc')){
    this.reportService.adminBalance().subscribe(res => {
      this.adminBalance = res.body;
    });
  }
}
  private loadPersons() {
    this.personsLoading = true;
    this.userService.getAllPersons().subscribe(res => {
      this.persons = res.body;
      this.personsLoading = false;
    })
  }

  manageOrders(ords) {
    var self = this;
    ords.forEach(function (ord) {
      if (ord.status === 'REQUEST'){
        let audio = new Audio();
        audio.src = "../../../assets/Notification.wav";
        audio.load();
        audio.play();
      }
      if (self.orders.length === 0) {

        self.orders.push(ord);
      } else {
        const mainObjectIndex = self.orders.findIndex((mainObject) => mainObject.id === ord.id);
        if (mainObjectIndex !== -1) {
          // @ts-ignore
          if (self.orders[mainObjectIndex].status === 'REQUEST' && ord.status === 'CONFIRM') {

            self.toastr.success(` درخواست ${ord.type === 'SELL' ? 'فروش' : 'خرید'} شما به مقدار ${ord.amount} گرم  تایید و ثبت گردید`)
            self.reportService.myBalance().subscribe(res => {
              self.myBalance = res.body;
            });
          }
          // @ts-ignore
          if (self.orders[mainObjectIndex].status === 'REQUEST' && ord.status === 'UNCONFIRM') {
            // console.log(ord);
            self.toastr.error(` درخواست ${ord.type === 'SELL' ? 'فروش' : 'خرید'} شما به مقدار ${ord.amount} گرم به دلیل  ${ord.description} تایید نشد `)
          }
          self.orders[mainObjectIndex] = ord;

        } else {



          self.orders.push(ord);
          if (self.orders.length > 5) {
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
    // console.log("-------gid----------", gid);
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
      // console.log('-----------1-------------', this.orderForm.value);
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

    }

    this.ws.price.subscribe(res => {
      let prices = res;
      let obj = prices.findIndex(x => x.priceGroupId === gid)
      if (s === 'SELL') {
        this.orderForm.patchValue({
          fee: prices[obj].sell,
          priceGroupId: gid
        });

      }
      if (s === 'BUY') {
        this.orderForm.patchValue({
          fee: prices[obj].buy,
          priceGroupId: gid
        });

      }


      this.culcPrice()
    })
    this.modalService.open(form, this.ngbModalOptions);
    document.getElementById('quantity').focus();
  }

  saveGoldOrder() {
    const order = JSON.stringify({
      'price': this.orderForm.get('fee').value,
      'type': this.orderForm.get('transaction_type').value,
      'amount': this.orderForm.get('quantity').value,
      'priceGroupId': this.orderForm.get('priceGroupId').value,
      'baseProductId': 1,
      'description': ""
    })

    this.ws.sendOrder(order);
  }


  saveAdminGoldOrder() {
    const order = JSON.stringify({
      'price': this.orderForm.get('fee').value,
      'type': this.orderForm.get('transaction_type').value,
      'amount': this.orderForm.get('quantity').value,
      'personId': this.orderForm.get('userId').value,
      'priceGroupId': this.orderForm.get('priceGroupId').value,
      'baseProductId': 1,
      'description': "ثبت تلفنی"
    })
    console.log(order);
    this.ws.sendOrder(order);
  }


  culcPrice() {
    const price = ((this.orderForm.get('fee').value / 4.3318) * this.orderForm.get('quantity').value).toFixed();
    this.orderForm.patchValue({
      price
    });
  }

  culcQuantity() {
    const quantity =( this.orderForm.get('price').value / this.orderForm.get('fee').value * 4.3318).toFixed(2);
    this.orderForm.patchValue({
      quantity
    });

  }
  makePayInfo(child, modal){

    this.payInfoForm.patchValue({
      commandChildId: child.id
    })
    this.modalService.open(modal, this.ngbModalOptions);
  }
  confirmOrder(order: IOrder) {
    order.description = this.rejectComment;
    this.ws.orderToConfirm(order)
    order.status = 'Waiting'
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

  CantRemitGold() {
    this.toastr.error("با توجه به مانده طلا امکان حواله وجود ندارد")
  }

  remitGold(remit) {
    this.modalService.open(remit);
  }

  changeSelectPerson($event: any) {

    document.getElementById('amount').focus();

  }

  sellStatusChange(status) {
    this.ws.changeSellStatus(status.checked)
  }

  buyStatusChange(status) {
    this.ws.changeBuyStatus(status.checked)
  }


  minesPrice() {
    this.setPriceForm.patchValue({
      price: this.setPriceForm.get('price').value - 50000
    })
    this.ws.setPrice(this.setPriceForm.get('price').value);
  }

  plusPrice() {
    this.setPriceForm.patchValue({
      price: this.setPriceForm.get('price').value + 50000
    })
    this.ws.setPrice(this.setPriceForm.get('price').value);
  }

  checkLang(e: KeyboardEvent) {

    console.log(e.key);
    if(e.key === 'ی') {
      return 'ي'
    }
    let char = ['Backspace', ' ', 'Alt', 'Shift', 'Tab', 'Enter', 'ي']

    const mainObjectIndex = char.findIndex((mainObject) => mainObject === e.key);
    if (mainObjectIndex === -1) {
      if (! isPersian(e.key)) {
        this.toastr.error("لطفا فارسی تایپ نمایید")
      }
    }
  }


  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.payInfoForm.patchValue({
      payImage: file
    });
    this.payInfoForm.get('payImage').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    var formData: any = new FormData();
    const payInfo = {
      amount: this.payInfoForm.get('amount').value,
      description: this.payInfoForm.get('description').value,
      receiptNumber:this.payInfoForm.get('receiptNumber').value,
      commandChildId:this.payInfoForm.get('commandChildId').value,
    }
    // @ts-ignore
    formData.append('payInfo', JSON.stringify(payInfo) )
    formData.append('payImage',  this.payInfoForm.value.payImage)

    this.commandService.createPayInfo(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:

          break;
        case HttpEventType.Response:


          break;
      }
    })
  }
}


function isPersian(key){
  var p = /^[\u0600-\u06FF\s]+$/;
  return p.test(key) && key!=' ';
}
