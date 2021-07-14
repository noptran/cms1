import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseTeamService } from '../../../case-team/case-team.service';

@Component({
  selector: 'app-head-of-household-fp-form',
  templateUrl: './head-of-household-fp-form.component.html',
  styleUrls: ['./head-of-household-fp-form.component.scss']
})
export class HeadOfHouseholdFpFormComponent implements OnInit {
  bySearch = false;
  byNew = false;
  selectedClient: any;
  clientList = [];
  metaData = [];

  constructor(public _router: Router, public _caseTeam: CaseTeamService) { }

  ngOnInit() { }

  navigate() {
    this._router.navigate(['/reports/client/new']);
  }

  addClient(client) {
    this.clientList.push(client);
  }

  getClientData(event) {
    let req ;
    req = { Object: 'client', value: event.query};
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }

}
