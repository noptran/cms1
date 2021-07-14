import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { LocalValues } from "../local-values";
import { OpencardsService } from "../opecards-list-view/opencards.service";

class ClientGradeProgression {
  private _progressYear = "";
  private _processingDate = "";

  constructor(progressYear: any, processingDate: any) {
    this._progressYear = progressYear;
    this._processingDate = processingDate;
  }

  get getGradeProgression() {
    return {
      fiscalYearID: this._progressYear,
      processingDate: this._processingDate,
    };
  }

  set setGradeProgression(updateClientGrade: any) {
    this._processingDate = updateClientGrade.formProcessingDate;
    this._progressYear = updateClientGrade.formProgressYear;
  }
}
@Component({
  selector: "app-client-grade-progression",
  templateUrl: "./client-grade-progression.component.html",
  styleUrls: ["./client-grade-progression.component.scss"],
})
export class ClientGradeProgressionComponent implements OnInit {
  public gradeProgress = new ClientGradeProgression("", "");
  public gradeForm: FormGroup;
  public listOfFiscalYear: any[];
  public errorData = {
    totalCount: null,
    dataList: [],
    beginPagination: 1,
    endPagination: 100,
  };
  public processedData = {
    totalCount: null,
    dataList: [],
    beginPagination: 1,
    endPagination: 100,
  };
  public runBtnDisable = false;
  public sortOptions = [
    { label: "ASC", value: "ASC" },
    { label: "DESC", value: "DESC" },
  ];
  public sortingForm: FormGroup;
  public errorColumnList = [
    { name: "Error", value: "Error" },
    { name: "ClientName", value: "ClientName" },
    { name: "DOB", value: "DOB" },
    { name: "ClientID", value: "ClientID" },
    { name: "ReferralID", value: "ReferralID" },
    { name: "Grade", value: "Grade" },
    { name: "GradeID", value: "GradeID" },
    { name: "ClientGradeID", value: "ClientGradeID" },
  ];
  public dataColumnList = [
    { name: "ClientName", value: "ClientName" },
    { name: "ReferralName", value: "ReferralName" },
    { name: "PreviousGrade", value: "PreviousGrade" },
    { name: "PreviousGradeBeginDate", value: "PreviousGradeBeginDate" },
    { name: "PreviousGradeEndDate", value: "PreviousGradeEndDate" },
    { name: "PreviousClientGradeID", value: "PreviousClientGradeID" },
    { name: "Grade", value: "Grade" },
    { name: "BeginDate", value: "BeginDate" },
    { name: "EndDate", value: "EndDate" },
    { name: "ClientGradeID", value: "ClientGradeID" },
    { name: "ReferralID", value: "ReferralID" },
  ];
  public dataLoader = false;
  public isErrors = false;
  public tabIndex = 0;
  public isExportDisable = false;

  constructor(
    public fb: FormBuilder,
    public _openCards: OpencardsService,
    public _localValues: LocalValues
  ) {}

  ngOnInit() {
    this.formValidation();
    this.sortingFormValidation();
  }

  formValidation() {
    this.gradeForm = this.fb.group({
      formProgressYear: [null, Validators.compose([Validators.required])],
      formProcessingDate: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmitForm() {
    if (this.gradeForm.valid) {
      this.gradeProgress.setGradeProgression = this.gradeForm.value;
      let gradeProcessData: any = this.gradeProgress.getGradeProgression;
      this.runClientGradeProcess(
        gradeProcessData.fiscalYearID.fiscalYearID,
        this._localValues.stringFormatDatetime(
          new Date(gradeProcessData.processingDate).getTime()
        )
      );
    } else {
      return swal("Invalid", "Mandatory field is missing!", "error");
    }
  }

  async onCompleteFiscalYearSearch() {
    let request = { beginPagination: 1, endPagination: 100 };
    let response = await this._openCards.getFiscalYear(request);
    response.responseStatus
      ? (this.listOfFiscalYear = response.fiscalYearList)
      : swal("Error!", "Not able to fetch data", "error");
    return this.listOfFiscalYear;
  }

  async runClientGradeProcess(fiscalYearID: number, processingDate: string) {
    let runRequest = { fiscalYearID, processingDate }; //ES6 class formation literal
    this.runBtnDisable = true;
    this.dataLoader = true;
    let runResponse = await this._openCards.runClientGradeProcess(runRequest);
    this.runBtnDisable = false;
    this.dataLoader = false;
    if (runResponse.responseStatus) {
      this.isErrors = runResponse.processHasErrors;
      runResponse.processHasErrors
        ? (this.errorData = await this.processedErrorList(
            1,
            100,
            "Error",
            "ASC"
          ))
        : (this.processedData = await this.processedDataList(
            1,
            100,
            "ClientName",
            "ASC"
          ));
      // invert test
      // runResponse.processHasErrors
      //   ? (this.processedData = await this.processedDataList(
      //       1,
      //       100,
      //       "ClientName",
      //       "ASC"
      //     ))
      //   : (this.errorData = await this.processedErrorList(
      //       1,
      //       100,
      //       "Error",
      //       "ASC"
      //     ));
    } else {
      this.gradeForm.reset();
      return swal("Info", runResponse.responseMessage, "warning");
    }
  }

  async processedErrorList(
    beginPagination: number,
    endPagination: number,
    sortColumn: string,
    sortMode: string
  ) {
    let errorListRequest = {
      beginPagination,
      endPagination,
      sort: { column: sortColumn, mode: sortMode },
    };
    this.dataLoader = true;
    let errorListResponse = await this._openCards.errorListClientGradeProcess(
      errorListRequest
    );
    this.dataLoader = false;
    this.tabIndex = 1;
    return {
      totalCount: errorListResponse.totalCount,
      dataList: errorListResponse.errorList,
      beginPagination,
      endPagination,
    };
  }

  async processedDataList(
    beginPagination: number,
    endPagination: number,
    sortColumn: string,
    sortMode: string
  ) {
    let dataListRequest = {
      beginPagination,
      endPagination,
      sort: { column: sortColumn, mode: sortMode },
    };
    this.dataLoader = true;
    let dataListResponse = await this._openCards.dataListClientGradeProcess(
      dataListRequest
    );
    this.dataLoader = false;
    this.tabIndex = 0;
    return {
      totalCount: dataListResponse.totalCount,
      dataList: dataListResponse.processedList,
      beginPagination,
      endPagination,
    };
  }

  async pageNavigation(event: any) {
    if (this.isErrors) {
      this.errorData.beginPagination = event.initialValue;
      this.errorData.endPagination = event.endValue;
      this.errorData = await this.processedErrorList(
        this.errorData.beginPagination,
        this.errorData.endPagination,
        "Error",
        "ASC"
      );
    } else {
      this.processedData.beginPagination = event.initialValue;
      this.processedData.endPagination = event.endValue;
      this.processedData = await this.processedDataList(
        this.processedData.beginPagination,
        this.processedData.endPagination,
        "ClientName",
        "ASC"
      );
    }
  }

  sortingFormValidation() {
    this.sortingForm = this.fb.group({
      columnName: [null],
      orderValue: [null],
    });
  }

  async onSortByColumn() {
    if (this.isErrors) {
      this.errorData = await this.processedErrorList(
        this.errorData.beginPagination,
        this.errorData.endPagination,
        this.sortingForm.value !== null
          ? this.sortingForm.value.columnName.name
          : "Error",
        this.sortingForm.value.orderValue !== null
          ? this.sortingForm.value.orderValue.value
          : "ASC"
      );
    } else {
      this.processedData = await this.processedDataList(
        this.processedData.beginPagination,
        this.processedData.endPagination,
        this.sortingForm.value !== null
          ? this.sortingForm.value.columnName.name
          : "ClientName",
        this.sortingForm.value.orderValue !== null
          ? this.sortingForm.value.orderValue.value
          : "ASC"
      );
    }
  }

  async onSortByOrder() {
    if (this.isErrors) {
      this.errorData = await this.processedErrorList(
        this.errorData.beginPagination,
        this.errorData.endPagination,
        this.sortingForm.value.columnName !== null
          ? this.sortingForm.value.columnName.name
          : "Error",
        this.sortingForm.value !== null
          ? this.sortingForm.value.orderValue.value
          : "ASC"
      );
    } else {
      this.processedData = await this.processedDataList(
        this.processedData.beginPagination,
        this.processedData.endPagination,
        this.sortingForm.value.columnName !== null
          ? this.sortingForm.value.columnName.name
          : "ClientName",
        this.sortingForm.value !== null
          ? this.sortingForm.value.orderValue.value
          : "ASC"
      );
    }
  }

  async onCickProcessedDataExport() {
    this.isExportDisable = true;
    let dataExportRes =
      await this._openCards.exportClientGradeProgressProcessedData();
    this.isExportDisable = false;
    return dataExportRes.responseStatus
      ? window.open(dataExportRes.filePath)
      : null;
  }

  async onClickErrorDataExport() {
    this.isExportDisable = true;
    let errorExportRes =
      await this._openCards.exportClientGradeProgressErrorData();
    this.isExportDisable = false;
    return errorExportRes.responseStatus
      ? window.open(errorExportRes.filePath)
      : null;
  }
}
