import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'reset-password',
        component: PasswordresetComponent
    },
    {
        path: 'recoverpwd-2',
        component: Recoverpwd2Component
    },
    {
        path: 'login-2',
        component: Login2Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
