import { Component, Input, OnInit } from '@angular/core';
import { SchoolInfoService } from './school-info.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-info',
  templateUrl: './school-info.component.html',
  styleUrls: ['./school-info.component.scss'],
  inputs: ['schoolDatas']
})
export class SchoolInfoComponent implements OnInit {
  @Input() schoolDatas: any;
  componentBtnLabel = "Show More";
  componentBtnDisable: boolean;
  isMoreDetails: boolean;
  schoolID: number;

  constructor(private _router: Router, private _service: SchoolInfoService, private _opencards: OpencardsService) { }

  ngOnInit() {
    this.schoolID = parseInt(localStorage.getItem("schoolID")) - this._opencards.getHasKey();
    console.log("this.schoolID",this.schoolID);
    console.log("this.schoolDatas",this.schoolDatas);
  }

  async onShowMoreClick() {
    this.componentBtnLabel = "Loading...";
    this.componentBtnDisable = true;
    this.isMoreDetails = true;
    this.componentBtnDisable = false;
    this.componentBtnLabel = "Show More";
  }

}
