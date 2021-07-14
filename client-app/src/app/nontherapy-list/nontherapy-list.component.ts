import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../metadata-configuration/meta-data/meta-data.service';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';

@Component({
  selector: 'app-nontherapy-list',
  templateUrl: './nontherapy-list.component.html',
  styleUrls: ['./nontherapy-list.component.scss']
})
export class NontherapyListComponent implements OnInit {

  constructor(public _router: Router,
    public _CaseTeamService: CaseTeamService,
    public _referralView:ReferralViewService) { }

  cityList = [];
  rowData = [];
  columnDef = [];
  defaultColDef: any;
  initial = 1;
  end = 100;
  totalCount;
  dataList = [];
  clientName:any;
  clientID:any;
  NTFFCards = [];
  sortOrder:any;
  sortField:any;


  ngOnInit() { this.createCards(); }

  /**
   * @returns navigate to medication new form
   */
  addNTFFDetails() {
    return this._router.navigate(['/reports/nonTherapyFaceToFace/new']);
  }

  /**
   * 
   * @param data navigation details
   * @returns navigate to medication details form
   */
  componentNavigation(data) {
    this._CaseTeamService.storeId(data.data.nonTherapyFaceToFaceID);
    this._router.navigateByUrl('/reports/nonTherapyFaceToFace/details');
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let req;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._referralView.clientDetails().then(data=>{
      this.clientID = data[0].clientId;
      this.clientName = data[0].clientName;
      req = {clientId:this.clientID }
      this._CaseTeamService.getNonTherapyFaceToFaceList(req).then(data => {
        loader.style.display = 'none';
        this.NTFFCards = data.nonTherapyFaceToFace;
      })
    })
  }

  /**
   * @returns back to previous window
   */
  back() {
    return window.history.back();
  }

  /**
   * @param label string
   * @return image path
   */
  generateIconURL(label: String) {
    return "/assets/letter_pic/" + label.charAt(0).toUpperCase() + ".svg";
  }



}












