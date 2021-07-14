import { Component, OnInit } from "@angular/core";
import { ProviderService } from "./../provider/provider.service";
import swal from "sweetalert2";
import * as moment from "moment";
import { PagesizeService } from "../pagesize/pagesize.service";
import {LocalValues} from "../local-values";

@Component({
  selector: "app-add-other-service-batch-account-payable",
  templateUrl: "./add-other-service-batch-account-payable.component.html",
  styleUrls: ["./add-other-service-batch-account-payable.component.scss"],
})
export class AddOtherServiceBatchAccountPayableComponent implements OnInit {
  allServices = [];
  allServicesHeaders = [];
  allServicesTest = [];
  allServicesDefs = [];
  defaultColumn: any;
  batchNameList = [];

  provide_totalCount = 0;
  provide_initial = 1;
  provide_end = 100;
  AddtoBatch = [];
  paymentDueDate = new Date();

  constructor(
    public _localValues: LocalValues,
    public providerService: ProviderService,
    public _pageSize: PagesizeService
  ) {}

  ngOnInit() {
    this.allClaimStatus();
    this.defaultColumn = {
      width: 100,
    };
    this.All_batchNameList();
  }
  allClaims = [];
  getAllOtherService(provide_initial, provide_end) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req;
    let sort;
    if (this.is_sort) {
      req = {
        beginPagination: provide_initial,
        endPagination: provide_end,
        sort: this.sortReq,
      };
      if (this.sortReq.column === "Add to Batch") {
        req["claimIDs"] = this.claimIDS;
      } else {
        delete req["claimIDs"];
      }
    } else {
      req = {
        beginPagination: provide_initial,
        endPagination: provide_end,
      };
    }
    this.providerService.getExicitingService(req).then((data) => {
      data.claimsList.map((itm) => {
        itm.TotalPayorRate = itm.TotalPayorRate.toFixed(2);
        if (itm["Add to Batch"]) {
          this.claimIDS.push(itm.ClaimID);
        }
        itm["AddtoBatch"] = itm["Add to Batch"];
        this.allClaims.forEach((ele) => {
          if (itm.ClaimStatus == ele.claimStatusID) {
            itm.ClaimStatus = ele;
          }
        });
      });
      this.allServices = data.claimsList;
      this.claimIDS.forEach((element) => {
        this.allServices.map((rwData) => {
          if (element === rwData.ClaimID) {
            rwData.AddtoBatch = true;
          }
        });
      });
      this.provide_totalCount = data.totalCount;
      if (data.totalCount < 100) {
        this.provide_end = this.provide_totalCount;
      }
      loader.style.display = "none";
      let chars = this.claimIDS;
      let uniqueChars = [...new Set(chars)];
      this.claimIDS = uniqueChars;
    });
  }
  allClaimStatus() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.providerService
      .getAllClaims()
      .then((data: any) => {
        this.allClaims = data.claimStatusList;
        this.getAllOtherService(this.provide_initial, this.provide_end);
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  batchName: any;
  All_batchNameList() {
    var req = {
      isOtherAgency: null,
      isOtherService: true,
    };
    this.providerService.listOfBatchName(req).then((data) => {
      this.batchNameList = data.batchNameList;
      this.batchName = data.batchNameList[0];
    });
  }
  metaData = [];
  fillterBatchName(event: any) {
    this.metaData = [];
    this.batchNameList.filter((item: any) => {
      if (
        item.ClaimBatchName.toString().toLowerCase().indexOf(event.query) !== -1
      ) {
        this.metaData.push(item);
      }
    });
  }

  provide_pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.provide_initial = begin;
      this.provide_end = end;
      // return this.getProviderList(this.provide_initial, this.provide_end);
    }
  }
  provide_pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.provide_initial = begin;
      this.provide_end = end;
      return this.getAllOtherService(this.provide_initial, this.provide_end);
    }
  }

  claimIDS = [];
  getClaimIds(index, claimData, event) {
    if (event.target.checked) {
      this.claimIDS.push(claimData.ClaimID);
      let chars = this.claimIDS;
      let uniqueChars = [...new Set(chars)];
      this.claimIDS = uniqueChars;
      console.log(uniqueChars);
    } else {
      var inde = this.claimIDS
        .map((o) => {
          return o;
        })
        .indexOf(claimData.ClaimID);
      this.claimIDS.splice(inde, 1);
    }
    // this.claimIDS.filter((v,i) => this.claimIDS.indexOf(v) == i)
    console.log("this.claimIDS>>>>", this.claimIDS);
  }
  checkAll_batch() {
    // this.claimIDS = [];
    this.allServices.map((itm) => {
      itm["AddtoBatch"] = true;
      this.claimIDS.push(itm.ClaimID);
    });

    var result = [];
    this.claimIDS.forEach(function (item) {
      if (result.indexOf(item) < 0) {
        result.push(item);
      }
    });

    this.claimIDS = result;
    let chars = this.claimIDS;
    let uniqueChars = [...new Set(chars)];
    this.claimIDS = uniqueChars;
    console.log("<<<this.claimIDS>>>>", this.claimIDS);
  }
  unCheckAll() {
    this.claimIDS = [];
    this.allServices.map((itm) => {
      itm["AddtoBatch"] = false;
    });
    let chars = this.claimIDS;
    let uniqueChars = [...new Set(chars)];
    this.claimIDS = uniqueChars;
  }
  saveBatch() {
    let chars = this.claimIDS;
    let uniqueChars = [...new Set(chars)];
    this.claimIDS = uniqueChars;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var req = {
      paymentDueDate: this._localValues.stringFormatDatetime(
        this.paymentDueDate
      ),
      claimIDs: this.claimIDS,
    };
    this.providerService.saveBatchName(req).then((data) => {
      loader.style.display = "none";
      this.getAllOtherService(this.provide_initial, this.provide_end);
      swal("Success", "Successfully Saved!", "success");
    });
  }
  sort_status: boolean = false;
  is_sort = false;
  sortReq: any;
  sortingAddBatch(sortKey, isSort) {
    this.is_sort = true;
    let sort;
    if (isSort) {
      this.sort_status = !this.sort_status;
    }
    if (this.sort_status) {
      this.sortReq = {
        column: sortKey,
        mode: "asc",
      };
    } else {
      this.sortReq = {
        column: sortKey,
        mode: "desc",
      };
    }
    this.getAllOtherService(1, 100);
  }

  openSaveDialogBox(event) {
    // openSaveDialogBox
  }
  
}
