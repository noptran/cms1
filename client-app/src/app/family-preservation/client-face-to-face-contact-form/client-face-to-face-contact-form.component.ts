import { Component, OnInit } from '@angular/core';
// import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-client-face-to-face-contact-form',
  templateUrl: './client-face-to-face-contact-form.component.html',
  styleUrls: ['./client-face-to-face-contact-form.component.scss', '../family-preservation.scss']
})
export class ClientFaceToFaceContactFormComponent implements OnInit {

  editControll = false;

  constructor() { }

  ngOnInit() {
  }
  saveForm() {
    // html2pdf().from(element).set(opt).save();
  }
}
