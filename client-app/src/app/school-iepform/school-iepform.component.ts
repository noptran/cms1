import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { scl_IEP } from './school-iep';
import { ActivatedRoute, Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { TeamFormService } from '../team-form/team-form.service';
import { isNullOrUndefined } from 'util';
import { LocalValues } from '../local-values';
import * as moment from "moment";
@Component({
  selector: 'app-school-iepform',
  templateUrl: './school-iepform.component.html',
  styleUrls: ['./school-iepform.component.scss'],
  providers: [DatePipe]
})
export class SchoolIEPformComponent implements OnInit {
  sclIEPData: any = new scl_IEP();
  changedBy: any;
  changedDate: any;
  eduInfoID: any = null;
  breadcrumbs = [
    { label: "List", href: "/reports/client", active: "" },
    { label: "Form", href: "/reports/client/details", active: "" },
    {
      label: "Case Form",
      href: "/reintegration/referral/detail",
      active: "",
    },
    { label: "School", href: "/reintegration/referral/opencard/school/dashboard", active: "" },
    { label: "Ed Info", href: "/schoolIEPLists", active: "" },
    { label: "Ed Form", href: "", active: "active" },
  ];
  formLogInfo = {
    enteredBy: "",
    enteredDate: "",
  };
  isFormLog = false;


  constructor(public _activateRoute: ActivatedRoute, public _opencard: OpencardsService, public router: Router, public _team: TeamFormService, public _localValues: LocalValues, public datepipe: DatePipe) {

  }
  isUpdate = false;
  ngOnInit() {
    this._activateRoute.queryParams.subscribe(params => {
      if (params && params.clientId) {
        this.sclIEPData.clientID = parseInt(params.clientId);
      } else {
        this.sclIEPData.clientID = parseInt(localStorage.getItem("clientId")) -
          this._opencard.getHasKey()
      };
      if (params && params.ref_id) {
        this.sclIEPData.referralID = parseInt(params.ref_id);
      } else {
        this.sclIEPData.referralID = parseInt(localStorage.getItem("referralId")) -
          this._opencard.getHasKey()
      };
      if (this.router.url.includes('/school_IEP_mod/detail')) {
        if (params && params.eduInfoID) {
          this.eduInfoID = parseInt(params.eduInfoID);
          this.getByIEP_detail();
          this.isUpdate = true;
          this.isEdit = true;
        }
      }
    });
    this.getUserById();
    this.changedDate = this.datepipe.transform(new Date(), 'MM/dd/yyyy hh:mm');
  }
  saveIEP() {
    console.log('sclIEPData>>>>>', this.sclIEPData);
    if (this.isUpdate) {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this._opencard.iep_update(this.sclIEPData).then((data: any) => {
        loader.style.display = "none";
        if (data.responseStatus) {
          swal('Saved!', 'Saved!', 'success');
          this.router.navigate(['/schoolIEPLists'], { queryParamsHandling: "preserve" });
        } else {
          swal('Something went wrong!', 'Please try again later!', 'error');
        }
      });
    } else {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this._opencard.iep_save(this.sclIEPData).then((data: any) => {
        loader.style.display = "none";
        if (data.responseStatus) {
          swal('Saved!', 'Saved!', 'success');
          this.router.navigate(['/schoolIEPLists'], { queryParamsHandling: "preserve" });
        } else {
          swal('Something went wrong!', 'Please try again later!', 'error');
        }
      })
    }
  };
  changed_Date: any;
  getUserById() {
    this._team.getUserById({
      staffID: isNullOrUndefined(localStorage.getItem("UserId"))
        ? 14802
        : localStorage.getItem("UserId")
    }).then((data) => {
      this.changedBy = data.users.lastName + " " + data.users.firstName;
      this.changed_Date = moment(new Date()).format("MM/DD/YYYY hh:mm:ss A");
    });
  };

  getByIEP_detail() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.iep_getBYid({ "educationalInformationID": this.eduInfoID }).then((data) => {
      loader.style.display = "none";
      data.educationalInformation.enteredDate = !isNullOrUndefined(data.educationalInformation.enteredDate) ? moment(data.educationalInformation.enteredDate).format("MM/DD/YYYY hh:mm:ss A") : "--:--:-- --";
      data.educationalInformation.iEPChangedDate = !isNullOrUndefined(data.educationalInformation.iEPChangedDate) ? moment(data.educationalInformation.iEPChangedDate).format("MM/DD/YYYY hh:mm:ss A") : "--:--:-- --";
      data.educationalInformation.othersChangedDate = !isNullOrUndefined(data.educationalInformation.othersChangedDate) ? moment(data.educationalInformation.othersChangedDate).format("MM/DD/YYYY hh:mm:ss A") : "--:--:-- --";
      data.educationalInformation.notesChangedDate = !isNullOrUndefined(data.educationalInformation.notesChangedDate) ? moment(data.educationalInformation.notesChangedDate).format("MM/DD/YYYY hh:mm:ss A") : "--:--:-- --";
      data.educationalInformation.disciplineChangedDate = !isNullOrUndefined(data.educationalInformation.disciplineChangedDate) ? moment(data.educationalInformation.disciplineChangedDate).format("MM/DD/YYYY hh:mm:ss A") : "--:--:-- --";
      console.log("data.educationalInformation.notesChangedDate>>>>>", data.educationalInformation.notesChangedDate);
      this.sclIEPData = data.educationalInformation;
      this.isFormLog = true;
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.educationalInformation.enteredBy) ? data.educationalInformation.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.educationalInformation.enteredDate) ? moment(data.educationalInformation.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      console.log("this.sclIEPData>>>>>", this.sclIEPData.notesChangedDate);
    }).catch(err => {
      loader.style.display = "none";
    })
  };
  isEdit = false;
  visibleForm() {
    this.isEdit = false;
  }
  redirectList() {
    this.router.navigate(['/schoolIEPLists'], { queryParamsHandling: "preserve" });
  }
}
