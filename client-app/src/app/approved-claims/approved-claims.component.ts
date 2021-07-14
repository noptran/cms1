import { Component, OnInit } from "@angular/core";
import { ProviderService } from "./../provider/provider.service";
import swal from "sweetalert2";
import * as moment from "moment";
import { PagesizeService } from "../pagesize/pagesize.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "app-approved-claims",
  templateUrl: "./approved-claims.component.html",
  styleUrls: ["./approved-claims.component.scss"],
})
export class ApprovedClaimsComponent implements OnInit {
  allProviderList = [];
  allProviderDetails = [];
  total_payorRate = 0;

  provide_totalCount = 0;
  provide_initial = 1;
  provide_end = 100;

  provide_detail_totalCount = 0;
  provide_detail_initial = 1;
  provide_detail_end = 100;
  selectedPayorProvider: any;

  constructor(
    public providerService: ProviderService,
    public _pageSize: PagesizeService
  ) { }

  ngOnInit() {
    this.allClaimStatus();
  }
  infoText: any;
  downloadFile: any;
  showConfirmation = false;
  overLayLoader: any;
  getProviderList(provide_initial, provide_end) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let reqdata;
    reqdata = {
      beginPagination: provide_initial,
      endPagination: provide_end,
    };
    this.providerService
      .getProviderPayee(reqdata)
      .then((data: any) => {
        if (data.filePath) {
          this.overLayLoader = document.getElementById(
            "loading-overlay"
          ) as HTMLElement;
          this.overLayLoader.style.display = "block";
          this.showConfirmation = true;
          this.downloadFile = data.filePath;
          this.infoText = data.responseMessage;
        }

        this.allProviderList = data.providerPayeeList;
        this.provide_totalCount = data.totalCount;
        if (data.totalCount < 100) {
          this.provide_end = this.provide_totalCount;
        }
        this.allProviderList.map((itm) => {
          itm.dis_state = true;
          itm.chck_state = false;
          if (itm.Provider) {
            itm.pro_type = "Provider";
          } else {
            itm.pro_type = "Payee";
          }
        });
        this.providerDetail(
          this.allProviderList[0],
          this.provide_detail_initial,
          100
        );
        this.firstLevelActiveMenu(this.allProviderList[0].ProviderPayeeID);
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  fileDownload() {
    window.location.href = this.downloadFile;
    this.overLayLoader.style.display = "none";
    this.showConfirmation = false;
  }
  selectedFirstLevelMenu = [];
  exportReq = {};
  provideSelectdata = {};
  providerDetail(providedata, begin, end) {
    this.provideSelectdata = providedata;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let isDisableVender;
    if (providedata.VenderID) {
      isDisableVender = true;
    } else {
      isDisableVender = false;
    }
    let reqdata;
    reqdata = {
      beginPagination: begin,
      endPagination: end,
      providerID: providedata.ProviderPayeeID,
      isProvider: providedata.Provider,
      isExport: false,
    };
    this.exportReq = reqdata;
    this.provide_detail_totalCount = 0;
    this.providerService
      .getProviderByID(reqdata)
      .then((data: any) => {
        this.savePro_lists = [];
        data.claimsList.map((itm) => {
          itm.PaySemi_Monthly = itm["PaySemi-Monthly"];
          this.allClaims.forEach((ele) => {
            if (itm.ClaimStatus == ele.claimStatusID) {
              itm.ClaimStatus = ele;
            }
          });
          this.paymentTypelist.forEach((ele) => {
            if (itm.PaymentType == ele.paymentTypeID) {
              console.log("<<itm.PaymentType>>>>>", itm.PaymentType);
              console.log("ele.paymentTypeID>>>>>", ele.paymentTypeID);
              itm.PaymentType = ele.paymentType;
              itm.paymentTypeID = ele.paymentTypeID;
              console.log("itm.paymentTypeID>>>>>", itm.paymentTypeID);
            }
          });
        });
        this.allProviderDetails = data.claimsList;
        this.allProviderDetails.map((ele) => {
          var BeginDate = new Date(ele.BeginDate);
          var EndDate = new Date(ele.EndDate);
          var ReceivedDate = new Date(ele.ReceivedDate);
          ele.BeginDate = moment(BeginDate).format("YYYY/MM/DD");
          ele.EndDate = moment(EndDate).format("YYYY/MM/DD");
          ele.ReceivedDate = moment(ReceivedDate).format("YYYY/MM/DD");
          ele.isDisableVender = isDisableVender;
        });
        this.provide_detail_totalCount = data.totalCount;

        if (data.totalCount < 100) {
          this.provide_detail_end = this.provide_detail_totalCount;
        }

        loader.style.display = "none";
        this.total_payorRate = data.claimsList
          .reduce((sum, item) => sum + item.TotalPayor, 0)
          .toFixed(2);
        this.select_total_payorRate = 0;
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  selectActiveMenuItem: any;
  firstLevelActiveMenu(activeMenu) {
    this.allProviderList.map((irm) => {
      if (irm.ProviderPayeeID == activeMenu) {
        irm.dis_state = false;
        irm.chck_state = false;
      } else {
        irm.dis_state = true;
        irm.chck_state = false;
      }
    });
    this.selectActiveMenuItem = activeMenu;
  }
  allClaims = [];
  allClaimStatus() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.providerService
      .getAllClaims()
      .then((data: any) => {
        this.allClaims = data.claimStatusList;
        this.getPaymentTypeList();
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  paymentTypelist = [];
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
      return this.getProviderList(this.provide_initial, this.provide_end);
    }
  }

  provide_detail_pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.provide_detail_initial = begin;
      this.provide_detail_end = end;
      // return this.providerDetail(this.provideSelectdata, this.provide_detail_initial, this.provide_detail_end);
    }
  }
  provide_detail_pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.provide_detail_initial = begin;
      this.provide_detail_end = end;
      return this.providerDetail(
        this.provideSelectdata,
        this.provide_detail_initial,
        this.provide_detail_end
      );
    }
  }

  getPaymentTypeList() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let reqdata;
    reqdata = {
      Object: "paymentType",
      value: "",
    };
    this.providerService
      .getPaymentType(reqdata)
      .then((data: any) => {
        this.paymentTypelist = data.dropDown;
        this.getProviderList(this.provide_initial, this.provide_end);
        loader.style.display = "none";
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  savePro_lists = [];
  select_total_payorRate = 0;
  all_claimApproved(pro_data, event) {
    this.approveCheckBoxConditions(pro_data);
    if (event) {
      let providers = this.allProviderDetails;
      providers.map((itm) => {
        ///////

        if (itm.paymentTypeID === 1) {
          if (itm.paymentTypeID === 1 && itm.PayorRate === 0) {
            itm.ClaimStatus = { claimStatus: "Posted", claimStatusID: 1 };
            itm.Approve = true;

            // providers.map(itm => {
            //   if (itm.ClaimID == datas.ClaimID) {
            //     itm.ClaimStatus = {"claimStatus":"Posted","claimStatusID":1};
            //   }
            // });
          } else if (itm.paymentTypeID === 1 && itm.Recoup_ClaimID != null) {
            itm.ClaimStatus = { claimStatus: "Recoup", claimStatusID: 4 };
            itm.Approve = true;
            // providers.map(itm => {
            //   if (itm.ClaimID == datas.ClaimID) {
            //     itm.ClaimStatus = {"claimStatus":"Recoup","claimStatusID":4};
            //   }
            // });
          } else {
            itm.ClaimStatus = 6;
            itm.Approve = { claimStatus: "Approved", claimStatusID: 6 };
            // providers.map(itm => {
            //   if (itm.ClaimID == datas.ClaimID) {
            //     itm.ClaimStatus = {"claimStatus":"Approved","claimStatusID":6};
            //   }
            // });
          }
        } else {
          itm.ClaimStatus = { claimStatus: "Approved", claimStatusID: 6 };
          itm.Approve = true;
          // providers.map(itm => {
          //   if (itm.ClaimID == datas.ClaimID) {
          //     itm.ClaimStatus = 6;
          //   }
          // });
        }

        /////
      });
      this.allProviderDetails = providers;
      this.allProviderDetails.map((itm_ele) => {
        var datas = {
          providID: pro_data.ProviderPayeeID,
          claimID: itm_ele.ClaimID,
          claimStatusID: itm_ele.ClaimStatus,
          paymentDueDate: itm_ele.ExpectedPaymentDate,
          postedDate: itm_ele.PostedDate,
          voidDate: itm_ele.VoidDate,
          paymentNotes: itm_ele.PaymentNotes,
          notes: itm_ele.Notes,
          scriptsFlag: itm_ele.ScriptsFlag,
          glKey: itm_ele.GLKey,
          TotalPayor: itm_ele.TotalPayor,
        };
        this.savePro_lists.push(datas);
        this.select_total_payorRate = this.savePro_lists
          .reduce((sum, item) => sum + item.TotalPayor, 0)
          .toFixed(2);
      });
    } else {
      this.savePro_lists.map((item: any) => {
        if (item.providID == pro_data.ProviderPayeeID) {
          this.savePro_lists.splice(this.savePro_lists.indexOf(item), 1);
        }
      });
      this.providerDetail(pro_data, this.provide_detail_initial, 100);
      // let providers = this.allProviderDetails;
      // providers.map(itm=>{
      //   itm.ClaimStatus=2;
      //   itm.Approve=false;
      // });
      // this.allProviderDetails = providers;
    }
    this.approvalCheckBoxConditionsCheck(this.savePro_lists);
    console.log("this.savePro_lists>>>>", this.savePro_lists);
  }
  single_claimApproved(index, datas, event) {
    this.EnteredBy = datas.EnteredBy;
    this.EnteredDate = datas.EnteredDate;
    this.ChangedBy = datas.ChangedBy;
    this.ChangedDate = datas.ChangedDate;
    let selectDatas = [];
    console.log("datas>>", datas);
    let providers;
    if (event) {
      providers = this.allProviderDetails;
      if (datas.paymentTypeID === 1) {
        if (datas.paymentTypeID === 1 && datas.PayorRate === 0) {
          providers.map((itm) => {
            if (itm.ClaimID == datas.ClaimID) {
              itm.ClaimStatus = { claimStatus: "Posted", claimStatusID: 1 };
            }
          });
        } else if (datas.paymentTypeID === 1 && datas.Recoup_ClaimID != null) {
          providers.map((itm) => {
            if (itm.ClaimID == datas.ClaimID) {
              itm.ClaimStatus = { claimStatus: "Recoup", claimStatusID: 4 };
            }
          });
        } else {
          providers.map((itm) => {
            if (itm.ClaimID == datas.ClaimID) {
              itm.ClaimStatus = { claimStatus: "Approved", claimStatusID: 6 };
            }
          });
        }
      } else {
        providers.map((itm) => {
          if (itm.ClaimID == datas.ClaimID) {
            itm.ClaimStatus = { claimStatus: "Posted", claimStatusID: 1 };
          }
        });
      }

      this.allProviderDetails = providers;
      this.allProviderDetails.map((itr) => {
        if (itr.Approve) {
          selectDatas.push(itr.TotalPayor);
          if (selectDatas.length == 0) {
            this.select_total_payorRate = 0;
          } else {
            this.select_total_payorRate = selectDatas
              .reduce((sum, item) => sum + item, 0)
              .toFixed(2);
          }
        }
      });
      console.log("IF----selectDatas>>>>", selectDatas);
    } else {
      console.log("----ELSE__selectDatas>>>>", selectDatas);
      providers = this.allProviderDetails;
      providers[index].ClaimStatus = {
        claimStatus: "Hold",
        claimStatusID: 2,
      };
      this.allProviderDetails = providers;
      if (selectDatas.length == 0) {
        this.select_total_payorRate = 0;
      }
      this.allProviderDetails.map((itr) => {
        console.log("----ELSE_>>>>_selectDatas>>>>", selectDatas);
        if (itr.Approve) {
          selectDatas.push(itr.TotalPayor);
          if (selectDatas.length == 0) {
            this.select_total_payorRate = 0;
          } else {
            this.select_total_payorRate = selectDatas
              .reduce((sum, item) => sum + item, 0)
              .toFixed(2);
          }
        }
      });
      console.log("ELSE__selectDatas>>>>", selectDatas);
      // let providers = this.allProviderDetails;
      // providers.map(itm => {
      //   if (itm.ClaimID == datas.ClaimID) {
      //     itm.ClaimStatus = 2;
      //   }
      // });
      // this.allProviderDetails = providers;
    }
  }
  EnteredBy: any;
  EnteredDate: any;
  ChangedBy: any;
  ChangedDate: any;
  selectClaimStatus(index, provideData) {
    let providers;
    let selectDatas = [];

    console.log("provideData>>>>", provideData);
    if (provideData.ClaimStatus.claimStatus == "Approved") {
      providers = this.allProviderDetails;
      providers[index].Approve = true;
      this.allProviderDetails = providers;
      this.allProviderDetails.map((itr) => {
        if (itr.Approve) {
          selectDatas.push(itr.TotalPayor);
          if (selectDatas.length == 0) {
            this.select_total_payorRate = 0;
          } else {
            this.select_total_payorRate = selectDatas
              .reduce((sum, item) => sum + item, 0)
              .toFixed(2);
          }
        }
      });
    } else if (provideData.ClaimStatus.claimStatus == "Posted") {
      providers = this.allProviderDetails;
      providers[index].Approve = true;
      this.allProviderDetails = providers;
      this.allProviderDetails.map((itr) => {
        if (itr.Approve) {
          selectDatas.push(itr.TotalPayor);
          if (selectDatas.length == 0) {
            this.select_total_payorRate = 0;
          } else {
            this.select_total_payorRate = selectDatas
              .reduce((sum, item) => sum + item, 0)
              .toFixed(2);
          }
        }
      });
    } else if (provideData.ClaimStatus.claimStatus == "Recoup") {
      providers = this.allProviderDetails;
      providers[index].Approve = true;
      this.allProviderDetails = providers;
      this.allProviderDetails.map((itr) => {
        if (itr.Approve) {
          selectDatas.push(itr.TotalPayor);
          if (selectDatas.length == 0) {
            this.select_total_payorRate = 0;
          } else {
            this.select_total_payorRate = selectDatas
              .reduce((sum, item) => sum + item, 0)
              .toFixed(2);
          }
        }
      });
    } else {
      providers = this.allProviderDetails;
      providers[index].Approve = false;
      this.allProviderDetails = providers;
      if (selectDatas.length == 0) {
        this.select_total_payorRate = 0;
      }
      this.allProviderDetails.map((itr) => {
        if (itr.Approve) {
          selectDatas.push(itr.TotalPayor);
          console.log("selectDatas>>>>", selectDatas);
          if (selectDatas.length == 0) {
            this.select_total_payorRate = 0;
          } else {
            this.select_total_payorRate = selectDatas
              .reduce((sum, item) => sum + item, 0)
              .toFixed(2);
          }
        }
      });
    }
    console.log("<<<<selectDatas>>>>", selectDatas);
  }

  saveClaims() {
    let reqdata;
    let savePro_lists = [];
    this.allProviderDetails.map((itm_ele) => {
      if (itm_ele.Approve) {
        reqdata = {
          claimID: itm_ele.ClaimID,
          claimStatusID: isNullOrUndefined(itm_ele.ClaimStatus.claimStatusID)
            ? itm_ele.ClaimStatus
            : itm_ele.ClaimStatus.claimStatusID,
          paymentDueDate: itm_ele.ExpectedPaymentDate,
          postedDate: itm_ele.PostedDate,
          voidDate: itm_ele.VoidDate,
          paymentNotes: itm_ele.PaymentNotes,
          notes: itm_ele.Notes,
          scriptsFlag: itm_ele.ScriptsFlag,
          glKey: itm_ele.GLKey,
        };
        savePro_lists.push(reqdata);
      }
    });
    console.log("this.savePro_lists>>>>", savePro_lists);
    if (savePro_lists.length === 0) {
      swal("Info", "Please Select the Claim", "warning");
    } else {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      var req = { claimsList: savePro_lists };
      this.providerService
        .saveProviderPayee(req)
        .then((data: any) => {
          loader.style.display = "none";
          swal("Success", "Successfully Saved!", "success");
          this.allClaimStatus();
        })
        .catch((error) => {
          loader.style.display = "none";
        });
    }
  }
  exportFile() {
    let date = Date.now();
    this.exportReq["isExport"] = true;
    this.exportReq["beginPagination"];
    this.exportReq["endPagination"];
    this.exportReq["fileName"] =
      "Approved_Claims " + moment(date).format("YYYY-MM-DD");
    this.providerService
      .getProviderByID(this.exportReq)
      .then((data: any) => {
        if (data.filePath) {
          window.location.href = data.filePath;
        }
      })
      .catch((error) => { });
  }

  public approveCheckBoxConditions(selectedData: any) {
    console.log("Selected Data", selectedData);
    this.selectedPayorProvider = selectedData;
    // selectedData for
  }

  public approvalCheckBoxConditionsCheck(claimsList: any) {
    console.log("Selected provider payee", this.selectedPayorProvider);
    console.log("Claims List", claimsList);
  }

  public claimsSelectionCheckBoxVisbility(data: any) {
    if (data.isDisableVender && data.PaySponsor) {
      return false;
    } else if (data.isDisableVender && !data.PaySponsor) {
      return false;
    } else if (!data.isDisableVender && data.PaySponsor) {
      return false;
    } else {
      return true;
    }
  }
  getEnteredChanges(datas) {
    this.EnteredBy = datas.EnteredBy;
    this.EnteredDate = datas.EnteredDate;
    this.ChangedBy = datas.ChangedBy;
    this.ChangedDate = datas.ChangedDate;
  }
}
