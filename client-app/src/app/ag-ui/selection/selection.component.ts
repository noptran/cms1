import { Component, AfterViewInit } from '@angular/core';
import {ICellEditorAngularComp} from 'ag-grid-angular/main';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements
  ICellEditorAngularComp, AfterViewInit {
    value: any;
    params: any;
    selectedValues =  [];

    agInit(params: any) {
      this.params = params;
      this.value = this.params.value;
     }

    ngAfterViewInit() { }

    getValue(): any {
      return this.value;
    }

    selectedRow(event) {
      console.log('Selected row', event, this.params);
      if (event == true) {
        this.selectedValues.push(this.params['data']);
      }
      console.log('HoH', this.selectedValues);
    }

  }
