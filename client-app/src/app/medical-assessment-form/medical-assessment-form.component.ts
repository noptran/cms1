import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { MedicalAssessmentForm } from './medical-assessment';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../pagesize/pagesize.service';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-medical-assessment-form',
  templateUrl: './medical-assessment-form.component.html',
  styleUrls: ['./medical-assessment-form.component.scss']
})
export class MedicalAssessmentFormComponent implements OnInit {
  @Input() get_referralID:any;
  medicalAssessmentForm: MedicalAssessmentForm = new MedicalAssessmentForm();
  rowData: any;
  totalCount: any;
  headers = [];
  initial = 1;
  isPlesWait=false;
  end = 100;
  rawdata = [];
  columnDefs = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;
  constructor(public _caseTeam: CaseTeamService, public _openCards: OpencardsService, public _pageSize: PagesizeService) { }
  @Output() closeModel = new EventEmitter<string>();
  isPopWindow = false;
  isPopListWindow = true;
  defaultColDef: any;
  req: any;

  ngOnInit() {
    this.getAllListView(this.initial, this.end);
  }
  formAction() {
    this.end = 100;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    this.medicalAssessmentForm.referralID = this.get_referralID;
    this.medicalAssessmentForm.clientID = parseInt(localStorage.getItem("clientId")) - this._openCards.getHasKey();
    this.medicalAssessmentForm.pulse = parseFloat(this.medicalAssessmentForm.pulse);
    this.medicalAssessmentForm.respirations = parseFloat(this.medicalAssessmentForm.respirations);
    this.medicalAssessmentForm.height = parseFloat(this.medicalAssessmentForm.height);
    this.medicalAssessmentForm.temperature = parseFloat(this.medicalAssessmentForm.temperature);
    this.medicalAssessmentForm.weight = parseFloat(this.medicalAssessmentForm.weight);
    // this.medicalAssessmentForm.bodyMassIndex = parseInt(this.medicalAssessmentForm.bodyMassIndex);

   
if(this.isUpdate){
  this.medicalAssessmentForm['medicalAssessmentsID'] = this.medicalAssesmentID;
  this._caseTeam.updateMedicalAssessment(this.medicalAssessmentForm).then((data: any) => {
    loader.style.display = 'none';
    this.isPopWindow = false;
    swal('Save', 'Successfully updated!', 'success');
    this.getAllListView(this.initial, this.end);
  }).catch(error => {
    loader.style.display = 'none';
  });
}else{
  delete this.medicalAssessmentForm['medicalAssessmentsID'];
  this._caseTeam.saveMedicalAssessment(this.medicalAssessmentForm).then((data: any) => {
    loader.style.display = 'none';
    this.isPopWindow = false;
    swal('Save', 'Successfully created!', 'success');
    this.getAllListView(this.initial, this.end);
  }).catch(error => {
    loader.style.display = 'none';
  });
}
  };
  bmiCalculate() {
    if (this.medicalAssessmentForm.weight > 0 && this.medicalAssessmentForm.height > 0) {
      // var finalBmi = this.medicalAssessmentForm.weight / (this.medicalAssessmentForm.height / 100 * this.medicalAssessmentForm.height / 100)
      // this.medicalAssessmentForm.bodyMassIndex = finalBmi.toFixed(2);
     var finalBmi = (this.medicalAssessmentForm.weight/(this.medicalAssessmentForm.height*this.medicalAssessmentForm.height)*703)
      this.medicalAssessmentForm.bodyMassIndex = finalBmi.toFixed(2);
    }
  };

  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

  getAllListView(initial,end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    let me_Req = {
      "referralID": this.get_referralID,
      "beginPagination": initial,
      "endPagination": end,
    };
    this._openCards
      .getMedicalAssessment(me_Req)
      .then(data => {
        this.isPlesWait = false;
        this.generateListView(data);
        loader.style.display = "none";
      });
  };
  generateListView(data) {
    console.log("data in generateListView is", data);
    let rowData = [];
    let test = [];
    this.totalCount = data.totalCount;
    this.rowData = data.medicalAssessment;
    console.log("This row data", this.rowData);
    if (this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));
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
  showSaveModel() {
    this.isPopWindow = true;
    this.isUpdate_dis = false;
    this.isUpdate = false;
    this.isEdit = false;
    this.medicalAssessmentForm.referralID = "";
    this.medicalAssessmentForm.clientID = "";
    this.medicalAssessmentForm.pulse = "";
    this.medicalAssessmentForm.respirations = "";
    this.medicalAssessmentForm.height = "";
    this.medicalAssessmentForm.temperature = "";
    this.medicalAssessmentForm.weight = "";
    this.medicalAssessmentForm.bodyMassIndex = "";
    this.medicalAssessmentForm.bloodPressure = "";
    this.medicalAssessmentForm.isDONContacted = false;
    this.medicalAssessmentForm.isDieticianContacted = false;
  };
  isUpdate_dis = false;
  isUpdate=false;
  medicalAssesmentID:any;
  isEdit=false;
  module:any;
  onRowSelected(event) {
    console.log(event);
    // this.medicalAssessmentForm = event.data;
    // this.medicalAssessmentForm.assessmentDate = new Date(event.data.assessmentDate);
    this.isUpdate = true;
    this.isUpdate_dis=true;
    this.isEdit = true;
    this.medicalAssesmentID = event.data.medicalAssessmentsID;
    this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(event.data.medicalAssessmentsID.changedBy) ? event.data.medicalAssessmentsID.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(event.data.medicalAssessmentsID.changedDate) ? moment(event.data.medicalAssessmentsID.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(event.data.medicalAssessmentsID.enteredBy) ? event.data.medicalAssessmentsID.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(event.data.medicalAssessmentsID.enteredDate) ? moment(event.data.medicalAssessmentsID.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    this.module={
      medicalAssesmentID:this.medicalAssesmentID
    }
    this.treatGetByIds();
  };


  treatGetByIds() {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "medicalAssessmentID": this.medicalAssesmentID,
    };
    this._openCards
      .getMedAssesmentById(me_Req)
      .then(data_res => {
        this.isPopWindow = true;
        loader.style.display = "none";
        this.isPlesWait = false;
        this.medicalAssessmentForm = data_res['medicalAssessment'];
        this.medicalAssessmentForm.assessmentDate = new Date(data_res['medicalAssessment'].assessmentDate);
        this.isPopWindow = true;
      });
  }


  editForm(){
    this.isUpdate_dis=false;
    this.isEdit = false;
  }
  discard(){
    this.isPopWindow = false;
  };
  isDeleteConfirmation = false;
  deleteConfirmationBtnLabel = 'Confirm';
  isDeleteConfirmationDisable = false;
  infoText: string;
  async onDelete() {
      this.deleteConfirmationBtnLabel = 'Deleting...';
      this.isDeleteConfirmationDisable = true;
      if (this.module) {
          let req = {};
          req['medicalAssessmentsID'] = this.medicalAssesmentID;
              await this.deleteRecord(req);
      }
      this.deleteConfirmationBtnLabel = 'Confirm';
      this.isDeleteConfirmationDisable = false;
      this.infoText = 'The record has been deleted successfully!';
      swal('Save', 'The record has been deleted successfully!', 'success');
      this.getAllListView(this.initial, this.end);
  }

  deleteRecord(deleteReq: any) {
      this.infoText = '';
      return new Promise((resolve) => {
          this._openCards.medicalAssementDdelete(deleteReq).then((data: any) => {
            this.isPopWindow = false;
            this.isDeleteConfirmation = false;
              resolve(data);
          })
      })
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
      return this.getAllListView(this.initial, this.end);
    }
  }
}
