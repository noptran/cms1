import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FpCaseActivity, PrintValues } from "../../../family-preservation-list/forms/case-activity-fp-form/fp-case-activity";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PagesizeService } from "../../../pagesize/pagesize.service";
import { PrintService } from "../../../print-layout/service/print.service";
import {PrintPdf} from "../../../print-pdf";
import { TeamFormService } from "../../../team-form/team-form.service";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { FpCaseActivityService } from "../../../family-preservation-list/forms/case-activity-fp-form/fp-case-activity.service";
import { HomeService } from "../../../home/home.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import {LocalValues} from "../../../local-values";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import * as _ from 'lodash';
import html2pdf from 'html2pdf.js';



@Component({
    selector: 'app-shared-case-activity',
    templateUrl: './shared-case-activity.component.html',
    inputs: ['caseActivityId']
})

export class SharedCaseActivityComponent {
    title: any = 'Case Activity';
    status = 'draft';
    formStatus?: any;
    subtitle: any;
    formControl: any;
    quickMenu = "referrel";
    editControll: boolean;
    fpCaseActivity: FpCaseActivity = new FpCaseActivity();
    breadcrumbs = [];
    caseActivityForm: FormGroup;
    clientId: any;
    referralId: any;
    metaData = [];
    fisClientData = []
    filteredFisClient = [];
    staffList = [];
    isNtfflog = false;
    isNtfflogCis = false;
    initial = 1;
    end = 100;
    iscfff = false;
    issupervisoryStaffing = false;
    ispps50031 = false;
    isworkerChildvisitActivityNote = false;
    isworkerParentVisitAcitivity = false;
    isParentChildVisitation = false;
    pdfForms: any;
    formCisArrayValue: any;
    isCisDataStored = false;
    isEditEnabled = false;
    caseId = false;
    discardTo = '/reports/referral/family-preservation/case-activity/view';
    isCourtAppearanceLog = false;
    attachmentOpencards = []
    isCaseActivityNode = false;
    isFosterCareNode = false;
    url: any;
    procodeValidateArray = [];
    isProgressNotes = false;
    isLackofContact = false;
    isOtherFormsOpened = false;
    isSupervisorStaff = false;
    isDetailsPage = false;
    isAttachmentRequired = false;
    showSuperVising: boolean;
    isPrint = false;
    isPrintEnabled = false;
    isCaseActivityPrintable = false;
    caseActivityPrintForm: FormGroup;
    printStaffName: any;
    printProcode: any;
    printStaffNotes: any;
    caseActPrintValues: PrintValues = new PrintValues();
    caseManagerName: any;
    enteredBy: any;
    referrralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
    listOfNTFFs = [];
    contactTypes = [];
    procodes = [];
    filteredContactTypesData = [];
    filteredProcodeData = [];
    isNTFF = false;
    isProgressNote = false;
    isLackOfContact = false;
    isSupervisoryStaffing = false;
    listOfProgressNotes: any[];
    listOfSupervisoryStaffings: any[];
    listOfLackOfContacts: any[];
    personTypes = [];
    referralType: any;
    currentReferralID: number;
    currentRecordID: number;
    currentReferralType: string;
    selectedClientKaecses: any;
    selectedClientFacts: any;
    endDateClients = [];
    endDateClient = false;
    formDatas: any;
    selectedClientList = [];
    uploadedFiles: any[] = [];
    caseActivityDocumenTypes = [];
    filteredCaseActivityDocs = [];
    isAddDetailsEnableForUpload = false;
    sfcsNotes: string;
    isUploadModal = false;
    isAttachment = false;
    attachDocsCount: number;
    currentNode = 'caseActivity';
    caseActivityAttachmentsList: any = [];
    isDownloadBtnDisable = false;
    req: any;
    cities = [
        { name: 'Open Clients Only', code: 'Open Clients Only' },
        { name: 'Closed Clients Only', code: 'Closed Clients Only' },
        { name: 'All Clients', code: 'All Clients' },
        { name: 'Open Clients in Referral', code: 'Open Clients in Referral' },
        { name: 'Only Clients with Same Facts', code: 'Only Clients with Same Facts' }
    ];
    defaultColDef: any;
    selectClient: string;
    showAdditionalClientList = false;
    @Input() caseActivityId: number;
    componentStatus: string;
    @Output() caseActivityDialog = new EventEmitter();

    constructor(public _pageSize: PagesizeService, public printService: PrintService, public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencards: OpencardsService, public _caseActivity: FpCaseActivityService, public _home: HomeService, public _router: Router,
        public _CaseTeamService: CaseTeamService, public _client: ClildFormService, public _localValues: LocalValues,
        public _activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.currentReferralID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('ref-id'));
        this.currentRecordID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('case-activity'));
        this.currentReferralType = this._activatedRoute.snapshot.queryParamMap.get('ref-type');
        this.getListOfFormsEntires();
        this.formControl = false;
        this.editControll = false;
        this.formValidation();
        this.getClientDetails();
        this.generateFISClientData();
        this.getStaffDetails();
        this.getCaseActicityDetailsByRec();
        this.getCisJson();
        this.isDetailsPage = true;
        // this.isAttachmentRequired = true;
        this.isPrint = true;
        this.caseActivityForm.disable();
        this.editControll = true;

        this.breadcrumbs.push(
            { label: 'List', href: "/reports/client", active: '' },
            { label: 'Form', href: "/reports/client/details", active: '' },
            { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
            { label: 'Case Activity List', href: "/reports/referral/family-preservation/case-activity/view", active: '' },
            { label: 'Case Activity', active: 'active' }
        );
        if (this._router.url == '/reports/referral/family-preservation/case-activity/new' || this._router.url == '/reintegration/referral/opencard/case-activity/new') {
            this.showAdditionalClientList = true;
            this.getOtherClientLists({ value: { name: 'Open Clients Only', code: 'Open Clients Only' } }, this.initial, this.end);
            this.fpCaseActivity.clientID = {
                clientName: localStorage.getItem('clientName')
            }
        }

        if (this._router.url == "/reports/referral/family-preservation/case-activity/new") {
            this.showAdditionalClientList = true;
            this.getOtherClientLists({ value: { name: 'Open Clients Only', code: 'Open Clients Only' } }, this.initial, this.end);
        }
        let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
        this._opencards.breadcurmbsDetermination('case-activity', referralTypeId, this.breadcrumbs);
        if (referralTypeId === 9) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('Caseactivity-NCOPS', this.breadcrumbs)
        }
        if (referralTypeId === 7) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCRFC', this.breadcrumbs)
        }
        if (referralTypeId === 8) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCHS', this.breadcrumbs)
        }
        this.defineOpencards();
        this.attachmentOpencards.sort((a, b) => { return a['title'].localeCompare(b['title']) })
        this.getContactType();
        this.getReferralTypeBasedPersonType();
        if (referralTypeId === 15) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        this.referralType = this._opencards.getOtherRefDetails().referralName || this.currentReferralType;



    };

    isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }

    formValidation() {
        this.caseActivityForm = this._fb.group({
            'beginDate': [null, Validators.compose([Validators.required])],
            'endDate': [null, Validators.compose([Validators.required])],
            'units': [null],
            'staffID': [null, Validators.compose([Validators.required])],
            'personTypeID': [null, Validators.compose([Validators.required])],
            'contactTypeID': [null, Validators.compose([Validators.required])],
            'procodeID': [null, Validators.compose([Validators.required])],
            'notes': [null],
            'clientID': [null],
            'referralID': [null],
            'caseActivityID': [null]
        });
        this.caseActivityPrintForm = this._fb.group({
            'beginDate': [null, Validators.compose([Validators.required])],
            'endDate': [null, Validators.compose([Validators.required])],
            'units': [null],
            'staffID': [null, Validators.compose([Validators.required])],
            'personTypeID': [null, Validators.compose([Validators.required])],
            'contactTypeID': [null, Validators.compose([Validators.required])],
            'procodeID': [null, Validators.compose([Validators.required])],
            'notes': [null],
            'clientID': [null],
            'referralID': [null],
            'caseActivityID': [null]
        });

    }

    getClientDetails() {
        const encryptClientID = localStorage.getItem('clientId');
        const encryptReferralID = localStorage.getItem('referralId');
        const hasKey = this._opencards.getHasKey();
        this.clientId = parseInt(encryptClientID) - hasKey;
        this.referralId = parseInt(encryptReferralID) - hasKey;
    }
    editForm() {
        this.formControl = false;
        this.isEditEnabled = true;
        this.caseActivityForm.enable();
    }
    personType_type;
    saveForm(source: any) {
        this.componentStatus = 'Please wait...';
        if (this.caseActivityForm.valid) {
            let referralTypeId;

            // !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
            // !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
            let personType = source.personTypeID.personType;
            this.personType_type = source.personTypeID.personType;
            !isNullOrUndefined(source.beginDate) ? source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate)) : null;
            !isNullOrUndefined(source.endDate) ? source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate)) : null;
            !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.staffID : null;
            !isNullOrUndefined(source.personTypeID) ? source.personTypeID = source.personTypeID.personTypeID : null;
            !isNullOrUndefined(source.contactTypeID) ? source.contactTypeID = source.contactTypeID.contactTypeID : null;
            !isNullOrUndefined(source.procodeID) ? source.procodeID = source.procodeID.ProcodeID : null;
            source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
            source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey();
            source.pdfForms = !isNullOrUndefined(this.pdfForms) ? this.pdfForms : null;
            referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
            source.clientName = localStorage.getItem('clientName');

            if (source.caseActivityID) {
                this._caseActivity.updatecaseActivity(source).then(data => {

                    var getCaseActivityID = _.find(data.caseActivity, { 'clientID': this.clientId });
                    console.log("getCaseActivityID>>>>", getCaseActivityID);
                    console.log("getCaseActivityID.caseActivityID>>>>", getCaseActivityID.caseActivityID);
                    this._localValues.caseAcitivityID = getCaseActivityID.caseActivityID;

                    // this._localValues.caseAcitivityID = data.caseActivity[0].caseActivityID;
                    if (personType == 'Case Manager') {
                        this.sendEmail();
                    }

                    this._localValues.caseAcitivityID = data.caseActivity.caseActivityID;
                    this.componentStatus = 'Record has been updated!';
                }).finally(() => {
                    if (this.referrralTypeId !== 1) {
                        if (this.NTFFValidation()) {
                            return this.checkForExistingNTFF();
                        } else if (this.progressNoteFormValidation()) {
                            return this.checkForExistingProgressNote();
                        } else if (this.supervisoryStaffingFormValidation()) {
                            return this.checkForExistingSupervisoryStaffing();
                        } else if (this.lackOfContactFormValidation()) {
                            return this.checkForExistingLackOfContact();
                        }
                        else {
                            this.caseActivityDialog.emit('close');
                        }
                    } else {
                        this.caseActivityDialog.emit('close');
                    }
                })
            } else {
                console.log("source>>>>", source);
                this.formDatas = source;
                this.saveForm_client();
            }
        }
        else {
            this.componentStatus = 'Please fill the mandatoy fields';
        }
    }
    saveTypeOfContact(contactTypeID) {
        switch (contactTypeID.FpCaseActivity.contactTypeID) {
            case 7:
                this.nonTherapySave(contactTypeID);
                break;
        }
    }

    generateFISClientData() {
        let req, referralId;
        referralId = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey() || this.currentReferralID;
        req = { referralID: referralId, beginPagination: 1, endPagination: 10 }
        this._opencards.getFISClientByreferralId(req).then((data) => {
            this.fisClientData = data.ClientReferral;
        })
    }

    generateFilteredFisClient(event) {
        this.filteredFisClient = [];
        this.fisClientData.filter((item) => {
            if (item.clientName.indexOf(event.query) !== -1) {
                this.filteredFisClient.push(item);

            }
        })
    }


    getMetaData(event, label) {

        let reqObj: any, request: any, nameFields = ['firstName', 'lastName'], email: any
        switch (label) {
            case 'staff':
                reqObj = 'staff';
                break;
            case 'fisClient':
                this.generateFilteredFisClient(event);
                break;
            case 'personType':
                this.getFilteredPersonType(event);
                break;
            case 'contact':
                this.getContactType();
                break;
            case 'procode':
                this.getProcodeInfo();
        }

        request = { Object: reqObj, value: event.query }
        if (reqObj) {
            this._CaseTeamService.getSearchList(request).then((data) => {
                if (reqObj == 'procode') {
                    data.dropDown.map((item) => {
                        if (item.procode.startsWith("9")) {
                            this.procodeValidateArray.push(item.procodeID);
                        }
                    })
                }
                data.dropDown.map((item) => {
                    item['procodeWithDesc'] = `${item.procode}  - ${item.categoryOfService !== null ? item.categoryOfService : 'Category of service not found!'}`
                    nameFields.map((check) => {
                        if (Object.keys(item).includes(check)) {
                            email = !isNullOrUndefined(item.email) ? item.email : 'Email not provided!'
                            item['fullName'] = item.lastName + ' ' + item.firstName + '(' + email + ')';
                        }
                    })
                })
                this.metaData = data.dropDown;
            })
        }
    }
    getContactType() {
        let req = { referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey() }
        this._CaseTeamService.getContactTypeByReferral(req).then((data) => {
            data.contactType.map((item) => {
                item['contactType'] = item.ContactType;
                item['contactTypeID'] = item.ContactTypeID;
            });
            this.metaData = data.contactType;
            this.contactTypes = data.contactType;
        })
    }

    getFilteredPersonType(event: any) {
        this.metaData = [];
        this.personTypes.map((item: any) => {
            if (item.personType.toLowerCase().indexOf(event.query) !== -1) {
                this.metaData.push(item)
            }
        })
    }
    getPersonTypeId(event) {
        console.log(">>>>>", event);
    }
    getProcodeInfo() {
        event;
        let req = {
            'beginDate': moment.utc(this.fpCaseActivity.beginDate).format("MM/DD/YYYY"),
            'endDate': moment.utc(this.fpCaseActivity.endDate).format("MM/DD/YYYY"),
            'referralTypeID': parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey(),
            'personTypeID': this.fpCaseActivity.personTypeID['personTypeID']
        }
        this._CaseTeamService.getProcodeCA(req).then((data) => {
            data.procode.map((item) => {
                item['procodeID'] = item.ProcodeID;
                if (item.ProcodeFinal.startsWith("9")) {
                    this.procodeValidateArray.push(item.procodeID);
                }
            });
            this.metaData = data.procode;
            this.procodes = data.procode;
        })
    }
    getCaseActicityDetailsByRec() {
        let email: any;
        this.req = { caseActivityID: this.caseActivityId }
        this.componentStatus = 'Gathering information from database please wait.'
        this._opencards.getCaseActivityById(this.req).then((data) => {
            this.componentStatus = '';
            localStorage.setItem('caseActivityID', data.caseActivity.caseActivityID + this._opencards.getHasKey());
            localStorage.setItem('CisCaseActivityId', data.caseActivity.caseActivityID);
            this.selectedClientFacts = data.caseActivity.clientID.kaecses;
            this.selectedClientKaecses = data.caseActivity.referralID.caseID.facts;
            this._localValues.caseAcitivityID = data.caseActivity.caseActivityID;
            this.isAttachment = true;
            if (data.caseActivity.staffID) {
                if (Object.keys(data.caseActivity.staffID)) {
                    email = !isNullOrUndefined(data.caseActivity.staffID.email) ? data.caseActivity.staffID.email : 'Email not provided!'
                    data.caseActivity.staffID['fullName'] = data.caseActivity.staffID.lastName + ' ' + data.caseActivity.staffID.firstName + '(' + email + ')';
                }
            }
            // if (data.caseActivity.isActive) {
            //   !isNullOrUndefined(data.caseActivity.beginDate) ? data.caseActivity.beginDate = moment(data.caseActivity.beginDate).format('MM/DD/YYYY HH:mm') : null;
            //   !isNullOrUndefined(data.caseActivity.endDate) ? data.caseActivity.endDate = moment(data.caseActivity.endDate).format('MM/DD/YYYY HH:mm') : null;
            // } else {
            //   !isNullOrUndefined(data.caseActivity.beginDate) ? data.caseActivity.beginDate = moment.utc(data.caseActivity.beginDate).format('MM/DD/YYYY HH:mm') : null;
            //   !isNullOrUndefined(data.caseActivity.endDate) ? data.caseActivity.endDate = moment.utc(data.caseActivity.endDate).format('MM/DD/YYYY HH:mm') : null;
            // }
            !isNullOrUndefined(data.caseActivityBeginDate) ? data.caseActivity.beginDate = moment(Date.parse(data.caseActivityBeginDate)).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.caseActivityEndDate) ? data.caseActivity.endDate = moment(Date.parse(data.caseActivityEndDate)).format('MM/DD/YYYY HH:mm') : null;

            !isNullOrUndefined(data.caseActivity.clientID) ? data.caseActivity.clientID['clientName'] = data.caseActivity.clientID.lastName + ',' + data.caseActivity.clientID.firstName : null;
            !isNullOrUndefined(data.caseActivity.procodeID) ? data.caseActivity.procodeID['ProcodeFinal']
                = `${data.caseActivity.procodeID.procode}  - ${data.caseActivity.procodeID.categoryOfService !== null ? data.caseActivity.procodeID.categoryOfService : 'Category of service not found!'}` : null;
            !isNullOrUndefined(data.caseActivity.procodeID) ? data.caseActivity.procodeID['ProcodeID']
                = data.caseActivity.procodeID.procodeID : null;
            this.pdfForms = !isNullOrUndefined(data.pdfForms) ? data.pdfForms.pdfForms : null;
            this.fpCaseActivity = data.caseActivity;
            let emailAdd = !isNullOrUndefined(data.caseActivity.staffID.email) ? data.caseActivity.staffID.email : 'Email not provided!'
            !isNullOrUndefined(this.fpCaseActivity.staffID) ? this.printStaffName = this.fpCaseActivity.staffID.lastName + this.fpCaseActivity.staffID.firstName + '(' + emailAdd + ')' : null;
            !isNullOrUndefined(this.fpCaseActivity.procodeID) ? this.printProcode = this.fpCaseActivity.procodeID.ProcodeFinal : null;
            this.getProcodeInfo();

        })
    }

    /***
     * @param event - autocomplete selection event
     */
    getSelectedContactType(event) {
        this.editControll = false;

        switch (event.contactTypeID) {
            case 7:
                // this.isNtfflog = true;
                break;
            case 113:
                // this.ispps50031 = true;
                break;
            case 109:
                // this.issupervisoryStaffing = true;
                break;
            case 36:
                // this.isworkerChildvisitActivityNote = true;
                break;
            case 35:
                // this.isworkerParentVisitAcitivity = true;
                break;
            case 119:
                // this.isParentChildVisitation = true;
                break;
        }
    }

    getFormData(event: any) {
        if (event.cmsData) {
            this.pdfForms = event.formData;
            this.isNtfflogCis = false;
            this.ispps50031 = false;
            this.issupervisoryStaffing = false;
        } else if (event.cisFormData) {
            if (this.editControll === false) {
                this.caseId = true;
            }
            this.getCisJson();
            this.isworkerChildvisitActivityNote = false;
            this.isworkerParentVisitAcitivity = false;
            this.isParentChildVisitation = false;
        }
    }

    cisView(version) {
        this._opencards.setCisJsonVersion(version);


        switch (localStorage.getItem('contactType')) {
            case 'Worker/Child':
                this.isworkerChildvisitActivityNote = true;

                break;
            case 'Worker/Parent':
                this.isworkerParentVisitAcitivity = true;

                break;
            case 'Parent':
                this.isParentChildVisitation = true;

                break;
            case 'Staff Case':
                this.isCaseActivityNode = true;

                break;

            default:
                this.isCaseActivityNode = true;

        }
    }

    cisVersionBasedView(version) {
        this._opencards.setCisJsonVersion(version);



        switch (localStorage.getItem('contactType')) {
            case 'Worker/Child':
                this.isworkerChildvisitActivityNote = true;

                break;

            case 'Worker/Parent':
                this.isworkerParentVisitAcitivity = true;

                break;

            case 'Parent/Child':
                this.isParentChildVisitation = true;

                break;

            default:
                this.CaseActivityNode();

        }
    }

    CaseActivityNode() {
        switch (this._opencards.getCaseActivityData()) {
            case 'Placement Support Plan':
                this.isFosterCareNode = true;
                break;
            case 'Case Activity':
                this.isCaseActivityNode = true;
                break;
            case 'Parent/Child':
                this.isParentChildVisitation = true;
                break;
            case 'Worker Parent Visit Activity Log':
                this.isworkerParentVisitAcitivity = true;
                break;
            case 'Worker Child Visit Activity Note':
                this.isworkerChildvisitActivityNote = true;
                break;

            default:

        }
    }

    viewAttachment() {
        this.editControll = false;
        switch (this.pdfForms.typeOfDoc) {
            case 'ntffLog':
                this.isNtfflogCis = true;
                break;
            case 'supervisoryStaff':
                this.issupervisoryStaffing = true;
                break;
            case 'loc':
                this.ispps50031 = true;
                break;
            case 'wpvaForm':
                this.isworkerParentVisitAcitivity = true;
                break;
            case 'wcvnForm':
                this.isworkerChildvisitActivityNote = true;
                break;
        }
    }

    getCisJson() {


        const data = { 'caseActivityId': parseInt(localStorage.getItem('caseActivityID')) - this._opencards.getHasKey() };

        this._opencards.getCisFormJson(data)
            .then((data) => {
                this.formCisArrayValue = data.cmsCisPdfDoc;
                let pdfjson = JSON.parse(data.cmsCisPdfDoc ? data.cmsCisPdfDoc[0].pdfJsonData : null);
                if (pdfjson) {
                    if (pdfjson.cmsFormJson) {

                    }
                    else {
                        this.isCisDataStored = true;
                    }
                }

            })
    }

    discardBtn() {
        this.isworkerChildvisitActivityNote = false;
    }

    defineOpencards() {
        this.attachmentOpencards = [
            { title: 'Case Activity', count: '20' }
        ];
    }

    discardModel() {
        this.isworkerChildvisitActivityNote = false;
        this.isworkerParentVisitAcitivity = false;
        this.isParentChildVisitation = false;
        this.isCaseActivityNode = false;
        this.isFosterCareNode = false;
    }



    generateVersion(versionStr) {
        let versionTemp = versionStr + 10;
        let version = versionTemp.toString();
        return (version.charAt(0) + '.' + version.charAt(1));
    }

    dateValidation(value) {
        if (!isNullOrUndefined(this.fpCaseActivity.beginDate) && !isNullOrUndefined(this.fpCaseActivity.endDate)) {
            if (this.fpCaseActivity.beginDate > this.fpCaseActivity.endDate) {
                this.fpCaseActivity.beginDate = null;
                this.fpCaseActivity.endDate = null;
                this.componentStatus = 'Please enter a valid begin date/end date';
            }
        }
    };

    getStaffingValue(event) {
        if (event.contactType == 'Supervisory Staffing') {
            this.showSuperVising = true;
        } else {
            this.showSuperVising = false;
        }
    }

    printPreview() {
        this.fetchPrintFormValues();
        // this.isCaseActivityPrintable = true;
        this.passData();
        this.printService.isPrinting = true
        let data = {
            caseActPrintValues: this.caseActPrintValues,
            printStaffNotes: this.printStaffNotes,
            printProcode: this.printProcode,
            printStaffName: this.printStaffName,
            facts: this.selectedClientFacts,
            kaecses: this.selectedClientKaecses
        }
        this.printService
            .printDocument('case-activity', data);

    }

    async printForm() {
        let element = document.getElementById('print-content');
        let opt = {
            margin: 1,
            filename: 'caseActivity.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all', before: '#page2el' }
        };
        await html2pdf().from(element).set(opt).save();
        this.isCaseActivityPrintable = false;
    }

    rowMethod(event) {
        if (!isNullOrUndefined(event)) {
            let singleNewLineCount = this._opencards.search_word(event, "\n");
            let doubleNewLineCount = this._opencards.search_word(event, "\n\n");
            return Math.ceil((event.length / 130) + (singleNewLineCount - doubleNewLineCount));
        }
        else {
            return 3;
        }
    }

    closeModalBox() {
        this.isCaseActivityPrintable = false;
    }
    sendEmail() {
        let mailFormData: FormData = new FormData();
        var req = {
            "to": ["keshavaraj@pinnacleseven.com"],
            "cc": [],
            "bcc": [],
            "subject": "A case manager has been Edited / Entered for Client :" + localStorage.getItem('clientName'),
            "content": "The record was Edited / Entered by " + this.enteredBy + " on " + moment.utc(new Date()).format('MM/DD/YYYY HH:mm') + " the case manager is " + this.caseManagerName,
            "attachment": "any",
            "fileName": "file1.pdf"
        };
        mailFormData.append('emailJson', JSON.stringify(req));
        this._opencards.sendEmail(mailFormData).then((data) => {
        })
    };
    getStaffName(ev) {
        this.caseManagerName = ev.fullName;
    };
    getStaffDetails() {
        var staffId = isNullOrUndefined(localStorage.getItem('UserId')) ? 5130 : parseInt(localStorage.getItem('UserId'));
        this._team.getUserById({ staffID: staffId }).then(data => {
            this.enteredBy = data.users.firstName + data.users.lastName;
        })
    }

    passData() {

        let re = /\r\n|\n\r|\n|\r/g;
        let arr = this.fpCaseActivity.notes.replace(re, "\n").split("\n");
        arr.map((item) => {
            if (item === '') {
                item = `<br>`;
            }
        });
        this.printStaffNotes = arr;

    }

    fetchPrintFormValues() {

        !isNullOrUndefined(this.fpCaseActivity.clientID) ? this.caseActPrintValues.clientID = this.fpCaseActivity.clientID.clientName : null;
        !isNullOrUndefined(this.fpCaseActivity.beginDate) ? this.caseActPrintValues.beginDate = this.fpCaseActivity.beginDate : null;
        !isNullOrUndefined(this.fpCaseActivity.endDate) ? this.caseActPrintValues.endDate = this.fpCaseActivity.endDate : null;
        !isNullOrUndefined(this.fpCaseActivity.units) ? this.caseActPrintValues.units = this.fpCaseActivity.units : null;
        !isNullOrUndefined(this.fpCaseActivity.contactTypeID) ? this.caseActPrintValues.contactTypeID = this.fpCaseActivity.contactTypeID.contactType : null;
        !isNullOrUndefined(this.fpCaseActivity.personTypeID) ? this.caseActPrintValues.personTypeID = this.fpCaseActivity.personTypeID.personType : null;

    }

    getListOfFormsEntires() {
        let loader = document.getElementById('loading-overlay') as HTMLElement;
        let NTFFreq: any, PNReq: any, SSReq: any, LCReq: any, referralID: any, beginPagination = 1, endPagination = 100,
            NTFFsort = { column: "NonTherapyFaceToFaceID", mode: "desc" }, PNsort = { column: "progressNoteID", mode: "desc" },
            LCsort = { column: "ScannedDocumentID", mode: "desc" }, SSsort = { column: "CaseActivityID", mode: "desc" }

        this.listOfNTFFs = [];
        this.listOfProgressNotes = [];
        this.listOfSupervisoryStaffings = [];
        this.listOfLackOfContacts = [];
        referralID = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey() || this.currentReferralID,
            NTFFreq = { referralID: referralID, beginPagination: beginPagination, endPagination: endPagination, sort: NTFFsort },
            PNReq = { referralID: referralID, beginPagination: beginPagination, endPagination: endPagination, sort: PNsort };
        LCReq = { referralID: referralID, beginPagination: beginPagination, endPagination: endPagination, sort: LCsort };
        SSReq = { referralID: referralID, beginPagination: beginPagination, endPagination: endPagination, sort: SSsort };
        this._opencards.getNTFFList(NTFFreq).then((data: any) => {
            this.listOfNTFFs = data.nonTherapyFaceToFace;
        }).then(() => {
            this._opencards.listAllProgressNote(PNReq).then((data: any) => {
                this.listOfProgressNotes = data.progressNote;
            }).then(() => {
                this._opencards.getListAllSupervisoryStaffing(SSReq).then((data: any) => {
                    this.listOfSupervisoryStaffings = data.supervisoryStaffingCaseActivity;
                }).then(() => {
                    this._opencards.getlackOfContactList(LCReq).then((data: any) => {
                        this.listOfLackOfContacts = data.lackOfContactCaseActivity;
                    })
                })
            })
        }).finally(() => {

        })
    }

    checkForExistingNTFF() {
        let currentCaseActivityID: any, referralTypeId: any, isCARedirect = false;
        currentCaseActivityID = this._localValues.caseAcitivityID;
        referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
        Promise.all(
            this.listOfNTFFs.filter((item: any) => {
                if (item.caseActivityID === currentCaseActivityID) {
                    isCARedirect = true;
                }
            })
        ).then(() => {
            if (isCARedirect) {
                this._opencards.navigateToListView('case-activity', referralTypeId)
            } else {
                this._router.navigate(['/reports/referral/family-preservation/non-therapy-face-to-face/new'])
            }
        })
    }

    filteredContactTypes(event: any) {
        this.filteredContactTypesData = [];
        this.contactTypes.filter((item: any) => {
            if (item.contactType.toLowerCase().indexOf(event.query) !== -1) {
                this.filteredContactTypesData.push(item)
            }
        })
    }

    filteredProcodes(event: any) {
        this.filteredProcodeData = [];
        this.procodes.filter((item: any) => {
            if (item.ProcodeFinal.toLowerCase().indexOf(event.query) !== -1) {
                this.filteredProcodeData.push(item)
            }
        })
    }

    NTFFValidation() {
        let isNTFFValid = false, currentPersonTypeID: any, currentProcodeID: any, currentContactTypeID: any;
        currentPersonTypeID = this.fpCaseActivity.personTypeID;
        currentProcodeID = this.fpCaseActivity.procodeID;
        currentContactTypeID = this.fpCaseActivity.contactTypeID;

        if (currentPersonTypeID == 23 ||
            currentPersonTypeID == 101 ||
            currentPersonTypeID == 98 ||
            currentPersonTypeID == 21 ||
            currentPersonTypeID == 68 ||
            currentPersonTypeID == 181) {
            if (currentProcodeID == 147 || currentProcodeID == 599) {
                if (currentContactTypeID == 7) {
                    isNTFFValid = true;
                }
            }
        }
        return isNTFFValid;
    }

    progressNoteFormValidation() {
        let isProgressNoteFormValid = false, currentPersonTypeID: any, currentProcodeID: any, currentContactTypeID: any;
        currentPersonTypeID = this.fpCaseActivity.personTypeID;
        currentProcodeID = this.fpCaseActivity.procodeID;
        if (this.referralType == 'NC-OPS') {
            if (currentProcodeID == 314 ||
                currentProcodeID == 315 ||
                currentProcodeID == 316 ||
                currentProcodeID == 319 ||
                currentProcodeID == 321 ||
                currentProcodeID == 328 ||
                currentProcodeID == 329 ||
                currentProcodeID == 330 ||
                currentProcodeID == 477 ||
                currentProcodeID == 478 ||
                currentProcodeID == 480 ||
                currentProcodeID == 482 ||
                currentProcodeID == 481 ||
                currentProcodeID == 486 ||
                currentProcodeID == 487 ||
                currentProcodeID == 488 ||
                currentProcodeID == 578 ||
                currentProcodeID == 579 ||
                currentProcodeID == 583 ||
                currentProcodeID == 585 ||
                currentProcodeID == 587 ||
                currentProcodeID == 589 ||
                currentProcodeID == 591 ||
                currentProcodeID == 593 ||
                currentProcodeID == 594 ||
                currentProcodeID == 595 ||
                currentProcodeID == 753 ||
                currentProcodeID == 754
            ) {
                isProgressNoteFormValid = true;
            }
        } else {
            if (currentPersonTypeID == 21 || currentPersonTypeID == 68 ||
                currentPersonTypeID == 181) {
                if (currentProcodeID == 573 ||
                    currentProcodeID == 582 ||
                    currentProcodeID == 586 ||
                    currentProcodeID == 590 ||
                    currentProcodeID == 596 ||
                    currentProcodeID == 41 ||
                    currentProcodeID == 307 ||
                    currentProcodeID == 584 ||
                    currentProcodeID == 588 ||
                    currentProcodeID == 592 ||
                    currentProcodeID == 597 ||
                    currentProcodeID == 461 ||
                    currentProcodeID == 760 ||
                    currentProcodeID == 594 ||
                    currentProcodeID == 308 ||
                    currentProcodeID == 575 ||
                    currentProcodeID == 761 ||
                    currentProcodeID == 752) {
                    isProgressNoteFormValid = true;
                }
            }
        }

        return isProgressNoteFormValid;

    }

    supervisoryStaffingFormValidation() {
        let isSupervisoryStaffingFormValid = false, currentPersonTypeID: any, currentProcodeID: any, currentContactTypeID: any;
        currentPersonTypeID = this.fpCaseActivity.personTypeID;
        currentProcodeID = this.fpCaseActivity.procodeID;
        currentContactTypeID = this.fpCaseActivity.contactTypeID;
        if (currentPersonTypeID === 83) {
            if (currentProcodeID === 147) {
                if (currentContactTypeID === 109) {
                    isSupervisoryStaffingFormValid = true;
                }
            }
        }
        return isSupervisoryStaffingFormValid;
    }

    lackOfContactFormValidation() {
        let isLackOfContactFormValid = false, currentContactTypeID: any;
        currentContactTypeID = this.fpCaseActivity.contactTypeID;
        if (currentContactTypeID === 113) {
            isLackOfContactFormValid = true;
        }
        return isLackOfContactFormValid;
    }

    checkForExistingProgressNote() {
        let currentCaseActivityID: any, referralTypeId: any, isCARedirect = false;
        currentCaseActivityID = this._localValues.caseAcitivityID;
        referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
        Promise.all(
            this.listOfProgressNotes.filter((item: any) => {
                if (item.caseActivityID === currentCaseActivityID) {
                    isCARedirect = true;
                }
            })
        ).then(() => {
            if (isCARedirect) {
                this._opencards.navigateToListView('case-activity', referralTypeId)
            } else {
                this._router.navigate(['/reports/referral/family-preservation/progress-notes/new'])
            }
        })
    }

    checkForExistingSupervisoryStaffing() {
        let currentCaseActivityID: any, referralTypeId: any, isCARedirect = false;
        currentCaseActivityID = this._localValues.caseAcitivityID;
        referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
        Promise.all(
            this.listOfSupervisoryStaffings.filter((item: any) => {
                if (item.caseActivityID === currentCaseActivityID) {
                    isCARedirect = true;
                }
            })
        ).then(() => {
            if (isCARedirect) {
                this._opencards.navigateToListView('case-activity', referralTypeId)
            } else {
                this._router.navigate(['/reports/supervisory-staffing-form/new'])
            }
        })
    }

    checkForExistingLackOfContact() {
        let currentCaseActivityID: any, referralTypeId: any, isCARedirect = false;
        currentCaseActivityID = this._localValues.caseAcitivityID;
        referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
        Promise.all(
            this.listOfLackOfContacts.filter((item: any) => {
                if (item.caseActivityID === currentCaseActivityID) {
                    isCARedirect = true;
                }
            })
        ).then(() => {
            if (isCARedirect) {
                this._opencards.navigateToListView('case-activity', referralTypeId)
            } else {
                this._router.navigate(['/reports/lack-of-contact/new'])
            }
        })
    }
    /**
     * "isNCFCHOK"  : true  if referral type id is 10
     * "isBHOK"     : true  if referral type id is 15
       "isNCBHOK"   : true  if referral type id is 16
       "isNCOPS"    : true  if referral type id is 9
       "isNCFCHNE"  : true  if referral type id is 12
       "isNCKIPP"   : true  if referral type id is 13
       "isContract" : true  if referral type id is 2,1,5
     */
    getReferralTypeBasedPersonType() {

        let req = {};
        let isRequestValid = true;
        switch (this.referrralTypeId) {
            case 9:
                req = {
                    isNCOPS: true,
                    isContract: false,
                    isNCFCHOK: false,
                    isBHOK: false,
                    isNCBHOK: false,
                    isNCFCHNE: false,
                    isNCKIPP: false
                }
                break;
            case 7:
                req = {
                    isNCOPS: false,
                    isContract: true,
                    isNCFCHOK: false,
                    isBHOK: false,
                    isNCBHOK: false,
                    isNCFCHNE: false,
                    isNCKIPP: false
                }
                break;

            case 4:
                break;
            case 5:
            case 2:
            case 1:
                req = {
                    isContract: true,
                    isNCFCHOK: false,
                    isBHOK: false,
                    isNCBHOK: false,
                    isNCOPS: false,
                    isNCFCHNE: false,
                    isNCKIPP: false
                }
                break;
            case 8:
                req = {
                    isContract: true,
                    isNCFCHOK: false,
                    isBHOK: false,
                    isNCBHOK: false,
                    isNCOPS: false,
                    isNCFCHNE: false,
                    isNCKIPP: false
                }
                break;

            default:
                isRequestValid = false;
        }
        if (isRequestValid) {
            this._CaseTeamService.getPersonTypeByReferral(req).then((data) => {
                data.personType.map((item) => {
                    item['personType'] = item.personType;
                });
                this.personTypes = data.personType;
            })
        }

    }
    rowData = [];
    totalCount: any;
    headers = [];
    rawdata = [];
    columnDefs = [];
    select_add_clint: any;
    getOtherClientLists(event, init, end) {
        this.selectClient = event.value.code;
        this.select_add_clint = event;
        this.selectedClientList = [];
        console.log(event.value);
        var source;


        if (event.value.code == "Only Clients with Same Facts") {
            source = {
                "condition": event.value.code,
                "clientID": this.clientId,
                "referralID": this.referralId,
                "facts": parseInt(localStorage.getItem('facts')),
                "blnFaceToFaceTracking": false,
                "referralTypeID": parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey(),
                "beginPagination": init,
                "endPagination": end
            }
        } else if (event.value.code == "Open Clients in Referral") {
            source = {
                "condition": event.value.code,
                "clientID": this.clientId,
                "referralID": this.referralId,
                "beginPagination": init,
                "endPagination": end
            }
        } else {
            source = {
                "condition": event.value.code,
                "clientID": this.clientId,
                "referralTypeID": parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey(),
                "beginPagination": init,
                "endPagination": end
            }
        }

        this._caseActivity.getAdditionalClientList(source).then((data) => {

            if (data.additionalClients.length != 0) {
                this.defaultColDef = {
                    headerCheckboxSelection: this.isFirstColumn,
                    checkboxSelection: this.isFirstColumn
                };
                data.additionalClients.map(itf => {
                    delete itf['KK'];
                    delete itf['MasterCase'];
                    delete itf['ARP'];
                    delete itf['ReferralTypeID'];
                    // delete itf['ReferralID'];
                    delete itf['PersonTypeID'];
                })
                this.rowData = data.additionalClients;
                let rowData = [];
                this.totalCount = data.totalCount;
                if (data.totalCount < 100) {
                    this.end = this.totalCount;
                }
                let arrangments = [];
                let test = [];
                this.headers.push(Object.keys(this.rowData[0]));
                this.headers[0].forEach(function (ele) {
                    console.log("ele>>>>>", ele);
                    let data = {
                        headerName: ele
                            .replace(/\b\w/g, l => l.toUpperCase())
                            .replace(/([A-Z])/g, " $1")
                            .trim(),
                        field: ele
                    };
                    test.push(data);
                });
                test.sort((a, b) => a['order'] - b['order']);
                test
                this.rawdata.push(test);
                this.columnDefs = test;
                this.columnDefs.map(data => {
                    data;
                    if (data.field == 'DOB' || data.field == 'EndDate' || data.field == 'BeginDate' ||
                        data.field == 'Auth_BeginDate' || data.field == 'Auth_EndDate' || data.field == 'EOMDate' ||
                        data.field == 'ReferralDate' || data.field == 'ClosureDate' || data.field == 'PaymentEndDate' ||
                        data.field == 'PL_BeginDate' || data.field == 'PL_EndDate' || data.field == 'OrigDCFReferralDate' ||
                        data.field == 'PermClosureDate' || data.field == 'RetractedDate' || data.field == 'ReceivedDate' ||
                        data.field == 'Event_BeginDate' || data.field == 'Recent_LOCAuthDate' || data.field == 'Recidivist_ReturnOOHDate' ||
                        data.field == 'Adoption_LegallyAvailable' || data.field == 'Recent_CP_Completed'
                        || data.field == 'Recent_CP_PlannedPerm' || data.field == 'Posted_EOMDate' || data.field == 'EnteredDate' || data.field == 'PostedDate' ||
                        data.field == 'PaymentDueDate' || data.field == 'VoidDate' || data.field == 'ReleaseDate' || data.field == 'Event_EndDate' || data.field == 'Placement_BeginDate' || data.field == 'Placement_EndDate' ||
                        data.field == 'AdoptionDate' || data.field == 'ADTrans_ReferralDate' || data.field == 'BilledDate') {
                        data['valueFormatter'] = function (params) {
                            if (params.value) {
                                return moment.utc(params.value).format("MM/DD/YYYY");
                            } else {
                                return "";
                            }
                        };
                    }
                });
            } else {
                this.totalCount = 0;
                this.rowData = data.financeReports;
                this.componentStatus = 'No Data Found';
            }
        })
    };

    onRowSelected(event) {
        let select_data = {
            "clientID": event.data.ClientID,
            "referralID": event.data.ReferralID,
            "isThereEndDate": isNullOrUndefined(event.data.EndDate) ? 'yes' : 'no',
            "isBillable": true,
            "billedDate": null,
            "pdfForms": null
        };

        if (event.node.selected) {
            var data = {
                "clientName": event.data.LastName + " " + event.data.FirstName,
                "clientID": event.data.ClientID,
                "referralID": event.data.ReferralID,
                "isThereEndDate": isNullOrUndefined(event.data.EndDate) ? 'no' : 'yes',
                "isBillable": true,
                "billedDate": null,
                "pdfForms": null
            };
            this.selectedClientList.push(data);
        } else {
            this.selectedClientList.splice(this.selectedClientList.indexOf(select_data), 1);
        };
    };

    saveForm_client() {
        this.endDateClients = this.selectedClientList.filter(element => element.isThereEndDate === "yes");
        if (this.endDateClients.length > 0) {
            this.endDateClient = true;
        } else {
            this.addEndDateClients();
        }
    };
    clearEndClients() {
        this.endDateClients.map(itms => {
            this.selectedClientList.splice(this.selectedClientList.indexOf(itms), 1);
        });
        var datas = {
            "beginDate": this.formDatas.beginDate,
            "endDate": this.formDatas.endDate,
            "staffID": this.formDatas.staffID.staffID,
            "personTypeID": this.formDatas.personTypeID,
            "contactTypeID": this.formDatas.contactTypeID,
            "procodeID": this.formDatas.procodeID,
            "notes": this.formDatas.notes,
            "clientID": this.clientId,
            "referralID": this.referralId,
            "isBillable": true,
            "billedDate": null,
            "pdfForms": null
        };
        this.selectedClientList.map(its => {
            its['beginDate'] = datas.beginDate;
            its['endDate'] = datas.endDate;
            its['staffID'] = datas.staffID;
            its['personTypeID'] = datas.personTypeID;
            its['contactTypeID'] = datas.contactTypeID;
            its['procodeID'] = datas.procodeID;
            its['notes'] = datas.notes;
            its["referralID"] = this.referralId,
                delete its['isThereEndDate'];
            delete its['clientName'];
        });
        this.selectedClientList.push(datas);
        this.endDateClient = true;
        this.saveCase_Activity(this.selectedClientList);
        console.log("this.selectedClientList>>>>>>", this.selectedClientList);
    }
    addEndDateClients() {
        console.log(this.selectedClientList);
        var datas = {
            "beginDate": this.formDatas.beginDate,
            "endDate": this.formDatas.endDate,
            "staffID": this.formDatas.staffID,
            "personTypeID": this.formDatas.personTypeID,
            "contactTypeID": this.formDatas.contactTypeID,
            "procodeID": this.formDatas.procodeID,
            "notes": this.formDatas.notes,
            "clientID": this.clientId,
            "referralID": this.referralId,
            "isBillable": true,
            "billedDate": null,
            "pdfForms": null
        };
        this.selectedClientList.map(its => {
            its['beginDate'] = datas.beginDate;
            its['endDate'] = datas.endDate;
            its['staffID'] = datas.staffID;
            its['personTypeID'] = datas.personTypeID;
            its['contactTypeID'] = datas.contactTypeID;
            its['procodeID'] = datas.procodeID;
            its['notes'] = datas.notes;
            its["referralID"] = its.referralID,
                delete its['isThereEndDate'];
            delete its['clientName'];
        });
        this.selectedClientList.push(datas);
        this.saveCase_Activity(this.selectedClientList);
        this.endDateClient = false;
        console.log('datas>>>>>', datas);
        console.log('datas>>>>>', this.selectedClientList);
    };
    saveCaseactivityDatas = [];
    saveCase_Activity(source) {
        let referralTypeId;
        var getCaseActivityID;


        referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
        this._caseActivity.savecaseActivity({ "caseActivity": source }).then((data) => {
            if (this.selectClient == 'Only Clients with Same Facts') {
                this._localValues.multyClientIDS = data.caseActivity;
            } else {
                var primaryClientIDS = _.find(data.caseActivity, { 'clientID': this.clientId });
                this._localValues.multyClientIDS = [primaryClientIDS]
            }
            getCaseActivityID = _.find(data.caseActivity, { 'clientID': this.clientId });
            this._localValues.caseAcitivityID = getCaseActivityID.caseActivityID;
            this.saveCaseactivityDatas = data.caseActivity;
            this.isAttachment = true;
            var datas = {
                "referralID": this.referralId,
                "beginPagination": 1,
                "endPagination": 100,
                "sort": {
                    "column": "endDate",
                    "mode": "desc"
                }
            };
            this._opencards.getHOH_list(datas).then(hoh_data => {
                var client_ID = this.clientId;
                var foundHohClientData;
                if (hoh_data.ClientReferral.length > 0) {
                    var hohClientData = hoh_data.ClientReferral[0];
                    foundHohClientData = _.find(this.saveCaseactivityDatas, { 'clientID': hohClientData.clientID });
                    if (foundHohClientData == undefined) {
                        foundHohClientData = _.find(this.saveCaseactivityDatas, { 'clientID': client_ID });
                    }
                } else {
                    foundHohClientData = _.find(this.saveCaseactivityDatas, { 'clientID': client_ID });
                };
                this._opencards.setLackOfContactCaseActivity(foundHohClientData.caseActivityID);
                this._localValues.caseAcitivityID = foundHohClientData.caseActivityID;
                localStorage.setItem('caseActivityID', foundHohClientData.caseActivityID + this._opencards.getHasKey());
                this.componentStatus = 'Record has been saved!';
                this.caseActivityDialog.emit('close');

            });

            if (this.personType_type == 'Case Manager') {
                this.sendEmail();
            }
        }).finally(() => {
            if (this.referrralTypeId !== 1) {
                if (this.NTFFValidation()) {
                    return this._router.navigate(['/reports/referral/family-preservation/non-therapy-face-to-face/new']);
                } else if (this.progressNoteFormValidation()) {
                    return this._router.navigate(['/reports/referral/family-preservation/progress-notes/new']);
                } else if (this.supervisoryStaffingFormValidation()) {
                    return this._router.navigate(['/reports/supervisory-staffing-form/new']);
                } else if (this.lackOfContactFormValidation()) {
                    return this._router.navigate(['/reports/lack-of-contact/new']);
                }
                else {
                    window.history.back();
                    return this.isAttachment = true;
                    // return this._router.navigate(['/referral/family-preservation/case-activity/detail']);
                }
            } else {
                window.history.back();
                return this.isAttachment = true;
                // return this._router.navigate(['/referral/family-preservation/case-activity/detail']);
            }
        })
    };
    pagesizeNav(event) {
        let begin, end;
        if (event.keyCode == 13) {
            begin = this._pageSize.getPagesizeValues()[0];
            end = this._pageSize.getPagesizeValues()[1];
            this.initial = begin;
            this.end = end;
            return this.getOtherClientLists(this.select_add_clint, this.initial, this.end);
        }
    };
    pagesize(event) {
        if (event.target.localName == "img") {
            let begin, end;
            begin = this._pageSize.getPagesizeValues()[0];
            end = this._pageSize.getPagesizeValues()[1];
            this.initial = begin;
            this.end = end;
            return this.getOtherClientLists(this.select_add_clint, this.initial, this.end);
        }
    }
    nonTherapySave(contactTypeID) {
    }

}
