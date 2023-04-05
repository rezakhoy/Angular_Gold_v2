import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { IUser } from '../models/auth.models';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: IUser;
  public baseUrl = 'http://192.168.9.18:8080/';
    constructor(private http: HttpClient) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): IUser {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(username, password): Observable<IUser> {
      const body = JSON.stringify({  'username': username, 'password': password });
      console.log(body);
      return this.http.post<IUser>(`${this.baseUrl}login`, body);
    }


    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(username: string, password: string) {
        return getFirebaseBackend().registerUser(username, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }


    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }
}

