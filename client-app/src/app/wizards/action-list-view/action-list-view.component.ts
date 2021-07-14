import { OnInit, Component, Input } from "@angular/core";

@Component({
    selector:'action-list-view',
    templateUrl: './action-list-view.component.html',
    styleUrls:['./action-list-view.component.scss'],
    inputs:['listViewData','actions','columns','module']
}) 

export class ActionListzViewComponent implements OnInit { 
    @Input() 
    listViewData = [];
    actions: any;
    columns: any;
    module:string;

    ngOnInit() { }
}