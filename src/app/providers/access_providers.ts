import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders{
    // URL backend  api json
    server = 'http://localhost/api/';

    constructor(
        public https: HttpClient,
      ) { }
      postData(body, file){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        });
        const options = {
            headers: headers
        }
        return this.https.post(this.server + file, JSON.stringify(body), options)
        .timeout(59000) // 59 sec time
        .map(res => res);
      }
}