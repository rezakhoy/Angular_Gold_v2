import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import {API_URL} from "../../../environments/environment";
import {ISystemSetting} from "../models/setting.models";
import {IUser} from "../models/auth.models";

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  URL = 'assets/dashboard.json';

  constructor(private http: HttpClient) { }
  getConfig() : Observable<any> {
    return this.http.get<any>(`${this.URL}`)
  }

  systemSetting(): Observable<HttpResponse<ISystemSetting>> {
    return this.http.get<any>(`${API_URL}setting`, {  observe: 'response' });
  }
  resetPassword(body: ISystemSetting) {
    return this.http.put<any>(`${API_URL}set-setting`, body);
  }
}
