import { Component, OnInit } from '@angular/core';
import { PrintService } from '../service/print.service';

@Component({
  selector: 'app-worker-parent',
  templateUrl: './worker-parent.component.html',
  styleUrls: ['./worker-parent.component.scss', '../../worker-parent-visit-activity/worker-parent-visit-activity.component.scss']
})
export class WorkerParentComponent implements OnInit {
  workerParent: any;

  constructor(public printService: PrintService) { }

  ngOnInit() {
    this.workerParent = this.printService.workerParentData;
    console.log("this.workerParent in NGONIT is", this.workerParent)
    this.printService.isPrinting = true;
    this.printService.onDataReady();
  }



}
