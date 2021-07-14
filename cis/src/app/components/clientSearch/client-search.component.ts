import { OnInit, Component, Inject, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClientResultsComponent } from "../client-results/client-results.component";
import { from } from "rxjs";
import { PouchDbService } from "../../providers/pouchdb.service";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";

const TWO_SECONDS = 2000;

@Component({
    selector: 'client-search',
    templateUrl: './client-search.component.html',
    styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {
    clientName: string = '';
    client: string;
    loading: boolean = false;
    search: string;
    datePipe: DatePipe = new DatePipe('en-US');

    @Output() setClientAction = new EventEmitter();
    @Input() ClientName: string;

    constructor(public dialog: MatDialog, private pouchDbService: PouchDbService, private snackBar: MatSnackBar) { }
    ngOnInit() {
        this.search = this.ClientName;
    }

    openSearchResults() {
        if (!this.search) {
            this.snackBar.open('Please enter a last name', 'OK', { duration: TWO_SECONDS });
            return;
        }
        this.loading = true;
        this.search = this.search.toLowerCase();
        let clients = from(this.pouchDbService.searchClient(this.search));
        let loader = document.getElementById('loading-overlay') as HTMLElement;
        loader.style.display = 'block';
        clients.subscribe((clients: any) => {
            this.loading = false;
            clients = clients.map((client: any) => {
                client.dob ? client.dob = this.datePipe.transform(client.dob, 'mediumDate').toString() : '';
                client.beginDate ? client.beginDate = this.datePipe.transform(client.beginDate, 'mediumDate').toString() : '';                
                client.endDate ? client.endDate = this.datePipe.transform(client.endDate, 'mediumDate').toString() : '';                                
                return client;
            });
           
            if (!clients || clients.length <= 0) {
                loader.style.display = 'none';
                this.snackBar.open(`Client not found.`, 'OK', { duration: TWO_SECONDS });
                return;
            }
            loader.style.display = 'none';
            const searchResults = this.dialog.open(ClientResultsComponent, {
                width: '1200px',
                data: { clientList: clients }
            });

            searchResults.afterClosed().subscribe(result => {
                if (result) {
                    this.client = result;
                    this.search = result.lastname + ', ' + result.firstname;
                    this.setClientAction.emit(result);
                }
            })
        });
    }
}
