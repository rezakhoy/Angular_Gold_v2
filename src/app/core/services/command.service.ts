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
  getCommand(id: number): Observable<HttpResponse<ICommand>> {
    return this.http.get<any>(`${API_URL}command/`+id, {  observe: 'response' });
  }
  getCommandChildren(): Observable<HttpResponse<ICommandChild[]>> {
    return this.http.get<any>(`${API_URL}get-command-children`, {  observe: 'response' });
  }
  getCommandChildrenUncleared(): Observable<HttpResponse<ICommandChild[]>> {
    return this.http.get<any>(`${API_URL}get-command-children-uncleared`, {  observe: 'response' });
  }
  public createPayCommand(command): any {
    return this.http.post(`${API_URL}create-pay-command`, command);
  }
  public createReceiveCommand(command): any {
    return this.http.post(`${API_URL}create-receive-command`, command);
  }

  public createCommandChild(command): any {
    return this.http.post(`${API_URL}create-command-child`, command);
  }
  public createPayInfo(payInfo){
    console.log("befor send pay info ", payInfo);
    return this.http.post(`${API_URL}send-pay-info`, payInfo ,{
      reportProgress: true,
        observe: 'events',
    });

  }
  public confirmPayInfo(id): any {
    return this.http.post(`${API_URL}confirm-pay-info/`+id , id);
  }

  public updateCommandChild(commandChild): any {
    return this.http.put(`${API_URL}update-command-child` , commandChild);
  }
  public deleteCommandChild(id): any {
    return this.http.delete(`${API_URL}delete-command-child/`+ id );
  }
  public deletePayInformation(id): any {
    return this.http.delete(`${API_URL}delete-pay-information/`+ id );
  }
}

