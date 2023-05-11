import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ExtrapagesModule } from './extrapages/extrapages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import {WebsocketService} from "./core/services/websocket.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from "ng2-currency-mask";
import {PermissionModule} from "ng2-permission";
import {NgImageFullscreenViewModule} from "@jjbenitez/ng-image-fullscreen-view";
import {ToastrModule} from "ngx-toastr";




document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: " ریال",
  thousands: ","
};

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    CurrencyMaskModule,
    NgbAccordionModule,
    NgImageFullscreenViewModule,
    NgSelectModule,
    NgxNumberSpinnerModule,
    NgbNavModule,
    NgbTooltipModule,
    PermissionModule,
    ScrollToModule.forRoot(),
    NgbModule
  ],
  bootstrap: [AppComponent],
  providers: [
    WebsocketService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class AppModule { }
