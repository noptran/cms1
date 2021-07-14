import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
declare var $: any;
import * as _ from 'lodash';
import { AgGridNg2 } from 'ag-grid-angular';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-trans-bt-team-lead-member',
  templateUrl: './trans-bt-team-lead-member.component.html',
  styleUrls: ['./trans-bt-team-lead-member.component.scss']
})
export class TransBtTeamLeadMemberComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;
  display: boolean;
  personDetailData: any;
  filteredPersonTypes: any[];
  personTypes = [];
  toCaseManager: any;
  fromCaseManager: any;
  results: any;
  fromTeamLeaderList = [];
  toTeamLeaderList = [];
  filteredFromTeamLeaderList: any[];
  filterData = 'clientToCase';
  filterStatus = true;
  personTypeID: any;
  sfa_office_list = [];
  teamLeaderID: any;
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
  fromTeamLeader() {
    let reqData = {
      "separationDate": null
    };
    this._CaseTeamService.getStaffFromLeader(reqData).then(data => {
      this.fromTeamLeaderList = data.staff;
    });
  };
  toTeamLeader() {
    let reqData = {
      "separationDate": new Date()
    };
    this._CaseTeamService.getStaffFromLeader(reqData).then(data => {
      this.toTeamLeaderList = data.staff;
    });
  };
  filteredContactTypes(event: any) {
    this.filteredFromTeamLeaderList = [];
    this.fromTeamLeaderList.filter((item: any) => {
      if (item.StaffName.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredFromTeamLeaderList.push(item)
      };
    });
  };
  filteredToTeamLeaderList = [];
  to_filteredContactTypes(event: any) {
    this.filteredToTeamLeaderList = [];
    this.toTeamLeaderList.filter((item: any) => {
      if (item.StaffName.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredToTeamLeaderList.push(item)
      };
    });
  };
  filteredOfficeList = [];
  filteredOffice(event: any) {
    this.filteredOfficeList = [];
    this.sfa_office_list.filter((item: any) => {
      if (item.DESC.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredOfficeList.push(item)
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
      this.fromTeamLeader();
      this.SFCSofficeList();
      this.toTeamLeader();
    }
  };

  SFCSofficeList() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let reqData = null;
    this._CaseTeamService.get_SFCS_officeList(reqData).then(data => {
      data.sfaOfficeList.map(dataOfElement => {
        dataOfElement['DESC'] = dataOfElement.officeName;
        dataOfElement['sfaOfficeID'] = dataOfElement.sfaOfficeID;
        dataOfElement['client'] = [];
      });
      this.sfa_office_list = data.sfaOfficeList;
      this.itemsCopy = data.sfaOfficeList;
      loader.style.display = 'none';
    });
  };
  getFromCaseManagerSubType(event) {
    // this.teamLeaderID = event.PersonID;
    this.fromCaseManagerList(event);
  };
  personName: any;
  getToCaseManagerSubType(event) {
    this.personName = event.StaffName;
    this.teamLeaderID = event.StaffID;
    this.personAssignmentTypeID = event.PersonAssignmentTypeID;
    this.toCaseManagerList(event);
  }
  fromCaseManagerList(eve) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var reqData = {
      "staffID": eve.StaffID,
    };
    this._CaseTeamService.getStaffByFromToList(reqData).then(data => {
      data.staffTeamMembers.map((dataOfElement, key) => {
        dataOfElement["caseKey"] = key;
      });
      this.from_Case_Manager_list = data.staffTeamMembers;
      this.itemsFromCopy = data.staffName;
      loader.style.display = 'none';
    });
  }
  toCaseManagerList(eve) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var reqData = {
      "staffID": eve.StaffID,
    };
    this._CaseTeamService.getStaffByFromToList(reqData).then(data => {
      data.staffTeamMembers.map((dataOfElement, key) => {
        dataOfElement["caseKey"] = key;
      });
      this.to_Case_Manager_list = data.staffTeamMembers;
      loader.style.display = 'none';
    });
  };

  getClients(itm, i) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var reqData = {
      "sfaOfficeID": itm.sfaOfficeID,
    };
    this._CaseTeamService.getSFM_officeList(reqData).then(res_data => {
      res_data.staffs.map((dataOfElement, key) => {
        this.getClien_tList = res_data.staffs;
        dataOfElement["parentCaseKey"] = i;
        dataOfElement["caseKey"] = key + i;
        dataOfElement["SFAOfficeID"] = itm.sfaOfficeID;
        dataOfElement["personTypeID"] = this.personTypeID;
      });
      this.sfa_office_list[i]['client'] = res_data.staffs;
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
    };
    document.getElementById("sortable2").click();
  };
  applybeginDate: any;
  apply_primaryOfcName: any;
  selecePrimaryOfc(event) {
    this.apply_primaryOfcName = event;
  };
  isStaffUsePositionBeginDate = false;
  changeStaffPositionDate(event) {
    if (this.isStaffUsePositionBeginDate) {

    } else {
      this.dragLists.map(itm => {
        itm['beginDate'] = null;
      });
    }

  }
  isUpdateOfc = false;
  applyToAll() {
    var beginDate;
    if (this.isStaffUsePositionBeginDate) {
      this.dragLists.map(itm => {
        var staffBeginDate = new Date(itm['staffPosition_BeginDate']);
        var staff_beforeDate = staffBeginDate.setDate(staffBeginDate.getDate() - 1);
        itm['beginDate'] = new Date(itm['staffPosition_BeginDate']);
        itm['EndDate'] = moment(staff_beforeDate).format('MM/DD/YYYY');
        itm['updatePrimaryOffice'] = this.isUpdateOfc;
      });
      if (this.isUpdateOfc) {
        this.dragLists.map(itm => {
          itm['officeBeginDate'] = new Date(this.applybeginDate)
          itm['officeName'] = this.apply_primaryOfcName;
        });
      }
    } else {
      this.dragLists.map(itm => {
        itm['beginDate'] = moment(this.applybeginDate).format('MM/DD/YYYY');
        beginDate = itm['beginDate'];
        itm['officeName'] = this.apply_primaryOfcName;
        itm['updatePrimaryOffice'] = this.isUpdateOfc;
      });
      var beforeDate = this.applybeginDate.setDate(this.applybeginDate.getDate() - 1);
      this.dragLists.map(itm => {
        itm['EndDate'] = moment(beforeDate).format('MM/DD/YYYY');
      });
      this.applybeginDate = new Date(beginDate);
      if (this.isUpdateOfc) {
        this.dragLists.map(itm => {
          itm['officeBeginDate'] = new Date(this.applybeginDate)
          itm['officeName'] = this.apply_primaryOfcName;
        });
      }
    }

  }
  display_save = false;
  dragDet = false;
  public components;
  changeOfficeNAme(index) {
    if (this.dragLists[index]['updatePrimaryOffice']) {

    } else {
      this.dragLists[index]['officeName'] = null;
    }

  }
  saveCaseTeam() {
    this.applybeginDate = new Date();
    this.isStaffUsePositionBeginDate = false;
    this.isUpdateOfc = false;
    this.apply_primaryOfcName = null;
    if (this.fromCaseManager.StaffName === this.toCaseManager.StaffName) {
      swal('Info!', 'There are no new records to save', 'warning');
    } else {
      this.dragLists = [];
      this.dragDet = true;
      this.display_save = true;
      let rawData = [];
      this.columnDefs = [];
      this.components = { datePicker: getDatePicker() };
      var staffIDS = [];
      var staffTeamIDS = [];
      var req;
      if (this.filterStatus) {
        this.dragClientList.forEach(ele => {
          staffIDS.push(ele.StaffID);
        });
        req = {
          "staffIDs": staffIDS
        }
      } else {
        this.dragClientList.forEach(ele => {
          staffTeamIDS.push(ele.StaffTeamLeaderID);
        });
        req = {
          "staffTeamLeaderIDs": staffTeamIDS
        }
      }
      this._CaseTeamService.getStaffByFromToDragLists(req).then(data => {
        if (data.staffsInfoList.length > 0) {
          data.staffsInfoList.map(itm => {
            itm['updatePrimaryOffice'] = itm['updatePrimaryOffice?'];
          })
          this.dragLists = data.staffsInfoList;
        }
      });
    }
  };
  clearData() {
    this.fromTeamLeaderList = [];
    this.toTeamLeaderList = [];
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

  };
  onRowSelected(eve) {

  };
  saveCaseTeamData() {

    this.saveTeamMember();
  }
  closeTab() {
    this.dragDet = false;
  };

  saveTeamMember() {
    var insertData;
    var insertDataList = [];
    var updateData;
    var updateDataList = [];
    var officeEndDate;
    var officeID;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.dragLists.forEach(ele => {
      if (ele['officeBeginDate'] == null) {
        officeEndDate = null;
      } else {
        var before_officeEndDate = new Date(ele['officeBeginDate']);
        officeEndDate = before_officeEndDate.setDate(before_officeEndDate.getDate() - 1);
      }
      if (ele['officeName'] === null || ele['officeName'] === undefined) {
        officeID = null;
      } else {
        officeID = ele['officeName'].sfaOfficeID;
      }
      insertData = {
        "staffID": ele['staffID'],
        "teamLeaderID": this.teamLeaderID,
        "beginDate": this._localValues.stringFormatDate(ele['beginDate']),
        "officeID": ele['sFAOfficeID'],
        "officeBeginDate": this._localValues.stringFormatDate(ele['officeBeginDate']),
      };
      insertDataList.push(insertData);
      updateData = {
        "staffTeamLeaderID": ele['staffTeamLeaderID'],
        "endDate": this._localValues.stringFormatDate(ele['EndDate']),
        "staffSFAOfficeID": ele['staffSFAOfficeID'],
        "officeEndDate": this._localValues.stringFormatDate(officeEndDate),
      };
      updateDataList.push(updateData);
    })

    var teamLeadReq = {
      "teamLeaderData": {
        "insertList": insertDataList,
        "updateList": updateDataList
      }
    }
    this._CaseTeamService.saveTeammember(teamLeadReq).then(data => {
      this.dragClientList = [];
      document.getElementById("sortable2").click();
      swal('Success!', 'Successfully Added', 'success');
      this.clearData();
      loader.style.display = 'none';
      this.dragDet = false;
    });
  }
};

function updatePostOrder() {
  var arr = [];
  $("#sortable2 p").each(function () {
    arr.push($(this).attr('id'));
  });
  $('#postOrder').val(arr);
};


function getDatePicker() {
  function Datepicker() { }
  Datepicker.prototype.init = function (params) {
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    this.eInput.classList.add('ag-input');
    this.eInput.style.height = '100%';
    $(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
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
  return Datepicker;
}