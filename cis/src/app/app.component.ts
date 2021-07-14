import { Component, OnInit } from '@angular/core';
import { ElectronServiceFile } from './providers/electron.service';
import { NetworkService } from './providers/network.service';
import { LoginService } from './providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url: any;
  showNav: boolean = true;
  constructor(public electronService: ElectronServiceFile, private networkService: NetworkService, private router: Router, private loginService: LoginService,
 ) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.networkService.registerListeners();
    this.loginService.inactivityAutoLogout(); // this is to logout form app when its inactivity
    this.loginService.logoutOnCloseApp(); // this is to logout on close of app
  }
  
}
