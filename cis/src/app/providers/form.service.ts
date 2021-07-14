import { Injectable, Output, EventEmitter } from '@angular/core'
import { PouchDbService } from './pouchdb.service';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { NetworkService } from './network.service';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Constants } from '../constants';
import * as moment from 'moment';
import _ from 'lodash';
import { isNullOrUndefined } from 'util';

const TWO_SECONDS = 2000;


@Injectable()
export class FormService {
    @Output() change: EventEmitter<boolean> = new EventEmitter();
    @Output() initiate: EventEmitter<boolean> = new EventEmitter();

    postEnd: any = environment;
    formsDb: any;
    metadataDb: any
    totalRecords: Number;
    docType: string;
    showLoader = false;
    isResponseReceived = false;
    headers;
    clientInfoDb: any;
    constructor(private pouchDBService: PouchDbService,
        private snackBar: MatSnackBar, private networkService: NetworkService,
        private _http: Http, private route: ActivatedRoute,
        private router: Router, private http: HttpClient) {
        this.formsDb = this.pouchDBService.getFormsDB();
        this.metadataDb = this.pouchDBService.getMetaDataDB();

        // setting header
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    async updateData(data) {
        console.log("updateData>>>", data);
        let response: any;
        try {
            data.updated = Date.now();
            response = await this.formsDb.put(data);
            this.snackBar.open('Form updated', 'OK', { duration: TWO_SECONDS });
        } catch (err) {
            this.snackBar.open('Error saving form in update', 'OK', { duration: TWO_SECONDS });
        } finally {
            return response;
        }
    }

    async getDoc(id) {
        return await this.formsDb.get(id);
    }

    async saveForm(data) {
        let response: any;
        if (!data.id) {
            data.created = Date.now();
            data.status = Constants.FORM_STATUS.DRAFT;
            data.updated = Date.now();
            try {
                response = await this.formsDb.post(data);
                this.snackBar.open('Form saved', 'OK', { duration: TWO_SECONDS });
            } catch (err) {
                this.snackBar.open('Error saving form', 'OK', { duration: TWO_SECONDS });
                console.error('Error saving form', err);
            } finally {
                data.id = response.id;
                return data;
            }
        } else {
            // Get the doc from pouchDB so it contains the _rev property. This is required so pouchDB doesn't throw a conflict error
            let doc = await this.formsDb.get(data.id);
            data._id = doc._id;
            data._rev = doc._rev;
            this.updateData(data);
        }
    }

    async finalize(data) {
        this.finalizeResponse(data).then((response: any) => {
            this.change.emit(true);
        });
    }

    loaderStart() {
        return this.showLoader = true;
    }
    setFinalizeResponse() {
        this.isResponseReceived = true;
    }

    getFinalizeResponse() {
        let responseStatus = this.isResponseReceived;
        // Reset Response Message
        if (responseStatus === true) {
            this.isResponseReceived = false;
        }
        return responseStatus;
    }

    async finalizeResponse(data) {
        console.log("finalizeResponse>>>>>>", data);
        let user = await this.pouchDBService.getUser();
        if (!this.networkService.isOnline()) {
            this.snackBar.open('You are offline. the status is in pending.', 'OK', { duration: TWO_SECONDS });
            let doc = await this.formsDb.get(data.id);

            doc.completed = Date.now();
            doc.status = Constants.FORM_STATUS.PENDING;
            doc.staffId = user.userId;
            doc.file = data.file;
            doc.finalizedDate = data.finalizedDate;
            doc.uploadFileDate = data.uploadFileDate;

            if (data.name === Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_CHILD_VISIT_ACTIVITY_NOTE9_19_16 ||
                data.name === Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_PARENT_VISIT_ACTIVITY_LOG_TYPE_UNLOCKED ||
                data.name === Constants.PROGRAMS.REINTEGRATION.FORMS.PARENT_CHILD_VISITATION_LOG_FORM
                || data.name === Constants.PROGRAMS.REINTEGRATION.FORMS.CASE_ACTIVITY) {
                doc.beginDate = data.beginDate;
                doc.endDate = data.endDate;
            }

            console.log("<<<<<<doc>>>>>>", doc);
            if ((data.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PECFAS_SFCS3_8_17)
                || (data.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CAFAS_SFCS10_2_17)) {
                doc.SectionScores = data.SectionScores;
            }
            if (data.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PS17_17_17) {
                doc['CompletionDate'] = { value: data.CompletionDate.value }
                doc.SectionScores = data.SectionScores;
            } if (data.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CSDC) {
                doc.MultiClientForPracticeTips = data.MultiClientForPracticeTips;
            }
            if (data.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CROPS) {
                doc.questionID = data.questionID;
            }
            this.router.navigate(['/home/form']);
            console.log("doc>>>>>>", doc);

            return this.updateData(doc);
        }
        let doc;
        try {
            doc = await this.formsDb.get(data.id);
        } catch (err) {
            this.change.emit(true);
            console.error('Error in getting from the database', err);
            this.snackBar.open('Form not saved. Please save before finalizing', 'OK', { duration: TWO_SECONDS });
            return;
        }
        let formData = data;
        console.log("formData>>>>>>", data);
        formData.staffId = user.userId;
        return this.sync(formData)
            .then((res: any) => {
                if (res) {
                    if (res.responseStatus === true) {
                        doc.completed = Date.now();
                        doc.status = Constants.FORM_STATUS.SYNCED;
                        doc.error = res.responseMessage;
                    } else if (res.responseStatus === false) {
                        this.change.emit(true);
                        doc.error = res.responseMessage;
                        if (res.responseMessage) {
                            this.snackBar.open(res.responseMessage, 'OK', { duration: TWO_SECONDS });
                        } else {
                            this.snackBar.open('Please check your internet connection or VPN', 'OK', { duration: TWO_SECONDS });
                        }

                    } else {
                        this.change.emit(true);
                        this.router.navigate(['/home/form']);
                        this.snackBar.open('Please check your internet connection or VPN', 'OK', { duration: TWO_SECONDS });
                    }
                    return this.updateData(doc)
                        .then(() => {
                            this.router.navigate(['/home/form']);
                            return {
                                res: res,
                                formData: formData
                            };
                        })
                }
                else {
                    this.change.emit(this.isResponseReceived);
                    this.router.navigate(['/home/form']);
                    this.snackBar.open(res.responseMessage, 'OK', { duration: TWO_SECONDS });
                }
            }).catch(error => {
                console.log('Error', error);
                this.change.emit(true);
            });
    }

    async sync(data: any) {
        if (data.name === "CSDC") {
            _.forEach(data, function (value, key) {
                if (!isNullOrUndefined(value)) {
                    if (value.fieldOptionIndex === true) {
                        value.fieldOptionIndex = "true"
                    }
                    if (value.fieldOptionIndex === false) {
                        value.fieldOptionIndex = "false"
                    }
                }
            });
        }
        console.log("sync>>>>>>", data);
        let user = await this.pouchDBService.getUser();
        data.staffId = user.userId;
        let blob = data.file;
        let newData = _.omit(data, data.file)

        let pdfUpload: FormData = new FormData();
        pdfUpload.append('uploadfile', blob);
        pdfUpload.append('pdfFormJson', JSON.stringify(newData));
        if (data.program === Constants.PROGRAMS.REINTEGRATION.SHORT_NAME ||
            data.program === Constants.PROGRAMS.FOSTER_CARE_HOMES.MENU_TITLE ||
            data.program === Constants.PROGRAMS.FAMILY_PRESERVATION.MENU_TITLE ||
            data.program === Constants.PROGRAMS.OKLAHOMA_FOSTER_CARE_HOME.MENU_TITLE) {

            return this.http.post(this.postEnd.localUrl + '/caseActivity/save', pdfUpload).toPromise()
                .then(this.extractedData)
                .catch(err => {
                    this.snackBar.open(err.error.responseMessage, 'OK', { duration: TWO_SECONDS });
                    console.log(err);
                });
        } else if (data.program === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME) {

            return this.http.post(this.postEnd.localUrl + '/BADoc/save', pdfUpload).toPromise()
                .then(this.extractedData)
                .catch(err => {
                    this.snackBar.open(err.error.responseMessage, 'OK', { duration: TWO_SECONDS });
                    console.log(err);
                });
        }
    }

    uploadfile(data) {
        let pdfUpload: FormData = new FormData();
        pdfUpload.append('formName', data.formName);
        pdfUpload.append('staffId', data.staffId);
        pdfUpload.append('beginDate', data.beginDate);
        pdfUpload.append('scannedDocumentId', data.scannedDocumentId);
        pdfUpload.append('uploadfile', data.file);

        return this.http.post(this.postEnd.localUrl + '/cis/uploadfile', pdfUpload).toPromise()
            .then(this.extractedData)
            .catch(err => console.log(err));
    }

    extractedData(res: Response) {
        const body = {};
        return res;
    }

    getClients(date) {
        let d = new Date();
        let data;
        d.setFullYear(d.getFullYear() - 2);
        let clientSyncDate = moment(d).format('YYYY-MM-DD');
        const options = new RequestOptions({ headers: this.headers });
        isNullOrUndefined(date) ? data = { enteredDate: clientSyncDate, lastUpdatedDate: null } : data = { lastUpdatedDate: date, enteredDate: null };
        return this._http.post(this.postEnd.localUrl + '/client/list', data, options);
    }

    getPersonTypeDB() {
        const options = new RequestOptions({ headers: this.headers });
        const data = { 'isCaseActivity': "true" };
        return this._http.post(this.postEnd.localUrl + '/personType/list', data, options);
    }

    getContactTypeDB() {
        const options = new RequestOptions({ headers: this.headers });
        return this._http.get(this.postEnd.localUrl + '/personType/contactType/list', options);
    }

    getProcodeDB() {
        const options = new RequestOptions({ headers: this.headers });
        return this._http.get(this.postEnd.localUrl + '/personType/procode/list', options);
    }

    getPersonTypeProcodeDB() {
        const options = new RequestOptions({ headers: this.headers });
        return this._http.get(this.postEnd.localUrl + '/personType/personTypeProcode/list', options);
    }

    getEarlierForms(req) {
        const options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.postEnd.localUrl + '/scannedDocument/findAllSubmittedForms', req, options);
    }
}
