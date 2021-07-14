import { Component, OnInit } from '@angular/core';
import { PrintService } from '../service/print.service';

@Component({
  selector: 'app-worker-child',
  templateUrl: './worker-child.component.html',
  styleUrls: ['./worker-child.component.scss', '../../worker-child-visit-activity-note/worker-child-visit-activity-note.component.scss']
})
export class WorkerChildComponent implements OnInit {
  workerChild: any;

  constructor(public printService: PrintService) { }

  ngOnInit() {
    this.workerChild = this.printService.workerChildData;
    console.log("this.workerChild in NGONIT is", this.workerChild)
    this.printService.isPrinting = true;
    this.printService.onDataReady();
  }

}
