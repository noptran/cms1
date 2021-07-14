import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  Output,
} from "@angular/core";
import { AgGridNg2 } from "ag-grid-angular";
import { PagesizeService } from "../../pagesize/pagesize.service";
import {LocalValues} from "../../local-values";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import swal from "sweetalert2";
import { CaseTeamService } from "../../case-team/case-team.service";
import { FamilyChnageApprove } from "./family-change-approve";
import { CurrentValuesList } from "./family-change-approve";
import * as moment from "moment";

@Component({
  selector: "app-family-change-approval",
  templateUrl: "./family-change-approval.component.html",
  styleUrls: ["./family-change-approval.component.scss"],
})
export class FamilyChangeApprovalComponent implements OnInit {
  FamilyChnageApprove;
  fca: FamilyChnageApprove = new FamilyChnageApprove();
  currentValues: CurrentValuesList = new CurrentValuesList();

  isPopListWindow = true;
  isPopWindow = false;
  isPlesWait = false;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  @ViewChild("agGrid", { static: true }) agGrid: AgGridNg2;

  @Output() closeModel = new EventEmitter<string>();

  getByIdkey: any;
  weekId: any;

  isWeeklistPleasWait = false;
  isWeekListPopWindow = false;
  weekListRowData: any;
  weekListTotalCount: any;
  weekListInitial = 1;
  weekListEnd = 100;
  weekListColumnDefs = [];

  weekListHeaders = [];
  weekListRawdata = [];

  isWeekProviderlistPleasWait = false;
  isWeekProviderListPopWindow = false;
  weekProviderListRowData: any;
  weekProviderListTotalCount: any;
  weekProviderListInitial = 1;
  weekProviderListEnd = 100;
  weekProviderListColumnDefs = [];

  weekProviderListHeaders = [];
  weekProviderListRawdata = [];

  isFCHPopWindow = false;

  weeklyProviderInfo: any;

  metaData = [];
  weeklyDateSuggestions = [];
  isCurrentValuePopWindow = false;
  weeklyDateRange: any;
  authStaffId: any;
  public weeklyDateRangeList = [];
  public weeklyChangeAuthList = [];
  public isOpenWeeklyChangeAuthList = false;
  public isWeeklyAuthListLoader = false;
  public weeklyChangeAuthHeader: string;
  public weeklyChangeAuthListHeaders = [];
  public weeklyChangeAuthListRawData = [];
  public weeklyChangeAuthListColumnDefs = [];
  public fchAuthTotalCount: number;
  public fchAuthListInitial = 1;
  public fchAuthListEnd = 100;
  public selectedListType: string;

  weekListDefaultColDef: any;
  weekProviderListDefaultColDef: any;

  constructor(
    public _pageSize: PagesizeService,
    public _caseTeam: CaseTeamService,
    public _local: LocalValues,
    public _opencard: OpencardsService
  ) {}

  ngOnInit() {
    // this.getCurrentWeekRange();
    this.getAllListView(this.initial, this.end);
  }

  close() {
    let closeEV = "false";
    this.closeModel.emit(closeEV);
  }

  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
    }
  }
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

  getAllListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      staffID: parseInt(localStorage.getItem("staffIdPerson")),
      beginPagination: initial,
      endPagination: end,
    };

    // CODE FOR LIST VIEW -

    this._opencard
      .listOfStaffFamilyChangeApproval(me_Req) //Test comment for code conflict sync issue
      .then((data) => {
        this.isPlesWait = false;
        this.weeklyDateRangeList = data.familychangesApprovalList;
        this.totalCount = data.totalCount;
        this.decideRowColor(data);
        loader.style.display = "none";
      });
  }

  /** Color for weekly date range column  */
  public decideRowColor(data: any) {}

  selectedWeekRange = null;

  public onResourceWorkerSelect(selectedRowData: any) {
    this.weekId = selectedRowData.weekID;
    this.selectedWeekRange = selectedRowData.weeklyDateRange;
    this.isWeekListPopWindow = true;
    this.weekListGetAllListView(this.weekListInitial, this.weekListEnd);
  }

  public async onWeeklyDateRangeSelect(selectedRowData: any) {
    this.weeklyChangeAuthHeader = `FCH Family Change Review`;
    this.isWeeklyAuthListLoader = true;
    let request = {
      staffID: selectedRowData.staffID,
      weekID: selectedRowData.weekID,
    };
    let response = await this._opencard.getWeeklyChangeAuthList(request);
    this.isWeeklyAuthListLoader = false;
    this.weeklyChangeAuthList = response.weeklyChangeAuthList;
    this.fchAuthTotalCount = response.totalCount;
    this.fchFamilyReviewColumnDef();
    this.isOpenWeeklyChangeAuthList = true;
  }

  // Week List Pop Up Window Functionalities
  closeWeekList() {}

  weekListPagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.weekListInitial = begin;
      this.weekListEnd = end;
    }
  }
  weekListPagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.weekListInitial = begin;
      this.weekListEnd = end;
      return this.weekListGetAllListView(
        this.weekListInitial,
        this.weekListEnd
      );
    }
  }

  weekListGetAllListView(initial, end) {
    this.isWeeklistPleasWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      beginPagination: initial,
      endPagination: end,
      staffID: parseInt(localStorage.getItem("staffIdPerson")),
      weekID: this.weekId,
    };

    this._opencard
      .listOfStaffFamilyChangeApprovalWeekList(me_Req)
      .then((data) => {
        this.isWeeklistPleasWait = false;
        this.weekListGenerateListView(data);
        loader.style.display = "none";
      });
  }

  gridOptionsResourceHome = {};
  weekListGenerateListView(data) {
    let rowData = [];
    let test = [];
    this.weekListTotalCount = data.totalCount;

    this.weekListRowData = data.familychangesApprovalWeekList;
    this.gridOptionsResourceHome["getRowStyle"] = (params) => {
      if (params.data.foreColor == "OPEN") {
        params.data.foreColor = "purple";
      }
      return { color: params.data.foreColor };
    };

    if (this.weekListRowData.length > 0) {
      this.weekListHeaders.push(Object.keys(this.weekListRowData[0]));
      this.weekListHeaders[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a["order"] - b["order"]);
      test.splice(3, 3);
      test.pop();
      test.pop();
      test.pop();
      this.weekListRawdata.push(test);
      this.weekListColumnDefs = this.weekListRawdata[0];
      if (this.weekListTotalCount < 100) {
        this.weekListEnd = this.weekListTotalCount;
      }
    }
  }

  onWeekListRowSelected(event) {
    this.isWeekProviderListPopWindow = true;
    this.authStaffId = event.data.staffID;
    this.getCurrentWeekRange();
    this.weekProviderListGetAllListView(this.weekListInitial, this.weekListEnd);
  }

  // Week Provider List Pop Up Window Functionalities

  closeWeekProviderList() {}

  weekProviderListPagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.weekProviderListInitial = begin;
      this.weekProviderListEnd = end;
    }
  }
  weekProviderListPagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.weekProviderListInitial = begin;
      this.weekProviderListEnd = end;
      return this.weekProviderListGetAllListView(
        this.weekProviderListInitial,
        this.weekProviderListEnd
      );
    }
  }

  weekProviderListGetAllListView(initial, end) {
    this.isWeekProviderlistPleasWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      staffID: this.authStaffId,
      weekID: this.weekId,
    };

    this._opencard.listOfStaffFCAWeeklyChangeAuthWorker(me_Req).then((data) => {
      this.isWeekProviderlistPleasWait = false;
      this.weekProviderListGenerateListView(data);
      loader.style.display = "none";
    });
  }

  gridOptionsResourceWorker = {};
  weekProviderListGenerateListView(data) {
    let rowData = [];
    let test = [];
    this.weekProviderListTotalCount = data.totalCount;

    // CAPS Letter
    this.weekProviderListRowData = data.WeeklyProviderList;
    this.gridOptionsResourceWorker["getRowStyle"] = (params) => {
      switch (params.data.statustype) {
        case "Pending":
          return { color: "purple" };

        case "Approved":
          return { color: "green" };

        case "Denied":
          return { color: "orange" };

        case "Auto Approve":
          return { color: "blue" };
      }
    };

    if (this.weekProviderListRowData.length > 0) {
      this.weekProviderListHeaders.push(
        Object.keys(this.weekProviderListRowData[0])
      );
      this.weekProviderListHeaders[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a["order"] - b["order"]);
      test.splice(0, 1);
      test.splice(2, 4);
      test.splice(3, 3);
      test.pop();
      test.pop();
      test.pop();
      test.pop();
      test.pop();
      this.weekProviderListRawdata.push(test);
      this.weekProviderListColumnDefs = this.weekProviderListRawdata[0];
      if (this.weekProviderListTotalCount < 100) {
        this.weekProviderListEnd = this.weekProviderListTotalCount;
      }
    }
  }

  onWeekProviderListRowSelected(event, listType: string) {
    this.selectedListType = listType;
    switch (event.data.statustype || event.data.status) {
      // case '':
      //   this.isStatusDisabled = false;
      //   break;

      // case 19:
      //   this.isStatusDisabled = false;
      //   break;

      // case 20:
      //   this.isStatusDisabled = false;
      //   break;

      case "Auto Approve":
        this.isStatusDisabled = true;
        break;

      default:
        this.isStatusDisabled = false;
    }
    if (listType !== "resourceHome") {
      event.data["statustype"] = event.data.status;
      delete event.data.status;
      event.data["status"] = event.data.statusTypeID;
    }
    this.weeklyProviderInfo = event.data;
    this.fca = this.weeklyProviderInfo;
    this.fca.beginDate = this.fca.beginDate
      ? new Date(this.fca.beginDate)
      : null;
    this.fca.endDate = this.fca.endDate ? new Date(this.fca.endDate) : null;

    this.getFcaStatus();
    // this.getCurrentWeekRange();
    this.isFCHPopWindow = true;
    this.isOpenWeeklyChangeAuthList = false;
  }

  updateFchData() {
    this.fca.status = this.fca.status.statusTypeID;
    this.fca.beginDate = this.fca.beginDate
      ? this._local.stringFormatDatetime(Date.parse(this.fca.beginDate))
      : null;
    this.fca.endDate = this.fca.endDate
      ? this._local.stringFormatDatetime(Date.parse(this.fca.endDate))
      : null;

    // this.weekProviderListRowData.forEach((element) => {
    //   if (element.providerWeeklyChangeID === this.fca.providerWeeklyChangeID) {
    //     element = this.fca;
    //   }
    // });

    this.saveFCA();
    this.isFCHPopWindow = false;
  }

  closeFCAFormView() {
    this.isFCHPopWindow = false;
  }

  closeFCAPrompt() {
    this.isWeekProviderListPopWindow = false;
  }

  saveFCA() {
    let req;
    let approvalList = [];
    let approvalListMap = [];
    approvalListMap =
      this.selectedListType === "resourceHome"
        ? this.weekProviderListRowData
        : this.weeklyChangeAuthList;
    approvalListMap.map((data) => {
      let list = {};
      list["status"] = data.status;
      list["staffID"] = data.staffID;
      list["providerWeeklyChangeID"] = data.providerWeeklyChangeID;
      list["providerID"] = data.providerID;
      list["notes"] = data.notes;
      list["beginDate"] = data.beginDate;
      list["endDate"] = data.endDate;
      list["providerStatus"] = data.change_ProviderStatusTypeID;
      list[data.colName] = data.colValue;
      let type = this.getType(data.colName);
      list[type] = true;
      list["weekID"] = this.weekId;
      list["changes"] = data.changes;
      list["reasonOnHoldID"] = null;
      if (data.beginDate.includes("-")) {
        approvalList.push(list);
      }
    });

    req = {
      approvalList: approvalList,
    };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.familyChangeApprovalSave(req).then((data) => {
      loader.style.display = "none";
      swal("Success", "Record has been saved!", "success");
      // this.weekProviderListGetAllListView(
      //   this.weekProviderListInitial,
      //   this.weekProviderListEnd
      // );
    });
  }

  getType(name) {
    let type = "";
    switch (name) {
      case "capacity":
        type = "isPreferredCapacity";
        break;

      case "providerType":
        type = "isProviderType";
        break;

      case "reasonOnHoldID":
        type = "isProviderStatus";
        break;
    }

    return type;
  }

  showCurrentValues() {
    let request = {
      weekID: this.weekId,
      providerID: this.fca.providerID,
    };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard
      .familyChangeApprovalgetCurrentValues(request)
      .then((data) => {
        loader.style.display = "none";
        if (data.currentValuesList.length > 0) {
          this.currentValues = data.currentValuesList[0];
        }
        this.isCurrentValuePopWindow = true;
      });
  }

  closeCurrentValuePopUp() {
    this.isCurrentValuePopWindow = false;
  }

  getMetaData(event, label) {
    switch (label) {
      case "status":
        this._caseTeam.getFchWeeklyUpdateStatus().then((data) => {
          this.metaData = data.statusTypeList.filter((status) => {
            return status.statusTypeID != 21;
          });
        });
        break;

      case "weeklyDateRange":
        let request = {
          value: event.query,
          beginPagination: 1,
          endPagination: 500,
          sort: {
            column: "weeklyEndDate",
            mode: "desc",
          },
        };
        this._opencard
          .familyChangeApprovalgetWeeklyDateRange(request)
          .then((data) => {
            this.weeklyDateSuggestions = data.weeklyDateRangeList;
          });
        break;
    }
  }

  isStatusDisabled = false;

  getFcaStatus() {
    switch (this.fca.status) {
      case 9:
        this.fca.status = {
          statusType: "Pending",
          statusTypeID: 9,
        };

        break;

      case 19:
        this.fca.status = {
          statusType: "Approved",
          statusTypeID: 9,
        };

        break;

      case 20:
        this.fca.status = {
          statusType: "Denied",
          statusTypeID: 9,
        };

        break;

      case 21:
        this.fca.status = {
          statusType: "Auto Approve",
          statusTypeID: 9,
        };

        break;
    }
  }

  getCurrentWeekRange() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    let startDay = moment.utc(firstday).format("MM/DD/YYYY");
    let lastDay = moment.utc(lastday).format("MM/DD/YYYY");
    this.weeklyDateRange = {};
    this.weeklyDateRange["weeklyDateRange"] = this.selectedWeekRange;
    this.weeklyDateRange["weeklyBeginDate"] = firstday;
    this.weeklyDateRange["weeklyEndDate"] = lastday;
    this.weeklyDateRange["weeklyDateID"] = this.weekId;
  }

  onWeekDropdownSelection(event) {
    this.weekId = event.weeklyDateID;
    this.weekProviderListGetAllListView(1, 100);
  }

  getRowStyleValue(event) {
    console.log("event in getRowStyleValue is", event);
  }

  public fchFamilyReviewColumnDef() {
    let test = [];
    if (this.weeklyChangeAuthList.length > 0) {
      this.weeklyChangeAuthListHeaders.push(
        Object.keys(this.weeklyChangeAuthList[0])
      );
      this.weeklyChangeAuthListHeaders[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a["order"] - b["order"]);
      test.splice(3, 3);
      test.pop();
      test.pop();
      test.pop();
      this.weeklyChangeAuthListRawData.push(test);
      this.weeklyChangeAuthListColumnDefs = this.weeklyChangeAuthListRawData[0];
      if (this.fchAuthTotalCount < 100) {
        this.fchAuthListEnd = this.fchAuthTotalCount;
      }
    }
  }

  public fchAuthListPagesizeNav(event: any) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.fchAuthListInitial = begin;
      this.fchAuthListEnd = end;
    }
  }

  public fchAuthListPagesize(event: any) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.fchAuthListInitial = begin;
      this.fchAuthListEnd = end;
      // return this.weekListGetAllListView(
      //   this.weekListInitial,
      //   this.weekListEnd
      // );
    }
  }
}
