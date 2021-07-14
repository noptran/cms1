import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PagesizeService } from "./pagesize.service";
import swal from "sweetalert2";

@Component({
  selector: "app-pagesize",
  inputs: ["totalCount", "initial", "end", "action"],
  outputs: ["currentPgae", "totalPage", "pageNavigationOut"],
  templateUrl: "./pagesize.component.html",
  styleUrls: ["./pagesize.component.scss"],
})
export class PagesizeComponent implements OnInit {
  totalPage: any;
  finalPageCount: any;
  startPage: any;
  currentPage: any;
  initialCount: any;
  endCount: any;
  nopreviousBtnDisable = false;
  nonextBtnDisable = false;

  @Input()
  totalCount: any;
  initial: any;
  end: any;

  @Output()
  pageNavigationOut = new EventEmitter();
  pageValueEnterOut = new EventEmitter();

  constructor(public _pageSize: PagesizeService) {}

  ngOnInit() {
    this.currentPage = 1;
    setInterval(() => {
      this.totalPage = this.definePaginationValues();
    }, 2000);
    this.determineInitialNavigationValues();
  }

  /**
   * Define the initial pagination values
   */
  determineInitialNavigationValues() {
    console.log("Total count", this.totalCount);
    this.initialCount = 1;
    if (this.totalCount > 100) {
      this.endCount = 100;
    } else {
      this.endCount = this.totalCount;
    }
  }

  /**
   * Here the total page has determine
   * based on the total count the total page value has defined.
   * @returns total page value
   */
  definePaginationValues() {
    let finalPage, countRemainder, pageValue, initial;
    if (this.initial === 1) {
      this.nopreviousBtnDisable = true;
    } else {
      this.nopreviousBtnDisable = false;
    }
    if (this.totalCount > 100) {
      countRemainder = this.totalCount % 100;
      if (countRemainder > 0 || countRemainder == 0) {
        if (countRemainder == 0) {
          pageValue = Math.floor(this.totalCount / 100);
          finalPage = pageValue;
        } else {
          if (this.totalCount < 200) {
            pageValue = Math.floor(this.totalCount / 100);
            finalPage = pageValue + 1;
          } else {
            pageValue = Math.floor(this.totalCount / 100);
            finalPage = pageValue + 1;
          }
        }
      } else {
        finalPage = Math.round(this.totalCount);
      }
    } else {
      finalPage = 1;
    }
    initial = this.initial;
    // if(initial===1){
    //   this.currentPage  = 1;
    // }
    this.finalPageCount = finalPage;
    if (this.end == this.totalCount) {
      this.nonextBtnDisable = true;
    } else {
      this.nonextBtnDisable = false;
    }
    return finalPage;
  }

  /**
   * @returns pagenation values
   * @param event  click event
   */
  pageNavigation(event) {
    let currentPageValue = document.getElementById(
      "currentPage"
    ) as HTMLInputElement;
    let initial, end;
    if (!isNaN(event.key) || event.keyCode == 8 || event.keyCode == 13) {
      if (event.keyCode == 13) {
        if (currentPageValue.value == "0") {
          this.currentPage = 1;
        }
        if (currentPageValue.value >= this.finalPageCount) {
          this.currentPage = this.finalPageCount;
          if (this.currentPage == this.finalPageCount) {
            if (this.totalCount > 100) {
              initial = this.currentPage * 100 - 99;
              end = this.totalCount;
            } else {
              initial = 1;
              end = this.totalCount;
            }
            this.pageValueEnterOut.emit({ initial, end });
            return this._pageSize.setPagesizeValues(initial, end);
          }
          return this.determinePaginationCounts(this.currentPage);
        } else {
          this.currentPage = parseInt(currentPageValue.value);
          return this.determinePaginationCounts(this.currentPage);
        }
      }
    } else {
      this.currentPage = "";
      return swal("Incorrect Input", "Numerical values are allowed", "warning");
    }
  }

  /***
   * define the pagaintion values
   * @param currentPage page number
   * @returns set the pagesize value in service
   */
  determinePaginationCounts(currentPage) {
    let initialValue, endValue;
    if (currentPage > 1) {
      initialValue = currentPage * 100 - 99;
      endValue = currentPage * 100;
    } else {
      if (this.totalCount > 100) {
        initialValue = 1;
        endValue = 100;
      } else {
        initialValue = 1;
        endValue = this.totalCount;
      }
    }
    return this._pageSize.setPagesizeValues(initialValue, endValue);
  }

  /**
   * @param action pagesize action
   * @returns pagiantion values
   */
  navigation(action: any) {
    let initialValue, endValue, remainder;
    switch (action) {
      case "next":
        this.currentPage++;
        if (this.totalCount < 100) {
          initialValue = 1;
          endValue = this.totalCount;
          this.currentPage = 1;
        } else {
          if (this.currentPage > this.totalPage) {
            initialValue = this.totalPage * 100 - 99;
            endValue = this.totalCount;
            this.currentPage = this.totalPage;
          } else {
            if (this.totalCount > 100) {
              if (this.currentPage == this.totalPage) {
                remainder = this.totalCount % 100;
                console.log("Remainder 1", remainder);
                if (remainder > 0) {
                  console.log("Remainder 2", remainder);
                  initialValue = this.currentPage * 100 - 99;
                  endValue = this.totalCount;
                } else {
                  initialValue = this.currentPage * 100 - 99;
                  endValue = this.currentPage * 100;
                }
              } else if (this.totalPage == 2) {
                this.currentPage = this.totalPage;
              } else {
                initialValue = this.currentPage * 100 - 99;
                endValue = this.currentPage * 100;
              }
            } else {
              initialValue = 1;
              endValue = this.totalCount;
            }
          }
        }

        break;
      case "previous":
        if (this.currentPage > 1) {
          this.currentPage--;
          if (this.totalCount > 100) {
            initialValue = this.currentPage * 100 - 99;
            endValue = this.currentPage * 100;
          } else {
            initialValue = 1;
            endValue = this.totalCount;
          }
        } else {
          this.currentPage = 1;
          initialValue = 1;
          if (this.totalCount > 100) {
            endValue = 100;
          } else {
            endValue = this.totalCount;
          }
        }
        break;
      case "first":
        this.currentPage = 1;
        initialValue = 1;
        if (this.totalCount > 100) {
          endValue = 100;
        } else {
          endValue = this.totalCount;
        }
        break;
      case "last":
        this.currentPage = this.totalPage;
        if (this.totalCount > 100) {
          remainder = this.totalCount % 100;
          if (remainder > 0) {
            initialValue = this.currentPage * 100 - 99;
            endValue = this.totalCount;
          } else {
            initialValue = this.currentPage * 100 - 99;
            endValue = this.currentPage * 100;
          }
        } else {
          initialValue = 1;
          endValue = this.totalCount;
        }
        break;
    }
    this.pageNavigationOut.emit({ initialValue, endValue });
    this.determinePaginationCounts(this.currentPage);
    return this._pageSize.setPagesizeValues(initialValue, endValue);
  }
}
