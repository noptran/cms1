import { Component, OnInit, ViewChild, ɵConsole, TemplateRef, Renderer2 } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { BatchProcessingService } from './batch-processing.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { BatchProcessing } from './batch-processing';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import "ag-grid-enterprise";
import {LocalValues} from '../local-values';
import { CdkDragDrop, moveItemInArray, CdkDragStart, CdkDragRelease } from '@angular/cdk/drag-drop';
declare var $: any;
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-batch-processing',
  templateUrl: './batch-processing.component.html',
  styleUrls: ['./batch-processing.component.scss', '../person-master/Client/client-form/client-form.component.scss']
})
export class BatchProcessingComponent implements OnInit {
  mainTabs = [];
  sIndex: number = null;
  title = "Batch Processing"
  beginDate: any;
  endDate: any;
  batchType: any;
  isSaveClaimBox = false;
  isBatchTypeOtherService = false;
  batchTypeList = [];
  paymentTypeList = [];
  recreateBatch = [];
  batchNameList = [];
  metaData = [];
  sponserDis = false;
  claimPaymentBatchID: any;
  batch: BatchProcessing = new BatchProcessing();
  newClaimProcessList = [];
  existingClaimProcessList = [];
  existingClaimProcessHeaders = [];
  existingClaimProcessTest = [];
  existingClaimProcessRowData = [];
  existingClaimColumnDefs = [];
  newClaimProcessHeaders = [];
  newClaimProcessTest = [];
  newClaimProcessRowData = [];
  newClaimColumnDefs = [];
  new_defaultColumn: any;
  exit_defaultColumn: any;
  isSave = false;
  gridOptions: any;
  newBranchName: String;
  isSaveDialogBox = false;
  breadcrumbs = [];
  claimPaymentBatchTypeID = 1;
  is_new_Select: boolean = false;
  isexitSelect: boolean = false;
  isexitDeselect = true;
  is_new_Deselect = true;
  addToBatchIds = [];
  statusList = [];
  selectedSponsorData: any;
  saveEnable = false;
  selectedExitingClaims: any;
  selectedNewClaims: any;
  /////
  name = 'Angular';
  release: boolean = false;
  pos: any;
  // new_new_displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  new_displayedColumns = [];
  exit_displayedColumns = [];
  // dataSource = ELEMENT_DATA;
  dataSource = [];
  // new_columns = [{ field: 'position', header: 'Nº' },
  // { field: 'name', header: 'Name' },
  // { field: 'weight', header: 'Weight' },
  // { field: 'symbol', header: 'Symbol' }
  // ]
  new_columns = [];
  exit_columns = [];

  subtitle: any;



  //////
  constructor(public renderer: Renderer2, public _openCards: OpencardsService, public _batchProcess: BatchProcessingService,
    public _caseTeam: CaseTeamService, public _router: Router, public _localValues: LocalValues, ) { }
  sortingField = 'Client';
  ngOnInit() {
    this.loadTabData();
    this.getLimitation();
    this.reportDateAutomation();
    this.checkBatchType();
    this.setIndex(0);
    this.batchTypeList = ['Foster Care – Kansas', 'Foster Care – Nebraska', 'Foster Care – Oklahoma', 'Other Agency'];
    this.getListOfPaymentTypes();
    // this.getListOfRecreateBatchName();
    this.getListOfBatchName();
    this.batch.batchName = { ClaimBatchName: "<Create New Batch>", ClaimPaymentBatchID: null, PaymentDueDate: null }

    this.breadcrumbs.push(
      { label: 'Dashboard', href: "/reports/batch-process", active: '' },
      { label: 'Form', active: 'active' }
    )
    this.batch.paymentDueDate = new Date(Date.now()); //Auto fetch
  };

  dragOrderList = []

  loadTabData() {
    this.mainTabs = [{ label: "New Claims", href: '#nav-sec1' },
    { label: "Existing Claims", href: '#nav-sec2' }];
  }
  exitClaim = true;
  new_Claim = false;
  setIndex(index: number) {
    this.sIndex = index;
    if (index == 1) {
      this.exitClaim = true;
      this.new_Claim = false;
    } else {
      this.exitClaim = false;
      this.new_Claim = true;
    };
  };


  reportDateAutomation() {
    let date = new Date();
    this.batch.rangeBeginDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.batch.rangeEndDate = new Date(date.getFullYear(), date.getMonth(), 0);
  }

  checkBatchType() {
    this.batchType = this._openCards.getBatchType();
    if (this.batchType == "Other Agency") {
      this.isBatchTypeOtherService = true;
      this.batch.createTypeID = { "TypeName": "Other Agency", "TypeID": 0, "SponsorID": null, "SponsorName": null, "Contract_StateID": null, "CreateTypeID": 4, "CreateType": "OTHER_AGENCY" }
      this.generateCreateType(this.batch.createTypeID);
      // this.batch.createTypeID = { CreateTypeID: 4, TypeName: 'Other Agency' } // Auto Fetch
      this.batch.sponsorID = { SponsorID: null, sponsorName: null }
    }
  }

  getListOfPaymentTypes() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req: any;
    if (this.isBatchTypeOtherService === false) {
      req = this.checkBatch();
      // req = { isOtherAgency: true }
      this._batchProcess.listOfPaymentTypes(req).then((data: any) => {
        this.paymentTypeList = data.providerPaymentType;
        loader.style.display = "none";
      }).catch(err => {
        loader.style.display = 'none';
      });
    } else {
      req = { isOtherAgency: this.isBatchTypeOtherService }
      this._batchProcess.listOfPaymentTypes(req).then((data: any) => {
        this.paymentTypeList = data.providerPaymentType;
        loader.style.display = "none";
      }).catch(err => {
        loader.style.display = 'none';
      });
    }
  }

  checkBatch() {
    let url: any, Obj: any;
    url = this._router.url;
    switch (url) {
      case '/batch-process-form/FC-Kansas':
        this.sponserDis = true;
        Obj = { isOtherAgency: false, KS: true };
        this.batch.createTypeID = { "TypeName": "FC", "TypeID": 1, "SponsorID": 11, "SponsorName": "Saint Francis Community Services", "Contract_StateID": 34, "CreateTypeID": 1, "CreateType": "OUR_HOMES" } // Auto Fetch
        this.batch.sponsorID = { sponsorID: 11, sponsorName: 'Saint Francis Community Services' }
        this.generateCreateType(this.batch.createTypeID);
        break;
      case '/batch-process-form/FC-Nebraska':
        this.sponserDis = false;
        Obj = { isOtherAgency: false, NE: true }
        this.batch.createTypeID = { CreateTypeID: 1, TypeName: 'NC-FCH NE', TypeID: 12 } // Auto Fetch
        this.generateCreateType(this.batch.createTypeID);
        this.batch.sponsorID = { sponsorID: 69, sponsorName: 'Saint Francis Community Services-Nebraska' }
        break;
      case '/batch-process-form/FC-Oklahoma':
        this.sponserDis = true;
        Obj = { isOtherAgency: false, OK: true }
        this.batch.createTypeID = { "TypeName": "NC-FCH OK", "TypeID": 10, "SponsorID": 58, "SponsorName": "Saint Francis Community Services-Oklahoma", "Contract_StateID": 35, "CreateTypeID": 1, "CreateType": "OUR_HOMES" } // Auto Fetch
        this.generateCreateType(this.batch.createTypeID);
        this.batch.sponsorID = { sponsorID: 58, sponsorName: 'Saint Francis Community Services-Oklahoma' }
        break;
      case '/batch-process-form/FC-Other-Services':
        this.sponserDis = false;
        Obj = { isOtherAgency: true }
        break;
    }
    return Obj;
  }

  getListOfRecreateBatchName(type_id) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let url: any, req: any;
    url = this._router.url;
    switch (url) {
      case '/batch-process-form/FC-Kansas':
        req = { isOtherAgency: false, KS: true, createType: type_id };
        break;
      case '/batch-process-form/FC-Nebraska':
        req = { isOtherAgency: false, NE: true, createType: type_id }
        break;
      case '/batch-process-form/FC-Oklahoma':
        req = { isOtherAgency: false, OK: true, createType: type_id }
        break;
      case '/batch-process-form/FC-Other-Services':
        req = { isOtherAgency: true, createType: type_id }
        break;
    }
    this._batchProcess.listOfRecreateBatchName(req).then((data: any) => {
      data.recreateBatchName.map((item: any) => {
        item['display'] = item.BatchID + ' ' + item.BatchName;
      })
      this.recreateBatch = data.recreateBatchName;
      loader.style.display = "none";
    }).catch(err => {
      loader.style.display = 'none';
    });
  }
  batch_ks_Status: any;
  batch_ne_Status: any;
  batch_ok_Status: any;
  batch_isOther_Status: any;
  getListOfBatchName() {
    let url: any, req: any;
    url = this._router.url;
    switch (url) {
      case '/batch-process-form/FC-Kansas':
        req = { isOtherAgency: false, KS: true };
        this.batch_ks_Status = true;
        this.batch_ne_Status = null;
        this.batch_ok_Status = null;
        this.batch_isOther_Status = false
        break;
      case '/batch-process-form/FC-Nebraska':
        req = { isOtherAgency: false, NE: true }
        this.batch_ks_Status = null;
        this.batch_ne_Status = true;
        this.batch_ok_Status = null;
        this.batch_isOther_Status = false
        break;
      case '/batch-process-form/FC-Oklahoma':
        req = { isOtherAgency: false, OK: true }
        this.batch_ks_Status = null;
        this.batch_ne_Status = null;
        this.batch_ok_Status = true;
        this.batch_isOther_Status = false
        break;
      case '/batch-process-form/FC-Other-Services':
        req = { isOtherAgency: true };
        this.batch_ks_Status = null;
        this.batch_ne_Status = null;
        this.batch_ok_Status = null;
        this.batch_isOther_Status = true;
        this.claimPaymentBatchTypeID = 3;
        break;
    }
    this._batchProcess.listOfBatchName(req).then((data: any) => {
      this.batchNameList = data.batchNameList;
    })
  }
  sponser_metaData_list = [];
  fillterSponsorData(event: any) {
    let req = { Object: 'sponsorName', value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.sponser_metaData_list = data.dropDown;
    })
  }
  type_metaData_list = [];
  fillterPaymentTypes(event: any) {
    this.type_metaData_list = [];
    this.paymentTypeList.filter((item: any) => {
      if (item.TypeName.toLowerCase().indexOf(event.query) !== -1) {
        this.type_metaData_list.push(item);
      }
    })
  }

  fillterRecreateBatchName(event: any) {
    this.metaData = [];
    this.recreateBatch.filter((item: any) => {
      if (item.BatchName.toString().toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    })
  }
  isFirstColumn(params) {
    var new_displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = new_displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }
  fillterBatchName(event: any) {
    this.metaData = [];
    this.batchNameList.filter((item: any) => {
      if (item.ClaimBatchName.toString().toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    })
  };
  alStatus = [];
  getLimitation() {
    this._batchProcess.claimStatus().then((data: any) => {
      this.alStatus = data.claimStatusList;
    });
  }
  totalSelectClaims: any = 0;
  newProcess: any;
  exitProcess: any;
  selectedDate = {};
  batchProcess_new_Req: any;
  batchProcess_exit_Req: any;
  newClaimTotalCount = 0;
  exitClaimTotalCount = 0;
  batchData: any;
  isExitClaim = true;
  claimProcess(source, isProcess) {
    this.all_newClaim_ProcessList(source, isProcess);
    this.selectedClaims = 0;
    this.totalSelectClaims = 0;
    this.totalCountPayorRate = 0;
    this.totalCountProviderRate = 0;
    this.createIDS = []; this.addToBatchIds = [];
    this.selectedClaim(this.createIDS, this.addToBatchIds);
    // this.all_exitClaim_ProcessList(source, isProcess);
  };

  all_newClaim_ProcessList(source, isProcess) {
    this.batchData = source;
    this.new_displayedColumns = [];
    this.new_columns = [];
    this.saveEnable = false;
    this.selectedDate['rangeBeginDate'] = source.rangeBeginDate;
    this.selectedDate['rangeEndDate'] = source.rangeEndDate;
    let req: any, processData: any;
    source.rangeBeginDate = new Date(source.rangeBeginDate).getTime();
    source.rangeEndDate = new Date(source.rangeEndDate).getTime();
    // source.referralTypeID = 1;
    source.userID = !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621;

    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    if (this.batch.isRecreateBatch) {
      req = {
        "isProcess": isProcess,
        "isRecreateBatch": source.isRecreateBatch,
        "userID": source.userID,
        "claimPaymentBatchID": this.batch.batchID.BatchID,
        "sponsorID": this.batch.sponsorID.sponsorID,
        "createTypeID": this.batch.createTypeID.CreateTypeID,
        "beginDate": this._localValues.report_begin_dateAndTime(source.rangeBeginDate),
        "endDate": this._localValues.report_end_dateAndTime(source.rangeEndDate),
        "referralTypeID": this.referralTypeID,
        "paySemiMonthly": source.paySemiMonthly,
        "beginPagination": 1,
        "endPagination": 50,
        // "sort": {
        //   "column": "CT.Client",
        //   "mode": "ASC"
        // }
      }
    } else {
      req = {
        "isProcess": isProcess,
        "isRecreateBatch": source.isRecreateBatch,
        "userID": source.userID,
        "sponsorID": this.batch.sponsorID.sponsorID,
        "createTypeID": this.batch.createTypeID.CreateTypeID,
        "beginDate": this._localValues.report_begin_dateAndTime(source.rangeBeginDate),
        "endDate": this._localValues.report_end_dateAndTime(source.rangeEndDate),
        "referralTypeID": this.referralTypeID,
        "paySemiMonthly": source.paySemiMonthly,
        "beginPagination": 1,
        "endPagination": 50,
        // "sort": {
        //   "column": "CT.Client",
        //   "mode": "ASC"
        // }
      }
    };
    this.newClaimProcessList = [];
    this.batchProcess_new_Req = req;
    this._batchProcess.paymentNewProcess(req).then(data => {
      this.newClaimTotalCount = data.totalCount;
      this.batchProcess_new_Req.beginPagination = this.batchProcess_new_Req.beginPagination + 50;
      if (this.batchProcess_new_Req.endPagination >= this.newClaimTotalCount) {
        this.batchProcess_new_Req.endPagination = this.newClaimTotalCount;
        this.isScroll_new = false;
      } else {
        this.isScroll_new = true;
        this.batchProcess_new_Req.endPagination = this.batchProcess_new_Req.endPagination + 50;
      }

      data.newClaimProcess.map(item => {
        if (item['Claim Status'] === 6) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Void';
        };
        //  delete item["ClaimTempID"];
        delete item["OrigRate"];
        delete item["OrigTLRate"];
        delete item["ServiceProvider"];
        delete item["ReferralID"];
        delete item["ClientID"];
        delete item["ProviderID"];
        delete item["ProviderLocationID"];
        delete item["PayorID"];
        delete item["SponsorID"];
        delete item["ProcodeID"];
        delete item["SFAOfficeID"];
        delete item["UnitTypeID"];
        delete item["OrigUnits"];
        delete item["PlacementDetailID"];
        delete item["LivingArrangementID"];
        delete item["Claim Status"];
        // delete item["EnteredDate"];
        // delete item["ChangedBy"];
        delete item["UserID"];
        delete item["AuthorizationStatusID"];
        // delete item["IsNotFCHWeb"];
        delete item["IsAllowUnitTypeOverride"];
        delete item["IsRespiteEarned"];
        delete item["PlacementID"];
        delete item["claimStatusID"];
        // delete item["ChangedDate"];
        delete item["PaymentTypeID"];
        delete item["ClaimPaymentBatchID"];

      });
      this.new_displayedColumns = [
        "Action",
        "Error",
        "Create",
        "ClaimStatus",
        "AuthorizationID",
        "Client",
        "BeginDate",
        "EndDate",
        "Procode",
        "Units",
        "ProviderRate",
        "TotalProviderRate",
        "PayorRate",
        "TotalPayorRate",
        "PaymentNotes",
        "Provider",
        "Sponsor",
        "Payor",
        "PaySponsor",
        "GLKey",
        "ReceivedDate",
        "AUTHBeginDate",
        "AUTHEndDate",
        "DischargeDate",
        "UnitsRemaining",
        "Respite_AuthorizationID",
        "HoldBed_AuthorizationID",
        "OriginalBeginDate",
        "GapClaim",
        "Notes",
        "ClaimTempID",
      ];


      if (this._router.url !== '/batch-process-form/FC-Other-Services') {
        delete this.new_displayedColumns[29];
      }



      this.new_displayedColumns.forEach((result) => {
        let data = {
          header: result, field: result,
        }
        this.new_columns.push(data)
      })

      console.log("this.new_displayedColumns>>>", this.new_displayedColumns);


      console.log("this.drag_OrderList>>>", this.dragOrderList);
      this.newClaimProcessList = data.newClaimProcess;
      this.totalSelectClaims = this.newClaimTotalCount + this.exitClaimTotalCount;
      this.newProcess = data.new;
      if (isProcess) {
        this.all_exitClaim_ProcessList(this.batchData, true);
      } else {
        loader.style.display = 'none';
      }
      this.batch.rangeBeginDate = new Date(req.beginDate);
      this.batch.rangeEndDate = new Date(req.endDate);
    }).catch(err => {
      loader.style.display = 'none';
      this.batch.rangeBeginDate = new Date(req.beginDate);
      this.batch.rangeEndDate = new Date(req.endDate);
    });

  }
  all_exitClaim_ProcessList(source, isProcess) {
    this.batchData = source;
    this.saveEnable = false;
    this.exit_displayedColumns = [];
    this.exit_columns = [];
    this.selectedDate['rangeBeginDate'] = source.rangeBeginDate;
    this.selectedDate['rangeEndDate'] = source.rangeEndDate;
    source.rangeBeginDate = new Date(source.rangeBeginDate).getTime();
    source.rangeEndDate = new Date(source.rangeEndDate).getTime();
    // source.referralTypeID = 1;
    source.userID = !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621;
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    ////Exictiong
    var exitReq = {
      "isProcess": isProcess,
      "referralTypeID": this.referralTypeID,
      "createTypeID": this.batch.createTypeID.CreateTypeID,
      "sponsorID": this.batch.sponsorID.sponsorID,
      "paySemiMonthly": source.paySemiMonthly,
      "beginPagination": 1,
      "endPagination": 50,
      "userID": source.userID,
      // "sort":{
      //     "column": "BeginDate",
      //     "mode": "ASC"
      // }
    }
    this.batchProcess_exit_Req = exitReq;
    this._batchProcess.paymentExitProcess(exitReq).then(data => {
      loader.style.display = 'none';
      this.exitClaimTotalCount = data.totalCount;
      this.batchProcess_exit_Req.beginPagination = this.batchProcess_exit_Req.beginPagination + 50;
      if (this.batchProcess_exit_Req.endPagination >= this.exitClaimTotalCount) {
        this.batchProcess_exit_Req.endPagination = this.exitClaimTotalCount;
        this.isScroll_exit = false;
      } else {
        this.isScroll_exit = true;
        this.batchProcess_exit_Req.endPagination = this.batchProcess_exit_Req.endPagination + 50;
      }
      data.existingClaimProcess.map(item => {
        item.BeginDate = this._localValues.localStringFormatSlashFormat(item.BeginDate);
        item.EndDate = this._localValues.localStringFormatSlashFormat(item.EndDate);
        item.AUTHBeginDate = this._localValues.localStringFormatSlashFormat(item.AUTHBeginDate);
        item.AUTHEndDate = this._localValues.localStringFormatSlashFormat(item.AUTHEndDate);
        item.DischargeDate = this._localValues.localStringFormatSlashFormat(item.DischargeDate);
        item.PaymentDueDate = this._localValues.localStringFormatSlashFormat(item.PaymentDueDate);
        item.OriginalBeginDate = this._localValues.localStringFormatSlashFormat(item.OriginalBeginDate);
        item.ChangedDate = this._localValues.localStringFormatSlashFormat(item.ChangedDate);
        item.EnteredDate = this._localValues.localStringFormatSlashFormat(item.EnteredDate);
        item['AddtoBatch'] = item['Add to Batch'];
        if (item['Claim Status'] === 6) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Void';
        }
      });
      this.existingClaimProcessList = data.existingClaimProcess;
      this.totalSelectClaims = this.newClaimTotalCount + this.exitClaimTotalCount;
      this.exitProcess = data.existing;

      this.exit_displayedColumns = [
        "AddtoBatch",
        "ClaimID",
        "ClaimStatus",
        "AuthorizationID",
        "Client",
        "BeginDate",
        "EndDate",
        "Procode",
        "Units",
        "ProviderRate",
        "TotalProviderRate",
        "PayorRate",
        "TotalPayorRate",
        "Provider",
        "Sponsor",
        "Payor",
        "PaySponsor",
        "GLKey",
        "EnteredBy",
        "EnteredDate",
        "ChangedBy",
        "ChangedDate",
        "PaymentNotes",
        "IsNotFCHWeb",
      ];

      // this.exit_displayedColumns = Object.keys(data.existingClaimProcess[0]);
      // console.log("this.exit_displayedColumns>>>", this.exit_displayedColumns);
      this.exit_displayedColumns.forEach((result) => {
        let data = {
          header: result, field: result,
        }
        this.exit_columns.push(data)
      })


    })
  }
  createIDS = [];
  totalCountPayorRate: any = 0;
  totalCountProviderRate: any = 0;
  selectedClaims: any = 0;
  selectedClaimsList = [];
  selectedClaim(createIDS, addToBatchIds) {
    var addToClaim = createIDS.length + addToBatchIds.length;
    this.totalCountPayorRate = 0;
    this.totalCountProviderRate = 0;
    this.selectedClaims = addToClaim;
    var creatPayorRate = createIDS.reduce((sum, item) => sum + item.totalPayorRate, 0).toFixed(2);
    var addToBatchPayorRate = addToBatchIds.reduce((sum, item) => sum + item.totalPayorRate, 0).toFixed(2);
    this.totalCountPayorRate = (parseFloat(creatPayorRate)) + (parseFloat(addToBatchPayorRate));

    var creatProviderRate = createIDS.reduce((sum, item) => sum + item.totalProviderRate, 0).toFixed(2);
    var addToBatchProviderRate = addToBatchIds.reduce((sum, item) => sum + item.totalProviderRate, 0).toFixed(2);
    this.totalCountProviderRate = (parseFloat(creatProviderRate)) + (parseFloat(addToBatchProviderRate));

  };

  new_selectAll(selectState, tabState) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var req = {
      "action": selectState,
      "userID": !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621,
      "tab": tabState
    };
    this._batchProcess.selectAllNewClaimList(req).then(data => {
      loader.style.display = 'none';
      if (tabState === 'New') {
        this.createIDS = [];
        if (this.sort_new_Key) {
          this.sortingNewClaim(this.sort_new_Key, false);
        } else {
          this.all_newClaim_ProcessList(this.batchData, false);
        }

        if (selectState === 'SelectAll') {
          data.claimTemp.forEach(ele => {
            var data = {
              "ClaimTempID": ele.claimTempID,
              "totalPayorRate": ele.totalPayorRate,
              "check": true,
              "Create": true,
              "Error": null,
              "totalProviderRate": ele.totalProviderRate
            }
            this.createIDS.push(data);
          })
        }
        this.selectedClaim(this.createIDS, this.addToBatchIds);
      } else {
        this.addToBatchIds = [];
        if (this.sort_exit_key) {
          this.sortingExitClaim(this.sort_exit_key, false);
        } else {
          this.all_exitClaim_ProcessList(this.batchData, false);
        }

        if (selectState === 'SelectAll') {
          data.claimTemp.forEach(ele => {
            var data = {
              "ClaimTempID": ele.claimID,
              "totalPayorRate": ele.totalPayorRate,
              "check": true,
              "totalProviderRate": ele.totalProviderRate
            }
            this.addToBatchIds.push(data);
          });
        };

        this.selectedClaim(this.createIDS, this.addToBatchIds);
      }
    })
    this.is_new_Select = true;
    this.is_new_Deselect = false;
  }

  new_deSelectAll() {
    this.createIDS = [];
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var AllNewClaimProcssList = this.newClaimProcessList;
    AllNewClaimProcssList.map((data) => {
      data['Create'] = false;
    });
    this.newClaimProcessList = AllNewClaimProcssList;
    loader.style.display = 'none';
    this.selectedClaim(this.createIDS, this.addToBatchIds);
    this.is_new_Select = false;
    this.is_new_Deselect = true;
    this.createIDS = [];
  };

  openSaveDialogBox(event: any) {
    if (event.ClaimBatchName !== "<Create New Batch>") {
      this.batch.batchName.ClaimBatchName = event.ClaimBatchName;
      this.batch.paymentDueDate = new Date(event.PaymentDueDate);
      this.batch.claimPaymentBatchID = event.ClaimPaymentBatchID;
    } else {
      this.batch.paymentDueDate = new Date(Date.now());
      // this.isSaveDialogBox = true;
    }
  }

  saveNewBrachName(source: any) {
    this.newBranchName = source;
    this.batch.batchName = this.newBranchName;
    return this.isSaveDialogBox = false;
  }
  save_batchName: any;
  savePayment(source: BatchProcessing) {
    var exitClaimIDS = [];
    this.addToBatchIds.forEach(element => {
      exitClaimIDS.push(element.ClaimTempID);
    });
    this.isSaveDialogBox = false;
    var error_false_batch = [];
    var tempIDS = [];
    let req: any;
    error_false_batch = this.createIDS.filter(ele => ele.check === true);
    this.selectedSponsorData = source.sponsorID;
    var isErrorREC = error_false_batch.some(code => code.Error !== null);
    if (isErrorREC) {
      swal('Info', 'A record with an error cannot be created!', 'warning');
    } else {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this.createIDS.forEach(element => {
        tempIDS.push(element.ClaimTempID);
      });
      this.addToBatchIds.forEach(element => {
        exitClaimIDS.push(element.ClaimTempID);
      });
      this._batchProcess.updateClaimTemp({
        "selectedEntries": tempIDS
      }).then(data_claim => {
        if (this.batch.isRecreateBatch) {
          req = {
            // batchID: !isNullOrUndefined(source.batchID) ? source.batchID.BatchID : 10670,
            batchName: source.batchID.BatchName,
            batchID: source.batchName.ClaimPaymentBatchID,
            claimPaymentBatchID: source.batchName.ClaimPaymentBatchID,
            claimPaymentBatchTypeID: this.claimPaymentBatchTypeID,
            isRecreateBatch: this.batch.isRecreateBatch,
            sponsorID: !isNullOrUndefined(source.sponsorID) ? source.sponsorID = source.sponsorID.sponsorID : null,
            rangeBeginDate: !isNullOrUndefined(source.rangeBeginDate) ? source.rangeBeginDate = this._localValues.stringFormatDatetime(source.rangeBeginDate) : null,
            rangeEndDate: !isNullOrUndefined(source.rangeEndDate) ? source.rangeEndDate = this._localValues.stringFormatDatetime(source.rangeEndDate) : null,
            userID: !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621,
            createTypeID: !isNullOrUndefined(source.createTypeID) ? source.createTypeID = source.createTypeID.CreateTypeID : null,
            paymentDueDate: Date.parse(this.batch.paymentDueDate),
            enteredBy: !isNullOrUndefined(localStorage.getItem('UserEmail')) ? localStorage.getItem('UserEmail') : 'No user found!',
            enteredDate: Date.now(),
            KS: this.batch_ks_Status,
            NE: this.batch_ne_Status,
            OK: this.batch_ok_Status,
            isOtherAgency: this.batch_isOther_Status,
            claimIDs: dublicateRemove(exitClaimIDS)
          }
        } else {
          req = {
            batchID: source.batchName.ClaimPaymentBatchID,
            KS: this.batch_ks_Status,
            NE: this.batch_ne_Status,
            OK: this.batch_ok_Status,
            isOtherAgency: this.batch_isOther_Status,
            claimPaymentBatchID: source.batchName.ClaimPaymentBatchID,
            claimPaymentBatchTypeID: this.claimPaymentBatchTypeID,
            isRecreateBatch: this.batch.isRecreateBatch,
            sponsorID: !isNullOrUndefined(source.sponsorID) ? source.sponsorID = source.sponsorID.sponsorID : null,
            rangeBeginDate: !isNullOrUndefined(source.rangeBeginDate) ? source.rangeBeginDate = this._localValues.stringFormatDatetime(source.rangeBeginDate) : null,
            rangeEndDate: !isNullOrUndefined(source.rangeEndDate) ? source.rangeEndDate = this._localValues.stringFormatDatetime(source.rangeEndDate) : null,
            userID: !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621,
            createTypeID: !isNullOrUndefined(source.createTypeID) ? source.createTypeID = source.createTypeID.CreateTypeID : null,
            paymentDueDate: Date.parse(this.batch.paymentDueDate),
            batchName: this.batch.batchName.ClaimBatchName,
            enteredBy: !isNullOrUndefined(localStorage.getItem('UserEmail')) ? localStorage.getItem('UserEmail') : 'No user found!',
            enteredDate: Date.now(),
            claimIDs: dublicateRemove(exitClaimIDS)

          }
        };
        if (req.batchName === '<Create New Batch>') {
          req.claimPaymentBatchID = null;
          req.batchID = null;
        }
        this._batchProcess.savePayment(req).then(data_pay => {
          this.saveEnable = true;
          loader.style.display = "none";
          this.getListOfBatchName();
          this.selectedExitingClaims = data_pay.NumberOfExistingAddedToTheBatch;
          this.selectedNewClaims = data_pay.updateClaimPaymentBatch[0].NumClaimsCreated;
          this.save_batchName = data_pay.updateClaimPaymentBatch[0].BatchName;
          data_claim.responseStatus ? swal('Success', 'Record has been saved!', 'success') : swal('error', 'Record has not been saved!', 'error');
          this.isSaveClaimBox = true;
          this.loadTabData();
          this.getLimitation();

          this.batch.rangeBeginDate = new Date(this.batchProcess_new_Req.beginDate);
          this.batch.rangeEndDate = new Date(this.batchProcess_new_Req.endDate);

          this.reportDateAutomation();
          if (this.batchType == "Other Agency") {
            this.isBatchTypeOtherService = true;
            this.batch.createTypeID = { CreateTypeID: 4, TypeName: 'Other Agency' } // Auto Fetch
            // this.batch.sponsorID = { SponsorID: null, sponsorName: null }
          };
          this.createIDS.forEach(itm => {
            var index = this.newClaimProcessList.map((o) => { return o.ClaimTempID; }).indexOf(itm.ClaimTempID);
            this.newClaimProcessList.splice(index, 1);
          });
          this.addToBatchIds.forEach(itm => {
            var exindex = this.existingClaimProcessList.map((o) => { return o.ClaimID; }).indexOf(itm.ClaimTempID);
            this.existingClaimProcessList.splice(exindex, 1);
          });
          this.batch.sponsorID = this.selectedSponsorData;
          this.setIndex(0);
          this.batchTypeList = ['Foster Care – Kansas', 'Foster Care – Nebraska', 'Foster Care – Oklahoma', 'Other Agency'];
          this.getListOfPaymentTypes();
          this.getListOfBatchName();
          this.batch.batchName = { ClaimBatchName: "<Create New Batch>", ClaimPaymentBatchID: null, PaymentDueDate: null };
          this.batch.paymentDueDate = new Date(Date.now()); //Auto fetch
          this.getListOfBatchName();
          this.save_batchName = data_pay.updateClaimPaymentBatch[0].BatchName;
          data_claim.responseStatus ? swal('Success', 'Record has been saved!', 'success') : swal('error', 'Record has not been saved!', 'error');
          this.isSaveClaimBox = true;
          this.loadTabData();
          this.getLimitation();
          this.reportDateAutomation();
          if (this.batchType == "Other Agency") {
            this.isBatchTypeOtherService = true;
            this.batch.createTypeID = { CreateTypeID: 4, TypeName: 'Other Agency' } // Auto Fetch
            // this.batch.sponsorID = { SponsorID: null, sponsorName: null }
          }
          this.batch.sponsorID = this.selectedSponsorData;
          this.setIndex(0);
          this.batchTypeList = ['Foster Care – Kansas', 'Foster Care – Nebraska', 'Foster Care – Oklahoma', 'Other Agency'];
          this.getListOfPaymentTypes();
          this.getListOfBatchName();
          this.batch.batchName = { ClaimBatchName: "<Create New Batch>", ClaimPaymentBatchID: null, PaymentDueDate: null };
          this.batch.paymentDueDate = new Date(Date.now());
          this.createIDS = [];
          this.addToBatchIds = [];
          this.selectedClaim(this.createIDS, this.addToBatchIds);
        });
      }).catch(err => {
        loader.style.display = 'none';
      });
    }

  }

  generateSponser(event: any) {
    this.batch.sponsorID = { sponsorID: event.SponsorID, sponsorName: event.SponsorName }
  };
  referralTypeID: any;
  generateCreateType(event: any) {
    this.referralTypeID = event.TypeID;
    if (event.TypeName === 'Kinship - FC' || event.TypeName === 'Kinship - JJFC' || event.TypeName === 'Kinship - SUB-RFC' || event.TypeName === 'Manual Pay') {
      this.batch.sponsorID = {};
    } else {
      this.batch.sponsorID = { sponsorID: event.SponsorID, sponsorName: event.SponsorName }
    }
    this.getListOfRecreateBatchName(event.CreateTypeID);
  };
  gotoDashboard() {
    this._router.navigate(["reports/batch-process"]);
  };
  methodFromParent(cell) {
    var exitAray = [];
    if (this.sIndex == 0) {
      if (cell.value) {
        var data = {
          ClaimTempID: cell.data.ClaimTempID,
          totalPayorRate: cell.data.TotalPayorRate,
          check: cell.value
        }
        this.createIDS.push(data);
        this.createIDS.forEach(element => {
          this.newClaimProcessList.map(data => {
            if (data.ClaimTempID === element.ClaimTempID) {
              data['Create'] = element.check;
            }
          })
        });
        this.selectedClaim(this.createIDS, this.addToBatchIds);
      } else {
        var index = this.createIDS.map((o) => { return o.ClaimTempID; }).indexOf(cell.data.ClaimTempID);
        this.createIDS.splice(index, 1);
        this.createIDS.forEach(element => {
          this.newClaimProcessList.map(data => {
            if (data.ClaimTempID === element.ClaimTempID) {
              data['Create'] = element.check;
            }
          })
        });
        this.selectedClaim(this.createIDS, this.addToBatchIds);
      }
    } else {
      this.existingClaimProcessList[cell.rowIndex]['AddtoBatch'] = cell.value;
      this.existingClaimProcessList.map(itm => {
        if (itm['AddtoBatch'] === true) {
          var add_data = {
            ClaimTempID: itm.ClaimID,
            totalPayorRate: itm.TotalPayorRate,
            check: cell.value
          }
          exitAray.push(add_data);
        }
      })
      // Array to keep track of duplicates
      var dups = [];
      var arr = exitAray.filter(function (el) {
        // If it is not a duplicate, return true
        if (dups.indexOf(el.ClaimTempID) == -1) {
          dups.push(el.ClaimTempID);
          return true;
        }
        return false;
      });
      this.addToBatchIds = arr;
      this.selectedClaim(this.createIDS, this.addToBatchIds);
    }


  }

  showSaveBox() {
    this.isSaveDialogBox = true;
  };
  closeSaveBox() {
    this.isSaveDialogBox = false;
  };
  closeBatchBox() {
    this.isSaveClaimBox = false;
  }
  exportErrorReoprt() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._batchProcess.errorProviderExport({
      "report": "invalidVenderReport",
      "fileName": "ErrorReport-InvalidVenderID",
      "userID": !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621
    }).then((data: any) => {
      loader.style.display = 'none';
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    }).catch(err => {
      loader.style.display = 'none';
    });
  };
  allNewProcess() {
    if (this.newClaimProcessList.length == 0) {
      swal('Info', 'There is no Records to Export', 'warning');
    } else {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this._batchProcess.allNeProcessExport({
        "fileName": "Export-NewClaim",
        "sql": this.newProcess
      }).then((data: any) => {
        loader.style.display = 'none';
        if (data.filePath) {
          window.location.href = data.filePath;
        };
      });
    }
  };

  allExitProcess() {
    if (this.existingClaimProcessList.length == 0) {
      swal('Info', 'There is no Records to Export', 'warning');
    } else {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this._batchProcess.allNeProcessExport({
        "fileName": "Export-ExistingClaim",
        "sql": this.exitProcess
      }).then((data: any) => {
        loader.style.display = 'none';
        if (data.filePath) {
          window.location.href = data.filePath;
        };
      }).catch(err => {
        loader.style.display = 'none';
      });
    }
  };
  itsDisable = false;
  sponserRestrict(event) {
    this.itsDisable = false;
    if (this.batch.createTypeID.TypeName === 'Other Agency') {
      if (this.batch.sponsorID.sponsorName.includes('Saint Francis Community')) {
        this.itsDisable = true;
        swal('Info', 'You must enter a Sponser other then SFCS', 'warning');
      }
    }
  };
  isShowBatchAdd = false;
  restrictDropdownForm: any;
  payorRate: number;
  providerRate: number;
  save_rowIndex: number;
  createID: number;
  onRowSelected(eve, index) {
    // console.log('eve>>>', eve);
    this.save_rowIndex = index;
    if (this._router.url === '/batch-process-form/FC-Other-Services') {
      this.isShowBatchAdd = true;
      this.edit_claimTempID = eve.ClaimTempID;
      this.edit_beginDate = new Date(eve.BeginDate);
      this.edit_EndDate = new Date(eve.EndDate);
      this.edit_receivedDate = !isNullOrUndefined(eve.ReceivedDate) ? new Date(eve.ReceivedDate) : eve.ReceivedDate;
      this.edit_units = eve.Units;
      this.edit_claimTempID = eve.ClaimTempID;
      this.edit_providerRate = eve.ProviderRate;
      this.providerRate = eve.ProviderRate;
      this.payorRate = eve.PayorRate;
      this.edit_payorRate = eve.PayorRate;
      this.createID = eve.Create;
      this.editClaimStatusID = {
        'claimStatus': eve["ClaimStatus"],
        'claimStatusID': eve.claimStatusID,
      }
      this.restrictDropdownForm = eve;
    }
  };
  closeEditBox() {
    this.isShowBatchAdd = false;
  };
  edit_beginDate: any;
  edit_EndDate: any;
  edit_receivedDate: any;
  edit_units: number;
  edit_claimTempID: any;
  edit_providerRate: number;
  edit_payorRate: number;
  editClaimStatusID: any;

  saveEditBatchProcess() {
    var req = {
      "claimTempID": this.edit_claimTempID,
      "create": true,
      "beginDate": this.edit_beginDate,
      "endDate": this.edit_EndDate,
      "receivedDate": this.edit_receivedDate,
      "units": this.edit_units,
      "providerRate": this.edit_providerRate,
      "payorRate": this.edit_payorRate,
      "totalProviderRate": (this.edit_units * this.edit_providerRate),
      "totalPayorRate": (this.edit_units * this.edit_payorRate),
      "claimStatusID": this.editClaimStatusID.claimStatusID,
    };
    this._batchProcess.editBatchProcess(req).then((data: any) => {
      this.isShowBatchAdd = false;
      this.newClaimProcessList[this.save_rowIndex].BeginDate = this._localValues.localStringFormatSlashFormat(req.beginDate);
      this.newClaimProcessList[this.save_rowIndex].EndDate = this._localValues.localStringFormatSlashFormat(req.endDate);
      this.newClaimProcessList[this.save_rowIndex].ReceivedDate = this._localValues.localStringFormatSlashFormat(req.receivedDate);
      this.newClaimProcessList[this.save_rowIndex].ProviderRate = req.providerRate.toFixed(2);
      this.newClaimProcessList[this.save_rowIndex].PayorRate = req.payorRate.toFixed(2);
      this.newClaimProcessList[this.save_rowIndex].TotalPayorRate = req.totalPayorRate.toFixed(2);
      this.newClaimProcessList[this.save_rowIndex].TotalProviderRate = req.totalProviderRate.toFixed(2);
      this.newClaimProcessList[this.save_rowIndex].Units = req.units.toFixed(2);
      this.newClaimProcessList[this.save_rowIndex]['ClaimStatus'] = this.editClaimStatusID.claimStatus;
    });
  };

  claimStatusList = [];
  allClaims() {
    var claimStasList = [];
    this._openCards.getClaimsStatus().then((data) => {
      data.map((itm) => {
        if (this.restrictDropdownForm.claimStatusID === 1 && this.restrictDropdownForm.Recoup_ClaimID === null && this.restrictDropdownForm.PaymentTypeID === null) {
          if (itm.claimStatusID === 1 && itm.claimStatusID === 3) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 1 && this.restrictDropdownForm.Recoup_ClaimID === null && this.restrictDropdownForm.PaymentTypeID === null) {
          if (itm.claimStatusID === 1 || itm.claimStatusID === 3 || itm.claimStatusID === 4) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 2 && this.restrictDropdownForm.Recoup_ClaimID === null) {
          if (itm.claimStatusID === 3 || itm.claimStatusID === 2 || itm.claimStatusID === 5) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 1 && this.restrictDropdownForm.Recoup_ClaimID === null && this.restrictDropdownForm.PaymentTypeID === 1) {
          if (itm.claimStatusID === 1 || itm.claimStatusID === 4) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 1 && this.restrictDropdownForm.Recoup_ClaimID !== null) {
          if (itm.claimStatusID === 1 || itm.claimStatusID === 3 || itm.claimStatusID === 2) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 2 && this.restrictDropdownForm.Recoup_ClaimID !== null) {
          if (itm.claimStatusID === 3 || itm.claimStatusID === 2) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 1 && this.restrictDropdownForm.Recoup_ClaimID === null && this.restrictDropdownForm.PaymentTypeID !== 1) {
          if (itm.claimStatusID === 1 || itm.claimStatusID === 3 || itm.claimStatusID === 2) {
            claimStasList.push(itm);
          }

        }
        else if (this.restrictDropdownForm.claimStatusID === 4) {
          if (itm.claimStatusID === 3 || itm.claimStatusID === 4) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 5) {
          if (itm.claimStatusID === 2 || itm.claimStatusID === 5) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 6) {
          if (itm.claimStatusID === 2 || itm.claimStatusID === 5 || itm.claimStatusID === 3 || itm.claimStatusID === 6) {
            claimStasList.push(itm);
          }
        } else if (this.restrictDropdownForm.claimStatusID === 7) {

        } else if (this.restrictDropdownForm.claimStatusID === 2) {
          if (itm.claimStatusID === 3 || itm.claimStatusID === 2 || itm.claimStatusID === 5) {
            claimStasList.push(itm);
          }
        } else {
          claimStasList.push(itm);
        }

      });
      this.claimStatusList = claimStasList;
    });
    // console.log("this.restrictDropdownForm>>>>>", this.restrictDropdownForm)
  }
  providerRateChage(proRate) {
    if (this.providerRate <= proRate) {
      this.edit_providerRate = this.providerRate;
    }
  };
  payorRateChage(payorRate) {
    if (this.payorRate <= payorRate) {
      this.edit_payorRate = this.payorRate;
    }
  };


  single_New_Claims(idx, datas, event) {
    this.newClaimProcessList[idx].Create = event.target.checked;
    datas.Create = event.target.checked;
    console.log(idx, ">>>", datas, ">>>", event);
    var req = {
      "claimTempID": datas.ClaimTempID,
      "create": datas.Create,
      "beginDate": null,
      "endDate": null,
      "receivedDate": null,
      "units": null,
      "providerRate": null,
      "payorRate": null,
      "totalProviderRate": null,
      "totalPayorRate": null,
      "claimStatusID": null,
    };
    this._batchProcess.editBatchProcess(req).then((data: any) => {

    })
    if (datas.Create) {
      var data = {
        ClaimTempID: datas.ClaimTempID,
        totalPayorRate: parseInt(datas.TotalPayorRate),
        check: datas.Create,
        Error: datas.Error,
        totalProviderRate: parseInt(datas.TotalProviderRate)
      }
      this.createIDS.push(data);
      // this.createIDS.forEach(element => {
      //   this.newClaimProcessList.map(data => {
      //     if (data.ClaimTempID === element.ClaimTempID) {
      //       data['Create'] = element.check;
      //     }
      //   })
      // });
      // console.log("this.createIDS>>>", this.createIDS);
      this.selectedClaim(this.createIDS, this.addToBatchIds);
    } else {
      var index = this.createIDS.map((o) => { return o.ClaimTempID; }).indexOf(datas.ClaimTempID);
      this.createIDS.splice(index, 1);
      // this.createIDS.forEach(element => {
      //   this.newClaimProcessList.map(data => {
      //     if (data.ClaimTempID === element.ClaimTempID) {
      //       data['Create'] = element.check;
      //     }
      //   })
      // });
      console.log("this.createIDS>>>", this.createIDS);
      this.selectedClaim(this.createIDS, this.addToBatchIds);
    }
  };
  single_New_exClaim(idx, datas, event) {
    var req = {
      "addtoBatch": datas.AddtoBatch,
      "claimID": datas.ClaimID,
      "userID": !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621
    };
    this._batchProcess.exictingBatchProcessCheckBox(req).then(data => {

    });
    if (datas.AddtoBatch) {
      var data = {
        ClaimTempID: datas.ClaimID,
        totalPayorRate: datas.TotalPayorRate,
        check: datas.AddtoBatch,
        totalProviderRate: datas.TotalProviderRate
      }
      this.addToBatchIds.push(data);
      // this.addToBatchIds.forEach(element => {
      //   this.existingClaimProcessList.map(data => {
      //     if (data.ClaimID === element.ClaimTempID) {
      //       data['Create'] = element.check;
      //     }
      //   })
      // });
      this.selectedClaim(this.createIDS, this.addToBatchIds);
    } else {
      var index = this.addToBatchIds.map((o) => { return o.ClaimTempID; }).indexOf(datas.ClaimTempID);
      this.addToBatchIds.splice(index, 1);
      // this.addToBatchIds.forEach(element => {
      //   this.existingClaimProcessList.map(data => {
      //     if (data.ClaimID === element.ClaimTempID) {
      //       data['Create'] = element.check;
      //     }
      //   });
      // });
      this.selectedClaim(this.createIDS, this.addToBatchIds);
    }
  };
  sort_new_Key: any;
  sort_status: boolean = false;
  sortingNewClaim(key_to_sort_by, isSort) {
    this.sort_new_Key = key_to_sort_by;
    this.isScorllData = true;
    var sort;
    if (isSort) {
      this.sort_status = !this.sort_status;
    }
    var sortKey;
    if (key_to_sort_by === 'Create') {
      sortKey = '[Create]';
    } else if (key_to_sort_by === 'ClaimStatus') {
      sortKey = '[Claim Status]';
    } else {
      sortKey = key_to_sort_by;
    }

    if (this.sort_status) {
      sort = {
        "column": "CT." + sortKey,
        "mode": "ASC"
      }
    } else {
      sort = {
        "column": "CT." + sortKey,
        "mode": "DESC"
      }
    }
    this.batchProcess_new_Req.sort = sort;
    this.batchProcess_new_Req.beginPagination = 1;
    this.batchProcess_new_Req.endPagination = 50;
    this.batchProcess_new_Req.isProcess = false;
    this.newClaimProcessList = [];
    this._batchProcess.paymentNewProcess(this.batchProcess_new_Req).then(data => {
      this.newClaimTotalCount = data.totalCount;
      this.batchProcess_new_Req.beginPagination = this.batchProcess_new_Req.beginPagination + 50;
      if (this.batchProcess_new_Req.endPagination >= this.newClaimTotalCount) {
        this.batchProcess_new_Req.endPagination = this.newClaimTotalCount;
        this.isScroll_new = false;
      } else {
        this.isScroll_new = true;
        this.batchProcess_new_Req.endPagination = this.batchProcess_new_Req.endPagination + 50;
      }
      this.createIDS.forEach(itm => {
        data.newClaimProcess.map(item => {
          if (itm.ClaimTempID === item.ClaimTempID) {
            item.Create = true;
          }
        })
      });
      data.newClaimProcess.map(item => {
        if (item['Claim Status'] === 6) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Void';
        }
        // delete item["ClaimTempID"];
        delete item["OrigRate"];
        delete item["OrigTLRate"];
        delete item["ServiceProvider"];
        delete item["ReferralID"];
        delete item["ClientID"];
        delete item["ProviderID"];
        delete item["ProviderLocationID"];
        delete item["PayorID"];
        delete item["SponsorID"];
        delete item["ProcodeID"];
        delete item["SFAOfficeID"];
        delete item["UnitTypeID"];
        delete item["OrigUnits"];
        delete item["PlacementDetailID"];
        delete item["LivingArrangementID"];
        // delete item["EnteredBy"];
        // delete item["EnteredDate"];
        // delete item["ChangedBy"];
        delete item["UserID"];
        delete item["AuthorizationStatusID"];
        // delete item["IsNotFCHWeb"];
        delete item["IsAllowUnitTypeOverride"];
        delete item["IsRespiteEarned"];
        delete item["PlacementID"];
        delete item["claimStatusID"];
        // delete item["ChangedDate"];
        delete item["PaymentTypeID"];
        delete item["ClaimPaymentBatchID"];

      });
      if (this.dragOrderList.length === 0) {
        this.dragOrderList = Object.keys(data.newClaimProcess[0]);
      }
      this.isScorllData = false;
      this.newClaimProcessList = data.newClaimProcess;
      this.newProcess = data.new;
      this.batch.rangeBeginDate = new Date(this.batchProcess_new_Req.beginDate);
      this.batch.rangeEndDate = new Date(this.batchProcess_new_Req.endDate);
    }).catch(err => {
      // loader.style.display = 'none';
      this.batch.rangeBeginDate = new Date(this.batchProcess_new_Req.beginDate);
      this.batch.rangeEndDate = new Date(this.batchProcess_new_Req.endDate);
    });
  }
  sort_exit_key: any;
  sortingExitClaim(key_to_sort_by, isSort) {
    this.sort_exit_key = key_to_sort_by;
    this.isScorll_exitData = true;
    var sort;
    if (isSort) {
      this.sort_status = !this.sort_status;
    }
    var sortKey;
    if (key_to_sort_by === 'AddtoBatch') {
      sortKey = '[Add to Batch]';
    } else if (key_to_sort_by === 'ClaimStatus') {
      sortKey = '[Claim Status]';
    } else {
      sortKey = key_to_sort_by;
    }
    if (this.sort_status) {
      sort = {
        "column": sortKey,
        "mode": "ASC"
      }
    } else {
      sort = {
        "column": sortKey,
        "mode": "DESC"
      }
    };
    this.batchProcess_exit_Req.sort = sort;
    this.batchProcess_exit_Req.beginPagination = 1;
    this.batchProcess_exit_Req.endPagination = 50;
    this.batchProcess_exit_Req.isProcess = false;
    this.existingClaimProcessList = [];
    this._batchProcess.paymentExitProcess(this.batchProcess_exit_Req).then(data => {
      this.isScorll_exitData = false;
      this.exitClaimTotalCount = data.totalCount;
      this.batchProcess_exit_Req.beginPagination = this.batchProcess_exit_Req.beginPagination + 50;
      if (this.batchProcess_exit_Req.endPagination >= this.exitClaimTotalCount) {
        this.batchProcess_exit_Req.endPagination = this.exitClaimTotalCount;
        this.isScroll_exit = false;
      } else {
        this.isScroll_exit = true;
        this.batchProcess_exit_Req.endPagination = this.batchProcess_exit_Req.endPagination + 50;
      }
      data.existingClaimProcess.map(item => {
        item.BeginDate = this._localValues.localStringFormatSlashFormat(item.BeginDate);
        item.EndDate = this._localValues.localStringFormatSlashFormat(item.EndDate);
        item.AUTHBeginDate = this._localValues.localStringFormatSlashFormat(item.AUTHBeginDate);
        item.AUTHEndDate = this._localValues.localStringFormatSlashFormat(item.AUTHEndDate);
        item.DischargeDate = this._localValues.localStringFormatSlashFormat(item.DischargeDate);
        item.PaymentDueDate = this._localValues.localStringFormatSlashFormat(item.PaymentDueDate);
        item.OriginalBeginDate = this._localValues.localStringFormatSlashFormat(item.OriginalBeginDate);
        item.ChangedDate = this._localValues.localStringFormatSlashFormat(item.ChangedDate);
        item.EnteredDate = this._localValues.localStringFormatSlashFormat(item.EnteredDate);

        item['AddtoBatch'] = item['Add to Batch'];
        if (item['Claim Status'] === 6) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Void';
        }
      });
      this.addToBatchIds.forEach(itm => {
        data.existingClaimProcess.map(item => {
          if (itm.ClaimTempID === item.ClaimID) {
            item.AddtoBatch = true;
          }
        })
      });
      this.existingClaimProcessList = data.existingClaimProcess;
      this.exitProcess = data.existing;
    })
  }

  isScorllData = false;
  isScorll_exitData = false;
  isScroll_new = true;
  isScroll_exit = true;
  onscrollNewClaim(ev) {
    this.batchProcess_new_Req.isProcess = false;
    this.isScorllData = true;
    this.isScroll_new = false;
    this._batchProcess.paymentNewProcess(this.batchProcess_new_Req).then(data => {
      this.batchProcess_new_Req.beginPagination = this.batchProcess_new_Req.beginPagination + 50;
      if (this.batchProcess_new_Req.endPagination >= this.newClaimTotalCount) {
        this.batchProcess_new_Req.endPagination = this.newClaimTotalCount;
        this.isScroll_new = false;
      } else {
        this.isScroll_new = true;
        this.batchProcess_new_Req.endPagination = this.batchProcess_new_Req.endPagination + 50;
      }
      data.newClaimProcess.map(item => {
        if (item['Claim Status'] === 6) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Void';
        }

      });
      data.newClaimProcess.forEach(ele => {
        this.newClaimProcessList.push(ele);
      })
      this.isScorllData = false;
      this.newProcess = data.new;
    })

  }
  onscrollExitClaim() {
    this.isScorll_exitData = true;
    this.isScroll_exit = false;
    this.batchProcess_exit_Req.isProcess = false;
    this._batchProcess.paymentExitProcess(this.batchProcess_exit_Req).then(data => {
      this.batchProcess_exit_Req.beginPagination = this.batchProcess_exit_Req.beginPagination + 50;
      if (this.batchProcess_exit_Req.endPagination >= this.exitClaimTotalCount) {
        this.batchProcess_exit_Req.endPagination = this.exitClaimTotalCount;
        this.isScroll_exit = false;
      } else {
        this.isScroll_exit = true;
        this.batchProcess_exit_Req.endPagination = this.batchProcess_exit_Req.endPagination + 50;
      }
      this.isScorll_exitData = false;

      data.existingClaimProcess.map(item => {
        item.BeginDate = this._localValues.localStringFormatSlashFormat(item.BeginDate);
        item.EndDate = this._localValues.localStringFormatSlashFormat(item.EndDate);
        item.AUTHBeginDate = this._localValues.localStringFormatSlashFormat(item.AUTHBeginDate);
        item.AUTHEndDate = this._localValues.localStringFormatSlashFormat(item.AUTHEndDate);
        item.DischargeDate = this._localValues.localStringFormatSlashFormat(item.DischargeDate);
        item.PaymentDueDate = this._localValues.localStringFormatSlashFormat(item.PaymentDueDate);
        item.OriginalBeginDate = this._localValues.localStringFormatSlashFormat(item.OriginalBeginDate);
        item.ChangedDate = this._localValues.localStringFormatSlashFormat(item.ChangedDate);
        item.EnteredDate = this._localValues.localStringFormatSlashFormat(item.EnteredDate);

        item['AddtoBatch'] = item['Add to Batch'];
        if (item['Claim Status'] === 6) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['claimStatusID'] = item['Claim Status'];
          item['ClaimStatus'] = 'Void';
        }
      });
      data.existingClaimProcess.forEach(ele => {
        this.existingClaimProcessList.push(ele);
      })
      // this.existingClaimProcessList = data.existingClaimProcess;
      this.exitProcess = data.existing;
    })
  };
  ///////
  new_dropRow(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.newClaimProcessList, event.previousIndex, event.currentIndex);
  }
  new_dropCol(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.new_columns, event.previousIndex, event.currentIndex);
  }
  exit_dropRow(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.existingClaimProcessList, event.previousIndex, event.currentIndex);
  }
  exit_dropCol(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.exit_columns, event.previousIndex, event.currentIndex);
  }
  mouseDown(event, el: any = null) {
    el = el || event.target
    this.pos =
      {
        x: el.getBoundingClientRect().left - event.clientX + 'px',
        y: el.getBoundingClientRect().top - event.clientY + 'px',
        width: el.getBoundingClientRect().width + 'px'
      }
    console.log(el.getBoundingClientRect().left, event.clientX, this.pos.x)
  }
  onDragRelease(event: CdkDragRelease) {
    this.renderer.setStyle(event.source.element.nativeElement, 'margin-left', '0px')
    console.log(event.source.element)
  }
  //////
}
function dublicateRemove(arr) {
  var tmp = [];
  for (var i = 0; i < arr.length; i++) {
    if (tmp.indexOf(arr[i]) == -1) {
      tmp.push(arr[i]);
    }
  }
  return tmp;
};

