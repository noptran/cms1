import { Component, OnInit } from '@angular/core';
import { ReferralViewService } from './referral-view.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ReferralsService } from '../referrals/referrals.service';

@Component({
  selector: 'app-referral-view',
  templateUrl: './referral-view.component.html',
  styleUrls: ['./referral-view.component.scss']
})
export class ReferralViewComponent implements OnInit {

  clientName:any;
  selectedReferral:any;
  icon:any;
  listOfReferral = [
    {label:'Family Preservation',value:'Family Preservation'},
    {label:'ReIntergation',value:'ReIntergation'},
    {label:'Kinship',value:'Kinship'},
    {label:'Adoption',value:'Adoption'}
]

sortField:any;
sortOrder:any;

ReferralCards = []

  constructor(public _referral:ReferralViewService,public _router:Router, public _referrals:ReferralsService) { }

  ngOnInit() {
    this.createReferralMenuCards(); 
    this._referral.clientDetails().then(result=>{
      console.log("Need data",result[0]);
      this.clientName = result[0].clientName;
    });
    this.selectedReferral = this._referral.getReferralType()
}

/**
 * Referral menu card generated here
 * 
 * @returns the client referral details
 * 
 * @memberOf Referral ViewComponent
 */
createReferralMenuCards(){
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
      return this._referral.getClientReferralDetails().then(data=>{
        loader.style.display = 'none';
        console.log("Referral Data",data);
        if(data.clientReferral.length > 0){
          this.ReferralCards = data.clientReferral;
        }
        console.log("Referral cards",this.ReferralCards)
      })
}

/**
 * Navigate to the respective referral detail form view
 * 
 * 
 * @memberOf ReferralViewComponent
 */
componentNavigation(refferalId,referralType){
  console.log("selected referral id",refferalId,referralType)
  this._referrals.setReferralDetails(refferalId);
  let navigationURL;
  if(referralType){
    switch(referralType){
      case 'FI':
        navigationURL = '/reports/referral/family-preservation/detail';
        break;
      case 'FO':
        navigationURL = '/reports/referral/family-preservation/detail';
        break;
      case 'FC':
        navigationURL = '/reports/referral/reintegration/detail';
        break;
    }
    this._referral.setReferralDetails(refferalId,referralType);
    return this._router.navigateByUrl(navigationURL)
  }else{
    return swal('Error!','Referral is not found!','error');
  }


}
/**
 * @returns to client list view
 */
backToClient(){
    return this._router.navigate(['/reports/client/details']);
}

/**
 * Pick the icon from assets based on the referral discription
 * @returns image url
 * @param label discription of the referral
 */
generateIconURL(label:String){
   return "/assets/letter_pic/"+label.charAt(0).toUpperCase()+".svg";
}

referralTypeFilter(type:any){
  let condition
if(type == 'FI'){
  condition = 'FI'
}
console.log("Return condition",condition)
return condition
}



}
