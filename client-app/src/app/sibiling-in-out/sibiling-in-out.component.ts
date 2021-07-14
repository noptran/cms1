import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
// import { Sibilings } from './sibilings';

@Component({
  selector: 'app-sibiling-in-out',
  templateUrl: './sibiling-in-out.component.html',
  styleUrls: ['./sibiling-in-out.component.scss']
})
export class SibilingInOutComponent implements OnInit {
  breadcrumbs = [];
  // sibling:Sibilings = new Sibilings();

  constructor(public _opecard:OpencardsService, public _client:ClildFormService) { }

  ngOnInit() { 
    this.getById();
  }

  getById() {
    let siblingsId: number, clientId: number, referralId: number;
    siblingsId = this._client.getId();
    clientId = parseInt(localStorage.getItem('clientId')) - this._opecard.getHasKey();
    referralId = parseInt(localStorage.getItem('referralId')) - this._opecard.getHasKey(); 
    const REQ = { clientSiblingID: siblingsId, clientID:clientId, referralID:referralId }
    this._opecard.getByIdSibilings(REQ).then((data: any)=>{
      // this.sibling = data.sibOOHCTPT[0];
    })
  }

}
