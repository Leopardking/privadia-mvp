import {Component, OnInit, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';

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
	}
}