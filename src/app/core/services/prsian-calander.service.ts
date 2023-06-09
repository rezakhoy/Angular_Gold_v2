import {  Injectable } from '@angular/core';
import {
  NgbDateStruct,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import {JalaliDateCalculatorService} from "ngx-persian";

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {

  getWeekdayLabel(weekday: number) {
    return WEEKDAYS_SHORT[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }
  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`;
  }
}

export class NgbDPConfig {
  displayMonths = 1;
  firstDayOfWeek = 6;
}

export class JalaliToGeorgian {

  constructor(private jalaliService: JalaliDateCalculatorService) { }


  jalaliConvertToGeorgian(date: NgbDateStruct){
    let y = this.jalaliService.convertToGeorgian(date.year, date.month, date.day).getFullYear()
    let m = this.jalaliService.convertToGeorgian(date.year, date.month, date.day).getMonth()
    let d = this.jalaliService.convertToGeorgian(date.year, date.month, date.day).getDay()

    console.log("date from service jalali", y, m, d);


  }
}
