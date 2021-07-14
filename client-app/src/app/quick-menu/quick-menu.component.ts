import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-quick-menu",
  templateUrl: "./quick-menu.component.html",
  styleUrls: ["./quick-menu.component.scss"],
  inputs: ["module"]
})
export class QuickMenuComponent implements OnInit {
  @Input()
  module: any;

  clientList: any = [];
  referralsList: any = [];
  menuList: any = [];
  barNodeShow: boolean;
  barShow_float: boolean = false;
  constructor(public _router: Router) {}

  ngOnInit() {
    var clientList = [    
      {
        name: "Preventative",
        icon: "assets/Nodesicon/Preventive measures.svg",
        url: "reports/preventative-measurements/view",
        color: "#48b0f8"
      },  
      {
        name: "Liability",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/thirdparty/liability/view",
        color: "#48b0f8"
      }, 
      {
        name: "Court Case",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/court/case/view",
        color: "#48b0f8"
      },  
      {
        name: "Strengths",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/client-strength/view",
        color: "#48b0f8"
      },
      
      {
        name: "Profiles",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/client/profile",
        color: "#48b0f8"
      },  
      {
        name: "Cases",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/opencards/list/client/case",
        color: "#48b0f8"
      },
      {
        name: "Medication",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/medication-allergies/view",
        color: "#48b0f8"
      },  
      {
        name: "Incident",
        icon: "assets/Nodesicon/document attachment.svg",
        url:
          "reports/opencards/list/client/critical-significant-unusual-incident/view",
        color: "#48b0f8"
      },  
      {
        name: "Customer  care",
        icon: "assets/Nodesicon/customer care.svg",
        url: "reports/customer-care/view",
        color: "#48b0f8"
      },
      {
        name: "Documents",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/client/documents",
        color: "#48b0f8"
      },
      {
        name: "Client Form",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/client/details",
        color: "#48b0f8"
      },  
    ];
    var rfcOpenCards = [
      {
        name: "Assessments",
        url: "reintegration/referral/opencard/assessments/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Behavior Assessments",
        url: "reintegration/referral/opencard/behavioral-assessment/view",
        color: "#062854",
        icon: "assets/Nodesicon/Behavior assessment.svg"
      },
      {
        name: "Case Activity",
        url: "reintegration/referral/opencard/case-activity/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Case Plan Goals",
        url: "reintegration/referral/opencard/case-plan-goals/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Court Orders",
        url: "reintegration/referral/opencard/court-order/view",
        color: "#062854",
        icon: "assets/Nodesicon/order.svg"
      },
      {
        name: "Appointments",
        url: "reintegration/referral/opencard/appointments/view",
        color: "#062854",
        icon: "assets/Nodesicon/appointment.svg"
      },
      {
        name: "Case Evaluation",
        url: "reintegration/referral/opencard/case-evaluations/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Case Team",
        url: "reintegration/referral/opencard/case-team/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Home County",
        url: "reintegration/referral/opencard/home-county/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "SFCS Office",
        url: "reintegration/referral/opencard/sfcs-office/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Monthly Reports",
        url: "reintegration/referral/opencard/monthly-reports/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Supervisory Staffing Form",
        url: "reports/supervisory-staffing-form/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Supervisory Staffing Form for Supervisor",
        url: "reports/supervisory-staffing-for-superviosrs/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Placements",
        url: "reintegration/referral/opencard/placement/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Independent Living",
        url: "reintegration/referral/opencard/independent-living/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Family",
        url: "reports/family",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg",
        sub: [
          {
            name: "Extended Family",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reports/extended-family/view",
            color: "#062854"
          },
          {
            name: "Sibilings In Out Home",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reports/siblings-in-out-home/view",
            color: "#062854"
          }
        ]
      },
      {
        name: "Social Security Income",
        url: "reintegration/referral/opencard/social-security-income/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Case File Activity",
        url: "reintegration/referral/opencard/case-file-activity/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Service Claim",
        url: "reintegration/referral/service",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg",
        sub: [
          {
            name: "Direct Authorization",
            icon: "assets/Nodesicon/Direct authorization.svg",
            url: "claims/list/direct/auth/list",
            color: "#062854"
          },
          {
            name: "Hard Goods",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "claims/list/hardgoods/list",
            color: "#062854"
          },
          {
            name: "Other Services",
            icon: "assets/Nodesicon/other service.svg",
            url: "claims/list/other/service/list",
            color: "#062854"
          }
        ]
      },
      {
        name: "KIPP",
        url: "reintegration/referral/opencard/kipp/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Move and Permanency",
        url: "reintegration/referral/opencard/move-permanency/dashboard",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg",
        sub: [
          {
            name: "Move Form",
            icon: "assets/Nodesicon/document attachment.svg",
            url:
              "reintegration/referral/opencard/move-permanency/move-form/view",
            color: "#062854"
          },
          {
            name: "Permanency Form",
            icon: "assets/Nodesicon/document attachment.svg",
            url:
              "reintegration/referral/opencard/move-permanency/permanency-form/view",
            color: "#062854"
          }
        ]
      },
      {
        name: "Authorization Summary",
        url: "reintegration/referral/service/authorization/summary",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "Adoption",
        url: "reintegration/referral/opencard/adoption/view",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg"
      },
      {
        name: "School",
        url: "reintegration/referral/opencard/school/dashboard",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg",
        sub: [
          {
            name: "Credit Tracking",
            icon: "assets/Nodesicon/credit tracking icon.svg",
            url: "reintegration/referral/opencard/school/credit-tracking/view",
            color: "#062854"
          },
          {
            name: "Education Enrollment - EEISPF",
            icon: "assets/Nodesicon/Education Enrollment.svg",
            url: "reintegration/referral/opencard/school/eeispf/view",
            color: "#062854"
          },
          {
            name: "General Education",
            icon: "assets/Nodesicon/document attachment.svg",
            url:
              "reintegration/referral/opencard/school/general-education/view",
            color: "#062854"
          },
          {
            name: "Special Education",
            icon: "assets/Nodesicon/document attachment.svg",
            url:
              "reintegration/referral/opencard/school/special-education/view",
            color: "#062854"
          },
          {
            name: "Attending School",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/attending-school/view",
            color: "#062854"
          },
          {
            name: "Grand Level",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/grade-level/view",
            color: "#062854"
          },
          {
            name: "School Release",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/school-release/view",
            color: "#062854"
          },
          {
            name: "Home Release",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/home-school/view",
            color: "#062854"
          }
        ]
      },
      {
        name: "Medical",
        url: "reintegration/referral/opencard/medical/dashboard",
        color: "#062854",
        icon: "assets/Nodesicon/document attachment.svg",
        sub: [
          {
            name: "BH Determination",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/bh-determination/view",
            color: "#062854"
          },
          {
            name: "BH Placement History",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "",
            color: "#062854"
          },
          {
            name: "Health Record",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/health-record/view",
            color: "#062854"
          },
          {
            name: "Immunization",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/immunization/view",
            color: "#062854"
          },
          {
            name: "Kan-Be-Healthy",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/kan-be-healthy/view",
            color: "#062854"
          },
          {
            name: "Waiver",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reintegration/referral/opencard/waiver/view",
            color: "#062854"
          }
        ]
      }
    ];
    var referralsList = [
      {
        name: "Assessments",
        icon: "assets/Nodesicon/assessment.svg",
        url: "reports/referral/family-preservation/assessment/view",
        color: "#062854"
      },
      {
        name: "Billable Case Activity",
        icon: "assets/Nodesicon/Billable case activities.svg",
        url: "reports/fp-billable-case-activity/view",
        color: "#062854"
      },
      {
        name: "Case Activity",
        icon: "assets/Nodesicon/case activity.svg",
        url: "reports/referral/family-preservation/case-activity/view",
        color: "#062854"
      },
      {
        name: "Case Team",
        icon: "assets/Nodesicon/case team.svg",
        url: "reports/referral/family-preservation/case-team/view",
        color: "#062854"
      },
      {
        name: "Family",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/family",
        color: "#062854",
        sub: [
          {
            name: "Extended Family",
            icon: "assets/Nodesicon/extended family.svg",
            url: "reports/extended-family/view",
            color: "#062854"
          },
          {
            name: "Family Safety",
            icon: "assets/Nodesicon/Safety icon.svg",
            url: "reports/family-safety/view",
            color: "#062854"
          },
          {
            name: "FIS Members",
            icon: "assets/Nodesicon/FIS Member.svg",
            url: "reports/referral/family-preservation/fis-members/view",
            color: "#062854"
          },
          {
            name: "Head-Of-Household",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "reports/referral/family-preservation/head-of-household/view",
            color: "#062854"
          }
        ]
      },
      {
        name: "Home County",
        icon: "assets/Nodesicon/home.svg",
        url: "reports/referral/family-preservation/home-county/view",
        color: "#062854"
      },
      {
        name: "Case Plan Goals",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/referral/family-preservation/case-plan-goals/view",
        color: "#062854"
      },
      {
        name: "SFCS Office",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/referral/family-preservation/sfcs-office/view",
        color: "#062854"
      },
      {
        name: "NTFF",
        icon: "assets/Nodesicon/document attachment.svg",
        url:
          "reports/referral/family-preservation/non-therapy-face-to-face/view",
        color: "#062854"
      },
      {
        name: "Intensive Phase",
        icon: "assets/Nodesicon/Phase.svg",
        url: "reports/referral/family-preservation/phase/intensive-view",
        color: "#062854"
      },
      {
        name: "Non-Intensive Phase",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/referral/family-preservation/phase/nonintensive-view",
        color: "#062854"
      },
      {
        name: "Progress Notes",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/referral/family-preservation/progress-notes/view",
        color: "#062854"
      },
      {
        name: "Case Evaluations",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/referral/family-preservation/case-evaluations/view",
        color: "#062854"
      },
      {
        name: "Progress Note Diagnosis",
        icon: "assets/Nodesicon/document attachment.svg",
        url:
          "reports/referral/family-preservation/progress-note-diagnosis/view",
        color: "#062854"
      },
      {
        name: "Referrel Events",
        icon: "assets/Nodesicon/referal events.svg",
        url: "reports/referral/family-preservation/referral-events/view",
        color: "#062854"
      },
      {
        name: "Court Orders",
        icon: "assets/Nodesicon/order.svg",
        url: "reports/referral/family-preservation/court-order/view",
        color: "#062854"
      },
      {
        name: "KIPP PMTO",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/referral/family-preservation/kipp-pmto/view",
        color: "#062854"
      },
      {
        name: "Service Claims",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "assets/Nodesicon/service claim.svg",
        color: "#062854",
        sub: [
          {
            name: "Direct Authorisation",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "claims/list/direct/auth/list",
            color: "#062854"
          },
          {
            name: "HardGoods",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "claims/list/hardgoods/list",
            color: "#062854"
          },
          {
            name: "Other Services",
            icon: "assets/Nodesicon/document attachment.svg",
            url: "claims/list/other/service/list",
            color: "#062854"
          }
        ]
      },
      {
        name: "Authorization summary",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reintegration/referral/service/authorization/summary",
        color: "#062854"
      },
      {
        name: "Supervisory Staffing Form",
        icon: "assets/Nodesicon/document attachment.svg",
        url: "reports/supervisory-staffing-form/view",
        color: "#062854"
      }
    ];
    if (this.module === "client") {
      this.menuList = clientList;
      console.log("this.menuList>>>>", this.menuList);
    } else if (this.module === "referrel") {
      this.menuList = clientList.concat(rfcOpenCards);
    } else {
      this.menuList = clientList.concat(referralsList);
    }

    if (!this.barShow_float) {
      document.getElementById("mySidenav_qui").style.width = "0px";
    }
    this.riskMangamentUserRightsControl();
  }
  barShow: any = false;
  showBar() {
    this.barShow = !this.barShow;
    this.barNodeShow = false;
    if (this.barShow) {
      this.barShow_float = true;
      document.getElementById("mySidenav_qui").style.width = "10%";
      document.getElementById("mySidenav_qui").style.top = "40px";
      // document.getElementById("overlay").style.display = "block";
    } else {
      this.barShow_float = false;
      // document.getElementById("overlay").style.display = "none";
      document.getElementById("mySidenav_qui").style.width = "0";
      this.closeNav();
    }
  }
  subNodeList = [];
  navigateToNode(navigateURL: any, sub: any, index: any) {
    console.log("INDEX", index);
    if (sub) {
      this.subNodeList = sub;
      this.barShow = false;
      this.barNodeShow = true;
      console.log("sub>>>>>>>>>", sub);
    } else {
      this._router.navigate([navigateURL]);
    }
  }

  navigateMainPage() {
    this._router.navigate(["reports/client/details"]);
  }
  openNav() {
    document.getElementById("mySidenav_qui").style.width = "10%";
  }

  closeNav() {
    document.getElementById("mySidenav_qui").style.width = "0";
  }

  riskMangamentUserRightsControl() { 
    let userId = localStorage.getItem('UserId');
    if(userId == '6' || userId == '129' || userId == '276' || userId == '480' 
        || userId == '2385' || userId == '3095' || userId == '4620' || userId == '4621'
        || userId =='5129' || userId == '5130') { 
        this.clientList.push(
          {
            name: "Incident Rm Only",
            icon: "assets/Nodesicon/document attachment.svg",
            url:
              "reports/opencards/list/client/critical-significant-unusual-incident-RM/view",
            color: "#48b0f8"
          },
        )
    }
}
}
