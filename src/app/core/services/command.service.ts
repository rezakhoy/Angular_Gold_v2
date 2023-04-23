import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';
import {Observable} from "rxjs";
import {IPerson} from "../models/person.models";
import {ICommand} from "../models/command.models";
import {ICommandChild} from "../models/command-child.models";


@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private http: HttpClient ) { }

  getAllCommand(): Observable<HttpResponse<ICommand[]>> {
    return this.http.get<any>(`${API_URL}commands`, {  observe: 'response' });
  }
  getCommandChild(id: number): Observable<HttpResponse<ICommandChild[]>> {
    return this.http.get<any>(`${API_URL}get-command-children/`+id, {  observe: 'response' });
  }
  public createPayCommand(command): any {
    return this.http.post(`${API_URL}create-pay-command`, command);
  }
  public createReceiveCommand(command): any {
    return this.http.post(`${API_URL}create-receive-command`, command);
  }
  public createPayCommandChild(command): any {
    return this.http.post(`${API_URL}create-pay-command-child`, command);
  }
  public createReceiveCommandChild(command): any {
    return this.http.post(`${API_URL}create-receive-command-child`, command);
  }

}

