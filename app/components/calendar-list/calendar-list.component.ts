import { Component, OnInit, Input, ViewChild } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";

declare var moment: any;
declare var _: any;

@Component({
    moduleId: module.id,
    selector: ' calendar-list-cmp ',
    templateUrl: 'calendar-list.component.html',
    styleUrls: [ 'calendar-list.component.css' ]
})  

export class CalendarListComponent implements OnInit{
    private datatableInited = false;
	@Input('group')
	private propertyForm: FormGroup;

	@Input('errorForm')
	public errorForm: any;

	constructor( ) {
	}

	ngOnInit() {}

    private finishReading() {
        let DataTable: any = $('#datatables');
        DataTable.DataTable({
            paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    }

}