import { Component, Input, OnInit } from "@angular/core";
import { PersonTypesProfileService } from "./person-types-profile.service";
import { isNullOrUndefined } from "util";
import { environment } from "../../../environments/environment";
import * as moment from "moment";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ProviderService } from "../../provider/provider.service";
import { LocalValues } from "../../local-values";

@Component({
  selector: "person-types-profile-info",
  templateUrl: "./person-types-profile-info.component.html",
  styleUrls: ["./person-types-profile-info.component.scss"],
  inputs: ["personType", "primaryValue"],
})
export class PersonTypesProfileInfoComponent implements OnInit {
  constructor(
    public _opencards: OpencardsService,
    public _service: PersonTypesProfileService,
    public router: Router,
    public _provider: ProviderService,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      this.routeChanges(val);
    });
  }

  @Input()
  personType: string;
  primaryValue: Number;

  infoText: string;
  isProfileInfoLoaded = false;
  staticProfileData: any;
  isMoreDetails = false;
  componentBtnLabel = "Show More";
  componentBtnDisable = false;
  showMoreProfileData: any;
  profilePicPath: string;
  IsKinship: boolean;
  isFamilySupport: boolean;
  isProviderTherapist: boolean;
  isFosterCare: boolean;
  isKinship: boolean;
  isResourceWorker: boolean;
  public isOpenSSNConfirmationDialogBox = false;
  public isSSNMask = true;
  public countDown = 10;
  clientDashboard: any;
  isClientDashboard = false;
  isTabCollapsed = true;
  showStaticProfile = false;

  ngOnInit() {
    console.log("this.personType is", this.personType);
    console.log("this.primaryValue is", this.primaryValue);
    if (this.router.url.includes("/reports/school/view")) {
      this.showStaticProfile = false;
    } else {
      this.showStaticProfile = true;
    }
    if (this.showStaticProfile) {
      this.generateStaticProfileInfo();
    }
    this.getShowMoreInfo();
  }

  async generateStaticProfileInfo() {
    let profileData: any = await this.getShowMoreProfileInfo();
    this.isProfileInfoLoaded = false;
    this.infoText = "Please wait...";
    this.staticProfileData = profileData.responseStatus
      ? profileData.clientProfile[0]
      : null;
    this.isProfileInfoLoaded = true;
  }

  async onShowMoreClick() {
    this.componentBtnLabel = "Loading...";
    this.componentBtnDisable = true;
    this.showMoreProfileData = await this.getShowMoreProfileInfo();
    this.getProfilePic(this.showMoreProfileData);
    this.isMoreDetails = true;
    this.componentBtnDisable = false;
    this.componentBtnLabel = "Show More";
  }

  getShowMoreProfileInfo() {
    const req = {};
    return new Promise((resolve) => {
      req["clientID"] = parseInt(
        this._activateRoute.snapshot.queryParamMap.get("clientId")
      );
      this._service.getClientProfileInfo(req).then((data) => resolve(data));
    });
  }

  getShowMoreInfo() {
    const req = {};
    req["clientID"] = parseInt(localStorage.getItem("clientId"));
    this._service.getClientProfileInfo(req).then((data) => {
      if (
        data.clientProfile[0].ReferralTypeID === 2 ||
        data.clientProfile[0].ReferralTypeID === 5 ||
        data.clientProfile[0].ReferralTypeID === 6
      ) {
        this.isFamilySupport = true;
      } else if (data.clientProfile[0].ReferralTypeID === 10) {
        this.isProviderTherapist = true;
      } else if (data.clientProfile[0].ReferralTypeID === 12) {
        this.isFosterCare = true;
      } else if (data.clientKinship.IsKinship == true) {
        this.isKinship = true;
      } else {
        this.isResourceWorker = true;
      }
    });
  }

  getStaticProfileInfo() {
    const req = {};
    return new Promise((resolve) => {
      req["clientID"] = parseInt(localStorage.getItem("clientId"));
      this._service.getPersonDetails(req).then((data) => resolve(data.person));
    });
  }

  requestGenerator(currentPersonType: any) {
    const req = {};
    switch (currentPersonType) {
      case "client":
        req["clientID"] = parseInt(localStorage.getItem("clientId"));
        break;
      default:
        req["clientID"] = parseInt(localStorage.getItem("clientId"));
    }
    return req;
  }

  // ngOnDestroy() {
  //   this.getStaticProfileInfo();
  //   this.getShowMoreProfileInfo();
  // }

  booleanValueCheck(value: string) {
    return value == "True"
      ? `<span style="color:green">&#10004</span>`
      : `<span style="color:red">&#10006</span>`;
  }

  getProfilePic(data: any) {
    let path = environment.blob;
    const pathHeaders = environment.SAS;
    let fileName: string;
    if (data.clientProfile[0]) {
      fileName = !isNullOrUndefined(data.clientProfile[0].PicPath)
        ? data.clientProfile[0].PicPath.split("WebFriendlyImages")[1]
        : null;
      fileName = !isNullOrUndefined(fileName)
        ? fileName.replace(/\\/g, "")
        : null;
      this.profilePicPath = !isNullOrUndefined(fileName)
        ? `${path}${fileName}${pathHeaders}`
        : "/assets/no_image_available.png";
      console.log("Profile path", this.profilePicPath);
    } else {
      this.profilePicPath = "/assets/no_image_available.png";
    }
    return this.profilePicPath;
  }

  stringDateFormater(dateTimeString) {
    return moment(dateTimeString).format("MM/DD/YYYY");
  }

  routeChanges(ev) {
    if (ev instanceof NavigationEnd) {
      console.log("routeChanges Profile URL", ev);

      // if (ev.url.includes('/claims/list/direct/form/view?clientId=')
      //   || ev.url.includes('/cs/auth-claim/details?clientId=')) {
      //   this.primaryValue = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
      //   this.personType='client';
      //   this.generateStaticProfileInfo();
      // }
    }
  }

  onClickSSNMaskIcon() {
    return (this.isOpenSSNConfirmationDialogBox = true);
  }

  async checkSSNAccessRights() {
    let staffID = localStorage.getItem("UserId");
    let request = {
      staffID:
        staffID !== undefined && staffID !== null ? parseInt(staffID) : 5130,
    };
    let response = await this._provider.ssn_number_access_log(request);
    if (response.responseStatus) {
      response.staffRoles.map((staffRole) => {
        if (
          JSON.parse(staffRole.roles_RoleID.accessRights).accessRights
            .cmsUserRights
        ) {
          JSON.parse(
            staffRole.roles_RoleID.accessRights
          ).accessRights.cmsUserRights.find((element) => {
            if (element.viewSSN === true) {
              console.log("The staff have ssn access", element.viewSSN);
              this.isSSNMask = false;
              this.isOpenSSNConfirmationDialogBox = false;
              this.countDown = 10;
              this.tenSecondsCounterBackwards();
            } else {
              this.isSSNMask = true;
            }
          });
        }
      });
    } else {
      return;
    }
  }

  tenSecondsCounterBackwards() {
    setInterval(async () => {
      this.countDown--;
      if (this.countDown === 0) {
        clearInterval();
        return (this.isSSNMask = true);
      }
    }, 1000);
  }

  async onClickDashboard() {
    // this.isClientDashboard = true;
    // let clientDashboardRequest = {
    //   clientID:
    //     parseInt(localStorage.getItem("clientId")) -
    //     this._opencards.getHasKey(),
    // };
    // this.clientDashboard = await this._opencards.getClientDashboardInfo(
    //   clientDashboardRequest
    // );

    window.open(
      window.location.origin + "/dashboard" + "?mode=client",
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }
}
