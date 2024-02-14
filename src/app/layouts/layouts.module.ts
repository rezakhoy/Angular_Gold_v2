import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SimplebarAngularModule } from 'simplebar-angular';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { UIModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { TranslateModule } from '@ngx-translate/core';
import {PermissionModule} from "ng2-permission";
import {NgxPersianModule} from "ngx-persian";
import {ReactiveFormsModule} from "@angular/forms";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent, FooterComponent, RightsidebarComponent, HorizontalComponent, VerticalComponent, HorizontaltopbarComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        NgbDropdownModule,
        ClickOutsideModule,
        UIModule,
        SimplebarAngularModule,
        PermissionModule,
        NgxPersianModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        CurrencyMaskModule,
        NgSelectModule
    ],
})
export class LayoutsModule { }
