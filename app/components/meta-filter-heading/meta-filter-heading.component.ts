import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { PropertiesService } from '../../providers/properties/properties.service';
import {FormGroup, FormArray, FormControl} from "@angular/forms";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' metafilter-heading-cmp ',
    templateUrl: 'meta-filter-heading.component.html',
    styleUrls: [ 'meta-filter-heading.component.css' ]
})  

export class MetafilterheadingComponent implements OnInit{
	@Input() name;
	@Input('group')
	private propertyForm: FormGroup;

	// public housekeeperState = 0;
	// public housekeepOtherInfo = "";

	// public liftAvailable: boolean = false;
	// public uniqueBenefits: string = "";
	// public PoITypes = [];

	constructor( private propertiesService: PropertiesService ) {
	}

	ngOnInit() {
		switch (this.name) {
			case "Points of Interest":
				const control = <FormArray>this.propertyForm.controls['PointsOfInterest'];
				this.propertiesService.getPoITypes().subscribe(
					d => {
						// this.PoITypes = d;
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
						console.log('PointsOfInterest init', control.value.length )
					},
					e => {
						console.log("Get Points of Types error: ", e);
					}
				);
				//console.log('this.propertyForm 1',this.propertyForm)
				/*
				this.propertiesService.getPoITypes().subscribe( 
					d => {
						this.PoITypes = d;
						this.PoITypes.map( (item, index) => {
							item.typeName = "";
							item.distance = 0;
							item.checked = false;
						} );
					},
					e => {
						console.log("Get Points of Types error: ", e);
					}
				);
				*/
				break;
			/*
			case "Services":
				this.housekeepOtherInfo = "";
				this.housekeeperState = 0;
				break;
			case "Features":
				this.liftAvailable = false;
				this.uniqueBenefits = "";
				break;
			 */
		}
	}

	private autosize(e){
		e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
	}

	/*
	private housekeeperStateChange(s) {
		this.housekeeperState = s;
	}

	private housekeeperOtherInfoChange(e) {
		this.housekeepOtherInfo = e.target.innerHTML;
	}
	*/


///////////////		Points of Interests	  //////////////////
	/*
	private checkboxClick(e) {
		let index = e.target.getAttribute('type-id');
		this.PoITypes[index].checked = !this.PoITypes[index].checked;

		let ele = $("input.name")[index];
		if (ele.value == "" && this.PoITypes[index].checked) {
			$(ele).parent().addClass("has-error");
		} else {
			$(ele).parent().removeClass("has-error");
		}

		ele = $("input.distance")[index];
		if (ele.value == "" && this.PoITypes[index].checked) {
			$(ele).parent().addClass("has-error");
		} else {
			$(ele).parent().removeClass("has-error");
		}
		
	}

	private nameChanged(e) {
		let index = e.target.getAttribute('type-id');
		this.PoITypes[index].typeName = e.target.value;
	}	

	private distanceChanged(e) {
		let index = e.target.getAttribute('type-id');
		this.PoITypes[index].distance = e.target.value;
	}
	*/

///////////////		Features		///////////
	/*
	private uniqueBenefitsChange(e) {
		this.uniqueBenefits = e.target.value;
	}

	private liftAvailabilityChanged(e) {
		this.liftAvailable = !this.liftAvailable;
	}
	*/
}