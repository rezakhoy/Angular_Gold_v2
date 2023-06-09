import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';
import {IAdminBalance, IMyBalance, MyBalance} from "../models/balance.models";
import {Observable} from "rxjs";
import {MyTransaction} from "../models/customer-transction.models";
import {Demand, IAdminDemand} from "../models/demand.models";
import {IAdminBanks, IBank} from "../models/bank.models";
import {ISekeh} from "../models/sekeh.models";


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient ) { }



  myBalance(): Observable<HttpResponse<IMyBalance>> {
    return this.http.get<any>(`${API_URL}my-balance`, {  observe: 'response' });
  }

  myTransaction(): Observable<HttpResponse<MyTransaction[]>> {
    return this.http.get<any>(`${API_URL}my-transaction`, {  observe: 'response' });
  }
  getTransactions(page: number, size: number, sort: string): Observable<HttpResponse<MyTransaction[]>>{

    return this.http.get<any>(`${API_URL}my-transaction?page=${page-1}&size=${size}&sort=${sort}`, {  observe: 'response' });
  }
  adminTrades(startDate:string, endDate:string){
   const body = {
      "startDate": startDate ,
      "endDate": endDate
    }
    return this.http.post<any>(`${API_URL}admin-trade`, body);
  }

  // adminDemandList(): Observable<HttpResponse<Demand[]>> {
  //   return this.http.get<any>(`${API_URL}admin-demands-list`, {  observe: 'response' });
  // }
  adminDemandList(page: number, size: number, sort: string): Observable<HttpResponse<MyTransaction[]>>{
    return this.http.get<any>(`${API_URL}admin-demands-list?page=${page-1}&size=${size}&sort=${sort}`, {  observe: 'response' });
  }
  adminDemandsListToday(page: number, size: number, sort: string): Observable<HttpResponse<MyTransaction[]>>{
    return this.http.get<any>(`${API_URL}admin-demands-list-today?page=${page-1}&size=${size}&sort=${sort}`, {  observe: 'response' });
  }
  getRiskList(): Observable<HttpResponse<Demand[]>> {
    return this.http.get<any>(`${API_URL}get-risk-list`, {  observe: 'response' });
  }

  adminDemand(): Observable<HttpResponse<IAdminDemand>> {
    return this.http.get<any>(`${API_URL}admin-demands`, {  observe: 'response' });
  }

  adminSekeh(): Observable<HttpResponse<ISekeh[]>> {
    return this.http.get<any>(`${API_URL}admin-sekeh`, {  observe: 'response' });
  }

  bankBalanceList(): Observable<HttpResponse<IBank[]>> {
    return this.http.get<any>(`${API_URL}admin-banks-list`, {  observe: 'response' });
  }
  bankBalance(): Observable<HttpResponse<IAdminBanks>> {
    return this.http.get<any>(`${API_URL}admin-banks`, {  observe: 'response' });
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

