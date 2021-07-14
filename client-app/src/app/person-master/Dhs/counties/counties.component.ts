import { OnInit, Component } from "@angular/core";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { TeamFormService } from "../../../team-form/team-form.service";
import {LocalValues} from "../../../local-values";
@Component({
  selector: 'app-dhs-counties',
  templateUrl: './counties.component.html',
  styleUrls: ['./counties.component.scss']
})

export class DHSCountiesComponent implements OnInit {
  title: string;
  status: string;
  subtitle: string;
  breadcrumbs = [];
  formStatus: any;
  unassignedCounties = [];
  assignedCounties = [];
  discardTo: string;
  isCountyNewEntry = false;

  constructor(public _team: TeamFormService, public _router: Router, public _openCard: OpencardsService,public _localValues:LocalValues) {
    this.title = 'DHS Staff Counties';
    this.status = 'draft';
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'DHS Staff List', href: '/reports/dhsStaff', active: '' },
      { label: 'DHS Staff Form', href: '/reports/dhsStaff/details', active: '' },
      { label: 'DHS Staff Counties List', active: '', href: '/reports/dhsStaff/details/counties' },
      { label: 'DHS Staff Counties', active: 'active', href: '' });
    this.discardTo = '/reports/dhsStaff/details/counties';
  }

  ngOnInit() {
    this.getUnassignedCountiesList();
  }

  async getAssignedCountiesList() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = {
      "dhsStaffID": this._localValues.selectedDCFID,
      "beginPagination": 1,
      "endPagination": 100,
      "sort": {
        "column": "countyName",
        "mode": "asc"
      }
    }

    let data = await this._openCard.getDHSStaffCounty(req);

    if (data.responseStatus) {
      this.assignedCounties = data.dhsStaffCountyList;

      if (this.assignedCounties.length == 0) {
        this.isCountyNewEntry = true;
      }
      else {
        let counties = [];
        counties = this.assignedCounties.map((item) => {
          return (item.CountyID)
        });

        this.unassignedCounties = this.unassignedCounties.filter((item) => {
          return !counties.includes(item.countyID);
        });

      }
    }
    loader.style.display = 'none';


  }

  async getUnassignedCountiesList() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = {
      "beginPagination": 1,
      "endPagination": 100
    }

    let data = await this._openCard.getDhsStaffCounties(req);
    if (data.responseStatus) {
      this.unassignedCounties = data.countyList;
      loader.style.display = 'none';
      this.getAssignedCountiesList();
    }
    else {
      loader.style.display = 'none';
    }


  }

  async formAction() {
    let enteredBy = await this.getStaffName();
    let currentDate = new Date();
    let enteredDate = Date.parse(currentDate.toString());
    let dhsStaffID = parseInt(localStorage.getItem('personTypeDhsStaffid'));
    let DHSStaffCountys = this.assignedCounties.map((county) => {
      let metaData: any;
      if (this.isCountyNewEntry) {
        metaData = {
          countyID: county.countyID,
          dhsStaffID: dhsStaffID || null,
          enteredDate: enteredDate || null,
          enteredBy: enteredBy || null
        }
      }
      else {
        metaData = {
          countyID: county.countyID || county.CountyID,
          dhsStaffID: dhsStaffID || null,
          enteredDate: enteredDate || null,
          enteredBy: enteredBy || null,
          dhsStaffCountyID: county.dhsStaffCountyID || null
        }
        if (!metaData.dhsStaffCountyID) {
          delete metaData.dhsStaffCountyID;
        }

      }
      return metaData;
    });
    let request = {
      DHSStaffCountys: DHSStaffCountys
    };
    (this.isCountyNewEntry) ? this.save(request) : this.update(request);
  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._openCard.saveDhsStaffCounty(source).then((data) => {
      swal('Success', 'DHS Staff County has been saved!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/dhsStaff/details/counties']);
    });
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._openCard.updateDhsStaffCounty(source).then((data) => {
      swal('Success', 'DHS Staff County has been updated!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/dhsStaff/details/counties']);
    });
  }

  async getStaffName() {
    let staffName: string;
    if (parseInt(localStorage.getItem('UserId'))) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      await this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) })
        .then((data) => {
          staffName = `${data.users.firstName} ${data.users.lastName}`;
          loader.style.display = 'none';
        })
        .catch(() => {
          loader.style.display = 'none';
        })
    }
    return staffName;

  }

}
