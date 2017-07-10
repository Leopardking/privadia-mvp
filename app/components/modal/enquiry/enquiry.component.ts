import { Component, OnInit, Input } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import {error} from "util";

declare const moment: any;
declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'enquiry-cmp ',
    templateUrl: 'enquiry.component.html',
    styleUrls: [ 'enquiry.component.css' ]
})  

export class EnquiryComponent implements OnInit{
	@Input('group')	private enquiryForm: FormGroup;
	@Input('data')	private data: any;
	public errorForm = false;
	public errorsList = {};

	constructor( private enquiryService: EnquiryService) { }

	ngOnInit() { }

	private onSubmit(values) {
		console.log('Valid form ', this.enquiryForm.controls['CheckOut'].valid)
		/*
		if(this.enquiryForm.status === 'INVALID')
			return this.errorForm = true;
		*/
		this.enquiryService.addEnquiry(values).subscribe(
			d => {
				this.errorForm = false;
				$('#enquiry').modal('hide');
				$.notify({
					icon: "notifications",
					message: "Enquiry Submit Successfully"

				},{
					type: 'success',
					timer: 3000,
					placement: {
						from: 'top',
						align: 'right'
					}
				});

				console.log('Added Enquiry ', d)
			},
			e => {
				this.errorForm = true;

				const fileds = Object.keys( e.ModelState || {});
				this.errorsList = e.ModelState;
				fileds.forEach((field) => {
					this.enquiryForm.controls[field].setErrors({ serverError: e.ModelState[field] });
				});
				console.log('Error ',this.errorsList)
			}
		)
	}
}