import { Component, OnInit } from '@angular/core';
import { ProgressNoteDiagnosis } from './progress-note-diagnosis';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';

@Component({
  selector: 'app-progress-note-diagnosis-fp-form',
  templateUrl: './progress-note-diagnosis-fp-form.component.html',
  styleUrls: ['./progress-note-diagnosis-fp-form.component.scss']
})
export class ProgressNoteDiagnosisFpFormComponent implements OnInit {


  constructor(public _fb: FormBuilder, public _opencard: OpencardsService,
    public _CaseTeamService: CaseTeamService, public _router: Router,
    public _client: ClildFormService, public _localValues: LocalValues) { }



  progressNoteDiagnosis: ProgressNoteDiagnosis = new ProgressNoteDiagnosis();
  editControll = false;
  title = 'Progress Note Diagnosis';
  breadcrumbs = [];
  pnDiagnosisForm: FormGroup;
  metaData = [];
  fisClientData = [];
  discardTo = '/reports/referral/family-preservation/progress-note-diagnosis/view';
  quickMenu: any;
  url: any;
  isAttachmentRequired = false;
  seleceSpec = [];
  updatedProgressNoteDiagnosisSpecifier = [];
  updatedVal = [];
  updatedVal_spec = [];
  isEdit = false;
  req = {};
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;

  // addData(source) {
  //   if (this.pnDiagnosisForm.valid) {
  //     !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
  //     !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
  //     !isNullOrUndefined(source.clientID) ? source.clientID = source.clientID.clientID : null;
  //     !isNullOrUndefined(source.diagnosisCodeID) ? source.diagnosisCodeID = source.diagnosisCodeID.diagnosisCodeID : null;
  //     source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
  //     if (source.progressNoteDiagnosisID) {
  //       this.update(source)
  //     } else { this.save(source) }
  //   } else {
  //     swal('Warning', 'Mandatory fields are missing!', 'info');
  //   }
  // };


  seviRemoVId = [];

  ngOnInit() {
    this.progressNoteDiagnosis.isCode = 'code';
    this.formValidation();
    if (this._router.url == '/reports/referral/family-preservation/progress-note-diagnosis/detail') {
      this.getDetailsByRec();
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs = [
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
      { label: 'Progress Note Diagnosis List', href: '/reports/referral/family-preservation/progress-note-diagnosis/view', active: '' },
      { label: 'Progress Note Diagnosis', active: 'active' }

    ];
    const referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    if (referralTypeId === 9) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('progresssNoteDiagnosis-NCOPS', this.breadcrumbs);
    }
    this.generateFISClientData();
  }
  getSeverityStatus(event, item, ind, maiInde) {
    if (event) {
      this.seleceSpec[item.severityID + item.specifierID + ind + maiInde + item.randomKey] = item.severityID;
      this.updatedProgressNoteDiagnosisSpecifier.push({ severityID: item.severityID, specifierID: item.specifierID });
    } else {
      this.seviRemoVId.push(item.progressNoteDiagnosisSpecifierID);
      this.deleteWithCondition(this.updatedProgressNoteDiagnosisSpecifier, 'severityID', 'specifierID', item.severityID, item.specifierID);
    }
  }
  getSpecifiers(event) {
    let tempArr = [];
    this.updatedVal = [];
    this.seleceSpec = [];
    const req = { diagnosisCodeID: event.diagnosisCodeID };
    this._CaseTeamService.getDiagnosisCodeSpecifierSeverity(req).then((data) => {
      tempArr = data.diagnosisCodeSpecifierSeverity;
      const groupValues = tempArr.reduce((obj, item) => {
        obj[item.specifierID.specifier] = obj[item.specifierID.specifier] || [];
        obj[item.specifierID.specifier].push({
          severity: item.severityID.severity,
          severityID: item.severityID.severityID,
          specifierID: item.specifierID.specifierID,
          randomKey: shuffle(),
        });
        return obj;
      }, {});

      this.updatedVal = Object.keys(groupValues).map((key) => {
        return { specifier: key, severity: groupValues[key] };
      });
      this.updatedVal.map((ele, ky) => {
        this.updatedVal_spec.map((els) => {
          if (ele.specifier === els.specifier) {
            ele.severity.map((elsvi, key) => {
              els.severity.map((elsvid) => {
                if (elsvi.severityID === elsvid.severityID) {
                  elsvi['progressNoteDiagnosisSpecifierID'] = elsvid.progressNoteDiagnosisSpecifierID;
                  this.seleceSpec[elsvid.severityID + elsvid.specifierID + key + ky + elsvi.randomKey] = elsvid.severityID;
                }
              });
            });
          }
        });
      });
      console.log('this.updatedVal>>>>', JSON.stringify(this.updatedVal));
    });
  }  addData(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    !isNullOrUndefined(source.clientID) ? source.clientID = source.clientID.clientID : null;
    !isNullOrUndefined(source.diagnosisCodeID) ? source.diagnosisCodeID = source.diagnosisCodeID.diagnosisCodeID : null;
    !isNullOrUndefined(source.classificationID) ? source.classificationID = source.classificationID.classificationID : null;
    source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate));
    source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate));
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    if (!isNullOrUndefined(source.progressNoteDiagnosisID)) {
      source['progressNoteDiagnosisID'] = source.progressNoteDiagnosisID;
    }

    const req = {
      progressNoteDiagnosis: source,
      progressNoteDiagnosisSpecifier: this.updatedProgressNoteDiagnosisSpecifier
    };
    if (source.progressNoteDiagnosisID) {
      this._opencard.updatePNDiagnosis(req).then((data: any) => {
        this._router.navigate(['/reports/referral/family-preservation/progress-note-diagnosis/view']);
        swal('Success', 'Record has been updated!', 'success');
        loader.style.display = 'none';
        this.deleteSevi();
      });
    } else {
      this._opencard.progressNoteDiagnosis(req).then((data: any) => {
        this._router.navigate(['/reports/referral/family-preservation/progress-note-diagnosis/view']);
        swal('Success', 'Record has been saved!', 'success');
        loader.style.display = 'none';
        this.deleteSevi();
      });
    }

  }
  generateFISClientData() {
    let req, referralId;
    referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    req = { referralID: referralId, beginPagination: 1, endPagination: 10 };
    this._opencard.getFISClientByreferralId(req).then((data) => {
      this.fisClientData = data.ClientReferral;
    });
  }

  filteredFISClient(event: any) {
    this.metaData = [];
    this.fisClientData.filter((item) => {
      if (item.clientName.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  save(source) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.savePNDiagnosis(source).then(() => {
      loader.style.display = 'none';
      this.editControll = true;
      this.pnDiagnosisForm.disable();
      swal('Save', 'Progress Note Diagnosis Created', 'success');
      this._router.navigate(['/reports/referral/family-preservation/progress-note-diagnosis/view']);
    });
  }
  update(source) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.updatePNDiagnosis(source).then(() => {
      loader.style.display = 'none';
      this.editControll = true;
      this.pnDiagnosisForm.disable();
      swal('Update', 'Progress Note Diagnosis Updated', 'success');
      this._router.navigate(['/reports/referral/family-preservation/progress-note-diagnosis/view']);
    });
  }

  editForm() {
    this.pnDiagnosisForm.enable();
    this.isEdit = false;
  }

  formValidation() {
    this.pnDiagnosisForm = this._fb.group({
      'clientID': [null, Validators.compose([Validators.required])],
      'beginDate': [null],
      'endDate': [null],
      'principal': [null],
      'classificationID': [null],
      'isCode': [null],
      'diagnosisCode': [null, Validators.compose([Validators.required])],
      'clarification': [null, Validators.compose([Validators.required])],
      'diagnosisCodeID': [null, Validators.compose([Validators.required])],
    });
    this.progressNoteDiagnosis.beginDate = new Date(Date.now());
  }
  getMetaData(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case 'client':
        this.filteredFISClient(event);
        break;
      case 'diagnosisCode':
        metaDataReqObj = 'diagnosisCode';
        break;
    }
    if (metaDataReqObj) {
      metaDataReq = { Object: metaDataReqObj, value: event.query };
      this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
        this.metaData = data.dropDown;
      });
    }
  }

  getDetailsByRec() {
    // let loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    // let req = { progressNoteDiagnosisID: this._client.getId() }
    // this._opencard.getByIdPNDiagnosis(req).then((data) => {
    //   loader.style.display = 'none';
    //   this.editControll = true
    //   this.pnDiagnosisForm.disable();
    //   if (data.progressNoteDiagnosis.isActive) {
    //     !isNullOrUndefined(data.progressNoteDiagnosis.beginDate) ? data.progressNoteDiagnosis.beginDate = moment(data.progressNoteDiagnosis.beginDate).format('MM/DD/YYYY HH:mm') : null;
    //     !isNullOrUndefined(data.progressNoteDiagnosis.endDate) ? data.progressNoteDiagnosis.endDate = moment(data.progressNoteDiagnosis.endDate).format('MM/DD/YYYY HH:mm') : null;
    //   } else {
    //     !isNullOrUndefined(data.progressNoteDiagnosis.beginDate) ? data.progressNoteDiagnosis.beginDate = moment.utc(data.progressNoteDiagnosis.beginDate).format('MM/DD/YYYY HH:mm') : null;
    //     !isNullOrUndefined(data.progressNoteDiagnosis.endDate) ? data.progressNoteDiagnosis.endDate = moment.utc(data.progressNoteDiagnosis.endDate).format('MM/DD/YYYY HH:mm') : null;
    //   };
    //   !isNullOrUndefined(data.progressNoteDiagnosis.clientID) ? data.progressNoteDiagnosis.clientID['clientName'] = data.progressNoteDiagnosis.clientID.lastName + ',' + data.progressNoteDiagnosis.clientID.firstName : null;
    //   this.progressNoteDiagnosis = data.progressNoteDiagnosis;
    // })
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.seleceSpec = [];
    this.updatedProgressNoteDiagnosisSpecifier = [];
    this.updatedVal = [];
    this.updatedVal_spec = [];
    this.seviRemoVId = [];
    this.req = {
      progressNoteDiagnosisID: this._client.getId()
    };
    this._opencard.getProgressNoteDiagnosis(this.req).then((data: any) => {
      console.log('>>>>', data);
      // this.getSpecifiers(data.progressNoteDiagnosis.diagnosisCodeID);



      const req = { diagnosisCodeID: data.progressNoteDiagnosis.diagnosisCodeID.diagnosisCodeID };
      this._CaseTeamService.getDiagnosisCodeSpecifierSeverity(req).then((data_res) => {
        this.isEdit = true;
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.progressNoteDiagnosis.changedBy) ? data.progressNoteDiagnosis.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.progressNoteDiagnosis.changedDate) ? moment(data.progressNoteDiagnosis.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.progressNoteDiagnosis.enteredBy) ? data.progressNoteDiagnosis.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.progressNoteDiagnosis.enteredDate) ? moment(data.progressNoteDiagnosis.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

        const tempArr = data_res.diagnosisCodeSpecifierSeverity;
        const groupValues = tempArr.reduce((obj, item) => {
          obj[item.specifierID.specifier] = obj[item.specifierID.specifier] || [];
          obj[item.specifierID.specifier].push({
            severity: item.severityID.severity,
            severityID: item.severityID.severityID,
            specifierID: item.specifierID.specifierID,
            randomKey: shuffle(),
          });
          return obj;
        }, {});

        this.updatedVal = Object.keys(groupValues).map((key) => {
          return { specifier: key, severity: groupValues[key] };
        });

        console.log('this.updatedVal>>>>', JSON.stringify(this.updatedVal));

        //////
        !isNullOrUndefined(data.progressNoteDiagnosis.clientID) ? data.progressNoteDiagnosis.clientID['clientName'] = data.progressNoteDiagnosis.clientID.clientNameLastFirst : null;
        !isNullOrUndefined(data.progressNoteDiagnosis.diagnosisCodeID) ? data.progressNoteDiagnosis.diagnosisCodeID = {
          diagnosisCodeDescription: data.progressNoteDiagnosis.diagnosisCodeID.diagnosisCode + '-' + data.progressNoteDiagnosis.diagnosisCodeID.description,
          description: data.progressNoteDiagnosis.diagnosisCodeID.description,
          classificationID: data.progressNoteDiagnosis.diagnosisCodeID.classificationID
        } : null;
        if (data.progressNoteDiagnosis.isActive) {
          !isNullOrUndefined(data.progressNoteDiagnosis.beginDate) ? data.progressNoteDiagnosis.beginDate = moment(data.progressNoteDiagnosis.beginDate).format('MM/DD/YYYY HH:mm') : null;
          !isNullOrUndefined(data.progressNoteDiagnosis.endDate) ? data.progressNoteDiagnosis.endDate = moment(data.progressNoteDiagnosis.endDate).format('MM/DD/YYYY HH:mm') : null;
        } else {
          !isNullOrUndefined(data.progressNoteDiagnosis.beginDate) ? data.progressNoteDiagnosis.beginDate = moment.utc(data.progressNoteDiagnosis.beginDate).format('MM/DD/YYYY HH:mm') : null;
          !isNullOrUndefined(data.progressNoteDiagnosis.endDate) ? data.progressNoteDiagnosis.endDate = moment.utc(data.progressNoteDiagnosis.endDate).format('MM/DD/YYYY HH:mm') : null;
        }
        !isNullOrUndefined(data.progressNoteDiagnosis.referralID) ? data.progressNoteDiagnosis.referralID = data.progressNoteDiagnosis.referralID.referralID : null;
        // !isNullOrUndefined(data.progressNoteDiagnosis.diagnosisCodeID) ? data.progressNoteDiagnosis.classificationID = data.progressNoteDiagnosis.diagnosisCodeID.classificationID : null;
        !isNullOrUndefined(data.progressNoteDiagnosis.diagnosisCodeID.classificationID) ? data.progressNoteDiagnosis.classificationID = data.progressNoteDiagnosis.diagnosisCodeID.classificationID : null;
        this.progressNoteDiagnosis = data.progressNoteDiagnosis;
        this.progressNoteDiagnosis.isCode = 'code';

        ////

        const tempArr_spec = data.progressNoteDiagnosisSpecifier;
        const groupValues_spec = tempArr_spec.reduce((obj, item) => {
          obj[item.specifierID.specifier] = obj[item.specifierID.specifier] || [];
          obj[item.specifierID.specifier].push({
            severity: item.severityID.severity,
            severityID: item.severityID.severityID,
            specifierID: item.specifierID.specifierID,
            randomKey: shuffle(),
            progressNoteDiagnosisSpecifierID: item.progressNoteDiagnosisSpecifierID
          });
          return obj;
        }, {});

        this.updatedVal_spec = Object.keys(groupValues_spec).map((key) => {
          return { specifier: key, severity: groupValues_spec[key] };
        });
        this.updatedVal.map((ele, ky) => {

          this.updatedVal_spec.map((els) => {
            if (ele.specifier === els.specifier) {
              ele.severity.map((elsvi, key1) => {
                els.severity.map((elsvid) => {
                  if (elsvi.severityID === elsvid.severityID) {
                    elsvi['progressNoteDiagnosisSpecifierID'] = elsvid.progressNoteDiagnosisSpecifierID;
                    this.seleceSpec[elsvid.severityID + elsvid.specifierID + key1 + ky + elsvi.randomKey] = elsvid.severityID;
                  }
                });
              });
            }
          });
        });

      });
      console.log('this.updatedVal_spec>>>>', JSON.stringify(this.updatedVal_spec));



      loader.style.display = 'none';
    });
  }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/reports/referral/family-preservation/progress-note-diagnosis/detail') {
      this.url = '/reports/attachment-document/progress-notes-diagnosis';
    }

    return this._router.navigate([this.url]);
  }
  deleteWithCondition(arr, attr1, attr2, value1, value2) {
    let i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr1) && arr[i].hasOwnProperty(attr2)
        && (arguments.length > 2 && arr[i][attr1] === value1 && arr[i][attr2] === value2)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }  getByClassficationId(event) {
    const req = {
      classificationID: isNullOrUndefined(this.progressNoteDiagnosis.classificationID) ? null : this.progressNoteDiagnosis.classificationID.classificationID,
      beginDate: isNullOrUndefined(this.progressNoteDiagnosis.beginDate) ? null : Date.parse(this.progressNoteDiagnosis.beginDate)
    };
    this._CaseTeamService.getByClassficationId(req).then((data) => {
      this.metaData = data.diagnosisCodeList;
    });
  }
  getDiagnosisMetaData(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case 'client':
        this.filteredFISClient(event);
        break;
      case 'diagnosisCode':
        this.getByClassficationId(event);
        break;
      case 'classification':
        metaDataReqObj = 'classification';
        break;
    }
    if (metaDataReqObj) {
      metaDataReq = { Object: metaDataReqObj, value: event.query };
      this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
        data.dropDown.push({ classificationID: '', classification: 'All' });
        this.metaData = data.dropDown;
      });
    }
  }
  deleteSevi() {
    const dataDeletIDS = getUnique(this.seviRemoVId);
    const ids = dataDeletIDS.filter(function (el) {
      return el != null;
    });
    const req_Dara = {
      'progressNoteDiagnosisSpecifier': {
        'progressNoteDiagnosisSpecifierID': ids
      }
    };
    if (ids.length > 0) {
      this._opencard.deleteSevirty(req_Dara).then((data) => {
        console.log('Deleted');
      });
    }
  }
}
function shuffle() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x1000);
  }
  return (s4() + s4());
}
function getUnique(array) {
  const uniqueArray = [];
  let i;
  // Loop through array values
  for (i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}
