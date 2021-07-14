import { Component, OnInit } from "@angular/core";
import { PrintService } from "../service/print.service";

@Component({
    selector:'unusual-pp0550',
    styleUrls:['./pps0550.component.scss'],
    templateUrl:'./pps0550.component.html'
})

export class PPS0550UpdatedComponent implements OnInit { 
    isInitialNotification: any;

    constructor(public printService:PrintService) { }

    ngOnInit() { 
        // this.printService.isPrinting = true;
        // this.printService.onDataReady();
        console.log("User inputs",this.isInitialNotification)
        // console.log("Print values PPS0550 ***",this.printService.pps0550Data)
    }
}