import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProviderService } from "./../provider/provider.service";
import { AgGridNg2 } from 'ag-grid-angular';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import { PagesizeService } from '../pagesize/pagesize.service';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import { ExportAllService } from '../person-master/personmaster-list-view/export.service';
import {LocalValues} from '../local-values';
declare var $: any;

interface Region {
  name: string;
  code: string;
}
@Component({
  selector: 'app-report-primary-filter',
  templateUrl: './report-primary-filter.component.html',
  styleUrls: ['./report-primary-filter.component.scss',]
})

export class ReportPrimaryFilterComponent implements OnInit {
  @Input()
  url: any;
  showReferralType: boolean;
  totalCount: any;
  selectedQuery: any;
  reportsViewList: any;
  initial = 1;
  end = 100;
  numericColumns: any = [];
  rowData = [];
  referralList = [];
  referral: any;
  isPredefined: boolean;
  req: any;
  referralGroupID: any;
  tableArray: any;
  showSrsRoster = false;
  customizedArray: any;
  sortcolumnDropdownList = [];
  headers = [];
  rawdata = [];
  columnDropdownList = [];
  columnDefs = [];
  @ViewChild("agGrid", {static: false}) agGrid: AgGridNg2;
  beginDate: any;
  endDate: any;
  showForm: boolean = false;
  report_name: string;
  fin_report_data: any;
  report_name_head: string;
  showRegion: boolean;
  isValidDate: boolean;
  procodesList: any = [];
  claimList: any = [];
  referralType: any;
  region: any;
  claimStatusID: any;
  getReportStatus: boolean;
  exportQuery: any;
  dateTime = new Date();
  discription: string;
  regions = [];
  referralID: any;
  region_name: any;
  showProcode: boolean;
  showClaimStatus: boolean;
  procodeID: any;
  isResubmission = false;
  beginDate_disable = false;
  procodeName: any;
  referralName: any;
  claims: any;
  temp_table: any;
  display: boolean;
  displayPop: string;
  constructor(public _localValues: LocalValues, public _caseTeam: CaseTeamService, public exportAllService: ExportAllService, public router: Router, public finance_report: ProviderService, public _pageSize: PagesizeService, ) {
    this.url = this.router.url;
    console.log('this.router.url>>>>', this.router.url)
    var url_str = this.router.url;
    console.log('url_str>>>>', url_str.split('/'))
    var url_array = url_str.split('/');
    this.dateTime.setDate(this.dateTime.getDate());
    this.referralID = url_array[url_array.length - 1];
    this.report_name = url_array[url_array.length - 2];
    var report_name_head = url_array[url_array.length - 3];
    this.report_name_head = report_name_head.replace(/\b\w/g, l => l.toUpperCase()).replace(/([A-Z])/g, " $1").trim();
    if (this.report_name_head == 'F C H Placements And Costs' || this.report_name_head == 'J J F C Placements And Costs') {
      this.discription = 'All OPEN Foster Care Homes placements within the date range selected below. Select the appropriate dates and process the report. This report includes AUTHORIZED rates for placements.';
    } else if (this.report_name_head == 'Claims Posted Placements By Referral Type') {
      if (this.referralID === '1') {
        this.referralType = 'In-Home';
      } else if (this.referralID === '2') {
        this.referralType = 'Out-Of-Home';
      } else if (this.referralID === '3') {
        this.referralType = 'Non-Contract Foster Care Homes';
      } else if (this.referralID === '7') {
        this.referralType = 'All';
      } else if (this.referralID === '8') {
        this.referralType = 'Reintegration Foster Care';
      } else if (this.referralID === '9') {
        this.referralType = 'Family Preservation Out-Of-Home';
      }
      this.report_name_head = 'Claims Posted - Placements By Referral Type' + ' (' + this.referralType + ') ';
      this.discription = 'All Placement Claims for the Referral Type selected and Posted within the date range below. Set the appropriate dates, the Referral Type, and process the report. This report only pull Claims for Placements that have been posted for payment.';
    } else if (this.report_name_head == 'Claims Posted Living Arrangements By Referral Type') {
      if (this.referralID === '1') {
        this.referralType = 'In-Home';
      } else if (this.referralID === '2') {
        this.referralType = 'Out-Of-Home';
      } else if (this.referralID === '3') {
        this.referralType = 'Non-Contract Foster Care Homes';
      } else if (this.referralID === '7') {
        this.referralType = 'All';
      } else if (this.referralID === '8') {
        this.referralType = 'Reintegration Foster Care';
      } else if (this.referralID === '9') {
        this.referralType = 'Family Preservation Out-Of-Home';
      }
      this.report_name_head = 'Claims Posted - Living Arrangements By Referral Type' + ' (' + this.referralType + ') ';
      this.discription = 'All Living Arrangement Claims for the Referral Type selected and Posted within the date range below. Set the appropriate dates, the Referral Type, and process the report. This report only pull Claims for Placements that have been posted for payment.';
    } else if (this.report_name_head == 'All Paid Placements O O H' || this.report_name_head == 'All Paid Placements Paid Respite') {
      if (this.referralID === '7') {
        this.referralType = 'All';
      } else if (this.referralID === '14') {
        this.referralType = 'All Foster Care Homes';
      } else if (this.referralID === '15') {
        this.referralType = 'Paid Kinship and Unlicensed';
      } else if (this.referralID === '2') {
        this.referralType = 'All Paid Placements - OOH';
      } else if (this.referralID === '16') {
        this.referralType = 'All Paid Placements - Paid Respite';
      }
      this.report_name_head = 'All Paid Placements' + ' (' + this.referralType + ') ';
      this.discription = 'All Paid Placements for the various programs. Select the Begin Date and End Date then process the report.';
    } else if (this.report_name_head == 'Active_ Authorization') {
      this.report_name_head = 'Active Authorizations Due - Placements';
      this.discription = 'Placement Authorizations open for at least a single day within the date range selected below, Active and Due during this period. The report may be processed for Out-of-Home Client (Reintegration and Family Preservation) or Non-contract Foster Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
    } else if (this.report_name_head == 'R F C Permand Closure Cases Report') {
      this.report_name_head = 'RFC Permanency and closure cases';
      this.discription = 'All Reintegration Cases that have achieved Permanency and/or Closure within the date range selected below. The report may be processed for ALL Out-of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriated Referral Type below.';
    } else if (this.report_name_head == 'R F C Open Cases') {

      if (this.referralID === '5') {
        this.referralType = 'Non-Contract Reintegration';
      } else if (this.referralID === '8') {
        this.referralType = 'Reintegration Foster Care';
      } else if (this.referralID === '12') {
        this.referralType = 'ALL Reintegration';
      }
      this.report_name_head = 'RFC Open Cases' + ' (' + this.referralType + ') ';

      this.discription = 'All Reintegration Open Cases within the date range selected below The report may be processed for ALL Out-of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
    } else if (this.report_name_head == 'Aged Out Report R F C Permanency And Closure Cases') {
      if (this.referralID === '5') {
        this.referralType = 'Non-Contract Reintegration';
      } else if (this.referralID === '8') {
        this.referralType = 'Reintegration Foster Care';
      } else if (this.referralID === '12') {
        this.referralType = 'ALL Reintegration';
      }
      this.report_name_head = 'Aged Out Report - RFC Permanency and closure cases' + ' (' + this.referralType + ') ';
      this.discription = 'All Out-Of-Home Referrals within the date range selected below. This report pulls clients based on their SFCS Referral Date - Out-of-home referral to SFCS. Select the processing dates referral types and region prior to processing';
    } else if (this.report_name_head == 'Aged Out Report R F C Open Cases') {
      if (this.referralID === '5') {
        this.referralType = 'Non-Contract Reintegration';
      } else if (this.referralID === '8') {
        this.referralType = 'Reintegration Foster Care';
      } else if (this.referralID === '12') {
        this.referralType = 'ALL Reintegration';
      }
      this.report_name_head = 'Aged Out Report - RFC Open Cases' + ' (' + this.referralType + ') ';
      this.discription = 'All Out-Of-Home Referrals within the date range selected below. This report pulls clients based on their SFCS Referral Date -- Out-of-home referral to SFCS. Select the processing dates, referral types and region prior to processing';
    } else if (this.report_name_head == 'F C- F P Out- Of- Home Placements') {
      this.report_name_head = 'FC-FP Out-Of-Home Placements - 13 Month Trend';
      this.discription = 'Process all Out-Of-Home Placements as of the END OF EACH MONTH for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and the Process the report.';
    } else if (this.report_name_head == 'R F C A Expected Revenue') {
      if (this.referralID === '5') {
        this.referralType = 'Non-Contract Reintegration';
      } else if (this.referralID === '8') {
        this.referralType = 'Reintegration Foster Care';
      } else if (this.referralID === '12') {
        this.referralType = 'ALL Reintegration';
      }
      this.report_name_head = 'RFC Referrals - By SFCS Referral Date' + ' (' + this.referralType + ') ';
      this.discription = 'All Out-Of-Home Referrals within the date range selected below.This report pulls clients based on their SFCS Referral Date -- Out-of-home referral to SFCS. Select the processing dates, referral types and region prior to processing';
    } else if (this.report_name_head == 'Case Activity Report') {
      if (this.referralID === '17') {
        this.referralType = 'Non-Contract Outpatient Services';
      }
      this.report_name_head = 'OPS Services-Case Activity' + ' (' + this.referralType + ') ';
      this.discription = 'All Outpatient Clients with Services (Case Activity) within the date range selected below. Select a Begin date and End Date for Services results needed and process the report.';
    } else if (this.report_name_head == 'Day Services Report') {
      this.report_name_head = 'Claims Posted - Other Services By Procode';
      this.discription = 'All Claims for Other Services (with an AuthorizationID but not a Placement and Not a Living Arrangement) for the procedure Code selected and posted within the date range below. Set the appropriate dates. the procedure code requested, and process the report. This report only pull claims for the placements that have been posted for payment.';
      this.showProcode = true;
    } else if (this.report_name_head == 'Claims Posted Other Services By Referral Type') {
      this.report_name_head = 'Claims Posted - Other Services By Referral Type';
      this.discription = 'All Claims for Other Services (with an AuthorizationID but not a Placement and Not a Living Arrangement) for the Referral Type selected and posted within the date range below. Set the appropriate dates. the Referral Type, and process the report. This report only pull claims for the placements that have been posted for payment.';
      this.showReferralType = true;
    } else if (this.report_name_head == 'Claims Posted Direct Claims By Procode') {
      this.report_name_head = 'Claims Posted - Direct Claims By Procode';
      this.discription = 'All Direct Claims (No AuthorizationID) for the Procedure Code selected and Posted within the date range below. Set the appropriate dates,the procedure Code requested, and process the report. This report only pull the Claims for Placements that have been posted for payment.';
      this.showProcode = true;
    } else if (this.report_name_head == 'Claims Posted Direct Claims By Referral Type') {
      this.report_name_head = 'Claims Posted - Direct Claims By Referral Type';
      this.discription = 'All Direct Claims (No AuthorizationID) for the Referral Type selected and Posted within the date range below. Set the appropriate dates,the Referral Type, and process the report. This report only pull the Claims for Placements that have been posted for payment.';
      this.showReferralType = true;
    } else if (this.report_name_head == 'Claim Services Direct Claims By Claim Status') {
      this.report_name_head = 'Claim Services - Direct Claims By Claim Status';
      this.discription = 'All Direct Claims (No AuthorizationID) with Service Begin or End Dates within the date range select below and the Claim Status provided.Set the appropriate dates,the Claim Status, and process the report.';
      this.showClaimStatus = true;       
    } else if (this.report_name_head == 'Claims Posted Direct Claims For F C H') {
      this.report_name_head = 'Claims Posted - Direct Claims For FCH';
      this.discription = 'All Foster Care Homes Direct Claims (No AuthorizationID) Posted within the date range below. Set the appropriate dates and process the report. This report only pulls Claims for Placements that have been posted for payment.';
    } else if (this.report_name_head == 'S R S Roster') {
      this.report_name_head = 'SRS Roster';
      this.discription = "The SRS Roster may be processed by entering an End Of Month date Program below and then selecting Process, or Exit if you don't want to process this report";
      this.showSrsRoster = true;
      this.showRegion = true;
      this.endDate = this._localValues.endDateOfPreviousMonth;
      this.dropRegion(this.endDate);
    }
    // if (this.report_name == 'Finance_PaidPlacements_Respite' || this.report_name == 'TD_Reintegration_OpenCases' || this.report_name == 'General_AuthDue_Placement' || this.report_name == 'Finance_PaidPlacements_OOH' || this.report_name == 'ClaimLivingArrangements_ReferralType' || this.report_name == 'ClaimPlacements_ReferralType' || this.report_name == 'TD_Reintegration_PermAndClosures_Controller') {
    //   this.showReferralType = true;
    // } else {
    //   this.showReferralType = false;
    // };

  }
  srs_data: any;
  ngOnInit() {
    this.getProcodes();
    this.getClaimStatus();
    if (this.showSrsRoster) {
      this.displayPop = 'none';
    }
    if (this.report_name_head == 'F C- F P Out- Of- Home Placements' || this.report_name_head == 'FC-FP Out-Of-Home Placements - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
    } else {
      this.beginDate_disable = false;
      this.beginDate = this._localValues.beginDateOfPreviousMonth;
      this.endDate = this._localValues.endDateOfPreviousMonth;
    }
    if (this.report_name == 'TD_Reintegration_OpenCases' || this.report_name == 'TD_Reintegration_PermAndClosures_Controller' || this.report_name == 'AOR_RFC_TD_Reintegration_PermAndClosures_Controller' ||
      this.report_name == 'AOR_RFC_TD_Reintegration_OpenCases' || this.report_name == 'TD_Reintegration_Referrals_SFCSReferralDate_Controller' || this.report_name == 'TD_OPS_CaseActivity_Controller') {
      this.showRegion = true;
      this.dropRegion(this.endDate);
    } else {
      this.showRegion = false;
    };
    this.referralList.push( 
      { referral: "In-Home", referralGroupID: 1 },
      { referral: "Out-Of-Home", referralGroupID: 2 },
      { referral: "Non-Contract Foster Care Homes", referralGroupID: 3 },
      { referral: "All", referralGroupID: 7 },
      { referral: "Reintegration Foster Care", referralGroupID: 8 },
      { referral: "Family Preservation Out-Of-Home", referralGroupID: 9 },
   );
  }
  getFinanceReports(init, end) {
    if (this.report_name_head == 'F C- F P Out- Of- Home Placements' || this.report_name_head == 'FC-FP Out-Of-Home Placements - 13 Month Trend') {
      this.temp_table = 'getReport';
    } else {
      this.temp_table = 'getReport';
    }
    this.getReportStatus = false;
    if (!this.showSrsRoster) {
      this.isValidDate = this.validateDates(this.beginDate, this.endDate);
    } else {
      this.isValidDate = true;
    }

    if (this.isValidDate) {
      if (this.report_name == 'Finance_PaidPlacements_Respite' || this.report_name == 'General_AuthDue_Placement' || this.report_name == 'Finance_PaidPlacements_OOH' || this.report_name == 'ClaimLivingArrangements_ReferralType' || this.report_name == 'ClaimPlacements_ReferralType') {
        this.fin_report_data = {
          "report": this.report_name,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "referralTypeID": parseInt(this.referralID),
          "beginPagination": init,
          "endPagination": end
        };
        this.getReportStatus = true;
      } else if (this.report_name == 'TD_Reintegration_OpenCases' || this.report_name == 'TD_Reintegration_PermAndClosures_Controller' ||
        this.report_name == 'AOR_RFC_TD_Reintegration_PermAndClosures_Controller' || this.report_name == 'AOR_RFC_TD_Reintegration_OpenCases' ||
        this.report_name == 'TD_Reintegration_Referrals_SFCSReferralDate_Controller' || this.report_name == 'TD_OPS_CaseActivity_Controller') {
        if (this.region == undefined || this.region == {}) {
          swal('Info', 'Please Select the Region.', 'warning');
        } else {
          this.region_name = this.region.DCFRegionGroup;
          this.fin_report_data = {
            "report": this.report_name,
            "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
            "endDate": this._localValues.report_end_dateAndTime(this.endDate),
            "referralTypeID": parseInt(this.referralID),
            "dCFRegionGroupID": this.region.DCFRegionGroupID,
            "beginPagination": init,
            "endPagination": end
          };
          this.getReportStatus = true;
        }
      } else if (this.report_name == 'Finance_ClaimOtherServices_Procode') {
        if (this.procodeID == undefined || this.procodeID == {}) {
          swal('Info', 'Please Select the Procode.', 'warning');
        } else {
          this.procodeName = this.procodeID.procode;
          this.fin_report_data = {
            "report": this.report_name,
            "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
            "endDate": this._localValues.report_end_dateAndTime(this.endDate),
            "procodeID": this.procodeID.procodeid,
            "beginPagination": init,
            "endPagination": end
          }
          this.getReportStatus = true;
        }
     } else if (this.report_name == 'FN_OtherServiceClaimsByRT') {
      if (this.referralGroupID == undefined || this.referralGroupID == {}) {
        swal('Info', 'Please Select the Referral Type.', 'warning');
      } else {
        this.referralName = this.referralGroupID.referral;
        this.req = {
          "report": this.report_name,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "referralGroupID":  this.referralGroupID.referralGroupID,
          "beginPagination": init,
          "endPagination": end,
          "isExport":false
       }
       this.isPredefined = true;
       this.getReportStatus = true;
      }
    } else if (this.report_name == 'FN_DirectAuthClaims_ClaimsByProcode') {
      if (this.procodeID == undefined || this.procodeID == {}) {
        swal('Info', 'Please Select the Procode.', 'warning');
      } else {
        this.procodeName = this.procodeID.procode;
        this.req = {
          "report": this.report_name,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "procodeID": this.procodeID.procodeid,
          "beginPagination": init,
          "endPagination": end,
          "isExport":false
        }
        this.isPredefined = true;
        this.getReportStatus = true;
      }
    } else if (this.report_name == 'FN_DirectAuthClaims_ClaimsByRT') {
      if (this.referralGroupID == undefined || this.referralGroupID == {}) {
        swal('Info', 'Please Select the Referral Type.', 'warning');
      } else {
        this.referralName = this.referralGroupID.referral;
        this.req = {
          "report": this.report_name,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "referralGroupID":  this.referralGroupID.referralGroupID,
          "beginPagination": init,
          "endPagination": end,
          "isExport":false
        }
      this.isPredefined = true;
      this.getReportStatus = true;
      }
    } else if (this.report_name == 'FN_DirectAuthClaims_ClaimsByStatus') {
      if (this.claimStatusID == undefined || this.claimStatusID == {}) {
        swal('Info', 'Please Select the Claim Status.', 'warning');
      } else {
        this.claims = this.claimStatusID.claimStatus;
        this.req = {
          "report": this.report_name,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "claimStatusID":  this.claimStatusID.claimStatusID,
          "beginPagination": init,
          "endPagination": end,
          "isExport":false
        }
        this.isPredefined = true;
        this.getReportStatus = true;
      }
    } else if (this.report_name == 'FN_DirectAuthClaims_ClaimsForFCH') {
      this.req = {
        "report": this.report_name,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "beginPagination": init,
        "endPagination": end,
        "isExport":false
      }
      this.isPredefined = true;
      this.getReportStatus = true;
    } else if (this.showSrsRoster) {
        if (this.region == undefined || this.region == {}) {
          swal('Info', 'Please Select the Region.', 'warning');
        } else {
          this.region_name = this.region.DCFRegionGroup
          var resub;
          if (this.isResubmission) {
            resub = 1
          } else {
            resub = 0
          }
          this.fin_report_data = {
            "report": this.report_name,
            "processDate": this._localValues.report_end_dateAndTime(this.endDate),
            "referralTypeID": 8,
            "resubmission": resub,
            "beginPagination": init,
            "endPagination": end,
            "dCFRegionGroupID": this.region.DCFRegionGroupID,
          };
          this.srs_data = this.fin_report_data;
          this.getReportStatus = true;
        }
      }
      else {
        this.fin_report_data = {
          "report": this.report_name,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "beginPagination": init,
          "endPagination": end
        };
        this.getReportStatus = true;
      }
      if (this.getReportStatus && !this.isPredefined) {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this.finance_report.getFinanceReport(this.fin_report_data, this.temp_table).then((data: any) => {
          if (data.financeReports.length != 0) {
            this.display = true;
            if (this.showSrsRoster) {
              // var a       = document.createElement('a');
              // a.href      = 'data:' + "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.financeReports));
              // a.download  = 'SRS-Roster.txt';
              // a.innerHTML = 'Save';
              // document.getElementById('container').appendChild(a);
              this.displayPop = 'block';

            };
            this.rowData = data.financeReports;
            this.exportQuery = data.query;
            this.showForm = true;
            let rowData = [];
            this.totalCount = data.totalCount;
            this.numericColumns = data.dataTypes;
            if (data.totalCount < 100) {
              this.end = this.totalCount;
            }
            this.rowData.map(data => {
              data;
              !isNullOrUndefined(data.PayorRate)
                ? data.PayorRate = data.PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.ReportPeriod_NetRevenue)
                ? data.ReportPeriod_NetRevenue = data.ReportPeriod_NetRevenue.toFixed(2)
                : null;

              !isNullOrUndefined(data.ReportPeriod_Total_PayorRate)
                ? data.ReportPeriod_Total_PayorRate = data.ReportPeriod_Total_PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.ReportPeriod_Total_ProviderRate)
                ? data.ReportPeriod_Total_ProviderRate = data.ReportPeriod_Total_ProviderRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.Total_PayorRate)
                ? data.Total_PayorRate = data.Total_PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.Total_ProviderRate)
                ? data.Total_ProviderRate = data.Total_ProviderRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.ProviderRate)
                ? data.ProviderRate = data.ProviderRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.UnitsAuth)
                ? data.UnitsAuth = data.UnitsAuth.toFixed(2)
                : null;

              !isNullOrUndefined(data.UnitsRemaining)
                ? data.UnitsRemaining = data.UnitsRemaining.toFixed(2)
                : null;

              !isNullOrUndefined(data.Auth_PayorRate)
                ? data.Auth_PayorRate = data.Auth_PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.TotalPayorRate)
                ? data.TotalPayorRate = data.TotalPayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.Units)
                ? data.Units = data.Units.toFixed(2)
                : null;

              !isNullOrUndefined(data.TotalProviderRate)
                ? data.TotalProviderRate = data.TotalProviderRate.toFixed(2)
                : null;
            });
            let arrangments = [];
            let test = [];
            this.headers.push(Object.keys(this.rowData[0]));
            this.headers[0].forEach(function (ele) {
              console.log("ele>>>>>", ele);
              let data = {
                headerName: ele
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace(/([A-Z])/g, " $1")
                  .trim(),
                field: ele
              };
              test.push(data);
            });
            test.sort((a, b) => a['order'] - b['order']);
            test
            this.rawdata.push(test);
            this.columnDefs = test;
            this.columnDefs.map(data => {
              data;
              if (data.field == 'DOB' || data.field == 'EndDate' || data.field == 'BeginDate' ||
                data.field == 'Auth_BeginDate' || data.field == 'Auth_EndDate' || data.field == 'EOMDate' ||
                data.field == 'ReferralDate' || data.field == 'ClosureDate' || data.field == 'PaymentEndDate' ||
                data.field == 'PL_BeginDate' || data.field == 'PL_EndDate' || data.field == 'OrigDCFReferralDate' ||
                data.field == 'PermClosureDate' || data.field == 'RetractedDate' || data.field == 'ReceivedDate' ||
                data.field == 'Event_BeginDate' || data.field == 'Recent_LOCAuthDate' || data.field == 'Recidivist_ReturnOOHDate' ||
                data.field == 'Adoption_LegallyAvailable' || data.field == 'Recent_CP_Completed'
                || data.field == 'Recent_CP_PlannedPerm' || data.field == 'Posted_EOMDate' || data.field == 'EnteredDate' || data.field == 'PostedDate' ||
                data.field == 'PaymentDueDate' || data.field == 'VoidDate' || data.field == 'ReleaseDate' || data.field == 'Event_EndDate' || data.field == 'Placement_BeginDate' || data.field == 'Placement_EndDate' ||
                data.field == 'AdoptionDate' || data.field == 'ADTrans_ReferralDate' || data.field == 'BilledDate') {
                data['valueFormatter'] = function (params) {
                  if (params.value) {
                    return moment.utc(params.value).format("MM/DD/YYYY");
                  } else {
                    return "";
                  }
                };
              }
              if (data.field == 'IsPermCode' || data.field == 'IsPermClosure' || data.field == 'Grade_IsComplete') {
                data['editable'] = false,
                  data['cellRenderer'] = params => {
                    if (params.value === null) {
                      return `<div style="border: 2px solid #072954;
                      padding: 6px;
                      width: 8%;
                      margin-top: 3px;
                      background-color: #7690b0;"></div>`
                    } else {
                      return `<input type='checkbox' style="background-color:red !important;" ${params.value ? 'checked' : ''} disabled />`;
                    }
                  }
              }
            });
            loader.style.display = "none";
          } else {
            this.rowData = data.financeReports;
            swal('Info', 'No Data Found.', 'warning');
            loader.style.display = "none";
          }
        }).catch(err => {
          loader.style.display = 'none';
        });
      } else if (this.getReportStatus && this.isPredefined) {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this.finance_report.getPredefinedReports(this.req).then((data: any) => {
          if (data.predefinedReports.length != 0) {
            this.display = true;
            this.rowData = data.predefinedReports;
            this.exportQuery = data.query;
            this.showForm = true;
            let rowData = [];
            this.totalCount = data.totalCount;
            this.numericColumns = data.dataTypes;
            if (data.totalCount < 100) {
              this.end = this.totalCount;
            }
            this.rowData.map(data => {
              data;
              !isNullOrUndefined(data.PayorRate)
                ? data.PayorRate = data.PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.ReportPeriod_NetRevenue)
                ? data.ReportPeriod_NetRevenue = data.ReportPeriod_NetRevenue.toFixed(2)
                : null;

              !isNullOrUndefined(data.ReportPeriod_Total_PayorRate)
                ? data.ReportPeriod_Total_PayorRate = data.ReportPeriod_Total_PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.ReportPeriod_Total_ProviderRate)
                ? data.ReportPeriod_Total_ProviderRate = data.ReportPeriod_Total_ProviderRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.Total_PayorRate)
                ? data.Total_PayorRate = data.Total_PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.Total_ProviderRate)
                ? data.Total_ProviderRate = data.Total_ProviderRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.ProviderRate)
                ? data.ProviderRate = data.ProviderRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.UnitsAuth)
                ? data.UnitsAuth = data.UnitsAuth.toFixed(2)
                : null;

              !isNullOrUndefined(data.UnitsRemaining)
                ? data.UnitsRemaining = data.UnitsRemaining.toFixed(2)
                : null;

              !isNullOrUndefined(data.Auth_PayorRate)
                ? data.Auth_PayorRate = data.Auth_PayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.TotalPayorRate)
                ? data.TotalPayorRate = data.TotalPayorRate.toFixed(2)
                : null;

              !isNullOrUndefined(data.Units)
                ? data.Units = data.Units.toFixed(2)
                : null;

              !isNullOrUndefined(data.TotalProviderRate)
                ? data.TotalProviderRate = data.TotalProviderRate.toFixed(2)
                : null;
            });
            let arrangments = [];
            let test = [];
            this.headers.push(Object.keys(this.rowData[0]));
            this.headers[0].forEach(function (ele) {
              console.log("ele>>>>>", ele);
              let data = {
                headerName: ele
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace(/([A-Z])/g, " $1")
                  .trim(),
                field: ele
              };
              test.push(data);
            });
            test.sort((a, b) => a['order'] - b['order']);
            test
            this.rawdata.push(test);
            this.columnDefs = test;
            this.columnDefs.map(data => {
              data;
              if (data.field == 'DOB' || data.field == 'EndDate' || data.field == 'BeginDate' ||
                data.field == 'Auth_BeginDate' || data.field == 'Auth_EndDate' || data.field == 'EOMDate' ||
                data.field == 'ReferralDate' || data.field == 'ClosureDate' || data.field == 'PaymentEndDate' ||
                data.field == 'PL_BeginDate' || data.field == 'PL_EndDate' || data.field == 'OrigDCFReferralDate' ||
                data.field == 'PermClosureDate' || data.field == 'RetractedDate' || data.field == 'ReceivedDate' ||
                data.field == 'Event_BeginDate' || data.field == 'Recent_LOCAuthDate' || data.field == 'Recidivist_ReturnOOHDate' ||
                data.field == 'Adoption_LegallyAvailable' || data.field == 'Recent_CP_Completed'
                || data.field == 'Recent_CP_PlannedPerm' || data.field == 'Posted_EOMDate' || data.field == 'EnteredDate' || data.field == 'PostedDate' ||
                data.field == 'PaymentDueDate' || data.field == 'VoidDate' || data.field == 'ReleaseDate' || data.field == 'Event_EndDate' || data.field == 'Placement_BeginDate' || data.field == 'Placement_EndDate' ||
                data.field == 'AdoptionDate' || data.field == 'ADTrans_ReferralDate' || data.field == 'BilledDate') {
                data['valueFormatter'] = function (params) {
                  if (params.value) {
                    return moment.utc(params.value).format("MM/DD/YYYY");
                  } else {
                    return "";
                  }
                };
              }
              if (data.field == 'IsPermCode' || data.field == 'IsPermClosure' || data.field == 'Grade_IsComplete') {
                data['editable'] = false,
                  data['cellRenderer'] = params => {
                    if (params.value === null) {
                      return `<div style="border: 2px solid #072954;
                      padding: 6px;
                      width: 8%;
                      margin-top: 3px;
                      background-color: #7690b0;"></div>`
                    } else {
                      return `<input type='checkbox' style="background-color:red !important;" ${params.value ? 'checked' : ''} disabled />`;
                    }
                  }
              }
            });
            loader.style.display = "none";
          } else {
            this.rowData = data.predefinedReports;
            swal('Info', 'No Data Found.', 'warning');
            loader.style.display = "none";
          }
        }).catch(err => {
          loader.style.display = 'none';
        });
      }
    }
  };
  validateDates(sDate, eDate) {
    if ((sDate == null || eDate == null)) {
      swal('Info', 'Start date and end date are required.', 'warning');
      this.isValidDate = false;
    } else if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      swal('Info', 'End date should be grater then Begin date.', 'warning');
      this.isValidDate = false;
    } else {
      return true;
    }

  }
  showSearchForm() {
    this.showForm = !this.showForm;
  };
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getFinanceReports(this.initial, this.end);
    }
  }
  type_metaData_list = [];
  getProcodes() {
    this.finance_report.getAllProcedes().then((data) => {
      this.type_metaData_list = data.procode;
    });
  };

  fillterPaymentTypes(event: any) {
    this.procodesList = [];
    this.type_metaData_list.filter((item: any) => {
      if (item.procode.toLowerCase().indexOf(event.query) !== -1) {
        this.procodesList.push(item);
      }
    })
  }
  type_metaData_claimlist = [];
  getClaimStatus() {
    this.finance_report.getAllClaims().then((data) => {
      this.type_metaData_claimlist = data.claimStatusList;
    })
  }
  filterClaimStatus(event: any) {
    this.claimList = [];
    this.type_metaData_claimlist.filter((item: any) => {
      if (item.claimStatus.toString().toLowerCase().indexOf(event.query) !== -1) {
        this.claimList.push(item);
      }
    })
  }
  clearDate() {
    this.router.navigate(['family/finance_report']);
  };
  exportAll(ex: any) {
    var beginDate = this._localValues.stringFormatDate(this.beginDate);
    var beginDAteArray = beginDate.split('-');
    var begindateFormat = beginDAteArray[1] + '-' + beginDAteArray[2] + '-' + beginDAteArray[0];
    var endDate = this._localValues.stringFormatDate(this.endDate);
    var endDAteArray = endDate.split('-');
    var enddateFormat = endDAteArray[1] + '-' + endDAteArray[2] + '-' + endDAteArray[0];
    if (this.report_name_head == 'F C H Placements And Costs') {
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), 'FCH Placements and Costs@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'J J F C Placements And Costs') {
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), 'JJFC Placements and Costs@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'RFC Open Cases' + ' (' + this.referralType + ') ') {
      var repo_head_name = 'RFC Open Cases' + ' (' + this.referralType + ' - ' + this.region_name + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'RFC Referrals - By SFCS Referral Date' + ' (' + this.referralType + ') ') {
      var repo_head_name = 'RFC Referrals - By SFCS Referral Date' + ' (' + this.referralType + ' - ' + this.region_name + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'OPS Services-Case Activity' + ' (' + this.referralType + ') ') {
      var repo_head_name = 'OPS Services-Case Activity' + ' (' + this.referralType + ' - ' + this.region_name + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Aged Out Report - RFC Permanency and closure cases' + ' (' + this.referralType + ') ') {
      var repo_head_name = 'Aged Out Report - RFC Permanency and closure cases' + ' (' + this.referralType + ' - ' + this.region_name + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Aged Out Report - RFC Open Cases' + ' (' + this.referralType + ') ') {
      var repo_head_name = 'Aged Out Report - RFC Open Cases' + ' (' + this.referralType + ' - ' + this.region_name + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'SRS Roster') {
      var repo_head_name = 'SRS Roster' + ' (' + this.region_name + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Claims Posted - Other Services By Procode') {
      var repo_head_name = 'Claims Posted - Other Services By Procode' + ' (' + this.procodeName + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Claims Posted - Other Services By Referral Type') {
      var repo_head_name = 'Claims Posted - Other Services By Referral Type' + ' (' + this.referralName + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Claims Posted - Direct Claims By Procode') {
      var repo_head_name = 'Claims Posted - Direct Claims By Procode' + ' (' + this.procodeName + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Claims Posted - Direct Claims By Referral Type') {
      var repo_head_name = 'Claims Posted - Direct Claims By Referral Type' + ' (' + this.referralName + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Claim Services - Direct Claims By Claim Status') {
      var repo_head_name = 'Claim Services - Direct Claims By Claim Status' + ' (' + this.claims + ') ';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else if (this.report_name_head == 'Claims Posted Direct Claims For FCH') {
      var repo_head_name = 'Claims Posted - Direct Claims For FCH';
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), repo_head_name + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    } else {
      this.exportAllService.getExport_report_All(this.exportQuery, isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'), this.report_name_head + '@for: ' + begindateFormat + ' - ' + enddateFormat, ex);
    }
  };
  dropRegion(regDate) {
    if (this.showRegion || this.showSrsRoster) {
      var req = {
        "reportEndDate": this._localValues.stringFormatDate(regDate),
      }
      this.finance_report.getFinanceRegion(req).then((data: any) => {
        this.regions = data.regionGroupList;
        this.region = data.regionGroupList[0];
      });
    }
    if (this.report_name_head == 'F C- F P Out- Of- Home Placements' || this.report_name_head == 'FC-FP Out-Of-Home Placements - 13 Month Trend') {
      this.beginDate = this._localValues.previous13month(regDate);
    }
  };
  onCloseHandled() {
    this.displayPop = 'none';
  };
  saveSrsRoster() {
    this.displayPop = 'none';
    this.srs_data['staffID'] = parseInt(localStorage.getItem('UserId')) || 4620;
    this.finance_report.saveSRSroster(this.srs_data).then((data: any) => {
      swal('Success!', 'Saved successfully. You can see the exported files and their status in "My exports" page', 'success');
    })
  }
};
