import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' property-metafilter-cmp ',
    templateUrl: 'metafilter.component.html',
    styleUrls: [ 'metafilter.component.css' ]
})  

export class PropertyMetafilterComponent implements OnInit{
	@Input('metadata') metadata;
	@ViewChild('metafilterHeading') metafilterHeading;

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

}