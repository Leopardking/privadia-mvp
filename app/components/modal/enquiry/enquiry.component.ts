import { Component, OnInit, Input } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";

declare var moment: any;
declare var _: any;

@Component({
    moduleId: module.id,
    selector: 'enquiry-cmp ',
    templateUrl: 'enquiry.component.html',
    styleUrls: [ 'enquiry.component.css' ]
})  

export class EnquiryComponent implements OnInit{
	@Input('group')	private enquiryForm: FormGroup;
	@Input('data')	private data: any;

	constructor( ) {
	}

	ngOnInit() {
		console.log('Data ', this.data)
	}

	private onSubmit(values) {
		console.log('Submit enquiry', values)
	}
}