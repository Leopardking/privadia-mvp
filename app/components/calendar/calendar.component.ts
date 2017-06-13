import { Component, OnInit, Input, ViewChild } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";
import initFullCalendar = require('../../../assets/js/init/initFullCalendar.js');

@Component({
    moduleId: module.id,
    selector: ' calendar-cmp ',
    templateUrl: 'calendar.component.html',
    styleUrls: [ 'calendar.component.css' ]
})  

export class CalendarComponent implements OnInit{
	@Input('group')
	private propertyForm: FormGroup;

	constructor( ) {
	}

	ngOnInit() {
		setTimeout(() => {
			initFullCalendar()
		},500)
	}

}