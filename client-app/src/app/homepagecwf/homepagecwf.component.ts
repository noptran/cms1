import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepagecwf',
  templateUrl: './homepagecwf.component.html',
  styleUrls: ['./homepagecwf.component.scss']
})
export class HomepagecwfComponent implements OnInit {


  @Input()
  Sidenav: boolean;

  date;
  month_names = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  month;
  adminTileController = false;
  reports = localStorage.getItem('Reports');

  constructor(public _router: Router) { }
  hover(data) {

    console.log('Event', data);
    switch (data) {
      case 'reports':
        const report_element = document.getElementById('report-content');
        // let report_nav = document.getElementById('report-nav-title');
        // (report_nav as HTMLInputElement).style.color = 'transparent';
        report_element.classList.add('overlay');
        report_element.style.backgroundColor = '#374960';

        break;
      case 'calendar':
        const calendar_element = document.getElementById('calendar-content');
        // let calendar_nav = document.getElementById('calendar-nav-title');
        // (calendar_nav as HTMLInputElement).style.color = 'transparent'
        calendar_element.classList.add('overlay');
        calendar_element.style.backgroundColor = '#374960';
        break;
      case 'person_master':
        const person_master_element = document.getElementById('personmaster-content');
        // let person_nav = document.getElementById('person-nav-title');
        // (person_nav as HTMLInputElement).style.color = 'transparent'
        person_master_element.classList.add('overlay');
        person_master_element.style.backgroundColor = '#374960';
        break;
      case 'activity_logs':
        const activitylog_element = document.getElementById('activitylog-content');
        // let log_nav = document.getElementById('log-nav-title');
        // (log_nav as HTMLInputElement).style.color = 'transparent';
        activitylog_element.classList.add('overlay');
        activitylog_element.style.backgroundColor = '#374960';
        break;
      case 'feeds':
        const feeds_element = document.getElementById('feeds-content');
        // let feeds_nav = document.getElementById('feeds-nav-title');
        // (feeds_nav as HTMLInputElement).style.color = 'transparent';
        feeds_element.classList.add('overlay');
        feeds_element.style.backgroundColor = '#374960';
        break;
      case 'admin':
        const admin_element = document.getElementById('admin-content');
        // let admin_nav = document.getElementById('admin-nav-title');
        // (admin_nav as HTMLInputElement).style.color = 'transparent';
        admin_element.classList.add('overlay');
        admin_element.style.backgroundColor = '#374960';
        break;

    }
  }
  hover_out(data) {
    switch (data) {
      case 'reports':
        const report_element = document.getElementById('report-content');
        report_element.classList.remove('overlay');
        const report_nav = document.getElementById('report-nav-title');
        (report_nav as HTMLInputElement).style.color = '#42B3BC';
        break;
      case 'calendar':
        const calendar_element = document.getElementById('calendar-content');
        calendar_element.classList.remove('overlay');
        const calendar_nav = document.getElementById('calendar-nav-title');
        (calendar_nav as HTMLInputElement).style.color = '#42B3BC';
      case 'person_master':
        const person_master_element = document.getElementById('personmaster-content');
        person_master_element.classList.remove('overlay');
        const person_nav = document.getElementById('person-nav-title');
        (person_nav as HTMLInputElement).style.color = '#42B3BC';
        break;
      case 'activity_logs':
        const activitylog_element = document.getElementById('activitylog-content');
        activitylog_element.classList.remove('overlay');
        const log_nav = document.getElementById('log-nav-title');
        (log_nav as HTMLInputElement).style.color = '#42B3BC';
        break;
      case 'feeds':
        const feeds_element = document.getElementById('feeds-content');
        feeds_element.classList.remove('overlay');
        const feeds_nav = document.getElementById('feeds-nav-title');
        (feeds_nav as HTMLInputElement).style.color = '#42B3BC';
        break;
      case 'admin':
        const admin_element = document.getElementById('admin-content');
        admin_element.classList.remove('overlay');
        const admin_nav = document.getElementById('admin-nav-title');
        (admin_nav as HTMLInputElement).style.color = '#42B3BC';

        break;



    }
  }

  reportsPageNaviagtion() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._router.navigate(['/reports/prioritized']).then(data => {
      console.log('Data', data);
      loader.style.display = 'none';

    });
  }

  ngOnInit() {
    const d = new Date();
    this.date = d.getDate();
    this.month = this.month_names[d.getMonth()];
    console.log('Reports', this.reports);
    if (this.reports !== null) {
      this.adminTileController = true;
    }
  }

  navigateToMainPages(target: any) {
    console.log('target', target);
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    switch (target) {
      case 'reports':
        this._router.navigate(['/reports/prioritized']).then(data => {
          console.log('Data before', data);
          if (data) {
            console.log('Data after', data);
            loader.style.display = 'none';
          }
        });
        break;
        case 'live-reports':
        this._router.navigate(['/reports/live-prioritized']).then(data => {
          console.log('Data before', data);
          if (data) {
            console.log('Data after', data);
            loader.style.display = 'none';
          }
        });
        break;
      case 'person':
        this._router.navigate(['/reports/person/types']).then(data => {
          if (data) {
            loader.style.display = 'none';
          }
        });
        break;
      case 'activitylog':
        this._router.navigate(['/family/ssn_activity_log']).then(data => {
          if (data) {
            loader.style.display = 'none';
          }
        });
        break;
    }
  }


}
