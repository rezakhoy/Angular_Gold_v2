import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import {IRefreshToken, IUser} from '../models/auth.models';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import {Router, RouterStateSnapshot} from "@angular/router";
import {API_URL} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    permissions: string[];
    user: IUser;

    constructor(private http: HttpClient, private router: Router) {
    }

    /**
     * Returns the current user
     */
    public getUser(): any {
      return this.http.get<IUser>(`${API_URL}auth/current-user`, {observe: 'response'});
    }
  public getAllUser(): any {
    return this.http.get<IUser[]>(`${API_URL}auth/users`, {observe: 'response'});
  }
  public getPermissions(): any {
    return this.http.get<string[]>(`${API_URL}auth/groups`, {observe: 'response'});
  }

  public getCurrentUserPrice(): any {
    return this.http.get<any>(`${API_URL}auth/current-user-price`, {observe: 'response'});
  }

  public getLastPriceList(): any {
    return this.http.get<any>(`${API_URL}get-last-price-list`, {observe: 'response'});
  }
  /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(username, password): Observable<IUser> {
      const body = JSON.stringify({  'username': username, 'password': password });
      return this.http.post<IUser>(`${API_URL}login`, body);
    }
  refreshToken(refreshToken): Observable<HttpEvent<IRefreshToken>> {
    return this.http.post<IRefreshToken>(`${API_URL}refresh-token`,{  observe: 'response' }, refreshToken);
  }


    /**
     * Logout the user
     */
  logout() {
    localStorage.removeItem('authorization');
    this.router.navigate(['/account/login'], );

  }


  /**
   * Reset password
   * @param email email
   */
  resetPassword(user: IUser) {
    return this.http.put<any>(`${API_URL}set-password`, user);
  }

}

