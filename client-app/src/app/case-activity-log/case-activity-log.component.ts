import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import * as moment from 'moment';
import { CaseActivityLog } from '../case-activity-log/case-activity-log';
import {LocalValues} from '../local-values';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import { PagesizeService } from '../pagesize/pagesize.service';

@Component({
  selector: 'app-case-activity-log',
  templateUrl: './case-activity-log.component.html',
  styleUrls: ['./case-activity-log.component.scss']
})

export class CaseActivityLogComponent implements OnInit {

  totalCount: any;
  initial = 1;
  end = 100;

  breadcrumbs: any = [];
  logData = [];
  metaData = [];
  filteredSelectedOrder = [];
  selectedCities2 = []
  selectedOrder = [
    { value: "ClientAndDate", view: "Client And Date" },
    { value: "beginDate", view: "Begin Date" },
    { value: "staffName", view: "Staff Name" },
  ];
  caseActivityLog: CaseActivityLog = new CaseActivityLog();
  isProvider = true;
  isCaseHead = false;
  isClearEnable = false;
  isClientFieldChecked = false;
  caseHead: any;
  display: boolean = false;
  logHeaders = [];
  ofCchecked = [];
  logColumns = [];
  defaultColumn: any;
  listQuery: any;
  isExport = false;
  selectedClient: any;
  selectedReferral: any;
  isAddNewCaseActivity = false;
  caseActivityData = [];

  isLogRefreshed = false;
  renderTimeInMinutes: any;
  isPrintDialogOpened = false;
  isCaseActivityOptionSelected = true;
  isNTFFOptionSelected = false;
  isProgressNotesOptionSelected = false;
  isPrintDisabled = false;
  isCaseActivityAllowed = false;
  isNTFFAllowed = false;
  isProgressNotesAllowed = false;

  constructor(public _localValues: LocalValues, public _openCard: OpencardsService,
    public _caseTeam: CaseTeamService, public _router: Router, public _pageSize: PagesizeService) { }

  ngOnInit() {
    this.caseActivityLog.referralTypeID = {
      "referralTypeID": null,
      "beginDate": null,
      "contract_StateID": null,
      "description": "All",
      "endDate": null,
      "isContract": null,
      "isHasPlacements": null,
      "referralType": "All",
      "createdDate": null,
      "updatedDate": null,
      "lastModifiedDate": null,
      "isActive": null,
      "isDeleted": null
    }
    this.breadcrumbs.push(
      { label: 'Case Activity Log', active: 'active' },
    )
    this.caseActivityLog.begindate = this._localValues.beginDateOfCurrentMonth;
    this.caseActivityLog.endDate = this._localValues.endDateOfCurrentMonth;
    this.caseActivityLog.orderBy = { value: "ClientAndDate", view: "Client And Date" }
    this.defaultColumn = {
      width: 100,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    };
    this.sf_office("");
  }


  showDialog() {
    this.caseActivityLog.begindate = new Date(this.caseActivityLog.begindate);
    this.caseActivityLog.endDate = new Date(this.caseActivityLog.endDate);
    this.display = true;
  }

  getMetaData(event: any, label: any) {
    let object: any, req: any;
    switch (label) {
      case 'staff':
        object = 'staff';
        break;
      case 'client':
        object = 'client';
        break;
      case 'provider':
        object = 'provider';
        break;
      case 'procode':
        object = 'procode';
        break;
      case 'referralType':
        object = 'referralType';
        break;
    }
    req = { Object: object, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      if (label == 'staff') {
        data.dropDown.filter((item: any) => {
          return item['staffName'] = item.lastName + ', ' + item.firstName;
        })
      }
      if (label == 'client') {
        data.dropDown.filter((item: any) => {
          return !isNullOrUndefined(item.ssn) ? item.ssn = item.ssn.replace(/.(?=.{4})/g, 'X') : 'No record not found!';
        })
      } if (label == 'referralType') {
        var all_data = {
          "referralTypeID": null,
          "beginDate": null,
          "contract_StateID": null,
          "description": "All",
          "endDate": null,
          "isContract": null,
          "isHasPlacements": null,
          "referralType": "All",
          "createdDate": null,
          "updatedDate": null,
          "lastModifiedDate": null,
          "isActive": null,
          "isDeleted": null
        }

        data.dropDown.unshift(all_data);
      }
      this.metaData = data.dropDown;
    })
  }

  convertClientDob(dob: any) {
    return dob !== null ? moment.utc(dob).format('MM/DD/YYYY') : null;
  }

  filterSelectedOrder(event: any) {
    this.filteredSelectedOrder = [];
    this.selectedOrder.filter((item: any) => {
      if (item.value.toLowerCase().indexOf(event.query) !== -1) {
        return this.filteredSelectedOrder.push(item);
      }
    })
  }

  clientFieldsCheck(field: string) {
    this.isClientFieldChecked = false;
    if (field == 'caseHead' && (this.caseActivityLog.clientID !== "" && this.caseActivityLog.clientID !== undefined)) {
      swal('Info', 'You must enter only a client or case head not both!', 'info').then(() => {
        this.isClearEnable = true;
      })
      return this.isClientFieldChecked = true;
    } else if (field == 'client' && (this.caseHead !== "" && this.caseHead !== undefined)) {
      swal('Info', 'You must enter only a client or case head not both!', 'info').then(() => {
        this.isClearEnable = true;
      })
      return this.isClientFieldChecked = true;
    } else {
      return this.isClientFieldChecked = false;
    }
  }

  caseHeadFieldApperance(event: any) {
    let referralType = event.referralType;
    if (referralType == 'NC-FI') {
      this.isProvider = false;
      this.isCaseHead = true;
    } else {
      this.isProvider = true;
      this.isCaseHead = false;
    }
  }

  clearDepedentedFields(field: string) {
    if (field == 'caseHead') {
      this.caseHead = '';
      this.isClearEnable = false;
    } else {
      this.caseActivityLog.clientID = '';
      this.isClearEnable = false;
    }
  };
  exportDatas: any;
  exportLog() {
    let req = {
      query: this.listQuery,
      userId: parseInt(localStorage.getItem('userId')) - this._openCard.getHasKey() | 4621,
      reportName: 'Case Activity Log',
      fileType: 'csv'
    }
    this._openCard.export(req).then((data: any) => {
      // swal('Success', data.responseMessage, 'info').then(() => {
      //   this._router.navigate([]).then(result => {
      //     window.open('/myExports', '_blank')
      //   })
      // })
    })
  }
  isGetResponse = false;
  getLogResult(begin, end) {
    let loader = document.getElementById('loading-overlay-log') as HTMLElement
    loader.style.display = 'block';

    var storedata = {
      'begindate': this.caseActivityLog.begindate,
      'endDate': this.caseActivityLog.endDate,
      'staffID': this.caseActivityLog.staffID,
      'clientID': this.caseActivityLog.clientID,
      'procodeID': this.caseActivityLog.procodeID,
      'providerID': this.caseActivityLog.providerID,
      'referralTypeID': this.caseActivityLog.referralTypeID,
      'orderBy': this.caseActivityLog.orderBy,
    };

    !isNullOrUndefined(this.caseActivityLog.begindate) ?
      this.caseActivityLog.begindate = this._localValues.stringFormatDate(Date.parse(this.caseActivityLog.begindate)) : null;
    !isNullOrUndefined(this.caseActivityLog.endDate) ?
      this.caseActivityLog.endDate = this._localValues.stringFormatDate(Date.parse(this.caseActivityLog.endDate)) : null;
    !isNullOrUndefined(this.caseActivityLog.staffID) ? this.caseActivityLog.staffID = this.caseActivityLog.staffID.staffID : null;
    !isNullOrUndefined(this.caseHead) ? this.caseActivityLog.clientID = this.caseHead.clientID.clientID : this.caseActivityLog.clientID;
    !isNullOrUndefined(this.caseActivityLog.procodeID) ? this.caseActivityLog.procodeID = this.caseActivityLog.procodeID.procodeID : null;
    !isNullOrUndefined(this.caseActivityLog.providerID) ? this.caseActivityLog.providerID = this.caseActivityLog.providerID.providerID : null;
    !isNullOrUndefined(this.caseActivityLog.referralTypeID) ? this.caseActivityLog.referralTypeID = this.caseActivityLog.referralTypeID.referralTypeID : null;
    !isNullOrUndefined(this.caseActivityLog.orderBy) ? this.caseActivityLog.orderBy = this.caseActivityLog.orderBy.value : null;
    !isNullOrUndefined(this.caseActivityLog.clientID) ? this.caseActivityLog.clientID = this.caseActivityLog.clientID.clientID : null;

    var req = {
      "limitSelection": this.getNullValue(this.caseActivityLog.limitSelection),
      "staffID": this.getNullValue(this.caseActivityLog.staffID),
      "begindate": this._localValues.report_begin_dateAndTime(this.caseActivityLog.begindate),
      "endDate": this._localValues.report_end_dateAndTime(this.caseActivityLog.endDate),
      "referralTypeID": this.getNullValue(this.caseActivityLog.referralTypeID),
      "clientID": this.getNullValue(this.caseActivityLog.clientID),
      "procodeID": this.getNullValue(this.caseActivityLog.procodeID),
      "providerID": this.getNullValue(this.caseActivityLog.providerID),
      "notes": this.getNullValue(this.caseActivityLog.notes),
      "sfaOfficeID": this.getNullValue(this.seleceOfc.toString()),
      "orderBy": this.getNullValue(this.caseActivityLog.orderBy),
      "beginPagination": begin,
      "endPagination": end,
      "isPrint": false,
      "userID": parseInt(localStorage.getItem('UserId')) || 4620,
      "filter": null,
      "filename":null,
    };
    // var req = {
    //   "begindate": "2000-11-13 00:00:00.000",
    //   "endDate": "2020-11-13 00:00:00.000",
    //   "limitSelection": "Staff Cases",
    //   "staffID": 317,
    //   "referralTypeID": 1,
    //   "clientID": 2008,
    //   "procodeID": 106,
    //   "providerID": null,
    //   "notes": null,
    //   "sfaOfficeID": "6",
    //   "orderBy": "ClientAndDate",
    //   "beginPagination": begin,
    //   "endPagination": end,
    //   "isPrint": false,
    //   "filter": null,
    //   'filename': null,
    //   "userID": parseInt(localStorage.getItem('UserId')) || 4620,
    // }
    this.exportDatas = req;

    console.log("this.req>>>", req);
    this.display = false;
    this._openCard.getcaseActivityLogSearch(req).then((data: any) => {
      loader.style.display = 'none';
      // this.display = true;
      if (data.caseActivityLogSearch === 0) {
        loader.style.display = 'none';
        return swal('Records', 'No Data Found!.', 'warning');
      } else {
        data.caseActivityLogSearch.map(itm => {
          delete itm["CaseActivityID"];
          delete itm["StaffID"];
          delete itm["ClientID"];
          delete itm["ReferralID"];
          delete itm["ReferralTypeID"];
          delete itm["SFAOfficeID"];
          delete itm["ProcodeID"];
          delete itm["CaseID"];
          delete itm["PersonTypeID"];
          delete itm["ProviderID"];
          delete itm["Contract_StateID"];
          delete itm["ClientName"];
          delete itm["StaffName"];
          delete itm["ReferralDescription"];
          delete itm["Facts"];
        });
        this.logData = data.caseActivityLogSearch;
        this.totalCount = data.totalCount;
        if (data.totalCount < 100) {
          this.end = this.totalCount;
        };
        this.caseActivityData = this.logData;
        this.isLogRefreshed = true;
        this.listQuery = data.query;
        this.generateList();
        this.isExport = true;
        this.isGetResponse = true;
        this.caseActivityLog.begindate = storedata.begindate;
        this.caseActivityLog.endDate = storedata.endDate;
        this.caseActivityLog.staffID = storedata.staffID;
        this.caseActivityLog.clientID = storedata.clientID;
        this.caseActivityLog.procodeID = storedata.procodeID;
        this.caseActivityLog.providerID = storedata.providerID;
        this.caseActivityLog.referralTypeID = storedata.referralTypeID;
        this.caseActivityLog.orderBy = storedata.orderBy;
      }

    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  }

  getNullValue(data) {
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  generateList() {
    let rawData = [], processData = [];
    if (this.logData.length > 0) {
      this.logHeaders.push(Object.keys(this.logData[0]));
      this.logHeaders[0].forEach((item: any) => {
        let data = { headerName: item, field: item, resizable: false };
        processData.push(data);
      })
      rawData.push(processData)
      this.logColumns = rawData[0];
      this.logColumns.map(data => {
        if (data.field == 'beginDate' ||
          data.field == 'endDate' ||
          data.field == 'ReferralDate' ||
          data.field == 'referralDate' ||
          data.field == 'BilledDate' ||
          data.field == 'ClosureDate' ||
          data.field == 'closureDate' ||
          data.field == 'enteredDate' ||
          data.field == 'EnteredDate' || data.field == 'Begin Date' ||
          data.field == 'Closure Date' ||
          data.field == 'End Date' ||
          data.field == 'Entered Date' ||
          data.field == 'Referral Date' ||
          data.field == 'Closure Date') {
          data['valueFormatter'] = function (params) {
            if (params.value) {
              return moment.utc(params.value).format('MM/DD/YYYY HH:mm');
            } else {
              return "";
            }
          };
        }

      })
    }
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  suggestedReferralForClient(event: any) {
    let navigateURL: any;
    localStorage.removeItem('referralId');
    localStorage.removeItem('referralTypeId');
    localStorage.removeItem('clientId');
    localStorage.setItem('referralId', event.referralID.referralID + this._openCard.hashKey);
    localStorage.setItem('referralTypeId', event.referralID.referralTypeID.referralTypeID + this._openCard.hashKey);
    localStorage.setItem('clientId', event.clientID + this._openCard.hashKey);
    this._localValues.isNavigateToCAL = true;
    if (event.referralID.referralTypeID.referralTypeID !== 1) {
      navigateURL = '/reports/referral/family-preservation/case-activity/new';
    } else {
      navigateURL = '/reintegration/referral/opencard/case-activity/new';
    }
    return this._router.navigate([navigateURL]).then(() => {
      let closeBtn = document.getElementById("closeBtn") as HTMLElement;
      closeBtn.click();
    })
  }

  navigate() {
    return event;
  }

  async download() {
    let data: any
    let scaleY = -50;
    let renderTime = 3000;
    let scaleX = 0;
    if (this.caseActivityData.length > 30 && this.caseActivityData.length <= 48) {
      scaleY = -100;
    } else if (this.caseActivityData.length > 48) {
      scaleX = 15;
      scaleY = 0;
      renderTime = 3000;
    }
    let opt = {
      margin: 1,
      filename: 'SFM_Francis.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { dpi: 72, letterRendering: true, y: scaleY },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    if (this.caseActivityData.length < 48) {
      let element = document.getElementById('img').innerHTML;
      data = html2pdf().from(element).set(opt);
      setTimeout(() => {
        data.save();
      }, renderTime)
    } else if (this.caseActivityData.length > 48) {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      const doc = new jsPDF(opt.jsPDF);
      const pageSize = jsPDF.getPageSize(opt.jsPDF);

      for (let i = 0; i < this.caseActivityData.length; i++) {
        const elementId = 'img' + i;
        const page = document.getElementById(elementId).innerHTML;
        const pageImage = await html2pdf().from(page).set(opt).outputImg();
        if (i != 0) {
          doc.addPage();
        }
        doc.addImage(pageImage.src, 'jpeg', 0, 0, pageSize.width, pageSize.height);
      }
      doc.save('SFM_Francis.pdf');
      loader.style.display = "none";
    }

  }

  printExecution() {
    this.isPrintDialogOpened = false;
    this.checkCaseActivityLogOptions();
    let loader = document.getElementById("loading-overlay-log") as HTMLElement;
    loader.style.display = "block";
    this.isAddNewCaseActivity = false;

    let renderTime: any;

    if (this.caseActivityData.length < 20) {
      renderTime = 60000;
    }
    else if (this.caseActivityData.length >= 20 && this.caseActivityData.length < 110) {
      renderTime = 420000;
    }
    else if (this.caseActivityData.length >= 110 && this.caseActivityData.length < 200) {
      renderTime = 720000;
    }
    else if (this.caseActivityData.length >= 200 && this.caseActivityData.length < 500) {
      renderTime = 1800000;
    }
    else {
      renderTime = 3600000;
    }

    setTimeout(() => {

      // let printContents: any;
      // if (this.isCaseActivityAllowed) {
      //   printContents = document.getElementById('img').innerHTML;
      // }
      // else {
      //   printContents = document.getElementById('formWithoutCaseActivity').innerHTML;
      // }
      let printContents = document.getElementById('img').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      loader.style.display = "none";
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }, renderTime)

  }

  printDialogOptions() {
    this.isPrintDialogOpened = true;

  }
  clearForm() {
    this.caseActivityLog.referralTypeID = {
      "referralTypeID": null,
      "beginDate": null,
      "contract_StateID": null,
      "description": "All",
      "endDate": null,
      "isContract": null,
      "isHasPlacements": null,
      "referralType": "All",
      "createdDate": null,
      "updatedDate": null,
      "lastModifiedDate": null,
      "isActive": null,
      "isDeleted": null
    };
    this.caseActivityLog.begindate = this._localValues.beginDateOfCurrentMonth;
    this.caseActivityLog.endDate = this._localValues.endDateOfCurrentMonth;
    this.caseActivityLog.orderBy = { value: "ClientAndDate", view: "Client And Date" };
    this.caseActivityLog.referralTypeID = {};
    this.seleceOfc = [];
    this.ofCchecked = [];
    this.caseActivityLog.notes = "";
    this.caseActivityLog.providerID = {};
    this.caseActivityLog.clientID = {};
    this.caseActivityLog.procodeID = {};
    this.caseActivityLog.staffID = {};
  }
  discardBtn() {
    this.isPrintDialogOpened = false;
  }

  checkCaseActivityLogOptions() {

    let caseActivityString = (this.isCaseActivityOptionSelected) ? 'T' : 'F';
    let ntffString = (this.isNTFFOptionSelected) ? 'T' : 'F';
    let progressNotesString = (this.isProgressNotesOptionSelected) ? 'T' : 'F';

    let totalString = caseActivityString + ntffString + progressNotesString;

    switch (totalString) {
      case 'TTT':
        this.isCaseActivityAllowed = true;
        this.isNTFFAllowed = true;
        this.isProgressNotesAllowed = true;
        break;

      case 'TTF':
        this.isCaseActivityAllowed = true;
        this.isNTFFAllowed = true;
        this.isProgressNotesAllowed = false;
        break;

      case 'TFT':
        this.isCaseActivityAllowed = true;
        this.isNTFFAllowed = false;
        this.isProgressNotesAllowed = true;
        break;

      case 'FTT':
        this.isCaseActivityAllowed = false;
        this.isNTFFAllowed = true;
        this.isProgressNotesAllowed = true;
        break;

      case 'TFF':
        this.isCaseActivityAllowed = true;
        this.isNTFFAllowed = false;
        this.isProgressNotesAllowed = false;
        break;

      case 'FFT':
        this.isCaseActivityAllowed = false;
        this.isNTFFAllowed = false;
        this.isProgressNotesAllowed = true;
        break;

      case 'FTF':
        this.isCaseActivityAllowed = false;
        this.isNTFFAllowed = true;
        this.isProgressNotesAllowed = false;
        break;

      case 'FFF':
        this.isCaseActivityAllowed = false;
        this.isNTFFAllowed = false;
        this.isProgressNotesAllowed = false;
        break;

    }
  }
  SelectedActivity: string[] = ['Case Activity'];
  print() {
    let activityDatas = this.SelectedActivity.toString();
    var newStr = activityDatas.replace(/,/g, " AND ");
    let req = this.exportDatas;
    req.isPrint = true;
    req.isExport = false;
    req.filter = newStr;
    this._openCard.getcaseActivityLogSearch(req).then((data: any) => {
      swal('Success!', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
      this.display = false;
      this.isPrintDialogOpened = false;
    })
  };
  current_Date = moment(Date.now()).format('MM-DD-YYYY');
  export() {
    let req = this.exportDatas;
    req.isExport = true;
    req.filter = null;
    req.fileName = "Case Activity Log " + this.current_Date

    this._openCard.getcaseActivityLogSearch(req).then((data: any) => {
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    })
  };
  allLimits = [];
  getLimit(ev) {
    this.allLimits = ['All', 'Staff Cases', 'Staff Entries', 'Staff Entered Date']
  };
  allOffice = []
  sf_office(event) {
    console.log('event>>>>', event);
    let req = { Object: "sfcsOffice", value: event }
    this._caseTeam.getSearchList(req).then((data) => {
      this.allOffice = data.dropDown;
    })
  };
  sh_drop = false;
  muteStream() {
    this.sh_drop = !this.sh_drop;
  };
  seleceOfc = [];
  selectOFC(eve, data) {
    if (eve) {
      this.seleceOfc.push(data.sfaofficeID)
    } else {
      for (var i = 0; i < this.allOffice.length; i++) {
        if (this.seleceOfc[i] == data.sfaofficeID) {
          this.seleceOfc.splice(i, 1);
        }
      }
    };
  };
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getLogResult(this.initial, this.end);
    }
  }
}
