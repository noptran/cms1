import { OnInit, Component, Output, EventEmitter, Input } from "@angular/core";
import { PersonMasterWizards } from "./person-master-wizards";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { LocalValues } from "../../local-values";
import { CaseTeamService } from "../../case-team/case-team.service";

@Component({
  selector: "person-master-wizards",
  templateUrl: "./person-master-wizards.component.html",
  styleUrls: ["./person-master-wizards.component.scss"],
  outputs: [
    "onValidation",
    "onSelection",
    "onCreate",
    "getSelectedOption",
    "onWizardClose",
  ],
  inputs: [
    "isPersonMasterWizardsOpen",
    "selectedModule",
    "isKaecsesDisable",
    "isNonContractVisible",
    "isSSNVisbile",
    "isKaecsesMandatory",
    "isComponent",
    "isAdd",
  ],
})
export class PersonMasterWizardsComponent implements OnInit {
  @Output()
  onValidation = new EventEmitter();
  onSelection = new EventEmitter();
  getSelectedOption = new EventEmitter();
  onWizardClose = new EventEmitter();

  @Input()
  isPersonMasterWizardsOpen: any;
  isKaecsesDisable = true;
  isNonContractVisible = true;
  isSSNVisbile = false;
  isKaecsesMandatory = true;
  isComponent = false;
  isAdd: any;

  wizard: PersonMasterWizards = new PersonMasterWizards();
  isPersonMasterwizardSecondOpen = false;
  selectedModule = { display: "", value: "" };
  wizard1Form: FormGroup;
  infoText = "";
  identifiedClients = [];
  selectedClient: any;
  currentURL: string;
  personTypesUrl = [
    "/reports/casaOfficer",
    "/reports/client",
    "/reports/communityMember",
    "/reports/court/service/officer",
    "/reports/crbOfficer",
    "/reports/csoStaff",
    "/reports/dcf",
    "/reports/dhhsStaff",
    "/reports/dhsStaff",
    "/reports/familyMember",
    "/reports/guardianAdl",
    "/reports/judge",
    "/reports/otherAgencyStaff",
    "/reports/providerMember",
    "/reports/staff",
    "/reports/customer-care/view",
  ];
  results = [];
  isClientCreation = false;
  Kaecses = "Kaecses";
  isKaesesRequired = true;
  navigationCreate = false;
  navigationSelect = false;

  constructor(
    public _fb: FormBuilder,
    public _router: Router,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _localValues: LocalValues,
    public _caseTeam: CaseTeamService
  ) {}

  ngOnInit() {
    this.wizard1FormValidation();
    this.moduleIdentifier();
    this.currentURL = this._router.url;
  }
  wizard1FormValidation() {
    this.wizard1Form = this._fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      kaecses: [null],
      isNonContract: [null],
      conST: [null],
      ssn: [null],
    });
    this.wizard.conST = { abbreviation: "KS", stateID: 34 };
  }

  onClickWizard1() {
    this._localValues.personInitialDetailsFromPersonMasterCreation = this.wizard;
    this.infoText = "Processing...";
    if (this.wizard1Form.valid) {
      if (this.isKaecsesMandatory) {
        if (this.wizard.kaecses) {
          this.wizard.person = this.moduleIdentifier().value;
          this._opencard
            .getPersonDublicates(this.wizard)
            .then((data: any) => {
              this.identifiedClients = data.personsWithSameFirstNameAndLastName;
              this.isPersonMasterWizardsOpen = false;
              this.isPersonMasterwizardSecondOpen = true;
              this.infoText = "";
            })
            .catch(() => {
              this.infoText =
                "Can't able to process you request, Please try again!";
            });
        } else {
          this.infoText = "Please fill the all the fields.";
        }
      } else if (!this.isKaecsesMandatory) {
        this.wizard.person = this.moduleIdentifier().value;
        this._opencard
          .getPersonDublicates(this.wizard)
          .then((data: any) => {
            this.identifiedClients = data.personsWithSameFirstNameAndLastName;
            this.isPersonMasterWizardsOpen = false;
            this.isPersonMasterwizardSecondOpen = true;
            this.infoText = "";
          })
          .catch(() => {
            this.infoText =
              "Can't able to process you request, Please try again!";
          });
      } else {
        this.infoText = "Please fill the all the fields.";
      }
    } else {
      this.infoText = "Please fill the all the fields.";
    }
  }

  moduleIdentifier() {
    switch (this._router.url) {
      case "/reports/casaOfficer":
        this.selectedModule.display = "CASA Officer";
        this.selectedModule.value = "CasaOfficer";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/reports/client":
        this.selectedModule.display = "Client";
        this.selectedModule.value = "client";
        this.isClientCreation = true;
        break;
      case "/reports/communityMember":
        this.selectedModule.display = "Community Member";
        this.selectedModule.value = "communityMember";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/reports/court/service/officer":
        this.selectedModule.display = "Court Service Officer";
        this.selectedModule.value = "CSV";
        break;
      case "/reports/crbOfficer":
        this.selectedModule.display = "CRB Officer";
        this.selectedModule.value = "RBCoordinator";
        break;
      case "/reports/csoStaff":
        this.selectedModule.display = "CSO Staff";
        this.selectedModule.value = "CSOStaff";
        break;
      case "/reports/dcf":
        this.selectedModule.display = "DCF";
        this.selectedModule.value = "SRSStaff";
        break;
      case "/reports/dhhsStaff":
        this.selectedModule.display = "DHHS Staff";
        this.selectedModule.value = "DHHSStaff";
        break;
      case "/reports/dhsStaff":
        this.selectedModule.display = "DHS Staff";
        this.selectedModule.value = "DHSStaff";
        break;
      case "/reports/familyMember":
        this.selectedModule.display = "Family Member";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        this.selectedModule.value = "FamilyMember";
        break;
      case "/reports/guardianAdl":
        this.selectedModule.display = "GAL";
        this.selectedModule.value = "GAL";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/reports/judge":
        this.selectedModule.display = "Judge";
        this.selectedModule.value = "Judge";
        break;
      case "/reports/otherAgencyStaff":
        this.selectedModule.display = "Other Agency Staff";
        this.selectedModule.value = "OtherAgencyStaff";
        break;
      case "/reports/payee/view":
        this.selectedModule.display = "Payee";
        this.selectedModule.value = "Payee";
        break;
      case "/reports/payor/view":
        this.selectedModule.display = "Payor";
        this.selectedModule.value = "Payor";
        break;
      case "/reports/providerMember":
        this.selectedModule.display = "Provider Member";
        this.selectedModule.value = "providerMember";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/reports/provider/new":
        this.selectedModule.display = "Provider Member";
        this.selectedModule.value = "providerMember";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/provider/opencard/In-home-family-members/adults/view":
        this.selectedModule.display = "Provider Member";
        this.selectedModule.value = "providerMember";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/provider/opencard/In-home-family-members/children/view":
        this.selectedModule.display = "Provider Member";
        this.selectedModule.value = "providerMember";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        this.isKaecsesMandatory = false;
        break;
      case "/reports/provider-sponser/view":
        this.selectedModule.display = "ProviderSponsor";
        this.selectedModule.value = "ProviderSponsor";
        break;
      case "/reports/staff":
        this.selectedModule.display = "Staff";
        this.selectedModule.value = "Staff";
        this.isSSNVisbile = true;
        this.isNonContractVisible = false;
        // this.isKaesesRequired=false;
        // this.wizard1Form.addControl('kaecses', new FormControl('', [null]));
        this.isKaecsesMandatory = false;
        break;
      case "/reports/customer-care/view":
        this.selectedModule.display = "CustomerCarePerson";
        this.selectedModule.value = "CustomerCarePerson";
        break;
    }
    return this.selectedModule;
  }

  onIdentifiedClientSelected(client: any) {
    this.selectedClient = client;
    localStorage.setItem("staff_ID", this.selectedClient.staffID);
    localStorage.setItem("casaOfficerID", this.selectedClient.casaOfficerID);
    localStorage.setItem("FamilyMemberID", this.selectedClient.FamilyMemberID);
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/new"
      )
    ) {
      localStorage.setItem(
        "providerID",
        client.providerID + this._opencard.getHasKey()
      );
      localStorage.setItem(
        "providerMemberId",
        client.providerMemberID + this._opencard.getHasKey()
      );
    }
    console.log(this.selectedClient);
  }

  onContinueSelection(selection: string) {
    if (
      this._router.url.includes(
        "/provider/opencard/In-home-family-members/adults/view"
      )
    ) {
      let formViewURL = this._router.url.replace("view", "new");
      // this.wizard.ssn=this.
      this.getSelectedOption.emit({
        currentSelection: selection,
        data: this.selectedClient,
        wizard: this.wizard,
      });
      if (selection === "createNew") {
        //withoutSelected Value
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/new`)
      } else {
        //withSelected value
        // this._client.storeId(this.selectedClient[`${this.selectedModule.value}ID`]);
        if (this.selectedModule.value === "providerMember") {
          localStorage.setItem(
            "providerMemberId",
            this.selectedClient[`${this.selectedModule.value}ID`] +
              this._opencard.getHasKey()
          );

          // } else {
          //   localStorage.setItem('clientId', this.selectedClient[`${this.selectedModule.value}ID`] + this._opencard.getHasKey())
          // }
        }
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/details`)
      }
      return this.onSelection.emit({
        isSelection: selection,
        wizard: this.wizard,
      });
    } else if (
      this._router.url.includes(
        "/provider/opencard/In-home-family-members/children/view"
      )
    ) {
      let formViewURL = this._router.url.replace("view", "new");
      // this.wizard.ssn=this.
      this.getSelectedOption.emit({
        currentSelection: selection,
        data: this.selectedClient,
        wizard: this.wizard,
      });
      if (selection === "createNew") {
        //withoutSelected Value
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/new`)
      } else {
        //withSelected value
        // this._client.storeId(this.selectedClient[`${this.selectedModule.value}ID`]);
        if (this.selectedModule.value === "providerMember") {
          localStorage.setItem(
            "providerMemberId",
            this.selectedClient[`${this.selectedModule.value}ID`] +
              this._opencard.getHasKey()
          );

          // } else {
          //   localStorage.setItem('clientId', this.selectedClient[`${this.selectedModule.value}ID`] + this._opencard.getHasKey())
          // }
        }
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/details`)
      }
      return this.onSelection.emit({
        isSelection: selection,
        wizard: this.wizard,
      });
    } else if (this._router.url.includes("/reports/provider/new")) {
      let formViewURL = this._router.url.replace("view", "new");
      // this.wizard.ssn=this.
      this.getSelectedOption.emit({
        currentSelection: selection,
        data: this.selectedClient,
        wizard: this.wizard,
      });
      if (selection === "createNew") {
        //withoutSelected Value
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/new`)
      } else {
        //withSelected value
        // this._client.storeId(this.selectedClient[`${this.selectedModule.value}ID`]);
        if (this.selectedModule.value === "providerMember") {
          localStorage.setItem(
            "providerMemberId",
            this.selectedClient[`${this.selectedModule.value}ID`] +
              this._opencard.getHasKey()
          );

          // } else {
          //   localStorage.setItem('clientId', this.selectedClient[`${this.selectedModule.value}ID`] + this._opencard.getHasKey())
          // }
        }
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/details`)
      }
      return this.onSelection.emit({
        isSelection: selection,
        wizard: this.wizard,
      });
    } else if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/new"
      )
    ) {
      let formViewURL = this._router.url.replace("view", "new");
      // this.wizard.ssn=this.
      this.getSelectedOption.emit({
        currentSelection: selection,
        data: this.selectedClient,
        wizard: this.wizard,
      });
      if (selection === "createNew") {
        //withoutSelected Value
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/new`)
      } else {
        //withSelected value
        // this._client.storeId(this.selectedClient[`${this.selectedModule.value}ID`]);
        if (this.selectedModule.value === "providerMember") {
          localStorage.setItem(
            "providerMemberId",
            this.selectedClient[`${this.selectedModule.value}ID`] +
              this._opencard.getHasKey()
          );

          // } else {
          //   localStorage.setItem('clientId', this.selectedClient[`${this.selectedModule.value}ID`] + this._opencard.getHasKey())
          // }
        }
        //this._router.navigateByUrl((formViewURL.includes('new')) ? formViewURL : `${this._router.url}/details`)
      }
      return this.onSelection.emit({
        isSelection: selection,
        wizard: this.wizard,
      });
    } else {
      let formViewURL = this._router.url.replace("view", "new");
      // this.wizard.ssn=this.
      this.getSelectedOption.emit({
        currentSelection: selection,
        data: this.selectedClient,
        wizard: this.wizard,
      });
      if (selection === "createNew") {
        //withoutSelected Value
        this._router.navigateByUrl(
          formViewURL.includes("new") ? formViewURL : `${this._router.url}/new`
        );
      } else {
        //withSelected value
        // this._client.storeId(this.selectedClient[`${this.selectedModule.value}ID`]);
        if (this.selectedModule.value === "providerMember") {
          localStorage.setItem(
            "providerMemberId",
            this.selectedClient[`${this.selectedModule.value}ID`] +
              this._opencard.getHasKey()
          );
        } else {
          localStorage.setItem(
            "clientId",
            this.selectedClient[`${this.selectedModule.value}ID`] +
              this._opencard.getHasKey()
          );
        }
        this._router.navigateByUrl(
          formViewURL.includes("new")
            ? formViewURL
            : `${this._router.url}/details`
        );
      }
    }
  }

  onCheckPersonMasterModules() {
    if (this.personTypesUrl.includes(this._router.url)) {
      this.isPersonMasterWizardsOpen = true;
    } else {
      this.onValidation.emit();
    }
  }

  onNonContractClientChange(event: any) {
    if (event.checked) {
      this.wizard1Form.removeControl("kaecses");
      this.isKaecsesMandatory = false;
    } else {
      this.wizard1Form.addControl(
        "kaecses",
        new FormControl("", [Validators.required])
      );
      this.isKaecsesMandatory = true;
    }
  }

  personMasterValidationWizardOut(event: any) {
    console.log("from validation wizard", event, this.wizard);
  }

  getState(event: any) {
    let req = {
      Object: "contractState",
      value: "",
    };
    this._caseTeam.getSearchList(req).then((data) => {
      this.results = data.dropDown.filter((item: any) => {
        return item.abbreviation.toLowerCase().indexOf(event.query) !== -1;
      });
    });
  }

  contractSelection(event) {
    if (event.abbreviation == "OK") {
      this.Kaecses = "Oklahoma ID";
    } else {
      this.Kaecses = "Kaecses";
    }
  }

  wizardClose() {
    this.onWizardClose.emit(this.selectedModule.display);
  }
}
