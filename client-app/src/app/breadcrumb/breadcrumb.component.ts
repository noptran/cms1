import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  inputs: ["data"],
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
  outputs: ["breadCrumOut"],
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  data: any;

  @Output()
  breadCrumOut = new EventEmitter();

  constructor(public _router: Router) { }

  ngOnInit() { }

  generateBreadCrumbs() {
    if (this.data.length > 0) {
    }
  }
  navigateTo(url) {
    if (url === "attachment") {
      this.breadCrumOut.emit("attachmentClose");
    }
    if (url.includes("/reports/opencards/list/client/case")) {
      return this._router.navigate([url], { queryParamsHandling: "preserve" });
    }
    if (url === "/reintegration/referral/opencard/placement-referral/view") {
      return this._router.navigate([url], { queryParams: { pl_ref_id: null }, queryParamsHandling: "merge" });
    }
    if (url === "/reports/opencards/list/client/case") {
      return this._router.navigate([url], { queryParams: { ref_id: null } });
    }
    else if (
      url.includes("reintegration/referral/opencard/placement/detail")
    ) {
      return this._router.navigate([url], {
        queryParams: { sub: "" },
        queryParamsHandling: "merge",
      });
    }
    else {
      return this._router.navigate([url], { queryParamsHandling: "preserve" });
    }
    // return this._router.navigate([url])
  }
}
