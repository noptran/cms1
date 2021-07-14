import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClildFormService } from '../child-forms/child-forms.service';
import { ExportService } from '../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { PagesizeService } from '../pagesize/pagesize.service';

@Component({
  selector: 'app-staff-form-list',
  templateUrl: './staff-form-list.component.html',
  styleUrls: ['../person-master/Client/client-form/client-form.component.scss']
})
export class StaffFormListComponent implements OnInit {

  personName = 'Staff';
  customizedArray = 'customReport';
  columnToSorted = 'StaffID';
  filter = 'staff';
  tableArray = 'users';
  addLink = "/reports/staff/new";
  navigateTo = '/reports/staff/details';
  isSearchAny = true;
  breadcrumbs = [
    { label: 'Person Types', href: "/reports/person/types", active: '' },
    { label: 'Client', href: "", active: 'active' },
  ];
  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;
  fillField;

  @Input()
  Sidenav: boolean;
  orgForm: FormGroup;
  reportsViewList;
  Data;
  showForm: boolean = false;
  hideLoader: boolean = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  updateUser: boolean = false;
  countyData = [];
  raceData = [];
  genderData = [
    { id: 0, itemName: 'Male' },
    { id: 1, itemName: 'Female' },
  ];
  clientId;
  Race = [];
  CountyName = [];
  Gender = [];
  viewOnly: boolean;
  addOption = null;
  userDetails;
  head = [];
  isEmptyArray = [];
  isNotEmptyArray = [];
  showFilterError;
  fillBothFields;
  displayIsEmptyArray = [];
  displayIsNotEmptyArray = [];

  option: any = [{
    view: 'Between', value: 'Between'
  },
  {
    view: 'Equals', value: 'Equals'
  },
  {
    view: 'Greater than', value: 'Greater than'
  },
  {
    view: 'Lesser than', value: 'Lesser than'
  },
  {
    view: 'Contains', value: 'Contains'
  },
  {
    view: 'Greater than or Equals', value: 'Greater than or Equals'
  },
  {
    view: 'Less than or Equals', value: 'Less than or Equals'
  },
  {
    view: 'Not Between', value: 'notBetween'
  },
  {
    view: 'Is Empty', value: 'isEmpty'
  },
  {
    view: 'Is Not Empty', value: 'isNotEmpty'
  },
  ]


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
  numericHeaders = [];
  sortColumn;
  sortOrder;

  sortList = [
    { name: 'asc' },
    { name: 'desc' },
    { name: 'no sort' }
  ];
  personData = {}


  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  constructor(public router: Router,
    public clildFormService: ClildFormService,
    public _pageSize: PagesizeService) {
    this.defaultColDef = {
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    }
  }

  ngOnInit() {
    this.getPerson(this.initial, this.end);
  }

  goToMenu() {
    this.router.navigate(['/reports/person/types']);
  }

  add() {
    this.router.navigate(['/reports/staff/new']);
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  onRowSelected(event) {
    this.clildFormService.storeId(event.data.StaffID);
    this.router.navigate(['/reports/staff/details'])
  }

  clearDataFromPayload() {
    this.saveFilterId = null;
    this.FilterName = null;
    this.showSave = false;
    delete this.personData['paginationFilter'];
    this.personData['beginPagination'] = 1;
    this.personData['endPagination'] = 100;
    delete this.personData['equals'];
    delete this.personData['between'];
    delete this.personData['greaterThanOrEquals'];
    delete this.personData['lessThanOrEquals'];
    delete this.personData['greaterThan'];
    delete this.personData['lessThan'];
    delete this.personData['contains'];
    delete this.personData['notBetween'];
  }

  clearFilter() {

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

  reset() {
    this.clearDataFromPayload();
    this.clearFilter();
    this.getPerson('1', '100');
    let currentInput = document.getElementById('currentPage') as HTMLInputElement;
    currentInput.value = '1';
  }

  getPerson(initial: any, end: any) {
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    initial = initial;
    end = end;
    this.personData['filter'] = 'staff';
    this.personData['group by'] = 'All';
    this.personData['beginPagination'] = initial;
    this.personData['endPagination'] = end;
    this.personData['sort'] ? this.personData['sort'] : this.personData['sort'] = {
      "column": "StaffID",
      "mode": "desc"
    }

    console.log("in getPr", this.personData);
    this.clildFormService.getPerson(this.personData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount
      this.reportsViewList = data.users;
      this.numericColumns = data.dataTypes;
      this.rowData = data['users'] ? data['users'] : data['customReport']
      this.headers.push(Object.keys(this.rowData[0]))
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    })
  }

  getPersonAfterFilter(initial: any, end: any) {
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    let currentInput = document.getElementById('currentPage') as HTMLInputElement;
    currentInput.value = '1';
    loader.style.display = 'block';
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    initial = initial;
    end = end;
    this.personData['beginPagination'] = '1';
    this.personData['endPagination'] = '100';
    console.log("in getPr", this.personData);
    this.clildFormService.getPerson(this.personData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount;
      this.initial = 1;
      this.end = 100;
      this.reportsViewList = data.users;
      this.numericColumns = data.dataTypes;
      this.rowData = data['customReport']
      this.headers.push(Object.keys(this.rowData[0]))
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    })

  }

  getPersonAfterSort(initial: any, end: any) {
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    initial = initial;
    end = end;
    this.personData['filter'] = 'staff';
    this.personData['group by'] = 'All';
    this.personData['beginPagination'] = initial;
    this.personData['endPagination'] = end;
    console.log("in getPr", this.personData);
    this.clildFormService.getPerson(this.personData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount
      this.reportsViewList = data.users;
      this.numericColumns = data.dataTypes;
      this.rowData = data['users']
      this.headers.push(Object.keys(this.rowData[0]))
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    })

  }

  SortChanged() {
    if (this.sortColumn !== null && this.sortColumn !== undefined) {
      if (this.sortOrder.name !== 'no sort') {
        this.personData['sort'] = {
          "column": this.sortColumn,
          "mode": this.sortOrder.name
        }
        this.getPersonAfterSort(this.initial, this.end);

      }
      else if (this.sortOrder.name == 'no sort') {

        delete this.personData['sort'];
        this.getPerson(this.initial, this.end);
      }
    }
  }

  // getFavourites() {
  //     let getReq = {
  //       // "userId": localStorage.getItem('UserId'),
  //       "userId": 4621,
  //       "spName": this.spName
  //     }
  //     this._report.getFavourites(getReq).then(data => {
  //       this.favouriteFilters = data.favoriteFilter
  //     })
  //   }


  apply(data, ev) {
    if (ev.target.id == 'apply') {
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
      this.display(this.containsArray, this.displayContains);
      this.display(this.greaterThanArray, this.displayGreaterThan);
      this.display(this.lesserThanArray, this.displayLesserThan);
      this.display(this.notBetweenArray, this.displayNotBetweenArray);
      this.display(this.greaterThanOrEqualsArray, this.displaygreaterThanOrEqualsArray);
      this.display(this.lessThanOrEqualsArray, this.displaylessThanOrEqualsArray);
      this.displayForEmpty(this.isEmptyArray, this.displayIsEmptyArray);
      this.displayForEmpty(this.isNotEmptyArray, this.displayIsNotEmptyArray);
      this.applyFilter();
    }
  }

  mapFilterIntoArray(filterData, column, array) {
    if (this.newArray.indexOf(JSON.stringify({ column: column, filter: filterData }))) {
      this.newArray.push(JSON.stringify({ column: column, filter: filterData }));
      array.push({ column: column, filter: filterData });
    }
  }

  //   removeFavourites() {
  //     let deleteReq = {
  //       "favoriteFilterId": this.filterIdToDelete
  //     }
  //     this._report.deleteFavourites(deleteReq).then(data => {
  //       swal(
  //         'Success!',
  //         'Filter is deleted successfully!',
  //         'success'
  //       )
  //       this.getFavourites();
  //     })
  //     if (this.filterIdToDelete == this.saveFilterId) {
  //       this.getPerson(this.initial, this.end);
  //     }
  //   }


  remove(value, ind, display, array) {
    display.splice(ind, 1);
    let duplicateOriginalArray = array;
    duplicateOriginalArray.map((item, index) => {
      /**
       * have to check for column too..
       * Now it checks for value
       */
      let dataArray = item.filter;
      dataArray.map((data, i) => {
        if (JSON.stringify(data) == JSON.stringify(value.value)) {
          array[index].filter.splice(i, 1);
        }
      })
    })
    if (this.displayFilter2.length <= 0 && this.displayFilter2NonString.length <= 0 && this.displayGreaterThan.length <= 0 && this.displayLesserThan.length <= 0 && this.displayContains.length <= 0 && this.displaygreaterThanOrEqualsArray.length <= 0 && this.displaylessThanOrEqualsArray.length <= 0 && this.displayNotBetweenArray.length <= 0) {
      this.reset();
      this.showSave = false;
    }
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

  display(array, display) {
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
    let singledateFilter = document.getElementById('singledateFilter') as HTMLElement;
    let singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement;
    let dateFilter = document.getElementById('dateFilter') as HTMLElement;
    let intFilter = document.getElementById('intFilter') as HTMLElement;
    let textFilter = document.getElementById('textFilter') as HTMLElement;
    let singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement;


    // let tlpData = {
    //   "filterHeader": this.tlpDataHeader,
    //   "filter": this.tlpNameData,
    //   "beginDate": moment(new Date()).subtract(13, 'months').format('YYYY-MM-DD'),
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
      this.personData['between'] = filterArrayNonString;
      conditionArray.push('between');
    } else {
      delete this.personData['between'];
    }

    if (filterArray.length > 0) {
      this.personData['equals'] = filterArray;
      conditionArray.push('equals');
    } else {
      delete this.personData['equals'];
    }

    if (filterArrayContains.length > 0) {
      this.personData['contains'] = filterArrayContains;
      conditionArray.push('contains');
    } else {
      delete this.personData['contains'];
    }

    if (filtergreaterThanArray.length > 0) {
      this.personData['greaterThan'] = filtergreaterThanArray;
      conditionArray.push('greaterThan');
    } else {
      delete this.personData['greaterThan'];
    }

    if (filterlesserThanArray.length > 0) {
      this.personData['lessThan'] = filterlesserThanArray;
      conditionArray.push('lessThan');
    } else {
      delete this.personData['lessThan'];
    }

    if (filtergreaterThanorEqualsArray.length > 0) {
      this.personData['greaterThanOrEquals'] = filtergreaterThanorEqualsArray;
      conditionArray.push('greaterThanOrEquals');
    } else {
      delete this.personData['greaterThanOrEquals'];
    }

    if (filterlessThanorEqualsArray.length > 0) {
      this.personData['lessThanOrEquals'] = filterlessThanorEqualsArray;
      conditionArray.push('lessThanOrEquals');
    } else {
      delete this.personData['lessThanOrEquals'];
    }

    if (filterNotBetweenArray.length > 0) {
      this.personData['notBetween'] = filterNotBetweenArray;
      conditionArray.push('notBetween');
    } else {
      delete this.personData['notBetween'];
    }

    if (filterIsEmptyArray.length > 0) {
      this.personData['isEmpty'] = filterIsEmptyArray;
      conditionArray.push('isEmpty');
    } else {
      delete this.personData['isEmpty'];
    }

    if (filterIsNotEmptyArray.length > 0) {
      this.personData['isNotEmpty'] = filterIsNotEmptyArray;
      conditionArray.push('isNotEmpty');
    } else {
      delete this.personData['isNotEmpty'];
    }

    this.personData['paginationFilter'] = true;
    this.personData['beginPagination'] = 1;
    this.personData['endPagination'] = 100;

    if (conditionArray.length > 1) {
      this.personData['paginationFilters'] = conditionArray;
    } else {
      delete this.personData['paginationFilters'];
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
      this.personData['paginationFilter'] = true;
      this.saveFilter = this.personData;
      console.log("in apply", this.personData);
      this.getPersonAfterFilter(this.initial, this.end);
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
    let filters = [];
    let a = [];
    let data = [];
    let value;

    if (this.tempFilterConditionOption == 'Between') {
      if (this.startingDate !== null && this.startingDate !== undefined && this.endingDate !== null && this.endingDate !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")");
        }
        let filter = [];
        filter.push("'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.originalArrayNonString.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.originalArrayNonString.splice(i, 1);
              this.displayFilter2NonString.splice(i, 1);
            }
          })
          this.originalArrayNonString.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.startingDate = null;
        this.endingDate = null;
      } else if (this.startNumber !== null && this.startNumber !== undefined && this.endNumber !== null && this.endNumber !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")");
        }
        let filter = [];
        filter.push("'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.originalArrayNonString.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.originalArrayNonString.splice(i, 1);
              this.displayFilter2NonString.splice(i, 1);
            }
          })
          this.originalArrayNonString.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.endNumber = null;
        this.startNumber = null;
      } else {
        this.fillBothFields = true;
        setTimeout(() => { this.fillBothFields = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'notBetween') {
      if (this.startingDate !== null && this.startingDate !== undefined && this.endingDate !== null && this.endingDate !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'" + ")");
        }
        let filter = [];
        filter.push("'" + new Date(this.startingDate).toLocaleDateString() + "'" + ' and ' + "'" + new Date(this.endingDate).toLocaleDateString() + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.notBetweenArray.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.notBetweenArray.splice(i, 1);
              this.displayNotBetweenArray.splice(i, 1);
            }
          })
          this.notBetweenArray.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.startingDate = null;
        this.endingDate = null;
      } else if (this.startNumber !== null && this.startNumber !== undefined && this.endNumber !== null && this.endNumber !== undefined) {
        if (this.tempConditionArray.indexOf('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")") == -1) {
          this.tempConditionArray.push('(' + this.tempFilterColumnSelected + ' between ' + "'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'" + ")");
        }
        let filter = [];
        filter.push("'" + this.startNumber + "'" + ' and ' + "'" + this.endNumber + "'");
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          this.notBetweenArray.map((item, i) => {
            if (item.column == this.tempFilterColumnSelected) {
              this.notBetweenArray.splice(i, 1);
              this.displayNotBetweenArray.splice(i, 1);
            }
          })
          this.notBetweenArray.push({ column: this.tempFilterColumnSelected, filter: filter });
        }
        this.endNumber = null;
        this.startNumber = null;
      }
      else {
        this.fillBothFields = true;
        setTimeout(() => { this.fillBothFields = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Equals') {
      if (this.StringToFilter !== null && this.StringToFilter !== undefined) {
        if (this.tempSelectedDataToFilter.indexOf(JSON.stringify(this.StringToFilter)) == -1) {
          this.tempSelectedDataToFilter.push(JSON.stringify(this.StringToFilter));
          a.push("'" + this.StringToFilter + "'");
        }
        filters.push(this.StringToFilter);
        this.StringToFilter = null;
        if (filters.length > 0) {
          if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters }))) {
            this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters }));
            if (this.originalArray.length > 0) {
              this.originalArray.map((item) => {
                data.push(item.column)
              })
              value = data.includes(this.tempFilterColumnSelected)
              if (value) {
                this.originalArray.map((item, i) => {
                  if (item.column == this.tempFilterColumnSelected) {
                    this.originalArray[i].filter.push(filters[0]);
                  }
                })
              }
              if (!value) {
                if (this.originalArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filters })) == -1) {
                  this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filters });
                }
              }
            } else {
              this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filters });
            }
          }
        }
      }
      else if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(this.NumberToFilter);
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.originalArray.length > 0) {
            this.originalArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.originalArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.originalArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.originalArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push(new Date(this.DateToFilter).toLocaleDateString());
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.originalArray.length > 0) {
            this.originalArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.originalArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.originalArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.originalArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.originalArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Contains') {
      if (this.StringToFilter !== null && this.StringToFilter !== undefined) {
        let filter = [];
        filter.push(this.StringToFilter);
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.containsArray.length > 0) {
            this.containsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.containsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.containsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.containsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.StringToFilter = null;
      }
      else if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.containsArray.length > 0) {
            this.containsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.containsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.containsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.containsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push(this.DateToFilter);
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.containsArray.length > 0) {
            this.containsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.containsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.containsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.containsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.containsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'isEmpty') {
      if (this.tempFilterColumnSelected !== '' && this.tempFilterColumnSelected !== undefined) {
        if (this.tempConditionArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected })) == -1) {
          this.tempConditionArray.push(JSON.stringify({ column: this.tempFilterColumnSelected }));
          this.isEmptyArray.push({ column: this.tempFilterColumnSelected });
        }
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'isNotEmpty') {
      if (this.tempFilterColumnSelected !== '' && this.tempFilterColumnSelected !== undefined) {
        if (this.tempConditionArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected })) == -1) {
          this.tempConditionArray.push(JSON.stringify({ column: this.tempFilterColumnSelected }));
          this.isNotEmptyArray.push({ column: this.tempFilterColumnSelected });
        }
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Greater than') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanArray.length > 0) {
            this.greaterThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanArray.length > 0) {
            this.greaterThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Greater than or Equals') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanOrEqualsArray.length > 0) {
            this.greaterThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.greaterThanOrEqualsArray.length > 0) {
            this.greaterThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.greaterThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.greaterThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.greaterThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.greaterThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }


    if (this.tempFilterConditionOption == 'Lesser than') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lesserThanArray.length > 0) {
            this.lesserThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lesserThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lesserThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lesserThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lesserThanArray.length > 0) {
            this.lesserThanArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lesserThanArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lesserThanArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lesserThanArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lesserThanArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
      }
    }

    if (this.tempFilterConditionOption == 'Less than or Equals') {
      if (this.NumberToFilter !== null && this.NumberToFilter !== undefined) {
        let filter = [];
        filter.push(String(this.NumberToFilter));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lessThanOrEqualsArray.length > 0) {
            this.lessThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lessThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lessThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lessThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.NumberToFilter = null;
      } else if (this.DateToFilter !== null && this.DateToFilter !== undefined) {
        let filter = [];
        filter.push((new Date(this.DateToFilter).toLocaleDateString()));
        if (this.newArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }))) {
          this.newArray.push(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter }));
          if (this.lessThanOrEqualsArray.length > 0) {
            this.lessThanOrEqualsArray.map((item) => {
              data.push(item.column)
            })
            value = data.includes(this.tempFilterColumnSelected)
            if (value) {
              this.lessThanOrEqualsArray.map((item, i) => {
                if (item.column == this.tempFilterColumnSelected) {
                  this.lessThanOrEqualsArray[i].filter.push(filter[0]);
                }
              })
            }
            if (!value) {
              if (this.lessThanOrEqualsArray.indexOf(JSON.stringify({ column: this.tempFilterColumnSelected, filter: filter })) == -1) {
                this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
              }
            }
          } else {
            this.lessThanOrEqualsArray.push({ column: this.tempFilterColumnSelected, filter: filter });
          }
        }
        this.DateToFilter = null;
      } else {
        this.fillField = true;
        setTimeout(() => { this.fillField = false; }, 2000);
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
  }


  /***
 * Jumb to page, Enter the page value and navigate to the particular page
 * @returns get list of person masters
 * @event keyboard event
 */
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);
    }
  }

  /**
   * Navigation button actions
   * @param event mouseclick event
   * @returns respective page as per the naigation button actions
   */
  pagesize(event) {
    if (event.target.localName == 'img') {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);

    }
  }

  onConditionFilterSelected(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    switch (event) {
      case 'Between':
        this.columnDropdownList = []
        this.numericHeaders = []

        this.numericColumns.map(data => {

          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Greater than':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME)
          }
        })
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Lesser than':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Greater than or Equals':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'Less than or Equals':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      case 'notBetween':
        this.columnDropdownList = []
        this.numericHeaders = []
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer')
            return this.numericHeaders.push(data.COLUMN_NAME)
        })

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
        break;
      default:
        this.columnDropdownList = []
        this.headers[0].map(data => {
          this.columnDropdownList.push({ label: data, value: data })
        })
    }

    this.filterColumnSelected = null;
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
}
