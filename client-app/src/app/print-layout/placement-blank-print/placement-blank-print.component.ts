import { Component, OnInit } from '@angular/core';
import { PrintService } from '../service/print.service';

@Component({
  selector: 'app-placement-blank-print',
  templateUrl: './placement-blank-print.component.html',
  styleUrls: ['./placement-blank-print.component.scss']
})
export class PlacementBlankPrintComponent implements OnInit {

  constructor(public printService: PrintService) { }

  ngOnInit() {
    this.printService.onDataReady();
  }


}
