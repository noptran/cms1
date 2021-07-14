import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FamilyContact } from "./family-contact";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { ProviderService } from "../../provider.service";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import swal from "sweetalert2";
import * as moment from "moment";
import { PagesizeService } from "../../../pagesize/pagesize.service";

@Component({
  selector: "app-family-contact",
  templateUrl: "./family-contact.component.html",
  styleUrls: ["./family-contact.component.scss"],
})
export class FamilyContactComponent implements OnInit {
  family: FamilyContact = new FamilyContact();
  FamilyContact: FormGroup;
  isEdit = false;
  breadcrumbs = [];
  metaData = [];
  loader;
  initial = 1;
  isAttachmentRequired = false;
  end = 100;
  showSfcsOffice = false;
  discardTo = "/provider/opencard/family/contact/view";
  providerContactID =
    parseInt(localStorage.getItem("providerContactID")) -
    this._opencard.getHasKey();
  providerName = "";
  listOfPersonTypes = [];
  filteredProviderList = [];
  showAdditionalProvider = false;
  allProvides = [
    { name: "All Providers", code: "All Providers" },
    { name: "Open Providers Only", code: "Open Providers Only" },
    { name: "Closed Providers Only", code: "Closed Providers Only" },
  ];
  defaultColDef: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  rowData: any;
  headers = [];
  rawdata = [];
  columnDefs: any[];
  group_select: FormGroup;
  chk = [];
  constructor(
    public _pageSize: PagesizeService,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _router: Router,
    public _opencard: OpencardsService,
    public _provider: ProviderService
  ) {
    this.group_select = this._fb.group({
      chk: [[]],
    });
  }
  req: any;
  ngOnInit() {
    this.providerName = this._opencard.getCurrentProviderName();
    this.formValidation();
    this.breadcrumbs.push(
      { label: "Person Types", href: "/reports/person/types", active: "" },
      { label: "Provider List", href: "/reports/provider/view", active: "" },
      { label: "Provider Form", href: "/reports/provider/detail", active: "" },
      { label: "Provider Opencards", active: "", href: "/provider/dashboard" },
      {
        label: "Family Contact list view",
        active: "",
        href: "/provider/opencard/family/contact/view",
      },
      { label: "Family Contact", active: "active" }
    );
    if (this._router.url === "/provider/opencard/family/contact/detail") {
      this.providerContactID =
        parseInt(localStorage.getItem("providerContactID")) -
        this._opencard.getHasKey();
      this.isAttachmentRequired = true;
      this.req = {
        providerContactID: this.providerContactID,
      };

      this.getProviderInfo(this.providerContactID);
    } else {
      this.family.beginDate = new Date();
      this.family.endDate = new Date();
      this.showAdditionalProvider = true;
      this.getOtherProviderLists(
        { value: { name: "All Providers", code: "All Providers" } },
        this.initial,
        this.end
      );
    }
    this.getProviderList();
  }
  getProviderInfo(id) {
    this.loader = document.getElementById("loading-overlay") as HTMLElement;
    this.loader.style.display = "block";
    const req = {
      providerContactID:
        parseInt(localStorage.getItem("providerContactID")) -
        this._opencard.getHasKey(),
    };
    this._caseTeam.getProviderContactInfo(req).then((data) => {
      if (data.providerContact) {
        this.getProviderContactDetails(data.providerContact);
      }
    });
  }

  getProviderContactDetails(data) {
    !isNullOrUndefined(data.beginDate)
      ? (data.beginDate = new Date(data.beginDate))
      : null;
    !isNullOrUndefined(data.endDate)
      ? (data.endDate = new Date(data.endDate))
      : null;
    !isNullOrUndefined(data.staffID)
      ? (data.staffID["fullName"] =
          data.staffID.lastName +
          " " +
          data.staffID.firstName +
          "( " +
          data.staffID.email +
          " )")
      : null;
    !isNullOrUndefined(data.otherAgencyStaffID)
      ? (data.otherAgencyStaffID["staffName"] =
          data.otherAgencyStaffID.lastName +
          " " +
          data.otherAgencyStaffID.firstName)
      : null;
    if (data.otherAgencyStaffID) {
      this.showSfcsOffice = true;
    } else {
      this.showSfcsOffice = false;
    }
    this.family = data;
    this.FamilyContact.disable();
    this.isEdit = true;
    this.isFormLog = true;
    this.formLogInfo.changedBy = !isNullOrUndefined(data.changedBy)
      ? data.changedBy
      : "------";
    this.formLogInfo.changedDate = !isNullOrUndefined(data.changedDate)
      ? moment(data.changedDate).format("MM/DD/YYYY hh:mm:ss A")
      : "--:--:-- --";
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.enteredBy)
      ? data.enteredBy
      : "------";
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.enteredDate)
      ? moment(data.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
      : "--:--:-- --";

    this.loader.style.display = "none";
  }
  formValidation() {
    this.FamilyContact = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
      notes: [null],
      units: [null, Validators.compose([Validators.required])],
      personTypeID: [null, Validators.compose([Validators.required])],
      contactTypeID: [null, Validators.compose([Validators.required])],
      contactReasonID: [null, Validators.compose([Validators.required])],
      contactStatusID: [null, Validators.compose([Validators.required])],
      staffID: [null],
      otherAgencyStaffID: [null],
    });
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "personType":
        obj = "personType";
        break;
      case "contactType":
        obj = "contactType";
        break;
      case "staff":
        obj = "staff";
        break;
      case "contactReason":
        obj = "contactReason";
        break;
      case "contactStatus":
        obj = "contactStatus";
        break;
      case "otherAgencyStaff":
        obj = "otherAgencyStaff";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item["fullName"] = `${item.lastName} ${item.firstName}( ${
          !isNullOrUndefined(item.email) ? item.email : "Not provided!"
        })`;
        item["staffName"] = `${item.lastName} ${item.firstName}`;
      });
      this.metaData = data.dropDown;
    });
  }
  formAction(source: FamilyContact) {
    if (this.FamilyContact.valid) {
      if (this.showSfcsOffice) {
        if (
          this.family.otherAgencyStaffID === null ||
          this.family.otherAgencyStaffID === undefined
        ) {
          return swal("Invalid!", "Please fill the mandatory fields!", "info");
        }
      } else if (!this.showSfcsOffice) {
        if (this.family.staffID === null || this.family.staffID === undefined) {
          return swal("Invalid!", "Please fill the mandatory fields!", "info");
        }
      }
      !isNullOrUndefined(source.beginDate)
        ? (source.beginDate = Date.parse(source.beginDate))
        : null;
      !isNullOrUndefined(source.endDate)
        ? (source.endDate = Date.parse(source.endDate))
        : null;
      !isNullOrUndefined(source.personTypeID)
        ? (source.personTypeID = source.personTypeID.personTypeID)
        : null;
      !isNullOrUndefined(source.contactTypeID)
        ? (source.contactTypeID = source.contactTypeID.contactTypeID)
        : null;
      !isNullOrUndefined(source.contactStatusID)
        ? (source.contactStatusID = source.contactStatusID.contactStatusID)
        : null;
      !isNullOrUndefined(source.contactReasonID)
        ? (source.contactReasonID = source.contactReasonID.contactReasonID)
        : null;
      !isNullOrUndefined(source.otherAgencyStaffID)
        ? (source.otherAgencyStaffID =
            source.otherAgencyStaffID.otherAgencyStaffID)
        : null;
      !isNullOrUndefined(source.notes) ? (source.notes = source.notes) : null;
      !isNullOrUndefined(source.units) ? (source.units = source.units) : null;
      !isNullOrUndefined(source.staffID)
        ? (source.staffID = source.staffID.staffID)
        : null;
      source.provider =
        parseInt(localStorage.getItem("providerID")) -
        this._opencard.getHasKey();
      if (source.otherAgencyStaffID) {
        source.isOtherAgencyStaff = true;
      } else {
        source.isOtherAgencyStaff = false;
      }
      var ids = [];
      this.selectedProvider.map((ele) => {
        ids.push(ele.proSelectId);
      });
      ids.push(source.provider);
      this.selectedProvider.push(source.provider);
      source.additionalProviders = ids;
      if (this._router.url === "/provider/opencard/family/contact/new") {
        this.save(source);
      } else if (
        this._router.url === "/provider/opencard/family/contact/detail"
      ) {
        this.update(source);
      }
    } else {
      return swal("Invalid!", "Please fill the mandatory fields!", "info");
    }
  }

  save(source: FamilyContact) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._caseTeam.savefamilyContact(source).then((data) => {
      this._router.navigate(["/provider/opencard/family/contact/view"]);
      loader.style.display = "none";
    });
  }

  update(source: FamilyContact) {
    source.providerContactID = this.providerContactID;
    this.save(source);
  }

  editForm() {
    this.FamilyContact.enable();
    this.isEdit = false;
  }

  showSfcs() {
    this.showSfcsOffice = !this.showSfcsOffice;
  }

  onBeginDateSelect() {
    if (this.family.endDate) {
      this.family.units = (
        Math.abs(this.family.endDate - this.family.beginDate) / 36e5
      ).toFixed(2);
    }
  }

  onEndDateSelect() {
    if (this.family.beginDate) {
      this.family.units = (
        Math.abs(this.family.endDate - this.family.beginDate) / 36e5
      ).toFixed(2);
    }
  }

  onUnitsSelect() {
    if (this.family.units && this.family.beginDate) {
      let beginDate = this.family.beginDate;
      this.family.endDate = beginDate.setHours(
        beginDate.getHours() + this.family.units * 36e5
      );
    }
  }

  getProviderList() {
    let req = {
      isProviderContact_BHOK: null,
      isProviderContact_NCFCHNE: null,
      isProviderContact_NCFCHOK: null,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "personTypeID", mode: "desc" },
    };

    // {
    //   "beginPagination": 1,
    //   "endPagination": 100,
    //   "isProviderContact": null,
    //   "isProviderContact_BHOK": null,
    //   "isProviderContact_NCFCHNE": null,
    //   "isProviderContact_NCFCHOK": null,
    //   "sort": { "column": "personTypeID", "mode": "desc"}
    //   }
    this._provider.getProviderContactPersonTypes(req).then((data: any) => {
      return (this.listOfPersonTypes = data.personType);
    });
  }

  onFilteredProviderList(event: any) {
    this.filteredProviderList = this.listOfPersonTypes.filter((item: any) => {
      return item.personType.toLowerCase().indexOf(event.query) !== -1;
    });
  }
  totalCount = 0;
  selected_add_provider: any;
  getOtherProviderLists(event, init, end) {
    this.selected_add_provider = event;
    var source;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    source = {
      condition: event.value.code,
      beginPagination: init,
      endPagination: end,
    };

    this._caseTeam.getAdditionalProviders(source).then((data) => {
      loader.style.display = "none";
      if (data.providerContact.length != 0) {
        // this.defaultColDef = {
        //   headerCheckboxSelection: this.isFirstColumn,
        //   checkboxSelection: this.isFirstColumn
        // };
        data.providerContact.map((ele) => {
          ele.checkSelect = false;
          !isNullOrUndefined(ele.beginDate)
            ? (ele.beginDate = moment(ele.beginDate).format("MM/DD/YYYY"))
            : null;
          !isNullOrUndefined(ele.endDate)
            ? (ele.endDate = moment(ele.endDate).format("MM/DD/YYYY"))
            : null;
          !isNullOrUndefined(ele["Begin Date"])
            ? (ele["Begin Date"] = moment(ele["Begin Date"]).format(
                "MM/DD/YYYY"
              ))
            : null;
          !isNullOrUndefined(ele["End Date"])
            ? (ele["End Date"] = moment(ele["End Date"]).format("MM/DD/YYYY"))
            : null;
        });
        this.rowData = data.providerContact;

        this.selectedProvider.forEach((element) => {
          this.rowData.map((rwData) => {
            if (element.proSelectId === rwData.providerID) {
              rwData.checkSelect = true;
            }
          });
        });
        // let rowData = [];
        this.totalCount = data.totalCount;
        if (data.totalCount < 100) {
          this.end = this.totalCount;
        }
        // let arrangments = [];
        // let test = [];
        // this.headers.push(Object.keys(this.rowData[0]));
        // this.headers[0].forEach(function (ele) {
        //   console.log("ele>>>>>", ele);
        //   let data = {
        //     headerName: ele
        //       .replace(/\b\w/g, l => l.toUpperCase())
        //       .replace(/([A-Z])/g, " $1")
        //       .trim(),
        //     field: ele
        //   };
        //   test.push(data);
        // });
        // test.sort((a, b) => a['order'] - b['order']);
        // test
        // this.rawdata.push(test);
        // this.columnDefs = test;
        // this.columnDefs.map(data => {
        //   data;
        //   if (data.field == 'DOB' || data.field == 'endDate' || data.field == 'beginDate' ||
        //     data.field == 'Begin Date' || data.field == 'End Date' || data.field == 'EOMDate' ||
        //     data.field == 'ReferralDate' || data.field == 'ClosureDate' || data.field == 'PaymentEndDate' ||
        //     data.field == 'PL_BeginDate' || data.field == 'PL_EndDate' || data.field == 'OrigDCFReferralDate' ||
        //     data.field == 'PermClosureDate' || data.field == 'RetractedDate' || data.field == 'ReceivedDate' ||
        //     data.field == 'Event_BeginDate' || data.field == 'Recent_LOCAuthDate' || data.field == 'Recidivist_ReturnOOHDate' ||
        //     data.field == 'Adoption_LegallyAvailable' || data.field == 'Recent_CP_Completed'
        //     || data.field == 'Recent_CP_PlannedPerm' || data.field == 'Posted_EOMDate' || data.field == 'EnteredDate' || data.field == 'PostedDate' ||
        //     data.field == 'PaymentDueDate' || data.field == 'VoidDate' || data.field == 'ReleaseDate' || data.field == 'Event_EndDate' || data.field == 'Placement_BeginDate' || data.field == 'Placement_EndDate' ||
        //     data.field == 'AdoptionDate' || data.field == 'ADTrans_ReferralDate' || data.field == 'BilledDate') {
        //     data['valueFormatter'] = function (params) {
        //       if (params.value) {
        //         return moment.utc(params.value).format("MM/DD/YYYY");
        //       } else {
        //         return "";
        //       }
        //     };
        //   }
        // })
      }
    });
  }
  selectedProvider = [];
  // onRowSelected(event) {
  //   var select_data=event.data.ProviderID;
  //   if (event.node.selected) {
  //     var data = {
  //       checkSelect:true,
  //       proSelectId:event.data.providerID
  //     };
  //     this.selectedProvider.push(data);
  //   } else {
  //     this.selectedProvider.splice(this.selectedProvider.indexOf(select_data), 1);
  //   };
  //   console.log("this.selectedProvider>>>>",this.selectedProvider);
  // };
  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    console.log("thisIsFirstColumn", thisIsFirstColumn);
    return thisIsFirstColumn;
  }
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getOtherProviderLists(
        this.selected_add_provider,
        this.initial,
        this.end
      );
    }
  }
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getOtherProviderLists(
        this.selected_add_provider,
        this.initial,
        this.end
      );
    }
  }
  single_claimApproved(index, datas, event) {
    var select_data = datas.providerID;
    if (event) {
      var data = {
        checkSelect: true,
        proSelectId: datas.providerID,
      };
      this.selectedProvider.push(data);
    } else {
      this.selectedProvider.splice(
        this.selectedProvider.indexOf(select_data),
        1
      );
    }
    console.log("this.selectedProvider>>>>", this.selectedProvider);
  }

  async onClickPrint() {
    let request = {
      providerContactID:
        parseInt(localStorage.getItem("familyProviderContactID")) -
        this._opencard.getHasKey(),
    };
    let response = await this._opencard.providerFamilyContactPrint(request);
    return swal("Info", response.responseMessage, "info");
  }
}
