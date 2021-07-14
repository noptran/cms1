import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  gotoPrimaryReport(url){
    this.router.navigate([url,'report']);
  }
}
