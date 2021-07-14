import { Component, OnInit } from '@angular/core';
import { Pets } from './pets';
import { OpencardsService } from '../../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../../child-forms/child-forms.service';
import { CaseTeamService } from '../../../../case-team/case-team.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import { ProviderService } from '../../../provider.service';
import * as moment from 'moment';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  pet: Pets = new Pets();
  isEdit = false;
  breadcrumbs = [];
  isNodeOpened = false;
  metaData = [];
  listOfPets = [];
  petForm: FormGroup;
  discardTo = '/provider/opencard/In-home-family-members/pets/view';
  isAttachmentRequired = false;
  url: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _opencard: OpencardsService, public _client: ClildFormService, public _caseTeam: CaseTeamService,
    public _router: Router, public _fb: FormBuilder, public _provider: ProviderService) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
      { label: 'Pet List', href: '/provider/opencard/In-home-family-members/pets/view', active: '' },
      { label: 'Pet', active: 'active' },
    )
    if (this._router.url === '/provider/opencard/In-home-family-members/pets/detail') {
      this.isAttachmentRequired = true;
      this.getRecById();
    }
    this.formValidation();
  }

  formValidation() {
    this.petForm = this._fb.group({
      quantity: [null],
      petType: [null, Validators.compose([Validators.required])]
    })
  }

  formAction(source: any) {
    if (this.petForm.valid) {
      !isNullOrUndefined(source.petID) ? source.petID = source.petID.petID : null;
      source.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.providerPetID) ? this.update(source) : this.save(source);
    } else {
      swal('Info', 'Please fill the mandatoy fields', 'info');
    }

  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.savePet(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/provider/opencard/In-home-family-members/pets/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.updatePet(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/provider/opencard/In-home-family-members/pets/view'])
    })
  }

  editForm() {
    this.isEdit = true;
    this.petForm.enable();
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { providerPetID: this._client.getId() }
    this.req = req;
    this._provider.getPetById(req).then((data: any) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.ProviderPet.petID) ? this.pet.petID = data.ProviderPet.petID : null;
      !isNullOrUndefined(data.ProviderPet.quantity) ? this.pet.quantity = data.ProviderPet.quantity : null;
      !isNullOrUndefined(data.ProviderPet.provider) ? this.pet.providerID = data.ProviderPet.provider.providerID : null;
      !isNullOrUndefined(data.ProviderPet.provider) ? this.pet.providerPetID = data.ProviderPet.providerPetID : null;
      this.isEdit = true;
      this.petForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.ProviderPet.changedBy) ? data.ProviderPet.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.ProviderPet.changedDate) ? moment(data.ProviderPet.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.ProviderPet.enteredBy) ? data.ProviderPet.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.ProviderPet.enteredDate) ? moment(data.ProviderPet.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  getPets(event: any) {
    let req = { Object: 'pet', value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.listOfPets = data.dropDown;
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/In-home-family-members/pets/detail') {
      this.url = '/reports/attachment-document/providers/pets';
    }
    return this._router.navigate([this.url])
  }


}
