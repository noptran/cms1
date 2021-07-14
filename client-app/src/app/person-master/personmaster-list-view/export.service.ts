import { Injectable } from '@angular/core';
import { ClildFormService } from "../../child-forms/child-forms.service";
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

@Injectable({
  providedIn: 'root'
})
export class ExportAllService {

  constructor(public _opencards: OpencardsService, public router: Router, public clildFormService: ClildFormService, ) { }

  getExportAll(query, userId, reportName, fileType) {
    let req = {
      query: query,
      userId: userId,
      reportName: reportName,
      fileType: fileType
    };
    let placementExportRequest = {
      "fileName": "placementExport",
      "referralID": parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey()
    }
    let currentURLCheck = this.router.url;
    if (currentURLCheck.includes('/reintegration/referral/opencard/placement/view')) {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this.clildFormService.getPlacementExportFile(placementExportRequest).then(data => {
        if (data.responseStatus === true) {
          window.open(`${data.filePath}`);
          swal('Done', "You're file has been exported successfully!", 'success');
        }
        loader.style.display = 'none';
      });
    }
    else {
      this.clildFormService.getExportFile(req).then(data => {
        console.log('data', data);
        if (data.responseStatus === true) {
          window.open('/myExports', "_blank", "width=400, height=450");
          swal('Success', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
        }
      });
    }


  };
  getExport_report_All(query, userId, reportName, fileType) {
    let req = {
      query: query,
      userId: userId,
      reportName: reportName,
      fileType: fileType
    };
    this.clildFormService.getExportFile(req).then(data => {
      console.log('data', data);
      if (data.responseStatus === true) {
        swal('Success', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
      }
    });
  };

}
