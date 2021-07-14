import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
@Component({
  selector: "app-non-contract",
  templateUrl: "./non-contract.component.html",
  styleUrls: ["./non-contract.component.scss"]
})
export class NonContractComponent implements OnInit {
  listOfReferral: any = [];
  nc_bh_value = true;
  nc_fch_value : boolean;
  isAttachmentRequired = true;
  formStatus: any;
  form_navigation: any;
  moreActions: any;
  title: any;
  subtitle: any;
  selectedReferral: any={ ReferralType: "NC-FI", display: "NC-FI" };
  breadcrumbs = [];
  status: any;
  mainTabs: { label: string; href: string }[];
  nc_fi_data: any = {
    client: "",
    adult: "",
    hoh: ""
  };
  nc_fi_indexSatus: boolean;
  nc_fi_indexID: any;
  main_ops_Tabs: { label: string; href: string }[];
  nc_ops_value: boolean;
  nc_rfc_value: boolean;
  main_rfc_Tabs: { label: string; href: string }[];
  main_fch_Tabs: { label: string; href: string; }[];
  sIndex: number;
  constructor() {}
  ngOnInit() {
    this.nc_fi_dataTabs();
    this.nc_ops_dataTabs();
    this.nc_rfc_dataTabs();
    this.nc_fch_dataTabs();
    this.setIndex(0);
    this.listOfReferral.push(
      { ReferralType: "NC-OPS", display: "NC-OPS" },
      { ReferralType: "NC-RFC", display: "NC-RFC" },
      { ReferralType: "NC-FCH", display: "NC-FCH" },
      { ReferralType: "NC-FI", display: "NC-FI" }
    );
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", active: "active" }
    );
  }
  onChangeReferrel(event) {
    if (event.ReferralType == "NC-FI") {
      this.nc_bh_value = true;
      this.nc_fch_value = false;
      this.nc_ops_value = false;
      this.nc_rfc_value = false;
    } else if (event.ReferralType == "NC-OPS") {
      this.nc_fch_value = false;
      this.nc_ops_value = true;
      this.nc_bh_value = false;
      this.nc_rfc_value = false;
    } else if (event.ReferralType == "NC-RFC") {
      this.nc_fch_value = false;
      this.nc_ops_value = false;
      this.nc_rfc_value = true;
      this.nc_bh_value = false;
    } else if (event.ReferralType == "NC-FCH") {
      this.nc_fch_value = true;
      this.nc_ops_value = false;
      this.nc_rfc_value = false;
      this.nc_bh_value = false;
    }
  };
  setIndex(index: number) {
    this.sIndex = index;
  };
  nc_fi_dataTabs() {
    return (this.mainTabs = [
      { label: "Select FIS Number", href: "#nav-1" },
      { label: "Initial Details", href: "#nav-2" },
      { label: "Time Of Referral", href: "#nav-3" }
    ]);
  }
  nc_ops_dataTabs() {
    return (this.main_ops_Tabs = [
      { label: "Client Information", href: "#ops_nav-1" },
      { label: "Select Procedure Code", href: "#ops_nav-2" },
      { label: "Select Service Type", href: "#ops_nav-3" }
    ]);
  }
  nc_rfc_dataTabs() {
    return (this.main_rfc_Tabs = [
      { label: "Cases", href: "#rfc_nav-1" },
      { label: "Select Procedure Code", href: "#rfc_nav-2" }
    ]);
  }
  nc_fch_dataTabs() {
    return (this.main_fch_Tabs = [
      { label: "Select Client", href: "#fch_nav-1" },
      { label: "Select Detail", href: "#fch_nav-2" }
    ]);
  }
  nc_fi_list = [];
  add_nc_fi_data() {
    if (this.nc_fi_indexSatus) {
      this.nc_fi_list[this.nc_fi_indexID] = this.nc_fi_data;
      this.nc_fi_data = {
        client: "",
        adult: "",
        hoh: ""
      };
      this.nc_fi_indexSatus = false;
      swal("Success", "FIS Member has been updated!", "success");
    } else {
      this.nc_fi_list.push(this.nc_fi_data);
      this.nc_fi_data = {
        client: "",
        adult: "",
        hoh: ""
      };
      swal("Success", "FIS Member has been Created!", "success");
    }
  }

  view_nc_fiTime(nc_fi_data, id) {
    console.log("nc_fi_data" + id + "Index>>>", nc_fi_data);
    this.nc_fi_data = nc_fi_data;
    this.nc_fi_indexID = id;
    this.nc_fi_indexSatus = true;
  }
  deletenc_fiTime(id) {
    this.nc_fi_list.splice(id, 1);
  }
}
