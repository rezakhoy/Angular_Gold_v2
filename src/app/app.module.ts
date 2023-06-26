import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ExtrapagesModule } from './extrapages/extrapages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import {WebsocketService} from "./core/services/websocket.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from "ng2-currency-mask";
import {PermissionModule} from "ng2-permission";
import {NgImageFullscreenViewModule} from "@jjbenitez/ng-image-fullscreen-view";
import {ToastrModule} from "ngx-toastr";
import {PermissionService} from "./core/services/permission.service";
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';


document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ".",
  precision: 0,
  prefix: "",
  suffix: " ریال",
  thousands: ","
};

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CurrencyMaskModule,
    NgbAccordionModule,
    NgImageFullscreenViewModule,
    NgSelectModule,
    NgbNavModule,
    NgbTooltipModule,
    PermissionModule,
    ScrollToModule.forRoot(),
    NgbModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    WebsocketService,
    PermissionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class AppModule { }
