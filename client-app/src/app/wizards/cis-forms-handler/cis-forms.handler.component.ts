import { OnInit, Component, Input } from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: 'cis-forms-hanlder',
    templateUrl: './cis-forms.handler.component.html',
    styleUrls: ['./cis-forms.handler.component.css']
})
export class CISFormsHandlerComponent implements OnInit {
    constructor(public _openCard:OpencardsService, public _router:ActivatedRoute) { }

    listViewDataFormAPI = [];
    openTab: any;
    infoText: string;
    listViewDataOut: any = [];
    isDataReady = false;
    listViewActions = 'R';
    listViewColumns = ['completedDate']
    currentModule = 'CISFormsList';
    referralID: Number;
    title = 'Behavior Assessments';
    breadcrumbs = [];
    status: any;

    ngOnInit() { 
        this.referralID = parseInt(this._router.snapshot.queryParamMap.get('ref_id'));
        this.breadcrumbs.push(
            { label: 'Referral Form', href: "/reintegration/referral/detail", active: '' },
            { label: 'Behavior assessment', active: 'active' },
        )
    }

    async getCurrentOpenTab(e: any){
        this.openTab = e.index;
        this.isDataReady = false;
        this.listViewDataOut = await this.getListViewData();
        this.isDataReady = true;
        this.infoText = '';
    }

    getListViewData() { 
        return new Promise((resolve)=>{
            this.infoText = 'Please wait...';
            let req = { 
                referralID:this.referralID,
                beginPagination:1,
                endPagination:100
            }
            switch(this.openTab) { 
                case 0:
                    return;
                    break;
                case 1:
                    this._openCard.getCISFormsList(req,'/asq/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.asq;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
                case 2:
                    this._openCard.getCISFormsList(req,'/cafa/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.cafa;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
                case 3:
                    this._openCard.getCISFormsList(req,'/crop/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.crop;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
                case 4:
                    this._openCard.getCISFormsList(req,'/csdcK/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.csdc;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
                case 5:
                    this._openCard.getCISFormsList(req,'/necfas/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.necfas;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
                case 6:
                    this._openCard.getCISFormsList(req,'/pecfa/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.Pecfa;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
                case 7:
                    this._openCard.getCISFormsList(req,'/psi/list').then((data: any)=>{
                        this.listViewDataFormAPI = data.psi;
                        resolve(this.listViewDataFormAPI)
                    });
                    break;
            }
        })
    }
}
