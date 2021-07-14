import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.scss']
})
export class ErrorPagesComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  returToLogin() {
    this.router.navigate(['/']);
  }
}
