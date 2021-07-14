import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { PagesizeService } from '../pagesize/pagesize.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-client-grade-submission',
  templateUrl: './client-grade-submission.component.html',
  styleUrls: ['./client-grade-submission.component.scss']
})
export class ClientGradeSubmissionComponent implements OnInit {
  beginDate_disable = true;
  endDate_disable = true;
  submitDate_disable = true;
  mainTabs = [];
  sIndex: any;
  clientGradeErrorList: any = [];
  clientGradeList: any = [];
  selectedRecreteSubmission = false;
  totalCount: any;
  initial = 1;
  end = 100;
  totalClientGradeCount: any;
  clientGradeInitial = 1;
  clientGradeEnd = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  beginDate: any;
  endDate: any;
  submitDate: any;
  selectedFISyear = null;
  submission = {};
  crtEnable = true;
  crtPostEnable = true;

  date: any;
  defaultColDef: any;

  constructor(public _openCards: OpencardsService, public _pageSize: PagesizeService, ) {
    this.mainTabs = [{ label: "Client Grade", href: '#nav-sec1' },
    { label: "Errors", href: '#nav-sec2' }];
  }

  ngOnInit() {
    this.setIndex(0);
    this.getAllFiscalYear();
    this.getAllQuarterList();
    this.getAllClientGradeSubmission();
  }
  setIndex(index: number) {
    this.sIndex = index;
    console.log(index);
  }
  allFIScalYear = [];
  getAllFiscalYear() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var req = {
      "beginPagination": 1,
      "endPagination": 100
    };
    this._openCards.getFiscalYear(req).then(data => {
      this.allFIScalYear = data.fiscalYearList;
      loader.style.display = 'none';
    });
  };
  allQuarterList = [];
  getAllQuarterList() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._openCards.getQuarterList().then(data => {
      this.allQuarterList = data.fiscalQuarterList;
      loader.style.display = 'none';
    });
  };
  allClientGradeSubmissionList = [];
  getAllClientGradeSubmission() {
    this._openCards.getclintGradeList().then(data => {
      this.allClientGradeSubmissionList = data.clientGradeSubmissionBatch;
      this.selectsubmission = data.clientGradeSubmissionBatch[0];
    });
  };
  getFiscalYear(event) {
    console.log("event>>>>", event);
    if (this.selectedQuarter !== null) {
      var years = this.selectedFISyear.fiscalYear.split("-");
      console.log('this.selectedQuarter.endMonth>>>>>', this.selectedQuarter.endMonth);
      if (this.selectedQuarter.endMonth == '3') {
        this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
        this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[1]);
      } else if (this.selectedQuarter.endMonth == '6') {
        this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
        this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[1]);
      } else {
        this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
        this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[0]);
      }
      var endDate = new Date(this.endDate);
      this.submitDate = new Date(endDate);
      this.submitDate.setDate(endDate.getDate() + 5);
    }
  };
  selectedQuarter = null;
  getQuarterYear(event) {
    console.log("<<<<<event>>>>", event);
    if (this.selectedFISyear !== null) {
      var years = this.selectedFISyear.fiscalYear.split("-");

      if (this.selectedQuarter.endMonth == '3') {
        this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
        this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[1]);
      } else if (this.selectedQuarter.endMonth == '6') {
        this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
        this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[1]);
      } else {
        this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
        this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[0]);
      }


      // this.beginDate = new Date(this.selectedQuarter.beginMonth + "-" + this.selectedQuarter.beginDay + "-" + years[0]);
      // if (this.selectedQuarter.endMonth === '03') {
      //   console.log('march');
      // } else if (this.selectedQuarter.endMonth === '06') {
      //   console.log('june');
      // }
      // this.endDate = new Date(this.selectedQuarter.endMonth + "-" + this.selectedQuarter.endDay + "-" + years[0]);
      var endDate = new Date(this.endDate);
      this.submitDate = new Date(endDate);
      this.submitDate.setDate(endDate.getDate() + 5);
    }
  }
  errorCount: any;
  gradeCount: any;
  clientGradeProcess(init, end) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var req = {
      "beginDate": moment(this.beginDate).format('MM/DD/YYYY'),
      "endDate": moment(this.endDate).format('MM/DD/YYYY'),
      "submitDate": moment(this.submitDate).format('MM/DD/YYYY'),
      "userID": parseInt(localStorage.getItem('UserId')) || 4620,
      "beginPagination": init,
      "endPagination": end
    };
    this._openCards.getClientGradeProcess(req).then(data => {
      loader.style.display = 'none';
      this.totalCount = data.totalCounts;
      this.exportSql = data.sql;
      if (data.errorList) {
        this.clientGradeErrorList = data.errorList;
        this.errorCount = this.clientGradeErrorList.length;
        swal('Info', data.responseMessage, 'warning');
      } else if (data.clientGradeSubmissionList) {
        this.clientGradeList = data.clientGradeSubmissionList;
        this.gradeCount = this.clientGradeList.length;
        swal('Info', data.responseMessage, 'warning');
        if (this.clientGradeList.length >= 0) {
          this.crtEnable = false;
          this.crtPostEnable = false;
        }
      }
      this.generateListView();
    });
  };

  generateListView() {
    let test = [];
    if (this.clientGradeErrorList.length > 0) {
      this.headers.push(Object.keys(this.clientGradeErrorList[0]));
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
      return this.clientGradeProcess(this.initial, this.end);
    }
  }
  createTextFile() {
    var req = {
      "staffID": parseInt(localStorage.getItem('UserId')) || 4620,
      "fiscalYearID": this.selectedFISyear.fiscalYearID,
      "submitDate": moment(this.submitDate).format('MM/DD/YYYY'),
    }
    this._openCards.clientGradeTextFile(req).then(data => {
      swal('Success', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
    })
  }
  createPostTextFile() {
    var req = {
      "staffID": parseInt(localStorage.getItem('UserId')) || 4620,
      "fiscalYearID": this.selectedFISyear.fiscalYearID,
      "submitDate": moment(this.submitDate).format('MM/DD/YYYY'),
    }
    this._openCards.clientGradePostTextFile(req).then(data => {
      swal('Success', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
    })
  };
  selectsubmission: any = {};
  exportSql: any;
  clientGradeReloede(init, end) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var req = {
      "clientGradeSubmissionBatchID": this.selectsubmission.clientGradeSubmissionBatchID,
      "beginPagination": init,
      "endPagination": end
    };
    this._openCards.getClientGradeRelode(req).then(data => {
      loader.style.display = 'none';
      this.totalCount = data.totalCountErrorList;
      this.exportSql = data.sql;
      this.totalClientGradeCount = data.totalCountClientGradeList;
      this.clientGradeErrorList = data.errorList;
      this.clientGradeList = data.clientGradeSubmissionList;
      this.crtPostEnable = false;
      this.errorCount = this.clientGradeErrorList.length;
      this.gradeCount = this.clientGradeList.length;
      this.generateErrorRelodeListView();
      this.generateRelodeListView();
    });
  };
  generateErrorRelodeListView() {
    let test = [];
    if (this.clientGradeErrorList.length > 0) {
      this.headers.push(Object.keys(this.clientGradeErrorList[0]));
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
  generateRelodeListView() {
    let test = [];
    if (this.clientGradeList.length > 0) {
      this.headers.push(Object.keys(this.clientGradeList[0]));
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
      if (this.totalClientGradeCount < 100) {
        this.end = this.totalClientGradeCount;
      }
    }
  };
  ClientGradePagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.clientGradeInitial = begin;
      this.clientGradeEnd = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  ClientGradePagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.clientGradeInitial = begin;
      this.clientGradeEnd = end;
      return this.clientGradeReloede(this.clientGradeInitial, this.clientGradeEnd);
    }
  }
  clientGradeErrorReport() {
    var req = {
      "sql": this.exportSql,
      "fileName": 'ClientGradeErrorReport-' + moment(new Date()).format('MM-DD-YYYY'),
      "tab": "Error"
    }
    this._openCards.getClientGradeExport(req).then(data => {
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    })
  };

  clientGradeReport() {
    var req = {
      "sql": this.exportSql,
      "fileName": 'ClientGradeReport-' + moment(new Date()).format('MM-DD-YYYY'),
      "tab": "ClientGrade"
    }
    this._openCards.getClientGradeExport(req).then(data => {
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    })
  }
  getsubmission(event) {

  }

  dropRegion(endDate) {
    // dropRegion
  }

  onRowSelected(event) {
    // onRowSelected
  }

}
