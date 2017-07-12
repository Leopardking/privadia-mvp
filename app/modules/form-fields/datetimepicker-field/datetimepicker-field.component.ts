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

    constructor ( ) { }

    ngOnInit() {
        initDatetimepickers();
    }
}