import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reintegration',
  templateUrl: './reintegration.component.html',
  styleUrls: ['./reintegration.component.scss']
})
export class ReintegrationComponent implements OnInit {
  isOrganisationMenu = false;
  isDonationModule = false;

  constructor() { }

  ngOnInit() {}

}
