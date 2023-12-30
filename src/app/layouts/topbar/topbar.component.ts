import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import {PermissionService} from "../../core/services/permission.service";
import {IUser} from "../../core/models/auth.models";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ConfigService} from "../../core/services/config.service";
import {ToastrService} from "ngx-toastr";
import {ReportsService} from "../../core/services/reports.service";
import {ISekeh} from "../../core/models/sekeh.models";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  user: IUser;
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;

  messageForm = this.fb.group({
    id: [],
    message_type: [null],
    title: [null],
    body: [null]
  });

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };
  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private reportService: ReportsService,
              private configService: ConfigService,
              private authService: AuthenticationService,
              private permissionService: PermissionService,
              public _cookiesService: CookieService) {
    authService.getUser().subscribe(res => {
      this.user = res.body;
      const roles = res.body.groups.map(function(a) {return a.name;});
      this.permissionService.seRole(roles)
    });
  }

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;
  sekehs : ISekeh[];
  resetPasswordForm = this.fb.group({
    oldPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
  });
  settingForm = this.fb.group({
    rejectTime: [null, Validators.required],
    payImageDirectory: [null, Validators.required],
    textMessageUsername: [null, Validators.required],
    textMessagePassword: [null, Validators.required],
    textMessageNumber: [null, Validators.required],
    sendMessageForOrderConfirm: [null, Validators.required],
    sendMessageForOrderConfirmAmount: [null, Validators.required],
  });
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }



  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem('authorization');
    this.router.navigate(['/account/login'], );
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  resetPassword(restForm) {
    this.modalService.open(restForm, this.ngbModalOptions);
  }

  saveNewPassword() {
    // const order = JSON.stringify({
    //   'oldPassword': this.resetPasswordForm.get('oldPassword').value,
    //   'newPassword': this.resetPasswordForm.get('newPassword').value,
    // })
    const order = this.resetPasswordForm.value;
    console.log(order);
    this.authService.resetPasswordUser(order).subscribe(res=> {
      console.log(res);
    })
  }

  changeSetting(setting) {
    this.configService.systemSetting().subscribe(res => {
      console.log(res.body);
      this.settingForm.patchValue({
        rejectTime: res.body.rejectTime,
        sendMessageForOrderConfirm: res.body.sendMessageForOrderConfirm,
        sendMessageForOrderConfirmAmount: res.body.sendMessageForOrderConfirmAmount,
        payImageDirectory: res.body.payImageDirectory,
        textMessageUsername: res.body.textMessageUsername,
        textMessagePassword: res.body.textMessagePassword,
        textMessageNumber: res.body.textMessageNumber,
      })

      this.modalService.open(setting, this.ngbModalOptions);
    })

  }

  saveSetting() {
    const body = this.settingForm.value;
    this.configService.resetPassword(body).subscribe(res =>{
      this.toastr.success('تنظیمات سیستم با موفقیت ذخیره شد')
    })
  }

  getAdminSekeh(sekehModal) {
    this.reportService.adminSekeh().subscribe(res => {
      this.sekehs = res.body;
      this.modalService.open(sekehModal, this.ngbModalOptions);
    })
  }

  makeMessage(makeMessageModal) {
    this.reportService.adminSekeh().subscribe(res => {
      this.sekehs = res.body;
      this.modalService.open(makeMessageModal, this.ngbModalOptions);
    })
  }

  sendMessage() {

  }
}
