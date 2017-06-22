import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: ' propertymarketing-cmp',
    templateUrl: 'propertymarketing.component.html',
    styleUrls: [ 'propertymarketing.component.css' ]
})  

export class PropertymarketingComponent implements OnInit{
	@Input('group')	propertyForm: FormGroup;
	private re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

	constructor() { }

	ngOnInit() { }

	/*
	private pdfUrlChanged(e) {
		this.pdfUrl = e.target.value;

		if (this.pdfUrl != "" && !this.re.test(this.pdfUrl)) {
			$(this.elePdfUrl.nativeElement).parent().addClass('has-error');
		} else {
			$(this.elePdfUrl.nativeElement).parent().removeClass('has-error');
		}
	}

	private agnecyPackUrl(e) {
		this.agencyPackUrl = e.target.value;

		if (this.agencyPackUrl != "" && !this.re.test(this.pdfUrl)) {
			$(this.eleAgencyUrl.nativeElement).parent().addClass('has-error');
		} else {
			$(this.eleAgencyUrl.nativeElement).parent().removeClass('has-error');
		}
	}
	public getValidation() {
		let validate = true;

		if (this.agencyPackUrl != "" && !this.re.test(this.agencyPackUrl)) { 
		    $(this.eleAgencyUrl.nativeElement).parent().addClass('has-error');
		    validate = false;
		} else {
			$(this.eleAgencyUrl.nativeElement).parent().removeClass('has-error');
		}

		if (this.pdfUrl != "" && !this.re.test(this.pdfUrl)) {
			$(this.elePdfUrl.nativeElement).parent().addClass('has-error');
		    validate = false;
		} else {
			$(this.elePdfUrl.nativeElement).parent().removeClass('has-error');
		}

		return validate;
	}
	*/
}