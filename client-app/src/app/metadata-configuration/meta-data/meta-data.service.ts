import { Injectable } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { OtpverficationService } from '../../otpverfication/otpverfication.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MetaDataService {

  constructor(public _home: HomeService, public _otp: OtpverficationService, public _http: HttpClient) { }
  uri = environment.localUrl + '/dropDown/list';
  gridApi;
  selectedRows = [];

  /**
   * Ag-grid function for selection box
   *
   * @param {any} params
   * @returns
   *
   * @memberOf MetaDataService
   */
  isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  /**
   * Ag-grid function for row selection
   *
   * @param {any} event
   *
   * @memberOf MetaDataService
   */
  onRowSelected(event) {
    console.log('Row selection', event);
    // this.selectedRows = this.gridApi.getSelectedRows();
    return event.data;
    // if (this.selectedRows.indexOf(event.data) == -1) {
    //   this.selectedRows.push(event.data);
    // } else {
    //   this.selectedRows.splice(this.selectedRows.indexOf(event.data), 1);
    // }
  }

  /**
   *
   *
   * @param {any} meta - Object for meta data. It's contains the requested meta name
   * @returns the respective metadata list view
   *
   * @memberOf MetaDataService
   */
  getListofMetaData(meta) {
    return this._http.post(this.uri, JSON.stringify(meta)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   *
   * @param {any} source - array of respected data
   * @return table columns and table row data
   * @memberOf MetaDataService
   */
  generateMetaListView(source) {
    let rowData, columnDef, headerName = [], defaultColDef;
    console.log('Source', source);
    if (source[0].length > 0) {
      for (let i = 0; i < source[0].length; i++) {
        columnDef = Array.from(new Set(Object.keys(source[0][i])));
      }
      columnDef.map(def => {
        headerName.push({headerName: def.replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase()), field: def});
      });
      rowData = source[0];
    }
    defaultColDef = {
      width: 100,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    };
    console.log('Source', source, 'rowData', rowData);
    return Promise.all([rowData, headerName, defaultColDef]);

  }


}
