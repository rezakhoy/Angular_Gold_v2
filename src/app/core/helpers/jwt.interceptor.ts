import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import {catchError, map} from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('authorization');
      let headers = null;

      if (token) {
        headers = new HttpHeaders({
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          // 'Authorization': `Token ${token}`
          Authorization: ` Bearer ${token}`
        });
      } else {
        headers = new HttpHeaders({
          'Content-Type' : 'application/json'
        });
      }
      const requestChange = request.clone({headers});
      // console.log(requestChange);
      return next.handle(requestChange).pipe(
        map((event: HttpEvent<any>) => event), // pass further respone
        catchError((error: HttpErrorResponse) => {
          // here will be catched error from response, just check if its 401
          if (error && error.status === 401) {
            localStorage.removeItem('authorization');
            this.router.navigate(['/account/login']);
            return throwError(error);
          }
        }));
    }
}
