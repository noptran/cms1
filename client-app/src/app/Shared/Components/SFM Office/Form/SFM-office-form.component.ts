import { OnInit, Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { AppSharedSFMOfficeDomain } from "../sfm-office.class";
import { AgencySFMOffice, GLKeys } from "../sfm-office";
import { OpencardsService } from "../../../../opecards-list-view/opencards.service";
import {LocalValues} from "../../../../local-values";
import { Router, ActivatedRoute } from "@angular/router";
import { StaffFormComponent } from "../../../../staff-form/staff-form.component";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-sfm-office-form",
  templateUrl: "./SFM-office-form.component.html",
  styleUrls: ["./SFM-office-form.component.scss"],
})
export class AppSharedSFMOfficeComponent implements OnInit {
  constructor(
    public _activatedRoute: ActivatedRoute,
    public _router: Router,
    public _fb: FormBuilder,
    public _messgae: MessageService,
    public _opencard: OpencardsService,
    public _local: LocalValues
  ) {}
  isPopWindow = false;
  public sfmOfficeForm: FormGroup;
  public sfmOfficeDomain: AppSharedSFMOfficeDomain = new AppSharedSFMOfficeDomain();
  office: AgencySFMOffice = new AgencySFMOffice();
  public state = [];
  public city = [];
  public zipcode = [];
  public isZipcodeDisable = false;
  public dcfAreaOffice = [];
  public catchmentArea = [];
  public careCenterStaff = [];
  public complianceTechStaff = [];
  isEdit = false;
  isLoading = false;
  public dataList = [];
  public dataListHeaders = [{ label: "SFM Office", value: "sfmOffice" }];
  isListViewWindow = false;
  public GLKeysDataHeader = [
    { label: "GLKey Type", value: "glKeyType" },
    { label: "GLKey", value: "glKey" },
    { label: "Begin Date", value: "beginDate" },
    { label: "End Date", value: "endDate" },
    { label: "Notes", value: "notes" },
  ];
  public GLKeyList = [];
  isGLKeyFormWindow = false;
  public glKeyForm: FormGroup;
  gl: GLKeys = new GLKeys();
  public glKeyTypes = [];
  public isGLKeyEdit = false;
  isTransportation = false;
  isCases = false;
  isStaff = false;
  public listViewSearhString: string;
  public sfmOfficeReq: any;
  public sfmGLKeyReq: any;
  isPopUp: any;

  count = 0;

  ngOnInit() {
    this.formValidation();
    this.glKeyFormValidation();
    this.getList();
  }

  toggle() {
    return (this.isPopWindow = !this.isPopWindow);
  }

  public formValidation() {
    this.sfmOfficeForm = this._fb.group({
      officeName: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      tollFreeNumber: "",
      fax: "",
      facilityId: "",
      isFCHOffice: "",
      mainOffice: "",
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      zip: new FormControl("", Validators.required),
      dcfAreaOffice: "",
      careCenterStaff: "",
      officeComplianceTechStaff: "",
      catchmentArea: "",
      notes: "",
    });
  }

  public async formAction() {
    if (this.sfmOfficeForm.valid) {
      this.sfmOfficeDomain.agencySFMOffice = this.office;
      const request = this.sfmOfficeDomain.saveForm();
      if (this.office.sfaofficeID) {
        const response = await this._opencard.updateSFMOfficeForm(this.office);
        if (response) {
          this._messgae.add({
            severity: "success",
            summary: "Update!",
            detail: "Record has been updated successfully!",
          });
          this.getList();
          return (this.isPopWindow = false);
        } else {
          return this._messgae.add({
            severity: "warning",
            summary: "Not able to update!",
            detail: "Please contact your administrator!",
          });
        }
      } else {
        const response = await this._opencard.saveSFMOfficeForm(request);
        if (response) {
          this._messgae.add({
            severity: "success",
            summary: "Save!",
            detail: "Record has been created successfully!",
          });
          this.getList();
          return (this.isPopWindow = false);
        } else {
          return this._messgae.add({
            severity: "warning",
            summary: "Not able to save!",
            detail: "Please contact your administrator!",
          });
        }
      }
    } else {
      return this._messgae.add({
        severity: "info",
        summary: "Invalid form",
        detail: "Mandatory field is missing.",
      });
    }
  }

  public discard() {
    return (this.isPopWindow = false);
  }

  public async filterState(event: any) {
    const request = { Object: "state", value: event.query };
    this.state = await this._opencard.getDropdownValues(request);
  }

  public async filterCity(event: any) {
    const request = { stateID: this.office.stateID.stateID };
    const response = await this._opencard.getCityFromState(request);

    this.city = response.city.filter((item: any) => {
      return item.city.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  public async filterZipcode(event: any) {
    const request = {
      stateID: this.office.stateID.stateID,
      cityID: this.office.cityID.cityID,
    };
    const response = await this._opencard.getZipcodeFromCity(request);
    if (response.zipcode.length <= 1) {
      this.isZipcodeDisable = true;
      this.office.zipcodeID = response.zipcode[0];
    } else {
      this.isZipcodeDisable = false;
    }
    this.zipcode = response.zipcode.filter((item: any) => {
      return item.zipcode.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  public async filterDCFAreaOffice(event: any) {
    const response = await this._opencard.getDCFAreaOffice();
    this.dcfAreaOffice = response.filter((item: any) => {
      return item.dISPLN.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  public async filterCatchmentArea(event: any) {
    const response = await this._opencard.getCatchmentArea();
    this.catchmentArea = response.filter((item: any) => {
      return item.catchDesc.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  public async filterCareCenterStaff(event: any) {
    const response = await this._opencard.getCareCenterStaff();
    this.careCenterStaff = response.filter((item: any) => {
      return item.staffName.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  public async filterOfficeComplianceTech(event: any) {
    const request = { stateID: this.office.stateID.stateID };
    const response = await this._opencard.getStaffByStateID(request);
    this.complianceTechStaff = response.filter((item: any) => {
      return item.StaffName.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  public onClickEditForm() {
    this.isEdit = false;
    this.sfmOfficeForm.enable();
  }

  public async getList() {
    const request = { beginPagination: 1, endPagination: 100 };
    this.dataList = await this._opencard.getAgencySFMOfficeList(request);
    return (this.isListViewWindow = true);
  }

  public onClickListAddBtn() {
    this.office = new AgencySFMOffice();
    this.onLoadNewFormValues();
    this.isEdit = false;
    this.toggle();
    this.isListViewWindow = false;
  }

  async onEditClick(selectedColumn: any) {
    const request = { sfaOfficeID: selectedColumn.sfaOfficeID };
    this.isPopWindow = true;
    this.isLoading = true;
    const response = await this._opencard.getSFMoffice(request);
    this.isListViewWindow = false;
    this.sfmOfficeReq = { sfaOfficeID: response.sFAOffice.sfaofficeID };
    console.log("SFM office response", response);
    if (response.responseStatus) {
      this._local.sfmOfficeID = response.sFAOffice.sfaofficeID;
      this.isLoading = false;
      this.office = this.sfmOfficeDomain.getById(response.sFAOffice);
      this.getGLKeyList();
      this.isEdit = true;
    } else {
      this.isLoading = false;
    }
  }

  onListOpen() {
    this.office = new AgencySFMOffice();
    this.isEdit = false;
    return (this.isListViewWindow = true);
  }

  onLoadNewFormValues() {
    this.office.stateID = { stateID: 34, abbreviation: "KS", state: "Kansas" };
  }

  public async getGLKeyList() {
    const request = {
      sfaOfficeID: this.office.sfaofficeID,
      beginPagination: 1,
      endPagination: 100,
    };
    const response = await this._opencard.getListOfGLKeysBySFAOfficeID(request);
    if (response.responseStatus) {
      this.GLKeyList = response.sFAOfficeGLKeyList;
      // this.GLKeyList = [
      //     {
      //         "sFAOfficeGLKeyID": 228,
      //         "sFAOfficeID": 52,
      //         "officeName": "new office",
      //         "glKeyTypeID": 1,
      //         "glKeyType": "BBGLKey_FC",
      //         "beginDate": "08/10/2020",
      //         "endDate": null,
      //         "glKey": "",
      //         "notes": "new sFAOfficeGLKey notes",
      //         "enteredBy": "Durai, Shankar",
      //         "enteredDate": "08/10/2020",
      //         "changedBy": "Durai, Shankar",
      //         "changedDate": "08/10/2020"
      //     }
      // ]
    }
  }

  public openGLKeyWindow() {
    this.gl = new GLKeys();
    this.isEdit = false;
    this.glKeyForm.enable();
    this.isGLKeyFormWindow = true;
  }

  public glKeyFormValidation() {
    this.glKeyForm = this._fb.group({
      beginDate: new FormControl("", Validators.required),
      endDate: "",
      glKeyTypeID: new FormControl("", Validators.required),
      glKey: "",
      notes: "",
    });
  }

  public async glKeyFormAction() {
    this.sfmOfficeDomain.glKey = this.gl;
    if (this.glKeyForm.valid) {
      if (this.sfmOfficeDomain.glKey.sfaOfficeGLKeyID) {
        const glOffice = {
          beginDate: !isNullOrUndefined(this.gl.beginDate)
            ? this._local.stringFormatDatetime(this.gl.beginDate)
            : null,
          endDate: !isNullOrUndefined(this.gl.endDate)
            ? this._local.stringFormatDatetime(this.gl.endDate)
            : null,
          sFAOfficeGLKeyID: this.gl.sfaOfficeGLKeyID,
          glKeyTypeID: this.gl.glKeyTypeID.glKeyTypeID,
          glKey: this.gl.glKey,
          notes: this.gl.notes,
        };
        const updaterequest = {
          sFAOfficeGLKeyList: [glOffice],
          sfaOfficeID: this.office.sfaofficeID,
        };
        const updateresponse = await this._opencard.updateGLKey(updaterequest);
        if (updateresponse) {
          this._messgae.add({
            severity: "success",
            summary: "Update!",
            detail: "GLKey has been updated successfully!",
          });
          this.getGLKeyList();
          return (this.isGLKeyFormWindow = false);
        } else {
          return this._messgae.add({
            severity: "warning",
            summary: "Not able to update!",
            detail: "Please contact your administrator!",
          });
        }
      } else {
        const saverequest = {
          sFAOfficeGLKeyList: [this.sfmOfficeDomain.saveGLKeyData()],
          sfaOfficeID: this.office.sfaofficeID,
        };
        const saveresponse = await this._opencard.saveGLKey(saverequest);
        if (saveresponse) {
          this._messgae.add({
            severity: "success",
            summary: "Save!",
            detail: "GLKey has been save successfully!",
          });
          this.getGLKeyList();
          return (this.isGLKeyFormWindow = false);
        } else {
          return this._messgae.add({
            severity: "warning",
            summary: "Not able to save!",
            detail: "Please contact your administrator!",
          });
        }
      }
    } else {
      return this._messgae.add({
        severity: "info",
        summary: "Invalid form",
        detail: "Mandatory field is missing.",
      });
    }
  }

  public onClickCancelGLKeyForm() {
    return (this.isGLKeyFormWindow = false);
  }

  public async filterGLKeyTypes(event: any) {
    const request = { Object: "glKeyType", value: event.query };
    this.glKeyTypes = await this._opencard.getDropdownValues(request);
    //  = response.filter(item => { return item.glKeyType.toLowerCase().indexOf(event.query) !== -1 });
  }

  public async onClickGLKeyEdit(selectedGLKey: any) {
    console.log("Selected GL key", selectedGLKey.sFAOfficeGLKeyID);
    const request = { sFAOfficeGLKeyID: selectedGLKey.sFAOfficeGLKeyID };
    const response = await this._opencard.getByIDGLKey(request);
    this.sfmGLKeyReq = {
      sFAOfficeGLKeyID: response.sFAOfficeGLKey.sfaOfficeGLKeyID,
    };
    if (response.responseStatus) {
      this.gl = this.sfmOfficeDomain.getGLKeyID(response.sFAOfficeGLKey);
      this.isGLKeyFormWindow = true;
      this.isGLKeyEdit = true;
      this.glKeyForm.disable();
    } else {
      return this._messgae.add({
        severity: "warning",
        summary: "Not able to open!",
        detail: "Please contact your administrator!",
      });
    }
  }

  public onClickGLKeyEditForm() {
    this.glKeyForm.enable();
    this.isGLKeyEdit = false;
  }

  closeModelComp(event, type) {
    switch (type) {
      case "SFM_OFFICE":
        this.isTransportation = false;
        break;
      case "SFM_OFFICE_CASES":
        this.isCases = false;
        break;
      case "SFM_OFFICE_STAFF":
        this.isStaff = false;
        break;
    }
  }

  ngOnDestroy() {
    this._local.sfmOfficeID = null;
  }
  onJumpToTree(card) {
    this.isPopWindow = false;
    this.isListViewWindow = false;
    switch (card) {
      case "TRANSPORTATION (SFM OFFICE)":
        this._router.navigate(["/reports/staff/details"], {
          queryParams: {
            refresh: new Date().getTime(),
          },
        });

        break;
      case "TRANSPORTATION":
        this._router.navigate(["/reports/person/types"]);
        this.isPopWindow = true;
        break;
      case "STAFF":
        if (this._router.url.includes("/reports/staff/details")) {
          this._local.staffCount = this._local.staffCount + 1;
          this._router.navigate(["/reports/staff/details"], {
            queryParams: {
              refresh: new Date().getTime(),
            },
          });
        }
        break;
      case "CASES":
        if (this._router.url.includes("/reports/staff/details")) {
          this._local.staffCount = this._local.staffCount + 1;
          this._router.navigate(["/reports/staff/details"], {
            queryParams: {
              refresh: new Date().getTime(),
            },
          });
        }
        break;
    }
  }

  public onListSearch() {
    this.dataList = this.dataList.filter((item: any) => {
      return item.officeName === this.listViewSearhString;
    });
  }

  public onListSearchClear() {
    this.listViewSearhString = "";
    this.getList();
  }

  onSFMOfficeDelete(event: any) {
    this.isPopWindow = false;
    this.getList();
    this.isListViewWindow = true;
  }

  onGLKeyDeleted(event: any) {
    this.isGLKeyFormWindow = false;
    this.getGLKeyList();
  }
}
