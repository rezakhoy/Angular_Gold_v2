import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<IUser[]>(`/api/login`);
    }

    register(user: IUser) {
        return this.http.post(`/users/register`, user);
    }
}
