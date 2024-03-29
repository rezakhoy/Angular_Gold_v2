import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import {TransactionsComponent} from "./transactions/transactions.component";
import {PriceGroupComponent} from "./price-group/price-group.component";
import {UsersComponent} from "./users/users.component";
import {DemandComponent} from "./demand/demand.component";
import {BankComponent} from "./bank/bank.component";
import {CommandComponent} from "./command/command.component";
import {CommandChildComponent} from "./command-child/command-child.component";
import {PersonComponent} from "./person/person.component";
import {CommandChildListComponent} from "./command-child-list/command-child-list.component";
import {TradesComponent} from "./trades/trades.component";
import {DailyDemandComponent} from "./daily-demand/daily-demand.component";
import {BalanceComponent} from "./balance/balance.component";
import {RiskDemandComponent} from "./risk-demand/risk-demand.component";


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  {
    path: 'transaction',
    component: TransactionsComponent
  },
  {
    path: 'trades',
    component: TradesComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: 'persons',
    component: PersonComponent
  },
  {
    path: 'price-group',
    component: PriceGroupComponent
  },
  {
    path: 'demand-list',
    component: DemandComponent
  },
  {
    path: 'daily-demand-list',
    component: DailyDemandComponent
  },
  {
    path: 'risk-demand',
    component: RiskDemandComponent
  },
  {
    path: 'command-list',
    component: CommandComponent
  },
  {
    path: 'command-child-list',
    component: CommandChildListComponent
  },
  {
    path: 'command/:id',
    component: CommandChildComponent
  },
  {
    path: 'bank-list',
    component: BankComponent
  },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
