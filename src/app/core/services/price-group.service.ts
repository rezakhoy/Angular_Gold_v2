import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient ) { }



  getAllGroups(): any {
    return this.http.get<any>(`${API_URL}price-groups`, {  observe: 'response' });
  }
  public createGroup(group): any {
    console.log("im in create grope service methode");
    console.log('gggg', group);
    // return this.http.post<IGroup>(`${API_URL}auth/create-group`, {  observe: 'response' , group});
  }

}

