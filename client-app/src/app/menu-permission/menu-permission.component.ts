import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';

@Component({
  selector: 'app-menu-permission',
  templateUrl: './menu-permission.component.html',
  styleUrls: ['./menu-permission.component.scss']
})
export class MenuPermissionComponent implements OnInit {
  allGroupLists = [];
  groupSearchList = [];
  groupData: any;
  firstLevelMenus = [];
  secondLevelMenus = [];
  thirdLevelMenus = [];
  fourthLevelMenus = [];
  fifthLevelMenus = [];
  sixthLevelMenus = [];
  allRefereshMenus = [];
  firstLevel_Menus = [];
  selectedFirstLevelMenu = [];
  selectedSecondLevelMenu = [];
  selectedThirdLevelMenu = [];
  selectedFourthLevelMenu = [];
  selectedFifthLevelMenu = [];
  selectedSixthLevelMenu = [];
  selectFirstMenuItem: any;
  selectedForthLevelMenu = [];
  allUserLists = [];
  show_group_user = 'group';
  menuRight = 'group';
  constructor(public _opencard: OpencardsService) { }

  ngOnInit() {
    this.allGroups();
    this.menuLevels();
    this.allUsers({ query: "A" })
    this.showGroupOrUser('group');
  }
  allGroups() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.groupList().then(data => {
      this.allGroupLists = data.groupList;
      this.allGroupLists.map(itm => {
        itm.GroupName = itm['Group Name'];
      });
      loader.style.display = 'none';
    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  };
  allUsers(userData) {
    let req;
    req = {
      "value": userData.query,
      "beginPagination": 1,
      "endPagination": 100
    }
    this._opencard.allUserLevel(req).then(data => {
      this.allUserLists = data.userList;
    }).catch(err => {

    }
    )
  }
  getSearchGroup(event) {
    console.log(event);
    this.groupSearchList = [];
    this.allGroupLists.filter((item: any) => {
      if (item['GroupName'].toLowerCase().indexOf(event.query) !== -1) {
        this.groupSearchList.push(item)
      };
    });
  };
  getUserDetails(event, user_group) {
    console.log(event);
  }
  menuLevels() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let req = {
      "menuType": "firstLevelMenus",
      "reportMenuID": null,
      "menuID": 0,
      "helpMenuID": null
    };
    this._opencard.all_menuLevel(req).then(data => {
      this.secondLevelMenus = [];
      this.thirdLevelMenus = [];
      this.fourthLevelMenus = [];
      this.fifthLevelMenus = [];
      this.sixthLevelMenus = [];
      this.firstLevel_Menus = data.firstLevelMenu;
      loader.style.display = 'none';
    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  };
  selectSecondMenuItem: any;
  selectthirdMenuItem: any;
  isReport = false;
  getSecondLevelMenu(levels, menuData) {
    let req;
    let reportID;
    console.log('menuData>>>>', menuData);
    Object.keys(menuData);
    console.log('Object.keys(menuData)>>>>', Object.keys(menuData));
    let keys = Object.keys(menuData);
    let reportState = Object.keys(menuData).find(x => x === 'reportMenuID');
    if (reportState === 'reportMenuID') {
      this.isReport = true;
      reportID = menuData.reportMenuID;
    } else if (menuData.menuName === 'Reports') {
      this.isReport = true;
      // menuData.menuName='Reports';
      reportID = 0;
    } else {
      this.isReport = false;
    }
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    if (this.isReport) {
      req = {
        "menuType": "subMenu",
        "reportMenuID": reportID,
        "menuID": null,
        "helpMenuID": null
      };
    } else {
      req = {
        "menuType": "subMenu",
        "reportMenuID": null,
        "menuID": menuData.menuID,
        "helpMenuID": null
      };
    }

    this._opencard.all_menuLevel(req).then(data => {

      switch (levels) {
        case 'secondLevelMenu':
          this.thirdLevelMenus = [];
          if (this.isReport) {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.ReportMenuID == item_1st_level.reportMenuID) {
                  console.log(item.ReportMenuID + "===" + item_1st_level.reportMenuID);
                  item_1st_level.selectMenu = 'isReprt';
                  this.selectedSecondLevelMenu[item_1st_level.reportMenuID] = item_1st_level.reportMenuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isReprt';
                }
              })
              this.secondLevelMenus = data.subMenu;
            });
          } else {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.MenuID == item_1st_level.menuID) {
                  console.log(item.MenuID + "===" + item_1st_level.menuID);
                  item_1st_level.selectMenu = 'isNotReprt';
                  this.selectedSecondLevelMenu[item_1st_level.menuID] = item_1st_level.menuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isNotReprt';
                }
              })
              this.secondLevelMenus = data.subMenu;
            });
          }

          break;
        case 'thirdLevelMenu':
          if (this.isReport) {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.ReportMenuID == item_1st_level.reportMenuID) {
                  console.log(item.ReportMenuID + "===" + item_1st_level.reportMenuID);
                  item_1st_level.selectMenu = 'isReprt';
                  this.selectedThirdLevelMenu[item_1st_level.reportMenuID] = item_1st_level.reportMenuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isReprt';
                }
              })
              this.thirdLevelMenus = data.subMenu;
            });
          } else {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.MenuID == item_1st_level.menuID) {
                  console.log(item.MenuID + "===" + item_1st_level.menuID);
                  item_1st_level.selectMenu = 'isNotReprt';
                  this.selectedThirdLevelMenu[item_1st_level.menuID] = item_1st_level.menuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isNotReprt';
                }
              })
              this.thirdLevelMenus = data.subMenu;
            });
          }

          break;
        case 'fourthLevelMenu':
          if (this.isReport) {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.ReportMenuID == item_1st_level.reportMenuID) {
                  console.log(item.ReportMenuID + "===" + item_1st_level.reportMenuID);
                  item_1st_level.selectMenu = 'isReprt';
                  this.selectedFourthLevelMenu[item_1st_level.reportMenuID] = item_1st_level.reportMenuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isReprt';
                }
              })
              this.fourthLevelMenus = data.subMenu;
            });
          } else {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.MenuID == item_1st_level.menuID) {
                  console.log(item.MenuID + "===" + item_1st_level.menuID);
                  item_1st_level.selectMenu = 'isNotReprt';
                  this.selectedFourthLevelMenu[item_1st_level.menuID] = item_1st_level.menuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isNotReprt';
                }
              })
              this.fourthLevelMenus = data.subMenu;
            });
          }



          break;
        case 'fifthLevelMenu':

          if (this.isReport) {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.ReportMenuID == item_1st_level.reportMenuID) {
                  console.log(item.ReportMenuID + "===" + item_1st_level.reportMenuID);
                  item_1st_level.selectMenu = 'isReprt';
                  this.selectedFifthLevelMenu[item_1st_level.reportMenuID] = item_1st_level.reportMenuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isNotReprt';
                }
              })
              this.fifthLevelMenus = data.subMenu;
            });
          } else {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.MenuID == item_1st_level.menuID) {
                  console.log(item.MenuID + "===" + item_1st_level.menuID);
                  item_1st_level.selectMenu = 'isNotReprt';;
                  this.selectedFifthLevelMenu[item_1st_level.menuID] = item_1st_level.menuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isNotReprt';;
                }
              })
              this.fifthLevelMenus = data.subMenu;
            });
          }







          break;
        case 'sixthLevelMenu':
          if (this.isReport) {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.ReportMenuID == item_1st_level.reportMenuID) {
                  console.log(item.ReportMenuID + "===" + item_1st_level.reportMenuID);
                  item_1st_level.selectMenu = 'isReprt';
                  this.selectedSixthLevelMenu[item_1st_level.reportMenuID] = item_1st_level.reportMenuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isReprt';
                }
              });
              this.sixthLevelMenus = data.subMenu;
            });
          } else {
            this.allRefereshMenus.forEach(item => {
              data.subMenu.map(item_1st_level => {
                if (item.MenuID == item_1st_level.menuID) {
                  console.log(item.MenuID + "===" + item_1st_level.menuID);
                  item_1st_level.selectMenu = 'isNotReprt';
                  this.selectedSixthLevelMenu[item_1st_level.menuID] = item_1st_level.menuID;
                }
              });
              data.subMenu.map(itm => {
                if (!itm.selectMenuID) {
                  itm.selectMenuID = null;
                  itm.selectMenu = 'isNotReprt';;
                }
              });
              this.sixthLevelMenus = data.subMenu;
            });
          }

          break;
      }
      loader.style.display = 'none';
    }).catch(err => {
      loader.style.display = 'none';
    }
    )
  };

  // getRefereshMenus() {
  //   const loader = document.getElementById('loading-overlay') as HTMLElement;
  //   loader.style.display = 'block';
  //   let req = {
  //     "groupID": 23,
  //     "userID": null
  //   };
  //   this._opencard.referesh_findAllmenu(req).then(data => {
  //     this.allRefereshMenus = data.permissions;
  //   }).catch(error => {
  //     loader.style.display = 'none';
  //   });
  // };
  groupID: any;
  user_id: any;
  getGroupDetails(event, user_group) {
    this.selectedFirstLevelMenu = []
    let req;
    console.log("event<>>>", event);
    if (user_group === 'group') {
      this.groupID = event.GroupID;
      this.user_id = null;
      req = {
        "groupID": event.GroupID,
        "userID": null
      };
    } else if (user_group === 'user') {
      this.groupID = null;
      this.user_id = event.userID;
      this.user_id
      req = {
        "groupID": null,
        "userID": event.userID,
      };
    }

    this._opencard.referesh_findAllmenu(req).then(data => {
      this.allRefereshMenus = data.permissions;
      data.permissions.forEach(item => {
        this.firstLevel_Menus.map(item_1st_level => {
          if (item.MenuID == item_1st_level.menuID) {
            item_1st_level.selectMenu = 'isNotReprt';
            this.selectedFirstLevelMenu[item_1st_level.menuID] = item_1st_level.menuID;
          }
        });
        this.firstLevel_Menus.map(itm => {
          if (!itm.selectMenuID) {
            itm.selectMenuID = null;
            itm.selectMenu = 'isNotReprt';
          }
        })
        this.firstLevelMenus = this.firstLevel_Menus;
        // this.firstLevelMenus.map(ite=>{
        //   ite['_uid'] = shuffle();
        // });
        this.secondLevelMenus = [];
        this.thirdLevelMenus = [];
        this.fourthLevelMenus = [];
      });
    }).catch(error => {
      // loader.style.display = 'none';
    });
  };
  firstLevelActiveMenu(activeMenu) {
    this.selectFirstMenuItem = activeMenu;
  };
  select_drop = 'Groups';
  showGroupOrUser(user_group) {
    if (user_group == 'group') {
      this.select_drop = 'Groups';
    } else {
      this.select_drop = 'Users';
    }
    this.show_group_user = user_group;
  };
  firstMenusIDS = [];
  secondMenusIDS = [];
  thirdMenusIDS = [];
  fourthMenusIDS = [];
  fifthMenusIDS = [];
  sixthMenusIDS = [];
  handle_firstMenuData(event, firstData) {
    if (event) {
      this.firstMenusIDS.push(firstData);
    } else {
      this.firstMenusIDS.map(itm => {
        if (itm == firstData) {
          this.firstMenusIDS.splice(this.firstMenusIDS.indexOf(itm), 1)
        }
      });
    }
    console.log();
  }
  handle_SecondMenuData(event, secondData) {
    if (event) {
      this.secondMenusIDS.push(secondData);
    } else {
      this.secondMenusIDS.map(itm => {
        if (itm == secondData) {
          this.secondMenusIDS.splice(this.secondMenusIDS.indexOf(itm), 1)
        }
      });
    }
  }
  handle_ThirdMenuData(event, thirdData) {
    if (event) {
      this.thirdMenusIDS.push(thirdData);
    } else {
      this.thirdMenusIDS.map(itm => {
        if (itm == thirdData) {
          this.thirdMenusIDS.splice(this.thirdMenusIDS.indexOf(itm), 1)
        }
      });
    }
  }
  handle_fourthMenuData(event, fourthData) {
    if (event) {
      this.fourthMenusIDS.push(fourthData);
    } else {
      this.fourthMenusIDS.map(itm => {
        if (itm == fourthData) {
          this.fourthMenusIDS.splice(this.fourthMenusIDS.indexOf(itm), 1)
        }
      });
    }
  }
  handle_fifthMenuData(event, fifthData) {
    if (event) {
      this.fifthMenusIDS.push(fifthData);
    } else {
      this.fifthMenusIDS.map(itm => {
        if (itm == fifthData) {
          this.fifthMenusIDS.splice(this.fifthMenusIDS.indexOf(itm), 1)
        }
      });
    }
  }
  handle_sixththMenuData(event, sixthData) {
    if (event) {
      this.sixthMenusIDS.push(sixthData);
    } else {
      this.sixthMenusIDS.map(itm => {
        if (itm == sixthData) {
          this.sixthMenusIDS.splice(this.sixthMenusIDS.indexOf(itm), 1)
        }
      });
    }
  }
  saveMenuAccess() {
    let combinedArray = []
    combinedArray.push(...this.firstMenusIDS, ...this.secondMenusIDS, ...this.thirdMenusIDS, ...this.fourthMenusIDS, ...this.fifthMenusIDS, ...this.sixthMenusIDS)
    const menuIDS = combinedArray.filter(ele => ele.selectMenu == 'isNotReprt');
    const reportMenuIDS = combinedArray.filter(ele => ele.selectMenu == 'isReprt');
    let allmenuIDS = [];
    let allreportMenuIDS = [];
    menuIDS.forEach(itm => {
      allmenuIDS.push(itm.menuID)
    });
    reportMenuIDS.forEach(itm => {
      allreportMenuIDS.push(itm.reportMenuID)
    });
    var req = {
      "menuID": allmenuIDS,
      "reportMenuID": allreportMenuIDS,
      "jsonData": {
        "userID": this.user_id,
        "groupID": this.groupID,
        "value": "false"
      }
    }
    this._opencard.saveMenuAccess(req).then(data => {

    })
  }

}
function shuffle() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x1000)
  }
  return (s4() + s4());
}