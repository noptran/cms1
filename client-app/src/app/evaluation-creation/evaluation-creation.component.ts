import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseEvaluations, EvalutionScore } from "./evaluation-creation";
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {LocalValues} from '../local-values';
import * as moment from 'moment';
import { MessageService } from "primeng/api";
import * as _ from "lodash";

@Component({
  selector: 'app-evaluation-creation',
  templateUrl: './evaluation-creation.component.html',
  styleUrls: ['./evaluation-creation.component.scss']
})
export class EvaluationCreationComponent implements OnInit {
  title = "Case Evalutions";
  breadcrumbs = [];
  caseEvaluationsForm: FormGroup;
  caseEval: CaseEvaluations = new CaseEvaluations();
  directions: any;
  caseEvaluationVersion: any;
  caseEvaluationTypes = [];
  evaluationQuestions: any[];
  test_evaluationQuestions = [];
  evaluationScore: EvalutionScore = new EvalutionScore();
  score = [];
  score_service = [];
  score_quart = [];
  caseScores = [];
  selectedCorrectedScore: any;
  selectedScore: any;
  notes: any;
  filteredEvaluationsType = [];
  staffList = [];
  editControl = false;
  referralTypeId: any;
  metaData = [];
  caseEvaluationVersionList = [];
  discardTo = "/reports/evaluation-creation/view";
  filteredScore = [];
  quickMenu: any;
  url: any;
  isAttachmentRequired = false;
  staffId: any;
  showHideNotesAndCorrect = true;
  notesLabel: string;
  clarifyLabel: string;
  isReadOnly = false;
  allScals = [];
  caseEvalUpdate: boolean;
  score_fi = [];

  isList = false;
  isForm = true;
  caseEvaluationList = [];
  isAppHeader = true;

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };

  constructor(
    public _meassgae: MessageService,
    public _fb: FormBuilder,
    public _opencard: OpencardsService,
    public _caseTeam: CaseTeamService,
    public _router: Router,
    public _client: ClildFormService
  ) {}

  ngOnInit() {
      this.formValidation();
      this.breadcrumbs.push(
        { label: 'Person Types', href: '/reports/person/types', active: '' },
        { label: 'Evaluation Creation List', href: '/reports/evaluation-creation/view', active: 'active' }
      );
      if (this._router.url.includes("/reports/evaluation-creation/new")) {
        this.getEvaluationVersion();
      }
      if (this._router.url.includes("/reports/evaluation-creation/detail")) {
        this.getCaseEvalationRec();
        this.isAttachmentRequired = true;
      }
  }

  formValidation() {
    this.caseEvaluationsForm = this._fb.group({
      order: [null],
      question: [null],
      begindate: [null],
      endDate: [null],
      clarification: [null],
      evaluationQuestionID: [null],
    });
  }

  getEvaluationVersion() {
    let req;
    this.caseEvaluationVersionList = [];
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    req = {
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey(),
    };
    this._opencard.getEvaluationQuestionVersion(req).then((data) => {
      if (data.evaluationVersion.length == 1) {
        loader.style.display = "none";
        this.caseEvaluationVersion = data.evaluationVersion[0];
        this.caseEval.evaluationQuestionID = this.caseEvaluationVersion.versionDesc;
        this.directions = this.caseEvaluationVersion.directions;
        this.caseEval.evaluationQuestionID = data.evaluationVersion[0];
        this.getEvaluationQuestions(
          this.caseEvaluationVersion.evaluationQuestionID
        );
        this.caseEvaluationVersionList = data.evaluationVersion;
        document.getElementById("closeBtn").click();
      }
      if (data.evaluationVersion.length > 1) {
        loader.style.display = "none";
        this.caseEvaluationVersion = data.evaluationVersion[1];
        this.caseEval.evaluationQuestionID = this.caseEvaluationVersion.versionDesc;
        this.directions = this.caseEvaluationVersion.directions;
        this.caseEval.evaluationQuestionID = data.evaluationVersion[1];
        this.getEvaluationQuestions(
          this.caseEvaluationVersion.evaluationQuestionID
        );
        this.caseEvaluationVersionList = data.evaluationVersion;
        document.getElementById("closeBtn").click();
      } else {
        loader.style.display = "none";
        this.caseEvaluationVersionList = data.evaluationVersion;
        document.getElementById("closeBtn").click();
      }
    });
  }

  getEvaluationQuestions(questionID) {
    if (questionID == 101) {
      this.showHideNotesAndCorrect = false;
      this.notesLabel = "Primary Resp. Party";
      this.clarifyLabel = "Notes";
    } else {
      this.notesLabel = "Notes";
      this.showHideNotesAndCorrect = true;
      this.clarifyLabel = "*Clarification";
    }

    let req = { evaluationQuestionID: questionID };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.getEvaluationQuestionScaleList(req).then((data) => {
      loader.style.display = "none";
      data.evaluationQuestion.map((item) => {
        var questionWithClrify = item.Question.split("*");
        item["questionDetail"] = questionWithClrify[0];
        var clarifyORnotes = item.Question.split(":");
        item["clarification"] = clarifyORnotes[1];
      });
      this.evaluationQuestions = data.evaluationQuestion;
      this.evaluationQuestions.map((item) => {
        item["Scale"] = {
          scale: item.Scale,
        };
        data["notes"] = "";
        data["selectedScore"] = 0;
        data["selectedCorrectedScore"] = 0;
        if (item.Scale == null) {
          item.Scale = "";
        }
      });
      this.evaluationQuestions.forEach((element) => {
        var dataArra = {
          order: undefined,
          question: undefined,
          beginDate: undefined,
          endDate: undefined,
          clarification: undefined,
          evaluationQuestionID: element.EvaluationQuestionID,
        };
      });
      this.evaluationQuestions.sort((a, b) => a.orderID - b.orderID);
      document.getElementById("closeBtn").click();
    });
  }

  save(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveEvaluationQuestion(source).then((data) => {
      this.caseEval = data.evaluation;
      loader.style.display = "none";
      this.editControl = true;
    });
  }

  update(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.caseEval = new CaseEvaluations();
    source["evaluationID"] = this.evaluationID;
    this._opencard.updateEvaluationQuestion(source).then((data) => {
      this.caseEval = data.evaluation;
      loader.style.display = "none";
      this.editControl = true;
    });
  }
  evaluationID: any;
  getCaseEvalationRec() {
    var questionsArray = [];

    let loaderTime = document.getElementById("loading-overlay") as HTMLElement;
    loaderTime.style.display = "block";
    this.evaluationID = this._client.getId();
    let req = { evaluationID: this._client.getId() };
    this._opencard.getEvaluationQuestionByID(req).then((data) => {
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.evaluvationType.changedBy
      )
        ? data.evaluvationType.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.evaluvationType.changedDate
      )
        ? moment(data.evaluvationType.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.evaluvationType.enteredBy
      )
        ? data.evaluvationType.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.evaluvationType.enteredDate
      )
        ? moment(data.evaluvationType.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";

      this.caseEvalUpdate = true;
      console.log("before>>data.evaluation>>>>>>", data.evaluation);
      loaderTime.style.display = "none";
      let req = {
        evaluationQuestionID:
          data.evaluation[0].evaluationQuestionID.evaluationQuestionID
            .evaluationQuestionID,
      };
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this._opencard.getEvaluationQuestionScaleList(req).then((dataRes) => {
        dataRes.evaluationQuestion.forEach((evalitem) => {
          let caseData;
          caseData =
            evalitem.Scale === null
              ? {
                  evaluationQuestionID: evalitem.EvaluationQuestionID,
                  scale: "",
                  Question: evalitem.Question,
                  orderID: evalitem.orderID,
                  EvaluationVersionID: evalitem.EvaluationVersionID,
                  clarification: evalitem.clarification,
                }
              : {
                  evaluationQuestionID: evalitem.EvaluationQuestionID,
                  scale: evalitem.Scale,
                  Question: evalitem.Question,
                  orderID: evalitem.orderID,
                  EvaluationVersionID: evalitem.EvaluationVersionID,
                  clarification: evalitem.clarification,
                };
          this.allScals.push(caseData);
        });
        if (dataRes.responseStatus) {
          // this.evaluationQuestions = [];

          data.evaluation.map((item: any) => {
            console.log("item>>>>>>", item);
            // var evlDetail = _.find(this.allScals, { 'evaluationQuestionID': item.evaluationQuestionID })
            // item['orderID'] = item.evaluationQuestionID.order,
            // item['Question'] = item.evaluationQuestionID.questionID.question,
              (item["evaluationQuestionID"] =
                item.evaluationQuestionID.evaluationQuestionID),
              (item["Scale"] = _.find(this.allScals, {
                evaluationQuestionID: item.evaluationQuestionID,
              }));
            if (item.score == 0) {
              item["selectedScore"] = { view: "0", value: 0 };
            } else if (item.isNa == true) {
              item["score"] = "N/A";
              item["selectedScore"] = { view: "N/A", value: "N/A" };
            } else {
              item["selectedScore"] = { view: item.score, value: item.score };
              item.score = item.score;
            }
            if (item.notes == "null") {
              item["notes"] = "";
            } else {
              item["notes"] = item.notes;
            }
            if (item.correctedScore == 0) {
              item["selectedCorrectedScore"] = { view: "0", value: 0 };
            } else if (item.isNaCorrected == true) {
              item["correctedScore"] = "N/A";
              item["selectedCorrectedScore"] = { view: "N/A", value: "N/A" };
            } else {
              item["selectedCorrectedScore"] = {
                view: item.correctedScore,
                value: item.correctedScore,
              };
            }
          });

          //data.evaluation.sort((a, b) => { return a.orderID - b.orderID });
          this.evaluationQuestions = data.evaluation;
          this.evaluationQuestions.map((item: any) => {
            item["EvaluationQuestionID"] = item.Scale.evaluationQuestionID;
            item["orderID"] = item.Scale.orderID;
            // item['questionDetail'] = item.Scale.Question
            // item['clarification'] = item.Scale.clarification
            var questionWithClrify = item.Scale.Question.split("*");
            item["questionDetail"] = questionWithClrify[0];
            var clarifyORnotes = item.Scale.Question.split(":");
            item["clarification"] = clarifyORnotes[1];
          });
          this.evaluationQuestions.sort((a, b) => {
            return a.orderID - b.orderID;
          });
          console.log(
            "this.evaluationQuestions>>>>>>",
            this.evaluationQuestions
          );
          this.evaluationQuestions.forEach((element) => {
            var dataArra = {
              evaluationQuestionID: element.evaluationQuestionID,
              notes: element.notes,
              score: element.score,
              correctedScore: element.correctedScore,
              evaluationScoreID: element.evaluationScoreID,
            };
            questionsArray.push(dataArra);
          });

          this.caseEval.evalutionScore = data.evaluation;
          if (data.isActive) {
            !isNullOrUndefined(data.evaluationDate)
              ? (data.evaluationDate = new Date(data.evaluationDate))
              : null;
          } else {
            !isNullOrUndefined(data.evaluationDate)
              ? (data.evaluationDate = moment
                  .utc(data.evaluationDate)
                  .format("MM/DD/YYYY HH:mm"))
              : null;
          }
          this.caseEval.evaluationDate =
            data.evaluationDate === null ? "" : data.evaluationDate;
          this.caseEval.evaluationQuestionID =
            data.evaluation[0].evaluationVersion;
          if (data.evaluation[0].evaluationVersion.evaluationQuestionID == 101) {
            this.showHideNotesAndCorrect = false;
            this.notesLabel = "Primary Resp. Party";
            this.clarifyLabel = "Notes";
            // this.score = [{ view: '0', value: 0 },
            // { view: '1', value: 1 },
            // { view: 'N/A', value: 'N/A' }];
          } else {
            this.notesLabel = "Notes";
            this.showHideNotesAndCorrect = true;
            this.clarifyLabel = "*Clarification";
            // this.score = [{ view: '0', value: 0 },
            // { view: '1', value: 1 },
            // { view: 'N/A', value: 'N/A' }];
          }

          this.caseEval.evaluationTypeID = data.evaluvationType;
          this.directions = data.evaluation[0].evaluationVersion.directions;
          let req = { staffID: parseInt(data.staffID.staffID) };
          this._client.getDetailsById(req).then((data) => {
            data.staff["fullName"] =
              data.staff.lastName + " " + data.staff.firstName;
            this.caseEval.staffID = data.staff;
            document.getElementById("closeBtn").click();
          });
          // this.caseEval.staffID = this.getStaffById(data.staffID.staffID);      // this.evaluationQuestions = data.evaluationScore;
          this.caseEval.timeSpent = data.timeSpent;
          document.getElementById("closeBtn").click();
          this.caseEvaluationsForm.disable();
          this.editControl = true;
          this.isReadOnly = true;
          loader.style.display = "none";
        } else {
          loader.style.display = "none";
        }
      });
    });
  }

  selectEvaluationVersion(event: any) {
    this.getEvaluationQuestions(event.evaluationQuestionID);
  }
}
