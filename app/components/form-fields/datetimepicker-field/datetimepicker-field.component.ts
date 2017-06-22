import { Component, OnInit, Input } from '@angular/core';
import initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");
import {FormGroup} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'datetimepicker-field-cmp',
    templateUrl: 'datetimepicker-field.component.html',
    styleUrls: [ 'datetimepicker-field.component.css' ]
})

export class DatetimefieldComponent implements OnInit{
    @Input('data') private data: any;
    @Input('group') private filterForm: FormGroup;

    constructor ( ) {

    }

    ngOnInit() {
        initDatetimepickers();
    }
}