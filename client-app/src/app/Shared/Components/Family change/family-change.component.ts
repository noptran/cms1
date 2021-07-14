import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  Input,
  Output,
} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../../../pagesize/pagesize.service';
import {
  FamilyChangeProviderProfile,
  FamilyChangeWeeklyDateRange,
  FamilyChangeProviderType,
  FamilyChangeProviderTypeReason,
  FamilyChangeCurrentValues,
  FamilyChangePreferredCapacity,
  FamilyChangePreferredGender,
} from './family-change';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { isObject } from 'util';
import { MessageService } from 'primeng/api';
import * as constants from './fc-constants';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-change',
  templateUrl: './family-change.component.html',
  styleUrls: ['./family-change.component.scss'],
})
export class StaffFamilyChangeComponent implements OnInit {

  constructor(
    public _pageSize: PagesizeService,
    public _openCard: OpencardsService,
    public _msg: MessageService,
    public router: Router
  ) { }
  isPopWindow = false;
  public listOfProviderTypes = [];
  public isProviderTypeChangeForm = false;
  public isPreferredCapacityForm = false;
  public isPreferredGenderForm = false;
  public isLevelOfCareForm = false;
  public isPreferredAge = false;
  public isDayCareHours = false;
  public isProviderStatus = false;
  public isPreferredRaceForm = false;
  public listOfPreferredCapacity = [];
  public listOfPreferredGender = [];
  public listOfLevelOfCare = [];
  public listOfPreferredAge = [];
  public listOfDayCareHours = [];
  public listOfProviderStatus = [];
  public listOfPreferredRace = [];
  public listOfDailyChange = [];
  public selectedResourceWorker: any;
  public metaData = [];
  public listOfResourceWorks = [];
  public listOfWeeks = [];
  public selectedWeeks: FamilyChangeWeeklyDateRange;
  public providerGrid = [];
  public selectedProviderIDFromGrid: any;
  public selectedProviderProfile = new FamilyChangeProviderProfile();
  public isChanges = false;
  public isProviderTypeChange = false;
  public isPreferredCapacityChange = false;
  public ispreferredGenderChange = false;
  public isLevelOfCareChange = false;
  public isPreferredAgeChange = false;
  public isPreferredDayCareHoursChange = false;
  public isProviderStatusChange = false;
  public ispreferredRaceChange = false;
  public isDailyChange = false;
  public providerTypes = [];
  public providerTypeChangeReason: FamilyChangeProviderTypeReason = new FamilyChangeProviderTypeReason();
  public listOfProviderTypeChanges: FamilyChangeProviderType[] = [];
  public isProviderTypeFormPopupWinow = false;
  public changeProviderTypes = [];
  public providerTypeData: any;
  public changeReasonFormMode = 'Add';
  public changeReasonTableSelectedIndex: number;
  public staffIDWhoShouldAuth: number;
  public currentValues: any;
  public isCurrentValuesPrompt = false;
  public isCurrentValuesDisable = true;
  public providerGridNoChanges: number;
  public providerGridChanges: number;
  public isPreferredCapacityFormPopupWindow = false;
  public preferredCapactiyChangeReason: FamilyChangePreferredCapacity = new FamilyChangePreferredCapacity();
  public preferredCapcity = [];
  public isPreferredGenderFormPopupWindow = false;
  public preferredGenderList = [];
  public preferredGenderReason: FamilyChangePreferredGender = new FamilyChangePreferredGender();
  constants = constants;
  changeReasonCheckboxes = {
    isProviderType: false,
    isPreferredCapacity: false,
    isPreferredGender: false,
    isLevelOfCare: false,
    isPreferredAge: false,
    isPreferredDCH: false,
    isProviderStatus: false,
    isPreferredRace: false,
    isDailyChange: false,
  };

  selectedProviderNameFromGrid: any;
  showResourceHomeLisSpecialistView = false;

  selectedCR: any;
  crModel: any;
  crUiData = [];
  isCRPopUpVisible = false;
  selectedCRListIndex: number;
  isSaveClicked = false;
  showUnsavedPrompt = false;

  showClosePrompt = false;

  // ------------------------------------------------

  showResourceWorkerListView = false;
  showResourceSupervisorListView = false;
  isPlesWait = false;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  staffIdRW = null;
  staffIdRS = null;

  showResourceHomeListView = false;
  staffIdRH = null;
  primaryKeyStringRH = null;

  showResourceWorkerFCHListView = false;
  showWorkerListView = false;
  gridOptionsResourcWorkerList = {};
  selectedResourceWorkerFromList = null;
  selectedProviderFromList = null;
  selectedResourceSupervisorFromList = null;

  columnDefsResourceHome = [];
  columnDefsResourceSupervisor = [];
  headersResourceHome = [];
  headersResourceSupervisor = [];
  rawdataResourceHome = [];
  rawdataResourceSupervisor = [];
  rowDataResourceHome: any;
  rowDataResourceSupervisor: any;
  initialResourceHome = 1;
  endResourceHome = 100;
  initialResourceSupervisor = 1;
  endResourceSupervisor =100;
  totalCountResourceHome: any;
  totalCountResourceSupervisor: any;
  gridOptionsResourceHomeList = {};

  columnDefsChanges = [];
  headersChanges = [];
  rawdataChanges = [];
  rowDataChanges: any;
  initialChanges = 1;
  endChanges = 100;

  totalCountChanges: any;

  gridOptionsChangesList = {};

  defaultColDef: any;
  defaultColDefResourceHome: any;
  defaultColDefChanges: any;
  isResourceWorker: any;
  isFCHAdmin = false;
  isResourceSpecialist = false;
  isResourceSupervisor = false;
  fosterCare = false;

  ngOnInit() {
    this.getCurrentWeekRange();

    this.getResourceWorkers();

    this.getFamilyChangeWeeks();

    this.getProviderTypes();

    this.getAuthStaffID();

    this.preferredGenderMetaData();

    this.getStaffPosition();
  }

  // toggle() { return this.isPopWindow = !this.isPopWindow }

  async getResourceWorkers() {
    const request = {
      value: '',
      beginPagination: 1,
      endPagination: 100,
      sort: { column: 'resourceWorker', mode: 'asc' },
    };
    return (this.listOfResourceWorks = await this._openCard.getFamilyChangeResourceWorker(
      request
    ));
  }

  filterReosourceWorks(event: any) {
    return (this.metaData = this.listOfResourceWorks.filter((item: any) => {
      return item.resourceWorker.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  async getFamilyChangeWeeks() {
    const request = {
      value: '',
      beginPagination: 1,
      endPagination: 500,
      sort: {
        column: 'weeklyEndDate',
        mode: 'desc',
      },
    };
    return (this.listOfWeeks = await this._openCard.getFamilyChangeWeeks(
      request
    ));
  }

  filterWeekList(event: any) {
    return (this.metaData = this.listOfWeeks.filter((item: any) => {
      return item.weeklyDateRange.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  async onSelectWeek() {
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      staffID: this.selectedResourceWorker.staffID || 4620,
      beginPagination: 1,
      endPagination: 100,
    };
    this.providerGrid = await this._openCard.getFamilyChangeProviderGrid(
      request
    );
    this.selectedProviderIDFromGrid = this.providerGrid[0].providerID;
    this.selectedProviderNameFromGrid = this.providerGrid[0].providerName;
    this.isCurrentValuesDisable = false;
    this.getChangesAndNoChangesCount();
    this.getPreferredCapacityMetaData();
    return this.getProviderProfileInfo();
  }

  onProviderGridRowClick(provider: any) {
    const unsavedData = this.constants.constants.changeReasons.filter((item) => {
      return item.list.length != 0;
    });
    // this.listOfProviderTypeChanges = [];
    // this.listOfPreferredCapacity = [];
    // this.listOfPreferredGender = [];
    if (
      unsavedData.length == 0 &&
      this.listOfProviderTypeChanges.length == 0 &&
      this.listOfPreferredCapacity.length == 0 &&
      this.listOfPreferredGender.length == 0
    ) {
      this.selectedProviderIDFromGrid = provider.providerID;
      this.selectedProviderNameFromGrid = provider.providerName;
      this.getProviderProfileInfo();
      this.getPreferredCapacityMetaData();
      this.resetChangeReasons();
    } else {
      this.showUnsavedPrompt = true;
    }
  }

  async getProviderProfileInfo() {
    const request = {
      providerID: this.selectedProviderIDFromGrid,
    };
    const response = await this._openCard.getFamilyChangeProviderProfile(request);
    return (this.selectedProviderProfile = response[0]);
  }
  // --------------------------------------

  async onSelectCR(event: any, reasonIndex: number) {
    this.isChanges = true;
    const isChangeReasonVisible: boolean = this.constants.constants.changeReasons[
      reasonIndex
    ].isVisible;
    this.constants.constants.changeReasons[reasonIndex].isVisible = event
      ? true
      : false;
    this.constants.constants.changeReasons[reasonIndex].list = [];
    const request: { weekID: number; providerID: number } = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
    };
    const getApiResponseKey = this.constants.constants.changeReasons[reasonIndex]
      .apiList.RESPONSE_KEY;
    const getApiUrl: string = this.constants.constants.changeReasons[reasonIndex]
      .apiList.GET;
    const response = await this._openCard.postApi(request, getApiUrl);
    this.constants.constants.changeReasons[reasonIndex].list =
      response[getApiResponseKey];
    this.constants.constants.changeReasons[
      reasonIndex
    ].list = this.constants.constants.changeReasons[reasonIndex].list.map(
      (listItem) => {
        const object = { providerName: listItem.providerName };
        this.constants.constants.changeReasons[reasonIndex].popUpFields.forEach(
          (fieldItem) => {
            object[fieldItem.key] = listItem[fieldItem.key];
          }
        );
        this.constants.constants.changeReasons[
          reasonIndex
        ].getByIdKeyModifiers.forEach((keyModifier) => {
          if (keyModifier.isArrayFormat) {
            if (
              object[keyModifier.keyToBeCreated] &&
              object[keyModifier.keyToBeCreated].length > 0
            ) {
              object[keyModifier.keyToBeCreated] =
                listItem[keyModifier.keyToBeChanged][0];
            }
          } else {
            if (keyModifier.secondaryKey) {
              object[keyModifier.keyToBeCreated] = {
                [keyModifier.secondaryKey]:
                  listItem[keyModifier.keyToBeChanged],
              };
            } else {
              object[keyModifier.keyToBeCreated] =
                listItem[keyModifier.keyToBeChanged];
            }
          }
        });

        return object;
      }
    );
  }

  async onCrAdd(selectedIndex: number) {
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
    };
    this.currentValues = await this._openCard.familyChangeCurrentValues(
      request
    );
    this.constants.constants.changeReasons[
      selectedIndex
    ].isFormPopUpVisible = true;
    this.isCRPopUpVisible = true;
    this.selectedCR = this.constants.constants.changeReasons[selectedIndex];
    this.crModel = {};
    this.constants.constants.changeReasons[selectedIndex].popUpFields.forEach(
      (element) => {
        if (element.key == 'levelOfCare') {
          this.crModel[element.key] = [];
        } else {
          this.crModel[element.key] = null;
        }
      }
    );

    switch (this.constants.constants.changeReasons[selectedIndex].name) {
      case 'PREFERRED_AGE':
        let ageFlexibleLabel = 'Ages is not flexible';
        let youngestAge = 0;
        let oldestAge = 0;

        if (this.currentValues && this.currentValues['ageIsFlexible']) {
          ageFlexibleLabel = 'Ages is flexible';
        }
        if (this.currentValues && this.currentValues['youngestAge']) {
          youngestAge = this.currentValues['youngestAge'];
        }
        if (this.currentValues && this.currentValues['oldestAge']) {
          oldestAge = this.currentValues['oldestAge'];
        }
        this.crModel['status'] = 'Auto Approve';
        this.crModel[
          'currentValue'
        ] = `Youngest=${youngestAge}; Oldest=${oldestAge};${ageFlexibleLabel}`;
        break;

      case 'PREFERRED_DAY_CARE_HOURS':
        let daycareHoursRequired = 0;
        if (this.currentValues && this.currentValues['daycareHoursRequired']) {
          daycareHoursRequired = this.currentValues['daycareHoursRequired'];
        }
        this.crModel['currentValue'] = `${daycareHoursRequired}`;
        this.crModel['status'] = 'Auto Approve';
        break;

      case 'PROVIDER_STATUS':
        let providerStatusType = 'Pending';
        if (this.currentValues && this.currentValues['providerStatusType']) {
          providerStatusType = this.currentValues['providerStatusType'];
        }
        this.crModel['currentValue'] = `${providerStatusType}`;
        this.crModel['status'] = 'Pending';
        break;

      case 'LEVEL_OF_CARE':
        let levelOfCare = '';
        if (this.currentValues && this.currentValues['levelOfCare']) {
          levelOfCare = this.currentValues['levelOfCare'];
        }
        this.crModel['currentValue'] = `${levelOfCare}`;
        this.crModel['status'] = 'Auto Approve';
        break;

      case 'PREFERRED_RACE':
        let race = '';
        if (this.currentValues && this.currentValues['race']) {
          race = this.currentValues['race'];
        }
        this.crModel['currentValue'] = `${race}`;
        this.crModel['status'] = 'Auto Approve';
        break;

      case 'DAILY_CHANGE':
        this.crModel['status'] = 'Auto Approve';
        break;
    }

    this.crUiData = [];
    this.crUiData = this.constants.constants.changeReasons[
      selectedIndex
    ].popUpFields.filter((element) => {
      return element.label;
    });
  }

  getDropdownMetaData(event: any, dropdownInfo: any) {
    if (dropdownInfo.method == 'get') {
      this._openCard.getAPI(dropdownInfo.api).then((data) => {
        this.metaData = data[dropdownInfo.responseKey];
      });
    } else if (dropdownInfo.method == 'post') {
      const dropdownRequest = {};
      switch (dropdownInfo.requestType) {
        case 'providerID':
          dropdownRequest['providerID'] = this.selectedProviderIDFromGrid;
          break;
      }
      this._openCard.postApi(dropdownRequest, dropdownInfo.api).then((data) => {
        this.metaData = data[dropdownInfo.responseKey];
        if (dropdownInfo.isResponseToBeReversed) {
          this.metaData.reverse();
        }
      });
    }
  }

  onYesClosePrompt() {
    this.listOfProviderTypeChanges = [];
    this.listOfPreferredCapacity = [];
    this.listOfPreferredGender = [];
    // this.selectedResourceWorker = null;
    // this.selectedWeeks = null;
    // (this.providerGrid = []);
    this.constants.constants.changeReasons.forEach((item) => {
      item.list = [];
    });
    this.resetChangeReasons();

    this.showUnsavedPrompt = false;
    // this.isPopWindow = false;
  }

  cancelPopUp() {
    this.isCRPopUpVisible = false;

    this.isProviderTypeFormPopupWinow = false;
    this.isPreferredCapacityFormPopupWindow = false;
    this.isPreferredGenderFormPopupWindow = false;
  }

  onUnsavedPromptClose() {
    this.showUnsavedPrompt = false;
  }

  onRHPromptClose() {
    const emptyArrays = this.constants.constants.changeReasons.filter((item) => {
      return item.list.length != 0;
    });
    if (emptyArrays.length == 0) {
      this.isPopWindow = false;
    } else {
      this.showUnsavedPrompt = true;
    }
  }

  onCRModelClose() {
    this.isSaveClicked = false;
  }

  crSave(selectedCRIndex) {
    this.isCRPopUpVisible = false;
    this.isSaveClicked = true;
    if (this.changeReasonFormMode === 'Add') {
      this.crModel['staffID'] = this.selectedResourceWorker.staffID;
      this.crModel['weekID'] = this.selectedWeeks.weeklyDateID;
      this.crModel['providerID'] = this.selectedProviderIDFromGrid;
      this.crModel['providerName'] = this.selectedProviderNameFromGrid;
    }

    if (this.changeReasonFormMode === 'Add') {
      this.constants.constants.changeReasons[selectedCRIndex].list.unshift(
        this.crModel
      );
    } else if (this.changeReasonFormMode === 'Edit') {
      this.constants.constants.changeReasons[selectedCRIndex].list.splice(
        this.selectedCRListIndex,
        1,
        this.crModel
      );
    }
    this.crModel[
      'providerWeeklyChangeReasonID'
    ] = this.constants.constants.changeReasons[
      selectedCRIndex
    ].providerWeeklyChangeReasonID;

    this.changeReasonFormMode = 'Add';
  }

  filterCRForSave(CR) {
    let index = 0;
    let list = [];
    switch (CR) {
      case 'PREFERRED_AGE':
        index = 0;
        list = this.constants.constants.changeReasons[index].list;
        list.forEach((element) => {
          element.preferredAge_Youngest = element.preferredAge_Youngest
            ? element.preferredAge_Youngest.youngest
            : null;
          element.preferredAge_Oldest = element.preferredAge_Oldest
            ? element.preferredAge_Oldest.oldest
            : null;
        });
        break;
      case 'PREFERRED_DAY_CARE_HOURS':
        index = 1;
        list = this.constants.constants.changeReasons[index].list;
        list.forEach((element) => {
          element.preferredDayCareHours = element.preferredDayCareHours
            ? parseInt(element.preferredDayCareHours)
            : null;
        });
        break;
      case 'PROVIDER_STATUS':
        index = 2;
        list = this.constants.constants.changeReasons[index].list;
        list.forEach((element) => {
          element.providerStatusTypeID = element.providerStatusTypeID
            ? element.providerStatusTypeID.providerStatusTypeID
            : null;
          element.reasonOnHold = element.reasonOnHold
            ? element.reasonOnHold.reasonOnHoldID
            : null;
        });
        break;
      case 'LEVEL_OF_CARE':
        index = 3;
        list = this.constants.constants.changeReasons[index].list;
        let levelOfCareItem = '';
        list.forEach((element) => {
          element.levelOfCare.forEach((itemLevel) => {
            levelOfCareItem = levelOfCareItem + itemLevel.fchLevelOfCare + ',';
          });
          element.levelOfCare = levelOfCareItem;
        });

        break;
      case 'PREFERRED_RACE':
        index = 4;
        list = this.constants.constants.changeReasons[index].list;
        list.forEach((element) => {
          element.preferredRaceID = element.preferredRaceID
            ? element.preferredRaceID.raceID
            : null;
        });
        break;
      case 'DAILY_CHANGE':
        index = 5;
        list = this.constants.constants.changeReasons[index].list;
        list.forEach((element) => {
          element.dailyChange = element.dailyChange
            ? element.dailyChange.providerDailyChangeReasonID
            : null;
        });
        break;
    }

    return list;
  }

  onCRDelete(selectedIndex, crListIndex) {
    this.constants.constants.changeReasons[selectedIndex].list.splice(
      crListIndex,
      1
    );
  }

  onCRClickEdit(selectedIndex, crList, crListIndex) {
    this.crUiData = [];
    this.crUiData = this.constants.constants.changeReasons[
      selectedIndex
    ].popUpFields.filter((element) => {
      return element.label;
    });
    this.selectedCRListIndex = crListIndex;
    this.crModel = crList;
    this.changeReasonFormMode = 'Edit';
    this.constants.constants.changeReasons[
      selectedIndex
    ].isFormPopUpVisible = true;
    this.isCRPopUpVisible = true;
  }

  // --------------------------------------

  onSelectChangeReason(event: any, reason: number) {
    this.isChanges = true;
    switch (reason) {
      case 1:
        event
          ? (this.isProviderTypeChange = true)
          : (this.isProviderTypeChange = false);
        this.getListOfProviderTypeChanges();
        break;
      case 2:
        event
          ? (this.isPreferredCapacityChange = true)
          : (this.isPreferredCapacityChange = false);
        this.getListOfPreferredCapacity();
        break;
      case 3:
        event
          ? (this.ispreferredGenderChange = true)
          : (this.ispreferredGenderChange = false);
        this.getListOfPreferredGender();
        break;
      case 4:
        // (event) ? this.isPreferredCapacityChange = true : this.isPreferredCapacityChange = false;
        // this.getListOfPreferredCapacity();
        break;
      default:
        break;
    }
  }

  async getProviderTypes() {
    const request = {
      value: '',
      beginPagination: 1,
      endPagination: 100,
    };
    return (this.providerTypes = await this._openCard.getProviderTypes(
      request
    ));
  }

  filterProviderTypes(event: any) {
    return (this.metaData = this.providerTypes.filter((item: any) => {
      return item.providerType.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  providerTypeChangeSave() {
    const data = {
      providerWeeklyChangeReasonID: 1,
      staffID: this.selectedResourceWorker,
      providerID: this.selectedProviderIDFromGrid,
      weeklyDateID: this.selectedWeeks.weeklyDateID,
      providerType: this.providerTypeChangeReason.selectedProviderType,
      currentValue: this.providerTypeChangeReason.currentValue,
      enteredBy: '',
      enteredDate: null,
      providerWeeklyChangeID: null,
      changedBy: '',
      changedDate: null,
      staffIDWhoShouldAuth: this.staffIDWhoShouldAuth,
      status: this.providerTypeChangeReason.status,
      notes: this.providerTypeChangeReason.notes,
      eKidzUpdateSPName: '',
    };
    if (this.changeReasonFormMode === 'Add') {
      this.listOfProviderTypeChanges.unshift(data);
    } else {
      this.listOfProviderTypeChanges.splice(
        this.changeReasonTableSelectedIndex,
        1,
        data
      );
    }
    this.providerTypeChangeReason = new FamilyChangeProviderTypeReason();
    this.changeReasonFormMode = 'Add';
    return (this.isProviderTypeFormPopupWinow = false);
  }

  providerTypeChangeReset() {
    this.cancelPopUp();
    this.providerTypeChangeReason = new FamilyChangeProviderTypeReason();
  }

  async getListOfProviderTypeChanges() {
    this.listOfProviderTypeChanges = [];
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
      // weekID: 40,
      // providerID: 18658
    };
    return (this.listOfProviderTypeChanges = await this._openCard.getFamilyChangeProviderTypes(
      request
    ));
  }

  onClickEdit(
    selectedChangeReason: string,
    selectedRow: any,
    selectedIndex: number
  ) {
    this.changeReasonFormMode = 'Edit';
    this.changeReasonTableSelectedIndex = selectedIndex;
    if (selectedChangeReason === 'providerType') {
      this.providerTypeChangeReason = selectedRow;
      this.providerTypeChangeReason.selectedProviderType =
        selectedRow.providerType;
      return (this.isProviderTypeFormPopupWinow = true);
    } else if (selectedChangeReason === 'preferredCapacity') {
      return (this.isPreferredCapacityFormPopupWindow = true);
    } else if (selectedChangeReason === 'preferredGender') {
      return (this.isPreferredGenderFormPopupWindow = true);
    } else {
      return;
    }
  }

  booleanValueCheck(value) {
    // return value == "True"
    return value == true
      ? `<span style="color:green">&#10004</span>`
      : `<span style="color:red">&#10006</span>`;
  }

  async onClickAdd(selectedReason: string) {
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
    };
    this.currentValues = await this._openCard.familyChangeCurrentValues(
      request
    );
    if (selectedReason === 'providerType') {
      if (this.currentValues) {
        this.providerTypeChangeReason.currentValue = this.currentValues.providerType;
      }

      return (this.isProviderTypeFormPopupWinow = true);
    } else if (selectedReason === 'preferredCapacity') {
      if (this.currentValues) {
        this.preferredCapactiyChangeReason.currentValue = this.currentValues.capacity;
      }

      return (this.isPreferredCapacityFormPopupWindow = true);
    } else if (selectedReason === 'preferredGender') {
      if (this.currentValues) {
        this.preferredGenderReason.currentValue = this.currentValues.genderGroup;
      }

      return (this.isPreferredGenderFormPopupWindow = true);
    } else {
      return;
    }
  }

  filterProviderTypesForSave(): Promise<any[]> {
    let newProviderType: any;
    this.changeProviderTypes = [];
    return new Promise((resolve) => {
      this.listOfProviderTypeChanges.filter((item: any) => {
        newProviderType = {
          providerWeeklyChangeID: item.providerWeeklyChangeID,
          weekID: item.weeklyDateID,
          staffID: isObject(item.staffID) ? item.staffID.staffID : item.staffID,
          providerWeeklyChangeReasonID: item.providerWeeklyChangeReasonID,
          // providerID: isObject(item.providerID) ? item.providerID : item.providerID.providerID,
          providerID: this.selectedProviderIDFromGrid,
          providerTypeID: item.providerType.providerTypeID,
          currentValue: item.currentValue,
          staffIDWhoShouldAuth: item.staffIDWhoShouldAuth,
          status: item.status,
          notes: item.notes,
        };
        this.changeProviderTypes.push(newProviderType);
      });
      return resolve(this.changeProviderTypes);
    });
  }

  filterPreferredCapacityForSave() {
    let newPreferredCapacity: any,
      list = [];
    return new Promise((resolve, rejects) => {
      this.listOfPreferredCapacity.filter((item: any) => {
        newPreferredCapacity = {
          providerWeeklyChangeID: item.providerWeeklyChangeID,
          weekID: item.weeklyDateID,
          staffID: isObject(item.staffID) ? item.staffID.staffID : item.staffID,
          providerWeeklyChangeReasonID: 4,
          // providerID: isObject(item.providerID) ? item.providerID : item.providerID.providerID,
          providerID: this.selectedProviderIDFromGrid,
          preferredCapacity: item.preferredCapacity,
          currentValue: item.currentValue,
          staffIDWhoShouldAuth: parseInt(item.staffIDWhoShouldAuth),
          status: item.status,
          notes: item.notes,
        };
        list.push(newPreferredCapacity);
      });
      return resolve(list);
    });
  }

  filterPreferredGenderForSave() {
    let newPreferredGender: any,
      list = [];
    return new Promise((resolve, rejects) => {
      this.listOfPreferredGender.filter((item: any) => {
        newPreferredGender = {
          providerWeeklyChangeID: item.providerWeeklyChangeID,
          weekID: item.weekID,
          staffID: isObject(item.staffID) ? item.staffID.staffID : item.staffID,
          providerWeeklyChangeReasonID: 7,
          // providerID: isObject(item.providerID) ? item.providerID : item.providerID.providerID,
          providerID: this.selectedProviderIDFromGrid,
          preferredGenderID: item.preferredGenderID,
          currentValue: item.currentValue,
          staffIDWhoShouldAuth: item.staffIDWhoShouldAuth,
          status: item.status,
          notes: item.notes,
        };
        list.push(newPreferredGender);
      });
      return resolve(list);
    });
  }

  async onSave() {
    const request = {
      reasonList: [
        {
          isProviderType: true,
          providerTypeList: await this.filterProviderTypesForSave(),
        },
        {
          isPreferredCapacity: true,
          preferredCapacityList: await this.filterPreferredCapacityForSave(),
        },
        {
          ispreferredGender: true,
          preferredGenderList: await this.filterPreferredGenderForSave(),
        },
        {
          ispreferredAge: true,
          preferredAgeList: await this.filterCRForSave('PREFERRED_AGE'),
        },
        {
          ispreferredDCH: true,
          preferredDCHList: await this.filterCRForSave(
            'PREFERRED_DAY_CARE_HOURS'
          ),
        },
        {
          isProviderStatus: true,
          providerStatusList: await this.filterCRForSave('PROVIDER_STATUS'),
        },
        {
          isLevelOfCare: true,
          levelOfCareList: await this.filterCRForSave('LEVEL_OF_CARE'),
        },
        {
          ispreferredRace: true,
          preferredRaceList: await this.filterCRForSave('PREFERRED_RACE'),
        },
        {
          isDailyChange: true,
          dailyChangeList: await this.filterCRForSave('DAILY_CHANGE'),
        },
      ],

      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
      staffID: this.selectedResourceWorker.staffID,
    };
    const response = await this._openCard.familyChangeSave(request);
    this.completeChanges();
    this.resetChangeReasons();
    return this._msg.add({
      severity: 'success',
      summary: 'Saved!',
      detail: 'The record has been saved!',
    });
  }

  onClickDelete(changeReason: string, selectedIndex: any) {
    if (changeReason === 'providerType') {
      return this.listOfProviderTypeChanges.splice(selectedIndex, 1);
    } else if (changeReason === 'preferredCapacity') {
      return this.listOfPreferredCapacity.splice(selectedIndex, 1);
    } else {
      return;
    }
  }

  async getAuthStaffID() {
    const request = {
      staffID: parseInt(localStorage.getItem('staff_ID')),
    };
    return (this.staffIDWhoShouldAuth = await this._openCard.familyChangeAuthStaffID(
      request
    ));
  }
  onClickExit() {
    // this.isPopWindow = false;

    const unsavedData = this.constants.constants.changeReasons.filter((item) => {
      return item.list.length != 0;
    });

    if (
      unsavedData.length == 0 &&
      this.listOfProviderTypeChanges.length == 0 &&
      this.listOfPreferredCapacity.length == 0 &&
      this.listOfPreferredGender.length == 0
    ) {
      this.isPopWindow = false;
    } else {
      this.showClosePrompt = true;
    }
  }

  onUnsavedExitPromptClose() {
    this.showClosePrompt = false;
  }
  onYesCloseExitPrompt() {
    this.listOfProviderTypeChanges = [];
    this.listOfPreferredCapacity = [];
    this.listOfPreferredGender = [];
    this.constants.constants.changeReasons.forEach((item) => {
      item.list = [];
    });
    this.resetChangeReasons();

    this.showClosePrompt = false;
    this.isPopWindow = false;
  }

  async completeChanges() {
    /**Getting no changes provider id */
    let noChangeProviderList = [],
      noChangeProviderID = [];
    noChangeProviderList = this.providerGrid.filter((item: any) => {
      if (item.noChange) {
        return { providerID: item.providerID.providerID };
      }
    });
    noChangeProviderList.map((item: any) => {
      noChangeProviderID.push({ providerID: item.providerID });
    });
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      staffID: this.selectedResourceWorker.staffID,
      noChangeProviderList: noChangeProviderID,
    };
    console.log('No change provider list', noChangeProviderList);
    console.log('Complete change request', request);
    const response = await this._openCard.familyChangeCompleteChanges(request);
    console.log('complete changes response', response);
  }

  async getCurrentValues() {
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
    };
    this.currentValues = await this._openCard.familyChangeCurrentValues(
      request
    );
    this.isCurrentValuesPrompt = true;
    console.log('Current values', this.currentValues);
  }

  getChangesAndNoChangesCount() {
    this.providerGridChanges = this.providerGrid.filter((item: any) => {
      return item.change;
    }).length;
    this.providerGridNoChanges = this.providerGrid.filter((item: any) => {
      return item.noChange;
    }).length;
    return;
  }

  async getListOfPreferredCapacity() {
    this.listOfPreferredCapacity = [];
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
    };
    return (this.listOfPreferredCapacity = await this._openCard.familyChangeGetListOfPreferredCapacity(
      request
    ));
  }

  async getPreferredCapacityMetaData() {
    const request = {
      providerID: this.selectedProviderIDFromGrid,
    };
    return (this.preferredCapcity = await this._openCard.getPreferredCapcityMetaData(
      request
    ));
  }

  filterPreferredCapacity(event: any) {
    return (this.metaData = this.preferredCapcity.map((item: any) => {
      item['preferredCapacity'] = item.preferredCapacity.toString();
      return item;
    }));
  }

  preferredCapacitySave() {
    const data = {
      providerWeeklyChangeReasonID: 4,
      staffID: this.selectedResourceWorker,
      providerID: this.selectedProviderIDFromGrid,
      weeklyDateID: this.selectedWeeks.weeklyDateID,
      preferredCapacity: this.preferredCapactiyChangeReason.preferredCapacity
        .preferredCapacity,
      currentValue: this.preferredCapactiyChangeReason.currentValue,
      enteredBy: null,
      enteredDate: null,
      providerWeeklyChangeID: null,
      changedBy: null,
      changedDate: null,
      staffIDWhoShouldAuth: this.staffIDWhoShouldAuth,
      status: this.preferredCapactiyChangeReason.status,
      notes: this.preferredCapactiyChangeReason.notes,
      eKidzUpdateSPName: null,
    };
    if (this.changeReasonFormMode === 'Add') {
      this.listOfPreferredCapacity.unshift(data);
    } else {
      this.listOfPreferredCapacity.splice(
        this.changeReasonTableSelectedIndex,
        1,
        data
      );
    }
    return (this.isPreferredCapacityFormPopupWindow = false);
  }

  preferredCapacityReset() {
    this.cancelPopUp();
    return (this.preferredCapactiyChangeReason = new FamilyChangePreferredCapacity());
  }

  async getListOfPreferredGender() {
    this.listOfPreferredGender = [];
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      providerID: this.selectedProviderIDFromGrid,
    };
    return (this.listOfPreferredGender = await this._openCard.familyChangeGetPreferredGenderList(
      request
    ));
  }

  async preferredGenderMetaData() {
    return (this.preferredGenderList = await this._openCard.getPreferredGenderList());
  }

  filterPreferredGenderList(event: any) {
    return (this.metaData = this.preferredGenderList.filter((item: any) => {
      return item.genderGroup.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  preferredGenderSave() {
    const data = {
      providerWeeklyChangeID: null,
      weekID: this.selectedWeeks.weeklyDateID,
      staffID: this.selectedResourceWorker,
      providerWeeklyChangeReasonID: 7,
      providerID: this.selectedProviderIDFromGrid,
      preferredGenderID: this.preferredGenderReason.preferredGender
        .genderGroupID,
      currentValue: this.preferredGenderReason.currentValue,
      staffIDWhoShouldAuth: this.staffIDWhoShouldAuth,
      status: this.preferredGenderReason.status,
      notes: this.preferredGenderReason.notes,
      genderGroupName: this.preferredGenderReason.preferredGender.genderGroup,
      preferredGender: this.preferredGenderReason.preferredGender,
    };
    if (this.changeReasonFormMode === 'Add') {
      this.listOfPreferredGender.unshift(data);
    } else {
      this.listOfPreferredGender.splice(
        this.changeReasonTableSelectedIndex,
        1,
        data
      );
    }
    return (this.isPreferredGenderFormPopupWindow = false);
  }

  preferredGenderReset() {
    this.cancelPopUp();
    return (this.preferredGenderReason = new FamilyChangePreferredGender());
  }

  toggle() {
    if (this.isFCHAdmin) {
      this.showResourceSupervisorListView = true;
    } 
     if (this.isResourceWorker || this.isResourceSpecialist) {
      this.showResourceHomeLisSpecialistView = true;
    } 
    if (this.isResourceSupervisor || this.fosterCare || this.router.url === '/provider/dashboard') {
      this.showResourceWorkerListView = true;
    }
    
    this.getAllListView(this.initial, this.end);
    // if(this.router.url === '/reports/staff/new'){

    // }
    // else{
    //   this.getAllListView(this.initial, this.end);
    // }
  }

  closeRWPrompt() {
    this.showResourceWorkerListView = false;
  }

  closeRWFCHPrompt() {
    this.showResourceWorkerFCHListView = false;
  }

  getAllListView(initial, end) {
    this.isPlesWait = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let me_Req: any;
    me_Req = {
      staffID: parseInt(localStorage.getItem('staffIdPerson')),
      beginPagination: initial,
      endPagination: end,
    };
    if (this.router.url === '/provider/dashboard') {
      me_Req = {
        providerID:
          parseInt(localStorage.getItem('providerID')) -
          this._openCard.getHasKey(),
        beginPagination: initial,
        endPagination: end,
      };
    }

    this._openCard.getfamilychangesList(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateListView(data);
      loader.style.display = 'none';
    });
  }
  generateListView(data) {
    const rowData = [];
    const test = [];
    this.totalCount = data.totalCount;

    this.rowData = data.familychangesList;

    this.gridOptionsResourcWorkerList['getRowStyle'] = (params) => {
      console.log('params is', params);
      return { color: params.data.ForeColor };
    };
    if (this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));

      this.headers[0].map(function (result) {
        const data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, ' $1')
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a['order'] - b['order']);
      const correctData = test[0];
      // this.rawdata.push(test);
      this.rawdata.push([correctData]);
      this.columnDefs = this.rawdata[0];
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  }

  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
    }
  }

  pagesize(event) {
    if (event.target.localName == 'img') {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getAllListView(this.initial, this.end);
    }
  }

  onRowSelected(event) {
    if (this.router.url === '/provider/dashboard') {
      this.onChangesRowSelected(event);
    } else {
      this.selectedResourceWorkerFromList = event.data;
      this.staffIdRW = event.data.StaffID;
      this.showResourceHomeListView = true;
      this.resourceHomeListGetAllListView(
        this.initialResourceHome,
        this.endResourceHome
      );
  }
}
closeRSPrompt() {
  this.showResourceSupervisorListView = false;
}

onRowSelectedRS(event) {
  this.selectedResourceSupervisorFromList = event.data;
  this.staffIdRS = event.data.StaffID;
  this.showResourceWorkerFCHListView = true;
  this.resourceSupervisorListGetAllListView(
    this.initialResourceSupervisor,
    this.endResourceSupervisor
  );
}
resourceSupervisorListGetAllListView(initial, end) {
  this.isPlesWait = true;
  const loader = document.getElementById('loading-overlay') as HTMLElement;
  loader.style.display = 'block';
  const me_Req = {
    staffID: this.staffIdRS,
    beginPagination: initial,
    endPagination: end,
  };

  this._openCard.getFamilyChangeWorkerFCHAdmin(me_Req).then((data) => {
    this.isPlesWait = false;
    this.generateRSListView(data);
    loader.style.display = 'none';
  });
}
generateRSListView(data) {
  const rowData = [];
  const test = [];
  this.totalCountResourceSupervisor = data.totalCount;

  this.rowDataResourceSupervisor = data.familyChangeForWorker;
  this.gridOptionsChangesList['getRowStyle'] = (params) => {
    console.log('params is', params);
    return { color: params.data.ForeColor };
  };
  if (this.rowDataResourceSupervisor.length > 0) {
    this.headersResourceSupervisor.push(Object.keys(this.rowDataResourceSupervisor[0]));
    this.headersResourceSupervisor[0].map(function (result) {
      const data = {
        headerName: result
          .replace(/\b\w/g, (l) => l.toUpperCase())
          .replace(/([A-Z])/g, ' $1')
          .trim(),
        field: result,
      };
      test.push(data);
    });
    test.sort((a, b) => a['order'] - b['order']);
    test.pop();
    test.pop();
    test.pop();
    test.pop();
    this.rawdataResourceSupervisor.push(test);
    this.columnDefsResourceSupervisor = this.rawdataResourceSupervisor[0];
    if (this.totalCountResourceSupervisor < 100) {
      this.endResourceHome = this.totalCountResourceSupervisor;
    }
  }
}
getStaffPosition() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "staffID": parseInt(localStorage.getItem('staff_ID')),
      "beginPagination": this.initialChanges,
      "endPagination": this.endChanges,
    };
    this._openCard
      .getStaffPositionList(me_Req)
      .then((data: any) => {
        loader.style.display = "none";
        for (let i = 0; i < data.staffPositions.length; i++) {
          if (data.staffPositions[i].endDate === null) {
        if (data.staffPositions[i].personType === 'FCH Administration') {
          this.isFCHAdmin = true;
        } else if (data.staffPositions[i].personType === 'Resource Specialist') {
          this.isResourceSpecialist = true;
        } else if (data.staffPositions[i].personType === 'Resource Supervisor') {
          this.isResourceSupervisor = true;
        } else if (data.staffPositions[i].personType === 'Foster Care Supervisor') {
          this.fosterCare = true;
        } else if (data.staffPositions[i].personType === 'Resource Worker') {
          this.isResourceWorker = true;
        } else {
          
        }
      }
    }
        
      });
};

  closeRHPrompt() {
    this.showResourceHomeLisSpecialistView = false;
    this.showResourceHomeListView = false;
  }

  resourceHomeListGetAllListView(initial, end) {
    this.isPlesWait = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const me_Req = {
      StaffID: this.staffIdRW,
      beginPagination: initial,
      endPagination: end,
    };

    this._openCard.getResourceHomeListByStaffID(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateRHListView(data);
      loader.style.display = 'none';
    });
  }
  generateRHListView(data) {
    const rowData = [];
    const test = [];
    this.totalCountResourceHome = data.totalCount;

    this.rowDataResourceHome = data.resourceHomeList;
    this.gridOptionsChangesList['getRowStyle'] = (params) => {
      console.log('params is', params);
      return { color: params.data.ForeColor };
    };
    if (this.rowDataResourceHome.length > 0) {
      this.headersResourceHome.push(Object.keys(this.rowDataResourceHome[0]));
      this.headersResourceHome[0].map(function (result) {
        const data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, ' $1')
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a['order'] - b['order']);
      test.pop();
      test.pop();
      test.pop();
      test.pop();
      this.rawdataResourceHome.push(test);
      this.columnDefsResourceHome = this.rawdataResourceHome[0];
      if (this.totalCountResourceHome < 100) {
        this.endResourceHome = this.totalCountResourceHome;
      }
    }
  }

  pagesizeNavResourceHome(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initialResourceHome = begin;
      this.endResourceHome = end;
    }
  }

  pagesizeResourceHome(event) {
    if (this.isResourceWorker === true || this.isResourceSpecialist === true) {
      if (event.target.localName == 'img') {
        let begin, end;
        begin = this._pageSize.getPagesizeValues()[0];
        end = this._pageSize.getPagesizeValues()[1];
        this.initialChanges = begin;
        this.endChanges = end;
        return this.changesListGetAllListView(
          this.initialChanges,
          this.endChanges
        );
      } else {
            if (event.target.localName == 'img') {
              let begin, end;
              begin = this._pageSize.getPagesizeValues()[0];
              end = this._pageSize.getPagesizeValues()[1];
              this.initialResourceHome = begin;
              this.endResourceHome = end;
              return this.resourceHomeListGetAllListView(
               this.initialResourceHome,
               this.endResourceHome
              );
           }
         }
       }
     }

  onRHRowSelected(event) {
    if (this.isFCHAdmin === true) {
      this.onChangesRowSelected(event);
    } else {
    this.selectedProviderFromList = event.data;
    this.staffIdRH = event.data.staffID;
    this.primaryKeyStringRH = event.data.primaryKeyString;
    this.showWorkerListView = true;
    this.changesListGetAllListView(this.initialChanges, this.endChanges);
    }
  }

  closeWorkerPrompt() {
    this.showWorkerListView = false;
  }

  changesListGetAllListView(initial, end) {
    this.isPlesWait = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const me_Req = {
      staffID: this.staffIdRH,
      beginPagination: initial,
      endPagination: end,
      primaryKeyString: this.primaryKeyStringRH,
    };

    this._openCard.getFamilyChangeForWorker(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateChangesListView(data);
      loader.style.display = 'none';
    });
  }
  generateChangesListView(data) {
    const rowData = [];
    const test = [];
    this.totalCountChanges = data.totalCount;

    this.rowDataChanges = data.familyChangeForWorker;
    this.gridOptionsChangesList['getRowStyle'] = (params) => {
      console.log('params is', params);
      return { color: params.data.ForeColor };
    };
    if (this.rowDataChanges.length > 0) {
      this.headersChanges.push(Object.keys(this.rowDataChanges[0]));
      this.headersChanges[0].map(function (result) {
        const data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, ' $1')
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a['order'] - b['order']);
      test.pop();
      test.pop();
      test.pop();
      test.splice(1, 1);
      test.pop();
      this.rawdataChanges.push(test);
      this.columnDefsChanges = this.rawdataChanges[0];
      if (this.totalCountChanges < 100) {
        this.endChanges = this.totalCountChanges;
      }
    }
  }

  pagesizeNavChanges(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initialChanges = begin;
      this.endChanges = end;
    }
  }

  pagesizeChanges(event) {
    if (event.target.localName == 'img') {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initialChanges = begin;
      this.endChanges = end;
      return this.changesListGetAllListView(
        this.initialChanges,
        this.endChanges
      );
    }
  }

  onChangesRowSelected(event) {
    this.selectedWeeks = new FamilyChangeWeeklyDateRange();
    this.selectedResourceWorker = {};
    this.selectedWeeks['weeklyDateID'] = event.data.weekID;
    if (this.router.url === '/provider/dashboard') {
      this.selectedWeeks['weeklyDateID'] = event.data.WeekID;
    }
    this.selectedResourceWorker['staffID'] = event.data.StaffID;
    this.getCurrentWeekRange();
    this.onSelectWeek();
    this.isPopWindow = true;
  }

  closeFormPrompt() {
    this.isPopWindow = false;
    if (this.isFCHAdmin === false) {
    this.resetChangeReasons();
     }
  }

  async getCurrentWeekRange() {
    const request = {
      value: '',
      beginPagination: 1,
      endPagination: 500,
      sort: {
        column: 'weeklyEndDate',
        mode: 'desc',
      },
    };
    this.listOfWeeks = await this._openCard.getFamilyChangeWeeks(request);
    const weeklist = this.listOfWeeks.filter((item: any) => {
      return item.weeklyDateRange.toLowerCase().indexOf('') !== -1;
    });
    this.selectedWeeks = weeklist[0];
    this.onSelectWeek();
  }

  resetChangeReasons() {
    this.constants.constants.changeReasons.forEach((item) => {
      item.list = [];
      item.isVisible = false;
    });
    this.isProviderTypeChange = false;
    this.isPreferredCapacityChange = false;
    this.ispreferredGenderChange = false;
    this.listOfProviderTypeChanges = [];
    this.listOfPreferredCapacity = [];
    this.listOfPreferredGender = [];
    this.isChanges = false;
    this.changeReasonCheckboxes = {
      isProviderType: false,
      isPreferredCapacity: false,
      isPreferredGender: false,
      isLevelOfCare: false,
      isPreferredAge: false,
      isPreferredDCH: false,
      isProviderStatus: false,
      isPreferredRace: false,
      isDailyChange: false,
    };
    this.updateChangeCount();
  }

  async updateChangeCount() {
    const request = {
      weekID: this.selectedWeeks.weeklyDateID,
      staffID: this.selectedResourceWorker.staffID,
      beginPagination: 1,
      endPagination: 100,
    };
    this.providerGrid = await this._openCard.getFamilyChangeProviderGrid(
      request
    );
    this.getChangesAndNoChangesCount();
  }
}
