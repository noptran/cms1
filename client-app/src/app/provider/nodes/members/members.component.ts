import { Component, OnInit } from '@angular/core';
import { Members } from './members';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  isContinueForm = true;
  subActions = [{label:'Save & Exit', command: () =>{ this.formAction(this.member) } }];
  member:Members = new Members();
  breadcrumbs = [];

  formLogInfo: any;
  isFormLog: any;

  constructor(public _router:Router) { }

  ngOnInit() { 
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Members List', active: '', href: '/provider/opencard/members/view' },
      { label: 'Member', active: 'active' }
    )
  }

  formAction(source: Members) {  
    !isNullOrUndefined(source.memberID) ? this.update(source) : this.save(source);
  }

  continueToPreferences(source: Members) { 
    !isNullOrUndefined(source.memberID) ? this.update(source) : this.save(source);
    this._router.navigate(['/provider/opencard/provider-preferences/new'])
  }

  save(source: Members) { }

  update(source: Members) { }

}
