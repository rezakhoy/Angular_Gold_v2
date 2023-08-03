import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient ) { }

  sendDemandsMessage(body){
    return this.http.post<any>(`${API_URL}send-demands-message`, body);
  }


}

