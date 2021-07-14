import { Component, OnInit } from '@angular/core';
import { FamilySafetyActivity } from './family-safety-activity';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import { ReferralViewService } from '../referral-view/referral-view.service';
import * as moment from 'moment';

@Component({
  selector: 'app-family-safety-activity',
  templateUrl: './family-safety-activity.component.html',
  styleUrls: ['./family-safety-activity.component.scss']
})
export class FamilySafetyActivityComponent implements OnInit {
  fsa:FamilySafetyActivity = new FamilySafetyActivity();
  fsaForm:FormGroup;
  discardTo = '/reports/family-safety/family-activity/view';
  allegedVictim = [];
  allegedTypes = [];
  filterAlleged = [];
  victims = [];
  filteredVictims = [];
  metaData = [];
  isEdit = false;
  breadcrumbs = [];
  fisMembers = [];
  isadditionalLoader = false;

  constructor(public _fb:FormBuilder, public _opencard:OpencardsService, public _router:Router, 
            public _client:ClildFormService, public _caseTeam:CaseTeamService, public _referralView:ReferralViewService) { }

  ngOnInit() {
    this.generateAllegedTypes();
    this.formValidation();
      this.breadcrumbs.push(
        { label: 'Family Safety Event List', active: '', href: '/reports/family-safety/family-activity/view' },
        { label: 'Family Safety Event Form', active: 'active'},

      );
      if(this._router.url === '/reports/family-safety/family-activity/detail') { 
        this.getById();
      }
      this.getFISMembers();
   }

  formValidation() {
    this.fsaForm = this._fb.group({
      allegedVictim_PersonAssignmentTypeID: [null,Validators.compose([Validators.required])],
      personId: [null,Validators.compose([Validators.required])],
      allegedPerpetrator: [null,Validators.compose([Validators.required])],
      relationship_PersonTypeID: [null,Validators.compose([Validators.required])],
      findingDate: [null,Validators.compose([Validators.required])],
      familySafetyFindingTypeID: [null,Validators.compose([Validators.required])],
      findingResult_StatusTypeID: [null,Validators.compose([Validators.required])],
      notes: [null]
    })
    this.fsaForm.controls['personId'].disable();
    this.fsaForm.controls['allegedVictim_PersonAssignmentTypeID'].disable();

   }

  
  formAction(source: FamilySafetyActivity) {
    if(this.fsaForm.valid) { 
      !isNullOrUndefined(source.allegedVictim_PersonAssignmentTypeID ) ? 
      source.allegedVictim_PersonAssignmentTypeID = source.allegedVictim_PersonAssignmentTypeID.personAssignmentTypeID : null
      source.familySafetyID =  parseInt(localStorage.getItem('familySafteyId') ) - this._opencard.getHasKey();
      !isNullOrUndefined(source.relationship_PersonTypeID) ? source.relationship_PersonTypeID = source.relationship_PersonTypeID.personTypeID : null;
      !isNullOrUndefined(source.findingDate) ? source.findingDate =  Date.parse(source.findingDate) : null;
      !isNullOrUndefined(source.personId) ? source.personId =  source.personId.clientID | source.personId.familyMemberID : null;
      !isNullOrUndefined(source.findingResult_StatusTypeID) ? source.findingResult_StatusTypeID = source.findingResult_StatusTypeID.statusTypeID : null;
      !isNullOrUndefined(source.familySafetyFindingTypeID) ? source.familySafetyFindingTypeID = source.familySafetyFindingTypeID.familySafetyFindingTypeID : null;
      if(source.familySafetyActivityID) { 
        this.update(source)
      }else{
        this.save(source)
      }
    }else { 
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveFamilySafetyActivity(source).then((data: any) => { 
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!','success');
      this._router.navigate(['/reports/family-safety/family-activity/view']);
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block'; 
    this._opencard.saveFamilySafetyActivity(source).then((data: any) => { 
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!','success');
      this._router.navigate(['/reports/family-safety/family-activity/view']);
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block'; 
    let req = { familySafetyActivityID : this._client.getId()}
    this._opencard.getByIdFamilySafetyActivity(req).then((data: any) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.familySafetyActivity.findingDate) ? data.familySafetyActivity.findingDate =  moment.utc(data.familySafetyActivity.findingDate).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.familySafetyActivity.personId) ?data.familySafetyActivity.personId['clientName'] = data.familySafetyActivity.personId.lastName + data.familySafetyActivity.personId.firstName : null;
      this.fsa = data.familySafetyActivity;
      this.isEdit = true;
      this.fsaForm.controls['allegedVictim_PersonAssignmentTypeID'].disable();
      this.fsaForm.disable();
    })
  }

  getMetaData(event:any, label:any) { 
    let req: any, obj: any;
    switch(label) { 
      case 'personType':
        obj = 'personType';
        break;
      case 'findingSafetyType':
        obj = 'familySafetyFindingType';
        break;
      case 'findingStatusType':
        obj = 'findingStatusType';
        break;
      case 'findingType':
        obj = 'statusType';
        break;
    }
    req = { Object:obj, value:event.query }
    this._caseTeam.getSearchList(req).then((data: any) => this.metaData = data.dropDown)
  }

  generateAllegedVictim(selectedType: any) {
    this.fsaForm.controls['personId'].enable();
    if(selectedType.personAssignmentTypeID === 1) {
        this.victims = this.fisMembers;
    }else {
      let req_1 = { Object: 'familyMember', value: " "}
      this._caseTeam.getSearchList(req_1).then((data: any) => {
        data.dropDown.map((item: any) => item['clientName'] = item.name)  
        this.victims = data.dropDown;
      })
    }
  }
  
  generateAllegedTypes() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.allegedTypes  = [];
    let req = { Object: "personAssignmentType", module:"familySafety" } 
    this._opencard.getAllegedTypes(req).then((data: any) => { 
      loader.style.display = 'none';
      this.allegedTypes = data.dropDown;
    })
  }

  filterAllegedTypes(event: any) { 
    this.filterAlleged = [];
    this.allegedTypes.filter((item: any) => { 
      if(item.personAssignmentType.indexOf(event.query)!==-1) { 
        this.filterAlleged.push(item);
      }
    })
  }

  filterVicitms(event: any) { 
    this.filteredVictims = [];
    this.victims.filter((item: any) => { 
      if(item.clientName.toLowerCase().indexOf(event.query)!==-1) { 
        this.filteredVictims.push(item);
      }
    })
  }

  editForm() { 
    this.isEdit = false;
    this.fsaForm.enable();
    this.fsaForm.controls['allegedVictim_PersonAssignmentTypeID'].enable();
  }

  getFISMembers() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let referralID: any, req: any;
    this.isadditionalLoader = true;
    referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    req = { referralID: referralID }    
    this._referralView.getReferralRecById(req).then((data: any) => {
      this.fisMembers = data.fis;
      loader.style.display = 'none'; 
      this.fsaForm.controls['allegedVictim_PersonAssignmentTypeID'].enable();
      this.isadditionalLoader = false;
    })
  }








}
