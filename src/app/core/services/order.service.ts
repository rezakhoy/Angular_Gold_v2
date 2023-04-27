import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { IUser } from '../models/auth.models';
import {Observable} from "rxjs";
import {API_URL} from "../../../environments/environment";
import {IPerson} from "../models/person.models";
import {MyBalance} from "../models/balance.models";
import {IOrder} from "../models/order.models";

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

  getOrderToday(): Observable<HttpResponse<IOrder[]>> {
    return this.http.get<any>(`${API_URL}order/today`, {  observe: 'response' });
  }
}
