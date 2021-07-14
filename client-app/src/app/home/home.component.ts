import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Router } from "@angular/router";
import { AppSharedSFMOfficeListComponent } from "../Shared/Components/SFM Office/List/SFM-office-list.component";
import { AppSharedSFMOfficeComponent } from "../Shared/Components/SFM Office/Form/SFM-office-form.component";
import { HomeService } from "./home.service";
import { Subscription } from "rxjs";
import { CaseTeamService } from "../case-team/case-team.service";
import { TeamFormService } from "../team-form/team-form.service";
import swal from "sweetalert2";
import { OpencardsService } from "../opecards-list-view/opencards.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  inputs: ["controlPanelController", "hideReportMenu"],
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  display: boolean = false;
  delaysList = [];

  sidenavBar: any;
  mins: any;
  selectedCity1: any;

  constructor(
    public _team: TeamFormService,
    public _opencard: OpencardsService,
    public homeService: HomeService,
    public _router: Router,
    public _caseTeam: CaseTeamService
  ) {}

  items: MenuItem[];
  @ViewChild(AppSharedSFMOfficeComponent, { static: false })
  sfmOfficeComponent: AppSharedSFMOfficeComponent;
  isSfcsFrom = false;

  ngOnInit() {
    this.subscription = this.homeService.message.subscribe((id) => {
      if (id) {
        this.isSfcsFrom = true;
        setTimeout(() => {
          this.sfmOfficeComponent.onEditClick({ sfaOfficeID: id });
        }, 1000);
      } else {
        this.isSfcsFrom = false;
      }
    });
    if (
      this._router.url === "/reports/live-prioritized" ||
      this._router.url === "/family/finance_report-live" ||
      this._router.url.includes("/live/family")
    ) {
      this.items = [
        {
          label: "Home",
          icon: "pi pi-home",
          routerLink: ["/childwelfare"],
        },
        // {
        //   label: 'Customer Care Report',
        //   icon: 'pi pi-user'
        // },
        {
          label: "Reports",
          icon: "pi pi-file",
          items: [
            {
              label: "Predefined Reports - Live",
              icon: "pi pi-file",
              routerLink: ["/reports/live-prioritized"],
            },
            {
              label: "My Exports",
              icon: "pi pi-file",
              command: () => {
                window.open("/live-myExports");
              },
            },
            {
              label: "Finance Reports",
              icon: "pi pi-file",
              routerLink: ["/family/finance_report-live"],
            },
          ],
        },
      ];
    } else {
      this.items = [
        {
          label: "Home",
          icon: "pi pi-home",
          routerLink: ["/childwelfare"],
        },
        {
          label: "Person",
          icon: "pi pi-users",
          items: [
            {
              label: "CASA Officer",
              icon: "pi pi-users",
              routerLink: ["/reports/casaOfficer"],
            },
            {
              label: "Client",
              icon: "pi pi-users",
              routerLink: ["/reports/client"],
            },
            {
              label: "Community Member",
              icon: "pi pi-users",
              routerLink: ["/reports/communityMember"],
            },
            {
              label: "Court Service Officer",
              icon: "pi pi-users",
              routerLink: ["/reports/court/service/officer"],
            },
            {
              label: "CRB Coordinator",
              icon: "pi pi-users",
              routerLink: ["/reports/crbOfficer"],
            },
            {
              label: "CSO Staff",
              icon: "pi pi-users",
              routerLink: ["/reports/csoStaff"],
            },
            {
              label: "Customer Care Person",
              icon: "pi pi-users",
              routerLink: ["/reports/customer-care/view"],
            },
            {
              label: "DCF Staff",
              icon: "pi pi-users",
              routerLink: ["/reports/dcf"],
            },
            {
              label: "DHHS Staff",
              icon: "pi pi-users",
              routerLink: ["/reports/dhhsStaff"],
            },
            {
              label: "DHS Staff",
              icon: "pi pi-users",
              routerLink: ["/reports/dhsStaff"],
            },
            {
              label: "Family Member",
              icon: "pi pi-users",
              routerLink: ["/reports/familyMember"],
            },
            {
              label: "Guardian Ad Litem",
              icon: "pi pi-users",
              routerLink: ["/reports/guardianAdl"],
            },
            {
              label: "Judge",
              icon: "pi pi-users",
              routerLink: ["/reports/judge"],
            },
            {
              label: "Other Agency Staff",
              icon: "pi pi-users",
              routerLink: ["/reports/otherAgencyStaff"],
            },
            {
              label: "Provider Member",
              icon: "pi pi-users",
              routerLink: ["/reports/providerMember"],
            },
            {
              label: "Staff",
              icon: "pi pi-users",
              routerLink: ["/reports/staff"],
            },
          ],
        },
        // {
        //   label: 'Referral',
        //   icon: 'pi pi-table',
        //   items: [
        //     {
        //       label: 'FI',
        //       icon: 'pi pi-table',
        //       title:'Family Preservation - In Home'
        //     },
        //     {
        //       label: 'FC',
        //       icon: 'pi pi-table',
        //       title: 'Reintegration Foster Care'
        //     },
        //     {
        //       label: 'NC-FI',
        //       icon: 'pi pi-table',
        //       title: 'Non-Contract Family Preservation - In Home'
        //     },
        //     {
        //       label: 'NC-FCH',
        //       icon: 'pi pi-table',
        //       title: 'Non-Contract Foster Care Homes'
        //     },
        //     {
        //       label: 'NC-RFC',
        //       icon: 'pi pi-table',
        //       title: 'Non-Contract Foster Care'
        //     },
        //     {
        //       label: 'NC-OPS',
        //       icon: 'pi pi-table',
        //       title: 'Non-Contract Out-Patient Services'
        //     },
        //     {
        //       label: 'NC-HS',
        //       icon: 'pi pi-table',
        //       title: 'Non-Contract Home Study/FCH'
        //     },
        //     {
        //       label: 'NC-MHR',
        //       icon: 'pi pi-table',
        //       title: 'Non-Contract Mental Health Respite'
        //     },
        //     {
        //       label: 'PRTF',
        //       icon: 'pi pi-table',
        //       title: 'Psychiatric Residential Treatment Facility'
        //     },
        //     {
        //       label: 'BH-OK',
        //       icon: 'pi pi-table',
        //       title: 'Bridge Home Oklahoma'
        //     },
        //     {
        //       label: 'JJFC',
        //       icon: 'pi pi-table',
        //       title: 'Juvenile Justice Foster Care'
        //     }
        //   ]
        // },
        {
          label: "Provider",
          icon: "pi pi-user",
          routerLink: ["/reports/provider/view"],
        },
        {
          label: "Payee",
          icon: "pi pi-user",
          routerLink: ["/reports/payee/view"],
        },
        {
          label: "School",
          icon: "pi pi-user",
          routerLink: ["/reports/school/view"],
        },
        {
          label: "Agencies",
          icon: "pi pi-briefcase",
          items: [
            {
              label: "Payor",
              icon: "pi pi-briefcase",
              routerLink: ["/reports/payor/view"],
            },
            // {
            //   label: 'Sponsor',
            //   icon: 'pi pi-briefcase',
            // },
            // {
            //   label: 'SFM Office',
            //   icon: 'pi pi-briefcase',
            // },
            // {
            //   label: 'Third Party Liability',
            //   icon: 'pi pi-briefcase',
            // },
            // {separator:true},
            // {
            //   label: 'DCF Office',
            //   icon: 'pi pi-briefcase',
            // },
            // {
            //   label: 'DCF Area Office',
            //   icon: 'pi pi-briefcase',
            // },
            // {separator:true},
            {
              label: "DHS Office",
              icon: "pi pi-briefcase",
              routerLink: ["/reports/dhsOffice/view"],
            },
            {
              label: "SFM Office",
              icon: "pi pi-briefcase",
              command: (event) => {
                console.log("Home event", event);
                if (event) {
                  this.isSfcsFrom = true;
                  this.sfmOfficeComponent.onListOpen();
                } else {
                  return (this.isSfcsFrom = false);
                }
              },
            },
            // {separator:true},
            // {
            //   label: 'DHHS Office',
            //   icon: 'pi pi-briefcase',
            // },
            // {
            //   label: 'DHHS Area Office',
            //   icon: 'pi pi-briefcase',
            // },
            // {separator:true},
            // {
            //   label: 'CSO Office',
            //   icon: 'pi pi-briefcase',
            // }
          ],
        },
        {
          label: "Family Member",
          icon: "pi pi-user",
          routerLink: ["/reports/familyMember"],
        },
        // {
        //   label: 'Customer Care Report',
        //   icon: 'pi pi-user'
        // },
        {
          label: "Reports",
          icon: "pi pi-file",
          items: [
            {
              label: "Predefined Reports",
              icon: "pi pi-file",
              routerLink: ["/reports/prioritized"],
            },
            {
              label: "My Exports",
              icon: "pi pi-file",
              command: () => {
                window.open("/myExports");
              },
            },
            {
              label: "Finance Reports",
              icon: "pi pi-file",
              routerLink: ["/family/finance_report"],
            },
          ],
        },
        {
          label: "Tools",
          icon: "pi pi-cog",
          items: [
            {
              label: "Transfer between: Case Team / Client",
              icon: "pi pi-cog",
              routerLink: ["/family/trans_betwen_case_team"],
            },
            // {
            //   label: 'Transfer between: Case Manager / Compliance Tech',
            //   icon: 'pi pi-cog',
            //   routerLink: ['/trans_bt_case_manager_comp_tech']
            // },
            {
              label: "Transfer between: Team Leader / Team Member",
              icon: "pi pi-cog",
              routerLink: ["/transBtTeamLeadMember"],
            },
            {
              label: "Modify Facts",
              icon: "pi pi-cog",
              routerLink: ["/modifyFacts"],
            },
            {
              label: "Claims",
              icon: "pi pi-cog",
              routerLink: ["/claims/list/view"],
            },
            {
              label: "Approve Claims",
              icon: "pi pi-cog",
              routerLink: ["/approvedClaims"],
            },
            {
              label: "Cards",
              icon: "pi pi-cog",
              routerLink: ["/reports/client-view/cards"],
            },
            {
              label: "Case Activity Log",
              icon: "pi pi-cog",
              routerLink: ["/reports/case-activity-log"],
            },
            {
              label: "Batch Processing",
              icon: "pi pi-cog",
              routerLink: ["/reports/batch-process"],
            },
            {
              label: "Add Other Services to Batch",
              icon: "pi pi-cog",
              routerLink: ["/add-other-service-accout-payable"],
            },
            {
              label: "Other Services Payment Batch Status",
              icon: "pi pi-cog",
              routerLink: ["/other-service-accout-payable-status"],
            },
            {
              label: "Access Rights",
              icon: "pi pi-cog",
              routerLink: ["/accessrights/create-role"],
            },
            {
              label: "Provider Email Module",
              icon: "pi pi-cog",
              routerLink: ["/reports/provider-email-module"],
            },
            {
              label: "Contract Services",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Procode",
                  icon: "pi pi-fw pi-plus",
                  // routerLink: ['/grade-submission']
                  items: [
                    {
                      label: "Kansas",
                      icon: "pi pi-cog",
                      routerLink: ["/reports/kansas/view"],
                    },
                    {
                      label: "Oklahoma",
                      icon: "pi pi-cog",
                      routerLink: ["/reports/oklahoma/view"],
                    },
                    {
                      label: "Nebraska",
                      icon: "pi pi-cog",
                      routerLink: ["/reports/nebraska/view"],
                    },
                  ],
                },
              ],
            },

            {
              label: "Data Management",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Client Grade Submission",
                  icon: "pi pi-cog",
                  routerLink: ["/grade-submission"],
                },
                {
                  label: "Data maintainance",
                  icon: "pi pi-cog",
                  routerLink: ["/data_m_igration"],
                },
              ],
            },
          ],
        },
        // {
        //   label : 'Security',
        //   icon: 'pi pi-key',
        //   items: [
        //     {
        //       label: 'Menu Permission',
        //       icon: 'pi pi-cog',
        //       routerLink: ['/menuRightForm']
        //     }
        //     ]
        // }
      ];
    }
    this.getEsignature();
    this.delaysList = [
      { name: "Minutes", code: 1 },
      // { name: 'Hours', code: 2 },
      // { name: 'Days', code: 3 },
      // { name: 'Weeks', code: 4 },
    ];
    this.addClientGradeProgressionMenu();
  }
  signatureList = [];
  allRemainderIDS = [];
  staffName: any;
  getEsignature() {
    this.isLoad = true;
    this._caseTeam.esignatrue().then((data) => {
      this.isLoad = false;
      if (data.reminderList.length === 0) {
        this.display = false;
      } else {
        this.display = true;
        this.isSnooze = "true";
        this.signatureList = data.reminderList;
        this.signatureList.map((itm) => {
          itm.Duein = itm["Due in"];
          this.allRemainderIDS.push(itm.RemindersID);
        });
      }
      this.isLoad = true;
      this._team
        .getUserById({
          staffID: parseInt(localStorage.getItem("UserId")) || 5357,
        })
        .then((data) => {
          this.isLoad = false;
          this.staffName = `${data.users.firstName} ${data.users.lastName}`;
        });
    });
  }
  //ElecSignPlacementAgreementID StaffID

  fchPrintPrompt = false;
  remainElectPrintViewData: any;
  isLoad = false;
  isRemainderBox = false;
  getEleecPreview(itm) {
    console.log(itm);
    this.isLoad = true;
    var req = {
      elecSignPlacementAgreementID: itm.ElecSignPlacementAgreementID,
      staffID: itm.StaffID,
    };
    this._caseTeam.getElectricalySign(req).then((res) => {
      console.log("getEleecPreview>>>>", res);
      this.isLoad = false;
      if (!res.eSignAccess) {
        swal("Info!", "Please contact your admin!", "info");
      } else {
        let request = {
          authorizationID: itm.PrimaryKey,
        };
        this._opencard
          .getPlacementEventSavedPDFForms(request)
          .then((response) => {
            localStorage.setItem(
              "esignPdFDocID",
              response.placementAgreement.pdfDocID
            );
          });
        this.isRemainderBox = true;
        this.fchPrintPrompt = true;
        this.remainElectPrintViewData = res;
      }
    });
  }
  isSnooze: any;
  applySnooze(ms) {
    var milliscond = ms * 60000;
    this.isSnooze = "true";
    localStorage.setItem("isSnooze", this.isSnooze);
    this.display = false;
    console.log(">>>>>", milliscond);
    var req = {
      reminderIDs: this.allRemainderIDS,
      Snooze_AlertIntervalTypeID: 1,
      SnoozeInterval: ms,
    };
    this._caseTeam.snoozeRemaider(req).then((data) => {
      setTimeout(() => {
        this.getEsignature();
      }, milliscond);
    });
  }
  dismissAll() {
    this._caseTeam
      .dismissElectricalySign({ reminderIDs: this.allRemainderIDS })
      .then((data) => {
        this.getEsignature();
      });
  }
  dismiss(id?: any) {
    this._caseTeam
      .dismissElectricalySign({ reminderIDs: [id] })
      .then((data) => {
        this.getEsignature();
      });
  }
  onSigned(event) {
    console.log(">>>>event>>>>", event);
    this.getEsignature();
    this.fchPrintPrompt = false;
  }

  async addClientGradeProgressionMenu() {
    // let accessRequest = { staffID: localStorage.getItem("UserId") };
    let accessRequest = { staffID: "14781" }; //local test purpose
    let accessResponse = await this._opencard.getStaffAccess(accessRequest);
    let returnValue = accessResponse.staffRoles.filter((item) => {
      return item.roles_RoleID.roleID === 26 ? true : false;
    });
    if (returnValue.length > 0) {
      this.items.filter((item: any) => {
        if (item.label == "Tools") {
          return item["items"].push({
            label: "Client Grade Progression",
            icon: "pi pi-cog",
            routerLink: ["/reports/client-grade-progression"],
          });
        }
      });
    } else {
      return;
    }
  }
}
