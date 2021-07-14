import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class ClientService { 
    endPointURL  = environment.localUrl;

    constructor(public _http:HttpClient) { }

    save(request: any): Promise<any> { 
        return new Promise((resolve)=>{
            this._http.post(`${this.endPointURL}`,JSON.stringify(request))
            .toPromise()
            .then((data)=>{resolve(data)})
        })
    }

    update(request: any): Promise<any> { 
        return new Promise((resolve)=>{
            this._http.post(`${this.endPointURL}person/save`,JSON.stringify(request))
            .toPromise()
            .then((data)=>{resolve(data)})
        })
    }

    getDetail(request: any): Promise<any> { 
        return new Promise((resolve)=>{
            this._http.post(`${this.endPointURL}person/update`,JSON.stringify(request))
            .toPromise()
            .then((data)=>{resolve(data)})
        })
    }
}