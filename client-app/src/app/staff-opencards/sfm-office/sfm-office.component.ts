import { Component, OnInit, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from '../../case-team/case-team.service'
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { SfmOffice } from './sfm-office';
import { ClildFormService } from '../../child-forms/child-forms.service';
import * as  moment from 'moment';
import {LocalValues} from '../../local-values';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../../pagesize/pagesize.service';

@Component({
  selector: 'app-sfm-office',
  templateUrl: './sfm-office.component.html',
  styleUrls: ['./sfm-office.component.scss']
})
export class SfmOfficeComponent implements OnInit {
  subtitle: any;
  formControl: any;
  editControll: boolean;
  Data;
  orgForm: FormGroup;
  quickMenu = "referrel";
  SfcsOfficer = [];
  SfcsOfficerType = [];
  showForm = false;
  caseTeamId;
  newForm = false;
  sfaofficeActivityID;
  SfaofficeData = [];
  SfaofficeTypeData = [];
  title = 'SFCS Office Activity';
  status = 'draft';
  breadcrumbs = [];
  results;
  edit;
  formStatus = 'draft';
  sfcs: SfmOffice = new SfmOffice();
  referralTypeId: any;
  discardTo = '/reintegration/referral/opencard/sfcs-office/view';
  url: any;
  isAttachmentRequired = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  currentOffice = "Primary";

  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  techCards = [
    { title: 'Primary Office', tip: 'Primary Office', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
    { title: 'Secondary Office', tip: 'Secondary Office', navigation: '/reports/staff/caseList', icon: this.iconurl + 'assessment icon.svg' },
  ];
  isDashboardWindow = true;
  isPopListWindow = false;

  isPopWindow = false;
  isPlesWait = false;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;

  @Output() closeModel = new EventEmitter<string>();
  @Output() jumpToTree = new EventEmitter();
  @Input() teamType: any;
  getByIdkey: any;
  defaultColDef: any;

  constructor(public _pageSize: PagesizeService, public formBuilder: FormBuilder,
    public router: Router,
    public _CaseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    // this.getAllListView(this.initial, this.end);
    this.editControll = false;

    this.formControl = false;
    this.editControll = false;
    this.formValidation();

    if (this.router.url.includes('/staff-opencards/sfm-office/primary-office')) {
      this.currentOffice = "Primary";
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'List', href: "/reports/staff", active: '' },
        { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
        { label: 'SFM Office List', active: '', href: '/staff-opencards/sfm-office/primary-office/view' },
        { label: 'SFM Office Form', active: 'active' },
      )
    }

    if (this.router.url.includes('/staff-opencards/sfm-office/secondary-office')) {
      this.currentOffice = "Secondary";
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'List', href: "/reports/staff", active: '' },
        { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
        { label: 'SFM Office List', active: '', href: '/staff-opencards/sfm-office/secondary-office/view' },
        { label: 'SFM Office Form', active: 'active' },
      )
    }




    if (this.router.url.includes('/staff-opencards/sfm-office/primary-office/detail')
      || this.router.url.includes('/staff-opencards/sfm-office/secondary-office/detail')) {
      this.getSfcsOfficerById();
      this.isAttachmentRequired = true;
    }

  }



  formValidation() {

    this.orgForm = this.formBuilder.group({
      'sfaOfficeID': [null, Validators.compose([Validators.required])],
      'staffSFAOfficeTypeID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'notes': [null]
    });
  }

  getSfaoffice(event) {
    let req = {
      "Object": "sfcsOffice",
      "value": event.query
    }
    this._CaseTeam.getSearchList(req).then(data => {
      this.SfaofficeData = data.dropDown;
      this.results = data.dropDown;
    })
  }

  getSfaofficeType(event) {
    let req = {
      "Object": "sfcsOfficeType",
      "value": event.query
    }
    this._CaseTeam.getSearchList(req).then(data => {
      this.SfaofficeTypeData = data.dropDown;
      this.results = data.dropDown;
    })
  }

  goBack() {
    this.router.navigateByUrl('/reports/sfcsOfficer');
  }

  addPost(source) {
    console.log('source is', source)
    if (this.orgForm.valid) {
      let referralId;
      referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();

      !isNullOrUndefined(source.beginDate) ? source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate)) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate)) : null;
      // !isNullOrUndefined(source.staffSFAOfficeTypeID) ? source.staffSFAOfficeTypeID = source.staffSFAOfficeTypeID.staffSFAOfficeTypeID : null;
      // Need to check issue with backend team

      if (this.teamType == "Secondary Office") {
        source.staffSFAOfficeTypeID = 2;
      }
      else if (this.teamType == "Primary Office") {
        source.staffSFAOfficeTypeID = 1;
      }
      // source.staffSFAOfficeTypeID = 1;
      !isNullOrUndefined(source.sfaOfficeID) ? source.sfaOfficeID = source.sfaOfficeID.SFAOfficeID : null;

      source['staffID'] = parseInt(localStorage.getItem('staffIdPerson'));

      this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
      console.log('source is', source)
      if (source.staffSFAOfficeID) {
        this.updateSfcsOfficer(source);
      } else {
        this.saveSfcsOfficer(source);
      }
    }
    else {
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }




  }

  saveSfcsOfficer(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._CaseTeam.saveStaffSfcsOfficer(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.isPopWindow = false;
        this.sfcs = data.staffSFAOffice;
        swal('Success', 'SFM Office saved successfully', 'success');
        this.getAllListView(this.initial, this.end);
        this.initializeComponent();
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.sfcs = new SfmOffice();
      }

      // this.editControll = true;
      // this.edit = true;

      // this.orgForm.disable();
      // if (this.currentOffice == "Secondary") {
      //   return this.router.navigate(['/staff-opencards/sfm-office/secondary-office/view']);
      // }
      // else if (this.currentOffice == "Primary") {
      //   return this.router.navigate(['/staff-opencards/sfm-office/primary-office/view']);
      // }
    })
  }

  updateSfcsOfficer(post) {
    let updateRequest = {
      staffSFAOfficeID: post.staffSFAOfficeID,
      sfaOfficeID: post.sfaOfficeID,
      beginDate: post.beginDate,
      endDate: post.endDate,
      notes: post.notes,
      staffID: post.staffID,
      staffSFAOfficeTypeID: post.staffSFAOfficeTypeID

    }
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._CaseTeam.updateStaffSfcsOfficer(updateRequest).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.isPopWindow = false;
        swal('Success', 'Sfcs Office updated successfully', 'success')
        this.getAllListView(this.initial, this.end);
        this.initializeComponent();
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.sfcs = new SfmOffice();
      }


      // this.edit = true;
      // this.orgForm.disable();
      // if (this.currentOffice == "Secondary") {
      //   return this.router.navigate(['/staff-opencards/sfm-office/secondary-office/view']);
      // }
      // else if (this.currentOffice == "Primary") {
      //   return this.router.navigate(['/staff-opencards/sfm-office/primary-office/view']);
      // }

    })
  }

  getSfcsOfficerById() {
    this.editControll = true;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let staffSFAOfficeID = this.getByIdkey;

    // this.req = { "staffSFAOfficeID": this._client.getId() };
    this.req = { "staffSFAOfficeID": staffSFAOfficeID };
    this._CaseTeam.getStaffSfcsOfficerById(this.req).then(data => {
      this.isPopWindow = true;

      this._localValues.deleteRequestKey = data.staffSFAOffice.staffSFAOfficeID;
      this._localValues.deleteRequestNode = this.teamType;


      // this._localValues.deleteRequestKey = data.staffSFAOffice.staffSFAOfficeID;
      data.staffSFAOffice.beginDate = (data.staffSFAOffice.beginDate) ? new Date(data.staffSFAOffice.beginDate) : null;
      data.staffSFAOffice.endDate = (data.staffSFAOffice.endDate) ? new Date(data.staffSFAOffice.endDate) : null;
      data.staffSFAOffice.sfaOfficeID = (data.staffSFAOffice.sfaofficeID) ? { SFAOfficeID: data.staffSFAOffice.sfaofficeID.sfaofficeID, Name: data.staffSFAOffice.sfaofficeID.officeName } : null;
      data.staffSFAOffice.notes = (data.staffSFAOffice.notes) ? data.staffSFAOffice.notes : null;
      loader.style.display = 'none';
      this.sfcs = data.staffSFAOffice;
      console.log('sfcs', this.sfcs)
      this.editControll = true;
      this.orgForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.staffSFAOffice.changedBy) ? data.staffSFAOffice.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.staffSFAOffice.changedDate) ? moment(data.staffSFAOffice.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.staffSFAOffice.enteredBy) ? data.staffSFAOffice.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.staffSFAOffice.enteredDate) ? moment(data.staffSFAOffice.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.orgForm.enable();
    this.editControll = false;
  }

  /**
  * Get the metadata for dropdowns
  */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq
    switch (label) {
      case 'office':


        metaDataReq = { Object: metaDataObj, value: event.query }
        this._CaseTeam.getSFAOfficeDropDown().then(data => {
          this.results = data.officeList;
        })

        break;
      case 'officeType':
        metaDataObj = "staffSFAOfficeType";
        if (metaDataObj) {
          metaDataReq = { Object: metaDataObj, value: event.query }
          this._CaseTeam.getSearchList(metaDataReq).then(data => {
            this.results = data.dropDown;
          })
        }
        break;
    }

  }

  navigateTo() {

    let currentURL = this.router.url;
    if (currentURL == '/reintegration/referral/opencard/sfcs-office/new' || currentURL == '/reintegration/referral/opencard/sfcs-office/detail') {
      this.url = '/reports/attachment-document/rfc/sfcs-office';
    }
    else {
      this.url = '/reports/attachment-document/sfcs-office';
    }
    return this.router.navigate([this.url])
  }

  ngOnDestroy() {
    this._localValues.deleteRequestKey = null;
    this._localValues.deleteRequestNode = null;
  }

  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

  showSaveModel() {
    this.isPopWindow = true;
    this.editControll = false;
    this.orgForm.enable();

    this.sfcs = new SfmOffice();

  };


  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;

    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = 100;
      return this.getAllListView(this.initial, this.end);
    }
  }

  getAllListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req;
    if (this.teamType == 'Primary Office') {
      me_Req = {
        "staffID": parseInt(localStorage.getItem('staffIdPerson')),
        "beginPagination": initial,
        "endPagination": 100,
        "staffSFAOfficeTypeID": 1
      };
    }
    else if (this.teamType == 'Secondary Office') {
      me_Req = {
        "staffID": parseInt(localStorage.getItem('staffIdPerson')),
        "beginPagination": initial,
        "endPagination": 100,
        "staffSFAOfficeTypeID": 2
      };
    }

    // if (this.teamType == 'Primary Office') {
    this._opencard
      .listOfStaffPrimaryOffice(me_Req)
      .then(data => {
        this.isPlesWait = false;
        this.generateListView(data);
        loader.style.display = "none";
      });
    // }
    // else if (this.teamType == 'Secondary Office') {
    //   this._opencard
    //     .listOfStaffAssignedComplianceTech(me_Req)
    //     .then(data => {
    //       this.isPlesWait = false;
    //       this.generateListView(data);
    //       loader.style.display = "none";
    //     });
    // }

  };

  generateListView(data) {
    console.log("data in generateListView is", data);
    let rowData = [];
    let test = [];
    this.totalCount = data.totalCount;
    // if (this.teamType == 'Compliance Tech') {
    //   this.rowData = data.staffComplianceTechTeamMembers;
    // }
    // else if (this.teamType == 'Assigned Compliance Tech') {
    //   this.rowData = data.staffComplianceTech;
    // }
    this.rowData = data.staffSFAOffices;
    console.log("This row data", this.rowData);
    if (this.rowData && this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a['order'] - b['order']);
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  };

  onRowSelected(event) {
    this.isPopWindow = false;

    this.editControll = true;

    this.getByIdkey = event.data.staffSFAOfficeID;


    this.orgForm.disable();

    this.getSfcsOfficerById();
  };

  discardForm() {
    this.isPopWindow = false;

  }

  afterDelete() {
    this.isPopWindow = false;
    this.getAllListView(this.initial, this.end);
    this.initializeComponent();
  }

  initializeComponent() {
    this._localValues.deleteRequestKey = null;
    this._localValues.deleteRequestNode = null;
    this.ngOnInit();
  }

  openPopUp(label: any) {

    switch (label.title) {
      case 'Primary Office':
        this.teamType = 'Primary Office';
        this.isPopListWindow = true;

        break;

      case 'Secondary Office':
        this.teamType = 'Secondary Office';
        this.isPopListWindow = true;

        break;

    }
    this.getAllListView(this.initial, this.end);
    this.editControll = false;
    // this.isDashboardWindow = false;
  }

  closeDashboard() {
    this.isDashboardWindow = false;
    this.ngOnInit();
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

}
