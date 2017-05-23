import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { PropertiesService } from '../../../services/properties/properties.service';

@Component({
    moduleId: module.id,
    selector: ' metafilter-heading-cmp ',
    templateUrl: 'metafilterheading.component.html',
    styleUrls: [ 'metafilterheading.component.css' ]
})  

export class MetafilterheadingComponent implements OnInit{
	@Input() name;

	public PoITypes;

	public housekeeperState = 0;
	public housekeepOtherInfo = "";

	public liftAvailable: boolean = false;
	public uniqueBenefits: string = "";

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
		this.uniqueBenefits = e.target.innerHTML;
	}

	private liftAvailabilityChanged(e) {
		this.liftAvailable = !this.liftAvailable;
	}
}