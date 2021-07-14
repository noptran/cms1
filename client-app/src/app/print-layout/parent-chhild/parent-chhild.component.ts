import { Component, OnInit } from '@angular/core';
import { PrintService } from '../service/print.service';

@Component({
  selector: 'app-parent-chhild',
  templateUrl: './parent-chhild.component.html',
  styleUrls: ['./parent-chhild.component.scss', '../../parent-child-visitaion/parent-child-visitaion.component.scss']
})
export class ParentChhildComponent implements OnInit {
  parentChild: any;

  constructor(public printService: PrintService) { }

  ngOnInit() {
    this.parentChild = this.printService.parentChildData;
    console.log("this.workerChild in NGONIT is", this.parentChild)
    this.printService.isPrinting = true;
    this.printService.onDataReady();
  }

}
