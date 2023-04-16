import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
// import {AdvancedSortableDirectiveDemands} from "./demand/advanced-sortable.directive";


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    TransactionsComponent,
    PriceGroupComponent,
    DemandComponent,
    BankComponent,
    AdvancedSortableDirective,
    UsersComponent,
    AdvancedSortableDirectiveUsers,
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
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
    { provide: NgbDatepickerConfig, useClass: NgbDPConfig },
  ],
})
export class PagesModule { }
