import { Component, OnInit, Input } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import {error} from "util";
import {handlerErrorFieds, handlerErrorNotify} from "../../../helpers/helpers";

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
			},
			e => {
				this.errorForm = true;

				handlerErrorFieds(e, this.enquiryForm);
				handlerErrorNotify('There were errors with your submission, please see form for details.');
			}
		)
	}
}