import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DonationService } from "../donation.service";

@Component({
  selector: "app-global-search",
  templateUrl: "./global-search.component.html",
  styleUrls: ["./global-search.component.scss"],
})
export class GlobalSearchComponent implements OnInit {
  message: any;
  // @Input() searchdata1: string
  value: string;
  value1: string;
  data: boolean;
  closeResult: string;
  public subscription: Subscription;
  constructor(public DonationService: DonationService) {
    this.subscription = this.DonationService.getMessage().subscribe(
      (message) => {
        console.log("message>>>>", message);
        this.message = message.text;
        if (message.text == "DonarList") {
        }
      }
    );
  }
  ngOnInit() {}
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  searchdata(value) {
    this.data = true;
    this.value1 = value;
    if (this.value1 == "") {
      this.data = false;
      let emvalue = "";
      this.DonationService.sendMessage(emvalue);
    }
  }

  sendDonarListParam(fild, val) {
    if (fild == "name") {
      let value = ["name", "ilike", val];
    } else if (fild == "f_name") {
      let value = ["f_name", "ilike", val];
    }

    this.DonationService.sendMessage(val);
    this.data = false;
  }
}
