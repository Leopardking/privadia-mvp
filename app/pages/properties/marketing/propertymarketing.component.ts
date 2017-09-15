import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: ' propertymarketing-cmp',
    templateUrl: 'propertymarketing.component.html',
    styleUrls: [ 'propertymarketing.component.css' ]
})  

export class PropertymarketingComponent implements OnInit{
	@Input('group')	propertyForm: FormGroup;

	constructor() { }

	ngOnInit() {

		// this.propertyForm = new FormGroup({
		// 	'PropertyUrl': new FormControl(this.propertyForm.controls['PropertyUrl'], [ Validators.pattern(this.re) ]),
		// 	'PropertyAssetsUrl': new FormControl(this.propertyForm.controls['PropertyAssetsUrl'], [ Validators.pattern(this.re) ]),
		// });
	}
}