import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-view-header',
  templateUrl: './list-view-header.component.html',
  styleUrls: ['./list-view-header.component.scss'],
  inputs : ['addnew', 'listTitle', 'description']
})
export class ListViewHeaderComponent implements OnInit {
  @Input()
  addnew : any;
  listTitle : any;
  description : any;

  constructor() { }




  ngOnInit() { }



}
