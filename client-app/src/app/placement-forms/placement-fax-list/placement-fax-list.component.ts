import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../placement/placement.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../case-team/case-team.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {LocalValues} from '../../local-values';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-placement-fax-list',
  templateUrl: './placement-fax-list.component.html',
  styleUrls: ['./placement-fax-list.component.scss']
})
export class PlacementFaxListComponent implements OnInit {
  caseTeamInfo: any[] = [];
  client: any;
  caseTeam: any[] = [];
  formData: any;
  constructor(public _opencards: OpencardsService, public _CaseTeamService: CaseTeamService, public _team: TeamFormService, public _localValues: LocalValues, public _placement: PlacementService,) { }

  ngOnInit() {
    this.getData();
    this.setCaseTeamData();
    this.getPrintAck();
  }
  generateFaxList(): any {
    this.caseTeam = this.caseTeamInfo.filter((element) => {
      return element.PersonType == "Guardian Ad Litem" || element.PersonType == "County Attorney"
    })


  }

  setCaseTeamData(): any {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let request = {
      "referralID": parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
      "beginPagination": 1,
      "endPagination": 100
    }
    this._placement.getPlacementCaseTeamInfo(request).then(data => {
      this.caseTeamInfo = data.caseTeamInfo;
      this.generateFaxList();
      loader.style.display = 'none';
    });
  }

  getData() {

    let placementReq = { placementID: this._placement.getSavedPlacementId() };
    if (this._placement.getSavedPlacementId()) {
      this._placement.getPlacement(placementReq).then((data: any) => {
        !isNullOrUndefined(data.placement.clientID) ? this.client = data.placement.clientID.clientNameLastFirst : null;
        this._placement.storePlacementData(data);
      })
    }

  }

  async getPrintAck() {
    let request = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
      clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey()
    }

    let response = await this._opencards.getPlacementFaxListData(request);
    this.formData = response;

  }

}
