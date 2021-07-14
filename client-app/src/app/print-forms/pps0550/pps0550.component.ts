import { Component, OnInit, Input } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { PlacementService } from '../../placement/placement.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pps0550',
  templateUrl: './pps0550.component.html',
  styleUrls: ['./pps0550.component.scss'],
  inputs: ['unusualIncidentInfo']
})
export class Pps0550Component implements OnInit {
  incident: any;

  @Input()
  // unusualIncidentInfo: any;
  unusualIncidentInfo = {
    incident: "",
    significant: "",
    unusual: "",
    sfcsUseOnly: "",
    PersonInvolvedList: "",
    data: {
      isClientNearDeath: "",
      isChildSevere: "",
      isIncidentDrawPublic: "",
      isFosterParentCriminal: "",
      isChildWithSevereInjuries: "",
      parent: "",
      clientLastName: "",
      clientFirstName: "",
      clientName: "",
      dobDate: "",
      courtCase: "",
      county: "",
      referralDate: "",
      provider: "",
      completedBy: "",
      incidentDate: ""
    }
  }
  otherMailAddress: any;

  constructor(public _router: Router, public _placement: PlacementService) { }

  ngOnInit() {
    this.incident = this.unusualIncidentInfo.incident;
    console.log("this.unusualIncidentInfo is", this.unusualIncidentInfo);
    console.log("this.incident is", this.incident);
  }

  printForm() {
    let element_pro = document.getElementById('pdf-content-print');
    let opt_pro = {
      margin: 1,
      filename: 'PPS_Form',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    };
    html2pdf().from(element_pro).set(opt_pro).save();
  }



  sendMail() {



    let element_pro = document.getElementById('pdf-content-print');
    let opt_pro = {
      margin: 1,
      filename: 'PPS_Form',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    };
    let pdf = html2pdf().from(element_pro).set(opt_pro).output('blob');

    return pdf.then((data: any) => {
      let mailFormData: FormData = new FormData();
      mailFormData.append('uploadfile', data);

      let mailAddresses = [];
      mailAddresses = [this.otherMailAddress];

      // ----------------------------------------------------------------------------------

      let emailJson = {
        "from": "no-reply@st-francis.org",
        "to": mailAddresses,
        "cc": mailAddresses,
        "bcc": mailAddresses,
        "subject": "PPS Mail",
        "content": "PPS Attachment",
        "attachment": "any",
        "fileName": "PPSAttchFile.pdf"
      }

      mailFormData.append('emailJson', JSON.stringify(emailJson));
      if (this.otherMailAddress) {
        this._placement.sendEmail(mailFormData).then(data => {

          if (data.responseStatus) {
            Swal.fire(
              'Sent!',
              'Your message has been sent.',
              'success'
            )

          } else {
            swal("Mail not sent!", "Please contact your admin!", "info");
          }
          this._router.navigate(['/reports/opencards/list/client/critical-significant-unusual-incident/view']);

        });

      }
      else {
        swal("Mail Info!", "Kindly mention other email address", "info");

      }

    })

  }

}
