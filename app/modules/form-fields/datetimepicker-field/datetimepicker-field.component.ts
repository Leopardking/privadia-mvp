import {Component, OnInit, Input, AfterContentChecked, Output, EventEmitter} from '@angular/core';
import { FormControl } from "@angular/forms";
// import initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");

declare const $: any;
declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'datetimepicker-field-cmp',
    templateUrl: 'datetimepicker-field.component.html',
    styleUrls: [ 'datetimepicker-field.component.css' ]
})

export class DatetimefieldComponent implements OnInit, AfterContentChecked {
    @Input('data') private data: any;
    @Input('classes') private classes: any;
    @Input('field') private field: FormControl;
    @Input('idPicker') private idPicker: string;
    @Input('disabledDates') private disabledDates: any;
    @Input('QQZ') private QQZ: any;
    @Input('linkedField') private linkedField: FormControl;
    @Output('updateDate') updateDate: EventEmitter<any> = new EventEmitter();

    @Input('minDate') private minDate: any;
    @Input('maxDate') private maxDate: any;

    public dateTime: any;

    constructor( ) {

    }

    ngOnInit( ) {
        // console.log("567890--------", this.field.value)
        console.log("567890--------", this.QQZ)
        console.log(this.QQZ)
        if(!this.QQZ){
            this.field.setValue(0)

        }
        // this.field.setValue(0);
    }

    ngAfterContentChecked() {
        this.dateTime = $(`.${this.idPicker}`);
        this.dateTime.datetimepicker({
            format: 'DD/MM/YYYY',
            disabledDates: this.disabledDates,
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
        if(!this.updateDate.observers.length)
            this.field.setValue(value);
        else
            this.updateDate.next(value);
    }
}