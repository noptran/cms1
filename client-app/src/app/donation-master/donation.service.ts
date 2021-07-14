import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DonationService {
  public subject = new Subject<any>();
  // http://localhost:3001/api/getFosterCareHome
  // http://rajaserver01.go.dyndns.org:8072
  // http://192.168.0.11:8072
  // url: any = "http://localhost:3001/"
  url: any = 'http://104.43.133.18:3001';
  constructor(public http: HttpClient) { }

  getDataAll(sendParams) {
    return this.http.post(this.url + 'get_all_donar_list', sendParams);
  }
  // createDonate(donateData){
  //    return this.http.post(this.url+"/donation/create", JSON.stringify({donateData}), {
  //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
  //   }).map((response: Response) => {
  //     // login successful if there's a jwt token in the response
  //     const token = response.json() && response.json().token;
  //     if (token) {
  //         // set token property
  //         this.token = token;

  //         // store username and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify({ username, token }));

  //         // return true to indicate successful login
  //         return true;
  //     } else {
  //         // return false to indicate failed login
  //         return false;
  //     }
  //   });
  //       }
  // createDonate(Donation): Observable<boolean> {
  //   var don = {l_name:"karthic"}
  //   return this.http.post(this.url+"/donation/create", {params:don,
  //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
  //   }).map((response: Response) => {
  //     console.log(response);
  //     const token = response;
  //     if (token) {
  //      console.log(token);
  //         return true;
  //     } else {

  //         return false;
  //     }
  //   });
  // }
  createDonate(donateData) {

    // const body = new HttpParams()
    //   .append('address', donateData.address)
    //   .append('zip_code', donateData.zip_code)
    //   .append('website_link', donateData.website_link)
    //   .append('up_down_from_id', donateData.up_down_from_id)
    //   .append('unfilled_legacy', donateData.unfilled_legacy)
    //   .append('twt_link', donateData.twt_link)
    //   .append('title_id', donateData.title_id)
    //   .append('suffix', donateData.suffix)
    //   .append('states', donateData.states)
    //   .append('state_id', donateData.state_id)
    //   .append('spouse_gender', donateData.spouse_gender)
    //   .append('sp_title', donateData.sp_title)
    //   .append('sp_suffix', donateData.sp_suffix)
    //   .append('sp_md_name', donateData.sp_md_name)
    //   .append('sp_m_name', donateData.sp_m_name)
    //   .append('sp_l_name', donateData.sp_l_name)
    //   .append('sp_f_name', donateData.sp_f_name)
    //   .append('sp_deceased_date', donateData.sp_deceased_date)
    //   .append('sp_deceased', donateData.sp_deceased)
    //   .append('sp_b_date', donateData.sp_b_date)
    //   .append('solicit_id', donateData.solicit_id)
    //   .append('salutation', donateData.salutation)
    //   .append('region_id', donateData.region_id)
    //   .append('recpt_delivery', donateData.recpt_delivery)
    //   .append('record_for_del', donateData.record_for_del)
    //   .append('pro_title', donateData.pro_title)
    //   .append('organization', donateData.organization)
    //   .append('org_prefix', donateData.org_prefix)
    //   .append('org_name', donateData.org_name)
    //   .append('opt_line', donateData.opt_line)
    //   .append('no_mail_reason_id', donateData.no_mail_reason_id)
    //   .append('nick_name', donateData.nick_name)
    //   .append('narrative', donateData.narrative)
    //   .append('modified_date', donateData.modified_date)
    //   .append('modified_by_id', donateData.modified_by_id)
    //   .append('mobile_ph', donateData.mobile_ph)
    //   .append('membership_type_id', donateData.membership_type_id)
    //   .append('marital_status_id', donateData.marital_status_id)
    //   .append('maiden_name', donateData.maiden_name)
    //   .append('m_name', donateData.m_name)
    //   .append('linkedin_link', donateData.linkedin_link)
    //   .append('l_name', donateData.l_name)
    //   .append('info_salutation', donateData.info_salutation)
    //   .append('industry_id', donateData.industry_id)
    //   .append('home_ph', donateData.home_ph)
    //   .append('given_by_id', donateData.given_by_id)
    //   .append('gender', donateData.gender)
    //   .append('flags_ids', donateData.flags_ids)
    //   .append('fb_link', donateData.fb_link)
    //   .append('fax_ph', donateData.fax_ph)
    //   .append('f_name', donateData.f_name)
    //   .append('exp_date', donateData.exp_date)
    //   .append('enroll_date', donateData.enroll_date)
    //   .append('email_dnd', donateData.email_dnd)
    //   .append('e_mail', donateData.e_mail)
    //   .append('donor_type_id', donateData.donor_type_id)
    //   .append('deceased_dt', donateData.deceased_dt)
    //   .append('data_mngt', donateData.data_mngt)
    //   .append('created_date', donateData.created_date)
    //   .append('created_by_id', donateData.created_by_id)
    //   .append('country_id', donateData.country_id)
    //   .append('contact', donateData.contact)
    //   .append('city', donateData.city)
    //   .append('business_ph', donateData.business_ph)
    //   .append('anonymous_donor', donateData.anonymous_donor)
    //   .append('alt_ph_type4_id', donateData.alt_ph_type4_id)
    //   .append('alt_ph_type3_id', donateData.alt_ph_type3_id)
    //   .append('alt_ph_type2_id', donateData.alt_ph_type2_id)
    //   .append('alt_ph_type1_id', donateData.alt_ph_type1_id)
    //   .append('alt_ph4', donateData.alt_ph4)
    //   .append('alt_ph3', donateData.alt_ph3)
    //   .append('alt_ph2', donateData.alt_ph2)
    //   .append('alt_ph1', donateData.alt_ph1)
    //   .append('allow_donation', donateData.allow_donation)
    //   .append('addtional_ph', donateData.addtional_ph)
    //   .append('addressee', donateData.addressee)
    //   .append('address_type_id', donateData.address_type_id)
    //   .append('address_source', donateData.address_source)
    //   .append('address_2', donateData.address_2);
    // console.log(body);
    return this.http.post(this.url + 'create_donar', donateData);
  }


  sendMessage(message: any) {
    this.subject.next(message);
  }

  sendDonerView(message: any) {
    this.subject.next(message);
  }
  getDonerView(): Observable<any> {
    return this.subject.asObservable();
  }
  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  extractedData() {
    console.log('extracted data passed');
  }

  errorHandler() {
    console.log('errorHandler data passed');
  }

}
