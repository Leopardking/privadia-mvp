import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { PropertiesService } from '../../providers/properties/properties.service';
import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {LookupsService} from "../../providers/lookups/lookups.service";
import {LoginService} from "../../providers/login/login.service";

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

	private permission;

	constructor( private propertiesService: PropertiesService, private lookupsService: LookupsService, private loginService: LoginService ) {}

	ngOnInit() {
		this.permission = !this.loginService.getPermission('Properties/Put');

		switch (this.name) {
			case "Points of Interest":
				const control = <FormArray>this.propertyForm.controls['PointsOfInterest'];
				this.lookupsService.getPoITypes().subscribe(
					d => {
						if(!control.value.length) {
							d.forEach( (item, index) => {
								control.push(
									new FormGroup({
										Name: new FormControl({ value: null, disabled: this.permission }),
										PointOfInterestTypeId: new FormControl({ value: item.Id, disabled: this.permission }),
										PointOfInterestTypeName: new FormControl({ value: item.Name, disabled: this.permission }),
										Available: new FormControl({ value: false, disabled: this.permission }),
										Distance: new FormControl({ value: 0, disabled: this.permission }),
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