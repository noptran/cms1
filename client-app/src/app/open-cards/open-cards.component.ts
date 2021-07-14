import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-open-cards',
  inputs:['cards'],
  outputs:['cardAction'],
  templateUrl: './open-cards.component.html',
  styleUrls: ['./open-cards.component.scss']
})
export class OpenCardsComponent implements OnInit {
  @Input()
  cards = [];
  @Output()
  cardAction = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  /**
   * Fetch the respective opencard label and emit it
   */
  cardClick(label:any){
    this.cardAction.emit(label)
  }

}
