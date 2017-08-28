import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';

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
    @Input('group') private availabilityForm: FormGroup;
    @Input('errorForm') public errorForm: any;
    @Output() editAvailability: EventEmitter<any> = new EventEmitter();

    private datatableInited = false;

    constructor( ) { }

	ngOnInit() {
        this.availabilityForm.valueChanges.subscribe(data => {
            console.log('sdfgsdg')
        });
    }

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

    editEvent(evt) {
        this.editAvailability.next(evt);
    }
}