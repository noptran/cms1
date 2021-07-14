import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoleService } from './roles.service';
import { ExportService } from '../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  @Input()
  Sidenav: boolean;
  teamForm: FormGroup;
  showForm: boolean = false;
  userList = [];
  userLists = [];
  constructor(public roleService: RoleService,
    public exportService: ExportService) {
  }
  userSettings = {
    singleSelection: false,
    text: "Select",
    selectAllText: 'Select All ',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
  };
  teamList = [];
  teamLists = [];

  // settings = {
  //   actions: false,
  //   pager: {},
  //   selectMode: '',
  //   custom: [],
  //   columns: [],
  //   button: {},

  // };
  reportsViewList = [];
  reportsViewLists = [];
  Data;
  editForm: boolean = false;
  hideLoader: boolean = true;
  showTable: boolean = false;
  headers = [];
  rawdata = [];

  roleName;
  predefinedReports;
  customizedReports;
  adminSettings;

  predefinedReportsList=[];
  customizedReportsList=[];
  adminSettingsList=[];
  settings = {
    text: "Select ",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 1,
    enableSearchFilter: true
  };



  ngOnInit() {
    // this.loadDefaultForm2();
    this.getRoles();
    // this.saveRoles();
    this.getpredefinedReportsList();
    this.getcustomReportsList();
    this.getadminSettingsList();
    // this.predefinedReportsList = [
    //   {
    //     "id": 1,
    //     "itemName": "RiskManagement"
    //   },
    //   {
    //     "id": 2,
    //     "itemName": "FamilyPreservation"
    //   },
    //   {
    //     "id": 3,
    //     "itemName": "OutPatient"
    //   },
    //   {
    //     "id": 4,
    //     "itemName": "TFC"
    //   },
    //   {
    //     "id": 5,
    //     "itemName": "PsychiatricResidentialTreatment"
    //   },
    //   {
    //     "id": 6,
    //     "itemName": "TrendLineProcessing"
    //   },
    //   {
    //     "id": 7,
    //     "itemName": "FosterCareHomes"
    //   },
    //   {
    //     "id": 8,
    //     "itemName": "Oklahoma"
    //   },
    //   {
    //     "id": 9,
    //     "itemName": "OperationsManagement"
    //   },
    //   {
    //     "id": 10,
    //     "itemName": "DataManagement"
    //   }
    // ];

    // this.customizedReportsList = [
    //   {
    //     "id": 1,
    //     "itemName": "yourReports"
    //   },
    //   {
    //     "id": 2,
    //     "itemName": "addReports"
    //   }
    // ];

    // this.adminSettingsList = [

    //   {
    //     "id": 1,
    //     "itemName": "AdminSettings"
    //   },
    //   {
    //     "id": 2,
    //     "itemName": "MyOrganization"
    //   },
    //   {
    //     "id": 3,
    //     "itemName": "MyTeams"
    //   }
    // ];


  }

  onItemSelect() {

  }
  OnItemDeSelect() {

  }
  onSelectAll() {

  }
  onDeSelectAll() {

  }
  ItemsSelect() {

  }

  ItemsDeSelect() {

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
        this.adminSettingsList.push({ id: item.id, itemName: item.adminSettings})
      })
      console.log("this.adminSettingsList", this.adminSettingsList);
    })
}



getRoles() {
  this.hideLoader = false;
  this.roleService.getRoles().then(data => {
    console.log("data", data, data.Module);

    if (data.responseStatus == true) {
      this.hideLoader = true;
      this.showTable = true;
      this.rowData = data['Module']
      this.headers.push(Object.keys(this.rowData[0]))
      // console.log("Role Headers",this.headers)
      // let orgData = []
      // orgData.push(this.headers[0][,this.headers[1])
      // console.log("Org data",orgData)
      let test = []
      this.headers[0].forEach(function (result, i) {
        if (i < 2) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
          test.push(data)
        }
      })

      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
    } else {
      this.hideLoader = true;
      console.log(data.responseMessage);
    }
  })
}

saveRoles() {
  this.roleService.saveRoles().then(data => {
    console.log("saveRoles", data);
    if (data.responseStatus == true) {
      // this.goBack() ;
      // this.getRoles();
    } else {

    }
  })

}

save(){
  let predefinedreports = [];
  let customReports = [];
  let adminSettings = [];
  this.predefinedReports.map(data => {
    predefinedreports.push({ id: data.id, predefinedreports: data.itemName })
  });
  this.customizedReports.map(data => {
    customReports.push({ id: data.id, customReports: data.itemName })
  });
  this.adminSettings.map(data => {
    adminSettings.push({ id: data.id, adminSettings: data.itemName })
  });
  let moduleSaved = {
    "privilageName": this.roleName,
    "predefinedreports": predefinedreports,
    "customReports": customReports,
    "adminSettings": adminSettings,
  }


  console.log("module", moduleSaved);


  // this.roleService.saveUserRights(moduleSaved).then(data=>{
  //   console.log("data",data);
  // }) 
  let mapData = {
    "roleName": this.roleName,
    "module": moduleSaved
  }
  this.roleService.saveModuleToUser(mapData).then(data => {
    console.log("data", data);
    if (data.responseStatus == true) {
      this.goBack();
      this.getRoles();
    } else {

    }
  })

}

addForm() {
  // this.loadDefaultForm2();
  this.showForm = true;
  this.editForm = false
}
goBack() {
  this.showForm = false;
}

getTeamDetails() {
  this.editForm = true;

}

onRowSelected() {

}

exportToExcel() {
  this.exportService.exportAsExcelFile(this.reportsViewList, 'Roles');
}

exportAsCsv() {
  this.exportService.exportAsCSVFile(this.reportsViewList, 'Roles', true);
}


}

