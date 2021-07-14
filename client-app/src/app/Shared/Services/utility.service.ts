import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class UtilityService {
    endPointURL  = environment.localUrl;

    constructor(public _http:HttpClient) { }

    getDropdownValues(req:{Object:string, value:string}):Promise<any[]>{
        return new Promise((resolve)=>{
          this._http.post(`${this.endPointURL}dropDown/contains`,JSON.stringify(req))
          .toPromise()
          .then((data: any)=> resolve(data.dropDown ))
        })
      }

      getCityFromState(req:{stateID: number}):Promise<any>{
        return new Promise((resolve)=>{
          this._http.post(`${this.endPointURL}dropDown/state`,JSON.stringify(req))
          .toPromise()
          .then((data: any)=> resolve(data.city))
        })
      }
     
      getZipCodeFromCity(req:{stateID: number, cityID: number}):Promise<any[]> { 
        return new Promise((resolve)=>{
          this._http.post(`${this.endPointURL}dropDown/zipcode`,JSON.stringify(req))
          .toPromise()
          .then((data: any)=> resolve(data))
        })
      }

 }