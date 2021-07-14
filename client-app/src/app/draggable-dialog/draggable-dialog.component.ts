import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DraggableDialogService } from './draggable-dialog.service';

@Component({
  selector: 'app-draggable-dialog',
  templateUrl: './draggable-dialog.component.html',
  styleUrls: ['./draggable-dialog.component.scss']
})
export class DraggableDialogComponent implements OnInit {

  @Input() title: string;
  @Input() height: string;
  @Input() width: string;

  @Output() closeDialog = new EventEmitter<any>();

  currentzIndex: number;
  previouszIndex: number;
  isCollapse: Boolean = false;

  constructor(
    public draggableDialogService: DraggableDialogService,
  ) { }

  ngOnInit() {
    this.currentzIndex = 5; // default zIndex
    this.draggableDialogService.previouszIndex.subscribe(zIndex => {
      this.previouszIndex = zIndex;
    });
  }

  highlightDialog() {
    this.currentzIndex = this.previouszIndex + 5;
    this.draggableDialogService.changezIndex(this.currentzIndex);
  }

  expandCollapse() {
    this.isCollapse = !this.isCollapse;
    if (this.isCollapse) {
      this.height = '46';
    } else {
      this.height = '500';
    }
  }

  close() {
    this.closeDialog.next();
  }

}
