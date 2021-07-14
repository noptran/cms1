import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PrioritizedReports } from './prioritizedReports';
import { PrioritizedReportsService } from './prioritized-reports.service';
import { IMyDpOptions } from 'mydatepicker';
import { ExportService } from './export-service.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import * as moment from 'moment';
import { isObject, isNullOrUndefined } from 'util';
import { AgGridNg2 } from 'ag-grid-angular';
import { HomeService } from '../home/home.service';
import swal from 'sweetalert2';
import { PagesizeService } from '../pagesize/pagesize.service';
import { MenuItem } from 'primeng/api';
import { ReferralsService } from '../referrals/referrals.service';
import {LocalValues} from '../local-values';
import { ProviderService } from '../provider/provider.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-prioritized-reports',
  templateUrl: './prioritized-reports.component.html',
  styleUrls: ['./prioritized-reports.component.scss'],
})

export class PrioritizedReportsComponent implements OnInit {

  cities = [];

  selectedCity: any;
  selectedCities: string[] = [];
  showAll = 'Show All'
  columns;
  columnDefs = [];
  rowData = [];
  defaultColDef;
  public gridApi;
  @Input()
  Sidenav: boolean;
  allFamilyMembers = false;
  show_pre_define_filter = false;
  hideFilter4 = false;
  beginDate: any;
  resWorker: any;
  resourceSupervisor: any;
  CatchmentAreaID: any;

  @ViewChild('agGrid', {static: false}) agGrid: AgGridNg2;

  @Output() sidenavStatus = new EventEmitter();

  currentDate = moment(Date.now()).format('MM-DD-YYYY');
  report: PrioritizedReports = new PrioritizedReports();
  filtered = [];
  // source: LocalDataSource;
  hideToggle: boolean = true;
  displaying: boolean = false;
  displayingFilter: boolean = false;
  neb_displayingFilter = false;
  gridOptions;
  mgrid;
  sortColumn = null;
  sortOrder;
  showFilterError;
  fillBothFields;
  export_submenu: MenuItem[];
  isEmptyArray = [];
  isNotEmptyArray = [];
  pre_report_name: any;
  pre_report_content: string;
  regions: any;
  region: any;
  DHS_region: any;
  procodes: any;
  showAllFamilyMember = false;
  isRFCPlacements = false;
  report_name_pre: string;
  beginDate_disable = false;
  show_all_filter = false;

  date: any;

  constructor(
    public _report: PrioritizedReportsService,
    public exportService: ExportService,
    public clildFormService: ClildFormService,
    public homeService: HomeService,
    public _pageSize: PagesizeService,
    public _referral: ReferralsService,
    public _localValues: LocalValues,
    public finance_report: ProviderService,
    public _router: Router,
    public http: HttpClient
  ) {
    this.dropDHSregion();
    this.getAllProcodes();
    this.exportService = exportService;
    this.defaultColDef = {
      width: 100,
      // headerCheckboxSelection: this.isFirstColumn,
      // checkboxSelection: this.isFirstColumn
    };
  }
  objectKeys = Object.keys;
  optionSelected = null;
  hide = false;
  showFilterMenu = false;
  showReportMenu = false;
  showReportsView = false;
  mainMenuList = [];
  menuTypeList = [];
  columnList = [];
  selectedItems = [];
  columnNameList = [];
  navigationIsOn: boolean = false;
  settings = {
    actions: false,
    pager: {},
    selectMode: '',
    custom: [],
    columns: [],
  };
  selectedRows = [];
  reportsMenuId = {};
  reportsList = [];
  internalReportsList = [];
  reportsViewList = [];
  column;
  datas = [];
  hideTable: any = true;
  hideFilters = true;
  hideMore = false;
  hideFilter1 = true;
  hideFilter2 = true;
  data;
  tlpData;
  dataTLP;
  endDate;
  startDate;
  selectedCategory = {};
  tables = {};
  spName;
  totalCount;
  noOfRecord: any = 100;
  hideLoader: boolean = true;
  filters1: boolean = false;
  filters2: boolean = false;
  filters3: boolean = false;
  public isCollapsed: boolean = false;
  clicked_button: boolean = false;
  hideFilter3 = true;
  filterList: any[];
  filterList2: any[];
  filterList3: any[];
  filter1List = {};
  filter2List = {};
  filter3List = {};
  filter4List;
  filterList4 = [];
  filtersListContract = [];
  filtersListNonContract = [];
  hideLayer = false;
  clicked_button2: boolean = false;
  clicked_button3: boolean = false;
  clicked_button4: boolean = false;
  clicked_button5: boolean = false;
  clicked_button6: boolean = false;
  spNameGenerate;
  clicked_button7: boolean = false;
  hideLoaderText: boolean = true;
  tlpDataHeader;
  tlpReport: boolean = false;
  hideGroupByFilter: boolean = true;
  groupBy = [];
  groupedData = {};
  tableArray = [];
  showGroupByTable: boolean = false;
  firstFiltered: string;
  secondFiltered: string;
  tlpspNameArrayCode;
  SPName;
  dashBoardBtnController: boolean = false
  headers = [];
  rawdata = [];
  tempPage: any;
  exportall: any;
  dropdownList = [];
  paginationColumnFilter: any = [];
  tlpNameData: any = '';
  columnDropdownList: any = [];
  sortcolumnDropdownList = [];
  newArray = [];
  originalArray = [];
  displayFilter2 = [];
  originalArrayNonString = [];
  displayFilter2NonString = [];
  greaterThanArray = [];
  displayGreaterThan = [];
  lesserThanArray = [];
  displayLesserThan = [];
  containsArray = [];
  displayContains = [];
  greaterThanOrEqualsArray = [];
  displaygreaterThanOrEqualsArray = [];
  lessThanOrEqualsArray = [];
  displaylessThanOrEqualsArray = [];
  notBetweenArray = [];
  displayNotBetweenArray = [];
  fileNameComplete;

  filterQuery: string;

  selectedDataToFilter = [];

  columnData = [];

  filterColumnSelected = null;

  filterOption = 'OR';
  filterConditionOption = 'Equals';

  tempArray = [];
  tempConditionArray = [];
  onFilterSelected: any;
  tempSelectedDataToFilter = [];
  tempFilterColumnSelected = '';
  tempFilterConditionOption = '';
  displayFilter = [];
  duplicateTempArray = [];
  numericColumns = [];
  numericHeaders = []
  mock_data = [
    {
      "column": "date",
      "datatype": "Timestamp"
    },
    {
      "column": "FCHOffice",
      "datatype": "varchar2"
    },
    {
      "column": "Age",
      "datatype": "Number"
    }
  ]
  userRightCombinations = []
  emptyStateController = false;

  ReportSubSettings = {
    singleSelection: false,
    text: "Select",
    selectAllText: 'Select All ',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
  };

  parentReport;
  condition: any = [{
    view: 'AND', value: 'OR',
  }
  ]

  option: any = [{
    label: 'Between', value: 'Between'
  },
  {
    label: 'Equals', value: 'Equals'
  },
  {
    label: 'Greater than', value: 'Greater than'
  },
  {
    label: 'Lesser than', value: 'Lesser than'
  },
  {
    label: 'Contains', value: 'Contains'
  },
  {
    label: 'Greater than or Equals', value: 'Greater than or Equals'
  },
  {
    label: 'Less than or Equals', value: 'Less than or Equals'
  },
  {
    label: 'Not Between', value: 'notBetween'
  },
  {
    label: 'Is Empty', value: 'isEmpty'
  },
  {
    label: 'Is Not Empty', value: 'isNotEmpty'
  },
  ]

  optionForText = [
    {
      label: 'Equals', value: 'Equals'
    },
    {
      label: 'Contains', value: 'Contains'
    },
    {
      label: 'Is Empty', value: 'isEmpty'
    },
    {
      label: 'Is Not Empty', value: 'isNotEmpty'
    },
  ]

  optionFiltered = [];


  startNumber: null;
  endNumber: null;
  startingDate: null;
  endingDate: null;

  NumberToFilter: null;
  DateToFilter: null;
  StringToFilter: String;
  FilterName: String;
  showSave: boolean = false;
  saveFilter;
  favouriteFilters = [];
  saveFilterId = null;
  filterIdToDelete = null;
  filterList2Temp = [];
  fileName;
  initial = 1;
  end = 100;
  displayIsEmptyArray = [];
  displayIsNotEmptyArray = [];
  showOpenFilter = false;


  res;
  predefinedreportsList = [];

  firstLayer: boolean = false;
  paginationHide: boolean = true;
  main = localStorage.getItem('Reports')

  filterReport = [];
  filterlevel4: any;

  hideFilterLayer4 = false
  tlpQuery;
  title = "Predefined Reports";
  groupingItems = [];

  collectionOfAnd = [];
  collectionOfOR = [];
  queryStringAND: any;
  queryStringOR: any;
  finalQueryString: any;
  groupingRequest: any;
  advanceFiltersTotal = [];
  tempAdvanceFiltr = [];
  collectionOfEquals = [];
  collectionOfContains = [];
  collectionOfGreaterthan = [];
  collectionOfGreaterthanEqual = [];
  collectionOfIsEmpty = [];
  collectionOfIsNotEmpty = [];
  collectionOfLessthan = [];
  collectionOfLessthanEqual = [];
  collectionOfBetween = [];
  collectionOfNotBetween = [];
  filterStr: any;
  defaultGroupingCondition = 'and';
  expectedQuery: any;

  public startDateOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy'
  };
  public endDateOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy'
  };
  animatePopOverShow() {
    let popover = document.getElementsByClassName('filter-popover')[0];
    popover.classList.remove('slide-out');
    popover.classList.add('slide-in');
  }
  animatePopOverHidden() {
    let popover = document.getElementsByClassName('filter-popover')[0];
    popover.classList.add('slide-out');
  }
  // onSearch(query: string = '') {
  //   this.source.setFilter([
  //     {
  //       field: 'Age',
  //       search: query`  
  //     },
  //   ], false);
  // }
  userId: any = localStorage.getItem('UserId');
  // userId = '5129'
  fpReports = []
  sortList = [
    { name: 'asc' },
    { name: 'desc' },
    { name: 'no sort' }
  ];

  reportGenerated: boolean = false;
  fillField;
  sortingEnable = false;
  filter4: any
  isOperator = false;
  currentOpertaor: any;
  isGrouping = false;
  selectedType: any;
  groupTypes = [{ label: 'AND', value: 'and' }, { label: 'OR', value: 'or' }];
  advanceFilterData: any;

  ngOnInit() {
    this.getPriorityMenu();
    this._report.currentspName.subscribe(spName => this.spName = spName)
    this.selectedCategory = "Categories";
    if (localStorage.getItem("data")) {
      this.optionSelected.label = localStorage.getItem("data");
      this.onOptionSelected();
      localStorage.removeItem('data');
    };
    this.beginDate = this._localValues.beginDateOfPreviousMonth;
    this.endDate = this._localValues.endDateOfPreviousMonth;
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.getResourceWorker();
    this.getSuperVisor();
    this.getCatchMentArea();
    this.getCountys();
    this.getFchLevels();
    this.getSFAOffice();
  }

  openFilter() {
    this.displayingFilter = true;
  }

  SortChanged(sortOrder: any) {
    this.sortingEnable = true;
    this.sortOrder = sortOrder;
    if (this.sortColumn !== null && this.sortColumn !== undefined && this.sortOrder !== null) {
      if (this.sortOrder !== 'no sort') {
        if (this.tlpDataHeader) {
          // let tlpData = {
          //   "filterHeader": this.tlpDataHeader,
          //   "filter": this.tlpNameData,
          //   "beginDate": this._localValues.beginDateOfCurrentMonth,
          //   "endDate": moment(new Date()).format('YYYY-MM-DD'),
          //   "action": 'NaN',
          //   "beginPagination": '1',
          //   "endPagination": '100',
          //   "sort": {
          //     "column": this.sortColumn,
          //     "mode": this.sortOrder.name
          //   }
          // }
          /**
 * Need to replace tlpData by this,tlpData
 */
          // this.tlpData = tlpData;
          this.tlpData.sort = {
            "column": this.sortColumn,
            "mode": this.sortOrder
          }
          this.SortgetReportsByFilterTLP(this.tlpData);
        } else {
          this.data.sort = {
            "column": this.sortColumn,
            "mode": this.sortOrder
          }
          this.SortgetReportsByFilter(this.data);
        }
      } else if (this.sortOrder == 'no sort') {
        this.sortColumn = null;
        if (this.tlpDataHeader) {
          delete this.tlpData['sort'];
          this.removeSortFromTLP(this.tlpData);
        } else {
          delete this.data['sort'];
          this.removeSort(this.data);
        }

      }
    }
  }

  remove(value, ind, display, array) {
    this.advanceFiltersTotal.splice(ind, 1);
  }

  removeEmpty(ind, display, array) {
    display.splice(ind, 1);
    array.splice(ind, 1);
    if (this.displayFilter2.length <= 0 && this.displayFilter2NonString.length <= 0 && this.displayGreaterThan.length <= 0 &&
      this.displayLesserThan.length <= 0 && this.displayContains.length <= 0 && this.displaygreaterThanOrEqualsArray.length <= 0 &&
      this.displaylessThanOrEqualsArray.length <= 0 && this.displayNotBetweenArray.length <= 0 && this.displayIsEmptyArray.length <= 0 &&
      this.displayIsNotEmptyArray.length <= 0) {
      this.reset();
      this.showSave = false;
    }
  }

  display(array, display, ) {
    let conditionTemp = '';
    if (array.length > 0) {
      array.map(item => {
        if (display.length > 0) {
          let dis = [];
          display.map(str => {
            dis.push(JSON.stringify(str));
          })
          item.filter.map(filt => {
            if (dis.indexOf(JSON.stringify({ column: item.column, value: filt })) == -1) {
              display.push({ column: item.column, value: filt })
            }
          })
        } else {
          item.filter.map(data => {
            display.push({ column: item.column, value: data })
          })
        }
      })
    }
  }

  displayForEmpty(array, display) {
    let dis = [];
    if (display.length > 0) {
      display.map(str => {
        dis.push(JSON.stringify(str));
      })
    }
    if (array.length > 0) {
      array.map(data => {
        if (dis.indexOf(JSON.stringify({ column: data.column })) == -1) {
          display.push({ column: data.column })
        }
      })
    }
  }

  applyFilter() {
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement


    // let tlpData = {
    //   "filterHeader": this.tlpDataHeader,
    //   "filter": this.tlpNameData,
    //   "beginDate": this._localValues.beginDateOfCurrentMonth,
    //   "endDate": moment(new Date()).format('YYYY-MM-DD'),
    //   "action": 'NaN',
    //   "beginPagination": '1',
    //   "endPagination": '100',
    // }
    /**
     * Need to replace tlpData by this,tlpData
     */
    // this.tlpData = tlpData;

    let filterArray = [];
    this.originalArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push({ value: data })
      })
      if (val.length > 0) {
        filterArray.push({ column: item.column, filter: val })
      }
    })

    let filterArrayNonString = [];
    this.originalArrayNonString.map(item => {
      let val = [];
      item.filter.map(data => {
        let arr = data.split('and');

        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') })
        })
      })
      if (val.length > 0) {
        filterArrayNonString.push({ column: item.column, filter: val })
      }
    })

    let filterNotBetweenArray = [];
    this.notBetweenArray.map(item => {
      let val = [];
      item.filter.map(data => {
        let arr = data.split('and');
        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') })
        })
      })
      if (val.length > 0) {
        filterNotBetweenArray.push({ column: item.column, filter: val })
      }
    })


    let filtergreaterThanArray = [];
    this.greaterThanArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filtergreaterThanArray.push({ column: item.column, value: val })
      }
    })

    let filterlesserThanArray = [];
    this.lesserThanArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterlesserThanArray.push({ column: item.column, value: val })
      }
    })

    let filterArrayContains = [];
    this.containsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterArrayContains.push({ column: item.column, value: val })
      }
    })


    let filtergreaterThanorEqualsArray = [];
    this.greaterThanOrEqualsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filtergreaterThanorEqualsArray.push({ column: item.column, value: val })
      }
    })

    let filterlessThanorEqualsArray = [];
    this.lessThanOrEqualsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterlessThanorEqualsArray.push({ column: item.column, value: val })
      }
    })

    let filterIsEmptyArray = [];
    this.isEmptyArray.map(item => {
      filterIsEmptyArray.push({ column: item.column })
    })

    let filterIsNotEmptyArray = [];
    this.isNotEmptyArray.map(item => {
      filterIsNotEmptyArray.push({ column: item.column })
    })

    let conditionArray = [];
    if (filterArrayNonString.length > 0) {
      this.tlpData ? this.tlpData['between'] = filterArrayNonString : null;
      this.data['between'] = filterArrayNonString;
      conditionArray.push('between');
    } else {
      delete this.data['between'];
      this.tlpData ? delete this.tlpData['between'] : null;
    }

    if (filterArray.length > 0) {
      this.tlpData ? this.tlpData['equals'] = filterArray : null;
      this.data['equals'] = filterArray;
      conditionArray.push('equals');
    } else {
      delete this.data['equals'];
      this.tlpData ? delete this.tlpData['equals'] : null;
    }

    if (filterArrayContains.length > 0) {
      this.tlpData ? this.tlpData['contains'] = filterArrayContains : null;
      this.data['contains'] = filterArrayContains;
      conditionArray.push('contains');
    } else {
      delete this.data['contains'];
      this.tlpData ? delete this.tlpData['contains'] : null;
    }

    if (filtergreaterThanArray.length > 0) {
      this.tlpData ? this.tlpData['greaterThan'] = filtergreaterThanArray : null;
      this.data['greaterThan'] = filtergreaterThanArray;
      conditionArray.push('greaterThan');
    } else {
      delete this.data['greaterThan'];
      this.tlpData ? delete this.tlpData['greaterThan'] : null;
    }

    if (filterlesserThanArray.length > 0) {
      this.tlpData ? this.tlpData['lessThan'] = filterlesserThanArray : null;
      this.data['lessThan'] = filterlesserThanArray;
      conditionArray.push('lessThan');
    } else {
      delete this.data['lessThan'];
      this.tlpData ? delete this.tlpData['lessThan'] : null;
    }

    if (filtergreaterThanorEqualsArray.length > 0) {
      this.tlpData ? this.tlpData['greaterThanOrEquals'] = filtergreaterThanorEqualsArray : null;
      this.data['greaterThanOrEquals'] = filtergreaterThanorEqualsArray;
      conditionArray.push('greaterThanOrEquals');
    } else {
      delete this.data['greaterThanOrEquals'];
      this.tlpData ? delete this.tlpData['greaterThanOrEquals'] : null;
    }

    if (filterlessThanorEqualsArray.length > 0) {
      this.tlpData ? this.tlpData['lessThanOrEquals'] = filterlessThanorEqualsArray : null;
      this.data['lessThanOrEquals'] = filterlessThanorEqualsArray;
      conditionArray.push('lessThanOrEquals');
    } else {
      delete this.data['lessThanOrEquals'];
      this.tlpData ? delete this.tlpData['lessThanOrEquals'] : null;
    }

    if (filterNotBetweenArray.length > 0) {
      this.tlpData ? this.tlpData['notBetween'] = filterNotBetweenArray : null;
      this.data['notBetween'] = filterNotBetweenArray;
      conditionArray.push('notBetween');
    } else {
      delete this.data['notBetween'];
      this.tlpData ? delete this.tlpData['notBetween'] : null;
    }

    if (filterIsEmptyArray.length > 0) {
      this.tlpData ? this.tlpData['isEmpty'] = filterIsEmptyArray : null;
      this.data['isEmpty'] = filterIsEmptyArray;
      conditionArray.push('isEmpty');
    } else {
      delete this.data['isEmpty'];
      this.tlpData ? delete this.tlpData['isEmpty'] : null;
    }

    if (filterIsNotEmptyArray.length > 0) {
      this.tlpData ? this.tlpData['isNotEmpty'] = filterIsNotEmptyArray : null;
      this.data['isNotEmpty'] = filterIsNotEmptyArray;
      conditionArray.push('isNotEmpty');
    } else {
      delete this.data['isNotEmpty'];
      this.tlpData ? delete this.tlpData['isNotEmpty'] : null;
    }

    this.data['paginationFilter'] = true;
    this.tlpData ? this.tlpData['paginationFilter'] = true : null;
    this.data['beginPagination'] = 1;
    this.data['endPagination'] = 100;

    if (conditionArray.length > 1) {
      this.data['paginationFilters'] = conditionArray;
      this.tlpData ? this.tlpData['paginationFilters'] = conditionArray : null;
    } else {
      delete this.data['paginationFilters'];
      this.tlpData ? delete this.tlpData['paginationFilters'] : null;
    }

    // if (filterArray.length <= 0 && filterArrayNonString.length <= 0 && filterArrayContains.length <= 0 && filterNotBetweenArray.length <= 0 &&
    //   filterlessThanorEqualsArray.length <= 0 && filtergreaterThanorEqualsArray.length <= 0 &&
    //   filterlesserThanArray.length <= 0 && filtergreaterThanArray.length <= 0 && filterIsEmptyArray.length <= 0 &&
    //   filterIsNotEmptyArray.length <= 0) {
    //   this.showFilterError = true;
    //   setTimeout(() => {
    //     this.showFilterError = false;
    //   }, 2000);
    // } else {
    this.collectionOfEquals.length > 0 ? this.data['equals'] = this.collectionOfEquals : null;
    this.collectionOfBetween.length > 0 ? this.data['between'] = this.collectionOfBetween : null;
    this.collectionOfContains.length > 0 ? this.data['contains'] = this.collectionOfContains : null;
    this.collectionOfGreaterthan.length > 0 ? this.data['greaterThan'] = this.collectionOfGreaterthan : null;
    this.collectionOfGreaterthanEqual.length > 0 ? this.data['greaterThanOrEquals'] = this.collectionOfGreaterthanEqual : null;
    this.collectionOfLessthan.length > 0 ? this.data['lesserThan'] = this.collectionOfLessthan : null;
    this.collectionOfLessthanEqual.length > 0 ? this.data['lesserThanOrEquals'] = this.collectionOfLessthan : null;
    this.collectionOfNotBetween.length > 0 ? this.data['notBetween'] = this.collectionOfNotBetween : null;
    this.collectionOfIsEmpty.length > 0 ? this.data['isEmpty'] = this.collectionOfIsEmpty : null;
    this.collectionOfIsNotEmpty.length > 0 ? this.data['isNotEmpty'] = this.collectionOfIsNotEmpty : null;
    if (this.tlpNameData == '') {
      this.data['paginationFilter'] = true;
      this.saveFilter = this.data;
      this.FiltergetReportsByFilter(this.data);
    } else {
      this.saveFilter = this.tlpData;
      /**
   * Need to replace tlpData by this,tlpData
   */
      // this.tlpData = tlpData;
      this.FiltergetReportsByFilterTLP(this.tlpData);
      // }
    }


    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);

    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;
    dateFilter.style.display = 'none'
    textFilter.style.display = 'none'
    intFilter.style.display = 'none'
    singleIntFilter.style.display = 'none'
    singledateFilter.style.display = 'none'
    singleStringFilter.style.display = 'inline-block'
    this.filterColumnSelected = null;
    this.selectedDataToFilter = [];
    this.tempSelectedDataToFilter = [];
  }

  applyFilterWithoutAPICall() {
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement


    // let tlpData = {
    //   "filterHeader": this.tlpDataHeader,
    //   "filter": this.tlpNameData,
    //   "beginDate": this._localValues.beginDateOfCurrentMonth,
    //   "endDate": moment(new Date()).format('YYYY-MM-DD'),
    //   "action": 'NaN',
    //   "beginPagination": '1',
    //   "endPagination": '100',
    // }
    /**
     * Need to replace tlpData by this,tlpData
     */
    // this.tlpData = tlpData;

    let filterArray = [];
    this.originalArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push({ value: data })
      })
      if (val.length > 0) {
        filterArray.push({ column: item.column, filter: val })
      }
    })

    let filterArrayNonString = [];
    this.originalArrayNonString.map(item => {
      let val = [];
      item.filter.map(data => {
        let arr = data.split('and');

        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') })
        })
      })
      if (val.length > 0) {
        filterArrayNonString.push({ column: item.column, filter: val })
      }
    })

    let filterNotBetweenArray = [];
    this.notBetweenArray.map(item => {
      let val = [];
      item.filter.map(data => {
        let arr = data.split('and');
        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') })
        })
      })
      if (val.length > 0) {
        filterNotBetweenArray.push({ column: item.column, filter: val })
      }
    })


    let filtergreaterThanArray = [];
    this.greaterThanArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filtergreaterThanArray.push({ column: item.column, value: val })
      }
    })

    let filterlesserThanArray = [];
    this.lesserThanArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterlesserThanArray.push({ column: item.column, value: val })
      }
    })

    let filterArrayContains = [];
    this.containsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterArrayContains.push({ column: item.column, value: val })
      }
    })


    let filtergreaterThanorEqualsArray = [];
    this.greaterThanOrEqualsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filtergreaterThanorEqualsArray.push({ column: item.column, value: val })
      }
    })

    let filterlessThanorEqualsArray = [];
    this.lessThanOrEqualsArray.map(item => {
      let val = [];
      item.filter.map(data => {
        val.push(data)
      })
      if (val.length > 0) {
        filterlessThanorEqualsArray.push({ column: item.column, value: val })
      }
    })

    let filterIsEmptyArray = [];
    this.isEmptyArray.map(item => {
      filterIsEmptyArray.push({ column: item.column })
    })

    let filterIsNotEmptyArray = [];
    this.isNotEmptyArray.map(item => {
      filterIsNotEmptyArray.push({ column: item.column })
    })

    let conditionArray = [];
    if (filterArrayNonString.length > 0) {
      this.tlpData ? this.tlpData['between'] = filterArrayNonString : null;
      this.data['between'] = filterArrayNonString;
      conditionArray.push('between');
    } else {
      delete this.data['between'];
      this.tlpData ? delete this.tlpData['between'] : null;
    }

    if (filterArray.length > 0) {
      this.tlpData ? this.tlpData['equals'] = filterArray : null;
      this.data['equals'] = filterArray;
      conditionArray.push('equals');
    } else {
      delete this.data['equals'];
      this.tlpData ? delete this.tlpData['equals'] : null;
    }

    if (filterArrayContains.length > 0) {
      this.tlpData ? this.tlpData['contains'] = filterArrayContains : null;
      this.data['contains'] = filterArrayContains;
      conditionArray.push('contains');
    } else {
      delete this.data['contains'];
      this.tlpData ? delete this.tlpData['contains'] : null;
    }

    if (filtergreaterThanArray.length > 0) {
      this.tlpData ? this.tlpData['greaterThan'] = filtergreaterThanArray : null;
      this.data['greaterThan'] = filtergreaterThanArray;
      conditionArray.push('greaterThan');
    } else {
      delete this.data['greaterThan'];
      this.tlpData ? delete this.tlpData['greaterThan'] : null;
    }

    if (filterlesserThanArray.length > 0) {
      this.tlpData ? this.tlpData['lessThan'] = filterlesserThanArray : null;
      this.data['lessThan'] = filterlesserThanArray;
      conditionArray.push('lessThan');
    } else {
      delete this.data['lessThan'];
      this.tlpData ? delete this.tlpData['lessThan'] : null;
    }

    if (filtergreaterThanorEqualsArray.length > 0) {
      this.tlpData ? this.tlpData['greaterThanOrEquals'] = filtergreaterThanorEqualsArray : null;
      this.data['greaterThanOrEquals'] = filtergreaterThanorEqualsArray;
      conditionArray.push('greaterThanOrEquals');
    } else {
      delete this.data['greaterThanOrEquals'];
      this.tlpData ? delete this.tlpData['greaterThanOrEquals'] : null;
    }

    if (filterlessThanorEqualsArray.length > 0) {
      this.tlpData ? this.tlpData['lessThanOrEquals'] = filterlessThanorEqualsArray : null;
      this.data['lessThanOrEquals'] = filterlessThanorEqualsArray;
      conditionArray.push('lessThanOrEquals');
    } else {
      delete this.data['lessThanOrEquals'];
      this.tlpData ? delete this.tlpData['lessThanOrEquals'] : null;
    }

    if (filterNotBetweenArray.length > 0) {
      this.tlpData ? this.tlpData['notBetween'] = filterNotBetweenArray : null;
      this.data['notBetween'] = filterNotBetweenArray;
      conditionArray.push('notBetween');
    } else {
      delete this.data['notBetween'];
      this.tlpData ? delete this.tlpData['notBetween'] : null;
    }

    if (filterIsEmptyArray.length > 0) {
      this.tlpData ? this.tlpData['isEmpty'] = filterIsEmptyArray : null;
      this.data['isEmpty'] = filterIsEmptyArray;
      conditionArray.push('isEmpty');
    } else {
      delete this.data['isEmpty'];
      this.tlpData ? delete this.tlpData['isEmpty'] : null;
    }

    if (filterIsNotEmptyArray.length > 0) {
      this.tlpData ? this.tlpData['isNotEmpty'] = filterIsNotEmptyArray : null;
      this.data['isNotEmpty'] = filterIsNotEmptyArray;
      conditionArray.push('isNotEmpty');
    } else {
      delete this.data['isNotEmpty'];
      this.tlpData ? delete this.tlpData['isNotEmpty'] : null;
    }

    this.data['paginationFilter'] = true;
    this.tlpData ? this.tlpData['paginationFilter'] = true : null;
    this.data['beginPagination'] = 1;
    this.data['endPagination'] = 100;

    if (conditionArray.length > 1) {
      this.data['paginationFilters'] = conditionArray;
      this.tlpData ? this.tlpData['paginationFilters'] = conditionArray : null;
    } else {
      delete this.data['paginationFilters'];
      this.tlpData ? delete this.tlpData['paginationFilters'] : null;
    }

    if (filterArray.length <= 0 && filterArrayNonString.length <= 0 && filterArrayContains.length <= 0 && filterNotBetweenArray.length <= 0 &&
      filterlessThanorEqualsArray.length <= 0 && filtergreaterThanorEqualsArray.length <= 0 &&
      filterlesserThanArray.length <= 0 && filtergreaterThanArray.length <= 0 && filterIsEmptyArray.length <= 0 &&
      filterIsNotEmptyArray.length <= 0) {
      this.showFilterError = true;
      setTimeout(() => {
        this.showFilterError = false;
      }, 2000);
    } else {
      if (this.tlpNameData == '') {
        this.data['paginationFilter'] = true;
        this.saveFilter = this.data;
        return this.advanceFilterData = this.data;
      } else {
        this.saveFilter = this.tlpData;
        /**
     * Need to replace tlpData by this,tlpData
     */
        // this.tlpData = tlpData;
        return this.advanceFilterData = this.data;
      }
    }


    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);

    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;
    dateFilter.style.display = 'none'
    textFilter.style.display = 'none'
    intFilter.style.display = 'none'
    singleIntFilter.style.display = 'none'
    singledateFilter.style.display = 'none'
    singleStringFilter.style.display = 'inline-block'
    this.filterColumnSelected = null;
    this.selectedDataToFilter = [];
    this.tempSelectedDataToFilter = [];
  }


  onColumnFilterSelected(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement

    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === event) {
        return checkColumn = result.DATA_TYPE
      }
    })

    if (checkColumn == 'int' || checkColumn == 'datetime' || checkColumn == 'Integer' || checkColumn == 'decimal') {
      this.optionFiltered = this.option;
    } else {
      this.optionFiltered = this.optionForText;
    }

    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block'
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
      }
    } else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block'
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    }

    this.selectedDataToFilter = [];
    this.tempFilterColumnSelected = this.filterColumnSelected;
    this.tempFilterConditionOption = this.filterConditionOption;
    let tempDataArray = [];
    this.columnData = [];
    this.rowData.map((item) => {
      if (tempDataArray.indexOf(item[event]) == -1 && item[event] !== '' && item[event] !== null) {
        tempDataArray.push(item[event]);
      }
    })
    tempDataArray.map((item, i) => {
      this.columnData.push({ itemName: item, id: i });
    })


    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);
  }

  setAdvFilter() {
    if (this.advanceFiltersTotal.length < 5) {
      this.showSave = false;
      let filters = [];
      let a = [];
      let data = [];
      let value;
      let i = 0;

      this.collectionOfEquals = [];
      this.collectionOfContains = [];
      this.collectionOfGreaterthan = [];
      this.collectionOfGreaterthanEqual = [];
      this.collectionOfIsEmpty = [];
      this.collectionOfIsNotEmpty = [];
      this.collectionOfLessthan = [];
      this.collectionOfLessthanEqual = [];
      this.collectionOfBetween = [];
      this.collectionOfNotBetween = [];

      if (this.tempFilterConditionOption == 'Between') {
        let obj: any;
        let isDuplicate = false;
        ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
          obj = {
            column: this.tempFilterColumnSelected,
            filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
            condition: 'between'
          } :
          obj = {
            column: this.tempFilterColumnSelected,
            filter: `${this.startNumber}' and '${this.endNumber}`,
            condition: 'between'
          }

        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }


        if (this.collectionOfBetween.length > 0) {
          this.collectionOfBetween.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push(
                ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
                    condition: 'between'
                  } :
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.startNumber}' and '${this.endNumber}`,
                    condition: 'between'
                  }
              )
            } else {
              this.collectionOfBetween.push(
                ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
                    condition: 'between'
                  } :
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.startNumber}' and '${this.endNumber}`,
                    condition: 'between'
                  }
              )
            }
          })
        } else {
          let reqObj: any;
          ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
            reqObj = {
              column: this.tempFilterColumnSelected,
              filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
              condition: 'between'
            } :
            reqObj = {
              column: this.tempFilterColumnSelected,
              filter: `${this.startNumber}' and '${this.endNumber}`,
              condition: 'between'
            }
          this.collectionOfBetween.push(reqObj);
        }
        // if (this.startingDate !== null && this.startingDate !== undefined && this.startingDate !== null && this.endingDate !== null && this.endingDate!== undefined && this.endingDate !== null) {
        //   if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}` + ")") == -1) {
        //     this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}` + ")");
        //   }
        //   let filter = [];
        //   filter.push(`${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`);
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
        //     this.advanceFiltersTotal.map((item, i) => {
        //       if (item.column == this.tempFilterColumnSelected) {
        //         this.advanceFiltersTotal.splice(i, 1);
        //         this.displayFilter2NonString.splice(i, 1);
        //       }
        //     })
        //     this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'between' , });
        //   }
        //   this.startingDate = null;
        //   this.endingDate = null;
        // } else if (this.startNumber !== null && this.startNumber !== undefined && this.endNumber !== null && this.endNumber !== undefined) {
        //   if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")") == -1) {
        //     this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")");
        //   }
        //   let filter = [];
        //   filter.push("'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'");
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
        //     this.advanceFiltersTotal.map((item, i) => {
        //       if (item.column == this.tempFilterColumnSelected) {
        //         this.advanceFiltersTotal.splice(i, 1);
        //         this.displayFilter2NonString.splice(i, 1);
        //       }
        //     })
        //     this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'between', });
        //   }
        //   this.endNumber = null;
        //   this.startNumber = null;
        // } else {
        //   this.fillBothFields = true;
        //   setTimeout(() => { this.fillBothFields = false; }, 2000);
        // }
      }

      if (this.tempFilterConditionOption == 'notBetween') {
        let obj: any;
        let isDuplicate = false;
        ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
          obj = {
            column: this.tempFilterColumnSelected,
            filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
            condition: 'not between'
          } :
          obj = {
            column: this.tempFilterColumnSelected,
            filter: `${this.startNumber}' and '${this.endNumber}`,
            condition: 'not between'
          }
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfNotBetween.length > 0) {
          this.collectionOfNotBetween.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push(
                ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
                    condition: 'not between'
                  } :
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.startNumber}' and '${this.endNumber}`,
                    condition: 'not between'
                  }
              )
            } else {
              this.collectionOfNotBetween.push(
                ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
                    condition: 'not between'
                  } :
                  {
                    column: this.tempFilterColumnSelected,
                    filter: `${this.startNumber}' and '${this.endNumber}`,
                    condition: 'not between'
                  }
              )
            }
          })
        } else {
          let reqObj: any;
          ((this.startingDate !== undefined && this.startingDate !== null) && (this.endingDate !== undefined && this.endingDate !== null)) ?
            reqObj = {
              column: this.tempFilterColumnSelected,
              filter: `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`,
              condition: 'not between'
            } :
            reqObj = {
              column: this.tempFilterColumnSelected,
              filter: `${this.startNumber}' and '${this.endNumber}`,
              condition: 'not between'
            }
          this.collectionOfNotBetween.push(reqObj);
        }
        // if (this.startingDate !== null && this.startingDate !== undefined && this.startingDate !== null && this.endingDate !== null && this.endingDate!== undefined && this.endingDate !== null) {
        //   if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}` + ")") == -1) {
        //     this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + `${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}` + ")");
        //   }
        //   let filter = [];
        //   filter.push(`${this.getDateFormat(this.startingDate)}' and '${this.getDateFormat(this.endingDate)}`);
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
        //     this.advanceFiltersTotal.map((item, i) => {
        //       if (item.column == this.tempFilterColumnSelected) {
        //         this.advanceFiltersTotal.splice(i, 1);
        //         this.displayNotBetweenArray.splice(i, 1);
        //       }
        //     })
        //     this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condtion:'not between'});
        //   }
        //   this.startingDate = null;
        //   this.endingDate = null;
        // } else if (this.startNumber !== null && this.startNumber !== undefined && this.endNumber !== null && this.endNumber !== undefined) {
        //   if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")") == -1) {
        //     this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")");
        //   }
        //   let filter = [];
        //   filter.push("'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'");
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
        //     this.advanceFiltersTotal.map((item, i) => {
        //       if (item.column == this.tempFilterColumnSelected) {
        //         this.advanceFiltersTotal.splice(i, 1);
        //         this.displayNotBetweenArray.splice(i, 1);
        //       }
        //     })
        //     this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condtion:'not between'});
        //   }
        //   this.endNumber = null;
        //   this.startNumber = null;
        // }
        // else {
        //   this.fillBothFields = true;
        //   setTimeout(() => { this.fillBothFields = false; }, 2000);
        // }
      }

      if (this.tempFilterConditionOption == 'Equals') {
        let isDuplicate = false;
        this.StringToFilter;
        this.NumberToFilter;
        this.DateToFilter;
        this.tempFilterConditionOption,
          this.tempFilterColumnSelected;
        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter),
          condition: '='
        }
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfEquals.length > 0) {
          this.collectionOfEquals.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfEquals.push(
                {
                  column: this.tempFilterColumnSelected,
                  filter: [
                    {
                      value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
                    }
                  ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
            // }
            // ]

          }
          this.collectionOfEquals.push(reqObj);
        }
        // if (this.StringToFilter !== null && this.StringToFilter !== undefined) {
        //   if (this.tempSelectedDataToFilter.indexOf(JSON.stringify(this.StringToFilter)) == -1) {
        //     this.tempSelectedDataToFilter.push(JSON.stringify(this.StringToFilter));
        //     a.push("'" + this.StringToFilter + "'");
        //   }
        //   filters.push(this.StringToFilter);
        //   this.StringToFilter = null;
        //   if (filters.length > 0) {
        //     if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters, condition: '=' }))) {
        //       this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters, condition: '=' ,index: i}));
        //       if (this.advanceFiltersTotal.length > 0) {
        //         this.advanceFiltersTotal.map((item) => {
        //           data.push(item.column)
        //         })
        //         value = data.includes(this.tempFilterColumnSelected)
        //         if (value) {
        //           this.advanceFiltersTotal.map((item, i) => {
        //             if (item.column == this.tempFilterColumnSelected) {
        //               this.advanceFiltersTotal[i].filter.push(filters[0]);
        //             }
        //           })
        //         }
        //         if (!value) {
        //           if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters, condition: '=' })) == -1) {
        //             this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filters, condition: '=',index: i  });
        //           }
        //         }
        //       } else {
        //         this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filters, condition: '='});
        //       }
        //     }
        //   }
        // }
        // else if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(this.NumberToFilter);
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '='}));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '=' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '=' ,index: i  });
        //     }
        //   }
        //   this.NumberToFilter = null;
        // } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(new Date(this.DateToFilter).toLocaleDateString());
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '=' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '=' });
        //         }
        //       }
        //     } else {
        //       this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '=' });
        //     }
        //   }
        //   this.DateToFilter = null;
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }
      }

      if (this.tempFilterConditionOption == 'Contains') {
        let isDuplicate = false;
        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: 'like'
        }
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfContains.length > 0) {
          this.collectionOfContains.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfContains.push(
                {
                  column: this.tempFilterColumnSelected,
                  filter: [
                    {
                      value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
                    }
                  ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
            // }
            // ]

          }
          this.collectionOfContains.push(reqObj);
        }
        // if (this.StringToFilter !== null && this.StringToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(this.StringToFilter);
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'}));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'});
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'});
        //     }
        //   }
        //   this.StringToFilter = null;
        // }
        // else if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(String(this.NumberToFilter));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'}))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'}));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'})) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'});
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'});
        //     }
        //   }
        //   this.NumberToFilter = null;
        // } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(this.DateToFilter);
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'}))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'}));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'});
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: 'contains'});
        //     }
        //   }
        //   this.DateToFilter = null;
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }
      }

      if (this.tempFilterConditionOption == 'isEmpty') {
        // if (this.tempFilterColumnSelected !== '' && this.tempFilterColumnSelected !== undefined) {
        //   if (this.tempConditionArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected })) == -1) {
        //     this.tempConditionArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, condition: 'is empty' }));
        //     this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, condition: 'is empty' });
        //   }
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }
        let isDuplicate = false;
        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: 'is empty'
        }

        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfIsEmpty.length > 0) {
          this.collectionOfIsEmpty.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfIsEmpty.push(
                {
                  column: this.tempFilterColumnSelected,
                  // filter: [
                  //   {
                  //     value:this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter )
                  //   }
                  // ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            // filter: [
            //   {
            //     value:this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter )
            //   }
            // ]
            // }
            // ]

          }
          this.collectionOfIsEmpty.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'isNotEmpty') {
        let isDuplicate = false;
        // if (this.tempFilterColumnSelected !== '' && this.tempFilterColumnSelected !== undefined) {
        //   if (this.tempConditionArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected })) == -1) {
        //     this.tempConditionArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, condition: 'is not empty' }));
        //     this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, condition: 'is not empty' });
        //   }
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }
        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: 'is not empty'
        }

        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfIsNotEmpty.length > 0) {
          this.collectionOfIsNotEmpty.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfIsNotEmpty.push(
                {
                  column: this.tempFilterColumnSelected,
                  // filter: [
                  //   {
                  //     value:this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter )
                  //   }
                  // ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            // filter: [
            //   {
            //     value:this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter )
            //   }
            // ]
            // }
            // ]

          }
          this.collectionOfIsNotEmpty.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'Greater than') {
        // if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(String(this.NumberToFilter));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' });
        //     }
        //   }
        //   this.NumberToFilter = null;
        // } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        //   let filter = [];
        //   filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter , condition: '>'});
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>' });
        //     }
        //   }
        //   this.DateToFilter = null;
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }

        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '>'
        }
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfGreaterthan.length > 0) {
          this.collectionOfGreaterthan.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfGreaterthan.push(
                {
                  column: this.tempFilterColumnSelected,
                  filter: [
                    {
                      value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
                    }
                  ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
            // }
            // ]

          }
          this.collectionOfGreaterthan.push(reqObj);
        }

      }

      if (this.tempFilterConditionOption == 'Greater than or Equals') {
        // if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(String(this.NumberToFilter));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' });
        //     }
        //   }
        //   this.NumberToFilter = null;
        // } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        //   let filter = [];
        //   filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '>=' });
        //     }
        //   }
        //   this.DateToFilter = null;
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }

        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '>='
        }
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfGreaterthanEqual.length > 0) {
          this.collectionOfGreaterthanEqual.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfGreaterthanEqual.push(
                {
                  column: this.tempFilterColumnSelected,
                  filter: [
                    {
                      value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
                    }
                  ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
            // }
            // ]

          }
          this.collectionOfGreaterthanEqual.push(reqObj);
        }

      }


      if (this.tempFilterConditionOption == 'Lesser than') {
        // if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(String(this.NumberToFilter));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' });
        //     }
        //   }
        //   this.NumberToFilter = null;
        // } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        //   let filter = [];
        //   filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<' });
        //     }
        //   }
        //   this.DateToFilter = null;
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }

        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '<'
        }
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfLessthan.length > 0) {
          this.collectionOfLessthan.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfLessthan.push(
                {
                  column: this.tempFilterColumnSelected,
                  filter: [
                    {
                      value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
                    }
                  ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
            // }
            // ]

          }
          this.collectionOfLessthan.push(reqObj);
        }

      }

      if (this.tempFilterConditionOption == 'Less than or Equals') {
        // if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        //   let filter = [];
        //   filter.push(String(this.NumberToFilter));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' });
        //     }
        //   }
        //   this.NumberToFilter = null;
        // } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        //   let filter = [];
        //   filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        //   if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' }))) {
        //     this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' }));
        //     if (this.advanceFiltersTotal.length > 0) {
        //       this.advanceFiltersTotal.map((item) => {
        //         data.push(item.column)
        //       })
        //       value = data.includes(this.tempFilterColumnSelected)
        //       if (value) {
        //         this.advanceFiltersTotal.map((item, i) => {
        //           if (item.column == this.tempFilterColumnSelected) {
        //             this.advanceFiltersTotal[i].filter.push(filter[0]);
        //           }
        //         })
        //       }
        //       if (!value) {
        //         if (this.advanceFiltersTotal.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' })) == -1) {
        //           this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' });
        //         }
        //       }
        //     } else {
        //       this.advanceFiltersTotal.push({ column: this.tempFilterColumnSelected, filter: filter, condition: '<=' });
        //     }
        //   }
        //   this.DateToFilter = null;
        // } else {
        //   this.fillField = true;
        //   setTimeout(() => { this.fillField = false; }, 2000);
        // }
        let obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '<='
        }
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          })
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfLessthanEqual.length > 0) {
          this.collectionOfLessthanEqual.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) })
            } else {
              this.collectionOfLessthanEqual.push(
                {
                  column: this.tempFilterColumnSelected,
                  filter: [
                    {
                      value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
                    }
                  ]
                }
              )
            }
          })
        } else {
          let reqObj = {
            // equals : [
            // {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
            // }
            // ]

          }
          this.collectionOfLessthanEqual.push(reqObj);
        }
      }

      // this.advanceFiltersTotal = [...this.originalArray, ...this.originalArrayNonString, ...this.greaterThanArray,
      //                            ...this.lesserThanArray, ...this.containsArray, ...this.lessThanOrEqualsArray,
      //                            ...this.greaterThanOrEqualsArray, ...this.notBetweenArray, ...this.isEmptyArray,
      //                            ...this.isNotEmptyArray ]

      this.display(this.originalArray, this.displayFilter2);
      this.display(this.originalArrayNonString, this.displayFilter2NonString);
      this.display(this.greaterThanArray, this.displayGreaterThan);
      this.display(this.lesserThanArray, this.displayLesserThan);
      this.display(this.containsArray, this.displayContains);
      this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
      this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
      this.display(this.notBetweenArray, this.displayNotBetweenArray);
      this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);
      this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);

      // this.advanceFiltersTotal = [...this.displayFilter2, ...this.displayFilter2NonString, ...this.displayGreaterThan,
      //   ...this.displayLesserThan, ...this.displayContains, ...this.displaylessThanOrEqualsArray,
      //   ...this.displaygreaterThanOrEqualsArray, ...this.displayNotBetweenArray, ...this.displayIsEmptyArray,
      //   ...this.displayIsNotEmptyArray ];
      // this.advanceFiltersTotal.filter((item:any)=>{
      //   item['condition'] = this.tempFilterConditionOption;
      // })
      if (this.defaultGroupingCondition === 'and') {
        this.filterGrouping(this.advanceFiltersTotal[this.advanceFiltersTotal.length - 1], 'and', this.tempFilterConditionOption, false, 0)
      }
    } else {
      swal('Filter limit exceeded!', 'Your exceeding the filters limit, You can only use five filters in this report', 'info');
    }

  }

  onFilterChanged(event: any) {
    let filterType: any
    let source = event.srcElement.parentElement.parentElement.__agComponent, value: any, column: any, query: any;
    let tlpData = {
      "filterHeader": this.tlpDataHeader,
      "filter": this.tlpNameData,
      "beginDate": moment(this._localValues.beginDateOfCurrentMonth).format('YYYY-MM-DD'),
      "endDate": moment(this._localValues.endDateOfCurrentMonth).format('YYYY-MM-DD'),
      "action": 'NaN',
      "beginPagination": parseInt((document.getElementById('initial-count') as HTMLElement).innerText),
      "endPagination": parseInt((document.getElementById('des-count') as HTMLElement).innerText),
    }
    /**
     * Need to replace tlpData by this,tlpData
     */
    this.tlpData = tlpData;

    if (event.target.id === 'filterType') {
      filterType = event.target.value
      if (source.filterText !== undefined) {
        switch (filterType) {
          case 'contains':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' like\'' + '%' + value + '%' + '\''
            this.data['paginationFilter'] = query
            tlpData['paginationFilter'] = query
            if (this.tlpNameData !== '') {
              this.getReportsByFilterTLP(tlpData)

            } else {
              this.getReportsByFilter(this.data)
            }
            break;
          case 'equals':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + '=\'' + value + '\''
            this.data['paginationFilter'] = query
            tlpData['paginationFilter'] = query
            if (this.tlpNameData !== '') {
              this.getReportsByFilterTLP(tlpData)

            } else {
              this.getReportsByFilter(this.data)
            }
            break;
          case 'notEqual':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + '!=\'' + value + '\''
            this.data['paginationFilter'] = query
            tlpData['paginationFilter'] = query
            if (this.tlpNameData !== '') {
              this.getReportsByFilterTLP(tlpData)

            } else {
              this.getReportsByFilter(this.data)
            }
            break;
          case 'startsWith':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' like\'' + value + '%' + '\''
            this.data['paginationFilter'] = query
            tlpData['paginationFilter'] = query
            if (this.tlpNameData !== '') {
              this.getReportsByFilterTLP(tlpData)

            } else {
              this.getReportsByFilter(this.data)
            }
            break;
          case 'endsWith':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' like\'' + '%' + value + '\''
            this.data['paginationFilter'] = query
            tlpData['paginationFilter'] = query
            if (this.tlpNameData !== '') {
              this.getReportsByFilterTLP(tlpData)
            } else {
              this.getReportsByFilter(this.data)
            }
            break;
          case 'notContains':
            value = source.filterText
            column = source.filterParams.column.colId
            query = 'where ' + column + ' not like\'' + '%' + value + '%' + '\''
            this.data['paginationFilter'] = query
            tlpData['paginationFilter'] = query
            if (this.tlpNameData !== '') {
              this.getReportsByFilterTLP(tlpData)
            } else {
              this.getReportsByFilter(this.data)
            }
            break;

        }
      } else {
        this.fillBothFields = true;
        setTimeout(() => { this.fillBothFields = false; }, 2000);
      }
    }

    if (event.target.id == 'applyButton') {
      let sourceData = event.srcElement.parentElement.parentElement.__agComponent;
      if (sourceData.filterText !== ' ') {
        this.paginationColumnFilter.push({
          'column': sourceData.filterParams.column.colId,
          'value': sourceData.filterText
        })
        this.data["paginationColumnFilter"] = this.paginationColumnFilter;
        this.getReportsByFilter(this.data)
      }
    }
  }

  userPrivilage() {
    this.res = this.homeService.userPrivilage();
    if (this.res.predefinedReportUserRights !== null) {
      this.res.predefinedReportUserRights.map(item => {
        this.predefinedreportsList.push(item.predefinedReports.replace(/([A-Z])/g, ' $1').trim());
      })
    }
    this.mainMenuList.map(item => {
      let data = item.MenuName.split(' (')[0];
      if (this.predefinedreportsList.indexOf(data) !== -1) {
        this.dropdownList.push({ item });
      }
    });
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }
  onPageSizeChanged(newPageSize) {
    return this.gridApi.paginationSetPageSize(Number(newPageSize));
  }

  trimValue(val) {
    let subString;
    if (val.length > 20) {
      subString = val.substring(0, 20);
      subString += '...';
      return subString;
    } else {
      return val;
    }
  }


  getFavourites() {
    let getReq = {
      // "userId": localStorage.getItem('UserId'),
      "userId": 4621,
      "spName": this.spName
    }
    this._report.getFavourites(getReq).then(data => {
      this.favouriteFilters = data.favoriteFilter
    })
  }


  apply(data) {
    data;
    // this.reset();
    this.clearDataFromPayload();
    let filter = JSON.parse(data.favoriteFilterRequest);
    this.saveFilterId = data.favoriteFilterId;
    this.FilterName = data.favoriteFilterName;
    if (filter.equals && filter.equals.length > 0) {
      filter.equals.map(item => {
        let filterData = [];
        item.filter.map(data => {
          filterData.push(data.value);
        })
        this.mapFilterIntoArray(filterData, item.column, this.originalArray);
      })
    }

    if (filter.between && filter.between.length > 0) {
      filter.between.map(item => {
        let filterData = [];
        filterData.push("'" + item.filter[0].value + "'" + ' and ' + "'" + item.filter[1].value + "'");
        this.mapFilterIntoArray(filterData, item.column, this.originalArrayNonString);
      })
    }

    if (filter.notBetween && filter.notBetween.length > 0) {
      filter.notBetween.map(item => {
        let filterData = [];
        filterData.push("'" + item.filter[0].value + "'" + ' and ' + "'" + item.filter[1].value + "'");
        this.mapFilterIntoArray(filterData, item.column, this.notBetweenArray);
      })
    }

    if (filter.contains && filter.contains.length > 0) {
      filter.contains.map(item => {
        let filterData = [];
        filterData = item.value;
        this.mapFilterIntoArray(filterData, item.column, this.containsArray);
      })
    }

    if (filter.greaterThan && filter.greaterThan.length > 0) {
      filter.greaterThan.map(item => {
        let filterData = [];
        filterData = item.value;
        this.mapFilterIntoArray(filterData, item.column, this.greaterThanArray);
      })
    }

    if (filter.lessThan && filter.lessThan.length > 0) {
      filter.lessThan.map(item => {
        let filterData = [];
        filterData = item.value;
        this.mapFilterIntoArray(filterData, item.column, this.lesserThanArray);
      })
    }

    if (filter.greaterThanOrEquals && filter.greaterThanOrEquals.length > 0) {
      filter.greaterThanOrEquals.map(item => {
        let filterData = [];
        filterData = item.value;
        this.mapFilterIntoArray(filterData, item.column, this.greaterThanOrEqualsArray);
      })
    }

    if (filter.lessThanOrEqualsArray && filter.lessThanOrEqualsArray.length > 0) {
      filter.lessThanOrEqualsArray.map(item => {
        let filterData = [];
        filterData = item.value;
        this.mapFilterIntoArray(filterData, item.column, this.lessThanOrEqualsArray);
      })
    }


    this.display(this.originalArray, this.displayFilter2);
    this.display(this.originalArrayNonString, this.displayFilter2NonString);
    this.display(this.greaterThanArray, this.displayGreaterThan);
    this.display(this.lesserThanArray, this.displayLesserThan);
    this.display(this.containsArray, this.displayContains);
    this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
    this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
    this.display(this.notBetweenArray, this.displayNotBetweenArray);
    this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);
    this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);

    this.applyFilter();
  }

  mapFilterIntoArray(filterData, column, array) {
    if (this.newArray.indexOf(JSON.stringify({ column: column, filter: filterData }))) {
      this.newArray.push(JSON.stringify({ column: column, filter: filterData }));
      array.push({ column: column, filter: filterData });
    }
  }

  removeFavourites() {
    let deleteReq = {
      "favoriteFilterId": this.filterIdToDelete
    }
    this._report.deleteFavourites(deleteReq).then(() => {
      swal('Success!', 'Filter is deleted successfully!', 'success');
      this.getFavourites();
    })
    if (this.filterIdToDelete == this.saveFilterId) {
      this.reset();
    }
  }



  filterData(filter) {
    let spNameArray;
    let tlpspNameArray;

    if (this.optionSelected.label === 'Risk Management (RM)' && this.objectKeys(this.filter1List)[0].split(',')[0] === 'Quick Pick' && this.objectKeys(filter)[0].split(',')[0] === 'Completed') {
      spNameArray = this.objectKeys(filter)[0].split(',')[1];
    } else if (this.optionSelected.label !== 'TFC' && this.objectKeys(filter)[0] !== 'Quick Pick' && this.optionSelected.label !== 'Trend Line Processing') {
      spNameArray = filter.split(',')[1];
      if (filter.split(',')[1] == undefined) {
        this.fileName = filter.split(',')[0];
      } else {
        this.fileNameComplete = filter.split(',')[0];
      }
    } else if (this.optionSelected.label === 'TFC' && this.objectKeys(filter)[0] !== 'Quick Pick' && this.optionSelected.label !== 'Trend Line Processing') {
      spNameArray = filter.split(',')[1];
    } else if (this.optionSelected.label === 'Trend Line Processing') {
      if (this.objectKeys(filter)[0] !== "0") {
        this.tlpDataHeader = this.objectKeys(filter)[0].split(',')[0];
        this.tlpspNameArrayCode = this.objectKeys(filter)[0].split(',')[1];
      } else {
        if (filter.includes('&')) {
          tlpspNameArray = filter.split('&')[0];
          this.tlpNameData = tlpspNameArray
        }
        if (filter.includes('$')) {
          this.tlpDataHeader = filter.split('$')[0];
          this.tlpspNameArrayCode = filter.split('$,')[1];
        }
      }
    }
    else {
      spNameArray = this.objectKeys(filter)[0] !== '0' ? filter.split(',')[1] : this.objectKeys(filter)[0].split(',')[1];
    }
    if (spNameArray) {
      this.SPName = spNameArray;
      this.SPName = spNameArray;
      this.data = {
        'spName': spNameArray,
        'action': 'NaN',
      };
      this._report.changeSpName(this.data.spName);
      this.spName = this.data.spName;
      // this.getReportsByFilter(this.data);
    } else if (tlpspNameArray) {
      this.dataTLP = {
        'spName': tlpspNameArray
      };
      this.tlpReport = true;
      this.data = {
        "filterHeader": this.tlpDataHeader,
        "filter": tlpspNameArray,
        "beginDate": moment(this._localValues.beginDateOfCurrentMonth).format('YYYY-MM-DD'),
        "endDate": moment(this._localValues.endDateOfCurrentMonth).format('YYYY-MM-DD'),
        "action": 'NaN',
        "beginPagination": 1,
        "endPagination": 100
      }
      this.tlpData = this.data;

      this._report.changeSpName(this.dataTLP.spName);
      this.spName = this.dataTLP.spName;
      // this.getReportsByFilterTLP(this.data);
    } else {
      this.spName = '';
    }
  }

  filterByDate(filterOption) {
    this.data.dateFilter = filterOption;
    if (filterOption === 'range') {
      this.data.startDate = this.startDate.formatted;
      this.data.endDate = this.endDate.formatted;
    }
    //this.getReportsByDateFilter(this.data);
  }

  getReportsByDateFilter(data) {
    this.hideTable = true;
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    this.collectionOfAnd = [];
    this.collectionOfOR = [];
    this.finalQueryString = '';
    this._report.getReportsByDateFilter(data).then(data => {
      if (data.responseStatus == true) {
        this.reportsViewList = data.customReport;
        this.totalCount = data.totalCount;
        this.hideLoader = true;
        this.hideTable = false;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        let test = []
        this.headers[0].forEach(function (result) {
          let data = {
            headerName: (result.replace(/\b\w/g, l => l.toUpperCase())), field: result, rowDrag: true, getQuickFilterText(params) {
              return params.value.name;
            },

          }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
      } else {
        this.hideLoader = true;
      }
    })
  }
  getReportsByFilter(data) {
    this.showSave = false;
    this.headers = [];
    this.rawdata = [];
    this.hideTable = true;
    data.beginPagination = this.initial.toString();
    data.endPagination = this.end.toString();
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this.tlpDataHeader = '';
    this.collectionOfAnd = [];
    this.collectionOfOR = [];
    this.finalQueryString = '';
    this._report.getReportsByFilter(data).then(data => {
      this.totalCount = data.totalCount;
      this.filterConditionOption = 'Equals';
      this.reportGenerated = true;
      // this.HideFilter();
      // this.hideToggle = true;


      if (this.tempPage == '') {
        this.noOfRecord = 100
      }

      if (data.responseStatus == true) {
        loader.style.display = 'none';
        setTimeout(() => {
          let currentInput = document.getElementById('currentPage') as HTMLInputElement;
          let initialCount = document.getElementById('user-initial-count') as HTMLElement;
          if (initialCount.innerHTML == '1') {
            currentInput.value = '1';
          }
        }, 1000);
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        if (this.totalCount < 100) {
          this.end = this.totalCount
        }
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport'];
        this._referral.timeStampToDateConversion(this.rowData);
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = {
            headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, unSortIcon: true, rowDrag: true,
          }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.tempPage = ''
        this.clearFilter();
        this.getFavourites();
        this.onConditionFilterSelected();
        this.navigationIsOn = false;
      } else {
        this.hideLoader = true;
      }
    }).catch(() => {
      loader.style.display = 'none';
    })
  }

  SortgetReportsByFilter(data) {
    this.headers = [];
    this.rawdata = [];
    this.hideTable = true;
    data.beginPagination = this.initial.toString();
    data.endPagination = this.end.toString();
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this._report.getReportsByFilter(data).then(data => {
      this.filterConditionOption = 'Equals';
      this.reportGenerated = true;
      let currentInput = document.getElementById('currentPage') as HTMLInputElement;
      currentInput.value = '1';
      this.initial = 1;
      if (this.totalCount > 100) {
        this.end = 100;
      } else {
        this.end = this.totalCount
      }
      if (this.tempPage == '') {
        this.noOfRecord = 100
      }
      if (data.responseStatus == true) {
        loader.style.display = 'none';
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        this.totalCount = data.totalCount;
        if (this.totalCount < 100) {
          this.end = this.totalCount
        }
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = {
            headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, unSortIcon: true, rowDrag: true,
          }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.tempPage = ''
        this.getFavourites();
        this.onConditionFilterSelected();
        this.navigationIsOn = false;
      } else {
        this.hideLoader = true;
      }
    })
  }

  resetReportFilter(data) {
    this.showSave = false;
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement
    let end = document.getElementById('des-count') as HTMLInputElement
    let nextIcon = document.getElementById('next') as HTMLElement
    this.headers = [];
    this.rawdata = [];
    this.hideTable = true;
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this._report.getReportsByFilter(data).then(data => {
      this.totalCount = data.totalCount;
      loader.style.display = 'none';
      this.filterConditionOption = 'Equals';
      loader.style.display = 'none';
      this.totalCount = data.totalCount;
      if (this.tempPage == '') {
        this.noOfRecord = 100
      }
      if (data.responseStatus == true) {
        if (data.totalCount < 100) {
          this.noOfRecord = data.totalCount;
          end.innerText = data.totalCount
          nextIcon.style.display = 'none'
        }
        this.reportsViewList = data.customReport;

        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = {
            headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true,
          }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.tempPage = ''
        this.filterOption = null;
        this.filterColumnSelected = null;
        this.selectedDataToFilter = [];
        this.tempSelectedDataToFilter = [];
        this.tempArray = [];
        this.filterConditionOption = 'Equals';
        this.duplicateTempArray = [];
        this.columnData = [];
        this.startingDate = null;
        this.endingDate = null;
        this.startNumber = null;
        this.endNumber = null;
        this.NumberToFilter = null;
        this.DateToFilter = null;
        dateFilter.style.display = 'none'
        textFilter.style.display = 'none'
        intFilter.style.display = 'none'
        singleIntFilter.style.display = 'none'
        singledateFilter.style.display = 'none'
        singleStringFilter.style.display = 'inline-block'
        this.getFavourites();
        this.onConditionFilterSelected();
      } else {
        this.hideLoader = true;
      }
    })
  }
  usr_rep_list: any = [];
  getPriorityMenu() {
    let temp = [], unique_report;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block'
    let req = { staffID: parseInt(localStorage.getItem('UserId')) || 14802 }
    this._report.getUserDetail(req).then(result => {
      loader.style.display = 'none'
      if (result.users.predefinedReportUserRights.length > 0) {
        this.usr_rep_list = result.users.predefinedReportUserRights;
        this.emptyStateController = false;
        result.users.predefinedReportUserRights.map(report => {
          temp.push(report.reportName)
        })
        unique_report = temp.filter((item, pos) => {
          return temp.indexOf(item) == pos;
        })
        unique_report.map(report => {
          return this.dropdownList.push({ label: report })
        })
      }
      else {
        this.emptyStateController = true;
      }
    })
  }

  onFilterTextBoxChanged() {
    let searchTxt = document.getElementById('filter-text') as HTMLInputElement
    return this.gridApi.setQuickFilter(searchTxt.value);
  }

  getReportsByFilterTLP(req) {
    this.showSave = false;
    this.headers = [];
    this.rawdata = [];
    req.beginPagination = this.initial.toString();
    req.endPagination = this.end.toString();
    this.showGroupByTable = false;
    this.hideTable = true;
    this.hideLoader = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this.filterQuery = '';
    this._report.getReportsByFilter(req).then(data => {
      this.filterQuery = data.tlpQuery;
      this.filterConditionOption = 'Equals';
      // this.HideFilter();
      // this.hideToggle = true;
      this.reportGenerated = true;

      if (data.responseStatus == true) {
        loader.style.display = 'none';
        setTimeout(() => {
          let currentInput = document.getElementById('currentPage') as HTMLInputElement;
          let initialCount = document.getElementById('user-initial-count') as HTMLElement;
          if (initialCount.innerHTML == '1') {
            currentInput.value = '1';
          }
        }, 1000);
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        this.tlpQuery = data.tlpQuery;
        this.totalCount = data.totalCount;
        if (this.totalCount < 100) {
          this.end = this.totalCount
        }
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport'];
        this._referral.timeStampToDateConversion(this.rowData);
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.clearFilter();
        this.getFavourites();
        this.onConditionFilterSelected();
        this.navigationIsOn = false;
      } else {
        this.hideLoader = true;
      }
    }).catch(() => {
      loader.style.display = 'none';
    })
  }

  SortgetReportsByFilterTLP(req) {
    this.headers = [];
    this.rawdata = [];
    this.showGroupByTable = false;
    this.hideTable = true;
    this.hideLoader = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this._report.getReportsByFilter(req).then(data => {
      this.filterConditionOption = 'Equals';
      this.reportGenerated = true;
      let currentInput = document.getElementById('currentPage') as HTMLInputElement;
      currentInput.value = '1';
      this.initial = 1;
      if (this.totalCount > 100) {
        this.end = 100;
      } else {
        this.end = this.totalCount
      }
      if (data.responseStatus == true) {
        loader.style.display = 'none';
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        this.tlpQuery = data.tlpQuery;
        this.totalCount = data.totalCount;
        if (this.totalCount < 100) {
          this.end = this.totalCount
        }
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.getFavourites();
        this.onConditionFilterSelected();
        this.navigationIsOn = false;
      } else {
        this.hideLoader = true;
      }
    }).catch(() => {
      loader.style.display = 'none';
    })
  }

  getDetails(data) {
    this.filterIdToDelete = data;
  }

  resetReportFilterTLP(req) {
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let textFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block'
    // let nextIcon = document.getElementById('next') as HTMLElement
    // nextIcon.style.display = 'inline-block'
    // nextIcon.style.color = '#000'
    this.headers = [];
    this.rawdata = [];
    this.showGroupByTable = false;
    this.hideTable = true;
    this.hideLoader = false;
    this.paginationHide = true;
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    loader.style.display = 'block';
    this._report.getReportsByFilter(req).then(data => {
      loader.style.display = 'none';
      this.filterConditionOption = 'Equals';
      this.reportGenerated = true;
      if (data.responseStatus == true) {
        this.reportsViewList = data.customReport;
        this.totalCount = data.totalCount;
        this.tlpQuery = data.tlpQuery;
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        if (this.groupBy) {
          this.hideGroupByFilter = false;
        }
        this.filterOption = 'AND';
        this.filterColumnSelected = null;
        this.selectedDataToFilter = [];
        this.filterConditionOption = 'Equals';
        this.NumberToFilter = null;
        this.DateToFilter = null;
        this.duplicateTempArray = [];
        this.columnData = [];
        dateFilter.style.display = 'none'
        textFilter.style.display = 'none'
        intFilter.style.display = 'none'
        singleIntFilter.style.display = 'none'
        singledateFilter.style.display = 'none'
        singleStringFilter.style.display = 'inline-block'
        this.getFavourites();
        this.onConditionFilterSelected();
      } else {
        this.hideLoader = true;
      }
    })
  }


  onRowSelected(event) {
    if (this.selectedRows.indexOf(event.data) == -1) {
      this.selectedRows.push(event.data);
    } else {
      this.selectedRows.splice(this.selectedRows.indexOf(event.data), 1);
    }
  }

  getGroupFilters(req) {
    this.filter4List = [];
    this.hideGroupByFilter = false;
    this.clildFormService.getGroupFilters(req).then(data => {
      this.groupBy = JSON.parse(data.subFilter).reportGroup;
    })

  }

  getPrioritizedReports(mainType) {
    this.showReportMenu = true;
    mainType.reportMenuParentID = this.reportsMenuId;
    this._report.getPrioritizedReports(mainType).then(data => {
      if (data.responseStatus == true) {
        this.internalReportsList = data.menuType;
      } else {
      }
    }).catch(() => {
    });
  }

  onOptionSelected() {
    // this.dropdownList = [];
    // return this.dropdownList.filter(data=>{
    //   if(data.label.indexOf(event.query)!== -1){
    //     this.dropdownList.push(data)
    //   }
    // })
    this.HideFilter();
    this.selectedRows = [];
    this.hideLayer = false;
    this.hideFilterOnToggle();
    this.ReportsFilter();
    this.hideLoaderText = false;
    this.hideGroupByFilter = true;
    this.tlpNameData = '';
  }

  subFilterCategory(reports) {
    this._report.subFilterCategory(reports).then(data => {
      this.hideToggle = false;
      this.hideFilters = false;
      let dataIn = JSON.parse(data.subFilter);
      this.filterList = dataIn;
      this.firstLayer = false;
    }).catch(() => {
    });
  }

  getReportSource(reports) {
    this.hideLoader = false;
    this.showReportsView = true;
    reports.pagination = 100;
    this._report.getViewReportSource(reports).then(data => {
      this.totalCount = data.totalCount;
      if (data.responseStatus == true) {
        this.reportsViewList = data.menuType;
        this.hideLoader = true;
        this.hideLoaderText = true;
      } else {
      }
      this.hideTable = false;
    }).catch(() => {
    });
  }
  exportToExcel() {
    if (this.selectedRows.length == 0) {
      this.exportService.exportAsExcelFile(this.reportsViewList, this.optionSelected.label);
    } else {
      this.exportService.exportAsExcelFile(this.selectedRows, this.optionSelected.label);
    }
  }
  exportAsCsv() {
    if (this.selectedRows.length == 0) {
      this.exportService.exportAsCSVFile(this.reportsViewList, this.optionSelected.label, true);
    } else {
      this.exportService.exportAsCSVFile(this.selectedRows, this.optionSelected.label, true);
    }
  }

  onSelect(event) {
    if (event.isSelected) {
      this.selectedRows = event.selected;
    }
  }

  ShowFilter() {
    this.hideFilters = false;
    this.hideMore = true;
  }
  hideFilterOnToggle() {
    this.clicked_button = false;
    this.hideFilters = true;
    this.hideTable = true;
    this.hideFilter1 = true;
    this.hideFilter2 = true;
    this.hideFilter3 = true;
    this.hideFilterLayer4 = false;
  }
  show_currentFoster_filter = false;
  show_FosterRoster_filter = false;
  showFilters1(data) {
    if (data.data === 'SFCS Sponsored Providers') {
      this.repo_head_name = 'SFCS Sponsored Providers @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "PS_SFCSSponsoredProviders";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (data.data === 'Electronically Generated PA Awaiting Provider Signature') {
      this.repo_head_name = 'Electronically Generated PA Awaiting Provider Signature @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.pre_report_name = 'Electronically Generated PA Awaiting Provider Signature'
      this.report_name_pre = "vReport_ElecSignPlacementAgreement";
      this.get_prioritrized_Reports(1, 100);
    } else if (data.data === 'RFC OOH Client - MCO Needed') {
      this.hideFilter1 = true;
      this.hideFilter2 = true;
      this.hideFilterLayer4 = false;
      this.repo_head_name = 'RFC OOH Client - MCO Needed @for: ' + this.currentDate;
      this.report_name_pre = "OM_RFC_MCONeeded";
      if (this.filter1List == data) {
        this.filter1List = '';
        this.hideFilter1 = true;
      } else {
        this.filterList2Temp = [];
        this.filterList2.map(value => {
          if (JSON.stringify(value.item[0]) == JSON.stringify(data.data)) {
            this.filterList2Temp.push(value);
          }
        })
        this.hideGroupByFilter = true;
        this.selectedRows = [];
        this.filter1List = {};
        this.filter2List = {};
        this.filter3List = {};
  
        this.filter1List = data;
        this.hideFilter1 = true;
        if (this.filterList2Temp.length === 0) {
          if (data.data === 'FCH - Current Foster Homes') {
            this.pre_report_name = 'FCH - Current Foster Homes'
            this.show_pre_define_filter = false;
            this.show_currentFoster_filter = true;
          } else if (data.data === 'FCH - Foster Roster') {
            this.pre_report_name = 'FCH - Foster Roster'
            this.show_pre_define_filter = false;
            this.show_currentFoster_filter = false;
            this.show_FosterRoster_filter = true;
          } else {
            let report_Name = data.data.split(',');
            this.pre_report_name = report_Name[0];
            this.ShowPrimaryFilter();
          }
        }
      }
    } else if (data.data === 'Electronically Generated PA') {
      this.hideFilter1 = true;
      this.hideFilter2 = true;
      this.hideFilterLayer4 = false;
      this.repo_head_name = 'Electronically Generated PA @for: ' + this.currentDate;
      this.report_name_pre = "GN_ElecSignPlacementAgreement";
      if (this.filter1List == data) {
        this.filter1List = '';
        this.hideFilter1 = true;
      } else {
        this.filterList2Temp = [];
        this.filterList2.map(value => {
          if (JSON.stringify(value.item[0]) == JSON.stringify(data.data)) {
            this.filterList2Temp.push(value);
          }
        })
        this.hideGroupByFilter = true;
        this.selectedRows = [];
        this.filter1List = {};
        this.filter2List = {};
        this.filter3List = {};
  
        this.filter1List = data;
        this.hideFilter1 = true;
        let report_Name = data.data.split(',');
        this.pre_report_name = report_Name[0];
        this.ShowPrimaryFilter();
    } 
  } else if (data.data === 'Kinship Specialist') {
    this.hideFilter1 = true;
    this.hideFilter2 = true;
    this.hideFilterLayer4 = false;
    this.report_name_pre = "Kinship_Specialist";
    if (this.filter1List == data) {
      this.filter1List = '';
      this.hideFilter1 = true;
    } else {
      this.filterList2Temp = [];
      this.filterList2.map(value => {
        if (JSON.stringify(value.item[0]) == JSON.stringify(data.data)) {
          this.filterList2Temp.push(value);
        }
      })
      this.hideGroupByFilter = true;
      this.selectedRows = [];
      this.filter1List = {};
      this.filter2List = {};
      this.filter3List = {};

      this.filter1List = data;
      this.hideFilter1 = true;
      let report_Name = data.data.split(',');
      this.pre_report_name = report_Name[0];
      this.ShowPrimaryFilter();
   } 
 } else {
    this.hideFilter1 = true;
    this.hideFilter2 = true;
    this.hideFilterLayer4 = false;
    // this.initial = 1;
    // this.end = 100;
    this.paginationColumnFilter = [];
    if (data.data === "FC-FP OOH Worker and Child Visits - FFY Trend$,TLP-FCFPOOHW" || data.data === "FCH Beds - 13 Month Trend$,TLP-FCHB" || data.data === 'FC-FP OOH New Placements - 13 Month Trend$,TLP-FCFPOOHNP'
      || data.data === 'Placement Referral Activity - 13 Month Trend$,TLP-PRA' || data.data === 'FP In-Home Face-To-Face Visits - 13 Month Trend$,TLP-FPIHFTFV' || data.data === 'FC-FP Out-Of-Home Placements - 13 Month Trend$,TLP-FCFPOOHP' ||
      data.data === 'FP In-Home 45 Day Case Read - 13 Month Trend$,TLP-FPIH45DCR' || data.data === 'FC-FP OOH Placement Kinship Relative etc - 13 Month Trend$,TLP-FCFPOOHPKR' || data.data === 'RFC OOH Recidivists Placement Costs - 13 Month Trend$,TLP-RFCOOHRPC'
      || data.data === 'RFC OOH Placement Costs - 13 Month Trend$,TLP-RFCOOHPC' || data.data === 'FC-FP OOH Sibling Split Review Due Within 90 Day$,TLP-FCFPOOHSSR' || data.data === 'FC OOH Quarterly Case Read - 13 Month Trend$,TLP-FCOOHQCR' || data.data === 'FC-FP OOH Sibling Split Review Due Within 90 Day$,TLP-FCFPOOHSSR') {
      let report_Name = data.data.split(',');
      var repo = report_Name[0];
      this.pre_report_name = repo.slice(0, -1);
      this.ShowPrimaryFilter();
      this.hideFilter1 = false;
    }
    if (data.data === 'FCH Family and Client Contacts - 13 Month Trend$,TLP-FCHFCC') {
      // this.repo_head_name = 'FCH Family and Client Contacts - 13 Month Trend @for: ' + this.currentDate;
      // this.show_pre_define_filter = false;
      // this.report_name_pre = "FCHContacts";
      // this.beginEndOnly = true;
      // this.get_prioritrized_Reports(1, 100);

      let report_Name = data.data.split(',');
      var repo = report_Name[0];
      this.pre_report_name = repo.slice(0, -1);
      this.ShowPrimaryFilter();

    }
    if (data.data === 'FCH - Current Foster Homes') {
      this.pre_report_name = 'FCH - Current Foster Homes'
      this.show_pre_define_filter = false;
      this.show_currentFoster_filter = true;
      this.show_FosterRoster_filter = false;
    }
    if (this.filter1List == data) {
      this.filter1List = '';
      this.hideFilter1 = true;
    } else {
      this.filterList2Temp = [];
      this.filterList2.map(value => {
        if (JSON.stringify(value.item[0]) == JSON.stringify(data.data)) {
          this.filterList2Temp.push(value);
        }
      })
      this.hideGroupByFilter = true;
      this.selectedRows = [];
      this.filter1List = {};
      this.filter2List = {};
      this.filter3List = {};

      this.filter1List = data;
      // if (this.optionSelected.label === 'Trend Line Processing') {
      //   this.hideLayer = !this.hideLayer;
      // }
      this.hideFilter1 = false;
      if (this.filterList2Temp.length === 0) {
        if (data.data === 'FCH - Current Foster Homes') {
          this.pre_report_name = 'FCH - Current Foster Homes'
          this.show_pre_define_filter = false;
          this.show_currentFoster_filter = true;
        } else if (data.data === 'FCH - Foster Roster') {
          this.pre_report_name = 'FCH - Foster Roster'
          this.show_pre_define_filter = false;
          this.show_currentFoster_filter = false;
          this.show_FosterRoster_filter = true;
        } else {
          let report_Name = data.data.split(',');
          this.pre_report_name = report_Name[0];
          this.ShowPrimaryFilter();
        }
      }
    }
  }

  }

  showFilters2(reportName) {
    let report_Name = reportName.data.split(',');
    this.pre_report_name = report_Name[0];
    if (this.pre_report_name === 'SFCS Families - Providers Without Website Agreement (Today)') {
      this.repo_head_name = 'SFCS Families - Providers Without Website Agreement (Today) @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "FCHProviderAccessWithoutAgreement";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (this.pre_report_name === 'SFCS Families - Providers Sponsored by SFCS Without Access (Today)') {
      this.repo_head_name = 'SFCS Families - Providers Sponsored by SFCS Without Access (Today) @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "FCH_FM_ProviderSponsoredNoAccess";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (this.pre_report_name === 'FP Contacts') {
      this.ShowPrimaryFilter();
    } else if (this.pre_report_name === 'Success Indicator - Completed 12th grade') {
      this.show_pre_define_filter = false;
      window.open('http://it-workhorse/reports/Pages/Report.aspx?ItemPath=%2fBetaware%2fTrend2016_SuccessIndicator_Completed12thGrade', "_blank");
    } else {
      this.hideFilter2 = true;
      this.hideFilterLayer4 = false;
      if (this.filter2List == reportName) {
        this.filter2List = '';
      } else {
        this.filter2List = reportName;
        if (reportName.data.includes('&') && this.optionSelected.label == 'Trend Line Processing') {
          this.showFilters3(reportName.data, this.filter2List);
        } else {
          if (this.optionSelected.label == 'Trend Line Processing') {
            this.tlpDataHeader = reportName.data.split(',')[0];
            this.tlpspNameArrayCode = reportName.data.split(',')[1];
            if (this.pre_report_name === 'FCH New Admissions - 13 Month Trend' ||
              this.pre_report_name === 'Permanency in 12 Months Children Entering FC 24 MO - 13 Month Trend' || this.pre_report_name === 'FC-FP OOH Referrals - 13 Month Trend'
              || this.pre_report_name === 'FC FP OOH Initial Permanencies - 13 Month Trend' ||
              this.pre_report_name === 'FI In Home Closures - 13 Month Trend' || this.pre_report_name === 'FCH Open Cases - 13 Month Trend' ||
              this.pre_report_name === 'FP In Home Contacts - Single Month' || this.pre_report_name === 'FC FP OOH Closures and Permanencies - 13 Month Trend'
              || this.pre_report_name === 'RFC OOH Initial Perm 12 Months Prior Did Not Re-Enter Custody - 13 Month Trend' || this.pre_report_name === 'FCH Discharges - 13 Month Trend' || this.pre_report_name === 'OOH Placement in Family Like Setting - 13 Month Trend'
              || this.pre_report_name === 'FP Families are Maintained at Home - 13 Month Trend'
              || this.pre_report_name === 'Growing Up In Foster Care - 13 Month Trend'
              || this.pre_report_name === 'Placement Stability 12 thru 23 Months - 13 Month Trend'

              || this.pre_report_name === 'Placement Stability 24 Months or More - 13 Month Trend'
              || this.pre_report_name === 'Placement Stability Less Than 12 Months - 13 Month Trend'
              || this.pre_report_name === 'Timely Adoption Average Months - 13 Month Trend'

              || this.pre_report_name === 'Timely Reunification - 13 Month Trend'
              || this.pre_report_name === 'Permanency in 12 Months Children Entering FC - 13 Month Trend'
              || this.pre_report_name === 'Permanency in 12 Months Children Entering FC 12-23 MO - 13 Month Trend'

              || this.pre_report_name === 'Timely Reunification Entry Cohort - SFY Trend'
              || this.pre_report_name === 'Progress Towards Adoption ROC for Adoption - SFY Trend'

              || this.pre_report_name === 'FP Families are Maintained at Home Post Closure - 13 Month Trend'
              || this.pre_report_name === 'FC-FP OOH Open Cases - 13 Month Trend'
              || this.pre_report_name === 'Achieving Permanency Legally Available and ROC Under Age 18 - 13 Month Trend'
              || this.pre_report_name === 'FI In-Home Intensive Phase Closures - 13 Month Trend'
              || this.pre_report_name === 'FI In-Home New Referrals - 13 Month Trend'
              || this.pre_report_name === 'FI In-Home Open Cases - 13 Month Trend'
              || this.pre_report_name === 'FC-FP OOH Contacts - Single Month'
              || this.pre_report_name === 'Placement Stability - 13 Month Trend'
              || this.pre_report_name === 'FP Families are Engaged Timely - 13 Month Trend'
              || this.pre_report_name === 'Timely Reunification Average Months - 13 Month Trend'
              || this.pre_report_name === 'Same School - 13 Month Trend'
              || this.pre_report_name === 'Re-Entry Into Foster Care - 13 Month Trend'
              || this.pre_report_name === 'Progress Towards Adoption Legally Available and Finalized - 13 Month Trend'
              || this.pre_report_name === 'Timely Adoption - 13 Month Trend'
              || this.pre_report_name === 'Progress Towards Adoption Legally Available - 6 Month SFY Trend') {
              this.ShowPrimaryFilter();
            } else if (this.pre_report_name === 'Success Indicator - Completed 12th grade') {
              this.show_pre_define_filter = false;
              window.open('http://it-workhorse/reports/Pages/Report.aspx?ItemPath=%2fBetaware%2fTrend2016_SuccessIndicator_Completed12thGrade', "_blank");
            }

          }
        }
        if (this.optionSelected.label !== 'Trend Line Processing' && reportName.data.indexOf(',') > -1) {
          let repoName = reportName.data.split(',');
          // this.pre_report_name = repoName[0];
          let req = {
            spName: repoName[1],
            action: "NaN"
          }

          // this.getReportsByFilter(req)
          this.hideFilterLayer4 = false;
        }
        if (reportName.item.length >= 2) {
          let array = [];
          let lenghtOfObj;
          this.fpReports.map(data => {
            if (data.includes(reportName.data)) {
              lenghtOfObj = data.length;
              if (data.length > 2) {
                array.push(data);
              }
            }
          });
          if (lenghtOfObj == 4) {
            if (reportName.data === 'RFC Case Plans') {
              this.hideFilter2 = false;
              this.filterList3 = [["Case Plans - Due", "Case Plans - Due to DCF", "Case Plans - Due and Past Due"]];
            } else {
              let layer_3 = [];
              array.map(data => {
                let length = data.length;
                layer_3.push(data[length - 2])
              })
              this.filterList3 = [];
              let duplicatedArray = [];
              this.filterReport = array;
              layer_3.map(data => {
                if (data !== reportName.data && duplicatedArray.indexOf(data) == -1) {
                  duplicatedArray.push(data);
                }
              })
              duplicatedArray.length > 0 ? this.filterList3.push(duplicatedArray) : null;
              this.hideFilter2 = false;
            }
          } else {
            if (reportName.data === 'RFC Case Plans') {
              this.hideFilter2 = false;
              this.filterList3 = [["Case Plans - Due", "Case Plans - Due to DCF", "Case Plans - Due and Past Due"]];
            } else {
              let finalArray = []
              // this.initial = 1;
              // this.end = 100;
              this.paginationColumnFilter = []
              array.map(data => {
                let length = data.length;
                finalArray.push(data[length - 1])
              })
              let layer3 = finalArray
              this.filterList3 = []
              layer3.map(data => {
                if (data !== reportName.data) {
                  this.filterList3.push(layer3);
                  return this.hideFilter2 = false;
                }
              });
            }
          }
        }
      };


      if (this.hideFilter2) {
        this.ShowPrimaryFilter();
      } else if (this.optionSelected.label == 'Trend Line Processing') {
        this.show_pre_define_filter = true;
        if (this.pre_report_name === 'Success Indicator - Completed 12th grade') {
          this.show_pre_define_filter = false;
        }
      }
      else {
        this.show_pre_define_filter = false;
      }

    }
    console.log('sjjjjj>>', this.filterList3);

  }
  beginEndOnly = false;
  showContrct = false;
  showContract = false;
  showNonContract = false;
  showUnusual_rating = false;
  showFilters3(data, parentData) {
    let repo_Name = data.split(',')
    if (parentData.data == 'FP Case Plans') {
      this.pre_report_name = repo_Name[0];
    } else if (repo_Name[0] == 'Provider Events Due') {
      this.repo_head_name = 'Provider Events Due @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "OKProviderEventsDue";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'BFCH Provider Certifications') {
      this.repo_head_name = 'BFCH Provider Certifications @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "OKProviderCertificationsDue";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'FCH Champion Summary') {
      this.repo_head_name = 'FCH Champion Summary @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "FCHChampionSummary";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'FCH Emergency Homes List') {
      this.repo_head_name = 'FCH Emergency Homes List @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "FCHEmergencyBeds";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'RFCA Placements') {
      this.repo_head_name = 'RFCA Placements @for: ' + this.currentDate;
      this.report_name_pre = "RFCAPlacement";
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'AD Permanency Cases With Aftercare') {
      this.repo_head_name = 'AD Permanency Cases With Aftercare @for: ' + this.currentDate;
      this.report_name_pre = "Ad_Permanency_Cases_with_Aftercare";
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'Electronically Generated PA') {
      this.repo_head_name = 'Electronically Generated PA @for: ' + this.currentDate;
      this.report_name_pre = "GN_ElecSignPlacementAgreement";
      this.get_prioritrized_Reports(1, 100);
    } else if (repo_Name[0] == 'Kinship Specialist') {
      this.report_name_pre = "Kinship_Specialist";
      this.get_prioritrized_Reports(1, 100);
    } else if (parentData.data == 'Quick Pick') {
      this.showFilters4(data + " Quick Pick");
    } else if (data === 'RFC Contract') {
      this.showContract = true;
      this.showNonContract = false;
    } else if (data === 'RFC Non Contract') {
      this.showContract = false;
      this.showNonContract = true;
    } else if (data === 'Rating,RM-TD-UI-Rating') {
      this.pre_report_name = "RM Unusual Incidents - Ratings";
      this.report_name_pre = "RMUnusualIncidentRating";
      this.showUnusual_rating = true;
      this.selectProviderID = [];
      this.selectSponcerID = [];
      this.selectSponcer = true;
      this.selectProvider = true;
      this.provide_all_disable = true;
      this.sponcer_all_disable = true;
      this.provide_totalCount = 0;
      this.provide_initial = 1;
      this.provide_end = 100;
      this.inSponcerIDS = "";
      this.inProviderIDS = "";
      this.inLevelRatingID = "2";
      this.ref_type = "";
      this.dcf_region = "";
      this.subTitle = "";
      this.getRiskmangementReferrals();
      this.getReferralRegionGroup();
      this.getSponcerList();
      this.getProviderList(this.provide_initial, this.provide_end);
      this.date_select = 'IncidentDate';
      this.all_Date_disable = false;
      this.compareValue = '>=';
      this.level_rat = ['2'];



    } else {
      this.pre_report_name = parentData.data + " - " + repo_Name[0];
      if (this.pre_report_name == 'RFC Case Plans - Case Plans - Due to DCF') {
        this.ShowPrimaryFilter();
      } else {
        this.showFilters4(data);
      }
    }
    this.parentReport = parentData.data;
    // this.initial = 1;
    // this.end = 100;
    this.hideFilterLayer4 = false;

    if (data.indexOf(',') > -1) {
      let repoName = data.split(',')
      let req = {
        spName: repoName[1],
        action: "NaN"
      }
      if (repo_Name[0] == 'Provider Events Due' || repo_Name[0] == 'BFCH Provider Certifications' || repo_Name[0] == 'FCH Champion Summary' || repo_Name[0] == 'FCH Emergency Homes List') {
        this.show_pre_define_filter = false;
      } else {
        this.ShowPrimaryFilter();
      }

      // this.getReportsByFilter(req)
    } else if (data.includes('&')) {
      var repo = this.pre_report_name;
      this.pre_report_name = repo.slice(0, -1);
      this.ShowPrimaryFilter();
    }
    this.paginationColumnFilter = []
    if (this.filter3List == data) {
      this.filter3List = '';
      if (data === 'Case Plans - Due') {
        this.hideFilter3 = false;
        this.ShowPrimaryFilter();
      } else {
        this.hideFilter3 = true;
      }
    } else {
      this.hideGroupByFilter = true;
      this.selectedRows = [];
      this.hideFilter3 = false;
      this.hideFilterLayer4 = false;
      this.filter3List = data;
      // this.filterData(data);
    }
    // this.showFilters4(data);
    if (data === 'RF – Number of Children Placed' || data === 'Case Plans - Due and Past Due') {
      this.hideFilter4 = false;
    } else {
      if (this.filterList4.length > 0) {
       if (data === 'Kan-Be-Healthy - Due' || data === 'Kan-Be-Healthy - Due within 14 days' || data === 'Kan-Be-Healthy - Past due' || data === 'Kan-Be-Healthy - All due' || data === 'Kan-Be-Healthy - No KBH Date and KBH Due Date' || data === 'Kan-Be-Healthy - Completed' || data === 'Kan-Be-Healthy - Attached Documents') {
        this.hideFilter4 = false;
      } else {
          this.hideFilter4 = true;
      }
    } else {
        this.hideFilter4 = false;
    }
  }
}


  showFilters4(filter) {
    if (filter === 'Kan-Be-Healthy - Due within 14 days') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_KanBeHealthy_Due14Days_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - Due Within 14 Days'
    } if (filter === 'Case Plans - Due' || filter === 'Case Plans - Due to DCF' || filter === 'Child and Family Profile Due (RFC)' || filter === 'FCH Recruitment Activity') {
      this.hideFilter3 = false;
      this.ShowPrimaryFilter();
      this.hideFilterLayer4 = false;
    } if (filter === 'Kan-Be-Healthy - Past due') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_KanBeHealthy_PastDue_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - Past Due'
    } if (filter === 'RF – Number of Children Placed') {
      this.ShowPrimaryFilter();
      this.hideFilter4 = false;
    } if (filter === 'Kan-Be-Healthy - All due') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_KanBeHealthy_AllDue_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - All Due'
    } if (filter === 'Authorizations Entered') {
      this.ShowPrimaryFilter();
      this.hideFilter4 = false;
    } if (filter === 'Kan-Be-Healthy - Completed') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_KanBeHealthy_Completed_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - Completed'
    } if (filter === 'Case Plans - Due and Past Due') {
      this.ShowPrimaryFilter();
      this.hideFilter4 = false;
    } else if (filter === 'Kan-Be-Healthy - Attached Documents') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_KanBeHealthy_AttachedDoc_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - Attached Documents'
    } else if (filter === 'Progress Note') {
      this.hideFilter3 = false;
      this.ShowPrimaryFilter();
      this.hideFilterLayer4 = false;
      this.pre_report_name = 'TFC Progress Note Completed'
    } else if (filter === 'Kan-Be-Healthy - Due') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_KanBeHealthy_Due_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - Due'
    } else if (filter === 'Progress Note Quick Pick') {
      this.repo_head_name = 'Progress Note Quick Pick @for: ' + this.currentDate;
      this.show_pre_define_filter = false;
      this.report_name_pre = "OKProgressNotePending";
      this.beginEndOnly = true;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter === 'Kan-Be-Healthy - No KBH Date and KBH Due Date') {
      this.ShowPrimaryFilter();
      this.repo_head_name = 'Kan-Be-Healthy - No KBH Date and KBH Due Date @for: ' + this.currentDate;
      this.report_name_pre = "GN_KanBeHealthy_None_Controller";
      this.pre_report_name = 'Kan-Be-Healthy - No KBH Date and KBH Due Date'
    } else if (filter === 'Active Authorizations- Procode') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthActive_Procode";
      this.pre_report_name = 'Active Authorizations- Procode'
    } else if (filter === 'Active Authorizations Due- Procode') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthDue_Procode";
      this.pre_report_name = 'Active Authorizations Due- Procode'
    } else if (filter === 'Open Authorizations- Procode') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthOpen_Procode";
      this.pre_report_name = 'Open Authorizations- Procode'
    } else if (filter === 'Active Authorizations- Placement') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthActive_Placement";
      this.pre_report_name = 'Active Authorizations- Placement'
    } else if (filter === 'Active Authorizations Due- Placement') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthDue_Placement";
      this.pre_report_name = 'Active Authorizations Due- Placement'
    } else if (filter === 'Open Authorizations - Placement') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthOpen_Placement";
      this.pre_report_name = 'Open Authorizations - Placement'
    } else if (filter === 'Active Authorizations- Other Services') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthActive_OtherServices";
      this.pre_report_name = 'Active Authorizations- Other Services'
    } else if (filter === 'Active Authorizations Due- Other Services') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthDue_OtherServices";
      this.pre_report_name = 'Active Authorizations Due- Other Services'
    } else if (filter === 'Open Authorizations - Other Services') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthOpen_OtherServices";
      this.pre_report_name = 'Open Authorizations - Other Services'
    } else if (filter === 'Open Authorizations - Respite') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthOpen_Respite";
      this.pre_report_name = 'Open Authorizations - Respite'
    } else if (filter === 'Active Authorizations- Child Care') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthActive_ChildCare";
      this.pre_report_name = 'Active Authorizations- Child Care'
    } else if (filter === 'Active Authorizations Due- Child Care') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthDue_ChildCare";
      this.pre_report_name = 'Active Authorizations Due- Child Care'
    } else if (filter === 'Open Authorizations - Child Care') {
      this.ShowPrimaryFilter();
      this.report_name_pre = "GN_AuthOpen_ChildCare";
      this.pre_report_name = 'Open Authorizations - Child Care'
    } else {
      this.filter4List = [];
      this.filterReport.map(data => {
        let length = data.length;
        if (data.indexOf(filter) !== -1) {
          this.filter4List.push(data[length - 1])
        }
      });
      this.hideFilterLayer4 = true;
    }
  };
  showFilters6(filter) {
    if (filter.data === 'RFC Referrals - Wichita') {  
      this.show_pre_define_filter = false;
      this.report_name_pre = "RFC_Referrals_Wichita";
      this.pre_report_name = 'RFC Referrals - Wichita';
      this.repo_head_name = 'RFC Referrals - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Open Cases (Today) - Wichita') {  
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Open Cases (Today) - Wichita';
      this.repo_head_name = 'RFC Open Cases (Today) - Wichita @for: ' + this.currentDate;
      this.report_name_pre = "RFC_Open_Cases_Wichita";
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Permanency Cases With Aftercare - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Permanency Cases With Aftercare - Wichita';
      this.report_name_pre = "RFC_Permanency_Cases_Wichita";
      this.repo_head_name = 'RFC Permanency Cases With Aftercare - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Closure Cases - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Closure Cases - Wichita';
      this.report_name_pre = "RFC_Closure_Cases_Wichita";
      this.repo_head_name = 'RFC Closure Cases - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Permanency And Closure Cases - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Permanency And Closure Cases - Wichita';
      this.report_name_pre = "RFC_Permanency_Closure_Wichita";
      this.repo_head_name = 'RFC Permanency And Closure Cases - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Recidivists - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Recidivists - Wichita';
      this.report_name_pre = "RFC_Recidivists_Wichita";
      this.repo_head_name = 'RFC Recidivists - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === "RFC Initial Permanency's - Wichita") {
      this.show_pre_define_filter = false;
      this.pre_report_name = "RFC Initial Permanency's - Wichita";
      this.report_name_pre = "RFC_Initial_Permanency_Wichita";
      this.repo_head_name = "RFC Initial Permanency's - Wichita @for: " + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Contacts This Month - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Contacts This Month - Wichita';
      this.report_name_pre = "RFC_Contacts_Wichita";
      this.repo_head_name = 'RFC Contacts This Month - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Contacts Last Month and This Month - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Contacts Last Month and This Month - Wichita';
      this.report_name_pre = "RFC_Contacts_Month_Wichita";
      this.repo_head_name = 'RFC Contacts Last Month and This Month - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Placements And Costs - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Placements And Costs - Wichita';
      this.report_name_pre = "RFC_Placements_Costs_Wichita";
      this.repo_head_name = 'RFC Placements And Costs - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC Placement Disruptions - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC Placement Disruptions - Wichita';
      this.report_name_pre = "RFC_Placement_Disruptions_Wichita";
      this.repo_head_name = 'RFC Placement Disruptions - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC-NCFC Referrals - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC-NCFC Referrals - Wichita';
      this.report_name_pre = "RFC_NCFC_Referrals_Wichita";
      this.repo_head_name = 'RFC-NCFC Referrals - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC-NCFC Open Cases (Today) - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC-NCFC Open Cases (Today) - Wichita';
      this.report_name_pre = "RFC_NCFC_Cases_Wichita";
      this.repo_head_name = 'RFC-NCFC Open Cases (Today) - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC-NCFC Closed Cases - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC-NCFC Closed Cases - Wichita';
      this.report_name_pre = "RFC_NCFC_Closed_Cases_Wichita";
      this.repo_head_name = 'RFC-NCFC Closed Cases - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC-NCFC Contacts This Month - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC-NCFC Contacts This Month - Wichita';
      this.report_name_pre = "RFC_NCFC_Contacts_Wichita";
      this.repo_head_name = 'RFC-NCFC Contacts This Month - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else if (filter.data === 'RFC-NCFC Contacts Last Month and This Month - Wichita') {
      this.show_pre_define_filter = false;
      this.pre_report_name = 'RFC-NCFC Contacts Last Month and This Month - Wichita';
      this.report_name_pre = "RFC_NCFC_Contacts_Months_Wichita";
      this.repo_head_name = 'RFC-NCFC Contacts Last Month and This Month - Wichita @for: ' + this.currentDate;
      this.get_prioritrized_Reports(1, 100);
    } else {
      this.pre_report_name = filter.data;
      this.ShowPrimaryFilter();
    }
  };
  showFilters5() {
    this.show_pre_define_filter = false;
    this.report_name_pre = "RFCOpenCasesTodayWest";
    this.repo_head_name = 'RFC Open Cases Today West @for: ' + this.currentDate;
    this.beginEndOnly = true;
    this.get_prioritrized_Reports(1, 100);
  }
  reportGenerationlevel4(data) {
    // this.filterList4 = data;
    let repoName = data.split(',')
    this.pre_report_name = repoName[0];
    this.ShowPrimaryFilter();
    // this.spName = repoName[1];
    // let req = {
    //   spName: repoName[1],
    //   action: "NaN"
    // }
    // this.getReportsByFilter(req);
  }

  setFilter3(filter3) {
    this.selectedDataToFilter = [];

    this.columnData = [];

    this.filterColumnSelected = null;

    this.filterOption = 'OR';
    this.filterConditionOption = 'Equals';

    this.tempArray = [];
    this.tempConditionArray = [];
    this.tempSelectedDataToFilter = [];
    this.tempFilterColumnSelected;
    this.displayFilter = [];
    let initial = document.getElementById('initial-count') as HTMLInputElement
    let end = document.getElementById('des-count') as HTMLInputElement
    initial.innerText = this.initial.toString();
    end.innerText = this.end.toString();

    if (isObject(filter3)) {
      this.secondFiltered = this.objectKeys(filter3)[0].split(',')[0] || this.objectKeys(filter3)[0].split(',')[0];
      this.selectedRows = [];
      this.filter3List = filter3;
    } else {
      this.secondFiltered = filter3.split(',')[0] || filter3.split('&')[0];
      this.hideGroupByFilter = true;
      this.selectedRows = [];
      this.filter3List = filter3;
    }
    this.filterData(filter3);
  }


  save() {
    if (this.saveFilterId == null) {
      this.saveNew();
    } else {
      this.updateSavedFilter();
    }
  }

  updateSavedFilter() {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    if (this.FilterName == undefined || this.FilterName == '' || this.FilterName.replace(/\s/g, '').length <= 0 || this.FilterName.match(/^[^a-zA-Z0-9]+$/) !== null) {
      swal(
        'Error!',
        'Please provide a valid filter name!',
        'warning'
      )
    } else {
      loader.style.display = 'block';
      let saveReq = {
        "favoriteFilterId": this.saveFilterId,
        "favoriteFilterName": this.FilterName,
        "favoriteFilterRequest": JSON.stringify(this.saveFilter),
        "userId": localStorage.getItem('UserId'),
        // "userId": 4621,
        "spName": this.spName
      }
      this._report.updateFilter(saveReq).then(data => {
        loader.style.display = 'none';
        if (data.responseStatus) {
          swal(
            'Success',
            'Filter saved successfully.You shall see the saved filter only for this particular report',
            'success'
          )
          this.getFavourites();
        } else {
          swal(
            'Error!',
            'Filter not saved!',
            'warning'
          )
        }
      })
    }
  }

  saveNew() {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    if (this.FilterName == undefined || this.FilterName == '' || this.FilterName.replace(/\s/g, '').length <= 0 || this.FilterName.match(/^[^a-zA-Z0-9]+$/) !== null) {
      swal(
        'Error!',
        'Please provide a valid filter name!',
        'warning'
      )
    } else {
      loader.style.display = 'block';
      let saveReq = {
        "favoriteFilterName": this.FilterName,
        "favoriteFilterRequest": JSON.stringify(this.saveFilter),
        // "userId": localStorage.getItem('UserId'),
        "userId": 4621,
        "spName": this.spName
      }
      this._report.saveFilter(saveReq).then(data => {
        this.saveFilterId = data.favoriteFilter.favoriteFilterId;
        loader.style.display = 'none';
        if (data.responseStatus) {
          swal(
            'Success',
            'Filter saved successfully.You shall see the saved filter only for this particular report',
            'success'
          )
          this.getFavourites();
        } else {
          swal(
            'Error!',
            'Filter not saved!',
            'warning'
          )
        }
      })
    }
  }


  clearDataFromPayload() {
    this.saveFilterId = null;
    this.FilterName = null;
    this.showSave = false;
    let tlpData = {
      "filterHeader": this.tlpDataHeader,
      "filter": this.tlpNameData,
      "beginDate": moment(this._localValues.beginDateOfCurrentMonth).format('YYYY-MM-DD'),
      "endDate": moment(this._localValues.endDateOfCurrentMonth).format('YYYY-MM-DD'),
      "action": 'NaN'
    }
    delete this.data['paginationFilter'];
    this.data['beginPagination'] = 1;
    this.data['endPagination'] = 100;
    delete this.data['equals'];
    delete this.data['between'];
    delete this.data['greaterThanOrEquals'];
    delete this.data['lessThanOrEquals'];
    delete this.data['greaterThan'];
    delete this.data['lessThan'];
    delete this.data['contains'];
    delete this.data['notBetween'];
    /**
 * Need to replace tlpData by this,tlpData
 */
    this.tlpData = tlpData;
    return tlpData;
  }


  reset() {
    let tlpData = this.clearDataFromPayload();
    this.defaultGroupingCondition = 'and';
    delete this.data.filter;
    this.showSave = false;
    if (tlpData && this.tlpNameData !== '') {
      this.resetReportFilterTLP(tlpData)
    } else {
      this.resetReportFilter(this.data)
    }
    this.clearFilter();
  }

  clearFilter() {
    if (this.navigationIsOn == false) {
      this.advanceFiltersTotal = [];
      this.displayFilter2NonString = [];
      this.displayFilter2 = [];
      this.originalArray = [];
      this.originalArrayNonString = [];
      this.newArray = [];
      this.greaterThanArray = [];
      this.lesserThanArray = [];
      this.greaterThanOrEqualsArray = [];
      this.lessThanOrEqualsArray = [];
      this.containsArray = [];
      this.displayGreaterThan = [];
      this.displayLesserThan = [];
      this.displaygreaterThanOrEqualsArray = [];
      this.displaylessThanOrEqualsArray = [];
      this.displayContains = [];
      this.notBetweenArray = [];
      this.displayNotBetweenArray = [];
      this.sortOrder = null;
      this.sortColumn = null;
      this.displayIsEmptyArray = [];
      this.displayIsNotEmptyArray = [];
      this.isEmptyArray = [];
      this.isNotEmptyArray = [];
      this.startingDate = null;
      this.endingDate = null;
      this.startNumber = null;
      this.endNumber = null;
      this.NumberToFilter = null;
      this.DateToFilter = null;
      this.StringToFilter = null;
    }
  }

  removeSort(data) {
    this.headers = [];
    this.rawdata = [];
    this.hideTable = true;
    data.beginPagination = this.initial.toString();
    data.endPagination = this.end.toString();
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this.tlpDataHeader = '';
    this._report.getReportsByFilter(data).then(data => {
      this.totalCount = data.totalCount;
      this.filterConditionOption = 'Equals';
      this.reportGenerated = true;
      // this.HideFilter();
      // this.hideToggle = true;
      setTimeout(() => {
        let currentInput = document.getElementById('currentPage') as HTMLInputElement;
        let initialCount = document.getElementById('user-initial-count') as HTMLElement;
        if (initialCount.innerHTML == '1') {
          currentInput.value = '1';
        }
      }, 1000);

      if (this.tempPage == '') {
        this.noOfRecord = 100
      }

      if (data.responseStatus == true) {
        loader.style.display = 'none';
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        if (this.totalCount < 100) {
          this.end = this.totalCount
        }
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = {
            headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, unSortIcon: true, rowDrag: true,
          }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.tempPage = ''
        this.getFavourites();
        this.onConditionFilterSelected();
        this.navigationIsOn = false;
      } else {
        this.hideLoader = true;
      }
    }).catch(() => {
      loader.style.display = 'none';
    })
  }

  removeSortFromTLP(req) {
    this.headers = [];
    this.rawdata = [];
    req.beginPagination = this.initial.toString();
    req.endPagination = this.end.toString();
    this.showGroupByTable = false;
    this.hideTable = true;
    this.hideLoader = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this._report.getReportsByFilter(req).then(data => {
      this.filterConditionOption = 'Equals';
      // this.HideFilter();
      // this.hideToggle = true;
      this.reportGenerated = true;
      setTimeout(() => {
        let currentInput = document.getElementById('currentPage') as HTMLInputElement;
        let initialCount = document.getElementById('user-initial-count') as HTMLElement;
        if (initialCount.innerHTML == '1') {
          currentInput.value = '1';
        }
      }, 1000);
      if (data.responseStatus == true) {
        loader.style.display = 'none';
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        this.tlpQuery = data.tlpQuery;
        this.totalCount = data.totalCount;
        if (this.totalCount < 100) {
          this.end = this.totalCount
        }
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0];
        this.getFavourites();
        this.onConditionFilterSelected();
        this.navigationIsOn = false;
      } else {
        this.hideLoader = true;
      }
    }).catch(() => {
      loader.style.display = 'none';
    })
  }



  HideFilter() {
    this.hideFilters = true;
    this.hideMore = false;
  }

  getDashBoardLink() {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    if (!this.tlpDataHeader) {
      this._report.getDashBoardLink({ vReportLink: this.spName }).then(data => {
        loader.style.display = 'none';
        if (data.dashBoardLink.length > 0) {
          let result = data.dashBoardLink[0]
          if ((data.responseStatus == true) && (result.dashboard_link !== 'null')) {
            window.open(data.dashBoardLink[0].dashboard_link, "_blank");
          } else {
            swal(
              'Info!',
              'Empty dashboard link found!',
              'info'
            )
          }
        } else {
          swal(
            'Info',
            'No dashboard link found!',
            'info'
          )
        }
      })
    } else {
      this._report.getDashBoardLink({ vReportLink: this.tlpspNameArrayCode }).then(data => {
        loader.style.display = 'none';
        let result = data.dashBoardLink[0]
        if (data.dashBoardLink.length > 0) {
          if ((data.responseStatus == true) && (result.dashboard_link !== 'null')) {
            window.open(data.dashBoardLink[0].dashboard_link, "_blank");
          }
          else {
            swal(
              'Info!',
              'Empty dashboard link found!',
              'info'
            )
          }
        } else {
          swal(
            'Info!',
            'No dashboard link found!',
            'info'
          )
        }
      })
    }
  }

  getDashBoardLinkforDM() {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this._report.getDashBoardLink({ vReportLink: this.spName }).then(data => {
      loader.style.display = 'none';
      if (data.dashBoardLink.length > 0) {
        if (data.responseStatus == true) {
          window.open(data.dashBoardLink[0].dashboard_link, "_blank");
        }
        else {
          swal(
            'Error!',
            'Empty dashboard link found!',
            'warning'
          )
        }
      } else {
        swal(
          'Error!',
          'No dashboard link found!',
          'warning'
        )
      }
    })
  }

  getReport(ev) {
    let filtered: any[] = [];
    let userID = localStorage.getItem('UserId');
    for (let i = 0; i < this.dropdownList.length; i++) {
      let country = this.dropdownList[i];
      if (country.label.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        if (country.label === 'Risk Management (RM)') {
          if (userID == '6' || userID == '129' || userID == '276' || userID == '480'
            || userID == '2385' || userID == '3095' || userID == '14802' || userID == '4621'
            || userID == '5129' || userID == '5130') {
            filtered.push(country);
          } else {
            filtered.splice(filtered.indexOf('Risk Management (RM)'), 1)
          }
        }
        filtered.push(country);
      }
    }
    this.filtered = filtered;
  }

  getSortColumns(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.sortcolumnDropdownList.length; i++) {
      let country = this.sortcolumnDropdownList[i];
      if (country.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filtered = filtered;
  }

  getLayer() {
    this.showOpenFilter = true;
    this.hideFilterOnToggle();
    this.ReportsFilter();
  }



  exportAll(ex: any) {
    let req;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block'
    // if (this.tlpDataHeader) {
    //   req = {
    //     // "spName": this.spName,
    //     // "userId": 4621,
    //     // "tlpQuery": this.tlpQuery,
    //     "userId": parseInt(localStorage.getItem('UserId')) || 14802,
    //     "reportName": this.tlpDataHeader + ' - ' + this.spName,
    //     "fileType": ex,
    //     "filterQuery": this.filterQuery
    //   }

    // } else {
    //   req = {
    //     "spName": this.spName,
    //     // "userId": 4621,
    //     "userId": parseInt(localStorage.getItem('UserId')) || 14802,
    //     "reportName": this.fileName + ' - ' + this.fileNameComplete,
    //     "fileType": ex,
    //     "filterQuery": this.filterQuery
    //   }
    // }


    if (this._router.url === '/reports/live-prioritized') {
      req = {
        "query": this.filterQuery,
        "userId": 14802,
        "reportName": this.repo_head_name,
        "fileType": ex
      }
    } else {
      req = {
        "query": this.filterQuery,
        "userId": parseInt(localStorage.getItem('UserId')) || 14802,
        "reportName": this.repo_head_name,
        "fileType": ex
      }
    }
    this._report.exportReport(req).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
    })
  }

  navigation(action: any) {
    this.homeService.pagination(action, this.totalCount, this.initial, this.end).then(result => {
      this.initial = result[0];
      this.end = result[1];
      if (this.tlpDataHeader) {
        return this.getReportsByFilterTLP(this.data);
      }
      else {
        return this.getReportsByFilter(this.data);
      }
    }

    )
  }

  advanceFilter() {
    let advanceFilterContorl = document.getElementById('advancedFilter') as HTMLElement
    let labelControl = document.getElementById('filter-controller') as HTMLElement
    if (labelControl.innerText === 'Show advanced filter') {
      advanceFilterContorl.style.display = 'block'
      labelControl.innerText = 'Hide advanced filter'
    } else {
      advanceFilterContorl.style.display = 'none'
      labelControl.innerText = 'Show advanced filter'

    }
  }

  onConditionFilterSelected() {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement
    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === this.filterColumnSelected) {
        return checkColumn = result.DATA_TYPE
      }
    })
    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'inline-block'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
      }
    }
    else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          singledateFilter.style.display = 'inline-block'
          singleStringFilter.style.display = 'none'
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block'
          intFilter.style.display = 'none'
          textFilter.style.display = 'none'
          dateFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'none'
          break;
        default:
          dateFilter.style.display = 'none'
          textFilter.style.display = 'none'
          singleIntFilter.style.display = 'none'
          intFilter.style.display = 'none'
          singledateFilter.style.display = 'none'
          singleStringFilter.style.display = 'inline-block'
      }

    }
    this.tempFilterConditionOption = this.filterConditionOption;
  }

  ReportsFilter() {
    if (this._router.url === '/reports/live-prioritized') {
      this.sidenavStatus.emit('true');
      this.displayingFilter = true;
      this.userRightCombinations = [];
      this.userRightCombinations = this.usr_rep_list;
      let first = [];
      let last = [];
      let layer1 = [];
      let layer2 = [];
      let layer3 = [];
      let layer4 = [];
      this.fpReports = [];
      this.filterList = [];
      this.filterList2 = [];
      this.filterList3 = [];
      this.filter4List = [];
      this.filterList4 = [];
      this.userRightCombinations.map(data => {
        let report = data.combination.split('|')
        switch (this.optionSelected.label) {
          case 'Family Preservation (FP)':
            if (data.reportName === 'Family Preservation (FP)') {
              this.filterList = []
              this.fpReports.push(report)
              this.arrayMap(first, last);
            }
            break;
          case 'Psychiatric Residential Treatment (PRTF)':
            if (data.reportName === 'Psychiatric Residential Treatment (PRTF)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Data Management (DM)':
            if (data.reportName === 'Data Management (DM)') {
              this.filterList = [];
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Foster Care Homes (FCH)':
            if (data.reportName === 'Foster Care Homes (FCH)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Oklahoma':
            if (data.reportName === 'Oklahoma') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Risk Management (RM)':
            if (data.reportName === 'Risk Management (RM)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Trend Line Processing':
            if (data.reportName === 'Trend Line Processing') {
              this.filterList = []
              this.fpReports.push(report);
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'OutPatient':
            if (data.reportName === 'OutPatient') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Reintegration Foster Care (RFC)':
            if (data.reportName === 'Reintegration Foster Care (RFC)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;

          case 'Kinship (KIN)':
            if (data.reportName === 'Kinship (KIN)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;

          case 'Operations Management (OM)':
            if (data.reportName === 'Operations Management (OM)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;

          case 'Adoption (AD)':
            if (data.reportName === 'Adoption (AD)') {
              this.filterList = []
              this.fpReports.push(report)
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              })
            }
            break;
          case 'Nebraska':
            if (data.reportName === 'Nebraska') {
              this.filterList = [];
              // this.neb_displayingFilter = true;
              // this.displayingFilter = false;
              this.fpReports.push(report);
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              });
              console.log("this.fpReports>>>>>>", this.fpReports);
            }
            break;
          case 'Juvenile Justice Foster Care (JJFC)':
            if (data.reportName === 'Juvenile Justice Foster Care (JJFC)') {
              this.filterList = [];
              // this.neb_displayingFilter = true;
              // this.displayingFilter = false;
              this.fpReports.push(report);
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              });
              console.log("this.fpReports>>>>>>", this.fpReports);
            }
            break;
          case 'Provider Specifics (PS)':
            if (data.reportName === 'Provider Specifics (PS)') {
              this.filterList = [];
              // this.neb_displayingFilter = true;
              // this.displayingFilter = false;
              this.fpReports.push(report);
              this.fpReports.map((item) => {
                item.map((data, i) => {
                  if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                    first.push(JSON.stringify({ index: i, data: data }))
                    last.push(JSON.stringify({ index: i, data: data, item: item }))
                  }
                })
              });
            }
            break;
        }
      })
      last.map(data => {
        let parse = JSON.parse(data);
        if (parse.index == 0) {
          layer1.push(data);
          this.filterList.push(parse);
          this.hideFilter4 = false;
          console.log("this.filterList1>>>>", this.filterList);

        }
        if (parse.index == 1) {
          layer2.push(data)
          this.filterList2.push(parse);
          this.hideFilter4 = false;
          console.log("this.filterList2>>>>", this.filterList2);
        }
        if (parse.index == 2) {
          if (this.optionSelected.label === 'Reintegration Foster Care (RFC)') {
            layer3.push(data)
            this.filterList3.push(parse);
            this.filterList3.map(itm => {
              console.log("<<<itm>>>>>", itm);
            });
            this.hideFilter4 = false;
            console.log("this.filterList3>>>>", this.filterList3);
          } else {
            layer3.push(data)
            this.filterList3.push(parse);
            this.hideFilter4 = false;
            console.log("this.filterList3>>>>", this.filterList3);
          }
        }
        if (parse.index == 3) {
          layer4.push(data)
          this.filterList4.push(parse);
          this.hideFilter4 = false;
          console.log("this.filterList4>>>>", this.filterList4);
        }
      })
      this.filtersListContract = [];
      this.filtersListNonContract = [];
      this.filtersListContract.push({data: 'RFC Referrals - Wichita'}, {data: 'RFC Open Cases (Today) - Wichita'}, {data: 'RFC Permanency Cases With Aftercare - Wichita'}, {data: 'RFC Closure Cases - Wichita'}, {data: 'RFC Permanency And Closure Cases - Wichita'}, {data: 'RFC Recidivists - Wichita'}, {data: "RFC Initial Permanency's - Wichita"}, {data: "RFC Contacts This Month - Wichita"}, {data: "RFC Contacts Last Month and This Month - Wichita"}, {data: "RFC Placements And Costs - Wichita"}, {data: "RFC Placement Disruptions - Wichita"})
      this.filtersListNonContract.push({data: 'RFC-NCFC Referrals - Wichita'}, {data: 'RFC-NCFC Open Cases (Today) - Wichita'}, {data: 'RFC-NCFC Closed Cases - Wichita'}, {data: 'RFC-NCFC Contacts This Month - Wichita'}, {data: 'RFC-NCFC Contacts Last Month and This Month - Wichita'})

    } else {
      let req = { staffID: parseInt(localStorage.getItem('UserId')) || 14802 }
      let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
      loader.style.display = 'block'
      this._report.getUserDetail(req).then(result => {
        loader.style.display = 'none';
        this.sidenavStatus.emit('true');
        this.displayingFilter = true;
        this.userRightCombinations = [];
        this.userRightCombinations = result.users.predefinedReportUserRights
        let first = [];
        let last = [];
        let layer1 = [];
        let layer2 = [];
        let layer3 = [];
        let layer4 = [];
        this.fpReports = [];
        this.filterList = [];
        this.filterList2 = [];
        this.filterList3 = [];
        this.filter4List = [];
        this.filterList4 = [];
        this.userRightCombinations.map(data => {
          let report = data.combination.split('|')
          switch (this.optionSelected.label) {
            case 'Family Preservation (FP)':
              if (data.reportName === 'Family Preservation (FP)') {
                this.filterList = []
                this.fpReports.push(report)
                this.arrayMap(first, last);
              }
              break;
            case 'Psychiatric Residential Treatment (PRTF)':
              if (data.reportName === 'Psychiatric Residential Treatment (PRTF)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Data Management (DM)':
              if (data.reportName === 'Data Management (DM)') {
                this.filterList = [];
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Foster Care Homes (FCH)':
              if (data.reportName === 'Foster Care Homes (FCH)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Oklahoma':
              if (data.reportName === 'Oklahoma') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Risk Management (RM)':
              if (data.reportName === 'Risk Management (RM)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Trend Line Processing':
              if (data.reportName === 'Trend Line Processing') {
                this.filterList = []
                this.fpReports.push(report);
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'OutPatient':
              if (data.reportName === 'OutPatient') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Reintegration Foster Care (RFC)':
              if (data.reportName === 'Reintegration Foster Care (RFC)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;

            case 'Kinship (KIN)':
              if (data.reportName === 'Kinship (KIN)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;

            case 'Operations Management (OM)':
              if (data.reportName === 'Operations Management (OM)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;

            case 'Adoption (AD)':
              if (data.reportName === 'Adoption (AD)') {
                this.filterList = []
                this.fpReports.push(report)
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                })
              }
              break;
            case 'Nebraska':
              if (data.reportName === 'Nebraska') {
                this.filterList = [];
                // this.neb_displayingFilter = true;
                // this.displayingFilter = false;
                this.fpReports.push(report);
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                });
                console.log("this.fpReports>>>>>>", this.fpReports);
              }
              break;
            case 'Juvenile Justice Foster Care (JJFC)':
              if (data.reportName === 'Juvenile Justice Foster Care (JJFC)') {
                this.filterList = [];
                // this.neb_displayingFilter = true;
                // this.displayingFilter = false;
                this.fpReports.push(report);
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      first.push(JSON.stringify({ index: i, data: data }))
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                  })
                });
                console.log("this.fpReports>>>>>>", this.fpReports);
              }
              break;
            case 'Provider Specifics (PS)':
              if (data.reportName === 'Provider Specifics (PS)') {
                // this.neb_displayingFilter = true;
                // this.displayingFilter = false;
                this.fpReports.push(report);
                this.fpReports.map((item) => {
                  item.map((data, i) => {
                    if (first.indexOf(JSON.stringify({ index: i, data: data })) == -1) {
                      last.push(JSON.stringify({ index: i, data: data, item: item }))
                    }
                   })
                 });
              }
              break;
          }
        })
        last.map(data => {
          let parse = JSON.parse(data);
          if (parse.index == 0) {
            layer1.push(data);
            this.filterList.push(parse);
            this.hideFilter4 = false;
            console.log("this.filterList1>>>>", this.filterList);

          }
          if (parse.index == 1) {
            layer2.push(data)
            this.filterList2.push(parse);
            this.hideFilter4 = false;
            console.log("this.filterList2>>>>", this.filterList2);
          }
          if (parse.index == 2) {
            if (this.optionSelected.label === 'Reintegration Foster Care (RFC)') {
              layer3.push(data)
              this.filterList3.push(parse);
              this.filterList3.map(itm => {
                if (itm.data === 'Case Plans - Due and Past Due') {
                  itm.data = 'Case Plans - Due and Past Due,';
                  console.log("<<<itmIJJJ>>>>>", itm);
                }
                console.log("<<<itm>>>>>", itm);
              });
              this.hideFilter4 = false;
              console.log("this.filterList3>>>>", this.filterList3);
            } else {
              layer3.push(data)
              this.filterList3.push(parse);
              this.hideFilter4 = false;
              console.log("this.filterList3>>>>", this.filterList3);
            }
          }
          if (parse.index == 3) {
            layer4.push(data)
            this.filterList4.push(parse);
            this.hideFilter4 = false;
            console.log("this.filterList4>>>>", this.filterList4);
          }
        })
      })
      this.filtersListContract = [];
      this.filtersListNonContract = [];
      this.filtersListContract.push({data: 'RFC Referrals - Wichita'}, {data: 'RFC Open Cases (Today) - Wichita'}, {data: 'RFC Permanency Cases With Aftercare - Wichita'}, {data: 'RFC Closure Cases - Wichita'}, {data: 'RFC Permanency And Closure Cases - Wichita'}, {data: 'RFC Recidivists - Wichita'}, {data: "RFC Initial Permanency's - Wichita"}, {data: "RFC Contacts This Month - Wichita"}, {data: "RFC Contacts Last Month and This Month - Wichita"}, {data: "RFC Placements And Costs - Wichita"}, {data: "RFC Placement Disruptions - Wichita"})
      this.filtersListNonContract.push({data: 'RFC-NCFC Referrals - Wichita'}, {data: 'RFC-NCFC Open Cases (Today) - Wichita'}, {data: 'RFC-NCFC Closed Cases - Wichita'}, {data: 'RFC-NCFC Contacts This Month - Wichita'}, {data: 'RFC-NCFC Contacts Last Month and This Month - Wichita'})
      this.hideToggle = false;
      this.hideFilters = false;
      this.firstLayer = false;
    }

  }

  FiltergetReportsByFilter(data) {
    this.advanceFilterData = data;
    this.headers = [];
    this.rawdata = [];
    this.hideTable = true;
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.filterQuery = '';
    this._report.getReportsByFilter(data).then(data => {
      this.filterQuery = data.filterQuery;
      this.totalCount = data.totalCount;
      loader.style.display = 'none';
      this.filterConditionOption = 'Equals';
      this.reportGenerated = true;
      this.showSave = true;
      let currentInput = document.getElementById('currentPage') as HTMLInputElement;
      currentInput ? currentInput.value = '1' : null;
      this.initial = 1;
      if (this.totalCount > 100) {
        this.end = 100;
      } else {
        this.end = this.totalCount
      }
      if (data.responseStatus == true) {
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        // this.totalCount = data.totalCount;
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = {
            headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true,
          }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        this.tempPage = ''
        this.onConditionFilterSelected();
      } else {
        this.hideLoader = true;
        swal(
          'Error!',
          'Condition is incorrect..Please reset the filter and try again!',
          'warning'
        )
      }
      this.filterInputsReset()
    })
  }

  arrayMap(first, last) {
    this.fpReports.map((item) => {
      let name = item[0];
      item.map((data, i) => {
        if (first.indexOf(JSON.stringify({ index: i, data: data, name: name })) == -1) {
          first.push(JSON.stringify({ index: i, data: data, name: name }))
          last.push(JSON.stringify({ index: i, data: data, item: item }))
        }
      })
    })
  }

  FiltergetReportsByFilterTLP(req) {
    this.headers = [];
    this.rawdata = [];
    this.showGroupByTable = false;
    this.hideTable = true;
    this.hideLoader = false;
    this.paginationHide = true;
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.filterQuery = '';
    this._report.getReportsByFilter(req).then(data => {
      loader.style.display = 'none';
      this.filterQuery = data.filterQuery;
      this.totalCount = data.totalCount;
      this.filterConditionOption = 'Equals';
      let currentInput = document.getElementById('currentPage') as HTMLInputElement;
      currentInput.value = '1';
      this.initial = 1;
      if (this.totalCount > 100) {
        this.end = 100;
      } else {
        this.end = this.totalCount
      }
      this.reportGenerated = true;
      this.showSave = true;
      if (data.responseStatus == true) {
        this.reportsViewList = data.customReport;
        this.numericColumns = data.dataTypes;
        // this.totalCount = data.totalCount;
        this.tlpQuery = data.tlpQuery;
        this.hideLoader = true;
        this.hideTable = false;
        this.hideLoaderText = true;
        this.rowData = data['customReport']
        this.headers.push(Object.keys(this.rowData[0]))
        this.sortcolumnDropdownList = this.headers[0].filter(function (data, pos, current) {
          return current.indexOf(data) == pos;
        })
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        let test = []
        this.headers[0].forEach(function (result) {
          let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result, rowDrag: true }
          test.push(data)
        })
        this.rawdata.push(test)
        this.columnDefs = this.rawdata[0]
        // this.groupBy = JSON.parse(data.groupBy).reportGroup;
        // if (this.groupBy) {
        //   this.hideGroupByFilter = false;
        // }
        this.onConditionFilterSelected();
      } else {
        this.hideLoader = true;
      }
      this.filterInputsReset();
    })
  }

  // pagesizeNav(event) {
  //   let begin, end;
  //   if (event.keyCode == 13) {
  //     begin = this._pageSize.getPagesizeValues()[0];
  //     end = this._pageSize.getPagesizeValues()[1];
  //     this.initial = begin;
  //     this.end = end;
  //     return this.get_prioritrized_Reports(this.initial, this.end);
  //     // if (this.tlpDataHeader) {
  //     //   return this.getReportsByFilterTLP(this.data);
  //     // }
  //     // else {
  //     //   return this.getReportsByFilter(this.data);
  //     // }
  //   }
  // }

  // pagesize(event) {
  //   this.navigationIsOn = true;
  //   if (event.target.localName == 'img') {
  //     let begin, end;
  //     begin = this._pageSize.getPagesizeValues()[0];
  //     end = this._pageSize.getPagesizeValues()[1];
  //     this.initial = begin;
  //     this.end = end;
  //     return this.get_prioritrized_Reports(this.initial, this.end);
  //     // if (this.tlpDataHeader) {
  //     //   return this.getReportsByFilterTLP(this.data);
  //     // }
  //     // else {
  //     //   return this.getReportsByFilter(this.data);
  //     // }
  //   }
  // }
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.get_prioritrized_Reports(this.initial, this.end);
    }
  }

  getDateFormat(dateInput: any) {
    let year: any, month: any, date: any, hours: any, minutes: any, format: any;
    year = new Date(dateInput).getFullYear();
    month = new Date(dateInput).getMonth();
    date = new Date(dateInput).getDate();
    hours = new Date(dateInput).getHours()
    minutes = '00';
    format = `${year}-${(month + 1)}-${date} ${hours}:${minutes}:00:00`;
    return format;
  }

  selectedGroupingItem(item: any) {
    this.currentOpertaor = '';
    return this.groupingItems.push(item);
  }

  operatorClick(operator: String) {
    this.isOperator = true;
    this.currentOpertaor = operator;
  }

  filterGrouping(selectedFilter: any, filterType: any, condition: any, isTriggedManually: boolean, index: number) {
    if (isTriggedManually) {
      this.collectionOfAnd = [];
      this.collectionOfOR = [];
      this.queryStringAND = '';
      this.queryStringOR = '';
      this.finalQueryString = '';
    }
    let temp1: any, temp2: any, temp3: any, temp4: any, temp5: any, req: any;
    switch (condition) {
      case 'contains':
      case 'Contains':
        condition = 'like';
        selectedFilter.filter = `%${selectedFilter.filter}%`
        break;
      case '=':
      case 'Equals':
        condition = '=';
        break;
      case 'between':
      case 'Between':
        condition = 'between ';
        break;
      case 'notbetween':
      case 'notBetween':
        condition = 'not between ';
        break;
      case '>':
      case 'Greater than':
        condition = '> ';
        break;
      case '>=':
      case 'Greater than or Equals':
        condition = '>=';
        break;
      case '<':
      case 'Lesser than':
        condition = '<';
        break;
      case '>=':
      case 'Lesser than or Equals':
        condition = '<=';
        break;
      case 'is empty':
      case 'isEmpty':
        condition = 'is NULL';
        break;
      case 'is not empty':
      case 'isNotEmpty':
        condition = 'is not NULL';
        break;
    }
    if (filterType === 'or') {
      this.collectionOfOR.push(`(${selectedFilter.column} ${condition} '${selectedFilter.filter}') OR`)
      // let nearItemOR = this.advanceFiltersTotal[index + 1];
      // this.collectionOfOR.push(`(${nearItemOR.column} ${nearItemOR.condition} '${nearItemOR.filter}')`)
    } else {
      this.collectionOfAnd.push(`(${selectedFilter.column} ${condition} '${selectedFilter.filter}') AND`)
      // let nearItemAND = this.advanceFiltersTotal[index + 1];
      // this.collectionOfAnd.push(`(${nearItemAND.column} ${nearItemAND.condition} '${nearItemAND.filter}')`)
    }
    this.queryStringAND = `( ${this.collectionOfAnd.join(" ")} )`;
    this.queryStringOR = `( ${this.collectionOfOR.join(" ")} )`;
    this.queryStringOR;
    this.queryStringAND;
    this.finalQueryString = this.queryStringOR + this.queryStringAND;
    temp1 = this.finalQueryString.replace('AND )', ') ');
    temp2 = temp1.replace(' OR )(', ' OR (');
    temp3 = temp2.replace(' AND )(', ' AND (');
    temp4 = temp3.replace('OR )', ') ');
    temp5 = temp4.replace(')(', '');
    if (isTriggedManually) {
      index;
      if (filterType == 'or') {
        let query: String;
        switch (index) {

          case 0:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 0) {
                query = query.concat(`( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') OR  `);
              } else if (i === 1) {
                query = query.concat(`( ( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') `);
              } else if (i === 2) {
                query = query.concat(`AND ( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') `);
              } else if (i === 3) {
                query = query.concat(`AND ( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') `);
              } else if (i === 4) {
                query = query.concat(`AND ( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') ) )`);
              }
            })
            break;

          case 1:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') ) OR  `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') AND `);
              } else if (i === 2) {
                query = query.concat(` ( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') `);
              } else if (i === 3) {
                query = query.concat(`AND ( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') `);
              } else if (i === 4) {
                query = query.concat(`AND ( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
              }
            })
            break;

          case 2:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 2) {
                query = query.concat(`(  ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') ) OR  `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') AND  `);
              } else if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') AND  `);
              } else if (i === 3) {
                query = query.concat(`( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') `);
              } else if (i === 4) {
                query = query.concat(`AND ( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
              }
            })
            break;
          case 3:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 3) {
                query = query.concat(` AND (  ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') ) OR  `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') AND `);
              } else if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') AND `);
              } else if (i === 2) {
                query = query.concat(`( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') `);
              } else if (i === 4) {
                query = query.concat(`( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
              }
            })
            break;
          case 4:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 4) {
                query = query.concat(`( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') ) OR `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') AND`);
              } else if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') AND  `);
              } else if (i === 2) {
                query = query.concat(`( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') AND  `);
              } else if (i === 3) {
                query = query.concat(`( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') )`);
              }
            })
            break;
        }
        query = query + ')';
        this.expectedQuery = query;
      }
      if (filterType == 'and') {
        let query: String;
        switch (index) {

          case 0:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 0) {
                query = query.concat(`( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') AND  `);
              } else if (i === 1) {
                query = query.concat(`( ( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') `);
              } else if (i === 2) {
                query = query.concat(`OR ( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') `);
              } else if (i === 3) {
                query = query.concat(`OR ( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') `);
              } else if (i === 4) {
                query = query.concat(`OR ( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') ) )`);
              }
            })
            break;

          case 1:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') ) AND  `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') OR `);
              } else if (i === 2) {
                query = query.concat(` ( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') `);
              } else if (i === 3) {
                query = query.concat(`OR ( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') `);
              } else if (i === 4) {
                query = query.concat(`OR ( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
              }
            })
            break;

          case 2:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 2) {
                query = query.concat(`(  ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') ) AND  `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') OR  `);
              } else if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') OR  `);
              } else if (i === 3) {
                query = query.concat(`( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') `);
              } else if (i === 4) {
                query = query.concat(`OR ( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
              }
            })
            break;
          case 3:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 3) {
                query = query.concat(` OR (  ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') ) AND  `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') OR `);
              } else if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') OR `);
              } else if (i === 2) {
                query = query.concat(`( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') `);
              } else if (i === 4) {
                query = query.concat(`( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
              }
            })
            break;
          case 4:
            query = '';
            this.advanceFiltersTotal.filter((item: any, i) => {
              if (i === 4) {
                query = query.concat(`( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') ) AND `);
              } else if (i === 0) {
                query = query.concat(`( ( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') OR`);
              } else if (i === 1) {
                query = query.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') OR  `);
              } else if (i === 2) {
                query = query.concat(`( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') OR  `);
              } else if (i === 3) {
                query = query.concat(`( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') )`);
              }
            })
            break;
        }
        query = query + ')';
        this.expectedQuery = query;
      }
      this.data['filter'] = this.expectedQuery;
    } else {
      this.filterStr = temp5;
      this.groupingRequest = req;
      this.data['filter'] = this.filterStr;

    }

  }



  groupingFilterController(event: any) {
    let data = '';
    this.filterStr = '';
    if (event.checked) {
      this.defaultGroupingCondition = 'or';
      this.advanceFiltersTotal.filter((item: any, i) => {
        if (i === 4) {
          data = data.concat(`( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
        } else if (i === 0) {
          data = data.concat(`( ( ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') OR `);
        } else if (i === 1) {
          data = data.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') OR  `);
        } else if (i === 2) {
          data = data.concat(`( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') OR  `);
        } else if (i === 3) {
          data = data.concat(`( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') OR `);
        }
      })
      this.filterStr = data;
    } else {
      this.defaultGroupingCondition = 'and';
      this.advanceFiltersTotal.filter((item: any, i) => {
        if (i === 4) {
          data = data.concat(`( ${this.advanceFiltersTotal[4].column} ${this.advanceFiltersTotal[4].condition} '${this.advanceFiltersTotal[4].filter}') )`);
        } else if (i === 0) {
          data = data.concat(`( (  ${this.advanceFiltersTotal[0].column} ${this.advanceFiltersTotal[0].condition} '${this.advanceFiltersTotal[0].filter}') AND`);
        } else if (i === 1) {
          data = data.concat(`( ${this.advanceFiltersTotal[1].column} ${this.advanceFiltersTotal[1].condition} '${this.advanceFiltersTotal[1].filter}') AND  `);
        } else if (i === 2) {
          data = data.concat(`( ${this.advanceFiltersTotal[2].column} ${this.advanceFiltersTotal[2].condition} '${this.advanceFiltersTotal[2].filter}') AND  `);
        } else if (i === 3) {
          data = data.concat(`( ${this.advanceFiltersTotal[3].column} ${this.advanceFiltersTotal[3].condition} '${this.advanceFiltersTotal[3].filter}') AND `);
        }
      })
      this.filterStr = data;
      this.data['filter'] = this.filterStr;
    }
  }

  applyGrouping() {
    let singleQuery = '';
    if (this.advanceFiltersTotal.length === 1) {
      let req;
      this.data;
      this.spName;
      this.advanceFiltersTotal.filter((item: any) => {
        singleQuery = `${item.column} ${item.condition} '${item.filter}'`;
        req = {
          action: 'NaN',
          beginPagination: this.initial.toString(),
          endPagination: this.end.toString(),
          spName: this.spName,
          filter: singleQuery
        }
        this.data = req;
      })

    }
    if (this.tlpNameData == '') {
      this.saveFilter = this.data;
      return this.FiltergetReportsByFilter(this.data);
    } else {
      this.saveFilter = this.data;
      return this.FiltergetReportsByFilterTLP(this.data);
    }
  }

  filterInputsReset() {
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement
    let dateFilter = document.getElementById('dateFilter') as HTMLElement
    let intFilter = document.getElementById('intFilter') as HTMLElement
    let textFilter = document.getElementById('textFilter') as HTMLElement
    let end = document.getElementById('des-count') as HTMLInputElement
    this.columnDefs = this.rawdata[0]
    this.tempPage = ''
    this.filterOption = null;
    this.filterColumnSelected = null;
    this.selectedDataToFilter = [];
    this.tempSelectedDataToFilter = [];
    this.tempArray = [];
    this.filterConditionOption = 'Equals';
    this.duplicateTempArray = [];
    this.columnData = [];
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    dateFilter.style.display = 'none'
    textFilter.style.display = 'none'
    intFilter.style.display = 'none'
    singleIntFilter.style.display = 'none'
    singledateFilter.style.display = 'none'
    singleStringFilter.style.display = 'inline-block'
  }


  showBeginDate = false;
  showEndDate = false;
  showProcessDate = false;
  showProcessDateTime = false;
  showReferralType = false;
  showRegion = false;
  DHSshowRegion = false;
  showFisYear = false;
  showProcodes = false;
  ShowPrimaryFilter() {
    this.beginDate = this._localValues.beginDateOfPreviousMonth;
    if (this.pre_report_name === 'RFC OOH Client - MCO Needed') {
      this.endDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
    } else {
    this.endDate = this._localValues.endDateOfPreviousMonth;
    }
    this.dropRegion(this.endDate);

    if (this.pre_report_name === 'FP Staff - Caseload') {
      this.report_name_pre = "FPStaffHierarchy";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus2();
      this.isRFCPlacements = false;
      this.pre_report_content = "All Family Preservation Open Cases and the associated Staff Hierarchy. Caseload by Case Manager, Supervisor, and Area Director can be derived by this report.  Note: This report does not replace the HR staff reporting system but provides essential details for eKidz Reports. Enter a date and select Process to run the report.";
    } else if (this.pre_report_name === 'FP Alone Time Activity') {
      this.report_name_pre = 'FPFaceToFaceAloneTimeRules';
      this.filterStatus3();
      this.isRFCPlacements = false;
      this.pre_report_content = "Includes the latest Family Preservation case activity face to face visit with alone time and also the latest face to face visit without alone time. The report includes indicators and fields that the indcators are based on to reflect the need for alone time depending on the status of the client. Enter a date range then process the report."
    } else if (this.pre_report_name === 'FP Case Activity Face-To-Face Visits - With Alone Time') {
      this.report_name_pre = 'FPFaceToFaceWithAloneTime';
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.filterStatus1();
      this.pre_report_content = "All Family Preservation case activity face to face visits with an indicator for alone time with a client including time spent and notes. Select the region and date range and process the report."
    } else if (this.pre_report_name === 'FP Case Plans-Completed') {
      this.report_name_pre = "FPCasePlansCompleted";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.filterStatus1();
      this.pre_report_content = "All Case Plans COMPLETED within the date range selected below. Select a ReferralType, set the date range and process the report."
    } else if (this.pre_report_name === 'FP Case Plans-Due') {
      this.filterStatus1();
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.report_name_pre = 'FPCasePlansDue';
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = "All Case Plans DUE within the date range selected below. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Family Preservation, In-Home, or Out-Of-Home by selecting the appropriate Referral Type below.";
    } else if (this.pre_report_name === 'Non-Therapy Face-to-Face - All') {
      this.pre_report_name = 'FP Non-Therapy Face-To-Face All';
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.show_all_filter = true;
      this.report_name_pre = 'FP_NonTherapyAllStatus';
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'The Family Preservation Non-Therapy Face-to-Face All report provides a list of those Clients and Staff with Non-Therapy Face-to-Face "In-Process" and "Completed". The report date range selected below is based on the Begin Date of the event.'
    } else if (this.pre_report_name === 'Non-Therapy Face-to-Face - Pending') {
      this.pre_report_name = 'FP Non-Therapy Face-To-Face Pending';
      this.report_name_pre = 'FP_NonTherapyPending';
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus9();
      this.isRFCPlacements = false;
      this.pre_report_content = 'The Family Preservation Non-Therapy Face-to-Face Pending report provides a list of those Clients and Staff with Non-Therapy Face-to-Face "In-Process" and NOT yet "Completed". To eliminate any item from the list the appropriate Non-Therapy Face-to-Face event most be "Completed" in eKidz.'
    } else if (this.pre_report_name === 'Non-Therapy Face-to-Face - Completed') {
      this.pre_report_name = 'FP Non-Therapy Face-to-Face Completed';
      this.filterStatus1();
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.report_name_pre = 'FP_NonTherapyCompleted';
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'The Family Preservation Non-Therapy Face-to-Face Completed report provides a list of those Clients and Staff with Non-Therapy Face-to-Face "Completed" in eKidz. To appear on this list a Non-Therapy Face-to-Face event must have a "Begin Date" within the date range selected below and the Status must be flagged as "Completed".'
    } else if (this.pre_report_name === 'Progress Notes and Non Therapy - Pending') {
      this.report_name_pre = 'ProgressNoteAndNonTherapyPending';
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus9();
      this.isRFCPlacements = false;
      this.pre_report_content = 'The Family Preservation Progress Note and Non-Therapy Pending report provides a list of those Clients and Staff/Therapists with Progress Notes and/or Non-Therapy Face-To-Face "In-Progress" and NOT yet "Completed". To eliminate any item from the list the appropriate Progress Report must be "Completed" in eKidz. To run this report select an approprate Referral Type and Region and press the Process button below.';
    }

    else if (this.pre_report_name === 'FP Assessments - Progress Reports Completed') {
      this.report_name_pre = 'FPProgressReportCompleted';
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Family Preservation Progress Reports completed during the dates selected. Select the appropriate dates, Region, and process the report.'
    } else if (this.pre_report_name === 'FP Open Therapy Referral Events') {
      this.report_name_pre = 'FP_OpenTherapyReferralEvents';
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Family Preservation Open Therapy Referral Events within the dates selected below. This report does not look for the Case to be Open, only the Therapy Referral Event. Select the Dates, Referred Type and Region for processing.'
    } else if (this.pre_report_name === 'Progress Note - Pending') {
      if (this.optionSelected.label === 'OutPatient') {
        this.beginEndOnly = false;
        this.report_name_pre = 'OPSProgressNotePending';
        this.getReferralTypes(this.report_name_pre);
        this.filterStatus9();
        this.showAllFamilyMember = false;
        this.pre_report_content = 'The OPS Progress Note Pending report provides a list of those Clients and Therapists with Progress Notes "In-Process" and NOT yet "Completed". To eliminate any item from the list the appropriate Progress Report most be "Completed" in eKidz. To run this report select an approprate Referral Type and press the Process button below.'
      } else {
        this.showAllFamilyMember = false;
        this.report_name_pre = 'ProgressNotePending';
        this.getReferralTypes(this.report_name_pre);
        this.filterStatus9();
        this.pre_report_content = 'The Family Preservation Progress Note Pending report provides a list of those Clients and Therapists with Progress Notes "In-Process" and NOT yet "Completed". To eliminate any item from the list the appropriate Progress Report most be "Completed" in eKidz. To run this report select an approprate Referral Type and Region and press the Process button below.';
      }
    } else if (this.pre_report_name === 'Progress Note - Completed') {
      if (this.optionSelected.label === 'OutPatient') {
        this.beginEndOnly = false;
        this.report_name_pre = 'OPSProgressNoteCompleted';
        this.getReferralTypes(this.report_name_pre);
        this.filterStatus1();
        this.isRFCPlacements = false;
        this.show_all_filter = true;
        this.pre_report_content = 'The OPS Progress Note Completed report provides a list of those Clients and Therapists with Progress Notes "Completed" in eKidz. To appear on this list a Progress Note must have a "Begin Date" within the date range selected below and the Status must be flagged as "Completed". Run the report by selecting a date range,and Referral Type.'
      } else {
        this.report_name_pre = 'ProgressNoteCompleted';
        this.getReferralTypes(this.report_name_pre);
        this.filterStatus1();
        this.show_all_filter = true;
        this.isRFCPlacements = false;
        this.pre_report_content = 'The Family Preservation Progress Note Completed report provides a list of those Clients and Therapists with Progress Notes "Completed" in eKidz. To appear on this list a Progress Note must have a "Begin Date" within the date range selected below and the Status must be flagged as "Completed". Run the report by selecting a date range, Referral Type, and Region.';
      }

    } else if (this.pre_report_name === 'FP Assessments - Progress Reports Due') {
      this.report_name_pre = "FPProgressReportDue";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Progress Reports due during the dates selected. Select the appropriate dates, Region, and process the report.';
    }
    /////////
    else if (this.pre_report_name === 'RFC Case Activity - Completed Worker and Child Visit') {
      this.report_name_pre = "RFCWorkerChildCompleted";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.show_all_filter = true;
      this.pre_report_content = 'All Out-Of-Home Clients who have Worker Child Visits in Case Activity for the date range selected below. Select a Referral type, set the date and process the report. The report may be processed for Out-Of-Home Clients Only, including Reintegration Foster Care and Family Preservation Out-Of-Home by selecting the appropriate Referral Type below.';
    } else if (this.pre_report_name === 'RFC Case Activity - Missing Worker and Child Visit') {
      this.report_name_pre = "RFCWorkerChildMissing";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.show_all_filter = true;
      this.pre_report_content = 'All Out-Of-Home Clients who are Missing Worker Child Visits in Case Activity for the date range selected below. Select a ReferralType, set the date and process the report. The report may be processed for Out-oF-Home Clients Only, including Reintegration Foster Care and Family Preservation Out-Of-Home by selecting the appropriate Referral Type below.';
    } else if (this.pre_report_name === 'Daily Cost (Out-Of-Home)') {
      this.report_name_pre = "RFCDailyCostOOH";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus2();
      this.isRFCPlacements = false;
      this.pre_report_content = "The Daily Coast may be processed by enterring a date and then selecting Process, Exit if you don't want to process this report.";
    } else if (this.pre_report_name === 'FP Therapy Services - Completed PN') {
      this.report_name_pre = "FPTherapySvc";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Therapy Service logged in Case Activity with a "Completed" Progress Note that falls within the dates selected and Open Therapy Referral Event in eKidz. Select the Referred Type, Region and date range for Therapy Services.';
    } else if (this.pre_report_name === 'FP Contacts - FP Contract and Non-Contract') {
      // this.report_name_pre = "";
      // this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Therpy Service logged in Case Activity with a "Completed" Progress Note that falls within the dates selected and open Therpy Referral Event in eKidz. Select the Referred Type, Region and date range for Therapy Services';
    } else if (this.pre_report_name === 'FP Open Cases') {
      this.report_name_pre = "FPOpenCases";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'All Family Preservation Open Cases within the dates selected below. Select the Referred Type below and determine if the data should include "All Family Members" -- if so please select the appropriate check box below.';
    } else if (this.pre_report_name === 'FP Supervisor Census') {
      this.report_name_pre = "FPCensusForSup";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus2();
      this.showAllFamilyMember = true;
      this.pre_report_content = 'Foramtted for Family Preservation Supervisor use. All Family Preservation Open Cases during the dates selected and Staff assigned to those Cases. Select the Referred Type below and determine if the data include "All Family  Members" -- if so please select the appropriate check box below.';
    } else if (this.pre_report_name === 'FP Initial Mental Health Assessment') {
      this.report_name_pre = "FPInitialMHAssessment";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Referrals within the dates selected below with results for the Initial Mental Health Assessment enterred into ekidz. Select the Referred Type, Region and date range for Referrals.'
    } else if (this.pre_report_name === 'FP Service and Direct Claims') {
      this.report_name_pre = "FPServiceAndDirectClaims";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Direct and Service Claims with in the dates selected below. Select the Referred Type below and process the report.';
    } else if (this.pre_report_name === 'FP Case Activity Face-To-Face Visits') {
      this.report_name_pre = "FPFaceToFaceVisits";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Open Cases requiring Face-to-Face family visits during the dates selected. Report loops thru week by week (Monday thru Sunday) and determines who is required to have a family visit and who actually participated in the Face-to-Face visits. Select the SRS Region and dates below to process.';
    } else if (this.pre_report_name === 'FP Family With Child Out-Of-Home') {
      this.report_name_pre = "FPFamilyChildOOH";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'Pulls all Families with one or more child(ren) who have been removed from home and entered DCF OOH custody during the date range selected. Select the DCF Region and dates below to process';
    } else if (this.pre_report_name === 'FP Intensive Phase Opened') {
      this.report_name_pre = "FPIntensivePhaseOpen";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'All Family Preservation Intensive Phase Opened within the dates selected below. This report is only available for In-Home services. If the data should include "All Family Members" please select the appropriate check box below.'
    } else if (this.pre_report_name === 'FP Families are Maintained at Home') {
      this.report_name_pre = "FPFamiliesAreMaintAtHome";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'Pulls all New Referrals for Family Preservation In-Home Clients one year prior to the select report date range (Example: Selecting Oct 2011 will pull all clients Referred in Oct 2010). The column  titled MainAtHome indicates which families have children placed OOH. Select the SRS Region and dates below to process.'
    } else if (this.pre_report_name === 'FP Referrals') {
      this.report_name_pre = "FPReferrals";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'All Family Preservation Referrals within the dates selected below. Select the Referred Type below and determine if the data should include "ALL Family Members" -- if so please select the appropriate check box below';
    } else if (this.pre_report_name === 'FP Referrals and DCF Withdrawals') {
      this.report_name_pre = "FPReferralsAndWithdrawals";
      this.getReferralTypes(this.report_name_pre);
      this.showAllFamilyMember = true;
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'All Family Preservation Referrals within the dates selected below, to include DCF Widthdrawls. Select the Referred Type below and determine if the data should include "All Family Members" -- if so please select the appropriate check box below.';
    } else if (this.pre_report_name === 'FP Open Cases - Face-To-Face Hours') {
      this.report_name_pre = "FPFaceToFaceHours";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.pre_report_content = 'All Family Preservation Open Cases and Face-to-Face family visit hours during the dates selected. Report only pulls the Case Head and provides number of Face-to-Face visits and hours for each family. Select the DCF Region and dates below to process.';
    } else if (this.pre_report_name === 'FP Intensive Phase Closure') {
      this.pre_report_content = 'All Family Preservation Intensive Phase Closures within the dates selected below. This report is only available for In-Home services. If the data should include "ALL Family Members" check the appropriate box below.';
      this.report_name_pre = "FPIntensivePhaseClosure";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
    } else if (this.pre_report_name === 'FP Family Members Out-Of-Home') {
      this.report_name_pre = "FPFamilyMembersOOH";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Pulls all Family Members in Family Preservation who have been removed from home and entered SRS OOH custody during the date range selected. Select the SRS Region and dates below to process.';
      this.filterStatus1();
      this.show_all_filter = true;
    } else if (this.pre_report_name === 'Bridge Family - BFCH Client Admissions') {
      this.report_name_pre = "OKBFCHClientAdmissions";
      this.pre_report_content = 'All Oklahoma Bridge Foster Care Homes with Clients ADMITTED for the date range selected.  If ADMITTED during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'Bridge Family - BFCH Family Contacts') {
      this.report_name_pre = "OKBFCHFamilyContacts";
      this.pre_report_content = 'All Foster Care Homes Bridge Family Contacts (specifically for Families and not Clients) for the dates specified below. Select the date range below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'Bridge Family - BFCH Closed Providers') {
      this.report_name_pre = "OKBFCHClosedProviders";
      this.pre_report_content = 'All CLOSED Providers in the Oklahoma Bridge Foster Care Homes program for the date range selected. If the Provider CloseDate is within the date range the homes will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'Bridge Family - BFCH Client Discharges') {
      this.report_name_pre = "OKBFCHClientDischarges";
      this.pre_report_content = 'All CLOSED Clients from the Oklahoma Bridge Foster Care Homes program for the date range selected. If CLOSED during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'Bridge Family - BFCH Client Open Placements') {
      this.report_name_pre = "OKBFCHClientOpenPlacements";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'All OPEN Clients in Oklahoma Bridge Foster Care Homes for the date range selected. If OPEN for even a single day during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus1();
      this.show_all_filter = true;
      this.DHSshowRegion = true;
      this.showRegion = false;
    } else if (this.pre_report_name === 'Bridge Family - Staff Assignments') {
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.report_name_pre = "OKStaffAssignments";
      this.showAllFamilyMember = false;
      this.pre_report_content = 'When looking at the caseload information in the Bridge Family Workbook, this report is the detailed breakdown of those numbers. The methodology is mostly similar to the FTE count and caseload count, but are combined for this report. On that note, when ran, you may see Providers without staff assignments, these will appear as counted under "Other", regardless of the number of "Other" staff there may be.';
      this.showBeginDate = false;
      this.showEndDate = true;
      this.showProcessDate = false;
      this.showReferralType = false;
      this.showFisYear = false;
      this.showRegion = false;
    } else if (this.pre_report_name === 'Bridge Family - BFCH Open Providers') {
      this.report_name_pre = "OKBFCHOpenProviders";
      this.pre_report_content = 'All OPEN Providers in Oklahoma Bridge Foster Care Homes program for the date range selected. If OPEN for even a single day during the date range the homes will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'Bridge Family - BFCH Moves') {
      this.report_name_pre = "OKBFCHMoves";
      this.pre_report_content = 'All Oklahoma Bridge Family Client moves within the date range selected below.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Bridge Family - Child Movement Data') {
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.report_name_pre = "OKChildMovementData";
      this.filterStatus6();
      this.pre_report_content = "Pulls data specific for the Bridge Family Workbook that is submitted to DHS on a monthly basis. This is a normal report replica of the procedure that populates the Child Movement Data sheet in the workbook.";
    } else if (this.pre_report_name === 'JJFC Beds') {
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.report_name_pre = "JJFC_Beds";
      this.filterStatus6();
      this.pre_report_content = "All OPEN JJFC Homes as of the selected date below. This report includes Beds Used, Beds Licensed, Prefered Capacity, Licensed Beds Available, and Prefered Beds Available for each of the homes listed.";
    } else if (this.pre_report_name === 'Bridge Family - RF Data Records') {
      this.report_name_pre = "OKRFDataRecords";
      this.filterStatus6();
      this.pre_report_content = "Pulls data specific for the Bridge Family Workbook that is submitted to DHS on a monthly basis. This is a normal report replica of the procedure that populates the RF Data Records sheet in the workbook.";
    } else if (this.pre_report_name === 'Bridge Family - BFCH New Providers') {
      this.report_name_pre = "OKBFCHNewProviders";
      this.pre_report_content = 'All NEW Providers in the Oklahoma Bridge Foster Care Homes program for the date range selected.  If the Provider BeginDate is within the date range the home will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'Bridge Family - BFCH Cancelled Providers') {
      this.report_name_pre = "OKBFCHCancelledProviders";
      this.pre_report_content = 'All Cancelled Providers in the Oklahoma Bridge Foster Care Homes program for the date range selected. If the Provider Begin Date is within the date range the homes will appear in this report. Select the begin date and end date below and process the report.';
      this.filterStatus4();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Sponsorship Opened') {
      this.report_name_pre = "FCHSponsorshipBegan";
      this.pre_report_content = 'All Resource Homes that began SFCS Sponsorship during the date period selected below. Select the dates and process report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Family Contacts') {
      this.report_name_pre = "FCHFamilyContact";
      this.pre_report_content = 'All Foster Care Homes Family Contacts (specifically for Families and not Clients) for the dates specified below. Select the date range below and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Training') {
      this.report_name_pre = "FCHTraining";
      this.pre_report_content = 'All KDHE Training for Foster Care Homes within the dates selected below. Select the dates and process report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Moves') {
      this.report_name_pre = "FCHMoves";
      this.pre_report_content = 'All Foster Care Homes Clients with a change in Placement during the date range selected. The EndDate of the placement is queried to determine the Move date. Select the date range below and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Beds') {
      this.report_name_pre = "ResourceFamilyFCHBeds";
      this.pre_report_content = 'All OPEN Foster Care Homes as of the selected date below. This report includes Beds Used, Beds Licensed, Prefered Capacity, Licensed Beds Available, and Prefered Beds Available for each of the homes listed. Report includes Family Foster Homes and Theraputic Foster Homes that were Open on the date of the report.';
      this.filterStatus6();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Monthly Report Status') {
      this.report_name_pre = "FCHMonthyReportStatus";
      this.pre_report_content = 'All Foster Care Homes with placements and their monthly report status (showing that a monthy report has been uploaded).  This will return monthly data if the report dates span multiple months. Choose the date range below and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Placements Closed and Claim Total') {
      this.pre_report_name = 'FCH Placements Closed and Claim Total'
      this.report_name_pre = "FCHPlacementClosedCosts";
      this.pre_report_content = 'All SFCS Resource Home Placements that were CLOSED during the date range selected below. Select the dates and process report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Open Cases') {
      this.report_name_pre = "FCHOpenCases";
      this.pre_report_content = 'All Foster Care Homes with Open Placements. Any client placed with a home at for a single day or more within the dates selected below. Select the appropriate date range below for all FCH Open Placements during that date range.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Placements and Costs') {
      this.pre_report_name === 'FCH Placements and Costs'
      this.report_name_pre = "FCHPlacementCosts";
      this.pre_report_content = 'All OPEN Foster Care Homes placements within the date range selected below. Select the appropriate dates and process the report. This report includes AUTHORIZED rates for placements.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Sponsorship Closed') {
      this.report_name_pre = "FCHSponsorShipClosed";
      this.pre_report_content = 'All Resource Homes that were SFCS Sponsored and that sponsorship has CLOSED. The Resource Home may or may not remain open but SFCS Sponsorship ended during the date period selected below . Select the dates and process report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Immediate Assessment Needed') {
      this.report_name_pre = "ImmediateAssessmentNeeded";
      this.pre_report_content = 'A list of all SFCS Sponsored Foster Homes and associated Clients, who have New Admissions, Moves, or Respites occuring within the dates specified for the report. Select the date range below and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Discharges') {
      this.report_name_pre = "FCHDischarges";
      this.pre_report_content = 'All Foster Care Homes Discharges (client in an SFCS home placement ends without going to another SFCS home). Select the date range below for all FCH Discharges during that date range.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Client Contacts') {
      this.report_name_pre = "FCHClientContacts";
      this.pre_report_content = 'All Foster Care Homes Family Contacts that included Clients in Open Cases and any Case Activity for the dates specified below. If a client was open for at least a single day during this date range then he/she will pull on the report. Select the date range below and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Resource Family - FCH Admissions') {
      this.report_name_pre = "FCHAdmissions";
      this.pre_report_content = 'All Foster Care Homes Admissions (initial placement with an SFCS home and prior placement was not an SFCS home). Select the date range below for all FCH Admissions during that date range.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Home Study - FCH-NCHS Referrals') {
      this.report_name_pre = "FCHHomeStudyReferrals";
      this.pre_report_content = 'All Foster Care Homes Home Study Referrals within the date range selected below. Select the appropriate dates and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Home Study - FCH-NCHS Open Cases') {
      this.report_name_pre = "FCHHomeStudyOpenCases";
      this.pre_report_content = 'All Foster Care Homes Home Study Open Cases within the date range selected below. Select the appropriate dates and process the report for all open cases.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Data Entry Authorizations - Authorizations Entered') {
      this.report_name_pre = "DM_RFC_authorizationEntered";
      this.pre_report_content = 'All Authorizations entered into eKidz with the exception of Family Preservation program data. The report will populate based on the date range selected and the Date Entered into eKidz. Set the appropriate dates and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - Due') {
      this.report_name_pre = "GN_KanBeHealthy_Due_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy DUE between the dates selected below. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus1();
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - No KBH Date and KBH Due Date') {
      this.report_name_pre = "GN_KanBeHealthy_None_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy either mising KBH Date and KBH Due Date or NO KBH recorded. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus9();
    } else if (this.pre_report_name === 'FCH Home Study - FCH-NCHS Closed Cases') {
      this.report_name_pre = "FCHHomeStudyClosedCases";
      this.pre_report_content = 'Foster Care Homes Home Study Closed Cases';
      this.filterStatus3();
    } else if (this.pre_report_name === 'SFCS Families - Providers Granted Access') {
      this.report_name_pre = "FCHProvidersGrantedAccess";
      this.pre_report_content = 'Providers who have been given access to the Family Matters Website for the date range selected below. Select begin date, end date, and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - Due within 14 days') {
      this.report_name_pre = "GN_KanBeHealthy_Due14Days_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy DUE Within 14 Days. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus9();
    } else if (this.pre_report_name === 'SFCS Families - Provider Lodes') {
      this.report_name_pre = "FCHProviderLodes";
      this.pre_report_content = 'This report lists all Provider Lodes entered into the Family Matters Website during the date range selected below.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - Past due') {
      this.report_name_pre = "GN_KanBeHealthy_PastDue_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy PAST DUE. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus9();
    } else if (this.pre_report_name === 'SFCS Families - Staff Granted Access') {
      this.report_name_pre = "FCHStaffGrantedAccess";
      this.pre_report_content = 'SFCS Staff who have been given access to the Family Matters Website for the date range selected below. Select begin date, end date, and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - All due') {
      this.report_name_pre = "GN_KanBeHealthy_AllDue_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy DUE. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus9();
    } else if (this.pre_report_name === 'OPS Staff Service Summary') {
      this.beginEndOnly = false;
      this.pre_report_content = 'All OPS Client Case Activity services rolled-up into an Excel Pivot-Table summary report by Month/Year and Staff. Run the report by selecting a date range for Services and pressing the Process button.';
      this.show_all_filter = true;
      this.filterStatus1();
      this.report_name_pre = "OPSStaffServiceSummary";
      this.getReferralTypes(this.report_name_pre);
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - Completed') {
      this.report_name_pre = "GN_KanBeHealthy_Completed_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy COMPLETED between the dates selected below. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus1();
    } else if (this.pre_report_name === 'OPS Referrals') {
      this.beginEndOnly = false;
      this.pre_report_content = 'All Outpatient Client Referrals within the date range selected below. Select a Begin Date and End Date for the Referral results needed and process the report.';
      this.show_all_filter = true;
      this.filterStatus1();
      this.report_name_pre = "TD_OPS_Referrals";
      this.getReferralTypes(this.report_name_pre);
    } else if (this.pre_report_name === 'RFC Kan-Be-Healthy - Kan-Be-Healthy - Attached Documents') {
      this.report_name_pre = "GN_KanBeHealthy_AttachedDoc_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Kan-Be-Healthy records with a document attached and uploaded between the dates selected below. Select a ReferralType, the DCF Region, set the date range and process the report.';
      this.filterStatus1();
    } else if (this.pre_report_name === 'OPS Open Cases') {
      this.beginEndOnly = false;
      this.pre_report_content = 'All Outpatient Clients with an Open Case for a single day or more within the date range selected below. Select a Begin Date and End Date for the Open Cases results needed and process the report.';
      this.show_all_filter = true;
      this.filterStatus1();
      this.report_name_pre = "TD_OPS_OpenCases";
      this.getReferralTypes(this.report_name_pre);
    } else if (this.pre_report_name === 'OPS Closures') {
      this.beginEndOnly = false;
      this.pre_report_content = 'All Outpatient Clients Closures within the date range selected below. Select a Begin Date and End Date for the Referral results needed and process the report.';
      this.show_all_filter = true;
      this.filterStatus1();
      this.report_name_pre = "TD_OPS_Closures";
      this.getReferralTypes(this.report_name_pre);
    } else if (this.pre_report_name === 'Unusual Incidents - Incident Type and Ratings') {
      this.report_name_pre = "RMIncidentTypeAndRatings";
      this.pre_report_content = 'All Risk Management Unusual Incidents (INCIDENT DATE) with Incident Types and Ratings are provided as determined by the dates selected below. Incident Descriptions, Recommendations, etc. are not provided in this report. The report is designed to provide quick access to Unusual Incidents without detailed comments and special formatting.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents - Incident Date') {
      this.report_name_pre = "RMIncidentDate";
      this.pre_report_content = 'All Risk Management Unusual Incidents (INCIDENT DATE) provided as determined by the dates selected below. Incident Types, Ratings, Descriptions, etc. are not provided in this report. The report is designed to provide quick access to Unusual Incidents without detailed comments and special formatting.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents - Incident Entered') {
      this.report_name_pre = "RMIncidentEntered";
      this.pre_report_content = 'All Risk Management Unusual Incidents ENTERED (Entered Date) provided as determined by the dates selected below. Incident Types, Ratings, Descriptions, etc. are not provided in this report. The report is designed to provide quick access to Unusual Incidents without detailed comments and special formatting.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents - Incident Contacts') {
      this.report_name_pre = "RMIncidentContacts";
      this.pre_report_content = 'All Risk Management Unusual Incidents (INCIDENT DATE) with CONTACT events as determined by the dates selected below. Incident Types, Ratings, Descriptions, Recommendations, etc. are not provided in this report. The report is designed to provide quick access to Unusual Incidents without detailed comments and special formatting.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents - Completed Follow Up') {
      this.report_name_pre = "RMIncidentCompletedFollowUp";
      this.pre_report_content = 'All Risk Management Unusual Incidents RM FOLLOW-UP (RM Followup Completed Date) provided as determined by the dates selected below. Incident Types, Ratings, Descriptions, etc. are not provided in this report. The report is designed to provide quick access to Unusual Incidents without detailed comments and special formatting.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents - Completed') {
      this.report_name_pre = "RMIncidentCompleted";
      this.pre_report_content = 'All Risk Management Unusual Incidents SUBMITTED (Completed Date) provided as determined by the dates selected below. Incident Types, Ratings, Descriptions, etc. are not provided in this report. The report is designed to provide quick access to Unusual Incidents without detailed comments and special formatting.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents,RM-TD-UI - Types') {
      this.report_name_pre = "RMUnusualIncidentType";
      this.pre_report_content = 'This Risk Management set of reports provides detail and summary numbers for Unusual Incidents, Types and Ratings in an MS Excel Pivot-Table format. Multiple sheets are found formatted by Type, Client, Provider, Sponsor, etc. Select a date range by entering both the Begin and End Dates then Process the reports.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Unusual Incidents,RM-TD-UI - Individuals Involved') {
      this.report_name_pre = "RMIncidentTypeByInvolved";
      this.pre_report_content = 'This Risk Management set of reports provides detail and summary numbers for Individuals Involved in Unusual Incidents via an MS Excel Pivot-Table format. Multiple sheets are found formatted by Person and Program. Select a date range by entering both the Begin and End Dates then Process the reports.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'SFCS Sponsored Kinship Homes - Summary Open Placements') {
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.report_name_pre = "KNOpenPlacementSummary";
      this.pre_report_content = 'Summary report of SFCS Kinship Families with at least one OPEN Client Placement on the date entered for processing. The report includes only the number of clients in open Kinship placements for each home and not the client names. Enter a date and Process the report.';
      this.filterStatus6();
    } else if (this.pre_report_name === 'All Kinship Placements With Client Detail') {
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.report_name_pre = "KNPlacementsWithClientDetail";
      this.pre_report_content = 'All OPEN Kinship Placements with Client details, without filtering on Sponsor. This report includes clients who are in any OPEN Kinship placement no matter which home the Kinship Family is associated with. Enter a date and Process the report.';
      this.filterStatus6();
    } else if (this.pre_report_name === 'RFC Open Cases') {
      this.report_name_pre = "RFCOpenCases";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Reintegration Open Cases within the date range selected below. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.filterStatus1();
    } else if (this.pre_report_name === 'RFCA Placements') {
      this.report_name_pre = "RFCAPlacement";
      this.isRFCPlacements = true;
      this.filterStatus3();
    } else if (this.pre_report_name === 'Electronically Generated PA') {
      this.report_name_pre = "GN_ElecSignPlacementAgreement";
      this.isRFCPlacements = false;
      this.filterStatus3();
      this.pre_report_content = 'All Electronically generated Placement Agreements from the Care Center. This report pulls all Electronic PA by "Date Entered" in the Care Center. Select a date range and process the report.';
    } else if (this.pre_report_name === 'Kinship Specialist') {
      this.report_name_pre = "Kinship_Specialist";
      this.isRFCPlacements = true;
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC OOH Client - MCO Needed') {
      this.report_name_pre = "OM_RFC_MCONeeded";
      this.filterStatus6A();
      this.pre_report_content = 'All Reintegration Clients in an Open OOH Placement who do not have a Managed Care Organization (MCO) assigned. Set the date and process the report.';
    } else if (this.pre_report_name === 'AD Permanency Cases With Aftercare') {
      this.report_name_pre = "Ad_Permanency_Cases_with_Aftercare";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus13();
      this.pre_report_content = 'All Adoption Clients who achieve Permanency with Aftercare between the dates specified below.';
    } else if (this.pre_report_name === 'RFC Contacts') {
      this.report_name_pre = "RFCContacts";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Reintegration Clients in Open Cases and any Case Activity for the dates specified below. If a client was open for at least a single day during this date range then he/she will pull on the report. When no Case Activity is available for the specified date range then those columns will be empty. Select the specific Referral Type below for the appropriate programs contacts.';
      this.filterStatus1();
    } else if (this.pre_report_name === 'RFC Placement Disruptions') {
      this.report_name_pre = "RFCPlacementDisruptions";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'All Out-Of-Home Placement Disruptions within the date range selected below. Select report period dates and process the report.';
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.show_all_filter = true;
    } else if (this.pre_report_name === 'RFC Placements and Costs') {
      this.pre_report_content = 'All Reintegration Clients and their Placements and Authorized Costs. Placements and Costs will pull for all clients with Placement Detail during the date range provided below. Each change in Placement Detail and/or Authorizations will be reflected in this report. Select the specific Referral Type below for the appropriate programs placements.';
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.show_all_filter = true;
      this.report_name_pre = "RFCPlacementAndCost";
      this.getReferralTypes(this.report_name_pre);
    } else if (this.pre_report_name === 'RFC Open Cases (Today) - West') {
      this.pre_report_content = 'Reintegration Out-Of-Home Open Cases.';
      this.report_name_pre = "RFCOpenCasesWest";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus1();
    } else if (this.pre_report_name === 'Surveys - Survey List - In-Home 90 Days of Service') {
      this.pre_report_name = 'Survey List - In-Home 90 Days of Service';
      this.pre_report_content = 'List of all Clients In-Home who reach 90 Days of Service as of the date selected below requiring a Survey. The report may be processed for In-Home Clients Only by setting the appropriate date below and process the report.';
      this.report_name_pre = "OMSurvey90DayServiceFP";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus2();
    } else if (this.pre_report_name === 'Surveys - Survey List - Case Closures') {
      this.pre_report_name = 'Survey List - Case Closures';
      this.report_name_pre = "OMSurveyCaseClosure";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'List of all Clients in OOH Placement who achieve REUNI, GUARD, or ADOPT-FINAL within the date range selected below requiring a Survey. The report may be processed for Out-Of-Home Clients Only, including Reintegration Foster Care and Family Preservation Out-Of-Home by selecting the appropriate Referral Type below.';
      this.filterStatus7();
    } else if (this.pre_report_name === 'Surveys - Survey List - Adults for OOH Youth 90 Days of Service') {
      this.pre_report_name = 'Survey List - Adults for OOH Youth 90 Days of Service';
      this.pre_report_content = 'Adult Survey List for Clients in OOH Placement reaching 90 Days of Service as of the date selected below. The report may be processed for Out-Of-Home Clients Only by selecting the appropriate date below and process the report.';
      this.report_name_pre = "OMSurvey90DayServiceAdult";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus10();
    }
    else if (this.pre_report_name === 'OOH Placement - SRS Monthly Report') {
      this.pre_report_content = 'Clients in OOH Placement as of the date selected below for the SRS Monthly Report. The report may be processed for Out-Of-Home Clients Only, including Reintegration Foster Care and Family Preservation Out-Of-Home by selecting the appropriate Referral Type below.';
      this.report_name_pre = "OM_OOHPlacementSRSMonthly";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus10();
    } else if (this.pre_report_name === 'Surveys - Survey List - OOH Youth 90 Days of Service') {
      this.pre_report_name = 'Survey List - OOH Youth 90 Days of Service'
      this.report_name_pre = "OMSurvey90DayServiceYouth";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.pre_report_content = 'Youth Survey List for Clients in OOH Placement reaching 90 Days of Service as of the date selected below. The report may be processed for Out-Of-Home Clients Only by selecting the appropriate date below and process the report.';
      this.filterStatus10();
    } else if (this.pre_report_name === 'RFC OOH Monthly Report Status') {
      this.report_name_pre = "OMMonthlyReportsStatus";
      this.getReferralTypes(this.report_name_pre);
      this.endDate = new Date();
      this.pre_report_content = 'All Reintegration OOH Clients as of the date selected below. Of the OOH Clients listed on this date, what is the Month Report Status, is it COMPLETE or PENDING? Enter a date and select process below.';
      this.filterStatus8();
    } else if (this.pre_report_name === 'Behavior Assessment - Completed') {
      this.pre_report_content = 'Reintegration clients who have behavorial assessments completed. Enter the assessment date range below and process the report.';
      this.report_name_pre = "AssessmentsCompleted";
      this.isRFCPlacements = false;
      this.filterStatus3();
    } else if (this.pre_report_name === 'Behavior Assessment - Due') {
      this.pre_report_content = 'Reintegration clients who have behavorial assessments completed. Enter the assessment date range below and process the report.';
      this.report_name_pre = "AssessmentsDue";
      this.isRFCPlacements = false;
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Beds - Beds Available - Daily') {
      this.beginDate = this._localValues.beginDateOfCurrentMonth;
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.pre_report_content = 'Returns all information on FCH Available Beds. Will pull daily trend information over a course of the date range. Please enter a day or date range. ';
      this.report_name_pre = "FCHBedsDaily";
      this.filterStatus3();
    } else if (this.pre_report_name === "Target Data - Progress Note") {
      this.pre_report_content = 'The Oklahoma TFC Progress Note Completed report provides a list of those Clients and Therapists with Progress Notes "Completed" in eKidz. To appear on this list a Progress Note must have a "Begin Date" within the date range selected below and the Status must be flagged as "Completed". Run the report by selecting a date range,and Referral Type.';
      this.report_name_pre = "OKProgressNoteCompleted";
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Assessments - Child and Family Profile Due (RFC)') {
      this.report_name_pre = "RFCChildAndFamilyProfileDue";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Child and Family Profile Due for Out-Of-Home Client within the dates selected below. Select a ReferralType, set the dates and process the report. This report may only be processed for Out-Of-Home.';
      this.filterStatus1();
    } else if (this.pre_report_name === 'FP Client Referrals Entered') {
      this.report_name_pre = "FPClientReferral";
      this.pre_report_content = 'All Family Preservation Client Referrals entered into eKidz. The report will populate based on the date range selected and the Date Entered into eKidz. Set the appropriate dates and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH New Admissions - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FCHNewAdmissions";
      this.pre_report_content = 'Process all New Admissions for Foster Care Homes Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Permanency in 12 Months Children Entering FC 24 MO - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "ChildrenInFC24Plus_Perm12Mo";
      this.pre_report_content = 'Process all Out-Of-Home Clients with Permanency Entering Care in 24 or More Months. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH Referrals - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FC-FPOOHReferrals";
      this.pre_report_content = 'Process all New Referrals for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC FP OOH Initial Permanencies - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FC-FPOOHInitial";
      this.pre_report_content = 'Process all Initial Permanencies for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Open Cases - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FCHOpenCases";
      this.pre_report_content = 'Process all Open Cases for Foster Care Homes Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Beds - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FCHBeds";
      this.pre_report_content = 'Process all Foster Care Homes, Beds Used, Available and Preferred. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FCH Family and Client Contacts - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FCHContacts";
      this.pre_report_content = 'Process all Foster Care Home Family and Client Contacts. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FP In Home Contacts - Single Month') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.singlemonth(this.endDate);
      this.report_name_pre = "FPInHomeSingleMonth";
      this.pre_report_content = 'Process all Contacts (Case Activity) for Family Preservation FI and NC-FI (In-Home Clients) within the date range entered. The Begin Date will auto adjust to pull data for a single month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FI In Home Closures - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FPInHomeClosures";
      this.pre_report_content = 'Process all Closures for Family Preservation In-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'New Referrals Entered') {
      this.report_name_pre = "ReferralsEntered";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'All New Referrals entered into eKidz selected by Referral Type. The data pulled is determined by the EnteredDate and the Referral Type into eKidz. Enter a Referral Type and date range below and all New Referrals ENTERED during that range will be returned, select Process to run the report.';
      this.filterStatus7();
    } else if (this.pre_report_name === 'Reports Processing - By Staff') {
      this.report_name_pre = "ReportProcessingByStaff";
      // this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'All New Referrals entered into eKidz selected by Referral Type. The data pulled is determined by the EnteredDate and the Referral Type into eKidz. Enter a Referral Type and date range below and all New Referrals ENTERED during that range will be returned, select Process to run the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC OOH Initial Perm 12 Months Prior Did Not Re-Enter Custody - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "RFCInitialPermanencyReturnOOH";
      this.pre_report_content = 'Process all Initial Permanencies for Reintegration Occurring 12 Months Prior to the Report Processing Date. Of these Clients what Percentage Returned to OOH Placement (became Recidivists). The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC FP OOH Closures and Permanencies - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FC-FPOOHPermAndClosures";
      this.pre_report_content = 'Process all Closures and/or Permanencies for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Case Plans - Case Plans - Due to DCF') {
      this.pre_report_content = 'All Case Plans DUE to DCF within the date range selected below. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.report_name_pre = "RFCCasePlansDueToDCF";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.filterStatus1();
    } else if (this.pre_report_name === 'RFC Case Plans - Case Plans - Due') {
      this.pre_report_content = 'All Case Plans DUE within the date range selected below. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
      this.report_name_pre = "RFCCasePlansDue";
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
    }
    else if (this.pre_report_name === 'PRTF Closures') {
      this.report_name_pre = "PRTFClosures";
      this.pre_report_content = 'PRTF Closures';
      this.filterStatus3();
    }




    else if (this.pre_report_name === 'FCH Discharges - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FCHDischarges";
      this.pre_report_content = 'All Foster Care Homes Discharges (client in an SFCS home placement ends without going to another SFCS home). Select the date range below for all FCH Discharges during that date range.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'OOH Placement in Family Like Setting - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "OOHFamilyLikeSetting";
      this.pre_report_content = 'Process all Out-Of-Home Clients on the last day of each month (EOMDate). What percentage are place in a Family Like Setting? This is a 13 month report. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'FP Families are Maintained at Home - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FPFamiliesMaintAtHome";
      this.pre_report_content = 'Process all New Referrals for Family Preservation In-Home Clients One Year Prior to the Reporting Period and determine which of these families had one or more children in OOH Placement prior to Year End. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'Growing Up In Foster Care - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "GrowingUpInFC";
      this.pre_report_content = 'Process all Out-Of-Home Clients Growing Up in Foster Care. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'Placement Stability 12 thru 23 Months - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "PlacementStability12-23Months";
      this.pre_report_content = 'Process all Out-Of-Home Clients in Custody for 12 months or More but Less Than 24 Monts. What percentage have more than 2 moves? This is a 13 month report. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'Placement Stability 24 Months or More - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "PlacementStability_24Mo";
      this.pre_report_content = 'Process all Out-Of-Home Clients in Custody for 24 months or More. What percentage have more than 2 moves? This is a 13 month report. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'Placement Stability Less Than 12 Months - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "PlacementStability_Less12Mo";
      this.pre_report_content = 'Process all Out-Of-Home Clients in Custody for less than 12 months. What percentage have more than 2 moves? This is a 13 month report. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'Timely Adoption Average Months - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "TimelyROCAdopt";
      this.pre_report_content = 'Process all Out-Of-Home Clients who were Released of SRS Custody for Reunification or Living With a Relative. Determine the average number of months that clients were in custody. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    }
    else if (this.pre_report_name === 'Timely Reunification - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "TimelyROCReint_2015";
      this.pre_report_content = 'Process all Out-Of-Home Clients who were Released of SRS Custody for Reunification or Living With a Relative. Determine which of these clients were ROC within 12 Months of Referral. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Permanency in 12 Months Children Entering FC - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "ChildrenEnteringCare_Perm12Mo";
      this.pre_report_content = 'Process all Out-Of-Home Clients with Permanency Entering Care in Less Than 12 Months. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Permanency in 12 Months Children Entering FC 12-23 MO - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "ChildrenInFC12to23_Perm12Mo";
      this.pre_report_content = 'Process all Out-Of-Home Clients with Permanency Entering Care in 12 to 23 Months. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Timely Reunification Entry Cohort - SFY Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "TimelyROCReintSFY";
      this.pre_report_content = 'Process all Out-Of-Home Clients who were Released of SRS Custody for Reunification or Living With a Relative. Determine the average number of months that clients were in custody. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Progress Towards Adoption ROC for Adoption - SFY Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "AdoptionProgress17PlusMoAdoptedSFY";
      this.pre_report_content = 'Process this report for children in care 17+ months, Released from Custody for Adoption.  Children in foster care on July 1st who have been in care for 17 continuous  months or longer. Who then were Released from Custody during the state fiscal year (SFY), excluding those children who were discharged during the reporting  period for reasons of reunification, living with relative, or permanent custodianship.  The State Fiscal Year is July-Jun, which is the reporting period for this report. Select the report enddate and process for the SFY report period.';
      this.filterStatus3();

      var endDate = this._localValues.stringFormatDate(this.endDate);
      var endDateCol = endDate.split("-");
      console.log('endDateCol>>>>', endDateCol);
      if (parseInt(endDateCol[1]) < 7) {
        var beginDateYear = parseInt(endDateCol[0]) - 1;
        var beginDate = "07-01-" + beginDateYear;
        this.beginDate = new Date(beginDate);
      } else {
        var beginDateYear = parseInt(endDateCol[0]);
        var beginDate = "07-01-" + beginDateYear;
        this.beginDate = new Date(beginDate);
      }

    } else if (this.pre_report_name === 'FP Families are Maintained at Home Post Closure - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FamiliesMaintAtHomePostClosure";
      this.pre_report_content = 'Process all Closures for Family Preservation In-Home Clients One Year Prior to the Reporting Period and determine which of these families did NOT have a child OOH within 365 days of closure. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH New Placements - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FC-FPOOHNewPlacements";
      this.pre_report_content = 'All Out-of-Home Clients who experience a new placement event. This report produces data for a 13 month period. Set the Report End Date and Process.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Placement Referral Activity - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "PlacementReferralActivity";
      this.pre_report_content = 'Process all Out-Of-Home Placement Referral Activity as of the END OF EACH MONTH for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH Open Cases - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FC_FPOOHOpenCases";
      this.pre_report_content = 'Process all Opens (OOH and Aftercare) for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FP In-Home Face-To-Face Visits - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FPInHomeFaceToFaceVisits";
      this.pre_report_content = 'All In-Home Clients who are within 60 days of Intensive Phase and remain open. Weekly evaluation of each of these clients to determine who has and has not had a Face-to-Face Visit. This report is only valid for 7/4/2011 forward. This report produces data for a 13 month period, if available. Set the Report End Date and Process.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Achieving Permanency Legally Available and ROC Under Age 18 - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "PermanencyLegallyAvailableBirthday";
      this.pre_report_content = 'Process all Out-Of-Home Clients who were Released of SRS Custody for Reunification or Living With a Relative. Determine the average number of months that clients were in custody. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FI In-Home Intensive Phase Closures - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "IntensivePhaseClosure";
      this.pre_report_content = 'Process all Intensive Phase Closures for Family Preservation In-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FI In-Home New Referrals - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FIInHomeReferrals";
      this.pre_report_content = 'Process all New Referrals for Family Preservation In-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH Worker and Child Visits - FFY Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "WorkerChildVisits";
      this.pre_report_content = 'Process all Out-Of-Home Clients for Reintegration FC and Family Preservation and determine if Worker/Child Visits have been completed in-line with Federal Fiscal Year (FFY) and Encounter Data standards. The Begin Date will auto adjust to pull data for FFY reporting period (Oct thru Sep). Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FI In-Home Open Cases - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FIInHomeOpenCases";
      this.pre_report_content = 'Process all Open Cases for Family Preservation In-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP Out-Of-Home Placements - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FC-FP_OOHPlacement";
      this.pre_report_content = 'Process all Out-Of-Home Placements as of the END OF EACH MONTH for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH Contacts - Single Month') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.singlemonth(this.endDate);
      this.report_name_pre = "FC-FPOOHContacts";
      this.pre_report_content = 'Process all Contacts (Case Activity) for Reintegration FC and Family Preservation FO (OOH Clients) within the date range entered. The Begin Date will auto adjust to pull data for a single month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Placement Stability - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "PlacementStability";
      this.pre_report_content = 'Process all Out-Of-Home Clients who are not yet Released of Custody. What percentage have more than 2 moves? This is a 13 month report. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FP Families are Engaged Timely - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "FPFamiliesEngaged";
      this.pre_report_content = 'Process all New Referrals for Family Preservation In-Home Clients and determine which families have engaged in services via an Initial Case Plan. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FP In-Home 45 Day Case Read - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "CaseReadScores_Quarterly";
      this.pre_report_content = 'All In-Home Clients who have 45 Day Case Reads recorded during the date range selected. This report is only valid for 1/1/2010 forward. This report produces data for a 13 month period, if available. Set the Report End Date and Process.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH Placement Kinship Relative etc - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "KinshipRelativeAPIC";
      this.pre_report_content = 'Process all Out-Of-Home Kinship, Relative, Agency Approved, and Informal Care Placements for Reintegration FC and Family Preservation Out-Of-Home Clients. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Timely Reunification Average Months - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "TimelyROCReint_2009";
      this.pre_report_content = 'Process all Out-Of-Home Clients who were Released of SRS Custody for Reunification or Living With a Relative. Determine the average number of months that clients were in custody. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Timely Adoption - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "TimelyAdopt";
      this.pre_report_content = 'Process all Out-Of-Home Clients who were Released of SRS Custody for Reunification or Living With a Relative. Determine the average number of months that clients were in custody. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Re-Entry Into Foster Care - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "ReEntryIntoFC";
      this.pre_report_content = 'Process all Out-Of-Home Clients who Re-Entered Into Foster Care. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Same School - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "SameSchool";
      this.pre_report_content = 'Out-Of-Home Clients who are 6 years old or more on the last day of each month - are clients attending their home school (the school they were attending when they came into custody?This is a 13 month report. The Begin Date will auto adjust to pull data for a 13 month period. Set the End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Progress Towards Adoption Legally Available and Finalized - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "LegallyAvailableROC";
      this.pre_report_content = 'Process this report for clients with Progress Towards Adoption. Adoption in less than 12 months, once child is legally free.  Children in foster care in the report period who became legally free for adoption in that same report period. Select the report period End Date and Process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Progress Towards Adoption Legally Available - 6 Month SFY Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "AdoptionProgress17PlusMoLegallyAvailSFY";
      this.pre_report_content = 'Process this report for children in care 17+ months, achieve legal freedom.  Children in foster care on July 1st who have been in care for 17 continuous  months or longer, and who were not legally free for adoption prior to that day. Who then became legally free  during the 6 months of that same Fiscal Year excluding those children who were discharged in that 6 month   period for reasons of reunification, living with relative, or permanent custodianship.  The State Fiscal Year is July-Jun but this is a 6 month reporting period. Select the report enddate and process for the associated 6 month SFY report period.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC OOH Recidivists Placement Costs - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "RFC_OOH_RecidivistsPlacementCosts";
      this.pre_report_content = 'All Recidivists Clients in Out-of-Home placements and their Placement Costs during the date range selected. This report produces data for a 13 month period, if available. Set the Report End Date and Process.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC OOH Placement Costs - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "RFC_OOHPlacementCosts";
      this.pre_report_content = 'All Out-of-Home Clients and their Placement Costs during the date range selected. This report produces data for a 13 month period, if available. Set the Report End Date and Process.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FC-FP OOH Sibling Split Review Due Within 90 Day') {
      this.endDate = this._localValues.endDateOfCurrentMonth;
      this.report_name_pre = "Due90Days_SibSplits";
      this.filterStatus6();
      this.pre_report_content = 'All Out-of-Home Clients and their Placement Costs during the date range selected. This report produces data for a 13 month period, if available. Set the Report End Date and Process.';
    } else if (this.pre_report_name === 'FC OOH Quarterly Case Read - 13 Month Trend') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "OOHCaseReadScores";
      this.pre_report_content = 'All Out-of-Home Clients and their Placement Costs during the date range selected. This report produces data for a 13 month period, if available. Set the Report End Date and Process.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'FP Contacts') {
      this.report_name_pre = "FPContacts";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus1();
      this.pre_report_content = 'All Family Preservation Contacts within the dates selected below. Select the appropriate Referral Type and process the report for all Client Case Activity.';
    } else if (this.pre_report_name === 'RFC Permanency and Closure Cases') {
      this.report_name_pre = "RFC_PermAndClosures";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.filterStatus1();
      this.pre_report_content = 'All Reintegration Cases that have achieved Permanency and/or Closure within the date range selected below. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriated Referral Type below.';
    } else if (this.pre_report_name === 'RFC Staff-Caseload') {
      this.report_name_pre = "RFC_StaffCaseload";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus2();
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Reintegration Open Cases and the associated Staff Hierarchy. Case Load by Case Manager, Supervisor, and Area Director can be derived by this report.  Note: This report does not replace the HR staff reporting system but provides essential details for eKidz Reports. Enter a date and select Process to run the report.';
    } else if (this.pre_report_name === 'RFC Permanency with Aftercare') {
      this.report_name_pre = "RFC_PermWithAftercare";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.isRFCPlacements = false;
      this.filterStatus1();
      this.pre_report_content = 'All Reintegration Cases that have achieved Permanency with Aftercare within the date range selected below (Closures Not Included). The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify the program needed by selecting the appropriate Referral Type below.';
    } else if (this.pre_report_name === 'RFC Referrals by SFCS Referral Date') {
      this.report_name_pre = "TD_Reintegration_Referrals_SFCSReferralDate_Controller";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus1();
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Out-Of-Home Referrals within the date range selected below. This report pulls clients based on their SFCS Referral Date -- Out-of-home referral to SFCS. Select the processing dates, referral types and region prior to processing.';
    } else if (this.pre_report_name === 'RFC OOH Placement Changes') {
      this.report_name_pre = "OM_RFC_OOH_PlacementChanges";
      this.getReferralTypes(this.report_name_pre);
      this.show_all_filter = true;
      this.filterStatus1();
      this.pre_report_content = 'All Reintegration OOH Client with a Placement Change during the date range selected below.';
    } else if (this.pre_report_name === 'FCH Recruitment - FCH Recruitment Activity') {
      this.report_name_pre = "FCH_RecruitmentActivity";
      this.show_all_filter = true;
      this.filterStatus3();
      this.pre_report_content = 'Pulls Recruitment Activity within the date range selected below.';
    } else if (this.pre_report_name === 'FP Intensive  Phase reopen') {
      this.report_name_pre = "IntensivePhaseReopened";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'All Family Preservation Intensive Phase ReOpened after the first Intensive Phase Closure. Any case that has ReOpened the Intensive Phase during the dates specified below will be reflected in the report. This report is only available for In-Home services. If the data should include "ALL Family Members" check the appropriate box below.';
    } else if (this.pre_report_name === 'FP Family members out of home') {
      this.report_name_pre = "FP_FamilyMembersOOH";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'Pulls all Family Members in Family Preservation who have been removed from home and entered SRS OOH custody during the date range selected. Select the SRS Region and dates below to process.';
    } else if (this.pre_report_name === 'FP Families are maintained at home - post closure') {
      this.report_name_pre = "FP_FamiliesMaintAtHomePostClosure";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = false;
      this.pre_report_content = 'Pulls all New Referrals for Family Preservation In-Home Clients one year prior to the selected report date range (Example: Selecting Oct 2011 will pull all clients Referred in Oct 2010). The column titled MaintAtHome indicates which families have children placed OOH. Select the SRS Region and dates below to process.';
    } else if (this.pre_report_name === 'Recent  Review') {
      this.beginDate = new Date();
      this.report_name_pre = "OM_SibSplits_RecentReview";
      this.filterStatus11();
      this.show_all_filter = true;
      this.pre_report_content = 'ALL Sibling Splits on the date selected and most recent Sibling Split Review. Each individual client is listed when not placed with other siblings in out-of-home placement. Select a date and process the report.';
    } else if (this.pre_report_name === 'Past Due  or Within 30 days') {
      this.beginDate = new Date();
      this.report_name_pre = "OM_SibSplits_Due30Days";
      this.filterStatus11();
      this.show_all_filter = true;
      this.pre_report_content = 'ALL Sibling Splits on the date selected and Past Due or Due within 30 Days. Each individual client is listed when not placed with other siblings in out-of-home placement. Select a date and process the report.';
    } else if (this.pre_report_name === 'Quarterly Case Reads') {
      this.report_name_pre = "OM_CaseReadScores_Quarterly";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All Reintegration Quarterly Case Reads for the date range selected below.';
    } else if (this.pre_report_name === 'AD Transfer to  Adoption Checklist') {
      this.report_name_pre = "AD_TransferToAdoption";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = false;
      this.pre_report_content = 'All Open Reintegration Clients with an adoption case plan and both parental termination statuses are entered and one is within the report date range. The data in this report corresponds with the information entered in the Transfer to Adoption Unit Checklist form. Select the report options below to process the report.';
    } else if (this.pre_report_name === 'Adoption Events') {
      this.report_name_pre = "AD_AllEvents";
      this.filterStatus12();
      this.show_all_filter = true;
      this.showAllFamilyMember = false;
      this.pre_report_content = 'All events for timely adoption, including dates between following the signing of the Adoption Packet. The report returns monthly data from the begin date to the end date based on the Referral Date and if finalization has occurred, it falls within the respective month. Choose a date range and Region and process the report.';
    } else if (this.pre_report_name === 'NE FCH Family Contacts') {
      this.report_name_pre = "NE_FCH_FamilyContact";
      this.pre_report_content = 'All Nebraska Foster Care Homes Family Contacts (specifically for Families and not Clients) for the dates specified below. Select the date range below and process the report.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'NE FCH Placements and Costs (Authorized)') {
      this.report_name_pre = "NE_FCH_PlacementCosts";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All OPEN Nebraska Foster Care Home placements within the date range selected below. Select the appropriate dates and process the report. This report includes AUTHORIZED rates for placements.';
    } else if (this.pre_report_name === 'NE FCH Family Beds') {
      this.endDate = new Date();
      this.filterStatus6();
      this.report_name_pre = "NE_FCH_FCHBeds";
      this.show_all_filter = true;
      this.pre_report_content = 'All OPEN Nebraska Foster Care Homes as of the selected date below. This report includes Beds Used, Beds Licensed, Prefered Capacity, Licensed Beds Available, and Prefered Beds Available for each of the homes listed. Select the date range below and process the report.';
    } else if (this.pre_report_name === 'AD Legally Availible Clients') {
      this.report_name_pre = "AD_LegallyAvailable";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = false;
      this.pre_report_content = 'All Adoption Clients with a Legally Available Date between the dates specified.';
    } else if (this.pre_report_name === 'AD Open Cases') {
      this.report_name_pre = "AD_OpenCases";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = false;
      this.pre_report_content = 'All Adoption Clients in Open Cases for the dates specified below. If a client was open for at least a single day during this date range then he/she will pull on the report.';
    } else if (this.pre_report_name === 'AD APA Signed') {
      this.report_name_pre = "AD_APASigned";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = false;
      this.pre_report_content = 'All Adoption Clients with an APA Signed within the dates specified below.';
    } else if (this.pre_report_name === 'Metric – Target Data - RF – Number of Children Placed') {
      this.pre_report_name = 'RF - Number of Children Placed (New Referrals)';
      this.showFisYear = true;
      this.showBeginDate = false;
      this.showEndDate = false;
      this.showProcessDate = false;
      this.showReferralType = false;
      this.showRegion = false;
      this.DHSshowRegion = false;
      this.report_name_pre = "OK_Metric_NewPlacements";
      this.getFinanceYears();
      this.pre_report_content = 'All Bridge Home - Oklahoma new placements per month/subcontrator. The Placement must be the first for a Client Referral and the [Begin Date] must fall within the month reported.';
    } else if (this.pre_report_name === 'NE FCH Client Referrals') {
      this.report_name_pre = "NE_ClientReferrals";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All Nebraska Foster Care Clients NEW REFERRALS for the date range selected.  If REFERRED during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'NE FCH Client Open Cases') {
      this.report_name_pre = "NE_ClientOpenCases";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All OPEN Clients in Nebraska Foster Care Homes for the date range selected. If OPEN for even a single day during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'NE FCH Client Contacts') {
      this.report_name_pre = "NE_ClientContacts";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All Nebraska Client Contacts that included Clients in Open Cases and any Case Activity for the dates specified below. If a client was open for at least a single day during this date range then he/she will pull on the report. Select the date range below and process the report.';
    } else if (this.pre_report_name === 'NE FCH Client Admissions') {
      this.report_name_pre = "NE_Home_Admissions";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All Nebraska Foster Care Homes with Clients ADMITTED for the date range selected.  If ADMITTED during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'NE FCH Client Closures') {
      this.report_name_pre = "NE_ClientClosureCases";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All CLOSED Clients from the Nebraska Foster Care Homes program for the date range selected. If CLOSED during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
    }
    else if (this.pre_report_name === 'SFCS Families - Provider LogIn Activity') {
      this.report_name_pre = "FMW_ProviderLogInReport";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'This report list all Providers who have Logged Into the Family Matters Website during the date range selected below.';
    }
    else if (this.pre_report_name === 'SFCS Families - Staff LogIn Activity') {
      this.report_name_pre = "FMW_StaffLogInReport";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'This report list all Staff who have Logged Into the Family Matters Website during the date range selected below.';
    } else if (this.pre_report_name === 'FP Closed Cases') {
      this.report_name_pre = 'FPClosedCases';
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus1();
      this.show_all_filter = true;
      this.showAllFamilyMember = true;
      this.pre_report_content = 'All Family Preservation Closed Cases within the dates selected below. Select the Referred Type below and determine if the data should include "ALL Family Members" -- if so please select the appropriate check box below.';
    } else if (this.pre_report_name === 'FP Staff Hierarchy - Supervisor') {
      this.endDate = new Date();
      this.report_name_pre = "FP_StaffHierarchy_Supervisor";
      this.filterStatus6();
      // this.report_name_pre = "FP_StaffHierarchy_Supervisor";
      // this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'Includes Family Preservation Supervisors and the staff who report directly to the Supervisors. Note: This report does not replace the HR staff reporting system but provides essential details for eKidz Reports. Enter a date and select Process to run the report.';
    } else if (this.pre_report_name === 'NE FCH Closed Providers') {
      this.report_name_pre = "NE_FCHClosedProviders";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All CLOSED Providers in the Nebraska Foster Care Homes program for the date range selected. If the Provider CloseDate is within the date range the homes will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'NE FCH Open Providers') {
      this.report_name_pre = "NE_FCHOpenProviders";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All OPEN Providers in Nebraska Foster Care Homes program for the date range selected. If OPEN for even a single day during the date range the homes will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'NE FCH Client Placements') {
      this.report_name_pre = "NE_ClientPlacement";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All OPEN Clients in Nebraska Foster Care Homes for the date range selected. If OPEN for even a single day during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'JJFC Placements and Costs') {
      this.report_name_pre = "JJFC_PlacementCosts";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All OPEN Juvenile Justice Foster Care placements within the date range selected below. Select the appropriate dates and process the report. This report includes AUTHORIZED rates for placements.';
    } else if (this.pre_report_name === 'NE FCH Client Discharges') {
      this.report_name_pre = "NE_ClientDischarges";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All CLOSED Clients from the Nebraska Foster Care Homes program for the date range selected. If CLOSED during the date range the clients will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'NE FCH New Providers') {
      this.report_name_pre = "NE_FCHNewProviders";
      this.filterStatus3();
      this.show_all_filter = true;
      this.pre_report_content = 'All NEW Providers in the Nebraska Foster Care Homes program for the date range selected.  If the Provider BeginDate is within the date range the home will appear in this report. Select the begin date and end date below and process the report.';
    } else if (this.pre_report_name === 'Success Indicator - Completed 12th grade') {
      this.beginDate_disable = true;
      this.endDate = new Date();
      this.beginDate = this._localValues.previous13month(this.endDate);
      this.report_name_pre = "Trend2016_SuccessIndicator_Completed12thGrade";
      this.pre_report_content = 'Children who have discharged to independent living or AWOL with an indicator showing if they have completed 12th grade. Select the date range for the report';
      this.filterStatus3();
    } else if (this.pre_report_name === 'RFC Case Plans - Case Plans - Due and Past Due') {
      this.endDate = new Date();
      this.report_name_pre = "RFCCasePlansPastDue";
      this.getReferralTypes(this.report_name_pre);
      this.filterStatus2A();
      this.isRFCPlacements = false;
      this.pre_report_content = 'All Case Plans DUE and PAST DUE piror to the date selected below and NOT COMPLETED. Select a ReferralType, set the date range and process the report. The report may be processed for ALL Out-Of-Home, including Reintegration and Family Preservation, or specify Reintegration or Family Preservation by selecting the appropriate Referral Type below.';
    } else if (this.pre_report_name === 'Active Authorizations- Procode') {
      this.pre_report_content = 'Authorizations By PROCODE for at least a single day within the date range selected below and Active. The report may be processed for Out-Of-Home Client (Reintegration and Family Preservation) or Non-Contract Foster Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
      this.report_name_pre = "GN_AuthActive_Procode";
      this.getAllProcodes();
      this.isRFCPlacements = false;
      this.filterStatus14();
    } else if (this.pre_report_name === 'Active Authorizations Due- Procode') {
      this.pre_report_content = 'Authorizations By PROCODE open for at least a single day within the date range selected below, Active and Due during this period. The report may be processed for Out-Of-Home Client (Reintegration and Family Preservation) or Non-Contract Foster Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
      this.report_name_pre = "GN_AuthDue_Procode";
      this.getAllProcodes();
      this.isRFCPlacements = false;
      this.filterStatus14();
    } else if (this.pre_report_name === 'Open Authorizations- Procode') {
      this.pre_report_content = 'Authorizations By PROCODE open for at least a single day within the date range selected below. The report may be processed for Out-Of-Home Client (Reintegration and Family Preservation) or Non-Contract Foster Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
      this.report_name_pre = "GN_AuthOpen_Procode";
      this.getAllProcodes();
      this.isRFCPlacements = false;
      this.filterStatus14();
    } else if (this.pre_report_name === 'Placement Authorizations - Active Authorizations- Placement') {
      this.pre_report_name = 'Active Authorizations- Placement';
      this.report_name_pre = "GN_AuthActive_Placement";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Placement Authorizations open for at least a single day within the date range selected below and Active. The report may be processed for Out-Of-Home Client (Reintegration and Family Preservation) or Non-Contract Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus7();
    } else if (this.pre_report_name === 'Placement Authorizations - Active Authorizations Due- Placement') {
      this.pre_report_name = 'Active Authorizations Due- Placement';
      this.report_name_pre = "GN_AuthDue_Placement";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Placement Authorizations open for at least a single day within the date range selected below, Active and Due during this period. The report may be processed for Out-Of-Home Client (Reintegration and Family Preservation) or Non-Contract Foster Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus7();
    } else if (this.pre_report_name === 'Placement Authorizations - Open Authorizations - Placement') {
      this.pre_report_name = 'Open Authorizations - Placement';
      this.report_name_pre = "GN_AuthOpen_Placement";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Placement Authorizations open for at least a single day within the date range selected below. The report may be processed for Out-Of-Home Client (Reintegration and Family Preservation) or Non-Contract Foster Care Homes Clients. Set the appropriate dates, Referral Type, and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus7();
    } else if (this.pre_report_name === 'Other Services Authorizations - Active Authorizations- Other Services') {
      this.pre_report_name = 'Active Authorizations- Other Services';
      this.report_name_pre = "GN_AuthActive_OtherServices";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Other Services Authorizations (Not Placement, Child Care, or Respite) open for at least a single day within the date range selected below and Active. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Other Services Authorizations - Active Authorizations Due- Other Services') {
      this.pre_report_name = 'Active Authorizations Due- Other Services';
      this.report_name_pre = "GN_AuthDue_OtherServices";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Other Services Authorizations (Not Placement, Child Care, or Respite) open for at least a single day within the date range selected below, Active and Due during this period. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Other Services Authorizations - Open Authorizations - Other Services') {
      this.pre_report_name = 'Open Authorizations - Other Services';
      this.report_name_pre = "GN_AuthOpen_OtherServices";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Other Services Authorizations (Not Placement, Child Care, or Respite) open for at least a single day within the date range selected below. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Respite Authorizations - Open Authorizations - Respite') {
      this.pre_report_name = 'Open Authorizations - Respite';
      this.report_name_pre = "GN_AuthOpen_Respite";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Respite Authorizations open for at least a single day within the date range selected below. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Child Care Authorizations - Active Authorizations- Child Care') {
      this.pre_report_name = 'Active Authorizations- Child Care';
      this.report_name_pre = "GN_AuthActive_ChildCare";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Child Care Authorizations open for at least a single day within the date range selected below and Active. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Child Care Authorizations - Active Authorizations Due- Child Care') {
      this.pre_report_name = 'Active Authorizations Due- Child Care';
      this.report_name_pre = "GN_AuthDue_ChildCare";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Child Care Authorizations open for at least a single day within the date range selected below, Active and Due during this period. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else if (this.pre_report_name === 'Child Care Authorizations - Open Authorizations - Child Care') {
      this.pre_report_name = 'Open Authorizations - Child Care';
      this.report_name_pre = "GN_AuthOpen_ChildCare";
      this.getReferralTypes(this.report_name_pre);
      this.pre_report_content = 'Child Care Authorizations open for at least a single day within the date range selected below. Set the appropriate dates and process. Note: Authorizations with a 0.00 rate are not included.';
      this.filterStatus3();
    } else {
      this.showAllFamilyMember = false;
      this.pre_report_content = "";
      this.showBeginDate = false;
      this.showEndDate = false;
      this.showProcessDate = false;
      this.showReferralType = false;
      this.showRegion = false;
      this.showFisYear = false;
    }
    if (this.pre_report_name === "RM Unusual Incidents - Ratings") {
      this.show_pre_define_filter = false;
    } else {
      this.show_pre_define_filter = true;
    }

  }
  closeWizard() {
    this.show_pre_define_filter = false;
  };
  allreferrals = [];
  referralID = { ReferralGroupID: null, ReferralGroup: "" };
  repo_head_name: any;
  isIDsOnly = false;
  fisData: any;
  sfaOFc: any;
  countyData: any;
  get_prioritrized_Reports(init, end) {
    this.show_pre_define_filter = false;
    var beginDate = this._localValues.stringFormatDate(this.beginDate);
    var beginDAteArray = beginDate.split('-');
    var begindateFormat = beginDAteArray[1] + '-' + beginDAteArray[2] + '-' + beginDAteArray[0];
    var endDate = this._localValues.stringFormatDate(this.endDate);
    var endDAteArray = endDate.split('-');
    var enddateFormat = endDAteArray[1] + '-' + endDAteArray[2] + '-' + endDAteArray[0];
    this.spName = null;
    var data;
    console.log(this.referralID);
    console.log(this.referralID.ReferralGroupID);
    if (this.report_name_pre === 'AssessmentsCompleted' || this.report_name_pre === 'AssessmentsDue' ||
      this.report_name_pre === 'RMIncidentTypeAndRatings' || this.report_name_pre === 'RMIncidentDate' ||
      this.report_name_pre === 'RMIncidentEntered' ||
      this.report_name_pre === 'RMIncidentContacts' || this.report_name_pre === 'RMIncidentCompletedFollowUp' ||
      this.report_name_pre === 'RMIncidentCompleted' || this.report_name_pre === 'RMUnusualIncidentType' ||
      this.report_name_pre === 'RMIncidentTypeByInvolved' ||
      this.report_name_pre === 'FCHSponsorShipClosed' ||
      this.report_name_pre === 'FCHFamilyContact' ||
      this.report_name_pre === 'ImmediateAssessmentNeeded' ||
      this.report_name_pre === 'FCHAdmissions' ||
      this.report_name_pre === 'FCHOpenCases' ||
      this.report_name_pre === 'FCHDischarges' ||
      this.report_name_pre === 'FCHTraining' ||
      this.report_name_pre === 'FCHClientContacts' ||
      this.report_name_pre === 'FCHMoves' ||
      this.report_name_pre === 'FCHMonthyReportStatus' ||
      this.report_name_pre === 'FCHHomeStudyReferrals' ||
      this.report_name_pre === 'FCHHomeStudyOpenCases' ||
      this.report_name_pre === 'DM_RFC_authorizationEntered' ||
      this.report_name_pre === 'FCHBedsDaily' ||
      this.report_name_pre === 'FCHStaffGrantedAccess' ||
      this.report_name_pre === 'FCHProviderLodes' ||
      this.report_name_pre === 'FCHProvidersGrantedAccess' ||
      this.report_name_pre === 'OKProgressNoteCompleted' ||
      this.report_name_pre === 'FCHHomeStudyClosedCases' ||
      this.report_name_pre === 'OKProgressNotePending' ||
      this.report_name_pre === 'OKBFCHMoves' ||
      this.report_name_pre === 'FCHSponsorshipBegan' ||
      this.report_name_pre === 'FPClientReferral' ||
      this.report_name_pre === 'FCHPlacementClosedCosts' ||
      this.report_name_pre === 'FCHPlacementCosts' ||
      this.report_name_pre === 'ReportProcessingByStaff' ||
      this.report_name_pre === 'PRTFClosures' ||
      this.report_name_pre === 'FCH_RecruitmentActivity' ||
      this.report_name_pre === 'OM_CaseReadScores_Quarterly' ||
      this.report_name_pre === 'NE_FCH_FamilyContact' ||
      this.report_name_pre === 'NE_FCH_PlacementCosts' ||
      this.report_name_pre === 'NE_FCH_FCHBeds' ||
      this.report_name_pre === 'NE_ClientContacts' ||
      this.report_name_pre === 'NE_ClientOpenCases' ||
      this.report_name_pre === 'NE_Home_Admissions' ||
      this.report_name_pre === 'NE_FCHClosedProviders' ||
      this.report_name_pre === 'NE_ClientReferrals' ||
      this.report_name_pre === 'NE_ClientDischarges' ||
      this.report_name_pre === 'NE_ClientPlacement' ||
      this.report_name_pre === 'JJFC_PlacementCosts' ||
      this.report_name_pre === 'NE_FCHOpenProviders' ||
      this.report_name_pre === 'NE_FCHNewProviders' ||
      this.report_name_pre === 'FPFaceToFaceAloneTimeRules' ||
      this.report_name_pre === 'NE_ClientClosureCases' ||
      this.report_name_pre === 'FMW_ProviderLogInReport' ||
      this.report_name_pre === 'FMW_StaffLogInReport' ||
      this.optionSelected.label === 'Trend Line Processing'
    ) {
      if (this.report_name_pre === 'Due90Days_SibSplits' || this.report_name_pre === 'ResourceFamilyFCHBeds' || this.report_name_pre === 'NE_FCH_FCHBeds') {
        this.repo_head_name = this.pre_report_name + ' @for: ' + enddateFormat;
        data = {
          "report": this.report_name_pre,
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "beginPagination": init,
          "endPagination": end
        };
      } else {
        this.repo_head_name = this.pre_report_name + ' @for: ' + begindateFormat + ' - ' + enddateFormat;
        data = {
          "report": this.report_name_pre,
          "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
          "endDate": this._localValues.report_end_dateAndTime(this.endDate),
          "beginPagination": init,
          "endPagination": end
        }
      }
    } else if (this.report_name_pre === 'ResourceFamilyFCHBeds') {
      this.repo_head_name = this.pre_report_name + ' @for: ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'RFCAPlacement' || 
               this.report_name_pre === 'Kinship_Specialist' ||
               this.report_name_pre === 'GN_AuthActive_OtherServices' ||
               this.report_name_pre === 'GN_AuthDue_OtherServices' ||
               this.report_name_pre === 'GN_AuthOpen_OtherServices' ||
               this.report_name_pre === 'GN_AuthOpen_Respite' ||
               this.report_name_pre === 'GN_AuthActive_ChildCare' ||
               this.report_name_pre === 'GN_AuthDue_ChildCare' ||
               this.report_name_pre === 'GN_AuthOpen_ChildCare'
               ) {
      this.repo_head_name = this.pre_report_name + ' @for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "isExport": false,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'GN_ElecSignPlacementAgreement') {
      this.repo_head_name = this.pre_report_name + ' @for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "isExport": false,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'vReport_ElecSignPlacementAgreement') {
      this.repo_head_name = this.pre_report_name + ' @for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "isExport": false,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OM_RFC_MCONeeded') {
      this.repo_head_name = this.pre_report_name + ' @for: ' + enddateFormat;
      data = {
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "report": this.report_name_pre,    
        "beginPagination": init,
        "endPagination": end,
        "isExport": false,
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_Due_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'Ad_Permanency_Cases_with_Aftercare') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_Due14Days_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'OM_SibSplits_Due30Days' || this.report_name_pre === 'OM_SibSplits_RecentReview') {
      this.repo_head_name = this.pre_report_name + ' @for: ' + begindateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_PastDue_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'RFC_Referrals_Wichita' ||
      this.report_name_pre === 'RFC_Open_Cases_Wichita' ||
      this.report_name_pre === 'RFC_Permanency_Cases_Wichita' ||
      this.report_name_pre === 'RFC_Closure_Cases_Wichita'||
      this.report_name_pre === 'RFC_Permanency_Closure_Wichita' ||
      this.report_name_pre === 'RFC_Recidivists_Wichita' ||
      this.report_name_pre === 'RFC_Initial_Permanency_Wichita' ||
      this.report_name_pre === 'RFC_Contacts_Wichita' ||
      this.report_name_pre === 'RFC_Contacts_Month_Wichita' ||
      this.report_name_pre === 'RFC_Placements_Costs_Wichita' ||
      this.report_name_pre === 'RFC_Placement_Disruptions_Wichita' ||
      this.report_name_pre === 'RFC_NCFC_Referrals_Wichita' ||
      this.report_name_pre === 'RFC_NCFC_Cases_Wichita' ||
      this.report_name_pre === 'RFC_NCFC_Closed_Cases_Wichita' ||
      this.report_name_pre === 'RFC_NCFC_Contacts_Wichita' ||
      this.report_name_pre === 'RFC_NCFC_Contacts_Months_Wichita'
      ) {
      this.repo_head_name = this.pre_report_name + ' @for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
      };
    } else if (this.report_name_pre === 'FPReferrals' || this.report_name_pre === "FPOpenCases" || this.report_name_pre === "FPIntensivePhaseClosure" || this.report_name_pre === "FPIntensivePhaseOpen") {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "allFamilyMembers": this.allFamilyMembers,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_AllDue_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'ProgressNoteAndNonTherapyPending' || this.report_name_pre === 'OPSProgressNotePending' || this.report_name_pre === 'FP_NonTherapyPending' || this.report_name_pre === 'ProgressNotePending') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ')  @for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_Completed_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_None_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + this.currentDate;
      data = {
        "report": this.report_name_pre,
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'OKChildMovementData' || this.report_name_pre === 'JJFC_Beds' || this.report_name_pre === 'KNPlacementsWithClientDetail' || this.report_name_pre === 'KNOpenPlacementSummary' || this.report_name_pre === 'OKStaffAssignments' || this.report_name_pre === 'FP_StaffHierarchy_Supervisor' || this.report_name_pre === 'FP_StaffHierarchy_Supervisor' || this.report_name_pre === 'OKRFDataRecords') {
      this.repo_head_name = this.pre_report_name + '@for: ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'GN_KanBeHealthy_AttachedDoc_Controller') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "isExport": false,
        "beginPagination": init,
        "endPagination": end,
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
      };
    } else if (this.report_name_pre === 'OK_Metric_NewPlacements') {
      this.repo_head_name = this.pre_report_name + '@for: ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "processDate": this.fisData.endDate,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.beginEndOnly) {
      data = {
        "report": this.report_name_pre,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OKBFCHCancelledProviders' || this.report_name_pre === 'OKBFCHClientAdmissions' || this.report_name_pre === 'OKBFCHFamilyContacts'
      || this.report_name_pre === 'OKBFCHFamilyContacts' || this.report_name_pre === 'OKBFCHClientDischarges' || this.report_name_pre === 'OKBFCHNewProviders' || this.report_name_pre === 'OKBFCHClosedProviders') {
      this.repo_head_name = this.pre_report_name + ' (' + this.DHS_region.dhsRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "dhsRegionGroupID": this.DHS_region['dhsRegionGroupID'],
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OKBFCHClientOpenPlacements') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.DHS_region.dhsRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "dhsRegionGroupID": this.DHS_region['dhsRegionGroupID'],
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'AD_AllEvents') {
      this.repo_head_name = this.pre_report_name + ' (' + this.DHS_region.dhsRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OKBFCHOpenProviders') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.DHS_region.dhsRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "dhsRegionGroupID": this.DHS_region['dhsRegionGroupID'],
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OMMonthlyReportsStatus' || this.report_name_pre === 'OMSurvey90DayServiceFP' || this.report_name_pre === 'FPStaffHierarchy' || this.report_name_pre === 'FPCensusForSup' || this.report_name_pre === 'RFC_StaffCaseload' || this.report_name_pre === 'RFCCasePlansPastDue') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'RFCDailyCostOOH') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "processDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OMSurvey90DayServiceYouth' || this.report_name_pre === 'OMSurvey90DayServiceAdult' || this.report_name_pre === 'OM_OOHPlacementSRSMonthly') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ') ' + '@for: ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'OMSurveyCaseClosure' || this.report_name_pre === 'ReferralsEntered') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "beginPagination": init,
        "endPagination": end
      };
    } else if (this.report_name_pre === 'TD_OPS_Referrals' || 
               this.report_name_pre === 'TD_OPS_OpenCases' ||
               this.report_name_pre === 'TD_OPS_Closures') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID":  this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "beginPagination": init,
        "endPagination": end,
        "isExport": false
      }
    } else if (this.report_name_pre === 'GN_AuthActive_Placement' ||
               this.report_name_pre === 'GN_AuthDue_Placement' ||
               this.report_name_pre === 'GN_AuthOpen_Placement'
            ) {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID":  this.referralID.ReferralGroupID,
        "beginPagination": init,
        "endPagination": end,
        "isExport": false
      }
    } else if (this.report_name_pre === 'GN_AuthActive_Procode' ||
               this.report_name_pre === 'GN_AuthDue_Procode' ||
               this.report_name_pre === 'GN_AuthOpen_Procode'
            ) {
      this.repo_head_name = this.pre_report_name + ' (' + this.procodes.Procode + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "procodeID":  this.procodes['procodeid'],
        "beginPagination": init,
        "endPagination": end,
        "isExport": false
      }
    } else if (this.show_all_filter || this.report_name_pre === 'FPFaceToFaceWithAloneTime' ||
      this.report_name_pre === 'FPCasePlansCompleted' ||
      this.report_name_pre === 'FPCasePlansDue' ||
      this.report_name_pre === 'FP_NonTherapyAllStatus' ||
      this.report_name_pre === 'FP_NonTherapyCompleted' ||
      this.report_name_pre === 'FPProgressReportCompleted' ||
      this.report_name_pre === 'FP_OpenTherapyReferralEvents' ||
      this.report_name_pre === 'OPSProgressNoteCompleted' ||
      this.report_name_pre === 'ProgressNoteCompleted' ||
      this.report_name_pre === 'FPProgressReportDue' ||
      this.report_name_pre === 'RFCWorkerChildCompleted' ||
      this.report_name_pre === 'RFCWorkerChildMissing' ||
      this.report_name_pre === 'FPTherapySvc' ||
      this.report_name_pre === 'FPOpenCases' ||
      this.report_name_pre === 'FPInitialMHAssessment' ||
      this.report_name_pre === 'FPServiceAndDirectClaims' ||
      this.report_name_pre === 'FPFaceToFaceVisits' ||
      this.report_name_pre === 'FPFamilyChildOOH' ||
      this.report_name_pre === 'FPIntensivePhaseOpen' ||
      this.report_name_pre === 'FPFamiliesAreMaintAtHome' ||
      this.report_name_pre === 'FPReferrals' ||
      this.report_name_pre === 'FPReferralsAndWithdrawals' ||
      this.report_name_pre === 'FPFaceToFaceHours' ||
      this.report_name_pre === 'FPIntensivePhaseClosure' ||
      this.report_name_pre === 'FPFamilyMembersOOH' ||
      this.report_name_pre === 'OKBFCHClientOpenPlacements' ||
      this.report_name_pre === 'OPSStaffServiceSummary' ||
      this.report_name_pre === 'RFCOpenCases' ||
      this.report_name_pre === 'RFCContacts' ||
      this.report_name_pre === 'RFCPlacementDisruptions' ||
      this.report_name_pre === 'RFCPlacementAndCost' ||
      this.report_name_pre === 'RFCOpenCasesWest' ||
      this.report_name_pre === 'RFCChildAndFamilyProfileDue' ||
      this.report_name_pre === 'RFCCasePlansDueToDCF' ||
      this.report_name_pre === 'RFCCasePlansDue' ||
      this.report_name_pre === 'RFC_PermAndClosures' ||
      this.report_name_pre === 'RFC_StaffCaseload' ||
      this.report_name_pre === 'RFC_PermWithAftercare' ||
      this.report_name_pre === 'TD_Reintegration_Referrals_SFCSReferralDate_Controller' ||
      this.report_name_pre === 'AD_TransferToAdoption' ||
      this.report_name_pre === 'FPClosedCases' ||
      this.report_name_pre === 'AD_LegallyAvailable' ||
      this.report_name_pre === 'AD_OpenCases' ||
      this.report_name_pre === 'AD_APASigned' ||
      this.report_name_pre === 'OM_RFC_OOH_PlacementChanges' ||
      this.report_name_pre === 'FPContacts') {
      this.repo_head_name = this.pre_report_name + ' (' + this.referralID.ReferralGroup + ' - ' + this.region.DCFRegionGroup + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      data = {
        "report": this.report_name_pre,
        "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
        "endDate": this._localValues.report_end_dateAndTime(this.endDate),
        "referralGroupID": this.referralID.ReferralGroupID,
        "dCFRegionGroupID": this.region.DCFRegionGroupID,
        "beginPagination": init,
        "endPagination": end,
        "isExport": false
      };
    } else if (this.report_name_pre === 'RMUnusualIncidentRating') {
      data = {
        "report": "RMUnusualIncidentRating",
        "whereClause": this.wher_sql_clus,
        "isIDsOnly": this.isIDsOnly,
        "selection": this.intSelection,
        "reportSubtitle": this.subTitle,
        "beginPagination": init,
        "endPagination": end,
        "isExport": false
      }
    }
    this.showSave = false;
    this.headers = [];
    this.rawdata = [];
    this.hideTable = true;
    this.hideLoader = false;
    this.showGroupByTable = false;
    this.paginationHide = true;
    this.saveFilterId = null;
    this.FilterName = null;
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    this.reportGenerated = false;
    this.tlpDataHeader = '';
    this.collectionOfAnd = [];
    this.collectionOfOR = [];
    this.finalQueryString = '';

    if (this.optionSelected.label === 'Trend Line Processing' || this.pre_report_name == 'FCH - Foster Roster' || this.report_name_pre == 'RFCDailyCostOOH') {
      if (this._router.url === '/reports/live-prioritized') {
        data['isExport'] = true;
        data['staffID'] = 14802;
      } else {
        data['isExport'] = true;
        data['staffID'] = parseInt(localStorage.getItem('UserId')) || 14802;
      }
    } else {
      data.isExport = false;
    }
    if (this.report_name_pre == 'FPReferralsAndWithdrawals' || this.report_name_pre == 'FPCensusForSup' || this.report_name_pre == 'IntensivePhaseReopened' || this.report_name_pre == 'FPClosedCases') {
      data.allFamilyMembers = this.allFamilyMembers;
    }
    this._report.getPreDefinedReport(data).then(data => {
      this.beginEndOnly = false;
      if (data.responseStatus == true) {
        if (this.optionSelected.label === 'Trend Line Processing' || this.report_name_pre == 'RFCDailyCostOOH') {
          loader.style.display = 'none';
          swal('Success!', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
        } else {
          if (data.predefinedReports.length !== 0) {
            data.predefinedReports.map(data_ls => {
              if (this.report_name_pre == "FPTherapySvc") {
                delete data_ls["BillingType"];
              }
            })
            this.show_pre_define_filter = false;
            this.filterQuery = data.query;
            this.filterConditionOption = 'Equals';
            this.reportGenerated = true;
            if (data.responseStatus == true) {
              loader.style.display = 'none';
              this.totalCount = data.totalCount;
              this.hideLoader = true;
              this.hideTable = false;
              this.hideLoaderText = true;
              this.rowData = data['predefinedReports'];
              let test = [];
              this.headers.push(Object.keys(this.rowData[0]));
              this.headers[0].forEach(function (ele) {
                let data = {
                  headerName: ele
                    .replace(/\b\w/g, l => l.toUpperCase())
                    .replace(/([A-Z])/g, " $1")
                    .trim(),
                  field: ele
                };
                test.push(data);
              });
              test.sort((a, b) => a['order'] - b['order']);
              test
              this.rawdata.push(test);
              this.columnDefs = test;
              this.columnDefs.map(data => {
                if (data.field == 'DOB' || data.field == 'EndDate' || data.field == 'BeginDate' ||
                  data.field == 'Auth_BeginDate' || data.field == 'Auth_EndDate' || data.field == 'EOMDate' ||
                  data.field == 'ReferralDate' || data.field == 'ClosureDate' || data.field == 'PaymentEndDate' ||
                  data.field == 'PL_BeginDate' || data.field == 'PL_EndDate' || data.field == 'OrigDCFReferralDate' ||
                  data.field == 'PermClosureDate' || data.field == 'RetractedDate' || data.field == 'ReceivedDate' ||
                  data.field == 'Event_BeginDate' || data.field == 'Recent_LOCAuthDate' || data.field == 'Recidivist_ReturnOOHDate' ||
                  data.field == 'Adoption_LegallyAvailable' || data.field == 'Recent_CP_Completed'
                  || data.field == 'Recent_CP_PlannedPerm' || data.field == 'Posted_EOMDate' || data.field == 'EnteredDate' || data.field == 'PostedDate' ||
                  data.field == 'PaymentDueDate' || data.field == 'VoidDate' || data.field == 'ReleaseDate' || data.field == 'Event_EndDate' || data.field == 'Placement_BeginDate' || data.field == 'Placement_EndDate' ||
                  data.field == 'AdoptionDate' || data.field == 'ADTrans_ReferralDate' || data.field == 'BilledDate' || data.field == 'ChangedDate' || data.field == 'PN_CompletedDate'
                  || data.field == 'PN_Completed_EOMDate' || data.field == 'Entered_EOMDate' || data.field == 'Service_EOMDate' || data.field == 'Phase_BeginDate'
                  || data.field == 'Phase_EndDate' || data.field == 'PhaseActivity_BeginDate' || data.field == 'CPDue' || data.field == 'CPCompleted' || data.field == 'CPEnd' || data.field == 'SentDCF' || data.field == 'DueToDCF' || data.field == 'ReceivedDCFApproval'
                  || data.field == 'ApprovedDate'
                  || data.field == 'AssignedBeginDate'
                  || data.field == 'Provider_BeginDate'
                  || data.field == 'Provider_Begin'
                  || data.field == 'Provider_End'
                  || data.field == 'Sponsor_BeginDate'
                  || data.field == 'ProjClosureDate'
                  || data.field == 'Sponsor_EndDate'
                  || data.field == 'Visit_BeginDate'
                  || data.field == 'Visit_EndDate'
                  || data.field == 'Visit_EnteredDate'
                  || data.field == 'Sponsor_Entered'
                  || data.field == 'DateOfFirstPL'
                  || data.field == 'EndDateFirstPL'
                  || data.field == 'Lic_BeginDate'
                  || data.field == 'SponsorshipBegan_EOMDate'
                  || data.field == 'Previous_Sponsor_EndDate'
                  || data.field == 'Previous_Sponsor_Entered'
                  || data.field == 'Lic_EndDate'
                  || data.field == 'MonthReported'
                  || data.field == 'Provider_EndDate'
                  || data.field == 'SponsorShip_Begin'
                  || data.field == 'SponsorShip_End'
                  || data.field == 'SponsorShip_ChangedDate'
                  || data.field == 'PSMappDate'
                  || data.field == 'SponsorshipEnd_EOMDate'
                  || data.field == 'EndDate_MoveDate'
                  || data.field == 'StatusBeginDate'
                  || data.field == 'AssignedEndDate'
                  || data.field == 'FCHWebsiteAccess'
                  || data.field == 'ReportDate'
                  || data.field == 'LogOn'
                  || data.field == 'LogIn'
                  || data.field == 'DateIn'
                  || data.field == 'DateOut'
                  || data.field == 'Date'
                  || data.field == 'LegallyAvailable'
                  || data.field == 'DateAppRecd'
                  || data.field == 'DateDHSApproved'
                  || data.field == 'DateFirstTrn'
                  || data.field == 'DateTrnComp'
                  || data.field == 'DateFngrPrntSub'
                  || data.field == 'DateFngrPrntAprvd'
                  || data.field == 'DateHmStdySub'
                  || data.field == 'DateHmStdyAprvd'
                  || data.field == 'CertificationBeginDate'
                  || data.field == 'FingerprintCompletedDate'
                  || data.field == 'FingerprintNextDueDate'
                  || data.field == 'ProviderBeginDate'
                  || data.field == 'OOH_DOB'
                  || data.field == 'OOHDate'
                  || data.field == 'Claim_EOMDate'
                  || data.field == 'Recid_RecentOOHDate'
                  || data.field == 'Adoption_LegallyAvailableDate'
                  || data.field == 'CP_Completed'
                  || data.field == 'Next_CPDueDate'
                  || data.field == 'Assessment_EnteredDate'
                  || data.field == 'Assessment_EOMDate'
                  || data.field == 'FP24HrContactDate'
                  || data.field == 'FP48HrContactDate'
                  || data.field == 'FileIssueDate'
                  || data.field == 'RecidivistDate'
                  || data.field == 'TrainingDate'
                  || data.field == 'Training_EOMDate'
                  || data.field == 'RelicenseDate'
                  || data.field == 'License_BeginDate'
                  || data.field == 'FamilyContactDate'
                  || data.field == 'License_EndDate'
                  || data.field == 'Relicense_EOMDate'
                  || data.field == 'Contact_BeginDate'
                  || data.field == 'InitPermDate'
                  || data.field == 'PermDate'
                  || data.field == 'FISEndDate'
                  || data.field == 'FISBeginDate'
                  || data.field == 'AloneTimeVisitDate'
                  || data.field == 'Initial_CPCompletedDate'
                  || data.field == 'LatestVisitDate'
                  || data.field == 'AloneTimeExceptionVisitDate'
                  || data.field == 'Contact_EndDate'
                  || data.field == 'FCHWebSiteAccess'
                  || data.field == 'SeparationDate'
                  || data.field == 'DueDate'
                  || data.field == 'BeginWeekDate'
                  || data.field == 'VisitDate'
                  || data.field == 'EndWeekDate'
                  || data.field == 'FIS_BeginDate'
                  || data.field == 'FIS_EndDate'
                  || data.field == 'FISMember_BeginDate'
                  || data.field == 'FISMember_EndDate'
                  || data.field == 'Visit_EOMDATE'
                  || data.field == 'NewPL_EndDate'
                  || data.field == 'PlacementBegin_EOMDate'
                  || data.field == 'NewPL_BeginDate'
                  || data.field == 'PL_DisruptionDate'
                  || data.field == 'SFCSOffice_FinancialMgmt_EffDate'
                  || data.field == 'PLEvent_BeginDate'
                  || data.field == 'PLEvent_EndDate'
                  || data.field == 'SponsorBeginDate'
                  || data.field == 'StatusBeginDate'
                  || data.field == 'SponsorEndDate'
                  || data.field == 'IncidentDate'
                  || data.field == 'DischargeDate'
                  || data.field == 'IPCompletedDate'
                  || data.field == 'PL_AdmissionDate'
                  || data.field == 'PL_DischargeDate'
                  || data.field == 'StatusDate'
                  || data.field == 'StatusEnd'
                  || data.field == 'ProviderEvent_CompletedDate'
                  || data.field == 'PSMappDate'
                  || data.field == 'DTDate'
                  || data.field == 'MappDate'
                  || data.field == 'InitialPlacement_BeginDate'
                  || data.field == 'ProvStatus_BeginDate'
                  || data.field == 'ProvStatus_EndDate'
                  || data.field == 'ReceivedDateTime'
                  || data.field == 'FollowUpCompletedDate'
                  || data.field == 'Initial_IPClosure'
                  || data.field == 'ReOpened_BeginDate'
                  || data.field == 'ReOpened_EndDate'
                  || data.field == 'IncidentOrDiscoveryDate'
                  || data.field == 'EOMDate_DiscoveryDate'
                  || data.field == 'EOMDate_CompletedDate'
                  || data.field == 'EOMDate_IncidentDate'
                  || data.field == 'EOMDate_IncidentOrDiscoveryDate'
                  || data.field == 'AgreementSigned'
                  || data.field == 'EOMEnteredDate'
                  || data.field == 'InquiryStartDate'
                  || data.field == 'InquiryClosedDate'
                  || data.field == 'ReferralCompletedDate'
                  || data.field == 'Provider_SponsorshipDate'
                  || data.field == 'LastContact_DateCompleted'
                  || data.field == 'FieldAvailableDate'
                  || data.field == 'FirstPlacementDate'
                  || data.field == 'WithDrawDate'
                  || data.field == 'Report_BeginDate'
                  || data.field == 'ReferralEvent_BeginDate'
                  || data.field == 'ReferralEvent_EndDate'
                  || data.field == 'Report_EndDate'
                  || data.field == 'FollowupCompletedDate'
                  || data.field == 'SentDate'
                  || data.field == 'RecentProgressNoteDate'
                  || data.field == 'DiscoveryDate'
                  || data.field == 'CompletedDate'
                  || data.field == 'NextDueDate'
                  || data.field == 'Staff_FollowUpCompletedDate'
                  || data.field == 'RMFollowUpCompletedDate'
                  || data.field == 'PLBeginDate'
                  || data.field == 'PLEndDate'
                  || data.field == 'Init_OOHDate'
                  || data.field == 'PhaseActivity_EndDate'
                  || data.field == 'PreTour_DueDate'
                  || data.field == 'PreTour_CompletedDate'
                  || data.field == 'WalkThru_DueDate'
                  || data.field == 'WalkThru_CompletedDate'
                  || data.field == 'SendPacketToSalina_DueDate'
                  || data.field == 'SendPacketToSalina_CompletedDate'
                  || data.field == 'LicensingPacketSent_DueDate'
                  || data.field == 'LicensingPacketSent_CompletedDate'
                  || data.field == 'TransferPacket_DueDate'
                  || data.field == 'TransferPacket_CompletedDate'
                  || data.field == 'SubmitPaperworkToDCF_DueDate'
                  || data.field == 'SubmitPaperworkToDCF_CompletedDate'
                  || data.field == 'MAPP_Assessment_DueDate'
                  || data.field == 'MAPP_Assessment_CompletedDate'
                  || data.field == 'FirstPlacementDate'
                  || data.field == 'PlacementEOMDate'
                  || data.field == 'TrainingStarted'
                  || data.field == 'TrainingCompleted'
                  || data.field == 'CaseReadDate'
                  || data.field == 'CaseReadDue'
                  || data.field == 'CaseRead_ChangedDate'
                  || data.field == 'CaseRead_EnteredDate'
                  || data.field == 'Finalization'
                  || data.field == 'AttorneyPacketSigned'
                  || data.field == 'TransferToAdoption'
                  || data.field == 'AdoptionPacketSent'
                  || data.field == 'AdoptionPacketCompleted'
                  || data.field == 'AssessmentCompleted'
                  || data.field == 'BISRequested'
                  || data.field == 'BISAuthReceived'
                  || data.field == 'BISAuthRequested'
                  || data.field == 'FamilyNotified'
                  || data.field == 'SubsidyRequested'
                  || data.field == 'ConsentSigned'
                  || data.field == 'FocusDate'
                  || data.field == 'APA'
                  || data.field == 'RequestConsent'
                  || data.field == 'StatusApprovedDate_Father'
                  || data.field == 'StatusApprovedDate_Mother'
                  || data.field == 'StatusDate_Father'
                  || data.field == 'StatusDate_Mother'
                  || data.field == 'SubsidyReferralDate'
                  || data.field == 'APADate'
                  || data.field == 'ConsentSignedDate'
                  || data.field == 'PointsToCourtDate'
                  || data.field == 'BISHeld'
                  || data.field == 'PermanencyStaffing'
                  || data.field == 'LegalReview'
                  || data.field == 'FileRead'
                  || data.field == 'TransferToAdoptionFO'
                  || data.field == 'SocialHistoryUploadDate'
                  || data.field == 'SSIUploadDate'
                  || data.field == 'PPS5340UploadDate'
                  || data.field == 'CP_EndDate'
                  || data.field == 'PredictionPathUploadDate'
                  || data.field == 'IRPUploadDate'
                  || data.field == 'BirthCertificateUploadDate'
                  || data.field == 'BirthRecordsUploadDate'
                  || data.field == 'EndOfTheMonth'
                  || data.field == 'TransferToAdoptionFO'
                  || data.field == 'TransferToAdoptionFO'
                  || data.field == 'ResourceWorker_EndDate'
                  || data.field == 'DtDate'
                  || data.field == 'EmailConsentDate'
                  || data.field == 'Placement End Date'
                  || data.field == 'Placement BeginDate'
                  || data.field == 'Provider_ElecSignDate'
                  || data.field == 'Provider_DateEmailed'
                  || data.field == 'Void_Provider_DateEmailed'
                  || data.field == 'Void_Provider_ElecSignDate'
                  || data.field == 'Void_StaffDate'
                  || data.field == 'CC_DateEmailed'
                  || data.field == 'CC_ElecSignDate'
                  || data.field == 'FCH_DateEmailed'
                  || data.field == 'FCH_DateAcknowledged'
                  || data.field == 'KBHDueDate'
                  || data.field == 'KBHDate'
                  || data.field == 'Enddate'
                  || data.field == 'Placement_EOMDate'
                  || data.field == 'EOMDate_Referred'
                ) {
                  data['valueFormatter'] = function (params) {
                    if (params.value) {
                      return moment.utc(params.value).format("MM/DD/YYYY");
                    } else {
                      return "";
                    }
                  };
                }

              })

              // this.rawdata.push(test)
              // this.columnDefs = this.rawdata[0]
              this.tempPage = ''
              // this.getFavourites();
              // this.onConditionFilterSelected();
              this.show_pre_define_filter = false;
              this.navigationIsOn = false;
              this.showAllFamilyMember = false;
            } else {
              this.hideLoader = true;
            }
          } else {
            this.allFamilyMembers = false;
            this.showAllFamilyMember = false;
            this.dropRegion(this.endDate);
            this.show_pre_define_filter = false;
            loader.style.display = 'none';
            return swal('Records', 'No Data Found!.', 'warning');
          }
        }

      } else {
        loader.style.display = 'none';
      }
    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  };

  getReferralTypes(reportName) {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this._report.getReferralType({
      "reportName": reportName
    }).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus == true) {
        this.allreferrals = data.referralGroup;
        this.referralID = data.referralGroup[0];
      }
    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  }

  filterStatus1() {
    this.beginDate_disable = false;
    this.showAllFamilyMember = false;
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.endDate = this._localValues.endDateOfPreviousMonth;
    this.dropRegion(this.endDate);
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus2() {
    this.showBeginDate = false;
    this.showEndDate = false;
    this.showProcessDate = true;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.endDate = this._localValues.endDateOfPreviousMonth;
    this.dropRegion(this.endDate);
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus2A() {
    this.showBeginDate = false;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.endDate = this._localValues.endDateOfPreviousMonth;
    this.dropRegion(this.endDate);
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus9() {
    this.showBeginDate = false;
    this.showEndDate = false;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.dropRegion(this._localValues.endDateOfPreviousMonth);
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus3() {
    this.showAllFamilyMember = false;
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = false;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus4() {
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = false;
    this.showRegion = false;
    this.DHSshowRegion = true;
    this.showFisYear = false;
    this.beginDate_disable = false;
    this.showProcodes = false;
  }
  filterStatus12() {
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = false;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.dropRegion(this._localValues.endDateOfPreviousMonth);
    this.showFisYear = false;
    this.beginDate_disable = false;
    this.showProcodes = false;
  }
  filterStatus6() {
    this.showAllFamilyMember = false;
    this.showBeginDate = false;
    this.showEndDate = false;
    this.showProcessDate = true;
    this.showProcessDateTime = false;
    this.showReferralType = false;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus6A() {
    this.showAllFamilyMember = false;
    this.showBeginDate = false;
    this.showEndDate = false;
    this.showProcessDate = false;
    this.showProcessDateTime = true;
    this.showReferralType = false;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus7() {
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showFisYear = false;
    this.beginDate_disable = false;
    this.showProcodes = false;
  }
  filterStatus8() {
    this.showBeginDate = false;
    this.showEndDate = false;
    this.showProcessDate = true;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.dropRegion(this.endDate);
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus10() {
    this.showBeginDate = false;
    this.showEndDate = false;
    this.showProcessDate = true;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showFisYear = false;
    this.showProcodes = false;
  }
  filterStatus11() {
    this.showBeginDate = true;
    this.showEndDate = false;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = false;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showAllFamilyMember = false;
    this.showFisYear = false;
    this.beginDate_disable = false;
    this.showProcodes = false;
  }
  filterStatus13() {
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = true;
    this.showRegion = true;
    this.DHSshowRegion = false;
    this.showAllFamilyMember = false;
    this.showFisYear = false;
    this.beginDate_disable = false;
    this.dropRegion(this.endDate);
    
  }
  filterStatus14() {
    this.showBeginDate = true;
    this.showEndDate = true;
    this.showProcodes = true;
    this.showProcessDate = false;
    this.showProcessDateTime = false;
    this.showReferralType = false;
    this.showRegion = false;
    this.DHSshowRegion = false;
    this.showFisYear = false;
  }
  dropRegion(regDate) {
    if (this.showRegion) {
      var referral;
      if (this.optionSelected.label === 'Family Preservation (FP)') {
        referral = "IsFamilyPres";
      } else if (this.optionSelected.label === 'Reintegration Foster Care (RFC)') {
        referral = "IsReintegration";
      } else if (this.optionSelected.label === 'OutPatient') {
        referral = "IsOPS";
      } else if (this.optionSelected.label === 'Risk Management (RM)') {
        referral = "IsRiskMgmt";
      } else if (this.optionSelected.label === 'Kinship (KIN)') {
        referral = "IsKIPP";
      } else if (this.optionSelected.label === 'Operations Management (OM)' || this.optionSelected.label === 'Adoption (AD)') {
        referral = "IsReintegration";
      }
      var req = {
        "reportEndDate": this._localValues.report_end_dateAndTime(regDate),
        "referral": referral
      }
      let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
      loader.style.display = 'block';
      this.finance_report.getFinanceRegion(req).then((data: any) => {
        loader.style.display = 'none';
        this.regions = data.regionGroupList;
        this.region = data.regionGroupList[0];
      }).catch(err => {
        loader.style.display = 'none';
      }
      );
    }

  };
  fiscalYearList = [];
  getFinanceYears() {
    var req = { "processDate": null };
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    this.finance_report.getFinanceYear(req).then((data: any) => {
      this.fiscalYearList = data.fiscalYear;
      this.fisData = data.fiscalYear[0]
      loader.style.display = 'none';
    }).catch(err => {
      loader.style.display = 'none';
    }
    );
  }
  DHS_regions = [];
  dropDHSregion() {
    this._report.getDHF_regions_Data().then(data => {
      this.DHS_regions = data.dhsRegionGroup;
      this.DHS_region = data.dhsRegionGroup[0];
    })
  }
  allprocodes = [];
  getAllProcodes() {
    this._report.getProcodes().then(data => {
      this.allprocodes = data.procode;
      this.procodes = data.procode[0];
    }) 
  }

  thirteenmonthBeginDate(regDate) {
    if (this.optionSelected.label === 'Trend Line Processing') {
      if (this.pre_report_name === 'FP In Home Contacts - Single Month') {
        this.beginDate = this._localValues.singlemonth(regDate);
      } else if (this.pre_report_name === 'FC-FP OOH Contacts - Single Month') {
        this.beginDate = this._localValues.singlemonth(regDate);
      } else if (this.pre_report_name === 'Progress Towards Adoption ROC for Adoption - SFY Trend') {
        console.log(">>>", this._localValues.stringFormatDate(regDate));
        var endDate = this._localValues.stringFormatDate(regDate);
        var endDateCol = endDate.split("-");
        console.log('endDateCol>>>>', endDateCol);
        if (parseInt(endDateCol[1]) < 7) {
          var beginDateYear = parseInt(endDateCol[0]) - 1;
          var beginDate = "07-01-" + beginDateYear;
          this.beginDate = new Date(beginDate);
        } else {
          var beginDateYear = parseInt(endDateCol[0]);
          var beginDate = "07-01-" + beginDateYear;
          this.beginDate = new Date(beginDate);
        }
      } else {
        this.beginDate = this._localValues.previous13month(regDate);
      }
    }
  };
  rm_referl_mnmt = [];
  rm_region_group = [];
  allSponcers = [];
  selectSponcerID = [];
  selectFCH_ID = [];
  allProviders = [];
  selectProviderID: any = [];
  provide_totalCount = 0;
  provide_initial = 1;
  provide_end = 100;
  referral_mnmt: any;
  region_group: any;
  date_select = 'IncidentDate';
  all_Date_disable = false;
  compareValue = '>='
  level_rat: string[] = ['2'];
  greaterEqual_dis = false;
  greater_dis = false;
  equal_dis = false;
  lessOrEqual_dis = false;
  lessThen_dis = false;
  selectSponcer = true;
  selectProvider = true;
  provide_all_disable = true;
  sponcer_all_disable = true;
  inProviderIDS: any = "";
  inSponcerIDS: any = "";
  inLevelRatingID: any = "2";
  intSelection: number;
  provide_pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.provide_initial = begin;
      this.provide_end = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  provide_pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.provide_initial = begin;
      this.provide_end = end;
      return this.getProviderList(this.provide_initial, this.provide_end);
    }
  }

  getRiskmangementReferrals() {
    var data = {
      "beginPagination": 1,
      "endPagination": 100
    }
    this._report.getRiskmangementReferrals(data).then(res => {
      this.rm_referl_mnmt = res.referralsList;
      this.referral_mnmt = res.referralsList[0];
    }).catch(err => {
      console.log("err>>", err);
    })
  }
  getReferralRegionGroup() {
    var data = {
      "endDate": this._localValues.report_begin_dateAndTime(this.currentDate),
    }
    this._report.getRegionReferalGroup(data).then(res => {
      this.rm_region_group = res.regionGroupList;
      this.region_group = res.regionGroupList[0];
    }).catch(err => {
      console.log("err>>", err);
    })
  };
  getSponcerList() {
    var data = {
      "beginPagination": 1,
      "endPagination": 100
    }
    this._report.getSponcers(data).then(res => {
      this.allSponcers = res.sponsorList;
    }).catch(err => {
      console.log("err>>", err);
    })
  }
  getProviderList(provide_initial, provide_end) {
    var data = {
      "beginPagination": provide_initial,
      "endPagination": provide_end
    }
    this._report.getProvider(data).then(res => {
      this.allProviders = res.providerList;
      this.provide_totalCount = res.totalCount;
    }).catch(err => {
      console.log("err>>", err);
    })
  }
  level_rating_change(eve) {
    console.log(this.level_rat);
    console.log("(" + this.level_rat.join() + ")")

    if (this.level_rat.length > 1) {
      this.greaterEqual_dis = true;
      this.greater_dis = true;
      this.equal_dis = true;
      this.compareValue = '=';
      this.lessOrEqual_dis = true;
      this.lessThen_dis = true;
      this.inLevelRatingID = "Rating IN(" + this.level_rat.join() + ")"
    } else {
      this.greaterEqual_dis = false;
      this.greater_dis = false;
      this.equal_dis = false;
      this.lessOrEqual_dis = false;
      this.lessThen_dis = false;
      this.inLevelRatingID = this.level_rat[0];
    }
  };

  provider_change(eve) {
    if (eve) {
      this.provide_all_disable = true;
      this.selectProviderID = [];
      this.inProviderIDS = "";
    } else {
      this.provide_all_disable = false;
      this.selectSponcerID = [];
      this.selectSponcer = true;
    }
  };
  all_provider_id = [];
  all_provider_change(event, id) {
    if (event) {
      this.all_provider_id.push(id);
      this.inProviderIDS = "ProviderID IN(" + this.all_provider_id.join() + ") AND ";
    } else {
      removeA(this.all_provider_id, id);
    }
  };

  sponcer_change(eve) {
    if (eve) {
      this.sponcer_all_disable = true;
      this.selectSponcerID = [];
      this.inSponcerIDS = "";
    } else {
      this.sponcer_all_disable = false;
      this.selectProviderID = [];
      this.selectProvider = true;
    }
  };
  all_sponcr_id = [];
  all_sponcer_change(event, id) {
    if (event) {
      this.all_sponcr_id.push(id);
      this.inSponcerIDS = "SponsorID IN(" + this.all_sponcr_id.join() + ") AND ";
    } else {
      removeA(this.all_sponcr_id, id);
    }
    console.log("this.all_sponcr_id>>", this.all_sponcr_id);
  };
  wher_sql_clus: any;
  subTitle: any;
  ref_type = "";
  dcf_region = "";
  rm_unusual_ration() {
    console.log(this.referral_mnmt);
    console.log(this.region_group);
    console.log(this.date_select);
    console.log(this.compareValue);
    console.log(this.level_rat);
    this.ref_type = "cr.ReferralTypeID = " + this.referral_mnmt.ReferralTypeID + " AND ";
    this.dcf_region = "dcf.DCFRegionID IN" + " (" + this.region_group.DCFRegion + ")" + " AND "
    if (this.compareValue == '=') {
      this.compareValue = "";
    } else {
      this.inLevelRatingID = "Rating " + this.compareValue + " " + this.level_rat[0];
    }
    if (this.referral_mnmt.ReferralTypeID == 0 &&
      this.region_group.DCFRegionGroupID == 0) {
      this.intSelection = 1;
      this.subTitle = "All Reported";
      this.ref_type = "";
      this.dcf_region = "";
    }
    if (this.referral_mnmt.ReferralTypeID == 0) {
      this.ref_type = "";
    }
    if (this.region_group.DCFRegionGroupID == 0) {
      this.dcf_region = "";
    }
    if (this.referral_mnmt.ReferralTypeID != 0 && this.region_group.DCFRegionGroupID != 0) {
      this.intSelection = 4;
      this.subTitle = this.referral_mnmt.Description;
    }
    if (this.referral_mnmt.ReferralTypeID != 0) {
      this.intSelection = 2;
      this.subTitle = this.referral_mnmt.Description;
    }
    if (this.referral_mnmt.ReferralTypeID == 0 && this.region_group.DCFRegionGroupID != 0) {
      this.intSelection = 3;
      this.subTitle = this.region_group.DCFRegionGroup;
    }
    if (this.date_select == 'AllDates') {
      this.subTitle = "All Reported";
      this.repo_head_name = this.pre_report_name + ' (' + this.subTitle + ') ';
      this.wher_sql_clus = "Where " + this.ref_type + " " + this.dcf_region +
        this.inProviderIDS + "" + this.inSponcerIDS + " " + this.inLevelRatingID + " Order By ProviderName, ClientName, IncidentDate,ReportID";
      // this.wher_sql_clus = "Where " + this.inLevelRatingID + " Order By ProviderName, ClientName, IncidentDate,ReportID";
      this.get_prioritrized_Reports(1, 100);
    } else {
      var beginDate = this._localValues.stringFormatDate(this.beginDate);
      var beginDAteArray = beginDate.split('-');
      var begindateFormat = beginDAteArray[1] + '-' + beginDAteArray[2] + '-' + beginDAteArray[0];
      var endDate = this._localValues.stringFormatDate(this.endDate);
      var endDAteArray = endDate.split('-');
      var enddateFormat = endDAteArray[1] + '-' + endDAteArray[2] + '-' + endDAteArray[0];
      this.repo_head_name = this.pre_report_name + ' (' + this.subTitle + ') ' + '@for: ' + begindateFormat + ' - ' + enddateFormat;
      this.wher_sql_clus = "Where (" + this.date_select + " Between ''" + this._localValues.report_begin_dateAndTime(this.beginDate) + "'' AND ''" + this._localValues.report_end_dateAndTime(this.endDate) + "'')  AND " + this.ref_type + " " + this.dcf_region + " " +
        this.inProviderIDS + "" + this.inSponcerIDS + " " + this.inLevelRatingID + " Order By ProviderName, ClientName, IncidentDate,ReportID";
      this.get_prioritrized_Reports(1, 100);
    }

    this.showUnusual_rating = false;
  }
  dateDisable() {
    this.all_Date_disable = true;
  };
  resourceWorkers = [];
  superVisors = [];
  catchmentAreas = [];
  allResourceWorkers = [];
  allCatchmentAreas = [];
  allResourceSuperVisors = [];
  getResourceWorker() {
    this._report.getResourceWorker_Data().then(data => {
      this.resourceWorkers = data.resourceWorkers;
    })
  };
  getSearchWorker(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.resourceWorkers.length; i++) {
      let resData = this.resourceWorkers[i];
      if (resData.ResourceWorker.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(resData);
      }
    }
    this.allResourceWorkers = filtered;
  }
  getSuperVisor() {
    this._report.getResourceSupervisor_Data().then(data => {
      this.superVisors = data.resourceSupervisor;
    })
  };
  getSearchSuperVisor(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.superVisors.length; i++) {
      let resData = this.superVisors[i];
      if (resData.ResourceSupervisor.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(resData);
      }
    }
    this.allResourceSuperVisors = filtered;
  }
  getCatchMentArea() {
    this._report.getCatchmentArea_Data().then(data => {
      this.catchmentAreas = data.catchmentArea;
    })
  };
  getSearchCatchMentArea(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.catchmentAreas.length; i++) {
      let resData = this.catchmentAreas[i];
      if (resData.CatchDesc.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(resData);
      }
    }
    this.allCatchmentAreas = filtered;
  };
  //------All Sfa Office-----//
  sfaOffices = [];
  sfaOfficesAll = [];
  getSFAOffice() {
    this._report.getSFA_office_Data().then(data => {
      this.sfaOffices = data.SFAOffices;
    })
  };
  getSearchSFAofficeAll(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.sfaOffices.length; i++) {
      let resData = this.sfaOffices[i];
      if (resData.OfficeName.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(resData);
      }
    }
    this.sfaOfficesAll = filtered;
  };
  //--------End-------///
  //------All FCH Level OF Care-----//
  fchLevels = [];
  fchLevelsAll = [];
  getFchLevels() {
    this._report.getFCHlevelOfCare_Data().then(data => {
      this.fchLevels = data.FCHLevelOfCare;
    })
  };
  getFchLevelsAll(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.fchLevels.length; i++) {
      let resData = this.fchLevels[i];
      if (resData.FCHLevelOfCare.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(resData);
      }
    }
    this.fchLevelsAll = filtered;
  };
  //--------End-------///
  //------All Countys-----//
  countys = [];
  countysAll = [];
  getCountys() {
    this._report.getCounty_Data().then(data => {
      this.countys = data.county;
    })
  };
  getCountysAll(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.countys.length; i++) {
      let resData = this.countys[i];
      if (resData.countyName.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(resData);
      }
    }
    this.countysAll = filtered;
  };
  allFCHids = [];
  all_select_fch_ids: any;
  all_Fch_change(event, id) {
    if (event) {
      this.allFCHids.push(id);
      console.log(this.allFCHids);
      this.all_select_fch_ids = this.allFCHids.join();
    } else {
      var inde = this.allFCHids.map((o) => { return o }).indexOf(id);
      this.allFCHids.splice(inde, 1);
      console.log(this.allFCHids);
      this.all_select_fch_ids = this.allFCHids.join();
    }
    console.log("this.all_select_fch_ids>>", this.all_select_fch_ids);
  }
  workDis = true;
  workerDisable(workData) {
    if (workData === 'Show All') {
      this.allFCHids.forEach(ele => {
        this.selectFCH_ID[ele] = false;
      });
      this.allFCHids = [];
      this.all_select_fch_ids = this.allFCHids.join();
      this.resWorker = {};
      this.sfaOFc = {};
      this.countyData = {};
      this.resourceSupervisor = {};
      this.CatchmentAreaID = {};
      this.workDis = true;
      this.getFchLevels();
    } else {
      this.workDis = false;
    }
  };
  unCheckAllFCH() {
    this.allFCHids.forEach(ele => {
      this.selectFCH_ID[ele] = false;
    });
    this.allFCHids = [];
    this.all_select_fch_ids = this.allFCHids.join();
  };
  get_currefosterCareHome(init, end) {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    if (this.all_select_fch_ids == "" || this.all_select_fch_ids == undefined) {
      this.all_select_fch_ids = null
    }
    var Reqdata = {
      "report": "OM_FCH_CurrentFosterHomes",
      "resourceWorkerID": isNullOrUndefined(this.resWorker) ? null : this.resWorker.StaffID,
      "resourceSupervisorID": isNullOrUndefined(this.resourceSupervisor) ? null : this.resourceSupervisor.StaffID,
      "sfaStaffID": isNullOrUndefined(this.sfaOFc) ? null : this.sfaOFc.SFAOfficeID,
      "counyID": isNullOrUndefined(this.countyData) ? null : this.countyData.countyID,
      "fchLevelOfCareID": this.all_select_fch_ids,
      "staffID": parseInt(localStorage.getItem('UserId')) || 14802,
      "beginPagination": init,
      "endPagination": end,
    };
    if (this._router.url === '/reports/live-prioritized') {
      Reqdata['isExport'] = true;
      Reqdata['staffID'] = 14802;
    } else {
      Reqdata['isExport'] = true;
      Reqdata['staffID'] = parseInt(localStorage.getItem('UserId')) || 14802;
    }
    this._report.getPreDefinedReport(Reqdata).then(data => {
      loader.style.display = 'none';
      this.show_currentFoster_filter = false;
      this.resWorker = null;
      this.sfaOFc = null;
      this.countyData = null;
      this.resourceSupervisor = null;
      this.CatchmentAreaID = null;
      this.unCheckAllFCH();
      if (data.responseStatus) {
        var fchURL = data;
        if (this._router.url === '/reports/live-prioritized') {
          window.open('http://10.0.50.154:8081/viewReports/' + fchURL.docuemntID + '/' + fchURL.jwt);
        } else {
          window.open(environment.uri + ':8081/viewReports/' + fchURL.docuemntID + '/' + fchURL.jwt);
        };
      } else {
        swal(
          'Error!',
          'An error has occurred in CMS. Please contact your Administrator',
          'warning'
        )
      }
    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  };

  get_fosterRoster_Reports(init, end) {
    let loader = document.getElementById('loading-overlay-predefined') as HTMLElement
    loader.style.display = 'block';
    var Reqdata = {
      "report": "OM_FCHFosterRoster",
      "beginDate": this._localValues.report_begin_dateAndTime(this.beginDate),
      "endDate": this._localValues.report_end_dateAndTime(this.endDate),
      "StaffID": isNullOrUndefined(this.resWorker) ? null : this.resWorker.StaffID,
      "TeamLeaderID": isNullOrUndefined(this.resourceSupervisor) ? null : this.resourceSupervisor.StaffID,
      "CatchmentAreaID": isNullOrUndefined(this.CatchmentAreaID) ? null : this.CatchmentAreaID.CatchmentAreaID,
      "isExport": true,
      "staffID": parseInt(localStorage.getItem('UserId')) || 14802,
      "beginPagination": init,
      "endPagination": end
    }
    if (this._router.url === '/reports/live-prioritized') {
      Reqdata['staffID'] = 14802;
    } else {
      Reqdata['staffID'] = parseInt(localStorage.getItem('UserId')) || 14802;
    }
    this._report.getPreDefinedReport(Reqdata).then(data => {
      loader.style.display = 'none';
      this.show_FosterRoster_filter = false;
      this.resWorker = null;
      this.sfaOFc = null;
      this.countyData = null;
      this.resourceSupervisor = null;
      this.CatchmentAreaID = null;
      swal('Success!', 'Your request has been queued. You can see the exported files and their status in "My exports" page', 'success');
    }).catch(err => {
      this.show_FosterRoster_filter = false;
      loader.style.display = 'none';
    }
    );
  }
}
function removeA(array, item) {
  for (var i in array) {
    if (array[i] == item) {
      array.splice(i, 1);
      break;
    }
  }
  return array;
}
