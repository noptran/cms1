import { Component, OnInit } from '@angular/core';
import { PrioritizedReportsService } from '../prioritized-reports/prioritized-reports.service';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-my-exports',
  templateUrl: './my-exports.component.html',
  styleUrls: ['./my-exports.component.scss']
})
export class MyExportsComponent implements OnInit {

  constructor(public _prioritized: PrioritizedReportsService) { }
  trentLineReports: any = [];
  showTrend = false;

  exportFiles = [];
  showCard = true;
  message;
  Sidenav: any;
  date;
  // userId = "4621";parseInt(localStorage.getItem('UserId')) || 4620
  userId: any = isNullOrUndefined(localStorage.getItem('UserId')) ? 14802 : localStorage.getItem('UserId');

  mock = {
    'exportID': 1,
    'spName': 'RM-QP-UI-Completed',
    'query': 'Select * FROM [MSSQL-DEVCMSDB01].Report.T_vRM_QR_IncidentCompleteds',
    'userId': 4558,
    'status': 'New',
    'reportName': ' t 1',
    'exportUrl': null,
    'fileType': 'csv',
    'readyToDownloadTime': null
  };

  ngOnInit() {

    this.getExportReportByUseId();
  }


  getDateFromTimestamp(value) {
    if (value !== null && value !== undefined) {
      const dateString = moment.unix(1301090400).format('DD/MM/YYYY');
      return dateString;
    } else {
      return null;
    }
  }

  getExportReportByUseId() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._prioritized.getExportReportByUseId({ 'userId': parseInt(this.userId) }).then(data => {
      if (data.exportFiles === undefined && data.trentLineExportFiles.length === 0) {
        loader.style.display = 'none';
        this.showCard = true;
        this.message = data.responseMessage;
      } else {
        this.showCard = false;
        loader.style.display = 'none';
        if (data.exportFiles) {
          data.exportFiles.map(data => {
            const reportName = data.reportName.split('@');
            data['reportName'] = reportName[0] + reportName[1];
          });
          this.exportFiles = data.exportFiles.reverse();
        }
        if (data.trentLineExportFiles.length > 0) {
          this.trentLineReports = data.trentLineExportFiles.reverse();
        }
      }
    });
  }

  /**
   * Clear all the exports records
   */
  clearAllExports() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { userId: parseInt(this.userId) };
    this._prioritized.clearExportsRecord(req).then(() => {
      loader.style.display = 'none';
      swal('Clear', 'Records are cleared!', 'success');
      this.getExportReportByUseId();
    });
  }
}
