import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { ExportService } from '../../../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ReferralViewService } from '../../../referral-view/referral-view.service';
import { PagesizeService } from '../../../pagesize/pagesize.service';
  
  @Component({
    selector: 'app-community-member',
    templateUrl: './community-member.component.html',
    styleUrls: ['./community-member.component.scss']
  })
  export class CommunityMemberComponent implements OnInit {

    personName = 'Community Member';
    customizedArray= 'customReport' ;
    columnToSorted= 'communityMemberID';
    filter= 'CommunityMember';
    tableArray='CommunityMember';
    addLink = "/reports/communityMember/new";
    navigateTo = '/reports/communityMember/details';
    isSearchAny = true;
    breadcrumbs = [
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Community Member', href: "", active: 'active' },
    ];
  
//     columnDefs = [];
//     rowData = [];
//     defaultColDef;
//     initial = 1;
//     end = 100;
  
//     @ViewChild('agGrid') agGrid: AgGridNg2;
  
//     @Input()
//     Sidenav: boolean;
//     orgForm: FormGroup;
//     reportsViewList;
//     Data;
//     settings = {
//       actions: false,
//       // pager: {},
//       selectMode: '',
//       custom: [],
//       columns: [],
//       button: {},
  
//     };
//     button: {};
//     showForm: boolean = false;
//     groupByKeys = [];
//     tableArray = [];
//     showGroupByTable: boolean = false;
//     filterSelected;
//     groupedData = {};
//     hideLoader: boolean = true;
//     headers = [];
//     rawdata = [];
//     totalCount: any;
//     beginPagination: any = 1;
//     endPagination: any = 100;
//     loaderController: boolean = false;
//     personData: any
//     updateUser: boolean = false;
//     clientId: null;
//     insuranceType = [];
//     raceData = [];
//     ethnicity = [];
//     tribe = [];
//     zipcodeData = [];
//     stateData = [];
//     cityData = [];
//     countyData = [];
//     Race = [];
//     Ethnicity = [];
//     Tribe = [];
//     State = [];
//     CountyName = [];
//     City = [];
//     InsuranceType = [];
//     Zipcode = [];
//     Gender = [];
//     dhsStaffData = [];
//     viewOnly: boolean;
//     addOption = null;
//     genderData = [
//       { id: 0, itemName: 'Male' },
//       { id: 1, itemName: 'Female' }
//     ]
  
//     mock = [{
//       "OfficeName": "test"
//     }, {
//       "OfficeName": "test2"
//     }
//     ]
//     userDetails;
  
  
  
  
//     ReportSettings = {
//       singleSelection: true,
//       text: "Select",
//       selectAllText: 'Select All ',
//       unSelectAllText: 'UnSelect All',
//       enableSearchFilter: true,
//       classes: "myclass custom-class",
//       badgeShowLimit: 1,
//     };
  
//     constructor(public formBuilder: FormBuilder,
//       public clildFormService: ClildFormService,
//       public _pageSize: PagesizeService,
//       public _team: TeamFormService,
//       public router: Router,
//       public exportService: ExportService) {
//       this.defaultColDef = {
//         headerCheckboxSelection: this.isFirstColumn,
//         checkboxSelection: this.isFirstColumn
//       }
//     }
  
//     addItems = [
//       { itemName: 'Client' },
//       { itemName: 'Staff' },
//       { itemName: 'DHHS Staff' },
//       { itemName: 'DHS Staff' },
//       { itemName: 'CSO Staff' },
//       { itemName: 'CASA Officer' },
//       { itemName: 'Judge'},
//       { itemName: 'Provider Member' },
//       { itemName: 'Community Member'},
//       { itemName: 'Other Agency Staff'},
//       { itemName: 'CRB Officer'},
//       { itemName: 'Family Member'}
//     ]
  
//     ngOnInit() {
//       // this.getUserById();
//       // this.getGroupFilters();
//       this.getPerson(this.beginPagination, this.endPagination);
//       this.getRace();
//       this.getCity();
//       this.getState();
//       this.getCounty();
//       this.getZipcode();
//       if (localStorage.getItem('ProviderMember') == 'true') {
//         this.add();
//         this.addOption = 'Provider Memberr';
//         localStorage.removeItem('ProviderMember');
//       }
//     }

//     groupChanged(event,field){
//       let array = [];
//       console.log("ebent",event,field);
//       switch (field){
//           case 'Race':
//               array.push(event.value);
//               this.Race = array;
//               break;
//           case 'County':
//               array.push(event.value);
//               this.CountyName = array;
//               break;
//           case 'Insurance':
//               array.push(event.value);
//               this.InsuranceType = array;
//               break;
//           case 'Gender':
//               array.push(event.value);
//               this.Gender = array;
//               break;
//           case 'Tribe':
//               array.push(event.value);
//               this.Tribe = array;
//               break;
//           case 'Ethnicity':
//               array.push(event.value);
//               this.Ethnicity = array;
//               break;
//           case 'State':
//               array.push(event.value);
//               this.State = array;
//               break;
//           case 'City':
//               array.push(event.value);
//               this.City = array;
//               break;
//           case 'Zipcode':
//               array.push(event.value);
//               this.Zipcode = array;
//               break;
//       }      
//   }
  
//     loadDefaultForm() {
//       this.raceData.map(item => {
//         console.log('it', item);
//         if (item.itemName == this.Data.race) {
//           this.Race.push(item)
//           console.log('race', this.Race)
//         }
//       })
//       this.genderData.map(item => {
//         console.log("ghg",item.itemName == this.Data.gender)
//         if (item.itemName == this.Data.gender) {
//           this.Gender.push(item)
//         }
//       })


//       this.cityData.map(item => {
//         console.log('it', item);
//         if (item.itemName == this.Data.city) {
//           this.City.push(item)
//           console.log('race', this.Race)
//         }
//       })
//       this.stateData.map(item => {
//         console.log("ghg",item.itemName == this.Data.state)
//         if (item.itemName == this.Data.state) {
//           this.State.push(item)
//         }
//       })
//       this.zipcodeData.map(item => {
//         console.log('it', item);
//         if (item.itemName == this.Data.zipcode) {
//           this.Zipcode.push(item)
//           console.log('race', this.Race)
//         }
//       })
//       this.countyData.map(item => {
//         console.log("ghg",item.itemName == this.Data.countyName)
//         if (item.itemName == this.Data.countyName) {
//           this.CountyName.push(item)
//         }
//       })

//       this.orgForm = this.formBuilder.group({
//         "cellPh": [this.Data.CellPh],
//         "changedBy": [this.Data.changedBy],
//         "changedDate": [this.Data.changedDate],
//         "email": [this.Data.email],
//         "enteredBy": [this.Data.enteredBy],
//         "enteredDate": [this.Data.enteredDate],
//         "firstName": [this.Data.firstName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         "gender": [this.Gender[0]],
//         "homePh": [this.Data.homePh],
//         "lastName": [this.Data.lastName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         "mi": [this.Data.mi, Validators.compose([Validators.minLength(1), Validators.maxLength(2), Validators.pattern('^[a-zA-Z ]*$')])],
//         "notes": [this.Data.notes, Validators.compose([Validators.minLength(3), Validators.maxLength(25)])],
//         "race": [this.Race[0]],
//         "separationDate": [this.Data.separationDate],
//         // "CsoOffice": [this.Data.CsoOffice, Validators.compose([])],
//         "fax": [this.Data.fax],
//         // "legacy_CommunityMemberID": [this.Data.legacy_CommunityMemberID, Validators.compose([, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         // "legacy_TFI_CommunityMemberID": [this.Data.legacy_TFI_CommunityMemberID, Validators.compose([, Validators.minLength(3), Validators.maxLength(25),Validators.pattern('^[0-9-+]+$')])],
//         // "legacy_UMY_CommunityMemberID": [this.Data.legacy_UMY_CommunityMemberID, Validators.compose([, Validators.minLength(3), Validators.maxLength(25),Validators.pattern('^[0-9-+]+$')])],
//         "pager": [this.Data.pager],
//         "ssn": [this.Data.ssn],
//         "state": [this.State[0]],         //drop down
//         // "suffix": [this.Data.suffix, Validators.compose([, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         "workPh": [this.Data.workPh],
//         "zipcode": [this.Zipcode[0]],
//         "city": [this.City[0]],        //drop down
//         "countyName": [this.CountyName[0]],
//         "address":[this.Data.address,Validators.compose([Validators.minLength(3), Validators.maxLength(225)])],
//         "dob":[this.Data.dob],
//         "ext":[this.Data.ext,Validators.compose([Validators.minLength(1), Validators.maxLength(5)])],
//         "suffix":[this.Data.suffix,Validators.compose([Validators.minLength(1), Validators.maxLength(3), Validators.pattern('^[a-zA-Z ]*$')])],

//       })
//     }
  
//     loadDefaultFormInitial() {
//       this.Race = [];
//       this.Gender = [];
//       this.orgForm = this.formBuilder.group({
//         "cellPh": [null],
//         "changedBy": [null],
//         "changedDate": [null],
//         "email": [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
//         "enteredBy": [null],
//         "enteredDate": [null],
//         "firstName": [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         "gender": [null],
//         "homePh": [null],
//         "lastName": [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         "mi": [null, Validators.compose([Validators.minLength(1), Validators.maxLength(2), Validators.pattern('^[a-zA-Z ]*$')])],
//         "notes": [null, Validators.compose([Validators.minLength(3), Validators.maxLength(25)])],
//         "race": [null],
//         "separationDate": [null],
//         // "CsoOffice": [null, Validators.compose([])],
//         "fax": [null],
//         // "legacy_CommunityMemberID": [null, Validators.compose([, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z ]*$')])],
//         // "legacy_TFI_CommunityMemberID": [null, Validators.compose([, Validators.minLength(3), Validators.maxLength(25),  Validators.pattern('^[0-9-+]+$')])],
//         // "legacy_UMY_CommunityMemberID": [null, Validators.compose([, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[0-9-+]+$')])],
//         "pager": [null],
//         "ssn": [null],
//         "state": [null],         //drop down
//         "suffix": [null, Validators.compose([Validators.minLength(1), Validators.maxLength(3), Validators.pattern('^[a-zA-Z ]*$')])],
//         "workPh": [null],
//         "zipcode": [null],
//         "city": [null],        //drop down
//         "countyName": [null],
//         "address":[null,Validators.compose([Validators.minLength(3), Validators.maxLength(225)])],
//         "dob":[null],
//         "ext":[null,Validators.compose([Validators.minLength(1), Validators.maxLength(5)])],

//       })
//     }
  
//     edit() {
//       this.viewOnly = false;
//       if (this.viewOnly) {
//         this.orgForm.disable();
//       } else {
//         this.orgForm.enable();
//       }
//     }
  
//     isFirstColumn(params) {
//       var displayedColumns = params.columnApi.getAllDisplayedColumns();
//       var thisIsFirstColumn = displayedColumns[0] === params.column;
//       return thisIsFirstColumn;
//     }
  
//     addPost(post) {
//       this.addOption = null;
//       console.log(post, typeof (post.Race), post.Race);
//       let Race = this.Race;
//       post.race =(Race !== undefined && Race !== null &&  Race.length > 0) ? Race[0].itemName : null;
//       let Zipcode = this.Zipcode;
//       post.zipcode =  (Zipcode !== undefined && Zipcode !== null &&   Zipcode.length > 0) ? Zipcode[0].itemName : null;
//       let Gender = this.Gender;
//       post.gender = (Gender !== undefined && Gender !== null && Gender.length > 0)? Gender[0].itemName : null;
//       let City = this.City;
//       post.city = (City !== undefined && City !== null &&  City.length > 0) ? City[0].itemName : null;
//       let State = this.State;
//       post.state =(State !== undefined && State !== null &&  State.length > 0) ? State[0].itemName : null;
//       let CountyName = this.CountyName;
//       post.countyName = (CountyName !== undefined && CountyName !== null &&  CountyName.length > 0) ? CountyName[0].itemName : null;
//       post.entity = 'communityMember';
//       post.changedBy = 'Bryan';
//       post.changedDate = 1528914600000;
//       post.enteredBy = 'Bryan';
//       post.enteredDate = 1528914600000;
//       if (post.separationDate !== '' && post.separationDate !== null && JSON.stringify(post.separationDate).includes('-')) {
//         let myDate2 = post.separationDate.split("-");
//         var newDate = myDate2[0] + "/" + myDate2[1] + "/" + myDate2[2];
//         post.separationDate = new Date(newDate).getTime();
//     }
//       // post.separationDate = 1528914600000;
//       console.log("post", post)
//       this.showForm = false;
//       if (this.updateUser) {
//         this.updateClient(post);
//       } else {
//         this.saveClient(post);
//       }
//     }

//     getUserById(){
//       //  let userId = '7';
//       let userId = localStorage.getItem('UserId');
//       this._team.getUserById({staffID : parseInt(userId)}).then(data=>{
//         console.log("getUserById",data);
//         this.userDetails = data.users;
//       })
//       }

//     // getUserById(){
//     //   this.userDetails=this.clildFormService.getUserById();
//     //   console.log("this.userDetails",this.userDetails);
//     //   }
    
  
//     goBack() {
//       this.showForm = false;
//       this.addOption = null;
//     }

    
  
//     getState() {
//       this.clildFormService.getState().then(data => {
//         console.log("data1", data);
//         let array1 = data.dropDown
//         array1.map((item, i) => {
//           this.stateData.push({ id: i, itemName: item.state });
//         })
//         console.log("this.raceData", this.raceData);
//       })
//     }
  
//     getZipcode() {
//       this.clildFormService.getZipcode().then(data => {
//         console.log("data1", data);
//         let array1 = data.dropDown
//         array1.map((item, i) => {
//           this.zipcodeData.push({ id: i, itemName: item.zipcode });
//         })
//         console.log("this.raceData", this.raceData);
//       })
//     }
  
//     getCounty() {
//       this.clildFormService.getCounty().then(data => {
//         console.log("data1", data);
//         let array1 = data.dropDown
//         array1.map((item, i) => {
//           this.countyData.push({ id: i, itemName: item.CountyName });
//         })
//         console.log("this.raceData", this.raceData);
//       })
//     }
  
//     getCity() {
//       this.clildFormService.getCity().then(data => {
//         console.log("data1", data);
//         let array1 = data.dropDown
//         array1.map((item, i) => {
//           this.cityData.push({ id: i, itemName: item.city });
//         })
//         console.log("this.raceData", this.raceData);
//       })
//     }
  
  
  
//     getRace() {
//       this.clildFormService.getRace().then(data => {
//         console.log("data1", data);
//         let array1 = data.dropDown
//         array1.map((item, i) => {
//           this.raceData.push({ id: i, itemName: item.Race });
//         })
//         console.log("this.raceData", this.raceData);
//       })
//     }
  
  
//     getDhsStaff() {
//       this.clildFormService.getDhsStaff().then(data => {
//         console.log("data1", data);
//         let array1 = data.dropDown;
//         array1.map((item, i) => {
//           this.dhsStaffData.push({ id: i, itemName: item.OfficeName });
//         })
//         console.log("this.raceData", this.raceData);
//       })
//     }
//     getTodayDate() {
//       let todayDate;
//       let today = new Date();
//       let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//       console.log("date", today, date);
//       if (date !== '' && date !== null && JSON.stringify(date).includes('-')) {
//         let myDate2 = date.split("-");
//         var newDate = myDate2[0] + "/" + myDate2[1] + "/" + myDate2[2];
//         todayDate = new Date(newDate).getTime();
//       }
//       console.log("g", todayDate);
//       return todayDate;
//     }
  
//     saveClient(post) {
//       post.enteredBy = this.userDetails.firstName;
//       post.enteredDate = this.getTodayDate();
//       this.clildFormService.saveClient(post).then(data => {
//         console.log("data", data);
//         if (data.responseStatus) {
//           swal('Success', 'Community member saved successfully', 'success')
//           this.getPerson(this.beginPagination, this.endPagination);
//         } else {
//           swal('Oops!', 'Community member not saved', 'warning')
//         }
//       })
//     }
  
//     updateClient(post) {  
//       post.changedBy = this.userDetails.firstName;
//       post.changedDate = this.getTodayDate();
//       post.communityMemberID = this.clientId;
//       console.log("post", post);
//       this.clildFormService.updateClient(post).then(data => {
//         console.log("data", data);
//         if (data.responseStatus) {
//           swal('Success', 'Community member saved successfully', 'success')
//           this.getPerson(this.beginPagination, this.endPagination);
//         } else {
//           swal('Oops!', 'Community member not saved', 'warning')
//         }
//       })
//     }
  
//     add() {
//       this.viewOnly = false;
//       this.updateUser = false;
//       this.showForm = true;
//       this.loadDefaultFormInitial();
//     }
  
  
//     onSelectAdd(event) {
//       switch (event) {
//           case 'Client':
//               this.addClient();
//               break;
//           case 'Staff':
//               this.addStaff();
//               break;
//           case 'DHHS Staff':
//               this.addDHHSStaff();
//               break;
//           case 'DHS Staff':
//               this.addDHSStaff();
//               break;
//           case 'CSO Staff':
//               this.addCSOStaff();
//               break;
//           case 'CASA Officer':
//               this.addCASAStaff();
//               break;
//           case 'Judge':
//               this.addJudge();
//               break;
//           case 'Provider Member':
//               this.addProviderMember();
//               break;
//           case 'Community Member':
//               this.addCommunityMember();
//               break;
//           case 'Other Agency Staff':
//               this.addOtherAgencyStaffMember();
//               break;
//           case 'CRB Officer':
//               this.addCRBOfficer();
//               break;
//               case 'Family Member':
//               this.addFamilyMember();
//               break;
//       }
//   }

//   addFamilyMember(){
//     if (this.router.url == '/reports/familyMember') {
//       this.add();
//   } else {
//       localStorage.setItem('CRB Officer', 'true');
//       this.familyMemberRoute();
//   }
//   }

//   addCRBOfficer(){
//       if (this.router.url == '/reports/crbOfficer') {
//           this.add();
//       } else {
//           localStorage.setItem('CRB Officer', 'true');
//           this.crbOfficerRoute();
//       }
//   }

//   addOtherAgencyStaffMember() {
//       if (this.router.url == '/reports/otherAgencyStaff') {
//           this.add();
//       } else {
//           localStorage.setItem('OtherAgencyStaff', 'true');
//           this.otherAgencyStaffRoute();
//       }
//   }
//   addCommunityMember() {
//       if (this.router.url == '/reports/communityMember') {
//           this.add();
//       } else {
//           localStorage.setItem('CommunityMember', 'true');
//           this.communityMemberRoute();
//       }
//   }

//   addProviderMember() {
//       if (this.router.url == '/reports/providerMember') {
//           this.add();
//       } else {
//           localStorage.setItem('ProviderMember', 'true');
//           this.providerMemberRoute();
//       }
//   }

//   addJudge() {
//       if (this.router.url == '/reports/judge') {
//           this.add();
//       } else {
//           localStorage.setItem('Judge', 'true');
//           this.judgeRoute();
//       }
//   }

//   addCASAStaff() {
//       if (this.router.url == '/reports/casaOfficer') {
//           this.add();
//       } else {
//           localStorage.setItem('CASAOfficer', 'true');
//           this.casaOfficerRoute();
//       }
//   }

//   addStaff() {
//       if (this.router.url == '/reports/staff') {
//           this.add();
//       } else {
//           localStorage.setItem('Staff', 'true');
//           this.staffRoute();
//       }
//   }

//   addDHHSStaff() {
//       if (this.router.url == '/reports/dhhsStaff') {
//           this.add();
//       } else {
//           localStorage.setItem('DHHSStaff', 'true');
//           this.dhhsstaffRoute();
//       }
//   }

//   addClient() {
//       if (this.router.url == '/reports/client') {
//           this.add();
//       } else {
//           localStorage.setItem('Client', 'true');
//           this.client();
//       }
//   }

//   addDHSStaff() {
//       if (this.router.url == '/reports/dhsStaff') {
//           this.add();
//       } else {
//           localStorage.setItem('DHSStaff', 'true');
//           this.dchstaffRoute();
//       }
//   }

//   addCSOStaff() {
//       if (this.router.url == '/reports/csoStaff') {
//           this.add();
//       } else {
//           localStorage.setItem('CSOStaff', 'true');
//           this.csostaffRoute();
//       }
//   }

//   goToMenu(){
//     this.router.navigate(['/reports/person/types']);
// }
  
//     getPerson(initial: any, end: any) {
//       let loader = document.getElementById('loading-overlay') as HTMLElement
//       loader.style.display = 'block';
//       this.headers = [];
//       this.rawdata = [];
//       this.hideLoader = false;
//       initial = initial;
//       end = end
//       this.personData = {
//         "filter": "CommunityMember",
//         "group by": "All",
//         "beginPagination": initial,
//         "endPagination": end,
//         "action": "NaN"
//       };
//       this.clildFormService.getPerson(this.personData).then(data => {
//         loader.style.display = 'none';
//         console.log("Person data", data)
//         // if (data.responseStatus == true) {
//         this.hideLoader = true;
//         this.totalCount = data.totalCount
//         this.reportsViewList = data.CommunityMember;
//         this.rowData = data['CommunityMember']
//         this.headers.push(Object.keys(this.rowData[0]))
//         let test = []
//         this.headers[0].forEach(function (result, i) {
//           let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
//           test.push(data)
//         })
//         this.rawdata.push(test)
//         this.columnDefs = this.rawdata[0]
//         // }
//         // else {
//         //   console.log(data.responseStatus);
//         // }
//       })
//     }
//     getTable(record) {
//       this.clildFormService.getPerson(record).then(data => {
//         console.log("Person data", data)
//         if (data.responseStatus == true) {
//           this.hideLoader = true;
//           this.totalCount = data.totalCount
//           this.reportsViewList = data.CommunityMember[0];
//           this.rowData = data['CommunityMember'][0]
//           this.headers.push(Object.keys(this.rowData[0]))
//           let test = []
//           this.headers[0].forEach(function (result, i) {
//             let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
//             test.push(data)
//           })
//           this.rawdata.push(test)
//           this.columnDefs = this.rawdata[0]
//         }
//         else {
//           console.log(data.responseStatus);
//         }
//       })
//     }
  
//     client() {
//       this.router.navigate(['/reports/client'])
//     }
  
//     staffRoute() {
//       this.router.navigate(['/reports/staff'])
//     }
  
//     dchstaffRoute() {
//       this.router.navigate(['/reports/dhsStaff'])
//     }
  
//     dhhsstaffRoute() {
//       this.router.navigate(['/reports/dhhsStaff'])
//     }
  
//     csostaffRoute() {
//       this.router.navigate(['/reports/csoStaff'])
//     }
  
//     casaOfficerRoute() {
//       this.router.navigate(['/reports/casaOfficer'])
//     }
  
//     judgeRoute() {
//       this.router.navigate(['/reports/judge'])
//     }

//     providerMemberRoute(){
//       this.router.navigate(['/reports/providerMember'])
//     }

//     communityMemberRoute(){
//       this.router.navigate(['/reports/communityMember'])
//     }

//     otherAgencyStaffRoute(){
//       this.router.navigate(['/reports/otherAgencyStaff'])
//     }

//     crbOfficerRoute(){
//       this.router.navigate(['/reports/crbOfficer'])
//   }

//   familyMemberRoute(){
//     this.router.navigate(['/reports/familyMember'])
//   }
  
  
//     getPersonById(param) {
//       this.updateUser = true;
//       this.clildFormService.getDetailsById(param).then(data => {
//         // if (data.responseStatus == true) {
//         console.log("data", data);
//         this.clientId = data.person[0].communityMemberID;
//         this.showForm = true;
//         this.Data = data.person[0];
//         this.loadDefaultForm();
//         this.viewOnly = true;
//         this.orgForm.disable();
//         // } else {
//         //   console.log(data.responseStatus);
//         // }
//       })
//     }
  
//     getGroupFilters() {
//       let body =
//       {
//         "reportName": "client",
  
//       };
  
//       this.clildFormService.getGroupFilters(body).then(data => {
//         this.groupByKeys = JSON.parse(data.subFilter).clientGroup;
//       })
//     }
  
//     groupBy(filter1) {
//       this.showGroupByTable = true;
//       this.hideLoader = false;
//       this.filterSelected = filter1;
//       this.tableArray = [];
//       let req = {
//         "filter": "CommunityMember",
//         "group by": filter1,
//         "action": "NaN",
//         "beginPagination": this.beginPagination,
//         "endPagination": this.endPagination
//       };
  
//       this.clildFormService.getPerson(req).then(data => {
  
//         if (data.responseStatus == true) {
//           this.hideLoader = true;
//           this.groupedData = data;
//           let keys = Object.keys(this.groupedData);
//           keys.map((item) => {
//             if (item !== 'responseStatus') {
//               this.tableArray.push({ "table": this.groupedData[item], "group": item });
//             }
//           })
//         }
//         else {
//           console.log(data.responseStatus);
//         }
//       })
//     }
  
//     onRowSelected(event) {
//       console.log("event", event);
//       let param;
//       param = { communityMemberID: event.data.communityMemberID };
//       this.getPersonById(param);
//     }
  
//     exportToExcel() {
//       this.exportService.exportAsExcelFile(this.reportsViewList, 'CommunityMember');
//     }
  
//     exportAsCsv() {
//       this.exportService.exportAsCSVFile(this.reportsViewList, 'CommunityMember', true);
//     }
  
//     exportAll(ex: any) {
//       this.loaderController = true
//       let file;
//       if (ex == 'excel') {
//         file = 'Excel'
//       } else {
//         file = 'Csv'
//       }
//       let data =
//       {
//         "filter": "CommunityMember",
//         "group by": "All",
//         "action": "exportAll",
//         "file": file,
//         "reportName": "client"
//       }
//       this.clildFormService.getPerson(data).then(result => {
//         this.loaderController = false
//         if (result.responseStatus === true) {
//           window.location.href = result.filePath;
//         }
//       })
  
//     }
//     navigation(action: string) {
//       let initial = document.getElementById('initial-count') as HTMLInputElement
//       let end = document.getElementById('des-count') as HTMLInputElement
//       let preIcon = document.getElementById('pre') as HTMLElement
//       let nextIcon = document.getElementById('next') as HTMLElement
//       if (action === 'next') {
//         let next = parseInt(end.innerText) + 100;
//         initial.innerText = (parseInt(end.innerText) + 1).toString()
//         end.innerText = next.toString()
  
//         if (this.totalCount <= (parseInt(end.innerText))) {
//           nextIcon.style.display = 'none'
//         }
//         if (parseInt(initial.innerText) >= 1) {
//           preIcon.style.display = 'inline-block'
//         }
//         this.personData.beginPagination = initial.innerText
//         this.personData.endPagination = end.innerText
//         this.getTable(this.personData)
//       }
  
//       if (action === 'pre') {
//         let previous = parseInt(initial.innerText) - 100;
//         end.innerText = (parseInt(initial.innerText) - 1).toString()
//         initial.innerText = previous.toString()
//         if (parseInt(initial.innerText) <= 1) {
//           preIcon.style.display = 'none'
//         }
//         this.personData.beginPagination = initial.innerText
//         this.personData.endPagination = end.innerText
//         this.getTable(this.personData)
//       }
//       if (action === 'first') {
//         end.innerText = '100'
//         initial.innerText = '1'
//         if (parseInt(initial.innerText) <= 1) {
//           preIcon.style.display = 'none'
//         }
//         this.personData.beginPagination = initial.innerText
//         this.personData.endPagination = end.innerText
//         this.getTable(this.personData)
//       }
//       if (action === 'last') {
//         end.innerText = this.totalCount.toString()
//         initial.innerText = (this.totalCount - 100).toString()
//         this.personData.beginPagination = initial.innerText
//         this.personData.endPagination = end.innerText
//         this.getTable(this.personData)
//       }
//     }
  
//     onFilterChanged(event: any) {
//       let initial = document.getElementById('initial-count') as HTMLInputElement
//       let end = document.getElementById('des-count') as HTMLInputElement
//       let filterType: any
//       let source = event.srcElement.parentElement.parentElement.__agComponent, value: any, column: any, query: any;
//       if (event.target.id === 'filterType') {
//         filterType = event.target.value
//         console.log("filter begin", source.filterText, typeof source.filterText)
//         if (source.filterText !== undefined) {
//           switch (filterType) {
//             case 'contains':
//               value = source.filterText
//               column = source.filterParams.column.colId
//               query = 'where ' + column + ' like\'' + '%' + value + '%' + '\''
//               //console.log("Enter in the contains",value,column,query)
//               this.personData['paginationFilter'] = query
//               //console.log("contains data",this.data,JSON.stringify(this.data))
//               this.getTable(this.personData)
  
//               break;
//             case 'equals':
//               value = source.filterText
//               column = source.filterParams.column.colId
//               query = 'where ' + column + '=\'' + value + '\''
//               //console.log("Enter in the contains",value,column,query)
//               this.personData['paginationFilter'] = query
//               //console.log("contains data",this.data,JSON.stringify(this.data))
//               this.getTable(this.personData)
//               break;
//             case 'notEqual':
//               value = source.filterText
//               column = source.filterParams.column.colId
//               query = 'where ' + column + '!=\'' + value + '\''
//               //console.log("Enter in the contains",value,column,query)
//               this.personData['paginationFilter'] = query
//               //console.log("contains data",this.data,JSON.stringify(this.data))
//               this.getTable(this.personData)
//               break;
//             case 'startsWith':
//               value = source.filterText
//               column = source.filterParams.column.colId
//               query = 'where ' + column + ' like\'' + value + '%' + '\''
//               //console.log("Enter in the contains",value,column,query)
//               this.personData['paginationFilter'] = query
//               //console.log("contains data",this.data,JSON.stringify(this.data))
//               this.getTable(this.personData)
//               break;
//             case 'endsWith':
//               value = source.filterText
//               column = source.filterParams.column.colId
//               query = 'where ' + column + ' like\'' + '%' + value + '\''
//               //console.log("Enter in the contains",value,column,query)
//               this.personData['paginationFilter'] = query
//               //console.log("contains data",this.data,JSON.stringify(this.data))
//               this.getTable(this.personData)
//               break;
//             case 'notContains':
//               value = source.filterText
//               column = source.filterParams.column.colId
//               query = 'where ' + column + ' not like\'' + '%' + value + '%' + '\''
//               //console.log("Enter in the contains",value,column,query)
//               this.personData['paginationFilter'] = query
//               //console.log("contains data",this.data,JSON.stringify(this.data))
//               this.getTable(this.personData)
//               break;
//           }
//         } else {
//           swal('Oops!', 'Give fill the filter first', 'warning')
//         }
//       }
//     }

//          /***
//      * Jumb to page, Enter the page value and navigate to the particular page
//      * @returns get list of person masters
//      * @event keyboard event
//      */
//     pagesizeNav(event) {
//       let begin, end;
//       if (event.keyCode == 13) {
//           begin = this._pageSize.getPagesizeValues()[0];
//           end = this._pageSize.getPagesizeValues()[1];
//           this.initial = begin;
//           this.end = end;
//           return this.getPerson(this.initial, this.end);
//       }
//   }

//   /**
//    * Navigation button actions
//    * @param event mouseclick event
//    * @returns respective page as per the naigation button actions
//    */
//   pagesize(event) {
//       if (event.target.localName == 'img') {
//           let begin, end;
//           begin = this._pageSize.getPagesizeValues()[0];
//           end = this._pageSize.getPagesizeValues()[1];
//           this.initial = begin;
//           this.end = end;
//           return this.getPerson(this.initial, this.end);
          
//       }
//   }
//   }
  
  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;
  fillField;
  columnDropdownList = [];
  sortcolumnDropdownList = [];

  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  @Input()
  Sidenav: boolean;
  reportsViewList;
  button: {};
  showForm: boolean = false;
  hideLoader: boolean = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  beginPagination: any = 1;
  endPagination: any = 100;
  loaderController: boolean = false;
  personData = {};
  sortcolumnDropdownL = [];
  numericColumns = [];
  numericHeaders = [];
  sortColumn;
  sortOrder;
  sortList = [
    { name: 'asc' },
    { name: 'desc' },
    { name: 'no sort' }
  ];

  constructor(public clildFormService: ClildFormService,
    public router: Router,
    public exportService: ExportService,
    public _referralView: ReferralViewService,
    public _pageSize: PagesizeService) {
  }

  ngOnInit() {
    this.getPerson(this.initial, this.end);
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  add() {
    this.router.navigate(['/reports/communityMember/new']);
  }

  goToMenu() {
    this.router.navigate(['/reports/person/types']);
  }

  getPerson(initial: any, end: any) {
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let rowData = []
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    this.personData['filter'] = 'CommunityMember';
    this.personData['group by'] = 'All';
    this.personData['beginPagination'] = initial;
    this.personData['endPagination'] = end;
    this.personData['sort']?this.personData['sort']:this.personData['sort'] = {
      "column": "communityMemberID",
      "mode": "desc"
    }
    this.clildFormService.getPerson(this.personData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount
      this.reportsViewList = data.CasaOfficer;
      this.numericColumns = data.dataTypes;
      this.rowData = data['CommunityMember']?data['CommunityMember']:data['customReport'];
      this.rowData.map(data => {
        data.changedDate = data.changedDate !== null ? new Date(data.changedDate).toLocaleDateString() : '';
        data.enteredDate = data.enteredDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';
        data.dob = data.dob !== null ? new Date(data.dob).toLocaleDateString() : '';
        rowData.push(data);
      });
      this.headers.push(Object.keys(this.rowData[0]))
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }) 
  }

  SortChanged() {
    if (this.sortColumn !== null && this.sortColumn !== undefined) {
      if (this.sortOrder.name !== 'no sort') {
        this.personData['sort'] = {
          "column": this.sortColumn,
          "mode": this.sortOrder.name
        }
        this.getPerson(this.initial, this.end);

      } else if (this.sortOrder.name == 'no sort') {
        delete this.personData['sort'];
        this.getPerson(this.initial, this.end);
      }
    }
  }

  applyFilter(event){
    this.personData = event;
    this.getPerson(1,100);
  }

  reset(event){
    this.personData = event;
    this.getPerson(1,100);
  }

  onRowSelected(event) {
    this._referralView.getClientReferralRelatedDetails(event.data.communityMemberID, event.data.FirstName + ' ' + event.data.LastName)
    this.clildFormService.storeId(event.data.communityMemberID);
    this.router.navigate(['/reports/communityMember/view']);
  }

  exportToExcel() {
    this.exportService.exportAsExcelFile(this.reportsViewList, 'Community Member');
  }

  exportAsCsv() {
    this.exportService.exportAsCSVFile(this.reportsViewList, 'Community Member', true);
  }

  exportAll(ex: any) {
    this.loaderController = true
    let file;
    if (ex == 'excel') {
      file = 'Excel'
    } else {
      file = 'Csv'
    }
    let data =
    {
      "filter": "CommunityMember",
      "group by": "All",
      "action": "exportAll",
      "file": file,
      "reportName": "client"
    }
    this.clildFormService.getPerson(data).then(result => {
      this.loaderController = false
      if (result.responseStatus === true) {
        window.location.href = result.filePath;
      }
    })

  }
  /***
   * Jumb to page, Enter the page value and navigate to the particular page
   * @returns get list of person masters
   * @event keyboard event
   */
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);
    }
  }

  /**
   * Navigation button actions
   * @param event mouseclick event
   * @returns respective page as per the naigation button actions
   */
  pagesize(event) {
    if (event.target.localName == 'img') {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);
    }
  }

}
