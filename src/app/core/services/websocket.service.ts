import {Injectable, OnInit} from '@angular/core';
import {IUser} from "../models/auth.models";
import {Subject} from "rxjs";
import {IPrices} from "../models/price.models";
import {API_URL} from "../../../environments/environment";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {AuthenticationService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService  {

  private stompClient = null;
  disabled = true;
  user: IUser;

  price: Subject<IPrices[]> = new Subject();

  constructor(public authService: AuthenticationService) {
    authService.getUser().subscribe(user => {
      this.user = user.body;
    });

  }

  private setConnected(connected: boolean) {
    this.disabled = !connected;
  }

  public connect() {
    const price = this.price;
    let user = this.user;
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient = Stomp.Stomp.over(function() {
      return new SockJS(`${API_URL}websocket`);
    });
    // @ts-ignore
    this.stompClient.reconnect_delay = 5000;

    // tslint:disable-next-line:variable-name
    const _this = this;
    const prices = [];

    function managePrices(body) {
      console.log("in maage price", body);
      if (prices.length === 0) {
        console.log('prisex for push', prices);
        prices.push(body);

      } else {
        const mainObjectIndex = prices.findIndex((mainObject) => mainObject.priceGroupId === body.priceGroupId);
        if (mainObjectIndex !== -1) {
          prices[mainObjectIndex] = body;
        } else {
          console.log("im in push");
          prices.push(body);
        }
      }
      price.next(prices);
    }
    function callUser() {
      _this.authService.getUser().subscribe(res => {
        user = res.body;
        res.body.priceGroups.forEach(group => {
          // tslint:disable-next-line:only-arrow-functions
          _this.stompClient.subscribe('/gold/price/' + group.id, function(alert) {
            managePrices(JSON.parse(alert.body));
          });
        });
      })
    }
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({Authorization: localStorage.getItem('authorization')}, function(frame) {

      _this.setConnected(true);
      if (user) {
        console.log("++++++++++++++++++",  user);
        console.log('------------------', user.priceGroups);
        user.priceGroups.forEach(group => {
          // tslint:disable-next-line:only-arrow-functions
          _this.stompClient.subscribe('/gold/price/' + group.id, function(alert) {
            managePrices(JSON.parse(alert.body));
          });
        });
      }else {
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


}
