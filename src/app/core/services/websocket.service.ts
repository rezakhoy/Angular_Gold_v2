import {Injectable, OnInit} from '@angular/core';
import {IUser} from "../models/auth.models";
import {Subject} from "rxjs";
import {IPrices} from "../models/price.models";
import {API_URL} from "../../../environments/environment";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {AuthenticationService} from "./auth.service";
import {parseJson} from "@angular/cli/utilities/json-file";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService  {

  private stompClient = null;
  disabled = true;
  user: IUser;

  price: Subject<IPrices[]> = new Subject();

  constructor(public authService: AuthenticationService) {
    // console.log("runconstractor in ws");
    // authService.getUser().subscribe(user => {
    //   console.log('--------',user);
    //   this.user = user.body;
    // });

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
      if (prices.length === 0) {
        prices.push(body);
      } else {
        const mainObjectIndex = prices.findIndex((mainObject) => mainObject.groupId === body.groupId);
        if (mainObjectIndex !== -1) {
          prices[mainObjectIndex] = body;
        } else {
          prices.push(body);
        }
      }
      price.next(prices);
    }
    function callUser() {

      user = parseJson(localStorage.getItem('currentUser'));
      user.groups.forEach(group => {
        // tslint:disable-next-line:only-arrow-functions
        _this.stompClient.subscribe('/gold/price/' + group.id, function(alert) {
          managePrices(JSON.parse(alert.body));
        });
      });
    }
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({Authorization: localStorage.getItem('authorization')}, function(frame) {

      _this.setConnected(true);
      if (user) {
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
