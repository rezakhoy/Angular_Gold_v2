import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { IUser } from '../models/auth.models';
import {Observable} from "rxjs";
import {API_URL} from "../../../environments/environment";
import {IPerson} from "../models/person.models";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<IUser[]>(`${API_URL}auth/users`, {observe: 'response'});
    }

    register(body) {
        return this.http.post<IUser>(`${API_URL}auth/create-user`, body, {observe: 'response'});
    }
  updateUser(body) {
    return this.http.post<IUser>(`${API_URL}auth/update-user`, body, {observe: 'response'});
  }
  getAllPersons(): Observable<HttpResponse<IPerson[]>> {
    return this.http.get<any>(`${API_URL}persons`, {  observe: 'response' });
  }

  updatePerson(body: any): Observable<HttpResponse<IPerson>> {
    return this.http.put<any>(`${API_URL}update-person`, {  observe: 'response' });
  }




}
