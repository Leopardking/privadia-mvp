import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {FormGroup} from "@angular/forms";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' property-metafilter-cmp',
    templateUrl: 'metafilter.component.html',
    styleUrls: [ 'metafilter.component.css' ]
})  

export class PropertyMetafilterComponent implements OnInit{
	@Input('metadata') metadata;
	@Input('group')	propertyForm: FormGroup;
	//@ViewChild('metafilterHeading') metafilterHeading;

	public metafilters;

	constructor(  ) {
	}

	ngOnInit() {
        this.metafilters = [];
        for (let i = 0; i < this.metadata.length; i++) {
            for (let j = 0; j < this.metadata[i].MetaData.length; j++) {
            	this.metafilters[this.metadata[i].MetaData[j]] = false;
            }
        }
	}

	private subfilterChange(e) {
		let optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
        this.metafilters[optionId] = !this.metafilters[optionId];
	}


// 	let poi = this.pointsOfInterest.metafilterHeading.PoITypes.map( (item, index) => {
// 	return {
// 		Available: item.checked ? 1 : 0,
// 		Distance: item.distance,
// 		Name: item.typeName,
// 		PointOfInterestTypeId: item.Id
// 	};
// })


	// Available
	// 	:
	// 	true
	// Distance
	// 	:
	// 	10
	// Id
	// 	:
	// 	8
	// Name
	// 	:
	// 	"test bar"
	// PointOfInterestTypeId
	// 	:
	// 	4
	// PointOfInterestTypeName
	// 	:
	// 	"Bar"

}