import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';
import {IAdminBalance, IMyBalance, MyBalance} from "../models/balance.models";
import {Observable} from "rxjs";
import {MyTransaction} from "../models/customer-transction.models";
import {Demand} from "../models/demand.models";


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient ) { }



  myBalance(): Observable<HttpResponse<MyBalance>> {
    return this.http.get<any>(`${API_URL}my-balance`, {  observe: 'response' });
  }

  myTransaction(): Observable<HttpResponse<MyTransaction[]>> {
    return this.http.get<any>(`${API_URL}my-transaction`, {  observe: 'response' });
  }

  adminDemandList(): Observable<HttpResponse<Demand[]>> {
    return this.http.get<any>(`${API_URL}admin-demands-list`, {  observe: 'response' });
  }

  adminBalance(): Observable<HttpResponse<IAdminBalance>> {
    return this.http.get<any>(`${API_URL}admin-balance`, {  observe: 'response' });
  }
  public createGroup(group): any {
    console.log("im in create grope service methode");
    console.log('gggg', group);
    // return this.http.post<IGroup>(`${API_URL}auth/create-group`, {  observe: 'response' , group});
  }

}

