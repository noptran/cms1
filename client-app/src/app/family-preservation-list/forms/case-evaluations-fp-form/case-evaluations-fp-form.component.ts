import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CaseEvaluations, EvalutionScore } from "./case-evaluations";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import swal from "sweetalert2";
import * as moment from "moment";
import * as _ from "lodash";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-case-evaluations-fp-form",
  templateUrl: "./case-evaluations-fp-form.component.html",
  styleUrls: ["./case-evaluations-fp-form.component.scss"],
})
export class CaseEvaluationsFpFormComponent implements OnInit {
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
  discardTo = "/reports/referral/family-preservation/case-evaluations/view";
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
    if (this._router.url.includes("reports/opencards/list/client/case")) {
      let hashedReferraType = 14 + this._opencard.getHasKey();
      localStorage.setItem("referralTypeId", hashedReferraType.toString());
      this.checkPRTF();
    } else {
      this.formValidation();
      this.getEvaluationType();
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case Form",
          href: "/reports/referral/family-preservation/detail",
          active: "",
        },
        {
          label: "Case Evaluation List",
          href: "/reports/referral/family-preservation/case-evaluations/view",
          active: "",
        },
        { label: "Case Evaluation Form", active: "active" }
      );
      if (this._router.url.includes("/case-evaluations/new")) {
        this.getcaseEvaluationVersion();
        this.getStaffDetail();
      }
      if (this._router.url.includes("/case-evaluations/detail")) {
        this.getCaseEvalationRec();
        this.isAttachmentRequired = true;
      }
      let referralTypeId =
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey();
      this._opencard.breadcurmbsDetermination(
        "case-evaluation",
        referralTypeId,
        this.breadcrumbs
      );

      if (
        this._opencard.getOtherRefDetails() &&
        this._opencard.getOtherRefDetails().referralName === "FI"
      ) {
        this.score.push(
          { view: "0", value: 0 },
          { view: "1", value: 1 },
          { view: "2", value: 2 },
          { view: "N/A", value: "N/A" }
        );
      } else {
        this.score.push(
          { view: "0", value: 0 },
          { view: "1", value: 1 },
          { view: "N/A", value: "N/A" }
        );
      }
    }
  }

  formValidation() {
    this.caseEvaluationsForm = this._fb.group({
      evaluationVersion: [null],
      evaluationType: [null],
      staff: [null],
      timeSpent: [null],
      evaluationDate: [null],
      evaluationScore: [null],
      notes: [null],
      correctedScore: [null],
    });
  }

  /***
   * Get case evaluation type based on referral type id
   */
  getcaseEvaluationVersion() {
    let req;
    this.caseEvaluationVersionList = [];
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    req = {
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey(),
    };
    this._opencard.getCaseEvaluationVersion(req).then((data) => {
      if (data.evaluationVersion.length == 1) {
        loader.style.display = "none";
        this.caseEvaluationVersion = data.evaluationVersion[0];
        this.caseEval.evaluationVersionID = this.caseEvaluationVersion.versionDesc;
        this.directions = this.caseEvaluationVersion.directions;
        this.caseEval.evaluationVersionID = data.evaluationVersion[0];
        this.getEvaluationQuestions(
          this.caseEvaluationVersion.evaluationVersionID
        );
        console.log("test",localStorage.setItem("evaluationVersionID", this.caseEvaluationVersion));
        localStorage.setItem("evaluationVersionID", this.caseEvaluationVersion);
        this.caseEvaluationVersionList = data.evaluationVersion;
        document.getElementById("closeBtn").click();
      }
      if (data.evaluationVersion.length > 1) {
        loader.style.display = "none";
        this.caseEvaluationVersion = data.evaluationVersion[1];
        this.caseEval.evaluationVersionID = this.caseEvaluationVersion.versionDesc;
        this.directions = this.caseEvaluationVersion.directions;
        this.caseEval.evaluationVersionID = data.evaluationVersion[1];
        this.getEvaluationQuestions(
          this.caseEvaluationVersion.evaluationVersionID
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

  /**
   * Get case evaluation type based on referral type id
   */
  getEvaluationType() {
    let req;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    req = {
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey(),
    };
    this._opencard.getCaseEvaluationType(req).then((data) => {
      loader.style.display = "none";
      this.caseEvaluationTypes = data.evaluationType;
    });
  }

  /**
   *
   * @param event Keyboard event
   */
  filterCaseEvaluations(event) {
    this.filteredEvaluationsType = [];
    this.caseEvaluationTypes.filter((data) => {
      if (data.evaluationType.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredEvaluationsType.push(data);
      }
    });
  }

  /**
   *
   * @param event Autocomplete box event
   */
  getStaffDetails(event) {
    let req;
    req = { Object: "staff", value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item["fullName"] = item.lastName + " " + item.firstName;
        // item['fullName'] = item.staffID + ' ' + item.lastName + ' ' + item.firstName;
      });
      this.staffList = data.dropDown;
    });
  }

  /**
   * Get the questions based on selected evaluation version id
   * @param versionID selected evaluation version id
   */

  getEvaluationQuestions(versionID) {
    this.arr = [];
    if (versionID == 101) {
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

    let req = { evaluationVersionID: versionID };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.getCaseEvaluationScale(req).then((data) => {
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
          evaluationQuestionID: element.EvaluationQuestionID,
          notes: undefined,
          score: undefined,
          correctedScore: undefined,
          evaluationScoreID: undefined,
        };
        this.arr.push(dataArra);
      });
      this.evaluationQuestions.sort((a, b) => a.orderID - b.orderID);
      document.getElementById("closeBtn").click();
    });
  }
  /***
   * @param data  - evaluation score object
   * @param event - onselect form button component
   */
  arr = [];
  getScore(data) {
    console.log("data>>>>>>", data);
    if (!this.showHideNotesAndCorrect) {
      this.arr.push({
        evaluationQuestionID: data.EvaluationQuestionID,
        notes: data.notes,
        score: !isNullOrUndefined(data.selectedScore)
          ? (data.selectedScore.value = data.selectedScore.value)
          : "undefined",
        evaluationScoreID: data.evaluationScoreID,
      });
      this.arr.map((item: any) => {
        if (item.score == null) {
          delete item["score"];
        }
        if (item.score == "undefined") {
          delete item["score"];
        }
      });
    } else {
      this.arr.push({
        evaluationQuestionID: data.EvaluationQuestionID,
        notes: data.notes,
        score: !isNullOrUndefined(data.selectedScore)
          ? (data.selectedScore.value = data.selectedScore.value)
          : "undefined",
        correctedScore: !isNullOrUndefined(data.selectedCorrectedScore)
          ? (data.selectedCorrectedScore.value =
              data.selectedCorrectedScore.value)
          : "undefined",
        evaluationScoreID: data.evaluationScoreID,
      });

      this.arr.map((item: any) => {
        if (item.score == null) {
          delete item["score"];
        }
        if (item.correctedScore == null) {
          delete item["correctedScore"];
        }
        if (item.score == "undefined") {
          delete item["score"];
        }
        if (item.correctedScore == "undefined") {
          delete item["correctedScore"];
        }
      });
    }

    // if(this.caseEvalUpdate){

    //   this.arr.push({
    //     evaluationQuestionID: data.evaluationQuestionID,
    //     notes: data.notes,
    //     score: !isNullOrUndefined(data.selectedScore) ? data.selectedScore.value = data.selectedScore.value : 'undefined',
    //     correctedScore: !isNullOrUndefined(data.selectedCorrectedScore) ? data.selectedCorrectedScore.value = data.selectedCorrectedScore.value : 'undefined',
    //     evaluationScoreID: data.evaluationScoreID
    //   });

    //   this.arr.map((item: any) => {
    //     if (item.score == null) {
    //       delete item['score'];
    //     }
    //     if (item.correctedScore == null) {
    //       delete item['correctedScore'];
    //     }
    //     if (item.score == 'undefined') {
    //       delete item['score'];
    //     }
    //     if (item.correctedScore == 'undefined') {
    //       delete item['correctedScore'];
    //     }
    //     if (item.evaluationQuestionID ==undefined) {
    //       delete item['correctedScore'];
    //       delete item['score'];
    //       delete item['evaluationScoreID'];
    //       delete item['notes'];
    //       delete item['evaluationQuestionID'];
    //     }
    //   });

    // }
    console.log("this.arr>>>>>", this.arr);
  }

  /***
   * Remove the duplicates form casescores array and kept the latest changes
   */
  addPost(caseEval) {
    if (this.caseEval.evaluationTypeID == undefined) {
      swal("Info", "Please Select the Evaluation Type.", "warning");
    } else {
      let originalCaseScore: any, reverseCaseCore: any, source;
      let uniq = {};
      reverseCaseCore = this.arr.reverse();
      // originalCaseScore = reverseCaseCore.filter(obj => !uniq[obj.evaluationQuestionID] && (uniq[obj.evaluationQuestionID] = true));
      console.log("originalCaseScore>>>", originalCaseScore);
      this.caseEval.evalutionScore = reverseCaseCore.filter(
        (obj) =>
          !uniq[obj.evaluationQuestionID] &&
          (uniq[obj.evaluationQuestionID] = true)
      );
      source = this.caseEval;
      !isNullOrUndefined(source.evaluationTypeID)
        ? (source.evaluationTypeID = source.evaluationTypeID.evaluationTypeID)
        : null;
      !isNullOrUndefined(source.staffID)
        ? (source.staffID = source.staffID.staffID)
        : null;
      !isNullOrUndefined(source.evaluationDate)
        ? (source.evaluationDate = Date.parse(source.evaluationDate))
        : null;
      !isNullOrUndefined(source.evaluationVersionID)
        ? (source.evaluationVersionID =
            source.evaluationVersionID.evaluationVersionID)
        : null;
      this.caseEval.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      this.caseEval = source;
      this.referralTypeId =
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey();
      if (this.isPrtfCaseEvaluation) {
        if (this.evaluationID) {
          this.update(this.caseEval);
        } else {
          this.save(this.caseEval);
        }
      } else {
        if (this._router.url.includes("/case-evaluations/new")) {
          this.save(this.caseEval);
        }
        if (this._router.url.includes("/case-evaluations/detail")) {
          this.caseEval.evaluationID = this.evaluationID;
          this.update(this.caseEval);
        }
      }
    }
  }

  save(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveCaseEvaluation(source).then((data) => {
      this.caseEval = data.evaluation;
      loader.style.display = "none";
      this.editControl = true;
      if (this.isAppHeader) {
        swal("Save", "Case Evaluation Created!", "success");
        this._opencard.navigateToListView(
          "court-evaluations",
          this.referralTypeId
        );
      } else {
        this._meassgae.add({
          severity: "success",
          summary: "Saved!",
          detail: "The record has been saved!",
        });
        this.isForm = false;
        this.getCaseEvaluationList();
        this.isList = true;
      }
    });
  }

  update(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.caseEval = new CaseEvaluations();
    source["evaluationID"] = this.evaluationID;
    this._opencard.updateCaseEvaluation(source).then((data) => {
      this.caseEval = data.evaluation;
      loader.style.display = "none";
      this.editControl = true;

      if (this.isAppHeader) {
        swal("Update", "Case Evaluation Updated!", "success");
        this._opencard.navigateToListView(
          "court-evaluations",
          this.referralTypeId
        );
      } else {
        this._meassgae.add({
          severity: "success",
          summary: "Saved!",
          detail: "The record has been saved!",
        });
        this.isForm = false;
        this.getCaseEvaluationList();
        this.isList = true;
      }
    });
  }
  evaluationID: any;
  getCaseEvalationRec() {
    var questionsArray = [];

    let loaderTime = document.getElementById("loading-overlay") as HTMLElement;
    loaderTime.style.display = "block";
    this.evaluationID = this._client.getId();
    let req = { evaluationID: this._client.getId() };
    this._opencard.getByIdCaseEvaluation(req).then((data) => {
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
        evaluationVersionID:
          data.evaluation[0].evaluationQuestionID.evaluationVersionID
            .evaluationVersionID,
      };
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this._opencard.getCaseEvaluationScale(req).then((dataRes) => {
        // dataRes.evaluationQuestion.map(item => {
        //   var questionWithClrify = item.Question.split('*');
        //   item['questionDetail'] = questionWithClrify[0];
        //   var clarifyORnotes = item.Question.split(':')
        //   item['clarification'] = clarifyORnotes[1];
        // });
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
          //   if(evalitem.Scale == null){
          //      caseData = {
          //       evaluationQuestionID: evalitem.EvaluationQuestionID,
          //       scale: ""
          //     };
          //   }else{
          //    caseData = {
          //     evaluationQuestionID: evalitem.EvaluationQuestionID,
          //     scale: evalitem.Scale
          //   };
          // }
          this.allScals.push(caseData);
        });
        if (dataRes.responseStatus) {
          // this.evaluationQuestions = [];

          data.evaluation.map((item: any) => {
            console.log("item>>>>>>", item);
            // var evlDetail = _.find(this.allScals, { 'evaluationQuestionID': item.evaluationQuestionID })
            // item['orderID'] = item.evaluationQuestionID.order,
            // item['Question'] = item.evaluationQuestionID.questionID.question,
            (item["evaluationVersion"] =
              item.evaluationQuestionID.evaluationVersionID),
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
          this.arr = questionsArray.reverse();
          this.arr.map((item: any) => {
            if (item.score == null) {
              delete item["score"];
            }
            if (item.correctedScore == null) {
              delete item["correctedScore"];
            }
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
          this.caseEval.evaluationVersionID =
            data.evaluation[0].evaluationVersion;
          if (data.evaluation[0].evaluationVersion.evaluationVersionID == 101) {
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

  edit() {
    this.caseEvaluationsForm.enable();
    this.editControl = false;
    this.isReadOnly = false;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  getEvaluationVersion(event: any) {
    this.metaData = [];
    this.caseEvaluationVersionList.filter((item) => {
      if (item.versionDesc.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  selectEvaluationVersion(event: any) {
    this.getEvaluationQuestions(event.evaluationVersionID);
  }

  scoreSelection(event: any) {
    this.filteredScore = [];
    this.score.filter((item: any) => {
      if (item.view.indexOf(event.query) !== -1) {
        this.filteredScore.push(item);
      }
    });
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL.includes(
        "/reports/referral/family-preservation/case-evaluations/detail"
      )
    ) {
      this.url = "/reports/attachment-document/case-evaluation";
    } else {
      this.url = "/reports/attachment-document/rfc/case-evaluation";
    }
    return this._router.navigate([this.url]);
  }
  getStaffDetail() {
    this.staffId = isNullOrUndefined(localStorage.getItem("UserId"))
      ? 5130
      : localStorage.getItem("UserId");
    let req = { staffID: parseInt(this.staffId) };
    this._client.getDetailsById(req).then((data) => {
      data.staff["fullName"] = data.staff.lastName + " " + data.staff.firstName;
      this.caseEval.staffID = data.staff;
    });
  }

  async getCaseEvaluationList() {
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "evaluationID", mode: "desc" },
      column: "evaluationID",
      mode: "desc",
    };

    this._caseTeam.getCaseEvaluationList(request).then((response) => {
      this.caseEvaluationList = response.evaluation;
      this.isForm = false;
      this.isList = true;
      this.isAppHeader = false;
    });
  }

  public onEdit(event: any) {
    this.caseEval = new CaseEvaluations();
    this.evaluationScore = new EvalutionScore();
    this.isForm = true;
    this.isList = false;
    this.formValidation();
    this._client.storeId(event.evaluationID);
    this.getCaseEvalationRec();
    // var questionsArray = [];

    // this.evaluationID = event.evaluationID;
    // let req = { evaluationID: event.evaluationID }
    // this._opencard.getByIdCaseEvaluation(req).then((data) => {
    //   this.caseEvalUpdate = true;

    //   let req = { evaluationVersionID: data.evaluation[0].evaluationQuestionID.evaluationVersionID.evaluationVersionID }
    //   let loader = document.getElementById('loading-overlay') as HTMLElement;
    //   loader.style.display = 'block';
    //   this._opencard.getCaseEvaluationScale(req).then((dataRes) => {

    //     dataRes.evaluationQuestion.forEach(evalitem => {
    //       let caseData;
    //       caseData = evalitem.Scale === null ? {
    //         evaluationQuestionID: evalitem.EvaluationQuestionID,
    //         scale: "",
    //         Question: evalitem.Question,
    //         orderID: evalitem.orderID,
    //         EvaluationVersionID: evalitem.EvaluationVersionID,
    //         clarification: evalitem.clarification,
    //       } :
    //         {
    //           evaluationQuestionID: evalitem.EvaluationQuestionID,
    //           scale: evalitem.Scale,
    //           Question: evalitem.Question,
    //           orderID: evalitem.orderID,
    //           EvaluationVersionID: evalitem.EvaluationVersionID,
    //           clarification: evalitem.clarification,
    //         };

    //       this.allScals.push(caseData);
    //     });
    //     if (dataRes.responseStatus) {

    //       data.evaluation.map((item: any) => {
    //         item['evaluationVersion'] = item.evaluationQuestionID.evaluationVersionID,
    //           item['evaluationQuestionID'] = item.evaluationQuestionID.evaluationQuestionID,
    //           item['Scale'] = _.find(this.allScals, { 'evaluationQuestionID': item.evaluationQuestionID })
    //         if (item.score == 0) {
    //           item['selectedScore'] = { view: '0', value: 0 };
    //         } else if (item.isNa == true) {
    //           item['score'] = 'N/A';
    //           item['selectedScore'] = { view: 'N/A', value: 'N/A' };
    //         } else {
    //           item['selectedScore'] = { view: item.score, value: item.score };
    //           item.score = item.score;
    //         }
    //         if (item.notes == 'null') {
    //           item['notes'] = ""
    //         } else {
    //           item['notes'] = item.notes;
    //         }
    //         if (item.correctedScore == 0) {
    //           item['selectedCorrectedScore'] = { view: '0', value: 0 };
    //         } else if (item.isNaCorrected == true) {
    //           item['correctedScore'] = 'N/A';
    //           item['selectedCorrectedScore'] = { view: 'N/A', value: 'N/A' };
    //         } else {
    //           item['selectedCorrectedScore'] = { view: item.correctedScore, value: item.correctedScore };
    //         }
    //       });

    //       this.evaluationQuestions = data.evaluation;
    //       this.evaluationQuestions.map((item: any) => {
    //         item['EvaluationQuestionID'] = item.Scale.evaluationQuestionID;
    //         item['orderID'] = item.Scale.orderID;
    //         var questionWithClrify = item.Scale.Question.split('*');
    //         item['questionDetail'] = questionWithClrify[0];
    //         var clarifyORnotes = item.Scale.Question.split(':')
    //         item['clarification'] = clarifyORnotes[1];
    //       });
    //       this.evaluationQuestions.sort((a, b) => { return a.orderID - b.orderID });
    //       this.evaluationQuestions.forEach(element => {
    //         var dataArra = {
    //           evaluationQuestionID: element.evaluationQuestionID,
    //           notes: element.notes,
    //           score: element.score,
    //           correctedScore: element.correctedScore,
    //           evaluationScoreID: element.evaluationScoreID
    //         };
    //         questionsArray.push(dataArra);
    //       });
    //       this.arr = questionsArray.reverse();
    //       this.arr.map((item: any) => {
    //         if (item.score == null) {
    //           delete item['score'];
    //         }
    //         if (item.correctedScore == null) {
    //           delete item['correctedScore'];
    //         }
    //       });

    //       this.caseEval.evalutionScore = data.evaluation;
    //       if (data.isActive) {
    //         !isNullOrUndefined(data.evaluationDate) ? data.evaluationDate = new Date(data.evaluationDate) : null;
    //       } else {
    //         !isNullOrUndefined(data.evaluationDate) ? data.evaluationDate = moment.utc(data.evaluationDate).format('MM/DD/YYYY HH:mm') : null;
    //       }
    //       this.caseEval.evaluationDate = data.evaluationDate === null ? "" : data.evaluationDate;
    //       this.caseEval.evaluationVersionID = data.evaluation[0].evaluationVersion;
    //       if (data.evaluation[0].evaluationVersion.evaluationVersionID == 101) {
    //         this.showHideNotesAndCorrect = false;
    //         this.notesLabel = 'Primary Resp. Party';
    //         this.clarifyLabel = 'Notes';

    //       } else {
    //         this.notesLabel = 'Notes';
    //         this.showHideNotesAndCorrect = true;
    //         this.clarifyLabel = '*Clarification';

    //       }

    //       this.caseEval.evaluationTypeID = data.evaluvationType;
    //       this.directions = data.evaluation[0].evaluationVersion.directions;
    //       let req = { staffID: parseInt(data.staffID.staffID) }
    //       this._client.getDetailsById(req).then(data => {
    //         data.staff['fullName'] = data.staff.lastName + ' ' + data.staff.firstName;
    //         this.caseEval.staffID = data.staff;
    //         document.getElementById("closeBtn").click();
    //       });

    //       this.caseEval.timeSpent = data.timeSpent;
    //       document.getElementById("closeBtn").click();
    //       this.caseEvaluationsForm.disable();
    //       this.editControl = true;
    //       this.isReadOnly = true;
    //       loader.style.display = 'none';
    //     } else {
    //       loader.style.display = 'none';
    //     }
    //   });
    // })
  }

  public addForm() {
    this.caseEval = new CaseEvaluations();
    this.evaluationScore = new EvalutionScore();
    this.formValidation();
    this.getEvaluationType();
    this.getcaseEvaluationVersion();
    this.getStaffDetail();
    this.editControl = false;
    this.isForm = true;
    this.isList = false;
  }

  isPrtfCaseEvaluation = false;
  checkPRTF() {
    if (this._router.url.includes("reports/opencards/list/client/case")) {
      this.getCaseEvaluationList();
      this.isPrtfCaseEvaluation = true;
      this.score = [];
      this.score.push(
        { view: "0", value: 0 },
        { view: "1", value: 1 },
        { view: "N/A", value: "N/A" }
      );

      this.formValidation();
      this.caseEval = new CaseEvaluations();
      this.evaluationScore = new EvalutionScore();
      this.editControl = false;
      this.getEvaluationType();
      this.getcaseEvaluationVersion();
      this.getStaffDetail();
      this.isAppHeader = false;
      this.caseEvaluationsForm.enable();
    }
  }

  discardForm() {
    if (!this.isPrtfCaseEvaluation) {
      return this._router.navigate([this.discardTo]);
    }
    this.isForm = false;
    this.isList = true;
    this.isAppHeader = false;
  }
}
