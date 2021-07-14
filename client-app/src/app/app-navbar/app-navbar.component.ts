import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PrioritizedReportsService } from '../prioritized-reports/prioritized-reports.service';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';
import { Logout } from '../login/logout';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  @Input()
  imagePreview: any;
  spName: any;
  showExpand = false;
  showShrink = true;
  url;
  pathName;
  userName: any;
  reportBtnController = true;
  toggleBtnController = true;
  logoutData: Logout = new Logout();
  constructor(public router: Router,
              public homeComponent: HomeComponent,
              public _report: PrioritizedReportsService,
              public homeService: HomeService,
              public _login: LoginService) { }

  ngOnInit() {
    console.log('Test', this.router.url);
    this.userName = localStorage.getItem('UserEmail');
    if (this.router.url === '/childwelfare') {
            this.toggleBtnController = false;
          }
          if (this.router.url === '/childwelfare' || this.router.url === '/reports/dynamicReports') {
            this.reportBtnController = false;
          }
    // this.router.events.subscribe(ev=>{
    //   console.log("Router eve",ev)
    //   if(ev instanceof NavigationEnd){
    //     console.log("Current URL",ev.url)
    //     if(ev.url === '/childwelfare'){
    //       this.toggleBtnController = false;
    //     }
    //     if(ev.url === '/childwelfare' || ev.url === '/reports/dynamicReports'){
    //       this.reportBtnController = false;
    //     }

    //   }
    // })
    this.homeService.currentMessage.subscribe(message => this.imagePreview = message);
  }

  sideMenuOpen() {
    this.showShrink = true;
    this.showExpand = false;
  }
  sideMenuClose() {
    this.showShrink = false;
    this.showExpand = true;
    const closeIcon = document.getElementById('close-icon') as HTMLElement;
    closeIcon.style.marginLeft = '152px';
  }
  logOut() {
    this.logoutData.staffID = localStorage.getItem('UserId');
    // this.logoutData.staffID = '4621'
    this._login.logOut(this.logoutData).then((result: any) => {
      localStorage.clear();
      console.log('Logout result', result);
      if (result.redirect !== 'login') {
        this.router.navigateByUrl('/home');
      } else {
        this._login.cookieRemoval('token=');
        this.router.navigateByUrl('/');
      }
    });
  }
  getDashBoardLink() {
    this._report.getDashBoardLink({vReportLink: this.spName}).then(data => {
      if (data.responseStatus == true) {
        window.open(data.dashBoardLink[0].dashboard_link, '_blank');
      } else {
        console.log(data.responseMessage);
      }
    });
  }
}
