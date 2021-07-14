import { Component } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { PouchDbService } from '../../providers/pouchdb.service';
import { FormService } from '../../providers/form.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { Constants } from '../../constants';
import html2pdf from 'html2pdf.js';
import _ from 'lodash';
import * as moment from 'moment';
import { NetworkService } from './../../providers/network.service';
import { isNullOrUndefined } from 'util';
const TWO_SECONDS = 2000;
import { Psi } from './psiCalculation';
@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent {

  isOnline: boolean = this.networkService.isOnline();

  formsDb: any;
  docId: string;
  finalized: boolean = false;
  formData: any = {};
  selectedForm: string;
  date: string;
  showLoader: boolean;
  ispdfStarts = false;
  constructor(private dialog: MatDialog, private route: ActivatedRoute,
    private pouchDBService: PouchDbService, private snackBar: MatSnackBar,
    private formService: FormService, private networkService: NetworkService,
    public psi: Psi) {
    this.formsDb = pouchDBService.getFormsDB();
    networkService.getStatus().subscribe(message => {
      if (message.status === 'online') {
        this.isOnline = true;
      } else if (message.status === 'offline') {
        this.isOnline = false;
      }
    });
  }

  async ngOnInit() {
    // this.loader = document.getElementById('loading-overlay') as HTMLElement;
    this.selectedForm = this.route.snapshot.paramMap.get('id');
    if (this.selectedForm.charAt(0) === ':') {
      sessionStorage.setItem('selectedForm', localStorage.getItem('selectedForm'));
      localStorage.removeItem('selectedForm');
    } else {
      sessionStorage.setItem('selectedForm', this.selectedForm);
    }
    this.docId = this.route.snapshot.paramMap.get('docId');
    if (this.docId) {
      try {
        let doc = await this.formsDb.get(this.docId);
        this.formData = Object.assign({}, doc);
        this.selectedForm = this.formData.name;
      } catch (err) {
        this.snackBar.open('Error loading form', 'OK', { duration: TWO_SECONDS });
        console.error(err);
      }
    }
  }

  resetForm() {
    let formName = this.formData.name;
    this.formData = {
      'name': formName
    };
  }

  saveForm() {
    return this.formService.saveForm(this.formData);
  }

  calculateForm() {
    this.behaviorCalculation();
    return this.formService.saveForm(this.formData);
  }

  loaderStart() {
    let loader;
    loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
  }

  loaderComplete() {
    let loader;
    loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'none';
  }

  finalize() {

    const confirmationDialog = this.dialog.open(ConfirmationDialog);
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.formData.version = '1.6'; //application version
        // making the chechbox value as string from boolean
        _.forEach(this.formData, function (value, key) {
          if (!isNullOrUndefined(value)) {
            if (value.fieldOptionIndex === true) {
              value.fieldOptionIndex = "true"
            }
            if (value.fieldOptionIndex === false) {
              value.fieldOptionIndex = "false"
            }
          }
        });

        if (this.formData.program === Constants.PROGRAMS.REINTEGRATION.SHORT_NAME) {
          // sending the beginDate and endDate 
          if (this.formData.name === Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_CHILD_VISIT_ACTIVITY_NOTE9_19_16 ||
            this.formData.name === Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_PARENT_VISIT_ACTIVITY_LOG_TYPE_UNLOCKED ||
            this.formData.name === Constants.PROGRAMS.REINTEGRATION.FORMS.PARENT_CHILD_VISITATION_LOG_FORM) {
            let date = moment(this.formData.CompletionDate.value).format('YYYY-MM-DD');
            this.formData.beginDate = date + " " + this.formData.FromTime.value + ":00.000";
            this.formData.endDate = date + " " + this.formData.ToTime.value + ":00.000";
          }
        }
        else if (this.formData.program === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME) {
          this.formData.remarksField = this.formData.remarks.value;
          if ((this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_36MO) ||
            (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_48MO) ||
            (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_60MO) ||
            (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.NCFAS7_17_17)) {
            this.formData.disableValidate = true;
          }
        }

        if (this.formData.formName === 'Case Activity') {
          this.passData();
          setTimeout(() => {
            this.generatePdf().then(() => {
              this.pdfGen();
            })
          }, 3000);
        } else {
          this.generatePdf().then(() => {
            this.pdfGen();
          });
        }
      }
    });
  }
  passData() {
    if (this.formData.formName === 'Case Activity') {
      let re = /\r\n|\n\r|\n|\r/g;
      let arr = this.formData.staffNotes.value.replace(re, "\n").split("\n");
      arr.map((item) => {
        if (item === '') {
          item = `<br>`;
        }
      });
      this.formData.printVal = arr;
      this.ispdfStarts = true;
      return this.formData;
    }
  }
  pdfGen() {
    let loader;
    loader = document.getElementById('loading-overlay') as HTMLElement;
    let load = this.formService.loaderStart();

    if (load === true) {
      loader.style.display = 'block';
    }
    let response;
    let date = Date.now();
    this.date = moment(date).format('YYYY-MM-DD HH:MM:SS.SSS');
    this.formData.finalizedDate = this.date;
    console.log("this.formData>>>", this.formData);
    this.formService.finalize(this.formData)
      .then(() => {
        this.formService.change.subscribe(isOpen => {
          if (isOpen === true) {
            // this.loaderComplete();
          }
        });
      });
    if (response && response.id) {
      this.finalized = true;
    }
  }
  load() {
    if (this.formService.getFinalizeResponse() === true) {
      this.loaderComplete();
    }
    else {
      this.load();
    }
  }

  generatePdf() {
    let date = Date.now();
    this.date = moment(date).format('MM-DD-YYYY');
    for (let i = 0; i < document.getElementsByClassName('hideOnPdf').length; i++) {
      let divsToHide = document.getElementsByClassName('hideOnPdf')[i] as HTMLElement;
      divsToHide.style.display = 'none';
    }
    for (let i = 0; i < document.getElementsByClassName('showOnPdf').length; i++) {
      let divsToHide = document.getElementsByClassName('showOnPdf')[i] as HTMLElement;
      divsToHide.style.display = 'block';
    }
    let element = document.getElementById('pdf-content');
    let opt = {
      margin: 1,
      filename: this.formData.clientId,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, logging: true, dpi: 96 },
      pagebreak: { mode: 'avoid-all', before: '#page2el' },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
    };
    var pdf = html2pdf().from(element).set(opt).output('blob');
    return pdf.then((value) => {
      this.formData.file = value,
        this.formData.uploadFileDate = this.date
    });
  }

  behaviorCalculation() {
    if (this.formData.program === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME) {
      if (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_2MO
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_6MO
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_12mo
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_18mo
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_24MO
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_30MO
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_36MO
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_48MO
        || this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_60MO) {
        this.formData.TotalScore.value = 0;
        this.asqTotalScoreCalculation();
        this.asqScoreChartCalculation();
      }
      else if (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CROPS) {
        this.cropsCalculation();
      }
      else if (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CAFAS_SFCS10_2_17) {
        this.cafasCalculation();
      }
      else if (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PECFAS_SFCS3_8_17) {
        this.pecfasCalculation();
      }
      else if (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PS17_17_17) {
        this.psiCalculation();
      }
      else if (this.formData.name === Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CSDC) {
        this.csdcCalculation();
      }
    }
  }
  partCcsdcCalc() {
    let que1 = parseInt(this.formData.CSDC_KS_PartC_Question1_Client1.fieldOptionIndex) || 0;
    let que2 = parseInt(this.formData.CSDC_KS_PartC_Question2_Client1.fieldOptionIndex) || 0;
    let que3 = parseInt(this.formData.CSDC_KS_PartC_Question3_Client1.fieldOptionIndex) || 0;
    let que4 = parseInt(this.formData.CSDC_KS_PartC_Question4_Client1.fieldOptionIndex) || 0;
    this.formData.CTotal_Client1.value = que1 + que2 + que3 + que4;
    let que5 = parseInt(this.formData.CSDC_KS_PartC_Question1_Client2.fieldOptionIndex) || 0
    let que6 = parseInt(this.formData.CSDC_KS_PartC_Question2_Client2.fieldOptionIndex) || 0
    let que7 = parseInt(this.formData.CSDC_KS_PartC_Question3_Client2.fieldOptionIndex) || 0
    let que8 = parseInt(this.formData.CSDC_KS_PartC_Question4_Client2.fieldOptionIndex) || 0
    this.formData.CTotal_Client2.value = que5 + que6 + que7 + que8;
    let que9 = parseInt(this.formData.CSDC_KS_PartC_Question1_Client3.fieldOptionIndex) || 0
    let que10 = parseInt(this.formData.CSDC_KS_PartC_Question2_Client3.fieldOptionIndex) || 0
    let que11 = parseInt(this.formData.CSDC_KS_PartC_Question3_Client3.fieldOptionIndex) || 0;
    let que12 = parseInt(this.formData.CSDC_KS_PartC_Question4_Client3.fieldOptionIndex) || 0;
    this.formData.CTotal_Client3.value = que9 + que10 + que11 + que12;
    let que13 = parseInt(this.formData.CSDC_KS_PartC_Question1_Client4.fieldOptionIndex) || 0;
    let que14 = parseInt(this.formData.CSDC_KS_PartC_Question2_Client4.fieldOptionIndex) || 0;
    let que15 = parseInt(this.formData.CSDC_KS_PartC_Question3_Client4.fieldOptionIndex) || 0;
    let que16 = parseInt(this.formData.CSDC_KS_PartC_Question4_Client4.fieldOptionIndex) || 0;
    this.formData.CTotal_Client4.value = que13 + que14 + que15 + que16;
  }
  partDcsdcCalc() {
    let que1 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client1.fieldOptionIndex) || 0;
    let que2 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client1.fieldOptionIndex) || 0;
    let que3 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client1.fieldOptionIndex) || 0;
    let que4 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client1.fieldOptionIndex) || 0;
    let que5 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client1.fieldOptionIndex) || 0;
    let que6 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client1.fieldOptionIndex) || 0;
    let que7 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client1.fieldOptionIndex) || 0;
    let que8 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client1.fieldOptionIndex) || 0;
    let que9 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client1.fieldOptionIndex) || 0;
    let que10 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client1.fieldOptionIndex) || 0;
    let que11 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client1.fieldOptionIndex) || 0;
    let que12 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client1.fieldOptionIndex) || 0;
    let que13 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client1.fieldOptionIndex) || 0;
    this.formData.D2Total_Client1.value = que1 + que2 + que3 + que4 + que5 + que6 + que7 + que8 + que9 + que10 + que11 + que12 + que13;

    let que15 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client2.fieldOptionIndex) || 0;
    let que16 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client2.fieldOptionIndex) || 0;
    let que17 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client2.fieldOptionIndex) || 0;
    let que18 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client2.fieldOptionIndex) || 0;
    let que19 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client2.fieldOptionIndex) || 0;
    let que20 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client2.fieldOptionIndex) || 0;
    let que21 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client2.fieldOptionIndex) || 0;
    let que22 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client2.fieldOptionIndex) || 0;
    let que23 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client2.fieldOptionIndex) || 0;
    let que24 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client2.fieldOptionIndex) || 0;
    let que25 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client2.fieldOptionIndex) || 0;
    let que26 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client2.fieldOptionIndex) || 0;
    let que27 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client2.fieldOptionIndex) || 0;
    this.formData.D2Total_Client2.value = que15 + que16 + que17 + que18 + que19 + que20 + que21 + que22 + que23 + que24 + que25 + que26 + que27;

    let que29 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client3.fieldOptionIndex) || 0;
    let que30 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client3.fieldOptionIndex) || 0;
    let que31 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client3.fieldOptionIndex) || 0;
    let que32 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client3.fieldOptionIndex) || 0;
    let que33 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client3.fieldOptionIndex) || 0;
    let que34 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client3.fieldOptionIndex) || 0;
    let que35 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client3.fieldOptionIndex) || 0;
    let que36 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client3.fieldOptionIndex) || 0;
    let que37 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client3.fieldOptionIndex) || 0;
    let que38 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client3.fieldOptionIndex) || 0;
    let que39 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client3.fieldOptionIndex) || 0;
    let que40 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client3.fieldOptionIndex) || 0;
    let que41 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client3.fieldOptionIndex) || 0;
    this.formData.D2Total_Client3.value = que29 + que30 + que31 + que32 + que33 + que34 + que35 + que36 + que37 + que38 + que39 + que40 + que41;

    let que43 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client4.fieldOptionIndex) || 0;
    let que44 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client4.fieldOptionIndex) || 0;
    let que45 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client4.fieldOptionIndex) || 0;
    let que46 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client4.fieldOptionIndex) || 0;
    let que47 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client4.fieldOptionIndex) || 0;
    let que48 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client4.fieldOptionIndex) || 0;
    let que49 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client4.fieldOptionIndex) || 0;
    let que50 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client4.fieldOptionIndex) || 0;
    let que51 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client4.fieldOptionIndex) || 0;
    let que52 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client4.fieldOptionIndex) || 0;
    let que53 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client4.fieldOptionIndex) || 0;
    let que54 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client4.fieldOptionIndex) || 0;
    let que55 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client4.fieldOptionIndex) || 0;
    this.formData.D2Total_Client4.value = que43 + que44 + que45 + que46 + que47 + que48 + que49 + que50 + que51 + que52 + que53 + que54 + que55;
  }
  partD2csdcCalc() {
    let queC1 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client1.fieldOptionIndex) || 0;
    let queC2 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client1.fieldOptionIndex) || 0;
    let queC3 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client1.fieldOptionIndex) || 0;
    let queC4 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client1.fieldOptionIndex) || 0;
    let queC5 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client1.fieldOptionIndex) || 0;
    let queC6 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client1.fieldOptionIndex) || 0;
    let queC7 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client1.fieldOptionIndex) || 0;
    let queC8 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client1.fieldOptionIndex) || 0;
    let queC9 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client1.fieldOptionIndex) || 0;
    let queC10 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client1.fieldOptionIndex) || 0;
    let queC11 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client1.fieldOptionIndex) || 0;
    let que12 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client1.fieldOptionIndex) || 0;
    let que13 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client1.fieldOptionIndex) || 0;
    let que14 = parseInt(this.formData.CSDC_KS_PartD_Question14_Client1.fieldOptionIndex) || 0;
    let que54 = parseInt(this.formData.CSDC_KS_PartD_Question26_Client1.fieldOptionIndex) || 0;
    let que55 = parseInt(this.formData.CSDC_KS_PartD_Question27_Client1.fieldOptionIndex) || 0;
    let que57 = parseInt(this.formData.CSDC_KS_PartD_Question28_Client1.fieldOptionIndex) || 0;
    let que58 = parseInt(this.formData.CSDC_KS_PartD_Question29_Client1.fieldOptionIndex) || 0;
    let que59 = parseInt(this.formData.CSDC_KS_PartD_Question30_Client1.fieldOptionIndex) || 0;
    let que60 = parseInt(this.formData.CSDC_KS_PartD_Question31_Client1.fieldOptionIndex) || 0;
    let que61 = parseInt(this.formData.CSDC_KS_PartD_Question32_Client1.fieldOptionIndex) || 0;
    let que62 = parseInt(this.formData.CSDC_KS_PartD_Question33_Client1.fieldOptionIndex) || 0;
    let que1 = parseInt(this.formData.CSDC_KS_PartD_Question15_Client1.fieldOptionIndex) || 0;
    let que2 = parseInt(this.formData.CSDC_KS_PartD_Question16_Client1.fieldOptionIndex) || 0;
    let que3 = parseInt(this.formData.CSDC_KS_PartD_Question17_Client1.fieldOptionIndex) || 0;
    let que4 = parseInt(this.formData.CSDC_KS_PartD_Question18_Client1.fieldOptionIndex) || 0;
    let que5 = parseInt(this.formData.CSDC_KS_PartD_Question19_Client1.fieldOptionIndex) || 0;
    let que6 = parseInt(this.formData.CSDC_KS_PartD_Question20_Client1.fieldOptionIndex) || 0;
    let que7 = parseInt(this.formData.CSDC_KS_PartD_Question21_Client1.fieldOptionIndex) || 0;
    let que8 = parseInt(this.formData.CSDC_KS_PartD_Question22_Client1.fieldOptionIndex) || 0;
    let que9 = parseInt(this.formData.CSDC_KS_PartD_Question23_Client1.fieldOptionIndex) || 0;
    let que10 = parseInt(this.formData.CSDC_KS_PartD_Question24_Client1.fieldOptionIndex) || 0;
    let que11 = parseInt(this.formData.CSDC_KS_PartD_Question25_Client1.fieldOptionIndex) || 0;
    this.formData.Sub_Total_Client1.value = que13 + que12 + queC11 + queC10 + queC9 + queC8 + queC7 + queC6 + queC5 + queC4 + queC1 + queC2 + queC3 + que60 + que61 + que62 + que57 + que58 + que59 + que54 + que55 + que14 + que1 + que2 + que3 + que4 + que5 + que6 + que7 + que8 + que9 + que10 + que11;

    let que28 = parseInt(this.formData.CSDC_KS_PartD_Question14_Client2.fieldOptionIndex) || 0;
    let que63 = parseInt(this.formData.CSDC_KS_PartD_Question26_Client2.fieldOptionIndex) || 0;
    let que64 = parseInt(this.formData.CSDC_KS_PartD_Question27_Client2.fieldOptionIndex) || 0;
    let que65 = parseInt(this.formData.CSDC_KS_PartD_Question28_Client2.fieldOptionIndex) || 0;
    let que66 = parseInt(this.formData.CSDC_KS_PartD_Question29_Client2.fieldOptionIndex) || 0;
    let que67 = parseInt(this.formData.CSDC_KS_PartD_Question30_Client2.fieldOptionIndex) || 0;
    let que68 = parseInt(this.formData.CSDC_KS_PartD_Question31_Client2.fieldOptionIndex) || 0;
    let que69 = parseInt(this.formData.CSDC_KS_PartD_Question32_Client2.fieldOptionIndex) || 0;
    let que70 = parseInt(this.formData.CSDC_KS_PartD_Question33_Client2.fieldOptionIndex) || 0;
    let queC15 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client2.fieldOptionIndex) || 0;
    let queC16 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client2.fieldOptionIndex) || 0;
    let queC17 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client2.fieldOptionIndex) || 0;
    let queC18 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client2.fieldOptionIndex) || 0;
    let queC19 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client2.fieldOptionIndex) || 0;
    let queC20 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client2.fieldOptionIndex) || 0;
    let queC21 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client2.fieldOptionIndex) || 0;
    let queC22 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client2.fieldOptionIndex) || 0;
    let queC23 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client2.fieldOptionIndex) || 0;
    let queC24 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client2.fieldOptionIndex) || 0;
    let queC25 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client2.fieldOptionIndex) || 0;
    let que26 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client2.fieldOptionIndex) || 0;
    let que27 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client2.fieldOptionIndex) || 0;
    let que15 = parseInt(this.formData.CSDC_KS_PartD_Question15_Client2.fieldOptionIndex) || 0;
    let que16 = parseInt(this.formData.CSDC_KS_PartD_Question16_Client2.fieldOptionIndex) || 0;
    let que17 = parseInt(this.formData.CSDC_KS_PartD_Question17_Client2.fieldOptionIndex) || 0;
    let que18 = parseInt(this.formData.CSDC_KS_PartD_Question18_Client2.fieldOptionIndex) || 0;
    let que19 = parseInt(this.formData.CSDC_KS_PartD_Question19_Client2.fieldOptionIndex) || 0;
    let que20 = parseInt(this.formData.CSDC_KS_PartD_Question20_Client2.fieldOptionIndex) || 0;
    let que21 = parseInt(this.formData.CSDC_KS_PartD_Question21_Client2.fieldOptionIndex) || 0;
    let que22 = parseInt(this.formData.CSDC_KS_PartD_Question22_Client2.fieldOptionIndex) || 0;
    let que23 = parseInt(this.formData.CSDC_KS_PartD_Question23_Client2.fieldOptionIndex) || 0;
    let que24 = parseInt(this.formData.CSDC_KS_PartD_Question24_Client2.fieldOptionIndex) || 0;
    let que25 = parseInt(this.formData.CSDC_KS_PartD_Question25_Client2.fieldOptionIndex) || 0;

    this.formData.Sub_Total_Client2.value = queC18 + queC19 + queC20 + queC21 + queC22 + queC23 + queC24 + queC25 + que26 + que27 + queC17 + queC16 + queC15 + que63 + que64 + que65 + que66 + que67 + que68 + que69 + que70 + que28 + que15 + que16 + que17 + que18 + que19 + que20 + que21 + que22 + que23 + que24 + que25;

    let que42 = parseInt(this.formData.CSDC_KS_PartD_Question14_Client3.fieldOptionIndex) || 0;
    let que71 = parseInt(this.formData.CSDC_KS_PartD_Question26_Client3.fieldOptionIndex) || 0;
    let que72 = parseInt(this.formData.CSDC_KS_PartD_Question27_Client3.fieldOptionIndex) || 0;
    let que73 = parseInt(this.formData.CSDC_KS_PartD_Question28_Client3.fieldOptionIndex) || 0;
    let que74 = parseInt(this.formData.CSDC_KS_PartD_Question29_Client3.fieldOptionIndex) || 0;
    let que75 = parseInt(this.formData.CSDC_KS_PartD_Question30_Client3.fieldOptionIndex) || 0;
    let que76 = parseInt(this.formData.CSDC_KS_PartD_Question31_Client3.fieldOptionIndex) || 0;
    let que77 = parseInt(this.formData.CSDC_KS_PartD_Question32_Client3.fieldOptionIndex) || 0;
    let que78 = parseInt(this.formData.CSDC_KS_PartD_Question33_Client3.fieldOptionIndex) || 0;
    let queC29 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client3.fieldOptionIndex) || 0;
    let queC30 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client3.fieldOptionIndex) || 0;
    let queC31 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client3.fieldOptionIndex) || 0;
    let queC32 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client3.fieldOptionIndex) || 0;
    let queC33 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client3.fieldOptionIndex) || 0;
    let queC34 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client3.fieldOptionIndex) || 0;
    let queC35 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client3.fieldOptionIndex) || 0;
    let queC36 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client3.fieldOptionIndex) || 0;
    let queC37 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client3.fieldOptionIndex) || 0;
    let queC38 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client3.fieldOptionIndex) || 0;
    let queC39 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client3.fieldOptionIndex) || 0;
    let que40 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client3.fieldOptionIndex) || 0;
    let que41 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client3.fieldOptionIndex) || 0;
    let que29 = parseInt(this.formData.CSDC_KS_PartD_Question15_Client3.fieldOptionIndex) || 0;
    let que30 = parseInt(this.formData.CSDC_KS_PartD_Question16_Client3.fieldOptionIndex) || 0;
    let que31 = parseInt(this.formData.CSDC_KS_PartD_Question17_Client3.fieldOptionIndex) || 0;
    let que32 = parseInt(this.formData.CSDC_KS_PartD_Question18_Client3.fieldOptionIndex) || 0;
    let que33 = parseInt(this.formData.CSDC_KS_PartD_Question19_Client3.fieldOptionIndex) || 0;
    let que34 = parseInt(this.formData.CSDC_KS_PartD_Question20_Client3.fieldOptionIndex) || 0;
    let que35 = parseInt(this.formData.CSDC_KS_PartD_Question21_Client3.fieldOptionIndex) || 0;
    let que36 = parseInt(this.formData.CSDC_KS_PartD_Question22_Client3.fieldOptionIndex) || 0;
    let que37 = parseInt(this.formData.CSDC_KS_PartD_Question23_Client3.fieldOptionIndex) || 0;
    let que38 = parseInt(this.formData.CSDC_KS_PartD_Question24_Client3.fieldOptionIndex) || 0;
    let que39 = parseInt(this.formData.CSDC_KS_PartD_Question25_Client3.fieldOptionIndex) || 0;
    this.formData.Sub_Total_Client3.value = queC30 + queC31 + queC32 + queC33 + queC34 + queC35 + queC36 + queC37 + queC38 + queC39 + que40 + que41 + queC29 + que76 + que71 + que72 + que73 + que74 + que75 + que77 + que78 + que42 + que29 + que30 + que31 + que32 + que33 + que34 + que35 + que36 + que37 + que38 + que39;

    let que56 = parseInt(this.formData.CSDC_KS_PartD_Question14_Client4.fieldOptionIndex) || 0;
    let que79 = parseInt(this.formData.CSDC_KS_PartD_Question26_Client4.fieldOptionIndex) || 0;
    let que80 = parseInt(this.formData.CSDC_KS_PartD_Question27_Client4.fieldOptionIndex) || 0;
    let que81 = parseInt(this.formData.CSDC_KS_PartD_Question28_Client4.fieldOptionIndex) || 0;
    let que82 = parseInt(this.formData.CSDC_KS_PartD_Question29_Client4.fieldOptionIndex) || 0;
    let que83 = parseInt(this.formData.CSDC_KS_PartD_Question30_Client4.fieldOptionIndex) || 0;
    let que84 = parseInt(this.formData.CSDC_KS_PartD_Question31_Client4.fieldOptionIndex) || 0;
    let que85 = parseInt(this.formData.CSDC_KS_PartD_Question32_Client4.fieldOptionIndex) || 0;
    let que86 = parseInt(this.formData.CSDC_KS_PartD_Question33_Client4.fieldOptionIndex) || 0;
    let queC43 = parseInt(this.formData.CSDC_KS_PartD_Question1_Client4.fieldOptionIndex) || 0;
    let queC44 = parseInt(this.formData.CSDC_KS_PartD_Question2_Client4.fieldOptionIndex) || 0;
    let queC45 = parseInt(this.formData.CSDC_KS_PartD_Question3_Client4.fieldOptionIndex) || 0;
    let queC46 = parseInt(this.formData.CSDC_KS_PartD_Question4_Client4.fieldOptionIndex) || 0;
    let queC47 = parseInt(this.formData.CSDC_KS_PartD_Question5_Client4.fieldOptionIndex) || 0;
    let queC48 = parseInt(this.formData.CSDC_KS_PartD_Question6_Client4.fieldOptionIndex) || 0;
    let queC49 = parseInt(this.formData.CSDC_KS_PartD_Question7_Client4.fieldOptionIndex) || 0;
    let queC50 = parseInt(this.formData.CSDC_KS_PartD_Question8_Client4.fieldOptionIndex) || 0;
    let queC51 = parseInt(this.formData.CSDC_KS_PartD_Question9_Client4.fieldOptionIndex) || 0;
    let queC52 = parseInt(this.formData.CSDC_KS_PartD_Question10_Client4.fieldOptionIndex) || 0;
    let queC53 = parseInt(this.formData.CSDC_KS_PartD_Question11_Client4.fieldOptionIndex) || 0;
    let queC54 = parseInt(this.formData.CSDC_KS_PartD_Question12_Client4.fieldOptionIndex) || 0;
    let queC55 = parseInt(this.formData.CSDC_KS_PartD_Question13_Client4.fieldOptionIndex) || 0;
    let que43 = parseInt(this.formData.CSDC_KS_PartD_Question15_Client4.fieldOptionIndex) || 0;
    let que44 = parseInt(this.formData.CSDC_KS_PartD_Question16_Client4.fieldOptionIndex) || 0;
    let que45 = parseInt(this.formData.CSDC_KS_PartD_Question17_Client4.fieldOptionIndex) || 0;
    let que46 = parseInt(this.formData.CSDC_KS_PartD_Question18_Client4.fieldOptionIndex) || 0;
    let que47 = parseInt(this.formData.CSDC_KS_PartD_Question19_Client4.fieldOptionIndex) || 0;
    let que48 = parseInt(this.formData.CSDC_KS_PartD_Question20_Client4.fieldOptionIndex) || 0;
    let que49 = parseInt(this.formData.CSDC_KS_PartD_Question21_Client4.fieldOptionIndex) || 0;
    let que50 = parseInt(this.formData.CSDC_KS_PartD_Question22_Client4.fieldOptionIndex) || 0;
    let que51 = parseInt(this.formData.CSDC_KS_PartD_Question23_Client4.fieldOptionIndex) || 0;
    let que52 = parseInt(this.formData.CSDC_KS_PartD_Question24_Client4.fieldOptionIndex) || 0;
    let que53 = parseInt(this.formData.CSDC_KS_PartD_Question25_Client4.fieldOptionIndex) || 0;
    this.formData.Sub_Total_Client4.value = queC43 + queC44 + queC45 + queC52 + queC51 + queC50 + queC49 + queC48 + queC47 + queC46 + queC53 + queC55 + queC54 + que79 + que80 + que81 + que82 + que83 + que84 + que85 + que86 + que56 + que43 + que44 + que45 + que46 + que47 + que48 + que49 + que50 + que51 + que52 + que53;
  }
  csdcCalculation() {
    this.partCcsdcCalc();
    // this.partDcsdcCalc();
    this.partD2csdcCalc();
    this.formData.Total_Client1.value = this.formData.Sub_Total_Client1.value + this.formData.CTotal_Client1.value;
    this.formData.Total_Client2.value = this.formData.Sub_Total_Client2.value + this.formData.CTotal_Client2.value;
    this.formData.Total_Client3.value = this.formData.Sub_Total_Client3.value + this.formData.CTotal_Client3.value;
    this.formData.Total_Client4.value = this.formData.Sub_Total_Client4.value + this.formData.CTotal_Client4.value;
  }

  asqScoreChartCalculation() {
    if (this.formData.TotalScore.value < this.formData.lowRiskValue) {
      this.formData.babyTotalScore.fieldOptionIndex = "0";
    } else if ((this.formData.TotalScore.value > this.formData.lowRiskValue) && (this.formData.TotalScore.value < this.formData.monitorValue)) {
      this.formData.babyTotalScore.fieldOptionIndex = "1";
    } else if (this.formData.TotalScore.value > this.formData.lowRiskValue) {
      this.formData.babyTotalScore.fieldOptionIndex = "2";
    }
  }
  asqTotalScoreCalculation() {
    for (let i = 1; i <= this.formData.totalQuestions; i++) {
      this.formData["Question" + i + "Sum"].value = 0;
      if (this.formData["Question" + i].fieldOptionIndex === "0") {
        this.formData["Question" + i + "Sum"].value = 0
      }
      if (this.formData["Question" + i].fieldOptionIndex === "1") {
        this.formData["Question" + i + "Sum"].value = 5
      }
      if (this.formData["Question" + i].fieldOptionIndex === "2") {
        this.formData["Question" + i + "Sum"].value = 10
      }
      if ((this.formData["Question" + i + "Concern"].fieldOptionIndex === true) || this.formData["Question" + i + "Concern"].fieldOptionIndex === "1") {
        this.formData["Question" + i + "Concern"].fieldOptionIndex = "1";
        this.formData["Question" + i + "Sum"].value += 5;
      }
      this.formData.TotalScore.value = parseInt(this.formData.TotalScore.value) + this.formData["Question" + i + "Sum"].value;
    }
  }
  cafasCalculation() {
    for (let i = 1; i <= 198; i++) {
      if (i === 197 || i === 192 || i === 39 || i === 40 || i === 64 || i === 65 || i === 86 || i === 87 || i === 114 || i === 115 || i === 140 || i === 141 || i === 152 || i === 153 || i === 180 || i === 181) {
        continue;
      }
      // school subscale performance
      if (i <= 10) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SCHOOL.value = 30; i = 40;
        }
        else {
          this.formData.CAF_SCHOOL.value = "";
        }
      } else if (i >= 12 && i <= 20) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SCHOOL.value = 20; i = 40;
        }
        else {
          this.formData.CAF_SCHOOL.value = "";
        }
      } else if (i >= 22 && i <= 26) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SCHOOL.value = 10; i = 40;
        }
        else {
          this.formData.CAF_SCHOOL.value = "";
        }
      } else if (i >= 28 && i <= 38) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SCHOOL.value = 0; i = 40;
        }
        else {
          this.formData.CAF_SCHOOL.value = "";
        }
      }
      // home subscale performance
      else if (i >= 41 && i <= 49) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_HOME.value = 30; i = 65;
        } else {
          this.formData.CAF_HOME.value = "";
        }
      }
      else if (i >= 51 && i <= 55) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_HOME.value = 20; i = 65;
        } else {
          this.formData.CAF_HOME.value = "";
        }
      }
      else if (i >= 57 && i <= 60) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_HOME.value = 10; i = 65;
        } else {
          this.formData.CAF_HOME.value = "";
        }
      }
      else if (i >= 62 && i <= 63) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_HOME.value = 0; i = 65;
        } else {
          this.formData.CAF_HOME.value = "";
        }
      }
      //community
      else if (i >= 66 && i <= 71) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNITY.value = 30; i = 87;
        } else {
          this.formData.CAF_COMMUNITY.value = "";
        }
      }
      else if (i >= 73 && i <= 78) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNITY.value = 20; i = 87;
        } else {
          this.formData.CAF_COMMUNITY.value = "";
        }
      }
      else if (i >= 80 && i <= 82) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNITY.value = 10; i = 87;
        } else {
          this.formData.CAF_COMMUNITY.value = "";
        }
      }
      else if (i >= 84 && i <= 85) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNITY.value = 0; i = 87;
        } else {
          this.formData.CAF_COMMUNITY.value = "";
        }
      }
      //behavior
      else if (i >= 88 && i <= 91) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_BEHAVIOR.value = 30; i = 115;
        } else {
          this.formData.CAF_BEHAVIOR.value = "";
        }
      }
      else if (i >= 93 && i <= 101) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_BEHAVIOR.value = 20; i = 115;
        } else {
          this.formData.CAF_BEHAVIOR.value = "";
        }
      }
      else if (i >= 103 && i <= 109) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_BEHAVIOR.value = 10; i = 115;
        } else {
          this.formData.CAF_BEHAVIOR.value = "";
        }
      }
      else if (i >= 111 && i <= 113) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_BEHAVIOR.value = 0; i = 115;
        } else {
          this.formData.CAF_BEHAVIOR.value = "";
        }
      }
      //moods/emotions
      else if (i >= 116 && i <= 119) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_MOODS.value = 30; i = 141;
        } else {
          this.formData.CAF_MOODS.value = "";
        }
      }
      else if (i >= 121 && i <= 126) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_MOODS.value = 20; i = 141;
        } else {
          this.formData.CAF_MOODS.value = "";
        }
      }
      else if (i >= 128 && i <= 134) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_MOODS.value = 10; i = 141;
        } else {
          this.formData.CAF_MOODS.value = "";
        }
      }
      else if (i >= 136 && i <= 139) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_MOODS.value = 0; i = 141;
        } else {
          this.formData.CAF_MOODS.value = "";
        }
      }
      //selfharmful
      else if (i >= 142 && i <= 144) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SELFHARM.value = 30; i = 153;
        } else {
          this.formData.CAF_SELFHARM.value = "";
        }
      }
      else if (i >= 146 && i <= 147) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SELFHARM.value = 20; i = 153;
        } else {
          this.formData.CAF_SELFHARM.value = "";
        }
      }
      else if (i === 149) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SELFHARM.value = 10; i = 153;
        } else {
          this.formData.CAF_SELFHARM.value = "";
        }
      }
      else if (i === 151) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SELFHARM.value = 0; i = 153;
        } else {
          this.formData.CAF_SELFHARM.value = "";
        }
      }
      //substance
      else if (i >= 154 && i <= 162) {
        if (((this.formData["Substance" + i].fieldOptionIndex) === true) || (this.formData["Substance" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SUBSTANCE_USE.value = 30; i = 181;
        } else {
          this.formData.CAF_SUBSTANCE_USE.value = "";
        }
      }
      else if (i >= 165 && i <= 169) {
        if (((this.formData["Substance" + i].fieldOptionIndex) === true) || (this.formData["Substance" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SUBSTANCE_USE.value = 20; i = 181;
        } else {
          this.formData.CAF_SUBSTANCE_USE.value = "";
        }
      }
      else if (i >= 172 && i <= 173) {
        if (((this.formData["Substance" + i].fieldOptionIndex) === true) || (this.formData["Substance" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SUBSTANCE_USE.value = 10; i = 181;
        } else {
          this.formData.CAF_SUBSTANCE_USE.value = "";
        }
      }
      else if (i >= 176 && i <= 179) {
        if (((this.formData["Substance" + i].fieldOptionIndex) === true) || (this.formData["Substance" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_SUBSTANCE_USE.value = 0; i = 181;
        } else {
          this.formData.CAF_SUBSTANCE_USE.value = "";
        }
      }
      //thinking
      else if (i >= 182 && i <= 185) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNICATION.value = 30; i = 199;
        } else {
          this.formData.CAF_COMMUNICATION.value = "";
        }
      }
      else if (i >= 187 && i <= 191) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNICATION.value = 20; i = 199;
        } else {
          this.formData.CAF_COMMUNICATION.value = "";
        }
      }
      else if (i >= 193 && i <= 196) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNICATION.value = 10; i = 199;
        } else {
          this.formData.CAF_COMMUNICATION.value = "";
        }
      }
      else if (i === 198) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.CAF_COMMUNICATION.value = 0; i = 199;
        } else {
          this.formData.CAF_COMMUNICATION.value = "";
        }
      }
    }
    for (let i = 1; i <= 198; i++) {
      if (i >= 1 && i <= 38) {
        if (i === 11 || i === 21 || i === 27) {
          continue;
        }
        else {
          if ((this.formData["School" + i].fieldOptionIndex) === true) {
            this.formData["School" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["School" + i].fieldOptionIndex) === false) {
            this.formData["School" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 41 && i <= 63) {
        if (i === 50 || i === 56 || i === 61) {
          continue;
        }
        else {

          if ((this.formData["Home" + i].fieldOptionIndex) === true) {
            this.formData["Home" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Home" + i].fieldOptionIndex) === false) {
            this.formData["Home" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 66 && i <= 85) {
        if (i === 72 || i === 79 || i === 83) {
          continue;
        }
        else {
          if ((this.formData["Community" + i].fieldOptionIndex) === true) {
            this.formData["Community" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Community" + i].fieldOptionIndex) === false) {
            this.formData["Community" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 88 && i <= 113) {
        if (i === 92 || i === 102 || i === 110) {
          continue;
        }
        else {
          if ((this.formData["Behavior" + i].fieldOptionIndex) === true) {
            this.formData["Behavior" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Behavior" + i].fieldOptionIndex) === false) {
            this.formData["Behavior" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 116 && i <= 139) {
        if (i === 120 || i === 127 || i === 135) {
          continue;
        }
        else {
          if ((this.formData["Moods" + i].fieldOptionIndex) === true) {
            this.formData["Moods" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Moods" + i].fieldOptionIndex) === false) {
            this.formData["Moods" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 142 && i <= 151) {
        if (i === 145 || i === 148 || i === 150) {
          continue;
        }
        else {
          if ((this.formData["SelfHarm" + i].fieldOptionIndex) === true) {
            this.formData["SelfHarm" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["SelfHarm" + i].fieldOptionIndex) === false) {
            this.formData["SelfHarm" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 154 && i <= 179) {
        if (i === 163 || i === 170 || i === 171 || i === 174 || i === 175 || i === 164) {
          continue;
        }
        else {
          if ((this.formData["Substance" + i].fieldOptionIndex) === true) {
            this.formData["Substance" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Substance" + i].fieldOptionIndex) === false) {
            this.formData["Substance" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 182 && i <= 198) {
        if (i === 186 || i === 192 || i === 197) {
          continue;
        }
        else {
          if ((this.formData["Thinking" + i].fieldOptionIndex) === true) {
            this.formData["Thinking" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Thinking" + i].fieldOptionIndex) === false) {
            this.formData["Thinking" + i].fieldOptionIndex = "";
          }
        }
      }
    }
    this.formData.CAF_TOTAL.value = parseInt(this.formData.CAF_SUBSTANCE_USE.value) + parseInt(this.formData.CAF_COMMUNICATION.value) + parseInt(this.formData.CAF_SELFHARM.value) + parseInt(this.formData.CAF_MOODS.value) + parseInt(this.formData.CAF_BEHAVIOR.value) + parseInt(this.formData.CAF_COMMUNITY.value) + parseInt(this.formData.CAF_HOME.value) + parseInt(this.formData.CAF_SCHOOL.value);
  }
  pecfasCalculation() {
    for (let i = 1; i <= 182; i++) {
      if (i === 29 || i === 30 || i === 57 || i === 58 || i === 78 || i === 79 || i === 112 || i === 113 || i === 148 || i === 149 || i === 160 || i === 161) {
        continue;
      }
      // school subscale performance
      if (i <= 8) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SCHOOL.value = 30;
          i = 30;
        } else {
          this.formData.PEC_SCHOOL.value = "";
        }
      } else if (i >= 10 && i <= 15) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SCHOOL.value = 20;
          i = 30;
        } else {
          this.formData.PEC_SCHOOL.value = "";
        }
      } else if (i >= 17 && i <= 21) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SCHOOL.value = 10;
          i = 30;
        } else {
          this.formData.PEC_SCHOOL.value = "";
        }
      } else if (i >= 23 && i <= 28) {
        if (((this.formData["School" + i].fieldOptionIndex) === true) || (this.formData["School" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SCHOOL.value = 0;
          i = 30;
        } else {
          this.formData.PEC_SCHOOL.value = "";
        }
      }
      // home subscale performance
      else if (i >= 31 && i <= 37) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_HOME.value = 30;
          i = 58;
        } else {
          this.formData.PEC_HOME.value = "";
        }
      }
      else if (i >= 39 && i <= 44) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_HOME.value = 20; i = 58;
        } else {
          this.formData.PEC_HOME.value = "";
        }
      }
      else if (i >= 46 && i <= 52) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_HOME.value = 10; i = 58;
        } else {
          this.formData.PEC_HOME.value = "";
        }
      }
      else if (i >= 54 && i <= 56) {
        if (((this.formData["Home" + i].fieldOptionIndex) === true) || (this.formData["Home" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_HOME.value = 0; i = 58;
        } else {
          this.formData.PEC_HOME.value = "";
        }
      }
      //community
      else if (i >= 59 && i <= 64) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNITY.value = 30; i = 79;
        } else {
          this.formData.PEC_COMMUNITY.value = "";
        }
      }
      else if (i >= 67 && i <= 70) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNITY.value = 20; i = 79;
        } else {
          this.formData.PEC_COMMUNITY.value = "";
        }
      }
      else if (i >= 72 && i <= 74) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNITY.value = 10; i = 79;
        } else {
          this.formData.PEC_COMMUNITY.value = "";
        }
      }
      else if (i >= 76 && i <= 77) {
        if (((this.formData["Community" + i].fieldOptionIndex) === true) || (this.formData["Community" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNITY.value = 0; i = 79;
        } else {
          this.formData.PEC_COMMUNITY.value = "";
        }
      }
      //behavior
      else if (i >= 80 && i <= 84) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_BEHAVIOR.value = 30; i = 113;
        } else {
          this.formData.PEC_BEHAVIOR.value = "";
        }
      }
      else if (i >= 86 && i <= 93) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_BEHAVIOR.value = 20; i = 113;
        } else {
          this.formData.PEC_BEHAVIOR.value = "";
        }
      }
      else if (i >= 95 && i <= 107) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_BEHAVIOR.value = 10; i = 113;
        } else {
          this.formData.PEC_BEHAVIOR.value = "";
        }
      }
      else if (i >= 109 && i <= 111) {
        if (((this.formData["Behavior" + i].fieldOptionIndex) === true) || (this.formData["Behavior" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_BEHAVIOR.value = 0; i = 113;
        } else {
          this.formData.PEC_BEHAVIOR.value = "";
        }
      }
      //moods/emotions
      else if (i >= 114 && i <= 121) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_MOODS.value = 30; i = 149;
        } else {
          this.formData.PEC_MOODS.value = "";
        }
      }
      else if (i >= 123 && i <= 129) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_MOODS.value = 20; i = 149;
        } else {
          this.formData.PEC_MOODS.value = "";
        }
      }
      else if (i >= 131 && i <= 140) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_MOODS.value = 10; i = 149;
        } else {
          this.formData.PEC_MOODS.value = "";
        }
      }
      else if (i >= 142 && i <= 147) {
        if (((this.formData["Moods" + i].fieldOptionIndex) === true) || (this.formData["Moods" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_MOODS.value = 0; i = 149;
        } else {
          this.formData.PEC_MOODS.value = "";
        }
      }
      //selfharmful
      else if (i >= 150 && i <= 152) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SELFHARM.value = 30; i = 161;
        } else {
          this.formData.PEC_SELFHARM.value = "";
        }
      }
      else if (i >= 154 && i <= 155) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SELFHARM.value = 20; i = 161;
        } else {
          this.formData.PEC_SELFHARM.value = "";
        }
      }
      else if (i === 157) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SELFHARM.value = 10; i = 161;
        } else {
          this.formData.PEC_SELFHARM.value = "";
        }
      }
      else if (i === 159) {
        if (((this.formData["SelfHarm" + i].fieldOptionIndex) === true) || (this.formData["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_SELFHARM.value = 0; i = 161;
        } else {
          this.formData.PEC_SELFHARM.value = "";
        }
      }
      //thinking
      else if (i >= 162 && i <= 168) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNICATION.value = 30; i = 183;
        } else {
          this.formData.PEC_COMMUNICATION.value = "";
        }
      }
      else if (i >= 170 && i <= 175) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNICATION.value = 20; i = 183;
        } else {
          this.formData.PEC_COMMUNICATION.value = "";
        }
      }
      else if (i >= 177 && i <= 180) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNICATION.value = 10; i = 183;
        } else {
          this.formData.PEC_COMMUNICATION.value = "";
        }
      }
      else if (i === 182) {
        if (((this.formData["Thinking" + i].fieldOptionIndex) === true) || (this.formData["Thinking" + i].fieldOptionIndex) === '1') {
          this.formData.PEC_COMMUNICATION.value = 0; i = 183;
        } else {
          this.formData.PEC_COMMUNICATION.value = "";
        }
      }
    }
    for (let i = 1; i <= 182; i++) {
      if (i >= 1 && i <= 28) {
        if (i === 9 || i === 16 || i === 22) {
          continue;
        }
        else {
          if ((this.formData["School" + i].fieldOptionIndex) === true) {
            this.formData["School" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["School" + i].fieldOptionIndex) === false) {
            this.formData["School" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 31 && i <= 56) {
        if (i === 38 || i === 45 || i === 53) {
          continue;
        }
        else {
          if ((this.formData["Home" + i].fieldOptionIndex) === true) {
            this.formData["Home" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Home" + i].fieldOptionIndex) === false) {
            this.formData["Home" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 59 && i <= 77) {
        if (i === 65 || i === 66 || i === 71 || i === 75) {
          continue;
        }
        else {
          if ((this.formData["Community" + i].fieldOptionIndex) === true) {
            this.formData["Community" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Community" + i].fieldOptionIndex) === false) {
            this.formData["Community" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 80 && i <= 111) {
        if (i === 85 || i === 94 || i === 108) {
          continue;
        }
        else {
          if ((this.formData["Behavior" + i].fieldOptionIndex) === true) {
            this.formData["Behavior" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Behavior" + i].fieldOptionIndex) === false) {
            this.formData["Behavior" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 114 && i <= 147) {
        if (i === 122 || i === 130 || i === 141) {
          continue;
        }
        else {
          if ((this.formData["Moods" + i].fieldOptionIndex) === true) {
            this.formData["Moods" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Moods" + i].fieldOptionIndex) === false) {
            this.formData["Moods" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 150 && i <= 159) {
        if (i === 153 || i === 156 || i === 158) {
          continue;
        }
        else {
          if ((this.formData["SelfHarm" + i].fieldOptionIndex) === true) {
            this.formData["SelfHarm" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["SelfHarm" + i].fieldOptionIndex) === false) {
            this.formData["SelfHarm" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 162 && i <= 182) {
        if (i === 169 || i === 176 || i === 181) {
          continue;
        }
        else {
          if ((this.formData["Thinking" + i].fieldOptionIndex) === true) {
            this.formData["Thinking" + i].fieldOptionIndex = "1";
          }
          if ((this.formData["Thinking" + i].fieldOptionIndex) === false) {
            this.formData["Thinking" + i].fieldOptionIndex = "";
          }
        }
      }
    }
    this.formData.PEC_TOTAL.value = parseInt(this.formData.PEC_COMMUNICATION.value) + parseInt(this.formData.PEC_SELFHARM.value) + parseInt(this.formData.PEC_MOODS.value) + parseInt(this.formData.PEC_BEHAVIOR.value) + parseInt(this.formData.PEC_COMMUNITY.value) + parseInt(this.formData.PEC_HOME.value) + parseInt(this.formData.PEC_SCHOOL.value);
  }
  cropsCalculation() {
    this.formData.BTotal.value = 0;
    for (let i = 1; i <= 26; i++) {
      if (i === 24) continue;
      if (this.formData["CROPS_Question" + i].fieldOptionIndex === "0") {
        this.formData.BTotal.value += 0;
      }
      else if (this.formData["CROPS_Question" + i].fieldOptionIndex === "1") {
        this.formData.BTotal.value += 1;
      }
      else if (this.formData["CROPS_Question" + i].fieldOptionIndex === "2") {
        this.formData.BTotal.value += 2;
      }
    }
  }
  psiCalculation() {
    this.formData.totalStress.value = 0;
    this.formData.ParentDomain.value = 0;
    this.formData.ParentChildDysfunction = 0;
    this.formData.DC = 0;
    this.formData.TS = 0;
    this.formData.parentalDistress = 0;
    this.formData.ParentChild.value = 0;
    this.formData.DifficultChild.value = 0;
    this.formData.DefensiveResponding.value = 0;
    this.defensiveResponding();
    this.totalStress();
    this.parentalDistress();
    this.parentChild();
    this.difficultChild();
  }
  //defensive responding 
  defensiveResponding() {
    for (let i = 1; i <= 11; i++) {
      if (i === 4 || i === 5 || i === 6 || i === 10) {
        continue;
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "0") {
        this.formData.DefensiveResponding.value += 5
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "1") {
        this.formData.DefensiveResponding.value += 4
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "2") {
        this.formData.DefensiveResponding.value += 3
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "3") {
        this.formData.DefensiveResponding.value += 2
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "4") {
        this.formData.DefensiveResponding.value += 1
      }
    }
  }
  //total stress calculation
  totalStress() {
    for (let i = 1; i <= 36; i++) {
      if (i === 22 || i === 32 || i === 33) {
        if ((this.formData["Question" + i].fieldOptionIndex === "1")) {
          this.formData.TS += 1
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "2")) {
          this.formData.TS += 2
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "3")) {
          this.formData.TS += 3
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "4")) {
          this.formData.TS += 4
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "5")) {
          this.formData.TS += 5
        }
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "0") {
        this.formData.TS += 5
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "1") {
        this.formData.TS += 4
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "2") {
        this.formData.TS += 3
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "3") {
        this.formData.TS += 2
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "4") {
        this.formData.TS += 1
      }
      if (i === 36) {
        this.psi.percentileValue.map((item) => {
          Object.keys(item.TotalStress).filter((val) => {
            if (parseInt(val) === this.formData.TS) {
              this.formData.totalStress.value = `${item.TotalStress[`${parseInt(val)}`]}%`;
            }
          })
        });
      }
    }
  }
  //parent domain calculation
  parentalDistress() {
    for (let i = 1; i <= 12; i++) {
      if (this.formData["Question" + i].fieldOptionIndex === "0") {
        this.formData.parentalDistress += 5
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "1") {
        this.formData.parentalDistress += 4
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "2") {
        this.formData.parentalDistress += 3
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "3") {
        this.formData.parentalDistress += 2
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "4") {
        this.formData.parentalDistress += 1
      }
      if (i === 12) {
        this.psi.percentileValue.map((item) => {
          Object.keys(item.PD).filter((val) => {
            if (parseInt(val) === this.formData.parentalDistress) {
              this.formData.ParentDomain.value = `${item.PD[`${parseInt(val)}`]}%`;
            }
          })
        });
      }
    }

  }
  //parent-child calculation
  parentChild() {
    for (let i = 13; i <= 24; i++) {
      if (i === 22) {
        if ((this.formData["Question" + i].fieldOptionIndex === "1")) {
          this.formData.ParentChildDysfunction += 1
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "2")) {
          this.formData.ParentChildDysfunction += 2
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "3")) {
          this.formData.ParentChildDysfunction += 3
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "4")) {
          this.formData.ParentChildDysfunction += 4
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "5")) {
          this.formData.ParentChildDysfunction += 5
        }
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "0") {
        this.formData.ParentChildDysfunction += 5
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "1") {
        this.formData.ParentChildDysfunction += 4
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "2") {
        this.formData.ParentChildDysfunction += 3
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "3") {
        this.formData.ParentChildDysfunction += 2
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "4") {
        this.formData.ParentChildDysfunction += 1
      }
      if (i === 24) {
        this.psi.percentileValue.map((item) => {
          Object.keys(item.PCD).filter((val) => {
            if (parseInt(val) === this.formData.ParentChildDysfunction) {
              this.formData.ParentChild.value = `${item.PCD[`${parseInt(val)}`]}%`;
            }
          })
        });
      }
    }
  }
  //Difficult Child calculation
  difficultChild() {
    for (let i = 25; i <= 36; i++) {
      if (i === 32 || i === 33) {
        if ((this.formData["Question" + i].fieldOptionIndex === "1")) {
          this.formData.DC += 1
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "2")) {
          this.formData.DC += 2
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "3")) {
          this.formData.DC += 3
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "4")) {
          this.formData.DC += 4
        }
        else if ((this.formData["Question" + i].fieldOptionIndex === "5")) {
          this.formData.DC += 5
        }
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "0") {
        this.formData.DC += 5
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "1") {
        this.formData.DC += 4
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "2") {
        this.formData.DC += 3
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "3") {
        this.formData.DC += 2
      }
      else if (this.formData["Question" + i].fieldOptionIndex === "4") {
        this.formData.DC += 1
      }
      if (i === 36) {
        this.psi.percentileValue.map((item) => {
          Object.keys(item.DC).filter((val) => {
            if (parseInt(val) === this.formData.DC) {
              this.formData.DifficultChild.value = `${item.DC[`${parseInt(val)}`]}%`;
            }
          })
        });
      }
    }
  }
}