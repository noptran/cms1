import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-non-therpy-face-to-face-contact',
  templateUrl: './non-therpy-face-to-face-contact.component.html',
  styleUrls: ['./non-therpy-face-to-face-contact.component.scss']
})
export class NonTherpyFaceToFaceContactComponent implements OnInit {

  formLogInfo: any;
  isFormLog: any;

  constructor() { }

  ngOnInit() {
  }
  printForm() {
    let element = document.getElementById('form-content');
    let opt = {
      margin: 1,
      filename: 'FAMILY PRESERVATION NON-THERAPY/FACE TO FACE CONTACT.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };
  autogrow_progres(){
    let  textArea = document.getElementById("textarea_progres")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  autogrow_servicers(){
    let  textArea = document.getElementById("textarea_servicers")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_exp(){
    let  textArea = document.getElementById("autogrow_exp")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  autogrow_family(){
    let  textArea = document.getElementById("textarea_family")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_qus(){
    let  textArea = document.getElementById("textarea_qus")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_complet(){
    let  textArea = document.getElementById("autogrow_complet")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_activities(){
    let  textArea = document.getElementById("autogrow_activities")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  autogrow_appointment(){
    let  textArea = document.getElementById("autogrow_appointment")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
}
