import { Component, OnInit } from '@angular/core';
import { FamilySafety } from './family-safety';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-family-safety',
  templateUrl: './family-safety.component.html',
  styleUrls: ['./family-safety.component.scss']
})
export class FamilySafetyComponent implements OnInit {
  fs:FamilySafety = new FamilySafety();
  breadcrumbs = [];
  discardTo = '/reports/family-safety/view';
  isEdit = false;
  familySafetyForm:FormGroup;
  url: any;
  isAttachmentRequired = false;
  quickMenu: any;
  req: any;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }
  
  constructor(public _fb:FormBuilder, public _opencard: OpencardsService, 
    public _router: Router, public _client:ClildFormService) { }

  ngOnInit() { 
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
      { label: 'Family', href: '/reports/family', active: '' },
      { label: 'Family Safety List', active: '', href:'/reports/family-safety/view' },
      { label: 'Family Safety', active: 'active' },
    );
   if(this._router.url === '/reports/family-safety/detail') {
      this.getById();
      this.isAttachmentRequired = true;
   }  
   this.formValidation();
  }

  formValidation() { 
    this.familySafetyForm = this._fb.group({
      eventNumber:[null, Validators.compose([Validators.required])],
      eventDate:[null, Validators.compose([Validators.required])],
      notes:[null]
    })
  }

  formAction(source:FamilySafety) {
    if(this.familySafetyForm.valid) {
      source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();  
      !isNullOrUndefined(source.eventDate) ? source.eventDate = Date.parse(source.eventDate) : null;
      if(source.familySafetyID) { 
        return this.update(source);
      }else{ 
        return this.save(source);
      }
    }else { 
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }
    
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveFamilySafety(source).then((data) => { 
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!','success');
      this._router.navigate(['/reports/family-safety/view'])
    })
  }
  update(source: any) { 
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateFamilySafety(source).then((data) => { 
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!','success');
      this._router.navigate(['/reports/family-safety/view'])
    })
  }

  getById() { 
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { familySafetyID : this._client.getId() }
    this._opencard.getByIdFamilySafety(this.req).then((data: any) => {
      if (data.familySafety.isActive) {
        !isNullOrUndefined(data.familySafety.eventDate) ? data.familySafety.eventDate = moment(data.familySafety.eventDate).format('MM/DD/YYYY') : null;
      } else {
        !isNullOrUndefined(data.familySafety.eventDate) ? data.familySafety.eventDate = moment.utc(data.familySafety.eventDate).format('MM/DD/YYYY') : null;
      }
      
      this.fs = data.familySafety;
      loader.style.display = 'none';
      this.isEdit = true;
      this.familySafetyForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.familySafety.changedBy) ? data.familySafety.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.familySafety.changedDate) ? moment(data.familySafety.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.familySafety.enteredBy) ? data.familySafety.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.familySafety.enteredDate) ? moment(data.familySafety.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() { 
    this.isEdit = false;
    this.familySafetyForm.enable();
  }


  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/family-safety/new' || currentURL == '/reports/family-safety/detail') {
      this.url = '/reports/attachment-document/family-safety';
    }
    else {
      this.url = '/reports/attachment-document/rfc/family-safety';
    }
    return this._router.navigate([this.url])
  }

}
