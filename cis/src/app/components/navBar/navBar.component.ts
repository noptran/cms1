import { Component, Output, EventEmitter } from '@angular/core';
import { NetworkService } from './../../providers/network.service';
import { PouchDbService } from './../../providers/pouchdb.service';
import { MatSnackBar } from '@angular/material';
import { FormService } from '../../providers/form.service';
import eachLimit from 'async/eachLimit';
import { Constants } from './../../constants';
import * as moment from 'moment';
import _ from 'lodash';
import { isNullOrUndefined } from 'util';
const TWO_SECONDS = 2000;

@Component({
    selector: 'nav-bar',
    templateUrl: './navBar.component.html',
    styleUrls: ['./navBar.component.scss']
})
export class NavBarComponent {
    @Output() procode: EventEmitter<boolean> = new EventEmitter();

    isOnline: boolean = this.networkService.isOnline();
    formsDb: any;
    clientsDb: any;
    metadataDb: any;
    // clientInfoDb: any;
    rowsProcessed: any;
    syncStatus: string;
    syncClientsInProgress: boolean = false;
    totalRecords: any;
    response: any;
    Datadoc: any;

    metadataDocId: string = 'metaDataDoc';
    personDataDocId: string = 'personDataDoc';
    contactDataDocId: string = 'contactDataDoc';
    procodeDataDocId: string = 'procodeDataDoc';
    personTypeProcodeDataDocId: string = 'personTypeProcodeDataDoc';
    clientInfoId = 'clientInfoDoc';
    date: string;

    constructor(private networkService: NetworkService, private pouchDbService: PouchDbService,
        private snackBar: MatSnackBar, private formService: FormService) {
        networkService.getStatus().subscribe(message => {
            this.isOnline = (message.status === 'online');
            if (this.isOnline === true) {
                this.snackBar.open('Starting sync process.', 'OK', { duration: TWO_SECONDS });
                this.startSync();
                this.syncAllClients();
            } else {
                this.snackBar.open('You are offline.', 'OK', { duration: TWO_SECONDS });
            }
        });
        this.formsDb = pouchDbService.getFormsDB();
        this.clientsDb = pouchDbService.getClientsDB();
        this.metadataDb = pouchDbService.getMetaDataDB();
        this.updateMobileFormsDb();

        if (networkService.isOnline()) {
            // client will update 30 mins once
            setInterval(() => {
                this.getClientInfoID().then((value) => {
                    if (new Date(value.localFormatDate).getTime() < new Date(Date.now()).getTime()) {
                        this.syncAllClients();
                    }
                })
            }, 1800000);
            this.startSync();
            this.syncAllClients();
            // sync all clients once in a week
            this.syncAllOnceInWeek();
        }
    }
    async syncAllOnceInWeek() {
        await this.getClientInfoID().then((value) => {
            if (!(_.isEmpty(value))) {
                let date1 = new Date(value.enteredDate);
                let date2 = new Date();
                let diffInTime = date2.getTime() - date1.getTime();
                let diffInDays = diffInTime / (1000 * 3600 * 24);
                if (diffInDays >= 7) {
                    this.pouchDbService.removeUser(this.clientInfoId)
                        .then(() => {
                            this.syncAllClients();
                        });
                }
            }

        });
    }

    // If not aware please don't touch this functionality
    // delete forms in db if it exceeds 90 days
    updateMobileFormsDb() {
        this.formsDb.allDocs({ include_docs: true }).then(allDocs => {
            return allDocs.rows.map(row => {
                let date1 = new Date(row.doc.updated);
                let date2 = new Date();
                let diffInTime = date2.getTime() - date1.getTime();
                let diffInDays = diffInTime / (1000 * 3600 * 24);
                if ((diffInDays >= 90) && (row.doc.status === 'Synced')) {
                    this.formsDb.put({ _id: row.id, _rev: row.doc._rev, _deleted: true })
                }
            });
        });
    }

    // function to store the last updated date in metadataDB for updating the changed clients half an hour once
    async updateClientInfo(lastUpdatedDate) {
        try {
            await this.metadataDb.get(this.clientInfoId, (err, doc) => {
                if (err) {
                    this.metadataDb.put({
                        _id: this.clientInfoId,
                        lastUpdatedDate: lastUpdatedDate,
                        localFormatDate: Date.now(),
                        enteredDate: Date.now()
                    }, (error: any) => console.error('error1', error));

                } else {
                    this.metadataDb.put({
                        _id: this.clientInfoId,
                        _rev: doc._rev,
                        lastUpdatedDate: lastUpdatedDate,
                        localFormatDate: Date.now(),
                        enteredDate: doc.enteredDate
                    }, (error: any) => console.error('error2', error));

                }
            });
        } catch (err) {
            // this.snackBar.open('Error updating the last synced clients date in the database', 'OK', { duration: TWO_SECONDS });
        }
    }
    async createClientIndexes() {
        let start = Date.now();
        this.clientsDb.createIndex({
            index: {
                fields: ['lastname']
            }
        }).then((result) => {
            this.syncClientsInProgress = false;
            console.log(`ClientsDB: Create index, took ${(Date.now() - start) / 1000} seconds, result`, result);
        }).catch((err) => console.log('Create index, error', err));
    }

    // function to store the clients in DB
    async updateClientDataInDB(data) {
        try {
            let clients = JSON.parse(data.client);
            let lastUpdatedDate = data.lastUpdatedDate;
            let id: any;
            await this.getClientInfoID().then((value) => {
                id = value;
            });
            // if client last updated date is empty it will enter if
            if (_.isEmpty(id)) {
                this.clientsDb.info().then(async (info) => {
                    if (info.doc_count > 0) {
                        // to delete the older clients in DB
                        await this.clientsDb.allDocs({ include_docs: true }).then(allDocs => {
                            return allDocs.rows.map(row => {
                                return { _id: row.id, _rev: row.doc._rev, _deleted: true };
                            });
                        }).then(deleteDocs => {
                            // to update the new clients
                            this.clientsDb.bulkDocs(clients);
                            this.createClientIndexes();
                            this.updateClientInfo(lastUpdatedDate);
                        });
                    } else {
                        // this is the case where there is no client last updated date and no older clients in DB
                        await this.clientsDb.bulkDocs(clients);
                        this.createClientIndexes();
                        this.updateClientInfo(lastUpdatedDate);
                    }
                });
            } else {
                clients.map((item, index) => {
                    item.referralid = isNullOrUndefined(item.referralid) ? null : item.referralid;
                    this.pouchDbService.searchClientById(item.clientID, item.referralid)
                        .then(async (searchClient) => {
                            if (searchClient.length > 0) {
                                await this.clientsDb.get(searchClient[0]._id, (err, doc) => {
                                    if (err) {
                                        console.log('err', err);
                                    } else {
                                        item['_id'] = doc._id;
                                        item['_rev'] = doc._rev;
                                        this.clientsDb.put(item, (error: any) => console.error('error200000', error));
                                    }
                                });
                            } else {
                                let arr = [];
                                arr.push(item);
                                await this.clientsDb.bulkDocs(arr);
                                return;
                            }
                        });
                    if (index + 1 === clients.length) {
                        this.createClientIndexes();
                        this.updateClientInfo(lastUpdatedDate);
                    }
                });
            }

        } catch (err) {
            this.snackBar.open('Error syncing client data to the database', 'OK', { duration: TWO_SECONDS });
        }
    }

    async getClientInfoID() {
        try {
            return await this.metadataDb.get(this.clientInfoId);
        }
        catch (err) { console.log('err in sync all clients catch', err); }
    }

    //syncing procode
    syncProcode() {
        this.formService.getProcodeDB()
            .subscribe(async (data: any) => {
                localStorage.setItem('procode', data._body);
            }, error => console.log('procode', error))
    }

    //personTypeProcode
    syncPersonTypeProcode() {
        this.formService.getPersonTypeProcodeDB()
            .subscribe(async (data: any) => {
                localStorage.setItem('personTypeProcode', data._body);
            }, error => console.log('personTypeProcode', error))
    }

    //syncing contact type list
    syncContactType() {
        this.formService.getContactTypeDB()
            .subscribe(async (data: any) => {
                let clientData = JSON.parse(data._body);
                let clientLastnameLowerCase = clientData.contactType.map(data => {
                    data.contactType = data.contactType.toLowerCase();
                    return data;
                });
                clientData.contactType = clientLastnameLowerCase;
                data._body = JSON.stringify(clientData);
                localStorage.setItem('contactType', data._body);
            }, error => console.log('contactType', error))
    }

    // syncing person type list
    syncPersonType() {
        this.formService.getPersonTypeDB()
            .subscribe(async (data: any) => {
                let clientData = JSON.parse(data._body);
                let clientLastnameLowerCase = clientData.personType.map(data => {
                    data.personType = data.personType.toLowerCase();
                    return data;
                });
                clientData.personType = clientLastnameLowerCase;
                data._body = JSON.stringify(clientData);
                localStorage.setItem('personType', data._body);
            }, error => console.log('personType', error));
    }

    syncCaseActivity() {
        this.syncProcode();
        this.syncPersonType();
        this.syncPersonTypeProcode();
        this.syncContactType();
    }

    async syncAllClients() {
        let id: any;
        await this.getClientInfoID().then((value) => {
            id = value;
        });
        // If there is no client last updated date it will enter into if condition or it will enter else condition
        if (_.isEmpty(id)) {
            this.syncClientsInProgress = true;
            this.formService.getClients(null)
                .subscribe(async (data: any) => {
                    this.syncEmptyId(data);
                }, error => this.snackBar.open('Error getting new client data to sync the application', 'OK', { duration: TWO_SECONDS }));
            this.syncCaseActivity();
        } else {
            this.formService.getClients(id.lastUpdatedDate)
                .subscribe(async (data: any) => {
                    this.syncWithId(data);
                }, error => this.snackBar.open('Error getting new client data to sync the application', 'OK', { duration: TWO_SECONDS }));
            this.syncCaseActivity();
        }
    }

    // function to change the client last name to lowercase
    commonUpdateClientMethod(client) {
        return client.map(data => {
            data.lastname = isNullOrUndefined(data.lastname) ? null : data.lastname.toLowerCase();
            return data;
        });
    }

    syncEmptyId(data) {
        let clientData = JSON.parse(data._body);
        let val = this.commonUpdateClientMethod(clientData.client)
        clientData.client = JSON.stringify(val);
        this.updateClientDataInDB(clientData);
    }

    syncWithId(data) {
        let clientData = JSON.parse(data._body);
        if (clientData.client.length > 0) {
            this.syncClientsInProgress = true;
            let val = this.commonUpdateClientMethod(clientData.client)
            clientData.client = JSON.stringify(val);
            this.updateClientDataInDB(clientData);
        } else {
            this.syncClientsInProgress = false;
            this.updateClientInfo(clientData.lastUpdatedDate);
        }
    }

    async updatedoc(data) {
        return this.formService.updateData(data);
    }

    async updateData(data) {
        let response: any;
        try {
            data.updated = Date.now();
            response = await this.formsDb.put(data);
            this.snackBar.open('Form updated', 'OK', { duration: TWO_SECONDS });
        } catch (err) {
            this.snackBar.open('Error saving form', 'OK', { duration: TWO_SECONDS });
            return console.error('Error saving form', err);
        } finally {
            return response;
        }
    }
    // To be refactored
    async startSync() {
        let result = await this.formsDb.allDocs({
            include_docs: true, descending: true
        });
        this.rowsProcessed = 0;
        let filteredData = result.rows.filter(data => {
            return data.doc.status === Constants.FORM_STATUS.PENDING;
        });
        this.totalRecords = filteredData.length;

        if (this.totalRecords > 0) {
            this.syncStatus = 'inprogress';
        }
        eachLimit(filteredData, 1, (data, cb) => {
            if (!this.isOnline) {
                this.snackBar.open('Sync paused. Network offline.', 'OK', { duration: TWO_SECONDS });
                cb({ 'error': 'Offline' });
            }
            this.Datadoc = data.doc;
            console.log('this.data', this.Datadoc);
            setTimeout(() => {
                let date = Date.now();
                this.date = moment(date).format('YYYY-MM-DD HH:MM:SS.SSS');
                this.Datadoc.finalizedDate = this.date;
                this.formService.sync(this.Datadoc).then((data: any) => {
                    if (data) {
                        if (data.responseStatus === true) {
                            this.snackBar.open(data.responseMessage, 'OK', { duration: TWO_SECONDS });
                            let date = Date.now();
                            this.date = moment(date).format('MM-DD-YYYY');
                            this.Datadoc.completed = Date.now();
                            this.Datadoc.status = Constants.FORM_STATUS.SYNCED;
                            this.Datadoc.error = data.responseMessage;
                            this.updatedoc(this.Datadoc);
                        } else if (data.responseStatus === false) {
                            if (data.responseMessage) {
                                this.Datadoc.error = data.responseMessage;
                                this.snackBar.open(data.responseMessage, 'OK', { duration: TWO_SECONDS });
                            } else {
                                this.snackBar.open('Please check your internet connection or VPN', 'OK', { duration: TWO_SECONDS });
                            }
                        } else {
                            this.snackBar.open('Please check your internet connection or VPN connection', 'OK', { duration: TWO_SECONDS });
                        }
                    }
                    else {
                        this.snackBar.open('This referral has been closed!', 'OK', { duration: TWO_SECONDS });
                    }
                    this.rowsProcessed++;
                    cb();
                }).catch(error => console.log('Error in syncing document', error));
            }, 10000);
        }, (err) => {
            this.syncStatus = 'complete';
            this.snackBar.open(`Sync complete for ${filteredData.length} documents`, 'OK', { duration: TWO_SECONDS });
        });
    }

}