import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import {NgxNumberSpinnerModule} from "ngx-number-spinner";
import {NgxPermissionsRestrictStubModule} from "ngx-permissions";
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  declarations: [DefaultComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardsRoutingModule,
        UIModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgbNavModule,
        WidgetModule,
        NgApexchartsModule,
        SimplebarAngularModule,
        NgxNumberSpinnerModule,
        NgxPermissionsRestrictStubModule,
        CurrencyMaskModule
    ]
})
export class DashboardsModule { }
