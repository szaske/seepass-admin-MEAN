import { Component, OnInit } from '@angular/core';
import { PoiService } from '../poi.service';
import { Poi } from '../poi';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  // poi: Poi;
  poiForm: FormGroup;

  constructor(private _poiService: PoiService, private router: Router, private aR: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

    // longitude validator = Validators.pattern('^(?:-122\.)+\d{1,6}')
    // should work but doesn't...need to debug 
    this.poiForm = this.fb.group({
      'name' : [null,Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(40)])],
      'description' : [null,Validators.compose([Validators.required, Validators.minLength(5)])],
      'longitude' : [null, Validators.compose([Validators.required]) ],
      'latitude' : [null, Validators.compose([Validators.required]) ],
      'img_url' : [null, Validators.compose([Validators.required]) ],
      'tags' : [null, Validators.compose([Validators.required]) ]
    });
  }

  addPoi(poi) {
    let tempTags = poi.tags.split(",") 
    poi.tags = tempTags;
    this._poiService.insertPoi(poi)
      .subscribe(newPoi => {
        // this.poi.push(newPoi);
        this.router.navigateByUrl('/');
      })
  }

}
