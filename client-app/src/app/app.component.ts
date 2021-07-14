import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import swal from 'sweetalert2';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { LoginService } from './login/login.service';
import { PrintService } from './print-layout/service/print.service';
import { OpencardsService } from './opecards-list-view/opencards.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'app';
  url;
  online: boolean = false
  offline: any
  time: any = 1000;
  timedOut = false;
  lastPing?: Date = null;
  idleState = 'Not started.';

  constructor(public printService: PrintService, public cd: ChangeDetectorRef,
    public ngZone: NgZone,
    public router: Router,
    public idle: Idle, public keepalive: Keepalive, public _login: LoginService, public _openCard: OpencardsService) {

    // idle.setIdle(300);
    // idle.setTimeout(1);
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    // });

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');

    // idle.onTimeoutWarning.subscribe(() => {
    //   let req, staffID;
    //   let loader = document.getElementById('loading-overlay') as HTMLElement;
    //   loader.style.display = 'block';
    //   staffID = localStorage.getItem('UserId');
    //   if (staffID) {
    //     req = { staffID: staffID };
    //     this._openCard.loginApp(req).then(data => {
    //       // localStorage.clear();
    //       loader.style.display = 'none';
    //       // if (data.redirect !== 'login') {
    //       //   this.router.navigateByUrl('/home');
    //       // }
    //       // else {
    //       //   this._login.cookieRemoval('token=');
    //       //   this.router.navigateByUrl('/');
    //       // }
    //     });
    //   }
    //   else {
    //     loader.style.display = 'none';
    //     // this.router.navigateByUrl('/');
    //   }
    //   this.reset();
    //   // this.router.navigate(['/']);
    //   swal({
    //     title: 'Your session has expired!',
    //     text: 'you have left the application inactive for more than 5 mins.',
    //     type: 'warning',
    //     confirmButtonColor: '#3085d6',
    //   });
    // })

    // keepalive.interval(20);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();
  }
  /**
   * Reset the watcher
   */
  reset() {
    this.idle.watch();
    this.idleState = 'Started!';
    this.timedOut = false;
  }

  ngOnInit() {

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.ngZone.run(() => {
        this.cd.detectChanges();
      })
    })
    setInterval(() => {
      if (!navigator.onLine) {
        return this.offlinewarning();
      }
    }, 1000)

  }
  offlinewarning() {
    swal(
      'Offline!',
      'You are in offline!',
      'warning'
    )
  }
}
