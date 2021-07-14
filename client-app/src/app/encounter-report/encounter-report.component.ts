import { Component, OnInit } from '@angular/core';
import { EncounterReport } from './encounter-report';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
@Component({
  selector: 'app-encounter-report',
  templateUrl: './encounter-report.component.html',
  styleUrls: ['./encounter-report.component.scss']
})
export class EncounterReportComponent implements OnInit {
  mainTabs = [];
  sIndex: number = null;
  dateValue: any;
  property: any;
  report: EncounterReport = new EncounterReport();
  metaData = [];
  payor = [];
  reportError = [];
  reportActual = [];
  actualColumnDefs = [];
  actualDefaultColDef: any;
  actualReportHeaders = [];
  actualRowData = [];
  errorColumnDefs = [];
  errorDefaultColDef: any;
  errorReportHeaders = [];
  errorRowData = [];
  reportSP: any;
  payorId: any;
  runReportRowData = [];
  runReportColumnDefs = [];
  runReportDefaultColDef: any;
  displayDialog: boolean;
  isSubmissionCheck: boolean;
  isPayor: boolean;
  reloadSubmissionRowData = [];
  reloadSubmissionColumnDefs = [];
  reloadSubmissionDefaultColDef: any;
  isReloadSubmissionTable: boolean = false;
  ScriptsBatchID: any;
  currentDate: any;
  postCreateFiletActual = [];
  head = [];
  displayPostCreateTxt: boolean;
  rowHeaders = [];
  createText: any;
  isErrorOnly = false;
  encounterReportActualTotalCount = 0;
  encounterReportErrorTotalCount = 0;

  constructor(public _client: ClildFormService, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.actualDefaultColDef = {
      width: 100,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    };
    this.errorDefaultColDef = {
      width: 100,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    };
    this.runReportDefaultColDef = {
      width: 100,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    };
    this.reloadSubmissionDefaultColDef = {};
    this.defineMainTabs();
    this.setIndex(0);
    this.reportDateAutomation();
    this.payor = [
      { payorID: 144, payorName: 'Saint Francis Reintegration - Wichita Region' },
      { payorID: 142, payorName: 'Saint Francis Reintegration - West Region' },
    ]
    this.currentDate = new Date();
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Scripts', href: '#nav-sec1' },
      { label: 'Error', href: '#nav-sec2' },
    ]
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  processingReport(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let temp: string;
    temp = JSON.stringify(source).replace(/true/g, '1');
    source = JSON.parse(temp);
    let month = new Date(source.submitDate).getMonth() + 1
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.submitDate) ? source.submitDate = new Date(source.submitDate).getFullYear() +
      '-' + month.toString() + '-' + new Date(source.submitDate).getDate() : null;
    !isNullOrUndefined(source.payorID) ? source.payorID = source.payorID.payorID : null;
    if (this.isErrorOnly) { source.errorsOnly = 1 } else { source.errorsOnly = 0 }
    this._client.getEncounterReports(source).then((data: any) => {
      loader.style.display = 'none';
      data.encounterReportActual.map((item: any) => {
        !isNullOrUndefined(item.BeginDate) ? item.BeginDate = new Date(item.BeginDate).toLocaleDateString() : null;
        !isNullOrUndefined(item.DOB) ? item.DOB = new Date(item.DOB).toLocaleDateString() : null;
        !isNullOrUndefined(item.EndDate) ? item.EndDate = new Date(item.EndDate).toLocaleDateString() : null;
      });
      data.encounterReportError.map((item: any) => {
        !isNullOrUndefined(item.BeginDate) ? item.BeginDate = new Date(item.BeginDate).toLocaleDateString() : null;
        !isNullOrUndefined(item.DOB) ? item.DOB = new Date(item.DOB).toLocaleDateString() : null;
        !isNullOrUndefined(item.EndDate) ? item.EndDate = new Date(item.EndDate).toLocaleDateString() : null;
      });
      this.reportActual = data.encounterReportActual;
      this.reportError = data.encounterReportError;
      this.encounterReportErrorTotalCount = data.encounterReportErrorTotalCount;
      this.encounterReportActualTotalCount = data.encounterReportActualTotalCount;
      this.generateTableViews(this.reportActual, this.reportError);
    })
  }

  generateTableViews(actualTableData: any, errorTableData: any) {
    let actualTest = [], actualRawData = [], errorTest = [], errorRawData = [];
    this.actualRowData = actualTableData;
    this.errorRowData = errorTableData;
    if (actualTableData.length > 0) {
      this.actualReportHeaders.push(Object.keys(actualTableData[0]))
      this.actualReportHeaders[0].forEach((item: any) => {
        let data = { headerName: item, field: item }
        actualTest.push(data);
      })
      actualRawData.push(actualTest);
      this.actualColumnDefs = actualRawData[0];
    }

    if (errorTableData.length > 0) {
      this.errorReportHeaders.push(Object.keys(errorTableData[0]))
      this.errorReportHeaders[0].forEach((item: any) => {
        let data = { headerName: item, field: item }
        errorTest.push(data);
      })
      errorRawData.push(errorTest);
      this.errorColumnDefs = errorRawData[0];
    }
  }

  reportDateAutomation() {
    let date = new Date();
    this.report.beginDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.report.endDate = new Date(date.getFullYear(), date.getMonth(), 0);
    this.report.submitDate = new Date(date.getFullYear(), date.getMonth(), 25);
  }

  filterPayor(event: any) {
    this.metaData = [];
    this.payor.filter((item: any) => {
      if (item.payorName.toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item)
      }
    })
  }

  runReport(event) {
    let request = { 'Object': 'runReport', 'value': event.query };
    this._caseTeam.getSearchList(request).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  getReportSp(event) {
    this.reportSP = event.storedProcedure;
  }

  generateRunReport() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = {
      'beginDate': Date.parse(this.report.beginDate),
      'endDate': Date.parse(this.report.endDate),
      'referralTypeID': 1,
      'payorID': this.payorId,
      'sp': this.reportSP
    }
    this._caseTeam.generateRunReport(req).then((data) => {
      if (data.runReport.length > 0) {
        let runReportSample = [], runReportSampleArr = [];
        runReportSample.push(Object.keys(data.runReport[0]))
        runReportSample[0].forEach((item: any) => {
          let data = { headerName: item, field: item }
          runReportSampleArr.push(data);
        })
        data.runReport.map(item => {
          !isNullOrUndefined(item.BeginDate) ? item.BeginDate = new Date(item.BeginDate).toLocaleDateString() : null;
          !isNullOrUndefined(item.DOB) ? item.DOB = new Date(item.DOB).toLocaleDateString() : null;
          !isNullOrUndefined(item.EndDate) ? item.EndDate = new Date(item.EndDate).toLocaleDateString() : null;
          !isNullOrUndefined(item.EnteredDate) ? item.EnteredDate = new Date(item.EnteredDate).toLocaleDateString() : null;
        })
        this.runReportColumnDefs = runReportSampleArr;
        this.runReportRowData = data.runReport;
        loader.style.display = 'none';
        this.displayDialog = true;
      } else {
        loader.style.display = 'none';
      }
    })
  }

  getPayorId(event) {
    this.isPayor = true;
    this.payorId = event.payorID;
  }

  getSubmissionValue(event) {
    this.isSubmissionCheck = event;
  }

  submission(event) {
    let request = { "referralTypeID": 1, "payorID": this.payorId };
    this._caseTeam.getSubmissionList(request).then((data) => {
      this.metaData = data.runReport;
    })
  }

  getScriptBatchID(event) {
    this.ScriptsBatchID = event.ScriptsBatchID;
  }

  reload() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let request = { "referralTypeID": 1, "payorID": this.payorId, "scriptsBatchID": this.ScriptsBatchID };
    this._caseTeam.getReloadSubmission(request).then((data) => {
      if (data.reloadSubmission.length > 0) {
        let reloadSubmissionSample = [], reloadSubmissionSampleArr = [];
        reloadSubmissionSample.push(Object.keys(data.reloadSubmission[0]))
        reloadSubmissionSample[0].forEach((item: any) => {
          let data = { headerName: item, field: item }
          reloadSubmissionSampleArr.push(data);
        })
        data.reloadSubmission.map(item => {
          !isNullOrUndefined(item.BeginDate) ? item.BeginDate = new Date(item.BeginDate).toLocaleDateString() : null;
          !isNullOrUndefined(item.DOB) ? item.DOB = new Date(item.DOB).toLocaleDateString() : null;
          !isNullOrUndefined(item.EndDate) ? item.EndDate = new Date(item.EndDate).toLocaleDateString() : null;
          !isNullOrUndefined(item.EnteredDate) ? item.EnteredDate = new Date(item.EnteredDate).toLocaleDateString() : null;
        })
        this.reloadSubmissionColumnDefs = reloadSubmissionSampleArr;
        this.reloadSubmissionRowData = data.reloadSubmission;
        loader.style.display = 'none';
        this.isReloadSubmissionTable = true;
      } else {
        loader.style.display = 'none';
      }
    })
  }

  postCreate() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let request = {
      'beginDate': Date.parse(this.report.beginDate),
      'endDate': Date.parse(this.report.endDate),
      'referralTypeID': 1,
      'payorID': this.payorId,
      'submitedDate': Date.parse(this.report.submitDate),
      'referralType': 'FC',
      'enteredDate': Date.parse(this.currentDate),
      'scriptsBatchID':this.ScriptsBatchID,
      'enteredby': 'rajesh'
    }
    this._caseTeam.getPostCreateTxtFile(request).then((data) => {
      if (data) {
        this.head = Object.keys(data.postCreateFiletActual[0]);
        this.postCreateFiletActual = Object.values(data.postCreateFiletActual);

        this.displayPostCreateTxt = true;
        loader.style.display = 'none';
      } else {
        loader.style.display = 'none';
      }
    })
  }

  downloadCsv() {
    let options = {
      headers: this.head
    };
    new Angular5Csv(this.postCreateFiletActual, 'filename', options);
  }

  createTxtFile() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let request = {
      'referralTypeID': 1
    }
    this._caseTeam.getCreateTxtFile(request).then((data) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report',
        text: JSON.stringify(data.createTextFile)
      });
      loader.style.display = 'none';
    })
  }
  dynamicDownloadTxt() {
    this.createText.subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report',
        text: JSON.stringify(res)
      });
    });
  }
  public dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  public setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
}

