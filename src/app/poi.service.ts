import { Injectable } from '@angular/core';

// Headers and RequestOptions will be used when we create
// methods that will submit post requests when inserting or updating pois
import { Http, Headers, RequestOptions } from '@angular/http'

// used on all of our API calls
import 'rxjs/add/operator/map';

import { Poi } from './poi';


@Injectable()
export class PoiService {
  
  // the response from our API calls
  result:any;

  constructor(private _http: Http) { }

  getPois() {
    return this._http.get('/api/all')
      .map(response => this.result = response.json());
  }

  getPoi(id){
    return this._http.get("/api/pois/"+id)
      .map(response => this.result = response.json());
  }

  insertPoi(post: Poi) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});

    return this._http.post('/api/create', JSON.stringify(post), options)
      .map(response => this.result = response.json());
  }
} // end of PoiService
