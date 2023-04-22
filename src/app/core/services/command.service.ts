import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';
import {Observable} from "rxjs";
import {IPerson} from "../models/person.models";
import {ICommand} from "../models/command.models";


@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private http: HttpClient ) { }

  getAllCommand(): Observable<HttpResponse<ICommand[]>> {
    return this.http.get<any>(`${API_URL}commands`, {  observe: 'response' });
  }

  public createPayCommand(command): any {
    return this.http.post(`${API_URL}create-pay-command`, command);
  }
  public createReceiveCommand(command): any {
    return this.http.post(`${API_URL}create-receive-command`, command);
  }

}

