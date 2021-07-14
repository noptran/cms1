import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MenuItem } from "primeng/api";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { ClildFormService } from "../child-forms/child-forms.service";
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import { ReferralViewService } from "../referral-view/referral-view.service";
import { TeamFormService } from "../team-form/team-form.service";
import * as moment from "moment";
import { ClientInfo } from "./client-info";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { LocalValues } from "../local-values";
import { environment } from "../../environments/environment";
// import { RfcReferralService } from '../reintegration/rfc-referral/rfc-referral.service';

@Component({
  selector: "app-form-header",
  inputs: [
    "title",
    "subtitle",
    "status",
    "breadcrumbs",
    "formstatus",
    "formNavigation",
    "moreActions",
    "subtitle",
    "backLabel",
    "isBackLabel",
  ],
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"],
  outputs: ["moreaction", "cmsOut"],
})
export class FormHeaderComponent implements OnInit {
  constructor(
    public _team: TeamFormService,
    public _referral: ReferralViewService,
    public _opencards: OpencardsService,
    public _client: ClildFormService,
    public _router: Router,
    public _localValues: LocalValues
  ) { }

  statusIcon: any;
  statusText: any;
  statusDesc: any;
  statusClass: any;
  crumbs: any;
  headerColor: any;
  formSwitch = false;
  formNavigation: boolean;
  items: MenuItem[];
  clientInfo: ClientInfo;
  isClientInfoReady = false;
  isShowClientInfoPanel = true;
  isSubheaderExpand = false;
  referralInfo: any;
  staffName: any;
  isHohAvailable = false;
  hohMember: any;
  facts: any;
  isFactAvailable = false;
  clientPicPath: string;
  env = environment;
  selectedProviderInfo: any;
  isProviderInfoDisplay = false;
  isProviderInfoPanelReady = false;
  showProviderProfile = false;
  isMorePersonDetail = false;
  isProfileView = false;
  isProviderInfoView = false;
  @Input()
  title: any;
  status: any;
  breadcrumbs: any;
  formstatus: boolean;
  moreActions = [];
  subtitle: any;
  backLabel: any;
  isBackLabel = false;
  @Output()
  moreaction = new EventEmitter();
  cmsOut = new EventEmitter();
  req: any;
  showProfileInfo: boolean;
  clientDOB: any;
  clientAge: any;
  clientCurrentReferralInfo: any;
  clientOpenRefBeinDate: any;
  clientOpenRefEndDate: any;
  clientProfileData: any;
  currentPersonType: string;
  currentPrimaryValue: Number;
  providerData: any;
  isWaitForProviderRes = false;
  isShowStaffInfoView = false;
  isShowSchoolProfile = false;
  staffData: any;
  staffNameData: any;
  schoolData: any;

  ngOnInit() {
    this.restrictProfileView();

    if (this._router.url == "/provider_Authorization") {
      this.isProviderInfoView = false;
      localStorage.removeItem('providerID');
    } else {
      this.restrictProviderInfoView();
    }

    this.assignPersonMasters();
    this.getStaffProfileInfo();
    this.getStaffNameProfileInfo();
    this.getSchoolProfileInfo();
    this.crumbs = this.breadcrumbs;
    this.statusChecker(this.status);
    this.formStatusControll();
    //   this.items = [
    //     {label: 'New', icon: 'pi pi-fw pi-plus'},
    //     {label: 'Open', icon: 'pi pi-fw pi-download'},
    //     {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
    // ];
    this.subtitle = localStorage.getItem("clientName");

    // this.clientInfoPanel();
    this.getProviderProfileInfo();
  }

  /**
   * return the status state
   * @param status status input
   */
  statusChecker(status) {
    let status_icon, status_text, status_discription, status_class;
    switch (status) {
      case "active":
        status_icon = "fa fa-check";
        status_text = "Active";
        status_discription = "Form Active";
        status_class = "active";
        break;
      case "draft":
        status_icon = "fa fa-file-text-o";
        status_text = "Draft";
        status_discription = "In draft mode";
        status_class = "draft";
        break;
    }

    this.statusIcon = status_icon;
    this.statusText = status_text;
    this.statusDesc = status_discription;
    this.statusClass = status_class;
  }

  /**
   * @return one step back to the form
   */
  back() {
    return window.history.back();
  }

  /**
   * It's determine whether form is active or in active.
   */
  formStatusControll() { }

  moreBtnAction() {
    this.moreaction.emit("more action trigger!");
  }

  goToPreviousStep() {
    window.history.back();
  }

  // getClientDetails() {
  //   if (this._client.getClientId()) {
  //     this.req = { clientID: this._client.getClientId().id };
  //   } else {
  //     this.req = { clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey() };
  //   }
  //   // let clientId = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
  //   // this._client.getDetailsById(this.req).then((data: any) => {
  //   //   this.clientInfo = true;
  //   //   !isNullOrUndefined(data.person.ssn) ? data.person.ssn = data.person.ssn.replace(/.(?=.{4})/g, 'X') : 'No record found!';
  //   //   this.clientInfo = data.person;
  //   //   this.clientDOB = !isNullOrUndefined(this.clientInfo.dob) ? moment.utc(this.clientInfo.dob).format('MM/DD/YYYY') : null;
  //   // })
  // }

  getReferralDetails() {
    if (this._referral.getReferralData()) {
      this._referral.getReferralData().then((data) => {
        this.referralInfo = data;
        if (
          !isNullOrUndefined(this._opencards.getOtherRefDetails().referralName)
        ) {
          if (this._opencards.getOtherRefDetails().referralName === "FI") {
            this.staffName =
              data.personID.firstName + " " + data.personID.lastName;
            this.facts = data.referral.caseID.facts;
            this.isFactAvailable = true;
          } else {
            this.isFactAvailable = false;
          }
          // if (this._opencards.getOtherRefDetails().referralName === "FC") {
          //   let req = { referralID: localStorage.getItem('referralId') };
          //   this._rfcReferal.getByIdReferral(req)
          //     .then((data) => {
          //       this.staffName = data.srsStaffID.firstName + " " + data.srsStaffID.lastName;
          //       this.facts = data.referral.caseID.facts;
          //       this.isFactAvailable = true;
          //     })
          // }
          // else {
          //   this.isFactAvailable = false;
          // }
        }
      });
    }
  }

  hohValidation() {
    let initiator = 0;
    const fisArr = this.referralInfo.fis;
    const fisReverseArray = fisArr.reverse();

    fisReverseArray.map((element) => {
      if (element.isCaseHead === true) {
        if (initiator === 0) {
          this.hohMember = element.clientName;
          this.isHohAvailable = true;
          initiator = initiator + 1;
        }
      }
    });
  }

  getStaffDetils() {
    this._team.getUserName().then((data) => {
      this.staffName = data.users.firstName + " " + data.users.lastName;
    });
  }

  clientInfoPanel() {
    const url = this._router.url;
    if (url.includes("/provider/opencard")) {
      this.isShowClientInfoPanel = false;
      this.isProviderInfoPanelReady = true;
    } else {
      this.isShowClientInfoPanel = false;
      this.isProviderInfoPanelReady = false;
    }
    if (url.includes("/reports/school")) {
      this.isShowClientInfoPanel = false;
    } else {
      this.isShowClientInfoPanel = false;
      this.isProviderInfoPanelReady = false;
    }
    switch (url) {
      case "/reports/client/details":
        this.isShowClientInfoPanel = true;
        this.isProviderInfoPanelReady = false;
    }
    if (this.isShowClientInfoPanel) {
      if (localStorage.getItem("referralId")) {
        this.getReferralDetails();
      }
      if (localStorage.getItem("UserId")) {
        // this.getStaffDetils();
      }
      if (localStorage.getItem("Facts")) {
        this.facts = localStorage.getItem("Facts");
        this.isFactAvailable = true;
        console.log("this.facts is", this.facts);
      } else {
        this.isFactAvailable = false;
      }
      return this.getClientDetails();
    }
  }

  cmsAttach() {
    this.cmsOut.emit("attachmentClose");
  }

  expandView() {
    this.isSubheaderExpand = !this.isSubheaderExpand;
  }
  showProDetail() {
    this.showProfileInfo = !this.showProfileInfo;
  }

  getClientDetails() {
    const clientID =
      this._client.getClientId() ||
      parseInt(localStorage.getItem("clientId")) - this._opencards.getHasKey();
    if (this._client.getClientId()) {
      this.req = { clientID: clientID };
    } else {
      this.req = { clientID: clientID };
    }
    if (this._localValues.clientChanges) {
      this._opencards
        .getClientBasicInfo(this.req)
        .then((data: any) => {
          if (this._router.url === "/reports/client/details") {
            this._localValues.clientData = data;
            this.clientInfo = data;
          } else {
            this.clientInfo = this._localValues.clientData;
          }
          data.clientProfile.length > 0
            ? (data.clientProfile[0].SSN = data.clientProfile[0].SSN.replace(
              /.(?=.{4})/g,
              "X"
            ))
            : "No record found!";
          this.getProfilePicPath(this.clientInfo.clientProfile[0].PicPath);
        })
        .finally(() => {
          this.isClientInfoReady = true;
          this._localValues.clientChanges = false;
        });
    } else {
      this.isClientInfoReady = true;
      this.clientProfileData = this._localValues.clientData;
      !isNullOrUndefined(this.clientProfileData)
        ? (this.clientProfileData.clientProfile[0].SSN = this.clientProfileData.clientProfile[0].SSN.replace(
          /.(?=.{4})/g,
          "X"
        ))
        : "No record found!";
      this.clientInfo = this.clientProfileData;
      !isNullOrUndefined(this.clientProfileData)
        ? this.getProfilePicPath(this.clientInfo.clientProfile[0].PicPath)
        : "";
    }
  }

  clientAgeCalculation(clientDob: any) {
    let currentYear: any,
      currentMonth: any,
      currentDate: any,
      clientDobYear: any,
      clientDobMonth: any,
      clientDobDate: any,
      age: any;
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth() - 1;
    currentDate = new Date().getDate();
    clientDobYear = new Date(clientDob).getFullYear();
    clientDobMonth = new Date(clientDob).getMonth() - 1;
    clientDobDate = new Date(clientDob).getDate();
    age = currentYear - clientDobYear;
    if (
      currentMonth < clientDobMonth ||
      (currentMonth == clientDobMonth && currentDate < clientDobDate)
    ) {
      age--;
    } else {
      age;
    }
    this.clientAge = age;
    return this.clientAge;
  }

  getProfilePicPath(str: String) {
    if (str != "") {
      const strArr = str.split("\\");

      this.clientPicPath = `${environment.blob}${strArr[strArr.length - 1]}${
        environment.SAS
        }`;

      //   if (this.env.name === "prod") {
      //     this.clientPicPath = `https://sfcsblobstorageeastus2.file.core.windows.net/scanneddocumentfs/${
      //       strArr[strArr.length - 1]
      //     }?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2022-12-31T15:43:42Z&st=2019-07-01T07:43:42Z&spr=https&sig=LYDTRWHSsbnUH4XfhjSHrQ1wzFa1iuFdFxDwRprZCyE%3D`;
      //   } else {
      //     this.clientPicPath = `https://sfcsblobstorageeastus2.file.core.windows.net/bt-scanneddocumentfs/${
      //       strArr[strArr.length - 1]
      //     }?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2022-12-31T15:43:42Z&st=2019-07-01T07:43:42Z&spr=https&sig=LYDTRWHSsbnUH4XfhjSHrQ1wzFa1iuFdFxDwRprZCyE%3D`;
      //   }
      // } else {
      //   this.clientPicPath = "/assets/home_page/person master icon.svg";
    }
    return this.clientPicPath;
  }

  openImage(imagePath: String) {
    Swal.fire({
      imageUrl: imagePath,
      imageHeight: 350,
      imageAlt: "client picture",
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  getProviderProfileInfo() {
    let req = {},
      selctedProviderID: number;
    selctedProviderID =
      parseInt(localStorage.getItem("providerID")) -
      this._opencards.getHasKey();
    req["providerID"] = selctedProviderID;
    // To avoid rehitting the API and get the same detail when page get load
    // Get the details only the /reports/provider/detail page
    // And store that in the variable to use that for remaining pages
    if (this._router.url.includes("/reports/provider/detail")) {
      // make API call
      this._opencards.getProviderProfileInfo(req).then((data: any) => {
        this.selectedProviderInfo = data.profile[0];
        this._localValues.selectedProviderProfileInfo = data.profile[0];
        return (this.isProviderInfoDisplay = true);
      });
    } else {
      this.selectedProviderInfo = this._localValues.selectedProviderProfileInfo;
      return (this.isProviderInfoDisplay = true);
    }
  }

  assignPersonMasters() {
    const currentURL = this._router.url;
    if (
      currentURL.includes("/client") ||
      currentURL.includes("/reintegration") ||
      currentURL.includes("/medication") ||
      currentURL.includes("/reports") ||
      currentURL.includes("/bh-ok") ||
      currentURL.includes("/nc-hs") ||
      currentURL.includes("/jjfc") ||
      currentURL.includes("/nc-mhr") ||
      currentURL.includes("/prtf") ||
      currentURL.includes("/claims")
    ) {
      this.currentPersonType = "client";

      return (this.currentPrimaryValue =
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey());
    } else {
      this.currentPersonType = "provider";
      return (this.currentPrimaryValue =
        parseInt(localStorage.getItem("providerId")) -
        this._opencards.getHasKey());
    }
  }

  //  return this.currentPrimaryValue = parseInt(localStorage.getItem('clientId'))-this._opencards.getHasKey()

  onClickGetDetails() {
    this.isMorePersonDetail = !this.isMorePersonDetail;
    return (this.currentPrimaryValue =
      parseInt(localStorage.getItem("clientId")) - this._opencards.getHasKey());
  }

  restrictProfileView() {
    const currentURL = this._router.url;
    if (
      currentURL.includes("provider") ||
      currentURL == "/claims/list/details" ||
      currentURL == "/claims/list/add" ||
      currentURL.includes("batch-process-form") ||
      currentURL.includes("batch-status") ||
      currentURL.includes("csClientProfile") ||
      currentURL == "/reports/providerMember/details" ||
      currentURL.includes("casaOfficer") ||
      currentURL.includes("communityMember") ||
      currentURL.includes("court/service/officer/") ||
      currentURL.includes("crbOfficer") ||
      currentURL.includes("csoStaff") ||
      currentURL.includes("customer-care") ||
      currentURL.includes("reports/dcf") ||
      currentURL.includes("dhhsStaff") ||
      currentURL.includes("dhsStaff") ||
      currentURL.includes("judge") ||
      currentURL.includes("otherAgencyStaff") ||
      currentURL.includes("providerMember") ||
      currentURL.includes("staff") ||
      currentURL.includes("familyMember") ||
      currentURL.includes("payee") ||
      currentURL.includes("dhsOffice") ||
      currentURL.includes("payor") ||
      currentURL.includes("provider-sponser") ||
      currentURL.includes("provider-sponser") ||
      currentURL.includes("provider-sponser") ||
      currentURL.includes("provider-sponser") ||
      currentURL.includes("provider-sponser") ||
      currentURL.includes("guardianAdl") ||
      currentURL.includes("/csProvider/csProviderForm")
    ) {
      this.isProfileView = false;
    } else if (currentURL === "/authinfo/claimList") {
      this.isProfileView = true;
    } else {
      this.isProfileView = true;
    }
  }
  restrictProviderInfoView() {
    const currentURL = this._router.url;
    if (currentURL.includes("provider")) {
      if (
        currentURL == "/reports/providerMember/details" ||
        currentURL == "/reports/provider-sponser/cases" ||
        currentURL ==
        "/reports/provider-sponser/placement-authorization/view" ||
        currentURL ==
        "/reports/provider-sponser/placement-authorization/claim/view" ||
        currentURL.includes("provider-sponser") ||
        currentURL.includes("staff")
      ) {
        this.isProviderInfoView = false;
      } else {
        this.isWaitForProviderRes = true;
        this.isProfileView = false;
        this.isShowStaffInfoView = false;
        this.isShowSchoolProfile = false;
        let req = {},
          selctedProviderID: number;
        selctedProviderID =
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey();
        req["providerID"] = selctedProviderID;
        this._opencards.getProviderProfileInfo(req).then((data: any) => {
          this.providerData = data.profile[0];
          this.isProviderInfoView = true;
          this.isWaitForProviderRes = false;
          console.log("this.providerData>>>>>", this.providerData);
        });
      }
    } else if (
      currentURL == "/recruitment-training/detail" ||
      currentURL === "/licensing-recruitment/detail" ||
      currentURL ==="/csProvider/csProviderForm"
    ) {
      this.isWaitForProviderRes = true;
      this.isProfileView = false;
      this.isShowStaffInfoView = false;
      this.isShowSchoolProfile = false;
      let req = {},
        selctedProviderID: number;
      selctedProviderID =
        parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey();
      req["providerID"] = selctedProviderID;
      this._opencards.getProviderProfileInfo(req).then((data: any) => {
        this.providerData = data.profile[0];
        this.isProviderInfoView = true;
        this.isWaitForProviderRes = false;
        console.log("this.providerData>>>>>", this.providerData);
      });
    } else if (currentURL == "/reports/providerMember/details") {
      this.isProviderInfoView = false;
    } else {
      this.isProviderInfoView = false;
    }
  }
  getStaffProfileInfo() {
    if (this._router.url === "/reports/staff/details") {
      this.isProfileView = false;
      this.isProviderInfoView = false;
      this.isShowSchoolProfile = false;
      const req = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
      };
      this._opencards.getStaffInfo(req).then((data: any) => {
        this.staffData = data.profile;
        this.isShowStaffInfoView = true;
        this.isWaitForProviderRes = false;
      });
    } else {
      this.isShowStaffInfoView = false;
    }
  }
  getStaffNameProfileInfo() {
    if (this._router.url === "/reports/staff/details") {
      this.isProfileView = false;
      this.isProviderInfoView = false;
      this.isShowSchoolProfile = false;
      const req = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
      };
      this._opencards.getStaffNameInfo(req).then((data: any) => {
        this.staffNameData = data.staffName;
        this.isShowStaffInfoView = true;
        this.isWaitForProviderRes = false;
      });
    } else {
      this.isShowStaffInfoView = false;
    }
  }

  getSchoolProfileInfo() {
    if (this._router.url === '/reports/school/detail') {
      this.isProfileView = false;
      this.isProviderInfoView = false;
      this.isShowStaffInfoView = false;
      const req = {
        schoolID: this._client.getId()
      };
      this._opencards.getByIdPersonTypeSchool(req).then((data: any) => {
        this.schoolData = data.school;
        this.isShowSchoolProfile = true;
        this.isWaitForProviderRes = false;
      });
    } else {
      this.isShowSchoolProfile = false;
    }
  }
}
