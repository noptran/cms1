import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportService {
  month = new Date().getMonth() + 1;

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
  }

  public exportAsCSVFile(JSONData, ReportTitle, ShowLabel) {
    const arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = '';
    CSV += ReportTitle + '\r\n\n';

    if (ShowLabel) {
      let row = '';
      for (const index in arrData[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }
    for (let i = 0; i < arrData.length; i++) {
      let row = '';
      for (const index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }
    if (CSV == '') {
      console.log('Invalid data');
      return;
    }

    const fileName = ReportTitle.replace(/ /g, '_') +  new Date().getDate() + '-' + this.month + '-' + new Date().getFullYear();
    const uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
    const link = document.createElement('a');
    link.href = uri;
    link.download = fileName + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


