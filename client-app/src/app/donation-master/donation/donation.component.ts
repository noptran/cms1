import { Component, OnInit } from '@angular/core';
import { DonationService } from '../donation.service';
import { Router } from '@angular/router';
import { Donation } from './donation';
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  donate_formData = new Donation();
  constructor(public DonationService: DonationService, public router: Router) {
  }
  titleLists: any = [];
  typeMasters: any = [];
  states: any = [];
  countrys: any = [];
  addresstypeLists: any = [];
  emailReasonLists: any = [];
  flagsLists: any = [];
  solicits: any = [];
  meritalStats: any = [];
  industrys: any = [];
  regions: any = [];
  altPhoneTypeLists: any = [];
  memberShipLists: any = [];
  upDownLists: any = [];
  givenByLists: any = [];
  userLists: any = [];
  Sidenav: any;
  loaderController: any;
  flags_ids: any;
  age: any;

  ngOnInit() {
    this.allDonationTitleList();
    this.allDonarypeList();
    this.allDonarStateList();
    this.allDonarCountryList();
    this.allDonarAddressTypeList();
    this.allDonarEmailReasonList();
    this.allDonarFlagsList();
    this.allDonarsolicitsList();
     this.allDonarMeritaList();
     this.allDonarIndustrysList();
    this.allDonarRegionList();
    this.allDonarAltPhoneList();
    this.allDonarMembershipList();
    this.allDonarUpDownList();
    this.allDonarGivenByList();
    this.allDonarUserList();
    //       this.odooRPC.searchRead('donation.profile',[],[],0,80)
    //   .then(res => {
    //     console.log("this.odooRPC.searchRead()>>>>",res)
    //     }).catch( err => {
    //       console.error('err>>>>>>>', err);

    //   });
    // console.log(this.donate_formData);
  }

  allDonationTitleList() {
    let sendParams = {
      'model': 'title.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.titleLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarypeList() {
    let sendParams = {
      'model': 'donor.type.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.typeMasters = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarStateList() {
    let sendParams = {
      'model': 'state.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.states = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarCountryList() {
    let sendParams = {
      'model': 'country.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.countrys = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarEmailReasonList() {
    let sendParams = {
      'model': 'email.reason.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.emailReasonLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }

  allDonarAddressTypeList() {
    let sendParams = {
      'model': 'address.type.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.addresstypeLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }

  allDonarFlagsList() {
    let sendParams = {
      'model': 'flag.tags',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.flagsLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }

  allDonarsolicitsList() {
    let sendParams = {
      'model': 'solicit.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.solicits = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarMeritaList() {
    let sendParams = {
      'model': 'marital.status',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.meritalStats = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarIndustrysList() {
    let sendParams = {
      'model': 'industry.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.industrys = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );

  }
  allDonarRegionList() {
    let sendParams = {
      'model': 'region.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.regions = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }

  allDonarAltPhoneList() {
    let sendParams = {
      'model': 'alt.phone.type',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.altPhoneTypeLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarMembershipList() {
    let sendParams = {
      'model': 'membership.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.memberShipLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarUpDownList() {
    let sendParams = {
      'model': 'up.down.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.upDownLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }
  allDonarGivenByList() {
    let sendParams = {
      'model': 'given.by.master',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.givenByLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );
  }

  allDonarUserList() {
    let sendParams = {
      'model': 'res.users',
      'domain': [],
      'fields': [],
      'offset': null,
      'limit': null,
    };
    this.DonationService.getDataAll(sendParams).subscribe(
      res => {
        this.userLists = res;
      },
      err => {
        console.log('Error occured>>>>>', err);
      }
    );

  }
  onSubmit() {
    console.log(JSON.stringify(this.donate_formData));
    //     var days = new Object();
    // days['f_name'] = "1";
    // days['l_name'] = "2";
    // days['m_name'] = "3";
    // console.log("days>>>>",days);
    this.DonationService.createDonate(this.donate_formData).subscribe(
      () => {
        this.router.navigate(['/reports/donation_List']);
      },
      err => {
        this.router.navigate(['/reports/donation_List']);

        // alert("err");
        console.log('Error occured>>>>>', err);
      });
  }
}













// constructor(public odooRPC: OdooRPCService){
//   this.odooRPC.init({
//       odoo_server: "http://rajaserver01.go.dyndns.org:8067",
//         http_auth: "admin:admin" // optional
//   });
//   this.odooRPC.login('SFCS_Donations_Management','admin','admin').then(res => {
//       console.log('login success>>',res);
//   }).catch( err => {
//       console.error('login failed', err);
//   })
// }

// ngOnInit() {
//   // 'donation.profile',[],[],0,80
//       this.odooRPC.searchRead('donation.profile',[],[],0,80)
//       .then(res => {
//         console.log("this.odooRPC.searchRead()>>>>",res)
//         }).catch( err => {
//           console.error('err>>>>>>>', err);

//       });
// }
