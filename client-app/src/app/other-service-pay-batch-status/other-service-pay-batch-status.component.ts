// import { Component, OnInit } from '@angular/core';
// import { ProviderService } from "./../provider/provider.service";
// import swal from 'sweetalert2';
// import { isNullOrUndefined } from 'util';
// import * as moment from 'moment';
// import { PagesizeService } from '../pagesize/pagesize.service';
// import {LocalValues} from '../local-values';
// import { BatchProcessingService } from '../batch-processing/batch-processing.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchProcessingService } from '../batch-processing/batch-processing.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import { OpencardsService } from './../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { AgGridNg2 } from 'ag-grid-angular';
declare var $: any;
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-other-service-pay-batch-status',
  templateUrl: './other-service-pay-batch-status.component.html',
  styleUrls: ['./other-service-pay-batch-status.component.scss']
})
export class OtherServicePayBatchStatusComponent implements OnInit {

  // allBatchNameList=[];
  //   constructor(public _localValues: LocalValues,public _batch: BatchProcessingService, public providerService: ProviderService, public _pageSize: PagesizeService) { }
  //   limitation = [];
  //   limitselect = { ClaimBatchStatus: "Open", ClaimBatchStatusID: 1 };
  //   ngOnInit() {
  //     this.getAllBatches(this.limitselect.ClaimBatchStatusID);
  //     this.getLimitation();
  //   }
  //   getAllBatches(claimBatchStatusID) {
  //     const loader = document.getElementById('loading-overlay') as HTMLElement;
  //     loader.style.display = 'block';
  //     var req = {
  //       "claimBatchStatusID": claimBatchStatusID,
  //       "isOtherAgency": null,
  //       "isOtherService": true
  //     };
  //     this.providerService.BatchNameList(req).then(data => {
  //       data.paymentBatchStatus.map(item=>{
  //         !isNullOrUndefined(item['Expected Payment Date'])
  //         ? (item['Expected Payment Date'] = moment.utc(item['Expected Payment Date']).format("MM/DD/YYYY"))
  //         : null;

  //       !isNullOrUndefined(item['Posted Date'])
  //         ? (item['Posted Date'] = moment.utc(item['Posted Date']).format("MM/DD/YYYY"))
  //         : null;

  //       !isNullOrUndefined(item.PaymentDueDate)
  //         ? (item.PaymentDueDate = moment.utc(item.PaymentDueDate).format("MM/DD/YYYY"))
  //         : null;

  //       !isNullOrUndefined(item.ChangedDate)
  //         ? (item.ChangedDate = moment.utc(item.ChangedDate).format("MM/DD/YYYY"))
  //         : null;

  //         item['ExpectedPaymentDate'] = item['Expected Payment Date'];
  //         item['PostedBy'] = item['Posted By'];
  //         item['PostedDate'] = item['Posted Date'];
  //         item['RecoupedBy'] = item['Recouped By'];
  //         item['RecoupedDate'] = item['Recouped Date'];
  //       })
  //       this.allBatchNameList = data.paymentBatchStatus;
  //       loader.style.display = 'none';
  //     }).catch(error=>{
  //       loader.style.display = 'none';
  //     });
  //   };
  //   getLimitation() {
  //     this._batch.limitSelectionBatchStatus().then((data: any) => {
  //       this.limitation = data.limitSelectionList;
  //       this.limitation.push({
  //         ClaimBatchStatus: "All",
  //         ClaimBatchStatusID: null
  //       })
  //     })
  //   };
  //   selectLimitation(limitselect){
  //     this.getAllBatches(this.limitselect.ClaimBatchStatusID);
  //   }

  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;
  title = "Batch Processing"
  limitation = [];
  limitselect = { ClaimBatchStatus: "Open", ClaimBatchStatusID: 1 };
  paymentStatus = [];
  filteredLimitation = [];
  selectedClaimBatchId: any;
  listViewHeaders = [];
  listViewBreakHeaders = [];
  claimStatusSelect: any;
  columnDefs = [];
  columnBreahDefs = [];
  columnClaimDefs = [];
  listTest = [];
  discardTo = '';
  breadcrumbs = [];
  display: boolean = false;
  paymentNotes_dis: boolean = false;
  clmStatus: boolean = false;
  isfchWeb: boolean = false;
  isExpactPaymentDate: boolean = false;
  isNotes: boolean = false;
  saveDis: boolean = false;
  selectClaimID: any;
  select_claimStatusID: any;
  payName: any;
  payClaimName: any;

  constructor(public _openCards: OpencardsService, public _localValues: LocalValues, public _batch: BatchProcessingService, public _router: Router) { }

  ngOnInit() {
    this.getLimitation();
    this.selectLimitation(this.limitselect);
    this.claimStatus();
  }

  getLimitation() {
    this._batch.limitSelectionBatchStatus().then((data: any) => {
      this.limitation = data.limitSelectionList
      this.limitation.push({
        ClaimBatchStatus: "All",
        ClaimBatchStatusID: null
      })
    })
  }

  getPaymentStatus() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var req = {
      "claimBatchStatusID": this.selectedClaimBatchId,
      "isOtherAgency": null,
      "isOtherService": true
    };
    // req = { isOtherAgency: otherAgencyStatus, claimBatchStatusID: this.selectedClaimBatchId }
    this._batch.paymentStatus(req).then((data: any) => {
      loader.style.display = 'none';
      data.paymentBatchStatus.map((item: any) => {

        !isNullOrUndefined(item['Expected Payment Date'])
          ? (item['Expected Payment Date'] = moment.utc(item['Expected Payment Date']).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(item['Posted Date'])
          ? (item['Posted Date'] = moment.utc(item['Posted Date']).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(item.PaymentDueDate)
          ? (item.PaymentDueDate = moment.utc(item.PaymentDueDate).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(item.ChangedDate)
          ? (item.ChangedDate = moment.utc(item.ChangedDate).format("MM/DD/YYYY"))
          : null;

        if (item.Status === 1) {
          item.Status = 'Open';
        }
        else if (item.Status === 2) {
          item.Status = 'Approved';
        } else if (item.Status === 3) {
          item.Status = 'Posted';
        } else if (item.Status === 4) {
          item.Status = 'Recouped';
        } else if (item.Status === null) {
          item.Status = 'All';
        }
      })
      this.paymentStatus = data.paymentBatchStatus;
      this.generateListView();
    }).catch(err => {
      loader.style.display = 'none';
    });
  }
  edit_field = true;
  selectLimitation(event: any) {
    this.selectedClaimBatchId = event.ClaimBatchStatusID;
    if (event.ClaimBatchStatus === 'Posted') {
      this.edit_field = false;
    } else {
      // this.agGrid.api.startEditingCell();
      this.edit_field = true;
    }
    if (event.ClaimBatchStatusID === 1) {
      this.clmStatus = false;
      this.saveDis = false;
    } else {
      this.clmStatus = true;
      this.saveDis = true;
    }
    this.getPaymentStatus();
  }

  filterLimitation(event: any) {
    this.filteredLimitation = [];
    this.limitation.filter((data: any) => {
      if (data.ClaimBatchStatus.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredLimitation.push(data);
      }
    })
  }

  generateListView() {
    let rawData = [];
    this.listTest = [];
    this.listViewHeaders = [];
    this.columnDefs = [];
    if (this.paymentStatus.length > 0) {
      this.listViewHeaders.push(Object.keys(this.paymentStatus[0]))
      this.listViewHeaders[0].forEach((item: any) => {
        let data = { headerName: item, field: item }
        this.listTest.push(data);
      });
      this.listTest.map(itm => {
        delete itm['editable'];
      })
      rawData.push(this.listTest)
      rawData[0].map(data => {
        if (this.edit_field) {
          if (data.field == 'Expected Payment Date' || data.field == 'Posted Date') {
            data['editable'] = this.edit_field;
            data['cellEditor'] = Datepicker;
          }
          if (data.field == 'Batch') {
            console.log("data>>>><<", data);
            data['editable'] = this.edit_field;
          }
          if (data.field == 'Status') {
            data['editable'] = this.edit_field;
            data['cellEditor'] = "agSelectCellEditor",
              data['cellEditorParams'] = {
                values: ["Approved", "Open", "Posted", "Recouped"]
              }
          }
          this.agGrid.api.refreshCells();
        } else {
          if (data.field == 'Expected Payment Date' || data.field == 'Posted Date') {
            delete data['editable'];
          }
          if (data.field == 'Batch') {
            data['editable'] = true;
          }
          if (data.field == 'Status') {
            delete data['editable'];
            delete data['cellEditor'];
            delete data['cellEditorParams'];
          }
          this.agGrid.api.refreshCells();
        };
      })
      this.columnDefs = rawData[0];
      this.columnDefs.map(data => {
        if (data.field == 'ChangedDate' || data.field == 'EnteredDate' || data.field == 'Expected Payment Date' ||
          data.field == 'PaymentDueDate' || data.field == 'Posted Date') {
          data['valueFormatter'] = function (params) {
            if (params.value) {
              return moment.utc(params.value).format("MM/DD/YYYY");
            } else {
              return "";
            }
          };
        };
      });
    }
  }
  paymentBreakStatus = [];

  paymentBatchBreakSQL: any;
  total_PayorRate: any;
  total_ProviderRate: any;
  onRowSelected(event) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var req = {
      'claimPaymentBatchID': event.data.ClaimPaymentBatchID
    };
    this._batch.paymentBreakStatus(req).then((data: any) => {
      this.paymentBreakStatus = data.paymentBatchBreakdown;
      var total_PayorRate = data.paymentBatchBreakdown.reduce((sum, item) => sum + item['Total Payor Rate'], 0).toFixed(2);
      var total_ProviderRate = data.paymentBatchBreakdown.reduce((sum, item) => sum + item['Total Provider Rate'], 0).toFixed(2);

      this.total_PayorRate = Math.abs(total_PayorRate).toFixed(2);
      this.total_ProviderRate = Math.abs(total_ProviderRate).toFixed(2);

      console.log("TotalPayorRate>>>>>", this.total_PayorRate);
      console.log("total_ProviderRate>>>>>", this.total_ProviderRate);
      this.paymentBatchBreakSQL = data.sql;
      this.paymentBreakStatus.map((item: any) => {
        item['Payor Rate'] = item['Payor Rate'].toFixed(2);
        item['Provider Rate'] = item['Provider Rate'].toFixed(2);
        item['Total Payor Rate'] = item['Total Payor Rate'].toFixed(2);
        item['Total Provider Rate'] = item['Total Provider Rate'].toFixed(2);
        if (item['Claim Status'] === 6) {
          item['Claim Status'] = 'Approved';
        }
        else if (item['Claim Status'] === 5) {
          item['Claim Status'] = 'Denied';
        } else if (item['Claim Status'] === 7) {
          item['Claim Status'] = 'Draft';
        } else if (item['Claim Status'] === 2) {
          item['Claim Status'] = 'Hold';
        } else if (item['Claim Status'] === 1) {
          item['Claim Status'] = 'Posted';
        } else if (item['Claim Status'] === 4) {
          item['Claim Status'] = 'Recoup';
        } else if (item['Claim Status'] === 3) {
          item['Claim Status'] = 'Void';
        }
      })
      this.generateBreakListView();
      this.display = true;
      loader.style.display = 'none';
    }).catch(err => {
      loader.style.display = 'none';
    });
  }
  listBreakTest = [];
  claimIDS = [];
  generateBreakListView() {
    let rawBreakData = [];
    if (this.paymentBreakStatus.length > 0) {
      this.listViewBreakHeaders.push(Object.keys(this.paymentBreakStatus[0]))
      this.listViewBreakHeaders[0].forEach((item: any) => {
        let data = { headerName: item, field: item }
        this.listBreakTest.push(data);
      })
      rawBreakData.push(this.listBreakTest)
      this.columnBreahDefs = rawBreakData[0];
      this.columnBreahDefs.map(data => {
        data;
        if (data.field == 'ChangedDate' || data.field == 'EnteredDate' || data.field == 'Expected Payment Date' ||
          data.field == 'PaymentDueDate' || data.field == 'Posted Date' || data.field == 'Begin Date' || data.field == 'End Date') {
          data['valueFormatter'] = function (params) {
            if (params.value) {
              return moment.utc(params.value).format("MM/DD/YYYY");
            } else {
              return "";
            }
          };
        }
        if (data.field == 'Remove From Batch') {
          data['cellRenderer'] = params => {
            var self = this;
            var input = document.createElement('input');
            input.type = "checkbox";
            input.checked = params.value;
            input.addEventListener('click', function (event) {
              params.value = !params.value;
              params.node.data.fieldName = params.value;
              if (params.node.data.fieldName) {
                var data = {
                  claimID: params.node.data.ClaimID,
                  changedBy: 5130,
                  changedDate: self._localValues.report_begin_dateAndTime(new Date().getTime())
                }
                self.claimIDS.push(data)
              } else {
                var index = self.claimIDS.map((o) => { return o.claimID; }).indexOf(params.node.data.ClaimID);
                // var index = self.claimIDS.indexOf(data);
                self.claimIDS.splice(index, 1);
              }
            });
            return input;
            // return `<input type="checkbox" [checked]="params.value" (change)="removeCheck($event)">`;
          }
        }
        if (data.field == 'PaySponsor') {
          data['cellRenderer'] = params => {
            return `<input type='checkbox' ${params.value ? 'checked' : ''} disabled />`;
          }
        }
      })
    }
    // this.agGrid.api.getDisplayedRowAtIndex(0).setSelected(true);
    // this.agGrid.api.selectIndex(0, false, false);
  };
  display_auth: boolean;
  authDetail: any;
  claimDetail: any;
  claimAllDetail = [];
  showAuth = false;
  listViewClaimHeaders = [];
  listclaimTest = [];
  isShowAuth = false;
  isClaimAuth = false;
  labelPay: any;
  claimLabelPay: any;
  onRowAuthSelected(event) {
    var allClaims = [];
    let claimID = event.data.ClaimID;
    this.selectClaimID = event.data.ClaimID;
    const loader_auth = document.getElementById('loading-overlay-auth') as HTMLElement
    loader_auth.style.display = 'block';
    if (event.data.AuthorizationID) {
      var req = {
        'authorizationID': event.data.AuthorizationID
      };
      this._openCards.getAuthById(req).then((data: any) => {
        this.display_auth = true;
        loader_auth.style.display = 'none';
        this.showAuth = true;
        this.isShowAuth = true;
        this.isClaimAuth = true;
        if (data.authorization.isActive) {
          data.authorization.beginDate = moment(data.authorization.beginDate).format("MM/DD/YYYY");
          data.authorization.endDate = moment(data.authorization.endDate).format("MM/DD/YYYY");
        } else {
          data.authorization.beginDate = moment.utc(data.authorization.beginDate).format("MM/DD/YYYY");
          data.authorization.endDate = moment.utc(data.authorization.endDate).format("MM/DD/YYYY");
        }
        this.authDetail = data.authorization;
        if (data.authorization.payeeID === null) {
          this.labelPay = 'provider';
          this.payName = data.authorization.providerID.providerName;
        } else if (data.authorization.providerID === null) {
          this.labelPay = 'Payee';
          this.payName = data.authorization.payeeID.payeeName;
        }
        var claim_Detail = data.claimID.find(x => x.claimID == claimID);
        // claim_Detail.units = data.claimID.reduce((acc, claim) => acc + claim.units, 0)
        if (claim_Detail.isActive) {
          claim_Detail.beginDate = moment(claim_Detail.beginDate).format("MM/DD/YYYY");
          claim_Detail.endDate = moment(claim_Detail.endDate).format("MM/DD/YYYY");
          claim_Detail.receivedDate = moment(claim_Detail.receivedDate).format("MM/DD/YYYY");
          claim_Detail.paymentDueDate = moment(claim_Detail.paymentDueDate).format("MM/DD/YYYY");
        } else {
          claim_Detail.beginDate = moment.utc(claim_Detail.beginDate).format("MM/DD/YYYY");
          claim_Detail.endDate = moment.utc(claim_Detail.endDate).format("MM/DD/YYYY");
          claim_Detail.receivedDate = moment.utc(claim_Detail.receivedDate).format("MM/DD/YYYY");
          claim_Detail.paymentDueDate = moment.utc(claim_Detail.paymentDueDate).format("MM/DD/YYYY");
        }
        if (claim_Detail.payeeID === null) {
          this.claimLabelPay = 'provider';
          this.claim_providerID = data.authorization.providerID.providerID;
          this.payClaimName = data.authorization.providerID.providerName;
        } else if (claim_Detail.providerID === null) {
          this.claimLabelPay = 'Payee';
          this.payClaimName = data.authorization.payeeID.payeeName;
          this.claim_payeeID = data.authorization.payeeID.payeeID;
        }
        this.claimDetail = claim_Detail;
        this.claimStatusSelect = claim_Detail.claimStatusID;
        let payName;
        this.selectClaim(claim_Detail.claimStatusID);
        allClaims = data.claimID;
        allClaims.forEach(data => {

          if (data.payeeID === null) {
            payName = data.providerID.providerName;
          } else if (data.providerID === null) {
            payName = data.payeeID.payeeName;
          }


          var claimDeta = {
            'ClaimID': data.claimID,
            'Provider Name': payName,
            'Claim Status': data.claimStatusID.claimStatus,
            'Units': data.units,
            'Payor Rate': data.payorRate.toFixed(2),
            'Total Payor Rate': data.totalPayorRate.toFixed(2),
            'Provider Rate': data.providerRate.toFixed(2),
            'Total Provider Rate': data.totalProviderRate.toFixed(2),
            'Begin Date': data.beginDate,
            'End Date': data.endDate,
            'Expacted payment Date': data.paymentDueDate,
            'Posted Date': data.postedDate,
            'GL Key': data.glkey,
          }
          this.claimAllDetail.push(claimDeta);
        })

        let rawClaimData = [];
        if (this.claimAllDetail.length > 0) {
          this.listViewClaimHeaders.push(Object.keys(this.claimAllDetail[0]))
          this.listViewClaimHeaders[0].forEach((item: any) => {
            let data = { headerName: item, field: item }
            this.listclaimTest.push(data);
          });
          rawClaimData.push(this.listclaimTest);
          this.columnClaimDefs = rawClaimData[0];
          this.columnClaimDefs.map(data => {
            if (data.field == 'Expected Payment Date'
              || data.field == 'Posted Date' || data.field == 'Begin Date' || data.field == 'End Date') {
              data['valueFormatter'] = function (params) {
                if (params.value) {
                  return moment.utc(params.value).format("MM/DD/YYYY");
                } else {
                  return "";
                }
              };
            }
          })
        }
        this.display_auth = true;
        loader_auth.style.display = 'none';
        this.showAuth = true;
        this.isShowAuth = true;
        this.isClaimAuth = true;
      }).catch(err => {
        loader_auth.style.display = 'none';
      });
    } else {
      var reqClaim = {
        'claimID': event.data.ClaimID
      };
      this._openCards.getClaimIDDetails(reqClaim).then((data: any) => {
        var claim_Detail = data.claim;
        // claim_Detail.units = data.claimID.reduce((acc, claim) => acc + claim.units, 0)
        if (claim_Detail.isActive) {
          claim_Detail.beginDate = moment(claim_Detail.beginDate).format("MM/DD/YYYY");
          claim_Detail.endDate = moment(claim_Detail.endDate).format("MM/DD/YYYY");
          claim_Detail.receivedDate = moment(claim_Detail.receivedDate).format("MM/DD/YYYY");
          claim_Detail.paymentDueDate = moment(claim_Detail.paymentDueDate).format("MM/DD/YYYY");
        } else {
          claim_Detail.beginDate = moment.utc(claim_Detail.beginDate).format("MM/DD/YYYY");
          claim_Detail.endDate = moment.utc(claim_Detail.endDate).format("MM/DD/YYYY");
          claim_Detail.receivedDate = moment.utc(claim_Detail.receivedDate).format("MM/DD/YYYY");
          claim_Detail.paymentDueDate = moment.utc(claim_Detail.paymentDueDate).format("MM/DD/YYYY");
        }
        this.claimDetail = claim_Detail;
        if (claim_Detail.payeeID === null) {
          this.claimLabelPay = 'provider';
          this.claim_providerID = data.claim.providerID.providerID;
          this.payClaimName = data.claim.providerID.providerName;
        } else if (claim_Detail.providerID === null) {
          this.claimLabelPay = 'Payee';
          this.payClaimName = data.claim.payeeID.payeeName;
          this.claim_payeeID = data.claim.payeeID.payeeID;
        }
        this.claimStatusSelect = claim_Detail.claimStatusID;
        this.selectClaim(claim_Detail.claimStatusID);
        var allClaims = [claim_Detail];
        let payName;
        allClaims.forEach(data => {
          if (data.payeeID === null) {
            payName = data.providerID.providerName;
          } else if (data.providerID === null) {
            payName = data.payeeID.payeeName;
          }
          var claimDeta = {
            'ClaimID': data.claimID,
            'Provider Name': payName,
            'Claim Status': data.claimStatusID.claimStatus,
            'Units': data.units,
            'Payor Rate': data.payorRate,
            'Total Payor Rate': data.totalPayorRate,
            'Provider Rate': data.providerRate,
            'Total Provider Rate': data.totalProviderRate,
            'Begin Date': data.beginDate,
            'End Date': data.endDate,
            'Expacted payment Date': data.paymentDueDate,
            'Posted Date': data.postedDate,
            'GL Key': data.glkey,
          }
          this.claimAllDetail.push(claimDeta);
        })

        let rawClaimData = [];
        if (this.claimAllDetail.length > 0) {
          this.listViewClaimHeaders.push(Object.keys(this.claimAllDetail[0]))
          this.listViewClaimHeaders[0].forEach((item: any) => {
            let data = { headerName: item, field: item }
            this.listclaimTest.push(data);
          });
          rawClaimData.push(this.listclaimTest);
          this.columnClaimDefs = rawClaimData[0];
          this.columnClaimDefs.map(data => {
            if (data.field == 'Expected Payment Date'
              || data.field == 'Posted Date' || data.field == 'Begin Date' || data.field == 'End Date') {
              data['valueFormatter'] = function (params) {
                if (params.value) {
                  return moment.utc(params.value).format("MM/DD/YYYY");
                } else {
                  return "";
                }
              };
            }
          })
        }
        this.display_auth = true;
        loader_auth.style.display = 'none';
        this.showAuth = true;
        this.isShowAuth = false;
        this.isClaimAuth = true;
      }).catch(err => {
        loader_auth.style.display = 'none';
      });
    }
  };

  claimStas = [];
  allClaimStatus = [];
  claimStatus() {
    this._batch.claimStatus().then((data: any) => {
      this.claimStas = data.claimStatusList;
    })
  };
  selectClaim(event) {
    this.select_claimStatusID = event.claimStatusID;
    if (event.claimStatusID === 2) {
      this.paymentNotes_dis = false;
      this.isfchWeb = false;
      this.isExpactPaymentDate = false;
      this.isNotes = false;
    } else if (event.claimStatusID === 6) {
      this.paymentNotes_dis = true;
      this.isfchWeb = false;
      this.isExpactPaymentDate = false;
      this.isNotes = true;
    } else if (event.claimStatusID === 1) {
      this.paymentNotes_dis = true;
      this.isfchWeb = false;
      this.isExpactPaymentDate = true;
      this.isNotes = true;
    } else if (event.claimStatusID === 3) {
      this.paymentNotes_dis = false;
      this.isfchWeb = false;
      this.isExpactPaymentDate = true;
      this.isNotes = false;
    } else if (event.claimStatusID === 5) {
      this.paymentNotes_dis = false;
      this.isfchWeb = false;
      this.isExpactPaymentDate = false;
      this.isNotes = false;
    }
  };

  filterClaim(event) {
    this.allClaimStatus = [];
    this.claimStas.filter((data: any) => {
      if (data.claimStatus.toLowerCase().indexOf(event.query) !== -1) {
        this.allClaimStatus.push(data);
      }
    })
  };
  claim_providerID: any;
  claim_payeeID: any;
  updateClaim() {
    const loader_auth = document.getElementById('loading-overlay-auth') as HTMLElement
    loader_auth.style.display = 'block';
    var data = {
      claimID: this.selectClaimID,
      claimStatusID: this.select_claimStatusID,
      notes: this.claimDetail.notes,
      paymentNotes: this.claimDetail.paymentNotes,
      isNotFCHWeb: this.claimDetail.isNotFCHWeb,
      paymentDueDate: Date.parse(this.claimDetail.paymentDueDate),
      providerID: this.getNullValue(this.claim_providerID),
      payeeID: this.getNullValue(this.claim_payeeID),
      beginDate: this.claimDetail.beginDate,
      endDate: this.claimDetail.endDate,
      procodeID: this.claimDetail.procodeID.procodeID,
      referralID: this.claimDetail.referralID.referralID
    };
    this._openCards.saveClaim(data).then((item: any) => {
      loader_auth.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this.display_auth = false;
      this.showAuth = false;
      this.isShowAuth = false;
      this.isClaimAuth = false;
    }).catch(err => {
      loader_auth.style.display = 'none';
    });
  };

  getNullValue(data) {
    if (data) {
      return data;
    } else {
      return null
    }
  };

  batchBreak() {
    const loader_auth = document.getElementById('loading-overlay-auth') as HTMLElement
    loader_auth.style.display = 'block';
    var data = {
      "claimsIDs": this.claimIDS
    }
    this._batch.save_paymentBreakStatus(data).then((item: any) => {
      loader_auth.style.display = 'none';
      swal('Success', 'Record has been Saved!', 'success');
    }).catch(err => {
      loader_auth.style.display = 'none';
    });
  };

  batchStatsData: any;
  getSpecificData(eve) {
    console.log("eve>>>", eve);
  }
  onCellValueChanged(eve) {
    console.log("eve>>>>>", eve);
    this.batchStatsData = {
      "claimPaymentBatchID": eve.data.ClaimPaymentBatchID,
      "claimBatchName": eve.data.Batch,
      "paymentDueDate": new Date(eve.data.PaymentDueDate).getTime(),
      "claimBatchStatusID": eve.data.Status,
      "postedDate": new Date(eve.data['Posted Date']).getTime(),
      "postedBy_staffID": !isNullOrUndefined(localStorage.getItem('UserId')) ? parseInt(localStorage.getItem('UserId')) : 4621
    };
    if (this.batchStatsData.claimBatchStatusID === 'Open') {
      this.batchStatsData.claimBatchStatusID = 1;
    } else if (this.batchStatsData.claimBatchStatusID === 'Approved') {
      this.batchStatsData.claimBatchStatusID = 2;
    } else if (this.batchStatsData.claimBatchStatusID === 'Posted') {
      this.batchStatsData.claimBatchStatusID = 3;
    } else if (this.batchStatsData.claimBatchStatusID === 'Recouped') {
      this.batchStatsData.claimBatchStatusID = 4;
    };

  };
  reportName: any;
  saveBatchStatus(save_Create) {
    this.agGrid.api.stopEditing();
    const loader_auth = document.getElementById('loading-overlay') as HTMLElement
    loader_auth.style.display = 'block';
    this._batch.claimPaymentBatch(this.batchStatsData).then((item: any) => {
      loader_auth.style.display = 'none';
      this.getPaymentStatus();
      if (save_Create == 'save_Create') {
        var myStr = this.batchStatsData.claimBatchName;
        var newStr = myStr.replace(/\//g, '-');

        this._batch.claimPaymentexport({
          "postDate": null,
          "reportName": "OSClaimPaymentBatchReport",
          "fileName": newStr,
          "claimPaymentBatchID": this.batchStatsData.claimPaymentBatchID,
        }).then((data: any) => {
          if (data.filePath) {
            window.location.href = data.filePath;
          };
          this.batchStatsData = {};
        }).catch(err => {
          loader_auth.style.display = 'none';
        });
      }
      swal('Success', 'Record has been Saved!', 'success');
    }).catch(err => {
      loader_auth.style.display = 'none';
    }
    );
  };
  onFirstDataRendered(params) {
    this.agGrid.api.getDisplayedRowAtIndex(0).setSelected(true);
  }
  selectBatch: any;
  onSelectionChanged() {
    var selectedRows = this.agGrid.api.getSelectedRows();
    this.selectBatch = selectedRows[0];
    console.log("selectedRows>>>>", selectedRows);
  };
  create_Report() {
    if (this.selectBatch) {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      var myStr = this.selectBatch.Batch;
      var newStr = myStr.replace(/\//g, '-');
      this._batch.claimPaymentexport({
        "postDate": null,
        "reportName": "OSClaimPaymentBatchReport",
        "fileName": newStr,
        "claimPaymentBatchID": this.selectBatch.ClaimPaymentBatchID,
      }).then((data: any) => {
        loader.style.display = 'none';
        if (data.filePath) {
          window.location.href = data.filePath;
        };
        this.selectBatch = {};
      }).catch(err => {
        loader.style.display = 'none';
      });
    } else {
      swal('Info', 'Please Select the Batch', 'warning');
    }

  }
  export_batchBreak() {
    const loader = document.getElementById('loading-overlay-auth') as HTMLElement
    loader.style.display = 'block';
    this._batch.all_Export({
      "fileName": "Payment Batch Breakdown",
      "sql": this.paymentBatchBreakSQL
    }).then((data: any) => {
      loader.style.display = 'none';
      if (data.filePath) {
        window.location.href = data.filePath;
      };
      this.selectBatch = {};
    }).catch(err => {
      loader.style.display = 'none';
    });
  }

}


function Datepicker() { }
Datepicker.prototype.init = function (params) {
  this.eInput = document.createElement("input");
  this.eInput.value = params.value;
  $(this.eInput).datepicker({ dateFormat: "mm/dd/yy" });
};
Datepicker.prototype.getGui = function () {
  return this.eInput;
};
Datepicker.prototype.afterGuiAttached = function () {
  this.eInput.focus();
  this.eInput.select();
};
Datepicker.prototype.getValue = function () {
  return this.eInput.value;
};
Datepicker.prototype.destroy = function () { };
Datepicker.prototype.isPopup = function () {
  return false;
};