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
import {catchError, map} from "rxjs/operators";
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private authService: AuthenticationService,
                private toastr: ToastrService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('authorization');
      const refreshToken = localStorage.getItem('refreshToken');
      let headers = null;

      if (token) {
        headers = new HttpHeaders({
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          // 'Authorization': `Token ${token}`
          Authorization: `${token}`
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
          if (error && error.status === 401) {
            localStorage.removeItem('authorization');
            this.router.navigate(['/account/login']);
            return throwError(error);
          }
          if (error && error.status === 400) {
            this.toastr.error('نام کاربری یا رمز عبور صحیح نمی باشد')
            return throwError(error);
          }
          if (error && error.status === 0) {
            this.toastr.error('از سرور پاسخی دریافت نشد با پشتیبانی تماس بگیرید')
            localStorage.removeItem('authorization');
            this.router.navigate(['/account/login']);
            return throwError(error);
          }
          if (error && error.status === 403) {
            localStorage.removeItem('authorization');
            this.router.navigate(['/account/login']);
            return throwError(error);
          }
          if (error && error.status === 404) {
            this.router.navigate(['/404']);
            return throwError(error);
          }
        }));
    }

  private handellError(number: number) {
      if (403){
        console.log("handell error 400000003");
        this.authService.refreshToken(localStorage.getItem('refreshToken')).subscribe(res => {

          console.log(res);

        })
      }

  }
}
