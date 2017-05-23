import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: ' propertymarketing-cmp ',
    templateUrl: 'propertymarketing.component.html',
    styleUrls: [ 'propertymarketing.component.css' ]
})  

export class PropertymarketingComponent implements OnInit{
	public pdfUrl;
	public agencyPackUrl;

	constructor(  ) {
	}

	ngOnInit() {

	}

	private pdfUrlChanged(e) {
		this.pdfUrl = e.target.value;
	}

	private agnecyPackUrl(e) {
		this.agencyPackUrl = e.target.value;
	}
}