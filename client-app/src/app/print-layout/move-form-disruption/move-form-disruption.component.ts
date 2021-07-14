import { Component, OnInit } from '@angular/core';
import { PrintService } from '../service/print.service';

@Component({
  selector: 'app-move-form-disruption',
  templateUrl: './move-form-disruption.component.html',
  styleUrls: ['./move-form-disruption.component.scss']
})
export class MoveFormDisruptionComponent implements OnInit {

  constructor(public printService: PrintService) { }

  ngOnInit() {
    this.printService.onDataReady();
  }

}
