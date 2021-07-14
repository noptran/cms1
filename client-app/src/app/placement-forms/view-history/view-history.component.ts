import { Component, OnInit } from '@angular/core';
import { PlacementPrintService } from '../placement-print.service';
import { TeamFormService } from '../../team-form/team-form.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent implements OnInit {
  staffName = "Admin"
  historyData = {
    PLACEMENT_STATUS: {
      form: "PLACEMENT_STATUS",
      isEmailed: false,
      isPrinted: false,
      emailedDate: "",
      emailedStaff: "",
      emailedAddress: "",
      printedDate: "",
      printedStaff: ""
    },
    PROVIDER_SERVICE_AGREEMENT: {
      form: "PROVIDER_SERVICE_AGREEMENT",
      isEmailed: false,
      isPrinted: false,
      emailedDate: "",
      emailedStaff: "",
      emailedAddress: "",
      printedDate: "",
      printedStaff: ""
    },
    ACKNOWLEDGEMENT: {
      form: "ACKNOWLEDGEMENT",
      isEmailed: false,
      isPrinted: false,
      emailedDate: "",
      emailedStaff: "",
      emailedAddress: "",
      printedDate: "",
      printedStaff: ""
    },
    AGREEMENT: {
      form: "AGREEMENT",
      isEmailed: false,
      isPrinted: false,
      emailedDate: "",
      emailedStaff: "",
      emailedAddress: "",
      printedDate: "",
      printedStaff: ""
    }
  }

  constructor(public _team: TeamFormService, public _placementPrint: PlacementPrintService) { }

  ngOnInit() {
    const staffId = localStorage.getItem('UserId');
    if (localStorage.getItem('UserId')) {
      this._team.getUserById({ staffID: parseInt(staffId) }).then(data => {
        this.staffName = data.users.lastName + ' ' + data.users.firstName;
      });
    }
    if (this._placementPrint.printHistoryData) {
      this.historyData = this._placementPrint.printHistoryData

    }

  }

}
