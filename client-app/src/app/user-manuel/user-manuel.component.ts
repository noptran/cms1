import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-manuel',
  templateUrl: './user-manuel.component.html',
  styleUrls: ['./user-manuel.component.scss']
})
export class UserManuelComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  gotoCaseDetail(url){
      this.router.navigate([url]);  
  }
}
