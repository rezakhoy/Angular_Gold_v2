import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';
import {IPriceGroup} from "../models/price-group.models";


@Injectable({
  providedIn: 'root'
})
export class PriceGroupService {

  constructor(private http: HttpClient ) { }



  getAllGroups(): any {
    return this.http.get<any>(`${API_URL}price-groups`, {  observe: 'response' });
  }
   createGroup(body): any {
    console.log('gggg', body);
     return this.http.post(`${API_URL}price-groups`, body);
    // return this.http.post(`${API_URL}create-price-group`, {  observe: 'response' , body});
  }

}

