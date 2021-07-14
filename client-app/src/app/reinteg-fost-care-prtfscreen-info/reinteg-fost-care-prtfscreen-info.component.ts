import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reinteg-fost-care-prtfscreen-info',
  templateUrl: './reinteg-fost-care-prtfscreen-info.component.html',
  styleUrls: ['./reinteg-fost-care-prtfscreen-info.component.scss']
})
export class ReintegFostCarePRTFscreenInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  autogrow_currentLive(){
    let  textArea = document.getElementById("textarea-currentLive")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_timeLine(){
    let  textArea = document.getElementById("textarea_timeline")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_barriers(){
    let  textArea = document.getElementById("textarea_barriers")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_golal(){
    let  textArea = document.getElementById("textarea_goal")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_anci(){
    let  textArea = document.getElementById("textarea_anici")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  printForm() {
    let element = document.getElementById('form-content');
    let opt = {
      margin: 1,
      filename: 'REINTEGRATION FOSTER CARE PRTF SCREENING INFORMATION.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };
}
