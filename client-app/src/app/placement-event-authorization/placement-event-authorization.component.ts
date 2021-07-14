import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-placement-event-authorization',
  templateUrl: './placement-event-authorization.component.html',
  styleUrls: ['./placement-event-authorization.component.scss']
})
export class PlacementEventAuthorizationComponent implements OnInit {
  mainTabs = [];
  sIndex = 0;
  breadcrumbs = [];
  currentLivingArragementID: number;
  isDeleteBtnDisable = false;
  moduleName: string;

  constructor(public _opencard:OpencardsService, public _activatedRoute:ActivatedRoute,
    public _router: Router) { }

  ngOnInit() {
    this.currentLivingArragementID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('li_id'));
    this.setIndex(0);
    this.defineMainTabs();
    this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', active: '', href: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Authorization List', active: '', href: '/reintegration/referral/opencard/placement-event-authorization/view' },
          { label: 'Authorization', active: 'active'},
    )
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Placement Event Authorization', href: '#nav-sec1' },
      { label: 'Authorization Information', href: '#nav-sec2' },
      
    ]
  }

  deletedAuthorization() {
    let authReq = { livingArrangementID:this.currentLivingArragementID} 
    /**Check for the length of authorization */
    this._opencard.getLivingArrangementAuthorizations(authReq).then((data: any)=> { 
      if(data.authorizationList.length <= 1) {
        swal('Not able to delete!','This authorization cannot be deleted because it is the only authorization. If this authorization needs deleted it should be overwritten during the creation of a new authorization','info');
        return this.isDeleteBtnDisable = true;
      } else { 
        /** False statement */
        this.isDeleteBtnDisable = false;
        swal('Delete Authorization!','This will delete this'+this.moduleName+'Authorization. If there are any claims the authorization will be emailed to Contact service to Handle. Are you sure you want to continue with delete ?','info');
        this._router.navigate(['/placement-psa'],{ queryParams:{isDeleteAuth:true} ,queryParamsHandling:'merge'});
          /** Form open psa(void)- provider envelope */
          /** Return to placement auth detail, show delete confirmation */
          /** Return form */
      }
    })
    
  }

}
