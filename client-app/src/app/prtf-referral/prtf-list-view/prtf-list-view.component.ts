import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prtf-list-view',
  templateUrl: './prtf-list-view.component.html',
  styleUrls: ['./prtf-list-view.component.scss'],
  inputs: ['isPopUpWindow'],
  outputs: ['rowSeleted']
})
export class PrtfListViewComponent implements OnInit {
  @Input() tableHeaders = ["BeginDate", "FirstName", "closureDate"];

  @Input() tableRows = [
    {
      BeginDate: "02/18/2020",
      Description: "Psychiatric Residential Treatment Facility",
      Facts: null,
      FirstName: "1111",
      LastName: "Sanchez",
      PayorName: "Allen Co 31st Judicial District",
      ReferralType: "PRTF",
      closureDate: "12/31/2022",
      referralID: 55819,
      serviceType: null,
    },
    {
      BeginDate: "02/18/2020",
      Description: "Psychiatric Residential Treatment Facility",
      Facts: null,
      FirstName: "2222",
      LastName: "Sanchez",
      PayorName: "Allen Co 31st Judicial District",
      ReferralType: "PRTF",
      closureDate: "12/31/2022",
      referralID: 55746,
      serviceType: null,
    },
    {
      BeginDate: "02/18/2020",
      Description: "Psychiatric Residential Treatment Facility",
      Facts: null,
      FirstName: "3333",
      LastName: "Sanchez",
      PayorName: "Allen Co 31st Judicial District",
      ReferralType: "PRTF",
      closureDate: "12/31/2022",
      referralID: 55745,
      serviceType: null,
    }
  ];

  @Output() rowSeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onRowSelect(rowData) {
    this.rowSeleted.emit({ rowData: rowData });
  }

}
