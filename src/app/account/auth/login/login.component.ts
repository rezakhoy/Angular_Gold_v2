import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private authFackservice: AuthfakeauthenticationService
              ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    //
    // // reset login status
    // // this.authenticationService.logout();
    // // get return url from route parameters or default to '/'
    // // tslint:disable-next-line: no-string-literal
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  onSubmit() {
    this.submitted = true;

    this.authenticationService.login(this.username.value, this.password.value)
      .subscribe(tokenObj => {
          console.log(tokenObj);
          if (tokenObj.authorization !== null && tokenObj.authorization !== '') {
            localStorage.removeItem('authorization' );
            localStorage.setItem('authorization', tokenObj.authorization );
            this.router.navigate(['/']);
          }
        },
        (error) => {
          if (error.status === 400) {
            // this.toastr.error('نام کاربری یا رمز ورود صحیح نمی باشد ', 'خطای اعتبار سنجی!!');
          } else {
            // this.toastr.error('نام کاربری یا رمز ورود صحیح نمی باشد ', 'خطای اعتبار سنجی!!');
          }
        }
      );
  }

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
    //       this.router.navigate(['/dashboard']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f.email.value, this.f.password.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.router.navigate(['/dashboard']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
  //   }
  // }
}
