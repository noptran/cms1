import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class AppValuesService {
  constructor(public _activateRoute: ActivatedRoute) {}

  public clientID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get("clientId")
  );
  public referralID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get("ref_id")
  );
  //referralTypeId
}
