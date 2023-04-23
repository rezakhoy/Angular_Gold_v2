import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { IUser } from '../models/auth.models';
import {Observable} from "rxjs";
import {API_URL} from "../../../environments/environment";
import {IPerson} from "../models/person.models";
import {IAudiences} from "../models/audiences.models";

@Injectable({ providedIn: 'root' })
export class AudiencesService {
    constructor(private http: HttpClient) { }

  getAllAudiences(): Observable<HttpResponse<IAudiences[]>> {
    return this.http.get<any>(`${API_URL}audiences`, {  observe: 'response' });
  }


}
