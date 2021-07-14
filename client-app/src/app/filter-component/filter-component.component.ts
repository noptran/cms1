import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { PrioritizedReportsService } from '../prioritized-reports/prioritized-reports.service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss', '../prioritized-reports/prioritized-reports.component.scss'],
  inputs: ['dataTypes', 'columnList', 'payload'],
  outputs: ['apply', 'resetFilter']
})
export class FilterComponentComponent implements OnInit {

  @Input()
  dataTypes: any;
  columnList: any;
  payload: any;

  @Output()
  apply = new EventEmitter();
  resetFilter = new EventEmitter();

  isEmptyArray = [];
  isNotEmptyArray = [];
  showFilterError;
  fillBothFields;
  displayIsEmptyArray = [];
  displayIsNotEmptyArray = [];

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
  ];

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
  ];

  optionFiltered = [];


  startNumber: null;
  endNumber: null;
  startingDate: null;
  endingDate: null;

  NumberToFilter: null;
  DateToFilter: null;
  StringToFilter: String;
  FilterName: String;
  showSave = false;
  saveFilter;
  favouriteFilters = [];
  saveFilterId = null;
  filterIdToDelete = null;
  filterList2Temp = [];
  fileName;
  rowData;

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
  fillField;
  headers = [];
  rawdata = [];
  personData = {};
  isOpenMainPanel = false;
  openFilterDialogBox = false;
  advanceFiltersTotal = [];
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
  defaultGroupingCondition = 'and';
  expectedQuery: any;
  collectionOfAnd = [];
  collectionOfOR = [];
  queryStringAND: any;
  queryStringOR: any;
  finalQueryString: any;
  filterStr: any;
  groupingRequest: any;
  data: any;
  isGrouping: any;
  spName;
  constructor(public _report: PrioritizedReportsService) { }

  ngOnInit() {
    this.columnDropdownList = this.columnList;
    this.numericColumns = this.dataTypes;
    this.personData = this.payload;
  }

  /**
   * Clears preview of selected filters
   */
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

  /**
   * Clear filters data from payload
   */
  clearFilterDataFromPayload() {
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

  /**
   * Remove apply filters
   */
  reset() {
    this.clearFilterDataFromPayload();
    this.clearFilter();
    let outputPayload;
    outputPayload = this.personData;
    this.apply.emit(outputPayload);
    this.resetFilter.emit(outputPayload);
  }

  /**
   * Remove from th filter from preview panel
   */

  /**
   * Apply the filter
   */
  applyFilter() {
    const singledateFilter = document.getElementById('singledateFilter') as HTMLElement;
    const singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement;
    const dateFilter = document.getElementById('dateFilter') as HTMLElement;
    const intFilter = document.getElementById('intFilter') as HTMLElement;
    const textFilter = document.getElementById('textFilter') as HTMLElement;
    const singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement;
    let outputPayload: any;

    const filterArray = [];
    this.originalArray.map(item => {
      const val = [];
      item.filter.map(data => {
        val.push({ value: data });
      });
      if (val.length > 0) {
        filterArray.push({ column: item.column, filter: val });
      }
    });

    const filterArrayNonString = [];
    this.originalArrayNonString.map(item => {
      const val = [];
      item.filter.map(data => {
        const arr = data.split('and');

        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') });
        });
      });
      if (val.length > 0) {
        filterArrayNonString.push({ column: item.column, filter: val });
      }
    });

    const filterNotBetweenArray = [];
    this.notBetweenArray.map(item => {
      const val = [];
      item.filter.map(data => {
        const arr = data.split('and');
        arr.map(DATA => {
          val.push({ value: DATA.replace(/['"]+/g, '') });
        });
      });
      if (val.length > 0) {
        filterNotBetweenArray.push({ column: item.column, filter: val });
      }
    });


    const filtergreaterThanArray = [];
    this.greaterThanArray.map(item => {
      const val = [];
      item.filter.map(data => {
        val.push(data);
      });
      if (val.length > 0) {
        filtergreaterThanArray.push({ column: item.column, value: val });
      }
    });

    const filterlesserThanArray = [];
    this.lesserThanArray.map(item => {
      const val = [];
      item.filter.map(data => {
        val.push(data);
      });
      if (val.length > 0) {
        filterlesserThanArray.push({ column: item.column, value: val });
      }
    });

    const filterArrayContains = [];
    this.containsArray.map(item => {
      const val = [];
      item.filter.map(data => {
        val.push(data);
      });
      if (val.length > 0) {
        filterArrayContains.push({ column: item.column, value: val });
      }
    });


    const filtergreaterThanorEqualsArray = [];
    this.greaterThanOrEqualsArray.map(item => {
      const val = [];
      item.filter.map(data => {
        val.push(data);
      });
      if (val.length > 0) {
        filtergreaterThanorEqualsArray.push({ column: item.column, value: val });
      }
    });

    const filterlessThanorEqualsArray = [];
    this.lessThanOrEqualsArray.map(item => {
      const val = [];
      item.filter.map(data => {
        val.push(data);
      });
      if (val.length > 0) {
        filterlessThanorEqualsArray.push({ column: item.column, value: val });
      }
    });

    const filterIsEmptyArray = [];
    this.isEmptyArray.map(item => {
      filterIsEmptyArray.push({ column: item.column });
    });

    const filterIsNotEmptyArray = [];
    this.isNotEmptyArray.map(item => {
      filterIsNotEmptyArray.push({ column: item.column });
    });

    const conditionArray = [];
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
      outputPayload = this.personData;
      this.apply.emit(outputPayload);
    }



    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;
    dateFilter.style.display = 'none';
    textFilter.style.display = 'none';
    intFilter.style.display = 'none';
    singleIntFilter.style.display = 'none';
    singledateFilter.style.display = 'none';
    singleStringFilter.style.display = 'inline-block';
    this.filterColumnSelected = null;
    this.selectedDataToFilter = [];
    this.tempSelectedDataToFilter = [];
  }

  /**
   * Based column selection, Field will display
   */
  columnSelector(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    const dateFilter = document.getElementById('dateFilter') as HTMLElement;
    const intFilter = document.getElementById('intFilter') as HTMLElement;
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn;
    const singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement;
    const singledateFilter = document.getElementById('singledateFilter') as HTMLElement;
    const singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement;

    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === event) {
        return checkColumn = result.DATA_TYPE;
      }
    });

    if (checkColumn == 'int' || checkColumn == 'datetime' || checkColumn == 'Integer' || checkColumn == 'decimal') {
      this.optionFiltered = this.option;
    } else {
      this.optionFiltered = this.optionForText;
    }

    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block';
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
      }
    } else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block';
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    }

    this.selectedDataToFilter = [];
    this.tempFilterColumnSelected = this.filterColumnSelected;
    this.tempFilterConditionOption = this.filterConditionOption;
  }

  /**
   * Based on condition column will select
   */
  conditionSelector(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    switch (event) {
      case 'Between':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME);
          }
        });
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data });
        });
        break;
      case 'Greater than':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME);
          }
        });
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data });
        });
        break;
      case 'Lesser than':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME);
          }
        });

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data });
        });
        break;
      case 'Greater than or Equals':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME);
          }
        });
        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data });
        });
        break;
      case 'Less than or Equals':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME);
          }
        });

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data });
        });
        break;
      case 'notBetween':
        this.columnDropdownList = [];
        this.numericHeaders = [];
        this.numericColumns.map(data => {
          if (data.DATA_TYPE == 'int' || data.DATA_TYPE == 'datetime' || data.DATA_TYPE == 'Integer') {
            return this.numericHeaders.push(data.COLUMN_NAME);
          }
        });

        this.numericHeaders.map(data => {
          this.columnDropdownList.push({ label: data, value: data });
        });
        break;
      default:
        this.columnDropdownList = [];
        this.columnDropdownList = this.columnList;

    }

    const dateFilter = document.getElementById('dateFilter') as HTMLElement;
    const intFilter = document.getElementById('intFilter') as HTMLElement;
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn;
    const singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement;
    const singledateFilter = document.getElementById('singledateFilter') as HTMLElement;
    const singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement;

    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === event) {
        return checkColumn = result.DATA_TYPE;
      }
    });
    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
      }
    } else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block';
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }

    }
    this.tempFilterConditionOption = this.filterConditionOption;
  }

  /**
   * Generate the query for filtering
   */
  queryGeneration() {
    const filters = [];
    const a = [];
    const data = [];
    let value;

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
        };

      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
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
            );
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
            );
          }
        });
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
          };
        this.collectionOfBetween.push(reqObj);
      }
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
        };
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
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
            );
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
            );
          }
        });
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
          };
        this.collectionOfNotBetween.push(reqObj);
      }

    }

    if (this.tempFilterConditionOption == 'Equals') {
      let isDuplicate = false;
      this.StringToFilter;
      this.NumberToFilter;
      this.DateToFilter;
      this.tempFilterConditionOption,
        this.tempFilterColumnSelected;
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter),
        condition: '='
      };
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfEquals.length > 0) {
        this.collectionOfEquals.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
          filter: [
            {
              value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
            }
          ]
        };
        this.collectionOfEquals.push(reqObj);
      }

    }

    if (this.tempFilterConditionOption == 'Contains') {
      let isDuplicate = false;
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: 'contains'
      };
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfContains.length > 0) {
        this.collectionOfContains.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
          filter: [
            {
              value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
            }
          ]
        };
        this.collectionOfContains.push(reqObj);
      }
    }

    if (this.tempFilterConditionOption == 'isEmpty') {
      let isDuplicate = false;
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: 'is empty'
      };

      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfIsEmpty.length > 0) {
        this.collectionOfIsEmpty.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
          } else {
            this.collectionOfIsEmpty.push(
              {
                column: this.tempFilterColumnSelected,
              }
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
        };
        this.collectionOfIsEmpty.push(reqObj);
      }
    }

    if (this.tempFilterConditionOption == 'isNotEmpty') {
      let isDuplicate = false;
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: 'is not empty'
      };

      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfIsNotEmpty.length > 0) {
        this.collectionOfIsNotEmpty.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
          } else {
            this.collectionOfIsNotEmpty.push(
              {
                column: this.tempFilterColumnSelected,
              }
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
        };
        this.collectionOfIsNotEmpty.push(reqObj);
      }
    }

    if (this.tempFilterConditionOption == 'Greater than') {
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: '>'
      };
      let isDuplicate = false;
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfGreaterthan.length > 0) {
        this.collectionOfGreaterthan.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
          filter: [
            {
              value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
            }
          ]
        };
        this.collectionOfGreaterthan.push(reqObj);
      }

    }

    if (this.tempFilterConditionOption == 'Greater than or Equals') {
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: '>='
      };
      let isDuplicate = false;
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfGreaterthanEqual.length > 0) {
        this.collectionOfGreaterthanEqual.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
          filter: [
            {
              value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
            }
          ]
        };
        this.collectionOfGreaterthanEqual.push(reqObj);
      }

    }


    if (this.tempFilterConditionOption == 'Lesser than') {
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: '<'
      };
      let isDuplicate = false;
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfLessthan.length > 0) {
        this.collectionOfLessthan.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
          filter: [
            {
              value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
            }
          ]
        };
        this.collectionOfLessthan.push(reqObj);
      }

    }

    if (this.tempFilterConditionOption == 'Less than or Equals') {
      const obj = {
        column: this.tempFilterColumnSelected,
        filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
        condition: '<='
      };
      let isDuplicate = false;
      if (this.advanceFiltersTotal.length > 0) {
        this.advanceFiltersTotal.filter((item: any, index: any) => {
          if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
            isDuplicate = false;
            return swal('Duplicate filter', 'This filter already available', 'warning');
          } else {
            isDuplicate = true;
          }
        });
        if (isDuplicate) {
          this.advanceFiltersTotal.push(obj);
        }
      } else {
        this.advanceFiltersTotal.push(obj);
      }

      if (this.collectionOfLessthanEqual.length > 0) {
        this.collectionOfLessthanEqual.filter((data: any) => {
          if (data.column === this.tempFilterColumnSelected) {
            data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
            );
          }
        });
      } else {
        const reqObj = {
          column: this.tempFilterColumnSelected,
          filter: [
            {
              value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
            }
          ]
        };
        this.collectionOfLessthanEqual.push(reqObj);
      }
    }
    if (this.defaultGroupingCondition === 'and') {
      this.filterGrouping(this.advanceFiltersTotal[this.advanceFiltersTotal.length - 1], 'and', this.tempFilterConditionOption, false, 0);
    }
  }

  openFilterOptions() {
    this.isOpenMainPanel = !this.isOpenMainPanel;
  }

  filterDialogBoxAction() {
    this.openFilterDialogBox = true;
    this.isOpenMainPanel = false;
  }

  getDateFormat(dateInput: any) {
    return new Date(dateInput).getFullYear() + '-' + +new Date(dateInput).getMonth() + 1 + '-' + new Date(dateInput).getDate() + ' '
      + new Date(dateInput).getHours() + ':' + new Date(dateInput).getMinutes() + ':' + '00'
      + ':' + '00';
  }

  FiltergetReportsByFilter(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.filterQuery = '';
    this._report.getReportsByFilter(data).then(data => {
      this.filterQuery = data.filterQuery;
    });
  }

  FiltergetReportsByFilterTLP(req) {
    this._report.getReportsByFilter(req).then(data => {
      this.filterQuery = data.filterQuery;
    });
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
        selectedFilter.filter = `%${selectedFilter.filter}%`;
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
      this.collectionOfOR.push(`(${selectedFilter.column} ${condition} '${selectedFilter.filter}') OR`);
    } else {
      this.collectionOfAnd.push(`(${selectedFilter.column} ${condition} '${selectedFilter.filter}') AND`);
    }
    this.queryStringAND = `( ${this.collectionOfAnd.join(' ')} )`;
    this.queryStringOR = `( ${this.collectionOfOR.join(' ')} )`;
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
            });
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
            });
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
            });
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
            });
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
            });
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
            });
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
            });
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
            });
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
            });
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
            });
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

  applyGrouping() {
    let singleQuery = '';
    if (this.advanceFiltersTotal.length === 1) {
      this.advanceFiltersTotal.filter((item: any) => {
        singleQuery = `${item.column} ${item.condition} '${item.filter}'`;
      });
      this.data['filter'] = singleQuery;
    }
    if (this.tlpNameData == '') {
      this.saveFilter = this.data;
      return this.FiltergetReportsByFilter(this.data);
    } else {
      this.saveFilter = this.data;
      return this.FiltergetReportsByFilterTLP(this.data);
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

    const dateFilter = document.getElementById('dateFilter') as HTMLElement;
    const intFilter = document.getElementById('intFilter') as HTMLElement;
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn;
    const singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement;
    const singledateFilter = document.getElementById('singledateFilter') as HTMLElement;
    const singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement;
    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === this.filterColumnSelected) {
        return checkColumn = result.DATA_TYPE;
      }
    });
    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
      }
    } else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block';
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }

    }
    this.tempFilterConditionOption = this.filterConditionOption;
  }
  onColumnFilterSelected(event) {
    this.startingDate = null;
    this.endingDate = null;
    this.startNumber = null;
    this.endNumber = null;
    this.NumberToFilter = null;
    this.DateToFilter = null;
    this.StringToFilter = null;

    const dateFilter = document.getElementById('dateFilter') as HTMLElement;
    const intFilter = document.getElementById('intFilter') as HTMLElement;
    let textFilter = document.getElementById('textFilter') as HTMLElement, checkColumn;
    const singleIntFilter = document.getElementById('singleIntFilter') as HTMLElement;
    const singledateFilter = document.getElementById('singledateFilter') as HTMLElement;
    const singleStringFilter = document.getElementById('singleStringFilter') as HTMLElement;

    this.numericColumns.map(result => {
      if (result.COLUMN_NAME === event) {
        return checkColumn = result.DATA_TYPE;
      }
    });

    if (checkColumn == 'int' || checkColumn == 'datetime' || checkColumn == 'Integer' || checkColumn == 'decimal') {
      this.optionFiltered = this.option;
    } else {
      this.optionFiltered = this.optionForText;
    }

    if (this.filterConditionOption == 'Between' || this.filterConditionOption == 'notBetween') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'inline-block';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'Contains') {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block';
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    } else if (this.filterConditionOption == 'isEmpty' || this.filterConditionOption == 'isNotEmpty') {
      switch (checkColumn) {
        case 'datetime':
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
      }
    } else {
      switch (checkColumn) {
        case 'datetime':
          intFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          singledateFilter.style.display = 'inline-block';
          singleStringFilter.style.display = 'none';
          break;
        case 'int':
          singleIntFilter.style.display = 'inline-block';
          intFilter.style.display = 'none';
          textFilter.style.display = 'none';
          dateFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'none';
          break;
        default:
          dateFilter.style.display = 'none';
          textFilter.style.display = 'none';
          singleIntFilter.style.display = 'none';
          intFilter.style.display = 'none';
          singledateFilter.style.display = 'none';
          singleStringFilter.style.display = 'inline-block';
      }
    }

    this.selectedDataToFilter = [];
    this.tempFilterColumnSelected = this.filterColumnSelected;
    this.tempFilterConditionOption = this.filterConditionOption;
    const tempDataArray = [];
    this.columnData = [];
    this.rowData.map((item) => {
      if (tempDataArray.indexOf(item[event]) == -1 && item[event] !== '' && item[event] !== null) {
        tempDataArray.push(item[event]);
      }
    });
    tempDataArray.map((item, i) => {
      this.columnData.push({ itemName: item, id: i });
    });


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
  display(array, display, ) {
    const conditionTemp = '';
    if (array.length > 0) {
      array.map(item => {
        if (display.length > 0) {
          const dis = [];
          display.map(str => {
            dis.push(JSON.stringify(str));
          });
          item.filter.map(filt => {
            if (dis.indexOf(JSON.stringify({ column: item.column, value: filt })) == -1) {
              display.push({ column: item.column, value: filt });
            }
          });
        } else {
          item.filter.map(data => {
            display.push({ column: item.column, value: data });
          });
        }
      });
    }
  }

  displayForEmpty(array, display) {
    const dis = [];
    if (display.length > 0) {
      display.map(str => {
        dis.push(JSON.stringify(str));
      });
    }
    if (array.length > 0) {
      array.map(data => {
        if (dis.indexOf(JSON.stringify({ column: data.column })) == -1) {
          display.push({ column: data.column });
        }
      });
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
      });
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
      });
      this.filterStr = data;
      this.data['filter'] = this.filterStr;
    }
  }

  setAdvFilter() {
    if (this.advanceFiltersTotal.length < 5) {
      this.showSave = false;
      const filters = [];
      const a = [];
      const data = [];
      let value;
      const i = 0;

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
          };

        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
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
              );
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
              );
            }
          });
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
            };
          this.collectionOfBetween.push(reqObj);
        }
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
          };
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
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
              );
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
              );
            }
          });
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
            };
          this.collectionOfNotBetween.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'Equals') {
        let isDuplicate = false;
        this.StringToFilter;
        this.NumberToFilter;
        this.DateToFilter;
        this.tempFilterConditionOption,
          this.tempFilterColumnSelected;
        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter),
          condition: '='
        };
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfEquals.length > 0) {
          this.collectionOfEquals.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
          };
          this.collectionOfEquals.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'Contains') {
        let isDuplicate = false;
        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: 'like'
        };
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfContains.length > 0) {
          this.collectionOfContains.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]

          };
          this.collectionOfContains.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'isEmpty') {
        let isDuplicate = false;
        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: 'is empty'
        };

        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfIsEmpty.length > 0) {
          this.collectionOfIsEmpty.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
            } else {
              this.collectionOfIsEmpty.push(
                {
                  column: this.tempFilterColumnSelected,
                }
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
          };
          this.collectionOfIsEmpty.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'isNotEmpty') {
        let isDuplicate = false;
        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: 'is not empty'
        };

        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfIsNotEmpty.length > 0) {
          this.collectionOfIsNotEmpty.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
            } else {
              this.collectionOfIsNotEmpty.push(
                {
                  column: this.tempFilterColumnSelected,
                }
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,

          };
          this.collectionOfIsNotEmpty.push(reqObj);
        }
      }

      if (this.tempFilterConditionOption == 'Greater than') {
        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '>'
        };
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfGreaterthan.length > 0) {
          this.collectionOfGreaterthan.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]

          };
          this.collectionOfGreaterthan.push(reqObj);
        }

      }

      if (this.tempFilterConditionOption == 'Greater than or Equals') {

        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '>='
        };
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfGreaterthanEqual.length > 0) {
          this.collectionOfGreaterthanEqual.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]

          };
          this.collectionOfGreaterthanEqual.push(reqObj);
        }

      }


      if (this.tempFilterConditionOption == 'Lesser than') {

        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '<'
        };
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfLessthan.length > 0) {
          this.collectionOfLessthan.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]

          };
          this.collectionOfLessthan.push(reqObj);
        }

      }

      if (this.tempFilterConditionOption == 'Less than or Equals') {

        const obj = {
          column: this.tempFilterColumnSelected,
          filter: this.StringToFilter || this.NumberToFilter || new Date(this.DateToFilter).toLocaleDateString(),
          condition: '<='
        };
        let isDuplicate = false;
        if (this.advanceFiltersTotal.length > 0) {
          this.advanceFiltersTotal.filter((item: any, index: any) => {
            if ((item.column === obj.column) && (item.filter === obj.filter) && (item.condition === obj.condition)) {
              isDuplicate = false;
              return swal('Duplicate filter', 'This filter already available', 'warning');
            } else {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            this.advanceFiltersTotal.push(obj);
          }
        } else {
          this.advanceFiltersTotal.push(obj);
        }

        if (this.collectionOfLessthanEqual.length > 0) {
          this.collectionOfLessthanEqual.filter((data: any) => {
            if (data.column === this.tempFilterColumnSelected) {
              data.filter.push({ value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter) });
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
              );
            }
          });
        } else {
          const reqObj = {
            column: this.tempFilterColumnSelected,
            filter: [
              {
                value: this.StringToFilter || this.NumberToFilter || this.getDateFormat(this.DateToFilter)
              }
            ]
          };
          this.collectionOfLessthanEqual.push(reqObj);
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

      if (this.defaultGroupingCondition === 'and') {
        this.filterGrouping(this.advanceFiltersTotal[this.advanceFiltersTotal.length - 1], 'and', this.tempFilterConditionOption, false, 0);
      }
    } else {
      swal('Filter limit exceeded!', 'Your exceeding the filters limit, You can only use five filters in this report', 'info');
    }
  }

  save() {
    if (this.saveFilterId == null) {
      this.saveNew();
    } else {
      this.updateSavedFilter();
    }
  }

  saveNew() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    if (this.FilterName == undefined || this.FilterName == '' || this.FilterName.replace(/\s/g, '').length <= 0 || this.FilterName.match(/^[^a-zA-Z0-9]+$/) !== null) {
      swal(
        'Error!',
        'Please provide a valid filter name!',
        'warning'
      );
    } else {
      loader.style.display = 'block';
      const saveReq = {
        'favoriteFilterName': this.FilterName,
        'favoriteFilterRequest': JSON.stringify(this.saveFilter),
        // "userId": localStorage.getItem('UserId'),
        'userId': 4621,
        'spName': this.spName
      };
      this._report.saveFilter(saveReq).then(data => {
        this.saveFilterId = data.favoriteFilter.favoriteFilterId;
        loader.style.display = 'none';
        if (data.responseStatus) {
          swal(
            'Success',
            'Filter saved successfully.You shall see the saved filter only for this particular report',
            'success'
          );
          this.getFavourites();
        } else {
          swal(
            'Error!',
            'Filter not saved!',
            'warning'
          );
        }
      });
    }
  }

  updateSavedFilter() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    if (this.FilterName == undefined || this.FilterName == '' || this.FilterName.replace(/\s/g, '').length <= 0 || this.FilterName.match(/^[^a-zA-Z0-9]+$/) !== null) {
      swal(
        'Error!',
        'Please provide a valid filter name!',
        'warning'
      );
    } else {
      loader.style.display = 'block';
      const saveReq = {
        'favoriteFilterId': this.saveFilterId,
        'favoriteFilterName': this.FilterName,
        'favoriteFilterRequest': JSON.stringify(this.saveFilter),
        'userId': localStorage.getItem('UserId'),
        // "userId": 4621,
        'spName': this.spName
      };
      this._report.updateFilter(saveReq).then(data => {
        loader.style.display = 'none';
        if (data.responseStatus) {
          swal(
            'Success',
            'Filter saved successfully.You shall see the saved filter only for this particular report',
            'success'
          );
          this.getFavourites();
        } else {
          swal(
            'Error!',
            'Filter not saved!',
            'warning'
          );
        }
      });
    }
  }

  getFavourites() {
    const getReq = {
      // "userId": localStorage.getItem('UserId'),
      'userId': 4621,
      'spName': this.spName
    };
    this._report.getFavourites(getReq).then(data => {
      this.favouriteFilters = data.favoriteFilter;
    });
  }

}
