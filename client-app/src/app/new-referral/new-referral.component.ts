import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-referral",
  templateUrl: "./new-referral.component.html",
  styleUrls: ["./new-referral.component.scss"]
})
export class NewReferralComponent implements OnInit {
  listOfReferral: any = [];
  nc_bh_value = true;
  nc_fch_value = false;
  isAttachmentRequired = true;
  breadcrumbs = [];
  formStatus: any;
  form_navigation: any;
  moreActions: any;
  title: any;
  subtitle: any;
  selectedReferral: any;
  status: any;
  
  constructor() {}
  ngOnInit() {
    this.listOfReferral.push(
      { ReferralType: "NC-BH", display: "NC-BH OK Referral" },
      { ReferralType: "NC-FCH", display: "NC-FCH OK Referral" },
      { ReferralType: "BH", display: "BH OK Referral" }
    );
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', active: 'active' },
  )
  }
  onChangeReferrel(event) {
    if (event.ReferralType == "NC-BH" || event.ReferralType == "BH") {
      this.nc_bh_value = true;
      this.nc_fch_value = false;
    } else if (event.ReferralType == "NC-FCH") {
      this.nc_fch_value = true;
      this.nc_bh_value = false;
    }
  }
}
