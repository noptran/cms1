import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamForm } from '../team-form/team-form';
import { TeamFormService } from '../team-form/team-form.service';
import { RoleService } from '../roles/roles.service';

@Component({
  selector: 'app-team-details-form',
  templateUrl: './team-details-form.component.html',
  styleUrls: ['./team-details-form.component.scss']
})
export class TeamDetailsFormComponent implements OnInit {

  constructor(public _route: Router, public route: ActivatedRoute,
    public teamFormService: TeamFormService,
    public roleService: RoleService) { }

  post: TeamForm = new TeamForm();
  userSettings = {
    singleSelection: false,
    text: "Please select your team member",
    selectAllText: 'Select All ',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
  };
  LeaderSettings = {
    singleSelection: true,
    text: "Please select your team member",
    selectAllText: 'Select All ',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
  }
  teamList = [];
  teamLists = [];
  settings = {
    text: "Select a role ",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 1,
    enableSearchFilter: true,
    singleSelection: true
  };
  reportsViewList = [];
  reportsViewLists = [];
  Data;
  editForm: boolean = false;
  hideLoader: boolean = true;
  showTable: boolean = false;
  teamLeadCntrl: boolean = true;

  predefinedReportsList = [];
  customizedReportsList = [];
  adminSettingsList = [];

  showDeleteButton: boolean = false;
  tempTeamLeader;
  loaderController: boolean = false;
  userLists = [];
  userList = [];
  Sidenav :any;
  ReportSettings:any
  onUserSelect:any
  OnUserDeSelect:any;
  onDeSelectAll:any
  onSelectAll:any;
  onItemDeSelectAll:any;
  OnItemDeSelect:any;


  showError: boolean = false;

  ngOnInit() {
    this.getUsers();
    this.predefinedReportsList = [
      {
        "id": 1,
        "itemName": "RiskManagement"
      },
      {
        "id": 2,
        "itemName": "FamilyPreservation"
      },
      {
        "id": 3,
        "itemName": "OutPatient"
      },
      {
        "id": 4,
        "itemName": "PsychiatricResidentialTreatment"
      },
      {
        "id": 5,
        "itemName": "TrendLineProcessing"
      },
      {
        "id": 6,
        "itemName": "FosterCareHomes"
      },
      {
        "id": 7,
        "itemName": "Oklahoma"
      },
      {
        "id": 8,
        "itemName": "OperationsManagement"
      },
      {
        "id": 9,
        "itemName": "DataManagement"
      }
    ];

    this.customizedReportsList = [
      {
        "id": 1,
        "itemName": "yourReports"
      },
      {
        "id": 2,
        "itemName": "addReports"
      }
    ];

    this.adminSettingsList = [

      {
        "id": 1,
        "itemName": "AdminSettings"
      },
      {
        "id": 2,
        "itemName": "MyOrganization"
      },
      {
        "id": 3,
        "itemName": "MyTeams"
      }
    ];

  }

  cancel() {
    this._route.navigate(['/reports/team']);
  }

  onItemSelect(event) {
    console.log('event', event);
  }

  getUsers() {
    this.loaderController = true;
    this.teamFormService.getSavedUsers().then(data => {
      if (data.responseStatus) {
        this.userLists = data.users;
        this.userLists.map((item, index) => {
          this.userList.push({ itemName: item.firstName + ' ' + item.lastName, id: index, item: item });
        })
        this.route.params.subscribe(params => {
          let id = parseInt(params.id);
          if (!isNaN(id)) {
            console.log("params", params, id)
            this.getTeamDetails({ teamId: id });
          }
        });
        this.loaderController = false;
      } else {
        this.loaderController = false;
      }
    })
  }

  saveTeam() {
    this.loaderController = true
    if (this.post.teamName == null || this.post.teamName == '' || this.post.teamName == undefined || !(JSON.stringify(this.post.teamName).replace(/\s/g, '').length)) {
      console.log("if here");
      this.loaderController = false;
      this.showError = true;
    } else {
      let post = this.post;
      console.log("post", post);
      if (this.editForm == false) {
        post.teamLeader = post.teamLeader ? post.teamLeader.item : null;
        console.log("post.teamLeader", post.teamLeader);
        // console.log("userRole", post.userRole);
        // post.userRole = { roleId: post.userRole[0].data.roleId, userRole: post.userRole[0].data.userRole, module: post.userRole[0].data.module };
        let temp = [];
        temp = post.teamMembers;
        console.log("temp", temp);
        post.teamMembers = [];
        temp.map((data) => {
          post.teamMembers.push(data.item);
        })
        console.log("temp1", post.teamMembers);
        if (post.teamMembers.indexOf(post.teamLeader) == -1) {
          post.teamMembers.push(post.teamLeader);
        }
        console.log("temp2", post.teamMembers);
        let predefinedreports = [];
        let customReports = [];
        let adminSettings = [];
        post.predefinedReports.map(data => {
          predefinedreports.push({ predefinedReports: data.itemName })
        });
        post.customizedReports.map(data => {
          customReports.push({ customReport: data.itemName })
        });
        post.adminSettings.map(data => {
          adminSettings.push({ adminSettings: data.itemName })
        });
        let moduleSaved = {
          "privilageName": post.teamName,
          "predefinedreports": predefinedreports,
          "customReports": customReports,
          "adminSettings": adminSettings,
        }
        // post.module = moduleSaved;

        let result = {
          'teamLeader': post.teamLeader,
          'teamMembers': post.teamMembers,
          'teamName': post.teamName,
          'module': moduleSaved
        }
        console.log("req for save team", result);
        // (<HTMLInputElement>document.getElementById("save")).disabled = true;
        // document.getElementById("save").disabled = true;
        this.teamFormService.saveTeam(result).then(data => {
          console.log("teamFormService", data);
          if (data.responseStatus == true) {
            this.loaderController = false
            this.cancel();
            // this.getTeams();
          } else {
            console.log(data.responseMessage)
          }

        })
      } else {
        if (post.teamLeader == null) {
          post.teamLeader = this.tempTeamLeader.item;
          console.log("its null so maped", post.teamLeader);
        } else {
          post.teamLeader = post.teamLeader.item;
          console.log("changed", post.teamLeader);
        }
        console.log("post.teamLeader", post.teamLeader);
        // console.log("userRole", post.userRole);
        // post.userRole = { roleId: post.userRole[0].data.roleId, userRole: post.userRole[0].data.userRole, module: post.userRole[0].data.module };
        let temp = [];
        temp = post.teamMembers;
        console.log("temp", temp);
        post.teamMembers = [];
        temp.map((data) => {
          post.teamMembers.push(data.item);
        })
        // if (post.teamMembers.indexOf(post.teamLeader) == -1) {
        //   post.teamMembers.push(post.teamLeader);
        // }
        console.log("temp2", post.teamMembers);
        let predefinedreports = [];
        let customReports = [];
        let adminSettings = [];
        post.predefinedReports.map(data => {
          predefinedreports.push({ predefinedReports: data.itemName })
        });
        post.customizedReports.map(data => {
          customReports.push({ customReport: data.itemName })
        });
        post.adminSettings.map(data => {
          adminSettings.push({ adminSettings: data.itemName })
        });
        let moduleSaved = {
          "privilageName": post.teamName,
          "predefinedreports": predefinedreports,
          "customReports": customReports,
          "adminSettings": adminSettings,
        }
        // post.module = moduleSaved;

        let result = {
          'teamID': post.teamID,
          'teamLeader': post.teamLeader,
          'teamMembers': post.teamMembers,
          'teamName': post.teamName,
          'module': moduleSaved
        }
        console.log("req for update team", result);
        (<HTMLInputElement>document.getElementById("save")).disabled = true;
        this.teamFormService.updateTeam(result).then(data => {
          console.log("teamFormService", data);
          if (data.responseStatus == true) {
            this.loaderController = false
            this.cancel();
            // this.getTeams();
          } else {
            console.log(data.responseMessage)
          }

        })

      }
    }
  }





  getTeamDetails(params) {
    // this.loaderController = true

    this.post.teamMembers = []
    this.post.predefinedReports = []
    this.post.customizedReports = []
    this.post.adminSettings = []
    let teamLead = []
    this.editForm = true;
    this.teamFormService.getTeamById(params).then(data => {

      if (data.responseStatus == true) {
        console.log("done", data);
        // this.loaderController = false
        // this.showForm = true;
        this.teamLeadCntrl = false
        this.showDeleteButton = true;
        this.Data = data.team;
        // this.userLists.map((item, index) => {
        //   this.userList.push({ itemName: item.firstName + ' ' + item.lastName, id: index, item: item });
        // })
        // this.loadDefaultForm();
        console.log(data.team, "team");
        this.post.teamName = data.team.teamName;
        this.post.teamID = data.team.teamID;
        // console.log("dataMember", data.team, data.team.teamLeader);

        teamLead.push(data.team.teamLeader)
        teamLead.map(() => {
          // console.log("dataMember", dataMember);
          this.post.teamLeader = { itemName: data.team.teamLeader.firstName + ' ' + data.team.teamLeader.lastName, id: data.team.teamLeader.id, item: data.team.teamLeader };
        })
        this.tempTeamLeader = this.post.teamLeader;
        this.post.teamLeader = null;
        console.log("data.team.teamMembers", data.team.teamMembers);
        // data.team.teamMembers.map(dataMember => {
        //   this.post.teamMembers.push({ itemName: dataMember.firstName + ' ' + dataMember.lastName, item: dataMember });
        // })
        console.log(this.userList, "UserList");
        console.log("this.teamMembers", data.team.teamMembers)
        this.userList.map(userList => {
          data.team.teamMembers.map(teamMembers => {
            if (teamMembers.staffID == userList.item.staffID) {
              this.post.teamMembers.push(userList);
            }
            // if (data.team.teamMembers.indexOf(userList.item) !== -1){
            //   this.post.teamMembers.push(userList);
            // }
          })
        })

        // this.userList.map(userList => {
        //   if (userList.item == teamMembers) {
        //     this.post.teamMembers.push(userList);
        //   }
        // })
        // })
        console.log("data.team.teamMembers", this.post.teamMembers);
        // console.log("hh", data.team.module.adminSettings)
        console.log("data.team.module.adminSettings", data.team.module.adminSettings);
        // data.team.module.adminSettings.map((dataMember, i) => {
        //   console.log("dataMember1",dataMember);
        //   this.post.adminSettings.push({id: i, itemName: dataMember.adminSettings });
        // })
        data.team.module.adminSettings.map(adminSettings => {
          this.adminSettingsList.map(adminSettingsList => {
            if (adminSettings.adminSettings == adminSettingsList.itemName) {
              this.post.adminSettings.push(adminSettingsList);
            }
          })
        })
        console.log("data.team.module.predefinedreports", data.team.module.predefinedreports);
        // data.team.module.predefinedreports.map((dataMember, i) => {
        //   console.log("dataMember2",dataMember);
        //   this.post.predefinedReports.push({ id: i,  itemName: dataMember.predefinedReports });
        // })
        data.team.module.predefinedreports.map(predefinedreports => {
          this.predefinedReportsList.map(predefinedReportsList => {
            if (predefinedreports.predefinedReports == predefinedReportsList.itemName) {
              this.post.predefinedReports.push(predefinedReportsList);
            }
          })
        })
        console.log("data.team.module.customReports", data.team.module.customReports);
        // data.team.module.customReports.map((dataMember, i) => {
        //   console.log("dataMember3",dataMember);
        //   this.post.customizedReports.push({id: i+1,  itemName: dataMember.customReport });
        // })
        data.team.module.customReports.map(customReports => {
          this.customizedReportsList.map(customizedReportsList => {
            if (customReports.customReport == customizedReportsList.itemName) {
              this.post.customizedReports.push(customizedReportsList);
            }
          })
        })
        console.log("zzzzzzzzzzzzzzzzzzzzzzthis.post.customizedReports", this.post.customizedReports);

        console.log('this.post', this.post);
      } else {
        console.log(data.responseStatus);
      }
    });
  }


  getpredefinedReportsList() {

    this.roleService.predefinedReportsList().then(data => {
      console.log("predefinedReportsList", data, data.subModule);
      let List = data.subModule;
      List.map(item => {
        this.predefinedReportsList.push({ id: item.id, itemName: item.predefinedReports })
      })
      console.log("this.predefinedReportsList", this.predefinedReportsList);
    })
  }

  getcustomReportsList() {

    this.roleService.customReportsList().then(data => {
      console.log("pred", data, data.subModule);
      let List = data.subModule;
      List.map(item => {
        this.customizedReportsList.push({ id: item.id, itemName: item.customReport })
      })
      console.log("this.customizedReportsList", this.customizedReportsList);
    })
  }

  getadminSettingsList() {

    this.roleService.adminSettingsList().then(data => {
      console.log("p", data, data.subModule);
      let List = data.subModule;
      List.map(item => {
        this.adminSettingsList.push({ id: item.id, itemName: item.adminSettings })
      })
      console.log("this.adminSettingsList", this.adminSettingsList);
    })
  }

  delete() {
    this.loaderController = true
    let req =
      {
        "id": this.post.teamID
      }
    this.teamFormService.deleteTeamById(req).then(data => {
      // console.log("delete", data);
      if (data.responseStatus == true) {
        this.loaderController = false
        this.cancel();
      } else {
        console.log(data.responseMessage);
      }
    })
  }

}
