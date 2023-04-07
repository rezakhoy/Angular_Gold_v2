import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import {TransactionsComponent} from "./transactions/transactions.component";
import {PriceGroupComponent} from "./price-group/price-group.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  {
    path: 'transaction',
    component: TransactionsComponent
  },
  {
    path: 'price-group',
    component: PriceGroupComponent
  },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
