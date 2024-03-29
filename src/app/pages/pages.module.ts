import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbNavModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbCollapseModule,
  NgbPaginationModule,
  NgbTypeaheadModule, NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbInputDatepicker, NgbDatepickerModule, NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';
import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TransactionsComponent} from "./transactions/transactions.component";
import {AdvancedSortableDirective} from "./transactions/advanced-sortable.directive";
import {PriceGroupComponent} from "./price-group/price-group.component";
import {AdvancedSortableDirectiveUsers} from "./users/advanced-sortable.directive";
import {UsersComponent} from "./users/users.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbDatepickerI18nPersian, NgbDPConfig} from '../core/services/prsian-calander.service';
import {DemandComponent} from "./demand/demand.component";
import {BankComponent} from "./bank/bank.component";
import {AdvancedSortableDirectiveDemands} from "./demand/advanced-sortable.directive";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {CommandComponent} from "./command/command.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CommandChildComponent} from "./command-child/command-child.component";
import {NgImageFullscreenViewModule} from "@jjbenitez/ng-image-fullscreen-view";
import {PersonComponent} from "./person/person.component";
import {PermissionModule} from "ng2-permission";
import {CommandChildListComponent} from "./command-child-list/command-child-list.component";
import {TradesComponent} from "./trades/trades.component";
import {DailyDemandComponent} from "./daily-demand/daily-demand.component";
import {BalanceComponent} from "./balance/balance.component";
import {RiskDemandComponent} from "./risk-demand/risk-demand.component";



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    TransactionsComponent,
    PriceGroupComponent,
    TradesComponent,
    DemandComponent,
    BalanceComponent,
    DailyDemandComponent,
    RiskDemandComponent,
    BankComponent,
    PersonComponent,
    CommandChildListComponent,
    AdvancedSortableDirective,
    CommandChildComponent,
    UsersComponent,
    CommandComponent,
    AdvancedSortableDirectiveUsers,
    AdvancedSortableDirectiveDemands
    // AdvancedSortableDirectiveDemands
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgbDropdownModule,
        NgbModalModule,
        PagesRoutingModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        DashboardsModule,
        HttpClientModule,
        UIModule,
        WidgetModule,
        FullCalendarModule,
        NgbNavModule,
        NgbTooltipModule,
        NgbCollapseModule,
        SimplebarAngularModule,
        LightboxModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        NgbCollapseModule,
        FormsModule,
        NgSelectModule,
        NgbDatepickerModule,
        CurrencyMaskModule,
        NgxDatatableModule,
        NgImageFullscreenViewModule,
        PermissionModule,
    ],
  providers: [
    DatePipe,
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
    { provide: NgbDatepickerConfig, useClass: NgbDPConfig },
  ],
})
export class PagesModule { }
