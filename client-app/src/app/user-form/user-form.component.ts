import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamFormService } from '../team-form/team-form.service';
import { ExportService } from '../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';
import swal from 'sweetalert2';
import { isUndefined } from 'util';
import { UserService } from './user.service';
import { User } from './user';
import { HomeService } from '../home/home.service';
import { PagesizeService } from '../pagesize/pagesize.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  @Input()
  Sidenav: boolean;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  userForm: FormGroup;
  showForm: boolean = false;
  userLists = [];
  userList = [];
  userSelected: any;
  showTable: boolean = false;
  user;
  hideLoader: boolean = true;
  constructor(public formBuilder: FormBuilder,
    public _home:HomeService,
    public teamFormService: TeamFormService,
    public exportService: ExportService, 
    public _user: UserService,
    public _pageSize:PagesizeService) {
  }

  settings = {};
  reportsViewList = [];
  reportsViewLists = [];
  headers = [];
  rawdata = [];
  totalCount: any
  initialCount: any = 1;
  endCount: any = 100;
  getUsersFu: any;
  preIcon: any
  userData={}
  rCategories = [];
  reports = [];
  cReports = [];
  aSettings = [];
  referals = [];
  myExports = [];
  personMaster = [];
  cis_reintegration = [];
  cis_behavioural = []
  userInfo: User = new User();
  prIndicator: any
  selectedReport: any;
  reportEmptyStateController: boolean = false;
  initial = 1;
  end = 100;
  date:Date = new Date();
  disabled:any;

  dropdownList = [];
  paginationColumnFilter: any = [];
  tlpNameData: any = '';
  columnDropdownList: any = [];
  sortcolumnDropdownList = [];
  newArray = [];
  originalArray = [];
  displayFilter2 = [];
  originalArrayNonString = [];
  displayFilter2NonString = [];
  greaterThanArray = [];
  displayGreaterThan = [];
  lesserThanArray = [];
  displayLesserThan = [];
  containsArray = [];
  displayContains = [];
  greaterThanOrEqualsArray = [];
  displaygreaterThanOrEqualsArray = [];
  lessThanOrEqualsArray = [];
  displaylessThanOrEqualsArray = [];
  notBetweenArray = [];
  displayNotBetweenArray = [];
  displayIsNotEmptyArray = [];
  displayIsEmptyArray = [];
  isNotEmptyArray =[];
  isEmptyArray =[];
  fileNameComplete;

  filterQuery: string;

  selectedDataToFilter = [];

  columnData = [];

  filterColumnSelected = null;

  filterOption = 'OR';
  filterConditionOption = 'Equals';

  tempArray = [];
  tempConditionArray = [];
  onFilterSelected: any;
  tempSelectedDataToFilter = [];
  tempFilterColumnSelected = '';
  tempFilterConditionOption = '';
  displayFilter = [];
  duplicateTempArray = [];
  numericColumns = [];
  numericHeaders = [];
  sortColumn;
  sortOrder;
  startNumber: null;
  endNumber: null;
  startingDate: null;
  endingDate: null;

  NumberToFilter: null;
  DateToFilter: null;
  StringToFilter: String;
  FilterName: String;
  showSave: boolean = false;
  saveFilter;
  favouriteFilters = [];
  saveFilterId = null;
  filterIdToDelete = null;
  filterList2Temp = [];
  fileName;
  showFilterError;
  fillBothFields;

  sortList = [
    { name: 'asc' },
    { name: 'desc' },
    { name: 'no sort' }
  ];
  fillField;
 
  option: any = [{
    view: 'Between', value: 'Between'
  },
  {
    view: 'Equals', value: 'Equals'
  },
  {
    view: 'Greater than', value: 'Greater than'
  },
  {
    view: 'Lesser than', value: 'Lesser than'
  },
  {
    view: 'Contains', value: 'Contains'
  },
  {
    view: 'Greater than or Equals', value: 'Greater than or Equals'
  },
  {
    view: 'Less than or Equals', value: 'Less than or Equals'
  },
  {
    view: 'Not Between', value: 'notBetween'
  },
  {
    view: 'Is Empty', value: 'isEmpty'
  },
  {
    view: 'Is Not Empty', value: 'isNotEmpty'
  },
  ]




  goBack() {
    let cr_controller = false, pr_controller = false, as_controller = false;
    /** CR changes detection */
    if (this.userInfo.customReportUserRights.length == 0 && this.user.customReportUserRights.length == 0) {
      cr_controller = false
    } else {
      if (this.userInfo.customReportUserRights.length !== this.user.customReportUserRights.length) {
        // console.log("Changes found in CR")
        cr_controller = true
        // this.user.customReportUserRights.map(user_cr=>{
        //   this.userInfo.customReportUserRights.map(info_cr=>{
        //     console.log("CR",user_cr,info_cr)
        //     if(user_cr.indexOf(info_cr) !== -1){
        //       console.log("Changes found in CR")
        //     }
        //   })
        // })
      }
    }

    /**AS changes detection */
    if (this.userInfo.adminSettingsUserRights.length == 0 && this.user.adminSettingsUserRights.length == 0) {
      as_controller = false
    } else {
      if (this.userInfo.adminSettingsUserRights.length > 0 || this.user.adminSettingsUserRights.length > 0) {
        if (this.userInfo.adminSettingsUserRights.length !== this.user.adminSettingsUserRights.length) {
          as_controller = true
          // if (this.userInfo.adminSettingsUserRights.length > 0 && this.user.adminSettingsUserRights.length > 0) {
          //   this.user.adminSettingsUserRights.map(user_as => {
          //     this.userInfo.adminSettingsUserRights.map(info_as => {
          //       console.log("AS", user_as, info_as)
          //       if (user_as.adminSettings.indexOf(info_as) === -1) {
          //         as_controller = true
          //       }
          //     })
          //   })
          // }
        }
      }
    }

    /** PR changes detection*/
    if (this.userInfo.predefinedReportUserRights.length == 0 && this.user.predefinedReportUserRights.length == 0) {
      pr_controller = false
    } else {
      if (this.userInfo.predefinedReportUserRights.length > 0 || this.user.predefinedReportUserRights.length > 0) {
        pr_controller = true
          // if (this.userInfo.predefinedReportUserRights.length > 0 && this.user.predefinedReportUserRights.length > 0) {
          //   this.user.predefinedReportUserRights.map(user_pr => {
          //     this.userInfo.predefinedReportUserRights.map(info_pr => {
          //       if (user_pr.combination.indexOf(info_pr.combination) === -1) {
          //         pr_controller = true
          //       }
          //     })
          //   })
          //         }
      }
    }
    
if(pr_controller || cr_controller || as_controller ){

          swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
          }).then(result=>{
          console.log("Result",result)
          if(result.value){
            this.save();
          }
          if(!isUndefined(result.dismiss)){
            this.showForm = false;
          }
          }).catch(err=>{
            console.log("Err",err)
          })
      }else{
          this.showForm = false;
    }
  }
  loadDefaultForm() {
    this.userForm = this.formBuilder.group({
      'userFirstName': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')])],
      'userLastName': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')])],
      'userAddress': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z -]*$')])],
      'userCellPh': [this.user.cellPh, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[0-9-+]+$')])],
      'userEmail': [this.user.email, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email])],
      'lastLogin': [this.user.loginTime!==null ? new Date(this.user.loginTime) : ''],
      'lastLogout':[this.user.logoutTime!==null ? new Date(this.user.logoutTime) : '']
    });
  }
  loadDefaultForm2() {
    this.userForm = this.formBuilder.group({
      'userFirstName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')])],
      'userLastName': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')])],
      'userAddress': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z -]*$')])],
      'userCellPh': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[0-9-+]+$')])],
      'userEmail': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email])],
      'lastLogin': [this.user.loginTime],
      'lastLogout':[this.user.logoutTime]
    });
  }
  addPost() {

  }
  addForm() {
    this.showForm = true;
    this.loadDefaultForm2();
  }

  // getUsers(inital: any, end: any) {
  //   this.headers = [];
  //   this.rawdata = [];
  //   this.hideLoader = false;
  //   console.log("Pagination data", this.userData)
  //   let loader = document.getElementById('loading-overlay') as HTMLElement
  //   loader.style.display = 'block';
  //   this.teamFormService.userList(this.userData).then(data => {
  //     if (data.responseStatus == true) {
  //       loader.style.display = 'none';
  //       this.showTable = true;
  //       this.totalCount = data.totalCount;
  //       if (this.totalCount < 100) {
  //         this.end = this.totalCount
  //       }
  //       this.reportsViewList = data.users;
  //       this.rowData = data['users']
  //       this.headers.push(Object.keys(this.rowData[0]))
  //       let test = []
  //       this.headers[0].forEach(function (result, i) {
  //         console.log("result", result);
  //         if (result !== 'otp') {
  //           let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
  //           test.push(data)
  //         }
  //       })
  //       this.headers[0].map(data => {
  //         this.sortcolumnDropdownList.push({ label: data, value: data })
  //         this.columnDropdownList.push({ label: data, value: data })
  //       })
  //       this.rawdata.push(test)
  //       this.columnDefs = this.rawdata[0]
  //       // this.CreateTableFromJSON();
  //       this.hideLoader = true;
  //       console.log("rawdata", this.rawdata)
  //     }
  //   })
  // }

  getUsers(initial: any, end: any) {
    this.columnDropdownList = [];
    this.sortcolumnDropdownList =[];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    initial = initial;
    end = end;
    this.userData['filter'] = 'staff';
    this.userData['group by'] = 'All';
    this.userData['beginPagination'] = initial;
    this.userData['endPagination'] = end;
    this.userData['sort']?this.userData['sort']:this.userData['sort'] = {
      "column":"StaffID",
      "mode":"desc"
  }
   
    console.log("in getPr",this.userData);
    this.teamFormService.userList(this.userData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount
      this.reportsViewList = data.users;
      this.numericColumns = data.dataTypes;
      this.rowData = data['users']?data['users']:data['customReport']
      this.headers.push(Object.keys(this.rowData[0]))
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
    })
  }

  getUsersAfterFilter(initial:any,end:any){
    this.columnDropdownList = [];
    this.sortcolumnDropdownList =[];
    let currentInput = document.getElementById('currentPage') as HTMLInputElement;
    currentInput.value = '1';
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this.headers = [];
      this.rawdata = [];
      this.hideLoader = false;
      this.initial = 1;
      this.end = 100;
      this.userData['beginPagination'] = '1';
      this.userData['endPagination'] = '100';
      console.log("in getPr",this.userData);
      this.teamFormService.userList(this.userData).then(data => {
        loader.style.display = 'none';
        this.hideLoader = true;
        this.totalCount = data.totalCount;
        this.numericColumns = data.dataTypes;
        if(this.totalCount < 100 ){
          this.end = this.totalCount;
        }
        this.reportsViewList = data.users;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
          test.push(data)
        })
        this.headers[0].map(data => {
          this.sortcolumnDropdownList.push({ label: data, value: data })
          this.columnDropdownList.push({ label: data, value: data })
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
      })
    
  }

  getUsersAfterSort(initial:any,end:any){
    this.columnDropdownList = [];
    this.sortcolumnDropdownList =[];
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this.headers = [];
      this.rawdata = [];
      this.hideLoader = false;
      initial = initial;
      end = end;
      this.userData['filter'] = 'staff';
      this.userData['group by'] = 'All';
      this.userData['beginPagination'] = initial;
      this.userData['endPagination'] = end;
      console.log("in getPr",this.userData);
      this.teamFormService.userList(this.userData).then(data => {
        loader.style.display = 'none';
        this.hideLoader = true;
        this.totalCount = data.totalCount
        this.reportsViewList = data.users;
        this.numericColumns = data.dataTypes;
        this.rowData = data['users']
        this.headers.push(Object.keys(this.rowData[0]))
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
          test.push(data)
        })
        this.headers[0].map(data => {
          this.sortcolumnDropdownList.push({ label: data, value: data })
          this.columnDropdownList.push({ label: data, value: data })
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
      })
    
  }


  getTable(user) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.teamFormService.userList(user).then(data => {
      if (data.responseStatus == true) {
        loader.style.display = 'none';
        this.showTable = true;
        this.totalCount = data.totalCount
        this.reportsViewList = data.users;
        this.rowData = data['users']
        this.headers.push(Object.keys(this.rowData[0]))
        let test = []
        this.headers[0].forEach(function (result) {
          console.log("result", result);
          if (result !== 'otp') {
            let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
            test.push(data)
          }
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        // this.CreateTableFromJSON();
        this.hideLoader = true;
        console.log("rawdata", this.rawdata)
      }
    })
  }

  ngOnInit() {
    this.userData['beginPagination']= this.initial;
    this.userData['endPagination']= this.end;
    

    // setTimeout(function(){
    //   this.endCount = document.getElementById('user-des-count') as HTMLElement,
    //   console.log("End count",this.endCount),
    //   // this.getUsers(this.initialCount.innerText,this.endCount.innerText)
    // },3000)
    // setTimeout(function () {
    //   this.endCount = (document.getElementById('user-des-count') as HTMLElement).innerText,
    //     this.initialCount = (document.getElementById('user-initial-count') as HTMLElement).innerText,
    //     this.preIcon = (document.getElementById('user-pre') as HTMLElement)
    //   if (this.preIcon.innerText <= '1') {
    //     this.preIcon.style.display = 'none'
    //   }
    // }, 3000)
    console.log("End count", this.endCount, this.initialCount)


    this.getUsers(this.initialCount, this.endCount)

    this.rCategories = [
      { id: "1", name: "Family Preservation (FP)" },
      { id: "2", name: "OutPatient" },
      { id: "3", name: "Foster Care Homes (FCH)" },
      { id: "4", name: "Risk Management (RM)" },
      { id: "5", name: "Data Management (DM)" },
      { id: "6", name: "Trend Line Processing" },
      { id: "7", name: "Oklahoma" },
      { id: "8", name: "Psychiatric Residential Treatment (PRTF)" },
      { id: "9", name: "Reintegration Foster Care (RFC)" },
      { id: "10", name: "Kinship (KIN)" },
      { id: "11", name: "Operations Management (OM)" },
    ]

    this.cReports = [
      { id: 1, view: "Dynamic Reports", value: "DynamicReports" }
    ]
    this.aSettings = [
      // {id:1,view:"Admin Settings",value:"AdminSettings"},
      { id: 1, view: "Organization", value: "Organization" },
      { id: 2, view: "Teams", value: "Teams" },
      { id: 3, view: "Users", value: "Users" },
      { id: 4, view: "CMS configuration", value: "CMSconfiguration" }
    ]
    this.referals = [
      { id: 1, view: "Family Preservation", value: "FamilyPreservation" }
    ];
    this.myExports = [
      { id: 1, view: "My Exports", value: "MyExports" }
    ];
    this.personMaster = [
      { id: 1, view: "Client", value: "Client" },
      { id: 2, view: "Staff", value: "Staff" },
      { id: 3, view: "DHHS Staff", value: "DHHSStaff" },
      { id: 4, view: "DHS Staff", value: "DHSStaff" },
      { id: 5, view: "CSO Staff", value: "CSOStaff" },
      { id: 6, view: "CASA Officer", value: "CASAOfficer" },
      { id: 7, view: "Judge", value: "Judge" },
      { id: 8, view: "Provider Member", value: "ProviderMember" },
      { id: 9, view: "Community Member", value: "CommunityMember" },
      { id: 10, view: "Other Agency Staff", value: "OtherAgencyStaff" },
      { id: 11, view: "CRB Officer", value: "CRBOfficer" },
      { id: 12, view: "Family Member", value: "FamilyMember" },
    ];

    this.cis_reintegration = [               
        {id:1, view:"Adoptive Resource Inquiry Form", value:"Adoptive_Resource_Inquiry_Form"},
        {id:2, view:"Parent Child Visitation Log", value:"Parent_Child_Visitation_Log"},
        {id:3, view:"Worker Child Visit Activity Note", value:"Worker_Child_Visit_Activity_Note"},
        {id:4, view:"Worker Parent Visit Activity Log", value:"Worker_Parent_Visit_Activity_Log"},
    ];

    this.cis_behavioural = [
      {id:1, view:"ASQ12months", value: "ASQ12months"},
      {id:2, view:"ASQ18months", value: "ASQ18months"},
      {id:3, view:"ASQ24months", value: "ASQ24months"},
      {id:4, view:"ASQ2months", value: "ASQ2months"},
      {id:5, view:"ASQ30months", value: "ASQ30months"},
      {id:6, view:"ASQ36months", value: "ASQ36months"},
      {id:7, view:"ASQ48months", value: "ASQ48months"},
      {id:8, view:"ASQ60months", value: "ASQ60months"},
      {id:9, view:"ASQ6months", value: "ASQ6months"},
      {id:10, view:"CAFAS", value: "CAFAS"},
      {id:11, view:"CROPS", value: "CROPS"},
      {id:12, view:"CSDC", value: "CSDC"},
      {id:13, view:"NCFAS", value: "NCFAS"},
      {id:14, view:"PECFAS", value: "PECFAS"},
      {id:15, view:"PSI", value: "PSI"},
    ];
  }
  CreateTableFromJSON() {
    var col = [];
    var columns = {};
    var column;
    var element;
    var elementList = [];
    for (var i = 0; i < this.reportsViewList.length; i++) {
      for (var key in this.reportsViewList[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }
    col.forEach(title => {
      elementList.push(
        element = { title },
        columns[title] = element,
        column = { columns },
        column.columns[title].filter = {
          type: 'completer',
          config: {
            completer: {
              data: this.reportsViewList,
              searchFields: title,
              titleField: title,
            },
          },
        },
        column.columns[title].width = "50px",
      )
    });

    // this.settings = column;
    this.settings = {
      columns: {
        staffID: {
          title: 'Staff ID',
          filter: false
        },
        firstName: {
          title: 'FirstName',
          filter: false
        },
        lastName: {
          title: 'LastName',
          filter: false
        },
        email: {
          title: 'Email',
          filter: false
        },
        cellPh: {
          title: 'CellPh',
          filter: false
        },
        changedBy: {
          title: 'ChangedBy',
          filter: false
        },
        enteredBy: {
          title: 'EnteredBy',
          filter: false
        },
        extension: {
          title: 'Extension',
          filter: false
        }
      },
      actions: false,
      pager: {
        display: false,
      },
    };
    this.showTable = true;
  }


  getUserDetails() {

  }

  onConditionFilterSelected(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    switch (event) {
      case 'Between':
        this.columnDropdownList = []
        this.numericHeaders = []

        this.numericColumns.map(data => {

          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Greater than':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME)
          }
        })
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Lesser than':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Greater than or Equals':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Less than or Equals':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'notBetween':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      default:
        this.columnDropdownList = []
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
    }

    this.filterColumnSelected = null;
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement

    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === event) {
        return checkColumn = result.DATA_TYPE
      }
    })
    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    }else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
      }
    }
    else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block'
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }

    }
    this.tempFilterConditionOption = this.filterConditionOption;
  }

  // onSelect(event){
  //   this.onUsersSelected(event.data);
  // };
  onRowSelected(event) {
    console.log("event", event, event.data);
    this.onUsersSelected(event.data);
    this.getReportNames('Family Preservation (FP)');
  }

  onUsersSelected(data) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    let cr = document.getElementsByClassName('crContainer') as HTMLCollection
    let as = document.getElementsByClassName('asContainer') as HTMLCollection;
    let person = document.getElementsByClassName('personContainer') as HTMLCollection;
    let cis_behav = document.getElementsByClassName('cis_behav') as HTMLCollection;
    let cis_reing =  document.getElementsByClassName('cis_reing') as HTMLCollection;
    console.log("Collections", cr, as, this.user)
    loader.style.display = 'block'
    this.reports = []
    this.userInfo.customReportUserRights = []
    this.userInfo.adminSettingsUserRights = []
    this.teamFormService.getUserById({ staffID: data.staffID ? data.staffID : data.StaffID }).then(data => {
      if (data.responseStatus == true) {
        loader.style.display = 'none'
        this.user = data.users;
        this.userInfo.customReportUserRights = this.userInfo.customReportUserRights
        console.log("After loaded as", this.userInfo.customReportUserRights)
        console.log("Last modified date1",this.user.lastModifiedDate);
        console.log("Last modified date2",new Date(this.user.lastModifiedDate).toUTCString());
        this.loadDefaultForm();
        this.showForm = true;
        console.log("This user", this.user)
        this.cReports.map((result_1, i) => {
          this.user.customReportUserRights.map((result_2) => {
            if (result_1.value === result_2.customReport) {
              setTimeout(function () {
                cr[i].children["0"].firstElementChild.checked = true;
              }, 3000)
              // cr["0"].firstElementChild.childNodes[1].checked = true

            }
          })
        })

        this.aSettings.map((adminResult_1, i) => {
          this.user.adminSettingsUserRights.map((aminResult_2) => {
            if (adminResult_1.value === aminResult_2.adminSettings) {
              setTimeout(function () {
                 as[i].children["0"].firstElementChild.checked = true;
              }, 3000)
              // cr["0"].firstElementChild.childNodes[1].checked = true

            }
          })
        })

        this.personMaster.map((personResult_1,i)=>{
          this.user.personUserRights.map((personResult_2)=>{
            if(personResult_1.value === personResult_2.personUserRights){
              setTimeout(function () {
                person[i].children["0"].firstElementChild.checked = true;
              }, 3000)
            }
          })
        })

        this.cis_behavioural.map((result_1,i)=>{
          this.user.cisUserRights.map((result_2)=>{
            if(result_1.value === result_2.behavioralAssessment){
              setTimeout(function () {
                cis_behav[i].children["0"].firstElementChild.checked = true;
              }, 3000)
            }
          })
        })

        this.cis_reintegration.map((result_1,i)=>{
          this.user.cisUserRights.map((result_2)=>{
            if(result_1.value === result_2.reintegration){
              setTimeout(function () {
                cis_reing[i].children["0"].firstElementChild.checked = true;
              }, 3000)
            }
          })
        })

      } else {
        loader.style.display = 'none'
      }
    });
  }
  exportToExcel() {
    this.exportService.exportAsExcelFile(this.reportsViewList, 'Users');
  }
  exportAsCsv() {
    this.exportService.exportAsCSVFile(this.reportsViewList, 'Users', true);
  }

  navigation(action: string) {
    this._home.pagination(action,this.totalCount,this.initial,this.end).then((res)=>{
      this.initial = res[0];
      this.end = res[1];
      this.userData['beginPagination'] = this.initial;
      this.userData['endPagination'] = this.end;
      return this.getTable(this.userData);
    })
  }

  onFilterChanged(event: any) {
    let filterType: any
    let source = event.srcElement.parentElement.parentElement.__agComponent, value: any, column: any, query: any;
    // let report = {
    //   vName:this.strReportName,
    //   beginPagination:parseInt(initial.innerText),
    //   endPagination:parseInt(end.innerText),
    // }
    //console.log("TLp data",this.tlpNameData,typeof this.tlpNameData)
    if (event.target.id === 'filterType') {
      filterType = event.target.value
      console.log("filter begin", source.filterText, typeof source.filterText)
      if (source.filterText !== undefined) {
        switch (filterType) {
          case 'contains':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' like\'' + '%' + value + '%' + '\''
            //console.log("Enter in the contains",value,column,query)
            this.userData['paginationFilter'] = query
            //console.log("contains data",this.data,JSON.stringify(this.data))
            this.getTable(this.userData)

            break;
          case 'equals':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + '=\'' + value + '\''
            //console.log("Enter in the contains",value,column,query)
            this.userData['paginationFilter'] = query
            //console.log("contains data",this.data,JSON.stringify(this.data))
            this.getTable(this.userData)
            break;
          case 'notEqual':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + '!=\'' + value + '\''
            //console.log("Enter in the contains",value,column,query)
            this.userData['paginationFilter'] = query
            //console.log("contains data",this.data,JSON.stringify(this.data))
            this.getTable(this.userData)
            break;
          case 'startsWith':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' like\'' + value + '%' + '\''
            //console.log("Enter in the contains",value,column,query)
            this.userData['paginationFilter'] = query
            //console.log("contains data",this.data,JSON.stringify(this.data))
            this.getTable(this.userData)
            break;
          case 'endsWith':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' like\'' + '%' + value + '\''
            //console.log("Enter in the contains",value,column,query)
            this.userData['paginationFilter'] = query
            //console.log("contains data",this.data,JSON.stringify(this.data))
            this.getTable(this.userData)
            break;
          case 'notContains':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' not like\'' + '%' + value + '%' + '\''
            //console.log("Enter in the contains",value,column,query)
            this.userData['paginationFilter'] = query
            //console.log("contains data",this.data,JSON.stringify(this.data))
            this.getTable(this.userData)
            break;
        }
      } else {
        swal('Oops!', 'Filter text missing!', 'warning')
      }

    }
  }


  getReportNames(report) {
    let label = document.getElementsByClassName('report-container-height') as HTMLCollection
    let selectAll = document.getElementById('prePRSelectall') as HTMLInputElement
    let loader = document.getElementById('loading-overlay') as HTMLElement
    // let search_input = document.getElementById('report-search') as HTMLInputElement;
    let selectedReports = []
    if (selectAll !== null) {
      selectAll.checked = false;

    }
    if (!isUndefined(report)) {
      loader.style.display = 'block';
      // search_input.value = ''
      this.userSelected = report
      this.selectedReport = report
      let req = { reportName: report }
      console.log("Enter in the get reprot function", req)
      this._user.getReportName(req).then(data => {
        if (data.responseStatus) {
          this.reports = data.userRightCombinations
          setTimeout(() => {
            loader.style.display = 'none';
          }, 3000)
          this.reports.map((result_1, i) => {
            this.user.predefinedReportUserRights.map(result_2 => {
              if (result_1.combination === result_2.combination) {
                selectedReports.push(result_2)
                setTimeout(function () {
                  label["0"].children[i].firstElementChild.childNodes[1].checked = true;
                }, 3000)
              }

            })

          })
          console.log("Selected reports", selectedReports.length)
          if (selectedReports.length === this.reports.length) {
            setTimeout(function () {
              selectAll.checked = true;
            }, 3000)
          }
        }
      })
    }
  }
  prInputs(report: any, event: any) {
    this.userInfo.predefinedReportUserRights = this.user.predefinedReportUserRights
    if (event.target.checked) {
      this.userInfo.predefinedReportUserRights.push(report)
    } else {
      console.log("Remove items")
      if (this.user.predefinedReportUserRights.length > 0) {
        console.log("PR Data", this.user.predefinedReportUserRights)
        this.userInfo.predefinedReportUserRights = this.user.predefinedReportUserRights
      }
      this.userInfo.predefinedReportUserRights.map((data, index) => {
        console.log("Report", report.combination)
        if (data.combination.indexOf(report.combination) !== -1) {
          this.userInfo.predefinedReportUserRights.splice(index, 1)
          console.log("Inside loop", this.userInfo.predefinedReportUserRights)
        }
      })
    }
    console.log("PR", this.userInfo.predefinedReportUserRights)
  }
  crInputs(report: any, event: any, i: any) {
    console.log("Event", event, event.target.checked)
    let req = { customReport: report }
    if (event.target.checked) {
      if (this.user.customReportUserRights.length > 0) {
        this.userInfo.customReportUserRights = this.user.customReportUserRights
      }
      console.log("Inside crInputs", this.userInfo.customReportUserRights)
      this.userInfo.customReportUserRights.push(req)
    }
    // else if(!event.target.checked){
    //   this.user.customReportUserRights.splice(i,1)
    //   console.log("Remove items",i,this.user.customReportUserRights)
    // }
    else {
      if (this.user.customReportUserRights.length > 0) {
        console.log("CR Data", this.user.customReportUserRights)
        this.userInfo.customReportUserRights = this.user.customReportUserRights
      }
      this.userInfo.customReportUserRights.map((data, index) => {
        console.log("Report id", report)
        if (data.customReport.indexOf(report) !== -1) {
          this.userInfo.customReportUserRights.splice(index, 1)
          console.log("Inside loop", this.userInfo.customReportUserRights)
        }
      })
    }
    console.log("CR", this.userInfo.customReportUserRights, i)
  }
  // selectAllCustomReports(){
  //   this.userInfo.customReportUserRights = {customReport:'addReports'}
  // }
  prSelectAll(event) {

    console.log("Event", event.target.checked, event)
    let length = event.path[3].children[3].children.length;
    // let label = 
    if (!event.target.checked) {
      console.log("unchecked")
      for (let i = 0; i < length; i++) {
        event.path[3].children[3].children[i].children["0"].childNodes[1].checked = false;
        this.userInfo.predefinedReportUserRights.map((data, index) => {
          if (data.combination.indexOf(event.path[3].children[3].children[i].children["1"].childNodes[1].innerText) !== -1) {
            this.userInfo.predefinedReportUserRights.splice(index, 1)
          }
        })

      }

    } else {
      console.log("Total length", length)
      console.log("Source reports", this.reports)
      for (let i = 0; i < length; i++) {
        event.path[3].children[3].children[i].children["0"].childNodes[1].checked = true;
        console.log("Preselect labels", event.path[3].children[3].children[i].children["1"].childNodes[1].innerText)
        this.userInfo.predefinedReportUserRights = this.user.predefinedReportUserRights
        this.reports.map(item => {
          if (item.combination === event.path[3].children[3].children[i].children["1"].childNodes[1].innerText) {
            this.userInfo.predefinedReportUserRights.push(item)
            console.log("After push", this.userInfo.predefinedReportUserRights)
          }
        })
      }
    }
    console.log("Select all final", this.user.predefinedReportUserRights)
  }

  asSelectall(event) {
    console.log("Event", event)
    console.log("Event", event.target.checked, event)
    let length = event.path[3].childElementCount, label;
    if (event.target.checked) {
      console.log("Total length", length)
      this.userInfo.adminSettingsUserRights = [];
      for (let i = 1; i <= length; i++) {
        console.log("I", i)
        event.path[3].children[i].children["0"].children["0"].children["0"].checked = true;
        label = event.path[3].children[i].children["0"].children[1].children["0"].innerText
        console.log("Preselect labels", label.replace(/\s/g, ''))
        // this.userInfo.adminSettingsUserRights = this.user.adminSettingsUserRights
        // this.userInfo.adminSettingsUserRights.map(item=>{
        //   console.log("Item****",item.adminSettings, label)
        // if(item.adminSettings.indexOf(label) !== -1){
        this.userInfo.adminSettingsUserRights.push({ adminSettings: label.replace(/\s/g, '') })
        // }
        // })
        console.log("After push", this.userInfo.adminSettingsUserRights)
        // {}
      }
    } else {
      console.log("un select all")
      for (let i = 1; i <= length; i++) {
        event.path[3].children[i].children["0"].children["0"].children["0"].checked = false;
      }
      this.userInfo.adminSettingsUserRights = []

    }
  }
  asInputs(report: any, event: any) {
    let req = { adminSettings: report }
    if (event.target.checked) {
      if (this.user.adminSettingsUserRights.length > 0) {
        this.userInfo.adminSettingsUserRights = this.user.adminSettingsUserRights
      }
      this.userInfo.adminSettingsUserRights.push(req)
    } else {
      if (this.user.adminSettingsUserRights.length > 0) {
        console.log("AS Data", this.user.adminSettingsUserRights)
        this.userInfo.adminSettingsUserRights = this.user.adminSettingsUserRights
      }
      this.userInfo.adminSettingsUserRights.map((data, index) => {
        console.log("Report id", report)
        if (data.adminSettings.indexOf(report) !== -1) {
          this.userInfo.adminSettingsUserRights.splice(index, 1)
          console.log("Inside loop", this.userInfo.adminSettingsUserRights)
        }
      })
    }
    console.log("AS", this.userInfo.adminSettingsUserRights)
  }
  referInputs(value,event) {
    console.log("", event)
    if(event.target.checked){
      this.userInfo.referralUserRights.push({referralUserRights:value});
      console.log("User info",this.userInfo.referralUserRights)
    }else{
      this.userInfo.referralUserRights.pop();
    }
  }

  exportInputs(value,event) {
    this.userInfo.exportUserRights = []; 
    if(event.target.checked){
      this.userInfo.exportUserRights.push({exportUserRights:value});
      console.log("User info",this.userInfo.exportUserRights)
    }else{
      this.userInfo.exportUserRights.pop();
    }
  }

  cisReitegInputs(value,event) {
    let index = this.userInfo.cisUserRights.indexOf(value); 
    if(event.target.checked){
      if( index == -1){
      this.userInfo.cisUserRights.push({reintegration:value});
      console.log("User info",this.userInfo.cisUserRights)
      }
    }else{
      this.userInfo.cisUserRights.map((data, index) => {
        console.log("Index of cisUserrights",index,data.reintegration.indexOf(value))
        if (data.reintegration.indexOf(value) !== -1) {
          this.userInfo.cisUserRights.splice(index, 1)
        }
      })
    }
  }

  cisBehavAss(value,event) {
    let index = this.userInfo.cisUserRights.indexOf(value);
    if(event.target.checked){
      if( index == -1){
      this.userInfo.cisUserRights.push({behavioralAssessment:value});
      console.log("User info",this.userInfo.cisUserRights)
      }
    }else{
      this.userInfo.cisUserRights.map((data, index) => {
        console.log("Index of cisUserrights",index,data.behavioralAssessment.indexOf(value))
        if (data.behavioralAssessment.indexOf(value) !== -1) {
          this.userInfo.cisUserRights.splice(index, 1)
        }
      })
    }
  }

  cis_reingSelectall(event) {
    console.log("Reing",event)
    let length = event.path[3].childElementCount, label;
    if (event.target.checked) {
      this.userInfo.cisUserRights = [];
      for (let i = 2; i <= length; i++) {
        event.path[3].children[i].children["0"].children["0"].children["0"].checked = true;
        label = event.path[3].children[i].children["0"].children[1].children["0"].innerText
        this.userInfo.cisUserRights.push({ reintegration: label.replace(/\s/g, '') })
        // }
        // })
        // {}
      }
    } else {
      for (let i = 2; i <= length; i++) {
        event.path[3].children[i].children["0"].children["0"].children["0"].checked = false;
      }
      this.userInfo.cisUserRights = []

    }
  }

  cis_behavSelectall(event){
    console.log("behav",event)
    let length = event.path[3].childElementCount, label;
    if (event.target.checked) {
      this.userInfo.cisUserRights = [];
      for (let i = 8; i <= length; i++) {
        event.path[3].children[i].children["0"].children["0"].children["0"].checked = true;
        label = event.path[3].children[i].children["0"].children[1].children["0"].innerText
        this.userInfo.cisUserRights.push({ behavioralAssessment: label.replace(/\s/g, '') })
        // }
        // })
        // {}
      }
    } else {
      for (let i = 8; i <= length; i++) {
        event.path[3].children[i].children["0"].children["0"].children["0"].checked = false;
      }
      this.userInfo.cisUserRights = []

    }
  }


  save() {
   // console.log("Form controlls",this.userForm.value)
    // console.log("time**",new Date(this.userForm.value.lastLogin).getTime());
    // console.log("time parse**",Date.parse(this.userForm.value.lastLogin) / 1000 );
    console.log("Predefined reports *****", this.user.predefinedReportUserRights)
    console.log("User", this.user, this.userInfo.customReportUserRights, this.user.adminSettingsUserRights)
    let btnLabel = document.getElementById('saveBtnLabel') as HTMLElement
    let loader = document.getElementById('loading-overlay') as HTMLElement
    btnLabel.innerText = 'Processing...';
    loader.style.display = 'block';
    if (this.user.customReportUserRights.length > 0) {
      this.userInfo.customReportUserRights = this.user.customReportUserRights
    }
    console.log("Pre adminSettings", this.user.adminSettingsUserRights)
    if (this.user.adminSettingsUserRights.length > 0) {
      this.userInfo.adminSettingsUserRights = this.user.adminSettingsUserRights
    }
    let req = Object.assign({}, this.user, this.userInfo)
    console.log("Req", req, JSON.stringify(req))
    this._user.updateUserRights(req).then(result => {
      console.log("Result", result)
      if (result.responseStatus) {
        btnLabel.innerText = 'Save';
        loader.style.display = 'none';
        swal('Success!', result.responseMessage, 'success');
        this.showForm = false;
      } else {
        btnLabel.innerText = 'Save'
        swal('Failed!', result.responseMessage, 'error')
      }
    })

    //this.userInfo.predefinedReportUserRights.push()
  }

  SortChanged() {
    if (this.sortColumn !== null && this.sortColumn !== undefined) {
      if (this.sortOrder.name !== 'no sort') {
          this.userData['sort'] = {
            "column": this.sortColumn,
            "mode": this.sortOrder.name
          }
          this.getUsersAfterSort(this.initial, this.end);
      
        }
       else if (this.sortOrder.name == 'no sort') {     
          delete this.userData['sort'];
          this.getUsers(this.initial, this.end);
      }
    }
  }

  reportSearch() {
    let counter = 0;
    let report = document.getElementsByClassName('report-border') as HTMLCollection
    let report_container = document.getElementsByClassName('report-container-height') as HTMLCollection
    let input = document.getElementById('report-search') as HTMLInputElement
    console.log("Search is triggered", report_container)
    for (let i = 0; i < report.length; i++) {
      console.log("Report", report[i].lastElementChild.getElementsByTagName('span')[0].innerText, input.value)
      if (report[i].lastElementChild.getElementsByTagName('span')[0].innerText.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
        report[i].setAttribute('style', 'display:')

      } else {
        report[i].setAttribute('style', 'display:none')
      }
    }
    console.log("Container lenght", report.length)
    for (let j = 0; j < report.length; j++) {
      console.log("Selected report", report[j].lastElementChild.getElementsByTagName('span')[0].innerText.indexOf(input.value))
      if (report[j].lastElementChild.getElementsByTagName('span')[0].innerText.indexOf(input.value) == -1) {
        counter++;
        // this.reportEmptyStateController = true;
      }
      else {
        // this.reportEmptyStateController = false;
      }
    }
    console.log("Counter", counter)
    if (report.length == counter) {
      this.reportEmptyStateController = true;
    } else {
      this.reportEmptyStateController = false;
    }
    // if(counter == 1){
    //   this.reportEmptyStateController = true;
    // }else{
    //   this.reportEmptyStateController = false;
    // }

  }

  // reportCategoryHighLight(target){
  //     let higlight_node = document.getElementById(target);
  //     console.log("high",higlight_node)
  //     higlight_node.classList.remove('active_category');
  //     higlight_node.classList.add('active_category');
  // }

  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      this.getUsers(this.initial,this.end)
    }
  }

  pagesize(event) {
    if (event.target.localName == 'img') {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      this.getUsers(this.initial,this.end)
    }
  }

  // getPersonAfterFilter(initial:any,end:any){
  //   this.getUsers(this.initial, this.end);
    
  // }

  // getPersonAfterSort(initial:any,end:any){
  //   this.getUsers(this.initial, this.end);
    
  // }

  clearDataFromPayload() {
    this.saveFilterId = null;
    this.FilterName = null;
    this.showSave = false;
    delete this.userData['paginationFilter'];
    this.userData['beginPagination'] = 1;
    this.userData['endPagination'] = 100;
    delete this.userData['equals'];
    delete this.userData['between'];
    delete this.userData['greaterThanOrEquals'];
    delete this.userData['lessThanOrEquals'];
    delete this.userData['greaterThan'];
    delete this.userData['lessThan'];
    delete this.userData['contains'];
    delete this.userData['notBetween'];
  }

  clearFilter() {
 
    this.displayFilter2NonString = [];
    this.displayFilter2 = [];
    this.originalArray = [];
    this.originalArrayNonString = [];
    this.newArray = [];
    this.greaterThanArray = [];
    this.lesserThanArray = [];
    this.greaterThanOrEqualsArray = [];
    this.lessThanOrEqualsArray = [];
    this.containsArray = [];
    this.displayGreaterThan = [];
    this.displayLesserThan = [];
    this.displaygreaterThanOrEqualsArray = [];
    this.displaylessThanOrEqualsArray = [];
    this.displayContains = [];
    this.notBetweenArray = [];
    this.displayNotBetweenArray = [];
    this.sortOrder = null;
    this.sortColumn = null;
    this.displayIsEmptyArray = [];
    this.displayIsNotEmptyArray = [];
    this.isEmptyArray = [];
    this.isNotEmptyArray = [];
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;
  
}

  reset(){
    this.clearFilter();
    this.clearDataFromPayload();
    this.getUsers('1','100');
    let currentInput = document.getElementById('currentPage') as HTMLInputElement;
    currentInput.value = '1';
  }

    // getFavourites() {
    //     let getReq = {
    //       // "userId": localStorage.getItem('UserId'),
    //       "userId": 4621,
    //       "spName": this.spName
    //     }
    //     this._report.getFavourites(getReq).then(data => {
    //       this.favouriteFilters = data.favoriteFilter
    //     })
    //   }

 
      apply(data, ev) {
        if (ev.target.id == 'apply') {
          // this.reset();
          this.clearDataFromPayload();
          let filter = JSON.parse(data.favoriteFilterRequest);
          this.saveFilterId = data.favoriteFilterId;
          this.FilterName = data.favoriteFilterName;
          if (filter.equals && filter.equals.length > 0) {
            filter.equals.map(item => {
              let filterData = [];
              item.filter.map(data => {
                filterData.push(data.value);
              })
              this.mapFilterIntoArray(filterData, item.column, this.originalArray);
            })
          }
    
          if (filter.between && filter.between.length > 0) {
            filter.between.map(item => {
              let filterData = [];
              filterData.push("'" + item.filter[0].value + "'" + ' and ' + "'" + item.filter[1].value + "'");
              this.mapFilterIntoArray(filterData, item.column, this.originalArrayNonString);
            })
          }
    
          if (filter.notBetween && filter.notBetween.length > 0) {
            filter.notBetween.map(item => {
              let filterData = [];
              filterData.push("'" + item.filter[0].value + "'" + ' and ' + "'" + item.filter[1].value + "'");
              this.mapFilterIntoArray(filterData, item.column, this.notBetweenArray);
            })
          }
    
          if (filter.contains && filter.contains.length > 0) {
            filter.contains.map(item => {
              let filterData = [];
              filterData = item.value;
              this.mapFilterIntoArray(filterData, item.column, this.containsArray);
            })
          }
    
          if (filter.greaterThan && filter.greaterThan.length > 0) {
            filter.greaterThan.map(item => {
              let filterData = [];
              filterData = item.value;
              this.mapFilterIntoArray(filterData, item.column, this.greaterThanArray);
            })
          }
    
          if (filter.lessThan && filter.lessThan.length > 0) {
            filter.lessThan.map(item => {
              let filterData = [];
              filterData = item.value;
              this.mapFilterIntoArray(filterData, item.column, this.lesserThanArray);
            })
          }
    
          if (filter.greaterThanOrEquals && filter.greaterThanOrEquals.length > 0) {
            filter.greaterThanOrEquals.map(item => {
              let filterData = [];
              filterData = item.value;
              this.mapFilterIntoArray(filterData, item.column, this.greaterThanOrEqualsArray);
            })
          }
    
          if (filter.lessThanOrEqualsArray && filter.lessThanOrEqualsArray.length > 0) {
            filter.lessThanOrEqualsArray.map(item => {
              let filterData = [];
              filterData = item.value;
              this.mapFilterIntoArray(filterData, item.column, this.lessThanOrEqualsArray);
            })
          }
    
          this.display(this.originalArray, this.displayFilter2);
          this.display(this.originalArrayNonString, this.displayFilter2NonString);
          this.display(this.containsArray, this.displayContains);
          this.display(this.greaterThanArray, this.displayGreaterThan);
          this.display(this.lesserThanArray, this.displayLesserThan);
          this.display(this.notBetweenArray, this.displayNotBetweenArray);
          this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
          this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
          this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);     
          this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);
          this.applyFilter();
        }
      }
    
      mapFilterIntoArray(filterData, column, array) {
        if (this.newArray.indexOf(JSON.stringify({ column: column, filter: filterData }))) {
          this.newArray.push(JSON.stringify({ column: column, filter: filterData }));
          array.push({ column: column, filter: filterData });
        }
      }
    
    //   removeFavourites() {
    //     let deleteReq = {
    //       "favoriteFilterId": this.filterIdToDelete
    //     }
    //     this._report.deleteFavourites(deleteReq).then(data => {
    //       swal(
    //         'Success!',
    //         'Filter is deleted successfully!',
    //         'success'
    //       )
    //       this.getFavourites();
    //     })
    //     if (this.filterIdToDelete == this.saveFilterId) {
    //       this.getPerson(this.initial, this.end);
    //     }
    //   }
  

  remove(value, ind, display, array) {
    display.splice(ind, 1);
    let duplicateOriginalArray = array;
    duplicateOriginalArray.map((item, index) => {
      /**
       * have to check for column too..
       * Now it checks for value
       */
      let dataArray = item.filter;
      dataArray.map((data, i) => {
        if (JSON.stringify(data) == JSON.stringify(value.value)) {
          array[index].filter.splice(i, 1);
        }
      })
    })
    if (this.displayFilter2.length <= 0 && this.displayFilter2NonString.length <= 0 && this.displayGreaterThan.length <= 0 && this.displayLesserThan.length <= 0 && this.displayContains.length <= 0 && this.displaygreaterThanOrEqualsArray.length <= 0 && this.displaylessThanOrEqualsArray.length <= 0 && this.displayNotBetweenArray.length <= 0) {
      this.reset();
      this.showSave = false;
    }
  }

  removeEmpty(ind,display,array){
    display.splice(ind,1);
    array.splice(ind,1);
    if (this.displayFilter2.length <= 0 && this.displayFilter2NonString.length <= 0 && this.displayGreaterThan.length <= 0 && 
      this.displayLesserThan.length <= 0 && this.displayContains.length <= 0 && this.displaygreaterThanOrEqualsArray.length <= 0 && 
      this.displaylessThanOrEqualsArray.length <= 0 && this.displayNotBetweenArray.length <= 0 && this.displayIsEmptyArray.length <= 0 && 
      this.displayIsNotEmptyArray.length <= 0) {
      this.reset();
      this.showSave = false;
    }
  }

  display(array, display) {
    if (array.length > 0) {
      array.map(item => {
        if (display.length > 0) {
          let dis = [];
          display.map(str => {
            dis.push(JSON.stringify(str));
          })
          item.filter.map(filt => {
            if (dis.indexOf(JSON.stringify({ column: item.column, value: filt })) == -1) {
              display.push({ column: item.column, value: filt })
            }
          })
        } else {
          item.filter.map(data => {
            display.push({ column: item.column, value: data })
          })
        }
      })
    }
  }

  displayForEmpty(array, display) {
    let dis = [];
    if (display.length > 0) {
      display.map(str => {
        dis.push(JSON.stringify(str));
      })
    }
    if (array.length > 0) {
      array.map(data => {
        if (dis.indexOf(JSON.stringify({ column: data.column })) == -1) {
          display.push({ column: data.column })
        }
      })
    } 
  }

  applyFilter() {
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement


    // let tlpData = {
    //   "filterHeader": this.tlpDataHeader,
    //   "filter": this.tlpNameData,
    //   "beginDate": moment(new Date()).subtract(13, 'months').format('YYYY-MM-DD'),
    //   "endDate": moment(new Date()).format('YYYY-MM-DD'),
    //   "action": 'NaN',
    //   "beginPagination": '1',
    //   "endPagination": '100',
    // }
    /**
     * Need to replace tlpData by this,tlpData
     */
    // this.tlpData = tlpData;

    let filterArray = [];
    this.originalArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push({ value: data })
      })
      if (val.length > 0) {
        filterArray.push({ column: item.column, filter: val })
      }
    })

    let filterArrayNonString = [];
    this.originalArrayNonString.map(item => {
      let val = [];
      item.filter.map(data => {
        let arr = data.split('and');

        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') })
        })
      })
      if (val.length > 0) {
        filterArrayNonString.push({ column: item.column, filter: val })
      }
    })

    let filterNotBetweenArray = [];
    this.notBetweenArray.map(item => {
      let val = [];
      item.filter.map(data => {
        let arr = data.split('and');
        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') })
        })
      })
      if (val.length > 0) {
        filterNotBetweenArray.push({ column: item.column, filter: val })
      }
    })


    let filtergreaterThanArray = [];
    this.greaterThanArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filtergreaterThanArray.push({ column: item.column, value: val })
      }
    })

    let filterlesserThanArray = [];
    this.lesserThanArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterlesserThanArray.push({ column: item.column, value: val })
      }
    })

    let filterArrayContains = [];
    this.containsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterArrayContains.push({ column: item.column, value: val })
      }
    })


    let filtergreaterThanorEqualsArray = [];
    this.greaterThanOrEqualsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filtergreaterThanorEqualsArray.push({ column: item.column, value: val })
      }
    })

    let filterlessThanorEqualsArray = [];
    this.lessThanOrEqualsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterlessThanorEqualsArray.push({ column: item.column, value: val })
      }
    })

    let filterIsEmptyArray = [];
    this.isEmptyArray.map(item => {
      filterIsEmptyArray.push({ column: item.column })
    })

     let filterIsNotEmptyArray = [];
    this.isNotEmptyArray.map(item => {
      filterIsNotEmptyArray.push({ column: item.column })
    })

    let conditionArray = [];
    if (filterArrayNonString.length > 0) {
      this.userData['between'] = filterArrayNonString;
      conditionArray.push('between');
    } else {
      delete this.userData['between'];
    }

    if (filterArray.length > 0) {
      this.userData['equals'] = filterArray;
      conditionArray.push('equals');
    } else {
      delete this.userData['equals'];
    }

    if (filterArrayContains.length > 0) {
      this.userData['contains'] = filterArrayContains;
      conditionArray.push('contains');
    } else {
      delete this.userData['contains'];
    }

    if (filtergreaterThanArray.length > 0) {
      this.userData['greaterThan'] = filtergreaterThanArray;
      conditionArray.push('greaterThan');
    } else {
      delete this.userData['greaterThan'];
    }

    if (filterlesserThanArray.length > 0) {
      this.userData['lessThan'] = filterlesserThanArray;
      conditionArray.push('lessThan');
    } else {
      delete this.userData['lessThan'];
    }

    if (filtergreaterThanorEqualsArray.length > 0) {
      this.userData['greaterThanOrEquals'] = filtergreaterThanorEqualsArray;
      conditionArray.push('greaterThanOrEquals');
    } else {
      delete this.userData['greaterThanOrEquals'];
    }

    if (filterlessThanorEqualsArray.length > 0) {
      this.userData['lessThanOrEquals'] = filterlessThanorEqualsArray;
      conditionArray.push('lessThanOrEquals');
    } else {
      delete this.userData['lessThanOrEquals'];
    }

    if (filterNotBetweenArray.length > 0) {
      this.userData['notBetween'] = filterNotBetweenArray;
      conditionArray.push('notBetween');
    } else {
      delete this.userData['notBetween'];
    }

    if (filterIsEmptyArray.length > 0) {
      this.userData['isEmpty'] = filterIsEmptyArray;
      conditionArray.push('isEmpty');
    } else {
      delete this.userData['isEmpty'];
    }

    if (filterIsNotEmptyArray.length > 0) {
      this.userData['isNotEmpty'] = filterIsNotEmptyArray;
      conditionArray.push('isNotEmpty');
    } else {
      delete this.userData['isNotEmpty'];
    }

    this.userData['paginationFilter'] = true;
    this.userData['beginPagination'] = 1;
    this.userData['endPagination'] = 100;

    if (conditionArray.length > 1) {
      this.userData['paginationFilters'] = conditionArray;
    } else {
      delete this.userData['paginationFilters'];
    }

    if (filterArray.length <= 0 && filterArrayNonString.length <= 0 && filterArrayContains.length <= 0 && filterNotBetweenArray.length <= 0 &&
      filterlessThanorEqualsArray.length <= 0 && filtergreaterThanorEqualsArray.length <= 0 &&
      filterlesserThanArray.length <= 0 && filtergreaterThanArray.length <= 0 && filterIsEmptyArray.length <= 0 && 
      filterIsNotEmptyArray.length <= 0) {
      this.showFilterError = true;
      setTimeout(() => {
        this.showFilterError = false;
      }, 2000);
    } else {
        this.userData['paginationFilter'] = true;
        this.saveFilter = this.userData;
        console.log("in apply",this.userData);
        this.getUsersAfterFilter(this.initial,this.end);
    }

    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);     
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);

    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;
    dateFilter.style.display = 'none'
    textFilter.style.display = 'none'
    intFilter.style.display = 'none'
    singleIntFilter.style.display = 'none'
    singledateFilter.style.display = 'none'
    singleStringFilter.style.display = 'inline-block'
    this.filterColumnSelected = null;
    this.selectedDataToFilter = [];
    this.tempSelectedDataToFilter = [];
  }


  onColumnFilterSelected(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement

    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === event) {
        return checkColumn = result.DATA_TYPE
      }
    })
    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block'
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
      }
    }else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block'
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    }

    this.selectedDataToFilter = [];
    this.tempFilterColumnSelected = this.filterColumnSelected;
    this.tempFilterConditionOption = this.filterConditionOption;
    let tempDataArray = [];
    this.columnData = [];
    this.rowData.map((item) => {
      if (tempDataArray.indexOf(item[event]) == -1 && item[event] !== '' && item[event] !== null) {
        tempDataArray.push(item[event]);
      }
    })
    tempDataArray.map((item, i) => {
      this.columnData.push({ itemName: item, id: i });
    })

    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);     
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);
  }

  setAdvFilter() {
    let filters = [];
    let a = [];
    let data = [];
    let value;

    if (this.tempFilterConditionOption == 'Between') {
      if (this.startingDate !== null && this.startingDate !== undefined && this.endingDate !== null && this.endingDate !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")");
        }
        let filter = [];
        filter.push("'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.originalArrayNonString.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.originalArrayNonString.splice(i, 1);
              this.displayFilter2NonString.splice(i, 1);
            }
          })
          this.originalArrayNonString.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.startingDate = null;
        this.endingDate = null;
      } else if (this.startNumber !== null && this.startNumber !== undefined && this.endNumber !== null && this.endNumber !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")");
        }
        let filter = [];
        filter.push("'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.originalArrayNonString.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.originalArrayNonString.splice(i, 1);
              this.displayFilter2NonString.splice(i, 1);
            }
          })
          this.originalArrayNonString.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.endNumber = null;
        this.startNumber = null;
      } else {
        this.fillBothFields = true;
        setTimeout(() => { this.fillBothFields = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'notBetween') {
      if (this.startingDate !== null && this.startingDate !== undefined && this.endingDate !== null && this.endingDate !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")");
        }
        let filter = [];
        filter.push("'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.notBetweenArray.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.notBetweenArray.splice(i, 1);
              this.displayNotBetweenArray.splice(i, 1);
            }
          })
          this.notBetweenArray.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.startingDate = null;
        this.endingDate = null;
      } else if (this.startNumber !== null && this.startNumber !== undefined && this.endNumber !== null && this.endNumber !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")");
        }
        let filter = [];
        filter.push("'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.notBetweenArray.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.notBetweenArray.splice(i, 1);
              this.displayNotBetweenArray.splice(i, 1);
            }
          })
          this.notBetweenArray.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.endNumber = null;
        this.startNumber = null;
      }
      else {
        this.fillBothFields = true;
        setTimeout(() => { this.fillBothFields = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Equals') {
      if (this.StringToFilter !== null && this.StringToFilter !== undefined) {
        if (this.tempSelectedDataToFilter.indexOf(JSON.stringify(this.StringToFilter)) == -1) {
          this.tempSelectedDataToFilter.push(JSON.stringify(this.StringToFilter));
          a.push("'" + this.StringToFilter + "'");
        }
        filters.push(this.StringToFilter);
        this.StringToFilter = null;
        if (filters.length > 0) {
          if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters }))) {
            this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters }));
            if (this.originalArray.length > 0) {
              this.originalArray.map((item) => {
                data.push(item.column)
              })
              value = data.includes(this.tempFilterColumnSelected)
              if (value) {
                this.originalArray.map((item, i) => {
                  if (item.column == this.tempFilterColumnSelected) {
                    this.originalArray[i].filter.push(filters[0]);
                  }
                })
              }
              if (!value) {
                if (this.originalArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters })) == -1) {
                  this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filters });
                }
              }
            } else {
              this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filters });
            }
          }
        }
      }
      else if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(this.NumberToFilter);
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.originalArray.length > 0) {
            this.originalArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.originalArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.originalArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.originalArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push(new Date(this.DateToFilter).toLocaleDateString());
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.originalArray.length > 0) {
            this.originalArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.originalArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.originalArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.originalArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Contains') {
      if (this.StringToFilter !== null && this.StringToFilter !== undefined) {
        let filter = [];
        filter.push(this.StringToFilter);
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.containsArray.length > 0) {
            this.containsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.containsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.containsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.containsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.StringToFilter = null;
      }
      else if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.containsArray.length > 0) {
            this.containsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.containsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.containsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.containsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push(this.DateToFilter);
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.containsArray.length > 0) {
            this.containsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.containsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.containsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.containsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'isEmpty') {
      if (this.tempFilterColumnSelected !== '' && this.tempFilterColumnSelected !== undefined) {
        if (this.tempConditionArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected })) == -1) {
          this.tempConditionArray.push(JSON.stringify({ column: this.tempFilterColumnSelected }));
          this.isEmptyArray.push({ column: this.tempFilterColumnSelected });
        }
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'isNotEmpty') {
      if (this.tempFilterColumnSelected !== '' && this.tempFilterColumnSelected !== undefined) {
        if (this.tempConditionArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected })) == -1) {
          this.tempConditionArray.push(JSON.stringify({ column: this.tempFilterColumnSelected }));
          this.isNotEmptyArray.push({ column: this.tempFilterColumnSelected });
        }
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Greater than') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanArray.length > 0) {
            this.greaterThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanArray.length > 0) {
            this.greaterThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Greater than or Equals') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanOrEqualsArray.length > 0) {
            this.greaterThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanOrEqualsArray.length > 0) {
            this.greaterThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }


    if (this.tempFilterConditionOption == 'Lesser than') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lesserThanArray.length > 0) {
            this.lesserThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lesserThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lesserThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lesserThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lesserThanArray.length > 0) {
            this.lesserThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lesserThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lesserThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lesserThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Less than or Equals') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lessThanOrEqualsArray.length > 0) {
            this.lessThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lessThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lessThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lessThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lessThanOrEqualsArray.length > 0) {
            this.lessThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lessThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lessThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lessThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);     
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);
  }



}