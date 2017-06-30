import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { PropertiesService } from '../../providers/properties/properties.service';
import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {LookupsService} from "../../providers/lookups/lookups.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' metafilter-heading-cmp ',
    templateUrl: 'meta-filter-heading.component.html',
    styleUrls: [ 'meta-filter-heading.component.css' ]
})  

export class MetafilterheadingComponent implements OnInit{
	@Input() name;
	@Input('group') private propertyForm: FormGroup;

	constructor( private propertiesService: PropertiesService, private lookupsService: LookupsService ) {}

	ngOnInit() {
		switch (this.name) {
			case "Points of Interest":
				const control = <FormArray>this.propertyForm.controls['PointsOfInterest'];
				this.lookupsService.getPoITypes().subscribe(
					d => {
						if(!control.value.length) {
							d.forEach( (item, index) => {
								control.push(
									new FormGroup({
										Name: new FormControl(''),
										PointOfInterestTypeId: new FormControl(item.Id),
										PointOfInterestTypeName: new FormControl(item.Name),
										Available: new FormControl(false),
										Distance: new FormControl(0),
									}),
								);
							} );
						}
					},
					e => {
						console.log("Get Points of Types error: ", e);
					}
				);
				break;
		}
	}

	private autosize(e){
		e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
	}

}