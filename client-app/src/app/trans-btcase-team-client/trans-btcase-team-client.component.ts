import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
declare var $: any;
import * as _ from 'lodash';
import { AgGridNg2 } from 'ag-grid-angular';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
// import "ag-grid-enterprise";
@Component({
  selector: 'app-trans-btcase-team-client',
  templateUrl: './trans-btcase-team-client.component.html',
  styleUrls: ['./trans-btcase-team-client.component.scss']
})
export class TransBTcaseTeamClientComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridNg2;
  display: boolean;
  personDetailData: any;
  filteredPersonTypes: any[];
  personTypes = [];
  toCaseManager: any;
  fromCaseManager: any;
  results: any;
  caseManagerList = [];
  filteredCaseManager: any[];
  filterData = 'clientToCase';
  filterStatus = true;
  personTypeID: any;
  sfa_office_list = [];
  personID: any;
  from_Case_Manager_list = [];
  to_Case_Manager_list: any;
  personTypeName: any;
  hideme = []
  getClien_tList: any;
  dragClientList = [];
  itemsFromCopy = [];
  personAssignmentTypeID: any;
  columnDefs = [];
  listViewHeaders = [];
  listTest = [];
  beginDate: any;
  dragLists = [{ ClientName: "", BeginDate: "", status: "" }];
  
  dateTime: any;

  constructor(public _CaseTeamService: CaseTeamService, public _localValues: LocalValues) { }

  ngOnInit() {
    var data = {
      query: 'Case Manager'
    }
    this.defaultSelectCasemanager(data);
  }
  showDialog(state) {
    this.display = state;
  };
  defaultSelectCasemanager(event) {
    let req = {
      "Object": "personType",
      "value": event.query
    };
    this._CaseTeamService.getSearchList(req).then(data => {
      var personData = data.dropDown.filter(element => element.personType == "Case Manager");
      this.personDetailData = personData[0];
      this.generatePersonSubtype(this.personDetailData);
    })
  };

  getPersonType(event) {
    let req = {
      "Object": "personType",
      "value": event.query
    };
    this._CaseTeamService.getSearchList(req).then(data => {
      this.results = data.dropDown;
      // var personData = this.results.filter(element => element.personType == "Case Manager");
      // this.personDetailData = data.dropDown;
      // this.generatePersonSubtype(this.personDetailData);
    })
  };
  casemanagerAllList(personTypeID) {
    let reqData = {
      "personTypeID": personTypeID
    };
    this._CaseTeamService.getCase_ManagerList(reqData).then(data => {
      this.caseManagerList = data.caseManagerList;
    });
  };
  filteredContactTypes(event: any) {
    this.filteredCaseManager = [];
    this.caseManagerList.filter((item: any) => {
      if (item.Name.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCaseManager.push(item)
      };
    });
  };
  caseTeamChange() {
    if (this.filterData == 'clientToCase') {
      this.filterStatus = true;
    } else {
      this.filterStatus = false;
    };
    this.from_Case_Manager_list = [];
    this.fromCaseManager = {};
    this.toCaseManager = {};
    this.to_Case_Manager_list = [];
    this.dragClientList = [];
    $("#sortable2 p").remove();
  };
  generatePersonSubtype(event) {
    this.hideme = [];
    this.toCaseManager = {};
    this.to_Case_Manager_list = [];
    this.from_Case_Manager_list = [];
    this.fromCaseManager = {}
    if (this.dragClientList.length > 0) {
      this.dragClientList.forEach(dragData => {
        $("#" + dragData.caseKey).remove();
      });
    };
    if (event != {}) {
      this.personTypeName = event.personType;
      this.personTypeID = event.personTypeID;
      this.casemanagerAllList(event.personTypeID);
      this.SFCSofficeList(event.personTypeID);
    }
  };

  SFCSofficeList(personTypeID) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let reqData = {
      "personTypeID": personTypeID
    };
    this._CaseTeamService.get_SFCS_officeList(reqData).then(data => {
      data.officeList.map(dataOfElement => {
        dataOfElement['client'] = [];
      });
      this.sfa_office_list = data.officeList;
      this.itemsCopy = data.officeList;
      loader.style.display = 'none';
    });
  };
  getFromCaseManagerSubType(event) {
    // this.personID = event.PersonID;
    this.fromCaseManagerList(event.PersonID);
  };
  personName: any;
  getToCaseManagerSubType(event) {
    this.personName = event.Name;
    this.personID = event.PersonID;
    this.personAssignmentTypeID = event.PersonAssignmentTypeID;
    this.toCaseManagerList(event.PersonID);
  }
  fromCaseManagerList(PersonID) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var reqData = {
      "personTypeID": this.personTypeID,
      "personID": PersonID,
    };
    this._CaseTeamService.getPersonByCaseManager(reqData).then(data => {
      data.personList.map((dataOfElement, key) => {
        dataOfElement["caseKey"] = key;
      });
      this.from_Case_Manager_list = data.personList;
      this.itemsFromCopy = data.personList;
      loader.style.display = 'none';
    });
  }
  toCaseManagerList(PersonID) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var reqData = {
      "personTypeID": this.personTypeID,
      "personID": PersonID,
    };
    this._CaseTeamService.getPersonByCaseManager(reqData).then(data => {
      this.to_Case_Manager_list = data.personList;
      loader.style.display = 'none';
    });
  };

  getClients(itm, i) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var reqData = {
      "sFAOfficeID": itm.SFAOfficeID,
      "personTypeID": this.personTypeID
    };
    this._CaseTeamService.getCaseManagerByClient(reqData).then(res_data => {
      res_data.clientAndCaseManagerList.map((dataOfElement, key) => {
        this.getClien_tList = res_data.clientAndCaseManagerList;
        dataOfElement["parentCaseKey"] = i;
        dataOfElement["caseKey"] = key + i;
        dataOfElement["SFAOfficeID"] = itm.SFAOfficeID;
        dataOfElement["personTypeID"] = this.personTypeID;
      });
      this.sfa_office_list[i]['client'] = res_data.clientAndCaseManagerList;
      loader.style.display = 'none';
      document.getElementById("sortable1").click();
    });
  };
  all_clientDetails = [];
  dragData(i) {
    var self = this;
    $("#sortable1 p").click(function () {
      $(this).toggleClass('selected');
    });

    /*  $( "#target" ).click(function() {
      $(this).toggleClass('selected');
     }); */

    /*  $('.droptrue').on('click', 'li', function () {
         $(this).toggleClass('selected');
     }); */

    $("div.droptrue").sortable({
      connectWith: 'div.droptrue',
      opacity: 0.6,
      revert: true,
      helper: function (e, item) {
        if (!item.hasClass('selected'))
          item.addClass('selected');
        var elements = $('.selected').not('.ui-sortable-placeholder').clone();
        var helper = $('<div/>');
        item.siblings('.selected').addClass('hidden');
        return helper.append(elements);
      },
      start: function (e, ui) {
        var elements = ui.item.siblings('.selected.hidden').not('.ui-sortable-placeholder');
        ui.item.data('items', elements);
      },
      receive: function (e, ui) {
        ui.item.before(ui.item.data('items'));
      },
      stop: function (e, ui) {
        ui.item.siblings('.selected').removeClass('hidden');
        $('.selected').removeClass('selected');
        self.getDragClientDetails(i);
      },
      update: updatePostOrder
    });
    // $("#sortable1, #sortable2").disableSelection();
    // $("#sortable1, #sortable2").css('minHeight', $("#sortable1").height() + "px");
    updatePostOrder();
  };

  getDragClientDetails(i) {
    var caseTeams = $("#postOrder").val().split(",");
    if (this.filterStatus) {
      caseTeams.forEach(ele => {
        if (ele == "") {
          $("#sortable2 p").remove();
        } else {
          var personData = _.find(this.sfa_office_list[i]['client'], { 'caseKey': parseInt(ele) });
          // var personData = this.sfa_office_list[i]['client'].filter(element => element.caseKey == parseInt(ele));
          this.dragClientList.push(personData);
          this.dragClientList.map(dataOf_Element => {
            dataOf_Element['caseID'] = dataOf_Element.CaseID;
            dataOf_Element['caseTeamID'] = dataOf_Element.CaseTeamID;
          });
        }
      });
      $("#sortable2 p").remove();
    } else {
      caseTeams.forEach(ele => {
        if (ele == "") {
          $("#sortable2 p").remove();
        } else {
          var personData = _.find(this.from_Case_Manager_list, { 'caseKey': parseInt(ele) });
          // var personData = this.from_Case_Manager_list.filter(element => element.caseKey == parseInt(ele));
          this.dragClientList.push(personData);
          $("#sortable2 p").remove();
        }
      });
      this.dragClientList.map(dataOf_Element => {
        dataOf_Element['clientName'] = dataOf_Element.ClientName;
        dataOf_Element['caseID'] = dataOf_Element.CaseID;
        dataOf_Element['clientID'] = dataOf_Element.ClientID;
        dataOf_Element['referralID'] = dataOf_Element.ReferralID;
        dataOf_Element['personAssignmentTypeID'] = dataOf_Element.PersonAssignmentTypeID;
        dataOf_Element['caseTeamID'] = dataOf_Element.CaseTeamID;
      })
    };
    document.getElementById("sortable2").click();
  };
  applybeginDate: any;
  applyToAll() {
    var beginDate;
    this.dragLists.map(itm => {
      itm['BeginDate'] = moment(this.applybeginDate).format('MM/DD/YYYY');
      beginDate = itm['BeginDate'];
    });
    var beforeDate = this.applybeginDate.setDate(this.applybeginDate.getDate() - 1);
    this.dragLists.map(itm => {
      itm['EndDate'] = moment(beforeDate).format('MM/DD/YYYY');
    });
    this.agGrid.api.refreshCells();
    this.applybeginDate = new Date(beginDate);
  }
  display_save = false;
  dragDet = false;
  saveCaseTeam() {
    console.log("this.personID>>>", this.personID);
    if (this.personID && this.dragClientList.length > 0) {
      this.dragLists = [];
      this.dragDet = true;
      this.display_save = true;
      let rawData = [];
      this.columnDefs = [];
      this.dragClientList.forEach(ele => {
        var data_el = {
          "caseTeamID": ele.caseTeamID,
          "ClientName": ele.clientName,
          "BeginDate": "",
          "status": "",
          "caseID": ele.caseID,
          "referralID": ele.referralID,
          "clientID": ele.clientID,
        };
        this.dragLists.push(data_el);
      });
      if (this.dragLists.length > 0) {
        this.listViewHeaders.push(Object.keys(this.dragLists[0]))
        this.listViewHeaders[0].forEach((item: any) => {
          let data = { headerName: item, field: item }
          this.listTest.push(data);
        });
        rawData.push(this.listTest);
        this.columnDefs = rawData[0];
        this.columnDefs.map(data => {
          if (data.field == 'caseTeamID') {
            data['hide'] = true;
          }
          if (data.field == 'caseID') {
            data['hide'] = true;
          }
          if (data.field == 'referralID') {
            data['hide'] = true;
          }
          if (data.field == 'clientID') {
            data['hide'] = true;
          }
          if (data.field == 'status') {
            data['editable'] = true;
            data['order'] = 2;
          }
          if (data.field == "BeginDate") {
            data['editable'] = true;
            data['order'] = 1;
            data['cellEditor'] = Datepicker;
            data['cellRenderer'] = params => {
              console.log("params>>", params);
              return params.value;
            }
          }
        });

      }
    } else {
      console.log("please Select To Case Manager");
      swal('Info!', 'Please Select To Case Manager and Drag Data', 'warning');
    }

    console.log("this.dragLists>>>", this.dragLists);
    console.log("this.columnDefs>>>", this.columnDefs);
    // console.log("this.personID>>>",this.personID);

    //   const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    //   var caseTeam = []; var dataClient; var dataList=[];
    //   this.dragClientList.forEach(ele => {
    //     caseTeam.push(ele.caseTeamID);
    //     dataClient = {
    //       "caseID": ele.caseID,
    //       "beginDate": new Date().getTime(),
    //       "endDate": null,
    //       "personAssignmentTypeID": this.personAssignmentTypeID,
    //       "personID": this.personID,
    //       "personTypeID": this.personTypeID,
    //       "referralID": ele.referralID,
    //       "clientID": ele.clientID,
    //     };
    //     dataList.push(dataClient);
    //   });
    //   var data_case = {
    //     "caseTeamUpdate": {
    //       "caseTeamID": caseTeam
    //     },
    //     "caseTeamSave": dataList
    //   };
    //   this._CaseTeamService.saveTransferClient(data_case).then(data => {
    //     this.dragClientList = [];
    //     document.getElementById("sortable2").click();
    //     swal('Success!', 'Successfully Added', 'success');
    //     this.clearData();
    //     loader.style.display = 'none';
    //   });
  };

  onClickPerson() {
    swal('Warning!', 'NOTE: Case Manager must have at least one client assigned to them before they can show on this list. This assignment can be done in the Case Team node in the Client Tree', 
    'warning');
  }
  clearData() {
    this.caseManagerList = [];
    this.sfa_office_list = [];
    this.hideme = [];
    this.toCaseManager = {};
    this.to_Case_Manager_list = [];
    this.from_Case_Manager_list = [];
    this.fromCaseManager = {}
    this.filterData = 'clientToCase';
    $("#sortable2 p").remove();
    var data = {
      query: 'Case Manager'
    }
    this.defaultSelectCasemanager(data);
    this.dragClientList = [];
    this.caseTeamChange();
  }
  deleteDragList(dragData) {
    for (var i = 0; i < this.dragClientList.length; i++) {
      if (this.dragClientList[i].caseKey === dragData.caseKey) {
        this.dragClientList.splice(i, 1);
        $("#" + dragData.caseKey).remove();
      }
    };
  };
  searchTerm: any;
  itemsCopy = [];
  search() {
    let term = this.searchTerm;
    if (this.filterStatus) {
      this.sfa_office_list = this.itemsCopy.filter(function (tag) {
        return tag.DESC.toLowerCase().indexOf(term) >= 0;
      });
    } else {
      this.from_Case_Manager_list = this.itemsFromCopy.filter(function (tag) {
        return tag.ClientName.toLowerCase().indexOf(term) >= 0;
      });
    }
  };
  onCellValueChanged(eve) {
    console.log("eve>>>>", eve);
  };
  onRowSelected(eve) {
    console.log("esdsdve>>>>", eve);
  };
  saveCaseTeamData() {
    this.agGrid.api.stopEditing();
    console.log("this.dragLists>>>", this.dragLists);
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var caseTeam = []; var dataClient; var dataList = [];
    this.dragLists.forEach(ele => {
      var applyBeginDate = new Date(ele.BeginDate)
      var beforeDate = applyBeginDate.setTime(applyBeginDate.getTime() - (1 * 24 * 3600000));
      var apply_BeginDate = moment(beforeDate).format('MM/DD/YYYY');
      console.log("BEGIN DATE>>>", this._localValues.stringFormatDatetime(ele.BeginDate), "END DATE>>>", this._localValues.stringFormatDatetime(beforeDate))
      caseTeam.push({
        "caseTeamID": ele['caseTeamID'],
        "endDate": this._localValues.stringFormatDatetime(beforeDate),
      });
      dataClient = {
        "caseID": ele['caseID'],
        "beginDate": this._localValues.stringFormatDatetime(new Date(ele.BeginDate)),
        "endDate": null,
        "personAssignmentTypeID": this.personAssignmentTypeID,
        "personID": this.personID,
        "personTypeID": this.personTypeID,
        "referralID": ele['referralID'],
        "clientID": ele['clientID'],
      };
      dataList.push(dataClient);
    });
    var transferClient = {
      "caseTeamUpdate": caseTeam,
      "caseTeamSave": dataList
    };
    this._CaseTeamService.saveTransferClient({ transferClient }).then(data => {
      this.dragClientList = [];
      document.getElementById("sortable2").click();
      swal('Success!', 'Successfully Added', 'success');
      this.clearData();
      loader.style.display = 'none';
      this.dragDet = false;
    });
  }
  closeTab() {
    this.dragDet = false;
  }
};

function updatePostOrder() {
  var arr = [];
  $("#sortable2 p").each(function () {
    arr.push($(this).attr('id'));
  });
  $('#postOrder').val(arr);
};

function Datepicker() { }
Datepicker.prototype.init = function (params) {
  this.eInput = document.createElement("input");
  this.eInput.value = params.value;
  $(this.eInput).datepicker({ dateFormat: "mm/dd/yy" });
};
Datepicker.prototype.getGui = function () {
  return this.eInput;
};
Datepicker.prototype.afterGuiAttached = function () {
  this.eInput.focus();
  this.eInput.select();
};
Datepicker.prototype.getValue = function () {
  return this.eInput.value;
};
Datepicker.prototype.destroy = function () { };
Datepicker.prototype.isPopup = function () {
  return false;
};
