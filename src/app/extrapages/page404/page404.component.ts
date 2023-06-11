import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})

/**
 * PAges-404 component
 */
export class Page404Component implements OnInit {

  constructor(private titleService: Title,) { }

  ngOnInit(): void {
    this.titleService.setTitle("صفحه مورد نظر پیدا نشد |404")
  }

}
