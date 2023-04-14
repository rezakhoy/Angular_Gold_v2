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
        return this.http.get<IUser[]>(`/api/login`);
    }

    register(body) {
        return this.http.post(`${API_URL}auth/create-user`, body);
    }
  getAllPersons(): Observable<HttpResponse<IPerson[]>> {
    return this.http.get<any>(`${API_URL}persons`, {  observe: 'response' });
  }
}
