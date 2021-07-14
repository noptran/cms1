import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { OtpverficationService } from "../../otpverfication/otpverfication.service";
import { HomeService } from "../../home/home.service";
import { HttpClient } from "@angular/common/http";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class PersonTypesProfileService {
  constructor(
    public _opencards: OpencardsService,
    public _otp: OtpverficationService,
    public _home: HomeService,
    public _http: HttpClient,
    public _activateRoute: ActivatedRoute
  ) {}
  enviornment = environment;

  getClientProfileInfo(req: any) {
    let reqData = {
      clientID: parseInt(
        this._activateRoute.snapshot.queryParamMap.get("clientId")
      ),
    };
    return this._http
      .post(
        `${this.enviornment.localUrl}/client/profile`,
        JSON.stringify(reqData)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPersonDetails(req?: any) {
    let reqData = {
      clientID: parseInt(localStorage.getItem("clientId")),
    };
    return this._http
      .post(
        `${this.enviornment.localUrl}/person/getByPerson`,
        JSON.stringify(reqData)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
}
