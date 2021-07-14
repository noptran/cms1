import { Component, OnInit, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { PrioritizedReportsService } from "../prioritized-reports/prioritized-reports.service";
import { HomeService } from "../home/home.service";
import { LoginService } from "../login/login.service";
import { Logout } from "../login/logout";
import { OtpverficationService } from "../otpverfication/otpverfication.service";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  inputs: ["title"],
})
export class NavbarComponent implements OnInit {
  @Input() sidenavBarMessage: string;
  title: any;
  imagePreview: any;
  spName: any;
  showExpand: boolean = false;
  showShrink: boolean = true;
  url;
  pathName;
  userName: any;
  reportBtnController: boolean = true;
  toggleBtnController: boolean = true;
  res;
  customReportsList = [];
  showAddReports: boolean = false;
  logoutData: Logout = new Logout();
  urlShowreportController: boolean = false;
  constructor(
    public _opencards: OpencardsService,
    public router: Router,
    public _otp: OtpverficationService,
    public homeComponent: HomeComponent,
    public _report: PrioritizedReportsService,
    public homeService: HomeService,
    public _login: LoginService
  ) {}
  currentPage;
  personUrl = [
    "client",
    "staff",
    "dhsStaff",
    "dhhsStaff",
    "csoStaff",
    "casaOfficer",
    "judge",
    "providerMember",
    "communityMember",
    "otherAgencyStaff",
    "crbOfficer",
    "familyMember",
    "guardianAdl",
    "customerCare",
    "dcf",
  ];
  env = environment;
  infoLabel = false;
  referralTypeID: number;
  supportLink: string;

  ngOnInit() {
    console.log("Navbar****");
    this.userName = localStorage.getItem("UserEmail");
    setTimeout(() => this.addReportControllerURL(), 2000);
    // if (localStorage.getItem('userPrivilage') !== null) {
    this.userPrivilage();
    // }else{
    //   this.showAddReports = true;
    // }
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.nameOnNavbar(ev.url);
        console.log("Current URL", ev.url);
        if (ev.url === "/childwelfare") {
          this.toggleBtnController = false;
        }
        if (ev.url === "/reports/dynamicReports") {
          this.reportBtnController = false;
        }

        if (ev.url === "/childwelfare") {
          this.reportBtnController = false;
        }
      }
    });
    this.homeService.currentMessage.subscribe(
      (message) => (this.imagePreview = message)
    );
    //   this.res={
    //     "privilageName":"TeamCreated",
    //     "predefinedreports":[
    //        {
    //           "id":1,
    //           "predefinedReports":"RiskManagement"
    //        }
    //     ],
    //     "customReports":[
    //        {
    //           "id":1,
    //           "customReport":"yourReports"
    //        }
    //     ],
    //     "adminSettings":[
    //        {
    //           "id":2,
    //           "adminSettings":"MyOrganization"
    //        }
    //     ]
    //  }
    //  this.res.customReports.map(item => {
    //   this.customReportsList.push(item.customReport);
    // })
    // this.checkUserRights();
    this.env.localUrl === "https://child-welfare.st-francis.org/tomcat/"
      ? (this.infoLabel = true)
      : (this.infoLabel = false);
    this.referralTypeID =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencards.getHasKey();
    if (this.referralTypeID == 8) {
      this.currentPage = "Non contract Home Study/FCH Services (NC-HS)";
    } else if (this.referralTypeID == 17) {
      this.currentPage = "Juvenile Justice Foster Care (JJFC)";
    } else if (this.referralTypeID == 11) {
      this.currentPage = "Non-Contract Mental Health Respites(NC-MHR)";
    } else if (this.referralTypeID == 14) {
      this.currentPage = "Psychiatric Residential Treatment Facility (PRTF)";
    } else if (this.referralTypeID == 4) {
      this.currentPage = "NC Foster Care Homes (NC-FCH)";
    }
    if (this.env.name === "local")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "betaware")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "dev")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "gateway")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "live")
      this.supportLink = `https://cms.saintfrancisministries.org/helpdesk`;
    if (this.env.name === "local")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "pre-prod")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "prod")
      this.supportLink = `${this.env.domain}/helpdesk`;
    if (this.env.name === "testing")
      this.supportLink = `${this.env.domain}/helpdesk`;
    this.nameOnNavbar(this.router.url);
  }

  nameOnNavbar(a) {
    let url = a;
    this.personUrl.map((data) => {
      if (url.includes(data)) {
        this.currentPage = "Persons";
      }
    });
    if (url.includes("/opencards/list")) {
      this.currentPage = "Open Cards";
    }

    if (url.includes("family-preservation") || url.includes("reintegration")) {
      switch (this._opencards.getOtherRefDetails().referralName) {
        case "FI":
          this.currentPage = "Referral - Family Preservation (FP)";
          break;
        case "FC":
          this.currentPage = "Referral - Reintegration (RFC)";
          break;
        case "NC-OPS":
          this.currentPage = "NC - Out - Patient Services (NC-OPS)";
          break;
        case "JJFC":
          this.currentPage = "Juvenile Justice Foster Care (JJFC)";
          break;
        case "NC-FI":
          this.currentPage = "NC - Family Preservation (In-Home)";
          break;
        case "NC-RFC":
          this.currentPage = "Non-Contract Reintegration Foster Care (NC-RFC)";
          break;
      }
    }
    if (url.includes("/reports/client/profile/")) {
      this.currentPage = "Person - Client Profile";
    }
    // if (url.includes('/reintegration/referral/')) {
    //   if (this._opencards.getOtherRefDetails().referralName === "NC-RFC") {
    //     this.currentPage = 'Non-Contract Reintegration Foster Care (NC-RFC)';
    //   }
    //   else if (this._opencards.getOtherRefDetails().referralName === "NC-FCH") {
    //     this.currentPage = 'NC - Foster Care Homes (NC-FCH)';
    //   }
    //   else {
    //     this.currentPage = "Referral - Reintegration (RFC)";
    //   }

    // }
    if (url.includes("/reports/preventative-measurements/ ")) {
      this.currentPage = "Client";
    }
    if (url.includes("/claims/list")) {
      this.currentPage = "Claim";
    }
    if (url.includes("/reports/provider-sponser/")) {
      this.currentPage = "Persons";
    }
    if (url.includes("/provider/")) {
      this.currentPage = "Provider";
    }
    if (url.includes("/reports/batch-process")) {
      this.currentPage = "Batch Processing";
    }
    if (url.includes("/education/enrollment/")) {
      this.currentPage = "Education Enrollment (EE)";
    }
    if (url.includes("/reports/nc-fch/")) {
      this.currentPage = "NC Foster Care Homes (NC-FCH)";
    }
    if (
      url === "/recruitment-training/detail" ||
      url === "/licensing-recruitment/detail"
    ) {
      this.currentPage = "Provider";
    }
    if (url.includes("/recruitment-training/dashboard")) {
      this.currentPage = "Provider";
    }

    switch (url) {
      case "/reports/person/types":
        this.currentPage = "Persons";
        break;
      case "/reports/prioritized":
        this.currentPage = "Prioritized Report";
        break;
      case "/reports/opencards/list":
        this.currentPage = "Open Cards";
        break;
      case "/reports/batch-status/other-services":
        this.currentPage = "Payment Status - Other Services";
        break;
      case "/reports/batch-status/kansas":
        this.currentPage = "Payment Status - Kansas";
        break;
      case "/reports/batch-status/nebraska":
        this.currentPage = "Payment Status - Nebraska";
        break;
      case "/reports/batch-status/oklahoma":
        this.currentPage = "Payment Status - Oklahoma";
        break;
      case "/reports/encounter":
        this.currentPage = "Encounter Report";
        break;
      case "/reports/siblings-in-out-home/view" || "/reports/family":
        this.currentPage = "Siblings In Out Home";
        break;
      case "/reports/provider-email-module":
        this.currentPage = "Provider Email Envelope";
        break;
    }
  }

  navigateTo() {
    switch (this.currentPage) {
      case "Persons":
        this.router.navigate(["/reports/person/types"]);
        break;
      case "Predefined Reports":
        this.router.navigate(["/reports/predefined"]);
        break;
      case "Open Cards":
        this.router.navigate(["/reports/opencards/list"]);
        break;
      case "Referral - Family Preservation (FP)":
        this.router.navigate(["/reports/referral/family-preservation-list"]);
        break;
      case "NC - Out - Patient Services(NC - OPS)":
        this.router.navigate(["/reports/referral/family-preservation-list"]);
        break;
      case "Person - Client Profile":
        this.router.navigate(["/reports/client/profile"]);
        break;
      case "Provider":
        this.router.navigate(["/provider/dashboard"]);
        break;
    }
  }

  userPrivilage() {
    let userid = this.homeService.userId();
    let req = { staffID: parseInt(userid) || 4620 };

    this._otp.getUserDetail(req).then((data) => {
      this.res = data.users;

      console.log("hhh", this.res, this.homeService.userId());
      if (this.res) {
        if (this.res.customReportUserRights.length > 0) {
          this.res.customReportUserRights.map((item) => {
            this.customReportsList.push(item.customReport);
          });
        }
      }

      this.checkUserRights();
    });
  }

  checkUserRights() {
    if (this.customReportsList.indexOf("DynamicReports") !== -1) {
      console.log("Check User rights come add reports");
      this.showAddReports = true;
    }
  }

  sideMenuOpen() {
    this.showShrink = true;
    this.showExpand = false;
  }
  sideMenuClose() {
    this.showShrink = false;
    this.showExpand = true;
  }
  logOut() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.logoutData.staffID = parseInt(localStorage.getItem("UserId"));
    // this.logoutData.staffID = '4621'
    this._login.logOut(this.logoutData).then((result: any) => {
      loader.style.display = "none";
      localStorage.clear();
      console.log("Logout result", result);
      if (result.redirect !== "login") {
        this.router.navigateByUrl("/home");
      } else {
        this._login.cookieRemoval("token=");
        this.router.navigateByUrl("/");
      }
    });
  }
  getDashBoardLink() {
    this._report.getDashBoardLink({ vReportLink: this.spName }).then((data) => {
      if (data.responseStatus == true) {
        window.open(data.dashBoardLink[0].dashboard_link, "_blank");
      } else {
        console.log(data.responseMessage);
      }
    });
  }
  addReportControllerURL() {
    console.log("Router", this.router.url);
    if (this.router.url == "/reports/dynamicReports") {
      this.urlShowreportController = true;
    }
  }
  detectChanges(chnages) {
    console.log("Nav chnages", chnages);
  }
  goToUserManul() {
    this.router.navigate(["/family/user_manual"]);
  }

  backToHome = () => {
    return this.router.navigate(["/childwelfare"]);
  };
}
