import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DonationService } from "../donation.service";
import { Subscription } from "rxjs";
import { GridOptions } from "ag-grid/main";
// only import this if you are using the ag-Grid-Enterprise
// import "ag-grid-enterprise";
@Component({
  selector: "app-donation-list",
  templateUrl: "./donation-list.component.html",
  styleUrls: ["./donation-list.component.scss"],
})
export class DonationListComponent implements OnInit {
  gridOptions: GridOptions;
  icons: any;
  public rowData: any[];
  public columnDefs: any[];
  public rowCount: string;
  Sidenav: any;
  loaderController: any;
  onReady: any;

  public subscription: Subscription;
  constructor(
    public router: Router,
    public DonationService: DonationService
  ) {
    this.gridOptions = <GridOptions>{};
    this.createColumnDefs();
    this.allDonationList();
    this.DonationService.sendMessage("DonarList");

    this.subscription = this.DonationService.getMessage().subscribe(
      (message) => {
        console.log("message>>>>", message);
        if (message) {
          let sendParams = {
            domain: [message],
            model: "donation.profile",
            fields: [],
            offset: null,
            limit: null,
          };
        } else {
          let sendParams = {
            domain: [],
            model: "donation.profile",
            fields: [],
            offset: null,
            limit: null,
          };
          this.DonationService.getDataAll(sendParams).subscribe(
            (res) => {
              console.log("res>>>>>>>", res);
              this.donationList = res;
            },
            (err) => {
              console.log("Error occured>>>>>", err);
            }
          );
        }
      }
    );
  }
  donationList: any = [];

  ngOnInit() {}
  gotoDonateForm() {
    this.router.navigate(["/reports/donation"]);
  }
  allDonationList() {
    let sendParams = {
      domain: [],
      model: "donation.profile",
      fields: [],
      offset: null,
      limit: null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      (res) => {
        console.log("res>>>>>>>", res);
        this.donationList = res;
      },
      (err) => {
        console.log("Error occured>>>>>", err);
      }
    );
  }

  public createColumnDefs() {
    this.columnDefs = [
      { headerName: "Doner ID", field: "name", filter: "text" },
      { headerName: "First Name", field: "f_name", filter: "text" },
      { headerName: "Last Name", field: "l_name", filter: "text" },
      { headerName: "Phone Number", field: "address", filter: "text" },
      { headerName: "State", field: "state_id[1]", filter: "text" },
      { headerName: "City", field: "city", filter: "text" },
    ];
  }
}
