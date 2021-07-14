import { Component, OnInit } from '@angular/core';
import { ProviderCaseFileActivity } from './provider-case-file-activity';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-provider-case-file-activity',
  templateUrl: './provider-case-file-activity.component.html',
  styleUrls: ['./provider-case-file-activity.component.scss']
})
export class ProviderCaseFileActivityComponent implements OnInit {
  pCFA: ProviderCaseFileActivity = new ProviderCaseFileActivity;
  breadcrumbs = [];

  constructor(public _opencard:OpencardsService, public _caseTeam:CaseTeamService, public _client:ClildFormService,
              public _router: Router, public _fb: FormBuilder ) { }

  ngOnInit() { 
    this.breadcrumbs.push(
            { label: 'Person Types', href: "/reports/person/types", active: '' },
            { label: 'Provider List', href: "/reports/provider/view", active: '' },
            { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
            { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
            { label: 'Case File Activity List', active:'', href: '/provider/opencard/case-file-activity/view'},
    )
  }

  formAction(source: ProviderCaseFileActivity) { 
    !isNullOrUndefined(source.date) ? source.date  = Date.parse(source.date) : null;
    !isNullOrUndefined(source.providerCaseFileActivityId) ? this.update(source) : this.save(source) ;
  }

  save(source: ProviderCaseFileActivity) { }

  update(source: ProviderCaseFileActivity) { }

  getMetaData(event: any, label: any) { }

  editForm() { }

  getRecById() { }


}
