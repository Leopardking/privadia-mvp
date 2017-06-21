import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'datetimepicker-field-cmp',
    templateUrl: 'datetimepicker-field.component.html',
    styleUrls: [ 'datetimepicker-field.component.css' ]
})

export class DatetimefieldComponent implements OnInit{
    @Input('data') private data: any;

    constructor ( ) {

    }

    ngOnInit() {

    }
}