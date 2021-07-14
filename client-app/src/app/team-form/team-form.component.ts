import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamFormService } from './team-form.service';
import { ExportService } from '../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { RoleService } from '../roles/roles.service';
import { TeamForm } from './team-form'
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  @Input()
  Sidenav: boolean;
  teamForm: FormGroup;
  showForm: boolean = false;
  userList = [];
  userLists = [];
  post: TeamForm = new TeamForm();
  constructor(public formBuilder: FormBuilder,
    public teamFormService: TeamFormService,
    public exportService: ExportService,
    public roleService: RoleService,
    public _router:Router) {
  }
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
  headers = [];
  rawdata = [];
  // userRoleList = [];


  // roleName;
  // predefinedReports;
  // customizedReports;
  // adminSettings;

  predefinedReportsList = [];
  customizedReportsList = [];
  adminSettingsList = [];

  showDeleteButton: boolean = false;
  tempTeamLeader;
  loaderController: boolean = false;





  ngOnInit() {
    this.getUsers();
    this.getTeams();
    // this.saveRoles();
    this.loadDefaultForm2();
    // this.getpredefinedReportsList();
    // this.getcustomReportsList();
    // this.getadminSettingsList();

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
        "itemName": "Users"
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

  // loadDefaultForm() {
  //   let teamLeader = { itemName: this.Data.teamLeader.firstName, id: this.Data.teamLeader.staffID, item: this.Data.teamLeader };
  //   let teamMembers = [];
  //   this.Data.teamMembers.map((item) => {
  //     teamMembers.push({ itemName: item.firstName, id: item.staffID, item: item });
  //   })
  //   this.teamForm = this.formBuilder.group({
  //     'teamName': [this.Data.teamName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')])],
  //     'teamLeader': [teamLeader],
  //     'teamMembers': [teamMembers],
  //     'predefinedReports': [null, Validators.compose([Validators.required])],
  //     'customizedReports': [null, Validators.compose([Validators.required])],
  //     'adminSettings': [null, Validators.compose([Validators.required])],
  //   });
  // }
  loadDefaultForm() {
    this.post.teamName
  }
  loadDefaultForm2() {
    this.teamForm = this.formBuilder.group({
      'teamName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')])],
      'teamLeader': [null, Validators.compose([Validators.required])],
      'teamMembers': [null, Validators.compose([Validators.required])],
      'predefinedReports': [null, Validators.compose([Validators.required])],
      'customizedReports': [null, Validators.compose([Validators.required])],
      'adminSettings': [null, Validators.compose([Validators.required])],
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

  // saveRoles() {
  //   this.roleService.saveRoles().then(data => {
  //     let userRoles;
  //     if (data.responseStatus == true) {
  //       console.log("saved", data);
  //       userRoles = data.userRoles;
  //       userRoles.map(item => {
  //         this.userRoleList.push({ id: item.roleId, itemName: item.roleName, data: item })
  //       })
  //     } else {
  //       console.log(data);
  //     }
  //   })
  // }

  addPost() {
    this.loaderController = true
    if (this.post.teamName == '' && this.post.teamName == undefined && !(JSON.stringify(this.post.teamName).replace(/\s/g, '').length)) {
    } else {


      let post = this.post;
      console.log("post", post);
      if (this.editForm == false) {
        post.teamLeader = post.teamLeader.item;
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
        (<HTMLInputElement>document.getElementById("save")).disabled = true;
        // document.getElementById("save").disabled = true;
        this.teamFormService.saveTeam(result).then(data => {
          console.log("teamFormService", data);
          if (data.responseStatus == true) {
            this.loaderController = false
            this.goBack();
            this.getTeams();
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
            swal('Success','Details are saved!','success')
            this.loaderController = false
            this.goBack();
            this.getTeams();
           
          } else {
            console.log(data.responseMessage)
          }

        })

      }
    }
  }

  // let predefinedreports = [];
  // let customReports = [];
  // let adminSettings = [];
  // this.predefinedReports.map(data => {
  //   predefinedreports.push({ id: data.id, predefinedreports: data.itemName })
  // });
  // this.customizedReports.map(data => {
  //   customReports.push({ id: data.id, customReports: data.itemName })
  // });
  // this.adminSettings.map(data => {
  //   adminSettings.push({ id: data.id, adminSettings: data.itemName })
  // });
  // let moduleSaved = {
  //   "privilageName": this.roleName,
  //   "predefinedreports": predefinedreports,
  //   "customReports": customReports,
  //   "adminSettings": adminSettings,
  // }


  // console.log("module", moduleSaved);


  // // this.roleService.saveUserRights(moduleSaved).then(data=>{
  // //   console.log("data",data);
  // // }) 
  // let mapData = {
  //   "roleName": this.roleName,
  //   "module": moduleSaved
  // }
  // this.roleService.saveModuleToUser(mapData).then(data => {
  //   console.log("data", data);
  //   if (data.responseStatus == true) {
  //     this.goBack();
  //     this.getRoles();
  //   } else {

  //   }
  // })

  addForm() {
    // this.post.teamName = '';
    // this.post.teamMembers = []
    // this.post.predefinedReports = []
    // this.post.customizedReports = []
    // this.post.adminSettings = []
    // this.loadDefaultForm2();
    // this.showForm = true;
    // this.editForm = false;
    // this.teamLeadCntrl = true;
    // this.showDeleteButton = false;
    this._router.navigate(['/reports/team/', 'new']);
  }
  goBack() {
    this.showForm = false;
    console.log("clicked");
    this._router.navigate(['/reports/team'])
  }
  getUsers() {
    this.teamFormService.getSavedUsers().then(data => {
      this.userLists = data.users;
      this.userLists.map((item, index) => {
        this.userList.push({ itemName: item.firstName + ' ' + item.lastName, id: index, item: item });
      })
    })
  }

  getTeams() {
    this.loaderController = true
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    this.teamFormService.getTeams().then(data => {
      if (data.responseStatus == true && data.team.length !== 0) {
        this.loaderController = false
        // console.log("data", data);
        this.reportsViewList = data.team;
        this.reportsViewLists = data.team;
        // let userRole =  data.team;
        // userRole.map(item=>{
        //   data.team.userRole = item.roleName;
        // })

        this.reportsViewLists.map((item, i) => {
          if (item.teamLeader !== null) {
            this.reportsViewList[i].teamLeader = item.teamLeader.firstName + '' + item.teamLeader.lastName;
          }
          this.reportsViewList[i].teamMembers = item.teamMembers.length;
        })
        this.rowData = data['team']
        this.headers.push(Object.keys(this.rowData[0]))
        let test = []
        // this.headers[0].forEach(function(result,i){
        //     let data = {headerName:result,field:result}
        //     test.push(data)
        // })
        this.headers[0].forEach(function (result, i) {
          if (i < 3) {
            // console.log("result", result);
            let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
            test.push(data)
          }
        })
        // console.log('test', test);
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        // console.log("this.columnDefs", this.columnDefs, this.rowData);
        // this.CreateTableFromJSON();
        this.hideLoader = true;
        this.showTable = true;
      } else {
        this.hideLoader = true;
      }
    })

  }

  onUsersSelected() {

  }
  onUserSelect() {

  }
  OnUserDeSelect() {

  }
  onSelectAll() {

  }
  onDeSelectAll() {

  }

  getTeamDetails(params) {
    this.loaderController = true

    this.post.teamMembers = []
    this.post.predefinedReports = []
    this.post.customizedReports = []
    this.post.adminSettings = []
    let teamLead = []
    this.editForm = true;
    this.teamFormService.getTeamById(params).then(data => {
    
      if (data.responseStatus == true) {
        this.loaderController = false
        this.showForm = true;
        this.teamLeadCntrl = false
        this.showDeleteButton = true;
        this.Data = data.team;
        this.userLists.map((item, index) => {
          this.userList.push({ itemName: item.firstName + ' ' + item.lastName, id: index, item: item });
        })
        this.loadDefaultForm();
        // console.log(data.team, "team");
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
        // console.log("this.post.teamLeader", this.post.teamLeader);
        data.team.teamMembers.map(dataMember => {
          this.post.teamMembers.push({ itemName: dataMember.firstName + ' ' + dataMember.lastName, item: dataMember });
        })
        // console.log("hh", data.team.module.adminSettings)
        data.team.module.adminSettings.map((dataMember) => {
          this.post.adminSettings.push({ itemName: dataMember.adminSettings });
        })
        data.team.module.predefinedreports.map((dataMember) => {
          // console.log('dataMember', dataMember);
          this.post.predefinedReports.push({ itemName: dataMember.predefinedReports });
        })
        data.team.module.customReports.map((dataMember) => {
          this.post.customizedReports.push({ itemName: dataMember.customReport });
        })
      } else {
        console.log(data.responseStatus);
      }
    });
  }

  delete() {
    this.loaderController = true
    let req =
      {
        "id": this.post.teamID
      }
    // console.log("tse", req);
    this.teamFormService.deleteTeamById(req).then(data => {
      // console.log("delete", data);
      if (data.responseStatus == true) {
        swal('Sucess','Details are deleted!','success')
        this.loaderController = false
        this.goBack();
        this.getTeams();
      } else {
        console.log(data.responseMessage);
      }
    })
  }

  onRowSelected(event) {
    // console.log("event",event)
    let param = '';
    param = event.data.teamID;
    this._router.navigate(['/reports/team/', param]);
    // console.log("Para",param)
    this.getTeamDetails({ teamId: param });
  }

  exportToExcel() {
    this.exportService.exportAsExcelFile(this.reportsViewList, 'Teams');
  }

  exportAsCsv() {
    this.exportService.exportAsCSVFile(this.reportsViewList, 'Teams', true);
  }
}
