import { Injectable } from '@angular/core';

// Headers and RequestOptions will be used when we create
// methods that will submit post requests when inserting or updating pois
import { Http, Headers, RequestOptions } from '@angular/http'

// used on all of our API calls
import 'rxjs/add/operator/map';


@Injectable()
export class PoiService {
  
  // the response from our API calls
  result:any;

  constructor(private _http: Http) { }

  getPois() {
    return this._http.get('/api/all')
      .map(response => this.result = response.json());
  }
} // end of PoiService
