import {Component, OnInit, Input, AfterContentChecked, Output, EventEmitter} from '@angular/core';
import { FormControl } from "@angular/forms";
import initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");

declare const $: any;
declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'datetimepicker-field-cmp',
    templateUrl: 'datetimepicker-field.component.html',
    styleUrls: [ 'datetimepicker-field.component.css' ]
})

export class DatetimefieldComponent implements OnInit, AfterContentChecked{
    @Input('data') private data: any;
    @Input('classes') private classes: any;
    @Input('field') private field: FormControl;
    @Input('idPicker') private idPicker: string;
    @Input('disabledDates') private disabledDates: any;
    @Input('linkedField') private linkedField: FormControl;
    @Output('updateDate') updateDate: EventEmitter<any> = new EventEmitter();

    @Input('minDate') private minDate: FormControl;
    @Input('maxDate') private maxDate: FormControl;

    public dateTime: any;

    constructor( ) { }

    ngOnInit( ) { }

    ngAfterContentChecked() {
        this.dateTime = $(`.${this.idPicker}`);
        this.dateTime.datetimepicker({
            format: 'MM/DD/YYYY',
            disabledDates: this.disabledDates,
            minDate: this.minDate || false,
            maxDate: this.maxDate || false,
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
        });
    }

    updateDateEvent(evt, value) {
        this.field.setValue(value);
        this.updateDate.next(value);
    }
}