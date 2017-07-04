import { Component, OnInit, Input } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

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

	constructor( private enquiryService: EnquiryService) { }

	ngOnInit() { }

	private onSubmit(values) {
		console.log('Valid form ', this.enquiryForm)

		if(this.enquiryForm.status === 'INVALID')
			return this.errorForm = true;

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
				console.log('Error add enquiry ', e)
			}
		)
	}
}