import {Injectable, OnInit} from '@angular/core';
import {IUser} from "../models/auth.models";
import {Subject} from "rxjs";
import {IPrices} from "../models/price.models";
import {API_URL} from "../../../environments/environment";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {AuthenticationService} from "./auth.service";
import {IOrder} from "../models/order.models";
import {PermissionService} from "./permission.service";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public stompClient = null;
  public  disabled = true;
  user: IUser;
  isConnect: Subject<boolean> = new Subject();
  price: Subject<IPrices[]> = new Subject();
  orders: Subject<IOrder[]> = new Subject();

  constructor(public authService: AuthenticationService, private permissionService: PermissionService,) {
    this.isConnect.next(false);
    authService.getUser().subscribe(user => {
      this.user = user.body;
      const roles = user.body.groups.map(function(a) {return a.name;});
      this.permissionService.seRole(roles)
    });


  }

  private setConnected(connected: boolean) {
   if (connected === true){
     this.isConnect.next(true)
   }else {
     this.isConnect.next(false)
   }
    this.disabled = !connected;
  }

  public connect() {
    const price = this.price;
    const order = this.orders;
    let user = this.user;
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient = Stomp.Stomp.over(function () {
      return new SockJS(`${API_URL}websocket`);
    });

    this.stompClient.reconnect_delay = 5000;

    // tslint:disable-next-line:variable-name
    const _this = this;
    const prices = [];
    const orders = [];

    function managePrices(body) {

      if (prices.length === 0) {
        prices.push(body);
      } else {
        const mainObjectIndex = prices.findIndex((mainObject) => mainObject.priceGroupId === body.priceGroupId);
        if (mainObjectIndex !== -1) {
          prices[mainObjectIndex] = body;
        } else {
          prices.push(body);
        }
      }
      price.next(prices);
    }

    function manageOrder(body) {
      if (orders.length === 0) {
        orders.push(body);
      } else {
        const mainObjectIndex = orders.findIndex((mainObject) => mainObject.id === body.id);
        if (mainObjectIndex !== -1) {
          orders[mainObjectIndex] = body;
        } else {
          orders.push(body);
        }
      }
      order.next(orders);
    }

    function callUser() {
      _this.authService.getUser().subscribe(res => {
        user = res.body;
        res.body.priceGroups.forEach(group => {
          // tslint:disable-next-line:only-arrow-functions
          _this.stompClient.subscribe('/gold/price/' + group.id, function (alert) {
            managePrices(JSON.parse(alert.body));
          });
        });
        if (_this.permissionService.hasPermission('admin')|| _this.permissionService.hasPermission('acc')){
          _this.stompClient.subscribe('/gold/order', function (alert) {
            manageOrder(JSON.parse(alert.body))
          });
        }else {
          _this.stompClient.subscribe('/gold/my-order/' + user.id, function (alert) {
            manageOrder(JSON.parse(alert.body))
          });
        }
      })
    }

    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({Authorization: localStorage.getItem('authorization')}, function (frame) {

      _this.setConnected(true);
      if (user) {
        if (_this.permissionService.hasPermission('admin')|| _this.permissionService.hasPermission('acc')){

        _this.stompClient.subscribe('/gold/order', function (alert) {
          manageOrder(JSON.parse(alert.body))
        });
        }else {
          _this.stompClient.subscribe('/gold/my-order/' + user.id, function (alert) {
            manageOrder(JSON.parse(alert.body))
          });
        }
        user.priceGroups.forEach(group => {
          // tslint:disable-next-line:only-arrow-functions
          _this.stompClient.subscribe('/gold/price/' + group.id, function (alert) {
            managePrices(JSON.parse(alert.body));
          });
        });
      } else {
        callUser();
      }
    });


  }



  public setPrice(price) {
    console.log(price);
    this.stompClient.send(
      '/app/set-price',
      {},
      JSON.stringify({
        'price': price,
        'baseProductId': 1
      })
    );
  }

  public sendOrder(order) {
    this.stompClient.send(
      '/app/send-order-request',
      {},
      order,
    )
  }
  public orderToConfirm(order) {
    this.stompClient.send(
      '/app/send-order-confirm',
      {},
      JSON.stringify(order),
    )
  }
  public orderToUnconfirm(order) {
    this.stompClient.send(
      '/app/send-order-unconfirm',
      {},
      JSON.stringify(order),
    )
  }
  public changeSellStatus(status: boolean) {
    if(status){
      this.stompClient.send(
        '/app/active-sell',
        {},
      )
    }else {
      this.stompClient.send(
        '/app/deactive-sell',
        {},
      )
    }

  }

  public changeBuyStatus(status: boolean) {
    if(status){
      this.stompClient.send(
        '/app/active-buy',
        {},
      )
    }else {
      this.stompClient.send(
        '/app/deactive-buy',
        {},
      )
    }

  }

}
