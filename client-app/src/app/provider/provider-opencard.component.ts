import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-opencard',
  templateUrl: './provider-opencard.component.html',
  styleUrls: ['./provider-opencard.component.scss']
})
export class ProviderOpencardComponent implements OnInit {
  isOrganisationMenu = false;
  isDonationModule = false;

  constructor() { }

  ngOnInit() {
  }

}
