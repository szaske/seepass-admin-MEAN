import { Component, OnInit } from '@angular/core';
import { PoiService } from '../poi.service';
import { Poi } from '../poi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variable to store POIs
  pois: Array<Poi>;

  constructor(private _poiService: PoiService) { }

  ngOnInit() {
    this._poiService.getPois()
      .subscribe(response => this.pois = response)
  }

}
