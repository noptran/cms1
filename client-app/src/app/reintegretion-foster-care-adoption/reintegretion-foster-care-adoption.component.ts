import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-reintegretion-foster-care-adoption',
  templateUrl: './reintegretion-foster-care-adoption.component.html',
  styleUrls: ['./reintegretion-foster-care-adoption.component.scss']
})
export class ReintegretionFosterCareAdoptionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  notes(){
    let  textArea = document.getElementById("notes")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  printForm() {
    let element = document.getElementById('form-content');
    let opt = {
      margin: 1,
      filename: 'REINTEGRATION FOSTER CARE ADOPTION KINSHIP HOME HEALTH AND SAFETY CHECKLIST AND APPROVAL.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };
}
