import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker-child-list',
  templateUrl: './worker-child-list.component.html',
  styleUrls: ['./worker-child-list.component.scss']
})
export class WorkerChildListComponent implements OnInit {
  sortField:any;
  sortOrder:any;
  ReferralCards:any;
  selectedReferral:any;
  backToClient:any;

  constructor() { }

  ngOnInit() {
  }

}
