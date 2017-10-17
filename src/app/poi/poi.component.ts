import { Component, OnInit } from '@angular/core';
import { PoiService } from '../poi.service';
import { Poi } from '../poi';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.css']
})
export class PoiComponent implements OnInit {

  poi: Poi;

  constructor(private _poiService: PoiService, private router: Router, private aR: ActivatedRoute) { }

  ngOnInit() {
    this.aR.params.subscribe((passedParams) => {
      let id = passedParams['id'];

      this._poiService.getPoi(id)
        .subscribe(response => this.poi = response);
    });
  }

}
