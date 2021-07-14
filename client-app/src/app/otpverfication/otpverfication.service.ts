import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import swal from "sweetalert2";

@Injectable()
export class OtpverficationService {
  postEnd = environment;
  getUser = environment.localUrl + "/getUserById";

  constructor(public _http: HttpClient) {}

  /**
   * set the request options for globally
   *
   * @returns Http request options
   *
   * @memberOf OtpverficationService
   */
  headersForAPIRequest() {
    let headers, access_token, user_id;
    access_token = document.cookie.match(new RegExp("token" + '=([^;]+)'))[1];
    user_id = document.cookie.match(new RegExp("userId" + '=([^;]+)'))[1];
    // tslint:disable-next-line:max-line-length
    // access_token =
    //   "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYTjE0WEdscWNmV1B6UjJPSmJCc0RubGZCektTV05GallVSEFFTlR0UXhqR3U4TFNPQUVYXzFCMDI0SDI2eS1BZkxKOGRjQ291SU13d1hrU2NaRFRyb2lBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIiwia2lkIjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yZmQwODA1Zi1mNjFmLTQ5NzgtODkzNi1hODlkMTc3MTczYmYvIiwiaWF0IjoxNTU4NjMyNzg5LCJuYmYiOjE1NTg2MzI3ODksImV4cCI6MTU1ODYzNjY4OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZSGhpSTdERE5kdjFTRkxjVk9HRnIwdi9MWml4emxUcjhMZElRZjdjemlDeDBxMEEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFSLUNNUy1BUFAtUFJPRC0wMSIsImFwcGlkIjoiYjA1Nzg0NTctNTNjOS00N2IxLWIwNzItNWNkZTAzMWU3N2Q3IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJBIiwiZ2l2ZW5fbmFtZSI6IlJhamVzaCIsImlwYWRkciI6IjY2LjYuMTEwLjE2MiIsIm5hbWUiOiJSYWplc2ggQSIsIm9pZCI6IjBkMTY4MTNiLWZhMTItNGRjYS1iMTBmLTIyOTM2NWMwMjM5MSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS04MTQ5MDA2NjItMTc0Njc5ODM5NC05NTIyOTg2LTMzMjMyIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDM3RkZFQTc3NkRGN0EiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZCBDb250YWN0cy5SZWFkIE1haWwuUmVhZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsiaW5rbm93bm50d2siXSwic3ViIjoiY1FqX3RMeHlJQXQtbkEyMnZkRXduVmhGdmZaMEtvNVAtX1NlZTZGR2JCQSIsInRpZCI6IjJmZDA4MDVmLWY2MWYtNDk3OC04OTM2LWE4OWQxNzcxNzNiZiIsInVuaXF1ZV9uYW1lIjoiUmFqZXNoQUBzdC1mcmFuY2lzLm9yZyIsInVwbiI6IlJhamVzaEFAc3QtZnJhbmNpcy5vcmciLCJ1dGkiOiIxYjlMNklzcURrNkpNMlJDWHlrcEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIxOTRhZTRjYi1iMTI2LTQwYjItYmQ1Yi02MDkxYjM4MDk3N2QiLCI1ZDZiNmJiNy1kZTcxLTQ2MjMtYjRhZi05NjM4MGEzNTI1MDkiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiXSwieG1zX3N0Ijp7InN1YiI6InRKcThpckNuNnpoa0JrS0N1YXpaZTRKVlBOSmpNTzZzT21neXM2Nm9UbGMifSwieG1zX3RjZHQiOjE1MTUzNjUwODV9.XIFSX9AG7f6IUF3psbpwEEYUGEF3R5egTa1RuTDK5yZ8w77DMl4lUPEIivElkvTOMxM-xNF3MwrpaChX6FDn9LS7NYxmYQZlKtI-h-gPEOBPvzql8ERNJXcW-Pl5_6B6l-TnyJG3PtLDFQ-nZAozQ1WeMIV4Q7necPdZrgQ3KgMYoOKn8K1RXl7Df1TOMteWiy1lxcNEFbAyKfj9DL-FPLq4nQOeTLb2bnXF5AK5XyRbckfw9bwdeRgXtnoRGzbFajvv1AwzF-EssMnyo_oklcBOE5oCtqIPyE9TOI6kFDo17t-_Mp2qWlX7RnC2ap52RK2rxGWDWanDT-bHHhRLsw";
    // user_id = "4620";
    headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: user_id + " " + access_token,
    });
    return { headers };
  }

  regenerateTokenRequest(result) {
    return swal({
      title: "warning!",
      text: result.responseMessage,
      type: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Generate a token!",
    }).then((data) => {
      if (data) {
        // call the token regnerate API
      }
    });
  }

  //  extractedData(res: Response) {
  //   console.log("ex***",res.status)
  //   const body = {};
  //   console.log("Extracted data",res.status)
  //   if(res.statusText!== 'OK'){
  //     return this.httpResponseState(res);
  //   }else{
  //     return res.json() || {};
  //   }
  // }

  postData(data: any) {
    const headers = this.headersForAPIRequest();
    return this._http
      .post(this.postEnd.localUrl + "/verifyOtp", JSON.stringify(data), headers)
      .toPromise()
      .then(this.extractedData)
      .catch(this.errorHandler);
  }

  resendOTP(data: any) {
    const headers = this.headersForAPIRequest();
    return this._http
      .post(this.postEnd.localUrl + "/resendOtp", JSON.stringify(data), headers)
      .toPromise()
      .then(this.extractedData)
      .catch(this.errorHandler);
  }

  getUserDetail(data) {
    const headers = this.headersForAPIRequest();
    return this._http
      .post(this.getUser, JSON.stringify(data), headers)
      .toPromise()
      .then(this.extractedData)
      .catch(this.errorHandler);
  }

  public errorHandler(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
  }

  public extractedData(res: HttpResponse<any>) {
    return res.body() || {};
  }
}
