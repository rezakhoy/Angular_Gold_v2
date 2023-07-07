import { Injectable, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { BehaviorSubject, of, Subscription, Subject, Observable, NextObserver } from 'rxjs';



import * as Stomp from '@stomp/stompjs';

import * as SockJS from 'sockjs-client';
import {API_URL} from "../../../environments/environment";

@Injectable()

export class WebsocketService1 {



  constructor() { }

  receivedMessages;

  wssubscription: Subscription

  // urlCtrl = new FormControl('http://echo.websocket.org');

  // wss://echo.websocket.org

  sendCtrl = new FormControl('{"moi":"hello"}');

  isOpen = false;

  wsConnectionTimeout = 2000

  wsConnectionRetriesNumber = 4

  retryNumber = 0;

  wsAlertSubscribingChannnel = "/gold/price/7";

  wsAlertSendingChannel = "/app/notify/alert";

  socketClient: any = null;

  tokenheader = {Authorization: localStorage.getItem('authorization')}



  ngOnInit() { }





  private configureSocketClient(client) {

    // client.debug = false;
    client.heartbeat.debug =false;

    client.heartbeat.outgoing = 2000;

    client.heartbeat.incoming = 0;

    client.reconnect_delay = 5000

    return client;

  }



  private initSocket(url) {

    console.log("Initialize WebSocket Connection");

    let ws = new SockJS(url);

    this.socketClient = Stomp.Stomp.over(ws);

    this.socketClient = this.configureSocketClient(this.socketClient)

  };



  openConnection(url) {

    this.close();

    this.initSocket(url)

    this.socketClient.connect(this.tokenheader, (frame) => {

        this.isOpen = true;

        console.log("Connexion started");

        this.getMessages()
        this.socketClient.reconnect_delay = 2000;

      },

      this.errorCallBack

    );
   this.retryConnection()
  }



  errorCallBack(error) {

    this.isOpen = false;

    console.log("Connexion failure" + error);

    console.log("errorCallBack -> " + error)

    setTimeout(() => {

      // this.connect();

    }, 5000);

  }



  getMessages() {

    this.wssubscription = this.socketClient.subscribe(this.wsAlertSubscribingChannnel,

      (message) => {

        this.isOpen = true

        console.log("Connexion sucess");

        console.log("Message Recieved from Server :: " + message);
        console.log("Message Recieved from Server :: " + message.body);

        this.receivedMessages = message.body;

      }, this.tokenheader);

  }



  retryConnection(){

    setTimeout(() => {

      console.log(this.socketClient._stompHandler._webSocket.readyState);

      // console.warn("Retry connection: " + this.retryNumber +" at "+ new Date());
      //
      // this.openConnection(`${API_URL}websocket`)
      //
      // console.warn("Number of attempt : " + this.retryNumber + +" at "+ new Date());

    }, this.wsConnectionTimeout);

  }



  // on error, schedule a reconnection attempt





  close() {

    if (this.socketClient !== null) {

      this.socketClient.disconnect();

      this.wssubscription.unsubscribe();

      this.socketClient = null

      this.isOpen = false;

    }



    console.log("Disconnected");

  }



  send(message) {

    this.isOpen = true

    console.log("sending messages");

    this.socketClient.send(this.wsAlertSendingChannel, this.tokenheader, message);

  }



  // onMessageReceived(message) {

  //     console.log("Message Recieved from Server :: " + message);

  //     //this.appComponent.handleMessage(JSON.stringify(message.body));

  // }







}
