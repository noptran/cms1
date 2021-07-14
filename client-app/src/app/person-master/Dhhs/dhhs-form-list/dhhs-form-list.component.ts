  import { Component, OnInit, Input, ViewChild } from '@angular/core';
  import { FormGroup, FormBuilder } from '@angular/forms';
  import { ClildFormService } from '../../../child-forms/child-forms.service';
  import { ExportService } from '../../../prioritized-reports/export-service.service';
  import { AgGridNg2 } from 'ag-grid-angular';
  import { Router } from '@angular/router';
  import { TeamFormService } from '../../../team-form/team-form.service';
  import { ReferralViewService } from '../../../referral-view/referral-view.service';
  import { ReferralsService } from '../../../referrals/referrals.service';
  import { CaseTeamService } from './../../../case-team/case-team.service';
  import { PagesizeService } from '../../../pagesize/pagesize.service';
  
  @Component({
    selector: 'app-dhhs-form-list',
    templateUrl: './dhhs-form-list.component.html',
    styleUrls: ['./dhhs-form-list.component.scss']
  })
  export class DhhsFormListComponent implements OnInit {

    personName = 'DHHS Staff';
    customizedArray= 'customReport' ;
    columnToSorted= 'dhhsstaffID';
    filter= 'dHHSStaff';
    tableArray='dHHSStaff';
    addLink = "/reports/dhhsStaff/new";
    navigateTo = '/reports/dhhsStaff/details';
    isSearchAny = true;
    breadcrumbs = [
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'Client', href: "", active: 'active' },
      ];
      columnDefs = [];
      rowData = [];
      defaultColDef;
      initial = 1;
      end = 100;
      
      @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;
  
      @Input()
      Sidenav: boolean;
      orgForm: FormGroup;
      reportsViewList;
      Data;
      button: {};
      showForm: boolean = false;
      groupByKeys = [];
    //   tableArray = [];
      showGroupByTable: boolean = false;
      filterSelected;
      groupedData = {};
      hideLoader: boolean = true;
      headers = [];
      rawdata = [];
      totalCount: any;
      beginPagination: any = 1;
      endPagination: any = 100;
      loaderController: boolean = false;
      personData: any
      updateUser: boolean = false;
      clientId: null;
      clientName: any;
      insuranceType = [];
      raceData = [];
      ethnicity = [];
      tribe = [];
      zipcodeData = [];
      stateData = [];
      cityData = [];
      countyData = [];
      selectedReferral: any;
      userDetails;
      viewOnly: boolean;
      addOption = null;
      genderData = [
          { id: 0, itemName: 'Male' },
          { id: 1, itemName: 'Female' }
      ]
  
  
      ReportSettings = {
          singleSelection: true,
          text: "Select",
          selectAllText: 'Select All ',
          unSelectAllText: 'UnSelect All',
          enableSearchFilter: true,
          classes: "myclass custom-class",
          badgeShowLimit: 1,
      };
      listOfReferral = []
      openCards = []
      menuItems = []
      results;
      showCity = true;
      stateID;
      title = "DHHS Staff"
      status = 'draft';
      isEditForm;
      mainTabs = [];
  
      constructor(public clildFormService: ClildFormService,
          public router: Router,
          public exportService: ExportService,
          public _pageSize: PagesizeService) {
          this.defaultColDef = {
              headerCheckboxSelection: this.isFirstColumn,
              checkboxSelection: this.isFirstColumn
          }
      }
  
      ngOnInit() {
          this.getPerson(1, 100);
      }
  
      isFirstColumn(params) {
          var displayedColumns = params.columnApi.getAllDisplayedColumns();
          var thisIsFirstColumn = displayedColumns[0] === params.column;
          return thisIsFirstColumn;
      }
  
      add() {
          this.router.navigate(['/reports/dhhsStaff/new']);
      }

      goToMenu(){
        this.router.navigate(['/reports/person/types']);
    }
  
      getPerson(initial: any, end: any) {
          let loader = document.getElementById('loading-overlay') as HTMLElement
          loader.style.display = 'block';
          let rowData = []
          this.headers = [];
          this.rawdata = [];
          this.hideLoader = false;
          this.personData = {
              "filter": "dHHSStaff",    
              "group by": "All",
              "beginPagination": initial,
              "endPagination": end,
              "action": "NaN",
              "sort":{"column":"DHHSStaffID","mode":"desc"}    
          };
  
          this.clildFormService.getPerson(this.personData).then(data => {
              loader.style.display = 'none';
              this.hideLoader = true;
              this.totalCount = data.totalCount;
              if(this.totalCount < 100 ){
                  this.end = this.totalCount;
              }
              this.reportsViewList = data.dHHSStaff;
              this.rowData = data['dHHSStaff'];
              this.rowData.map(data => {
                data.changedDate = data.changedDate !== null ? new Date(data.changedDate).toLocaleDateString() : '';
                data.enteredDate = data.enteredDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';
                data.beginDate = data.beginDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';  
                rowData.push(data);
              });
            //   this.rowData.map(data => {
            //       data.DOB = new Date(data.DOB).toLocaleDateString();
            //       rowData.push(data);
            //   });
              this.headers.push(Object.keys(this.rowData[0]))
              let test = []
              this.headers[0].forEach(function (result) {
                  let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
                  test.push(data)
              })
              this.rawdata.push(test)
              this.columnDefs = this.rawdata[0]
          })
      }
  
      onRowSelected(event) {
          console.log("Row select",event)
          this.clildFormService.storeId(event.data.DHHSStaffID);
          this.router.navigate(['/reports/dhhsStaff/details']);
   
      }

      onFilterChanged(event){
        console.log("Row change",event)

      }
  
      exportToExcel() {
          this.exportService.exportAsExcelFile(this.reportsViewList, 'DHSStaff');
      }
  
      exportAsCsv() {
          this.exportService.exportAsCSVFile(this.reportsViewList, 'DHSStaff', true);
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
              "filter": "client",
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
  
  
  
      getTable(record) {
          this.clildFormService.getPerson(record).then(data => {
              if (data.responseStatus == true) {
                  this.hideLoader = true;
                  this.totalCount = data.totalCount
                  this.reportsViewList = data.childList;
                  this.rowData = data['childList'];
                  console.log("Row data", this.rowData);
                  this.headers.push(Object.keys(this.rowData[0]))
                  let test = []
                  this.headers[0].forEach(function (result) {
                      let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
                      test.push(data)
                  })
                  this.rawdata.push(test)
                  this.columnDefs = this.rawdata[0]
              }
              else {
                  console.log(data.responseStatus);
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
  