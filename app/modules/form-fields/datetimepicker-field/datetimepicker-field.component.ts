import { Component, OnInit, Input } from '@angular/core';
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

export class DatetimefieldComponent implements OnInit{
    @Input('data') private data: any;
    @Input('classes') private classes: any;
    @Input('field') private field: FormControl;
    @Input('idPicker') private idPicker: string;
    @Input('disabledDates') private disabledDates: any;

    public dateTime: any;

    constructor ( ) { }

    ngOnInit() {
        setTimeout(() => {
            this.dateTime = $(`.${this.idPicker}`);
            this.dateTime.datetimepicker({
                format: 'MM/DD/YYYY',
                disabledDates: this.disabledDates,
                minDate: this.field.value,
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

        }, 300)

    }
}