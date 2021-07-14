import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseTeamService } from '../case-team/case-team.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { isNullOrUndefined } from 'util';
import { PagesizeService } from '../pagesize/pagesize.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { TeamFormService } from '../team-form/team-form.service';

@Component({
  selector: 'app-modify-facts',
  templateUrl: './modify-facts.component.html',
  styleUrls: ['./modify-facts.component.scss']
})
export class ModifyFactsComponent implements OnInit {
  modifiedFactLists = [];
  enteredBy: any;
  constructor(public _caseTeam: CaseTeamService, public _pageSize: PagesizeService, public _team: TeamFormService) { }
  clientLists = [];
  headers = [];
  initial = 1;
  end = 100;
  totalCount: any;
  ngOnInit() {
    this.getClientData({ query: "" })
    this.viewAllReports(1, 100);
    this.getStaffDetails();
  };

  getClientData(event) {
    let req = {
      "value": event.query,
      "beginPagination": 1,
      "endPagination": 50,
      "sort": {
        "column": "clientName",
        "mode": "asc"
      }
    }
    this._caseTeam.getClientModifyDrops(req).then((data) => {
      this.clientLists = data.modifyClients;
      this.clientLists.map(itm=>{
        itm['dOB'] = moment(itm.dOB).format("MM/DD/YYYY");
      })
    });
  };
  clientDetail: any;
  getClientDeatail(eve) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.modifiedFactLists = [];
    this.clientDetail = eve;
    var req = {
      "clientID": eve.clientID
    };
    this.selectSecondaryData = [];
    this.showDrop = [];
    this._caseTeam.getClientdetail(req).then((data) => {
      data.modifiedFactList.forEach(ele => {
        var data = {
          isLinked: ele.isLinked,
          isSplit: ele.isSplit,
          clientName: ele.clientID.lastName + " " + ele.clientID.firstName,
          facts: ele.facts,
          clientID: ele.clientID.clientID,
          secondaryClientName: ele.secondaryClientID.lastName + " " + ele.secondaryClientID.firstName,
          secondaryFacts: ele.secondaryFacts,
          secondaryClientID: ele.secondaryClientID.clientID,
          modifiedFactID: ele.modifiedFactID
        };
        this.modifiedFactLists.push(data);
      });
      this.add_new_but = false;
      loader.style.display = 'none';
    })
  };
  add_new_but = false;
  addModify() {
    if (this.clientDetail) {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      var req = {
        "clientID": this.clientDetail.clientID,
        "facts": this.clientDetail.facts
      }
      this._caseTeam.add_Mdify(req).then((data) => {
        data.modifyClients.forEach(ele => {
          var data = {
            isLinked: false,
            isSplit: false,
            clientName: ele.client,
            facts: ele.facts,
            clientID: ele.clientID,
            secondaryClientName: "",
            secondaryFacts: "",
            secondaryClientID: ""
          };
          this.modifiedFactLists.push(data);
        });
        loader.style.display = 'none';
        this.add_new_but = true;
      });
    } else {
      swal('Info', 'Please Select the Client.', 'warning');
    }
  };
  showDrop = [];
  showSecondaryDrop(i) {
    this.showDrop[i] = true;
  };
  selectSecondaryData:any;
  selectIndex: any;
  getSecondaryDeatail(eve, index) {
    this.selectIndex = index;
    this.modifiedFactLists[index].secondaryClientName = eve.clientName;
    this.modifiedFactLists[index].secondaryFacts = eve.facts;
    this.modifiedFactLists[index].secondaryClientID = eve.clientID;
  };
  deleteClient(i, modifyData) {
    if (modifyData.modifiedFactID) {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      var req = { "modifiedFactID": modifyData.modifiedFactID }
      this._caseTeam.delete_Mdify(req).then((data) => {
        loader.style.display = 'none';
        this.getClientDeatail({ 'clientID': modifyData.clientID, 'facts': modifyData.facts })
      });
    } else {
      this.modifiedFactLists.splice(i, 1);
    }
  }
  saveClientToSecondary() {
    if (this.linkIs) {
      swal('Info', 'The Facts number should not be same for Is Linked', 'warning');
    } else if (this.splitIs) {
      swal('Info', 'You can only split when both clients have the same facts', 'warning');
    } else if(this.modifiedFactLists.length==0){
      swal('Info', 'Please select the secondary client name.', 'warning');
    }else {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      var modify_list = [];
      this.modifiedFactLists.forEach(ele => {
        if(ele.secondaryClientID){
          var req = {
            "modifiedFactID": ele.modifiedFactID,
            "changedBy": this.enteredBy,
            "changedDate": new Date().getTime(),
            "clientID": ele.clientID,
            "enteredDate": new Date().getTime(),
            "enteredBy": this.enteredBy,
            "facts": ele.facts,
            "secondaryFacts": ele.secondaryFacts,
            "isLinked": ele.isLinked,
            "isSplit": ele.isSplit,
            "secondaryClientID": ele.secondaryClientID,
          };
          modify_list.push(req);
        }else{
          return this.secondaryClientIDNull();
        }
        
      });
      this._caseTeam.save_Mdify({ 'modifiedFacts': modify_list }).then((data) => {
        loader.style.display = 'none';
        this.getClientDeatail({ 'clientID': modify_list[0].clientID, 'facts': modify_list[0].facts });
        this.viewAllReports(1, 100);
      })
    }
  };
  secondaryClientIDNull(){
    swal('Info', 'Please select the secondary client name.', 'warning');
  }
  display_modify = false;
  showReport() {
    this.display_modify = true;
  }
  modifyRecords = [];
  viewAllReports(initial, end) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var req = {
      "beginPagination": initial,
      "endPagination": end,
      "sort":{
        "column":"AMF.EnteredDate",
        "mode":"desc"
      }
    };
    this._caseTeam.all_reports_Mdify(req).then((data) => {
      this.modifyRecords = data.modifyClients;
      this.generateBreakListView();
      loader.style.display = 'none';
       this.totalCount = data.totalCount;
    });
  }
  listBreakTest = [];
  claimIDS = [];
  listViewBreakHeaders = [];
  columnBreahDefs = [];
  generateBreakListView() {
    let rawBreakData = [];
    if (this.modifyRecords.length > 0) {
      this.listViewBreakHeaders.push(Object.keys(this.modifyRecords[0]))
      this.listViewBreakHeaders[0].forEach((item: any) => {
        let data = { headerName: item, field: item }
        this.listBreakTest.push(data);
      })
      rawBreakData.push(this.listBreakTest)
      this.columnBreahDefs = rawBreakData[0];
      this.columnBreahDefs.map(data => {
        data;
        if (data.field == 'Entered Date') {
          data['valueFormatter'] = function (params) {
            if (params.value) {
              return moment(params.value).format("MM/DD/YYYY");
            } else {
              return "";
            }
          };
        }
      })
    }
  };
  getStaffDetails() {
    const staffId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(staffId) }).then(data => {
      this.enteredBy = data.users.lastName + ' ' + data.users.firstName;
    });
  }
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.viewAllReports(this.initial, this.end);
    }
  };
  linkIs = false;
  splitIs = false;
  isFactsChange(eve, i, state, modify) {
    console.log("eve>>", eve);
    console.log("i>>", i);
    console.log('modify>>', modify);
    if (modify.secondaryClientName == "") {
      swal('Info', 'Please Select the Secondary Client.', 'warning');
      delete this.modifiedFactLists[i].isLinked;
      delete this.modifiedFactLists[i].isSplit;
    } else {
      if (state == 'isLink') {
        if (eve) {
          if (modify.facts !== modify.secondaryFacts) {
            this.modifiedFactLists[i].isLinked = eve;
            this.modifiedFactLists[i].isSplit = false;
            this.linkIs = false;
            this.splitIs = false;
          } else {
            delete this.modifiedFactLists[i].isLinked;
            // this.modifiedFactLists[i].isLinked = false;
            this.modifiedFactLists[i].isSplit = false;
            this.linkIs = true;
            swal('Info', 'The Facts number should not be same for Is Linked', 'warning');
          }
        };
        console.log("this.modifiedFactLists>>", this.modifiedFactLists);
      }
      else {
        if (eve) {
          if (modify.facts === modify.secondaryFacts) {
            this.modifiedFactLists[i].isLinked = false;
            this.modifiedFactLists[i].isSplit = eve;
            this.linkIs = false;
            this.splitIs = false;
          } else {
            swal('Info', 'You can only split when both clients have the same facts', 'warning');
            delete this.modifiedFactLists[i].isSplit;
            this.modifiedFactLists[i].isLinked = false;
            // this.modifiedFactLists[i].isSplit = false;
            this.splitIs = true;
          }
        };
        console.log("this.modifiedFactLists>>", this.modifiedFactLists);
      };
    }
  };

  exportAll(){
    var req = {
      "fileName":"ModifiedFactsReport"
    };
    this._caseTeam.getExport(req).then((data) => {
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    })
  };
  personDetailData:any;
  cancelData(){
    this.personDetailData = "";
    this.modifiedFactLists = [];
  }
}
