 
 
 
 
 
 import { Directive, Component, OnInit, Output, EventEmitter } from '@angular/core';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';

@Component({
  selector: 'app-behavior-versioning',
  templateUrl: './behavior-versioning.component.html',
  styleUrls: ['./behavior-versioning.component.scss']
})

@Directive({
  selector: '[onCreate]'
})

export class BehaviorVersioningComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  asqName = '';
  isAsqFormed = false;
  asqData = { asqName: '', isAsqFormed: false };
  isCisDataStored = false;
  formCisArrayValue: any;
  cisFormJson: any;

  isAsqTwoNode = false;
  isAsqSixNode = false;
  isAsqTwelveNode = false;
  isAsqEighteenNode = false;
  isAsqTwentyFourNode = false;
  isAsqThirtyNode = false;
  isAsqThirtySixNode = false;
  isAsqFourtEightNode = false;
  isAsqSixtyNode = false;
  isCafasNode = false;
  isPsiNode = false;
  isCropsNode = false;
  isCsdcNode = false;
  isPecfasNode = false;
  isNcfasNode = false;
  breadcrumbs = [];
  dateFormat: string = 'MMM dd yyy hh:mm aa';

  constructor(public _opencards: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    this.getCisJson();
    this.onCreate.emit('dummy');
    this.asqData = this._opencards.getAsqData();
    this.asqName = this.asqData.asqName;
    this.isAsqFormed = this.asqData.isAsqFormed;
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Behavioral Assessment', href: '/reintegration/referral/opencard/behavioral-assessment/view', active: '' },
      { label: this.asqData.asqName.charAt(0).toUpperCase() + this.asqData.asqName.slice(1), active: 'active' }
    );
    

  }
getCisJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';

    const data = { 'baDocId': this._client.getId() };
    this._opencards.getBehavioralCisJson(data)
      .then(async (data) => {
       
        this.cisFormJson = data;
        this.formCisArrayValue = data.cmsCisPdfDoc;
        
        this.isCisDataStored = true;
        loader.style.display = 'none';
        
      })
 
  }

  cisVersionBasedView(version) {

    this._opencards.setCisJsonVersion(version);
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    switch (this.asqData.asqName) {

      case 'asq-two':
        this.isAsqTwoNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-six':
        this.isAsqSixNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-twelve':
        this.isAsqTwelveNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-eighteen':
        this.isAsqEighteenNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-twentyFour':
        this.isAsqTwentyFourNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-twirty':
        this.isAsqThirtyNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-thirtySix':
        this.isAsqThirtySixNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-fourtyEight':
        this.isAsqFourtEightNode = true;
        loader.style.display = 'none';
        break;
      case 'asq-sixty':
        this.isAsqSixtyNode = true;
        loader.style.display = 'none';
        break;
      case 'CAFAS':
        this.isCafasNode = true;
        loader.style.display = 'none';
        break;
      case 'PSI':
        this.isPsiNode = true;
        loader.style.display = 'none';
        break;
      case 'CROPS':
        this.isCropsNode = true;
        loader.style.display = 'none';
        break;
      case 'CSDC':
        this.isCsdcNode = true;
        loader.style.display = 'none';
        break;
      case 'PECFAS':
        this.isPecfasNode = true;
        loader.style.display = 'none';
        break;
      case 'NCFAS':
        this.isNcfasNode = true;
        loader.style.display = 'none';
        break;

      default:
        this.isCafasNode = true;
        loader.style.display = 'none';
    }



  }

  getFormData(event: any) {

    this.getCisJson();

  }

  discardCourtAppearance() {
    this.isAsqTwoNode = false;
    this.isAsqSixNode = false;
    this.isAsqTwelveNode = false;
    this.isAsqEighteenNode = false;
    this.isAsqTwentyFourNode = false;
    this.isAsqThirtyNode = false;
    this.isAsqThirtySixNode = false;
    this.isAsqFourtEightNode = false;
    this.isAsqSixtyNode = false;
    this.isCafasNode = false;
    this.isPsiNode = false;
    this.isCropsNode = false;
    this.isCsdcNode = false;
    this.isPecfasNode = false;
    this.isNcfasNode = false;
    
  }

  generateVersion(versionStr) {
    let versionTemp=versionStr+10;
    let version = versionTemp.toString();
    return (version.charAt(0) + '.' + version.charAt(1));
  }

}
