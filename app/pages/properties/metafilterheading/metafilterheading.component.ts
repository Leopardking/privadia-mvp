import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { PropertiesService } from '../../../providers/properties/properties.service';
import {FormGroup} from "@angular/forms";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' metafilter-heading-cmp ',
    templateUrl: 'metafilterheading.component.html',
    styleUrls: [ 'metafilterheading.component.css' ]
})  

export class MetafilterheadingComponent implements OnInit{
	@Input() name;
	@Input('group')	propertyForm: FormGroup;

	public housekeeperState = 0;
	public housekeepOtherInfo = "";

	public liftAvailable: boolean = false;
	public uniqueBenefits: string = "";
	public PoITypes = [];

	constructor( private propertiesService: PropertiesService ) {
	}

	ngOnInit() {
		switch (this.name) {
			case "Points of Interest":
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
				break;
			case "Services":
				this.housekeepOtherInfo = "";
				this.housekeeperState = 0;
				break;
			case "Features":
				this.liftAvailable = false;
				this.uniqueBenefits = "";
				break;
		}
	}

	private housekeeperStateChange(s) {
		this.housekeeperState = s;
	}

	private housekeeperOtherInfoChange(e) {
		this.housekeepOtherInfo = e.target.innerHTML;
	}


///////////////		Points of Interests	  //////////////////
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


///////////////		Features		///////////
	private uniqueBenefitsChange(e) {
		this.uniqueBenefits = e.target.value;
	}

	private liftAvailabilityChanged(e) {
		this.liftAvailable = !this.liftAvailable;
	}
}