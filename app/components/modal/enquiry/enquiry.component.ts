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

	constructor( private enquiryService: EnquiryService) {
	}

	ngOnInit() {
		console.log('Data ', this.data)
		console.log('Valid form ', this.enquiryForm)
	}

	private onSubmit(values) {
		console.log('Submit enquiry', values)
		console.log('Valid form ', this.enquiryForm.status)

		if(this.enquiryForm.status === 'INVALID')
			return;

		this.enquiryService.addEnquiry(values).subscribe(
			d => {
				$('#enquiry').modal('hide')
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
				console.log('Error add enquiry ', e)
			}
		)
	}
}