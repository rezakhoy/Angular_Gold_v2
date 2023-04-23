import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarouselModule} from 'ngx-owl-carousel-o';
import {NgOtpInputModule} from 'ng-otp-input';

import {CommandRoutingModule} from './command-routing.module';

import {CommandComponent} from "./command/command.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NgbCollapseModule, NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule, NgbPaginationModule,
  NgbTooltipModule, NgbTypeaheadModule
} from "@ng-bootstrap/ng-bootstrap";
import {PagesRoutingModule} from "../pages/pages-routing.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {DashboardsModule} from "../pages/dashboards/dashboards.module";
import {HttpClientModule} from "@angular/common/http";
import {UIModule} from "../shared/ui/ui.module";
import {WidgetModule} from "../shared/widget/widget.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {SimplebarAngularModule} from "simplebar-angular";
import {LightboxModule} from "ngx-lightbox";
import {NgSelectModule} from "@ng-select/ng-select";
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  declarations: [
    CommandComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    LightboxModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    FormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    CurrencyMaskModule,
    CommandRoutingModule
  ]
})
export class CommandModule {
}
