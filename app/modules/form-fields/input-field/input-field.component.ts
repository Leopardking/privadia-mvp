import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'input-field-cmp',
    templateUrl: 'input-field.component.html',
    styleUrls: [ 'input-field.component.css' ]
})

export class InputfieldComponent implements OnInit{
    @Input('data') private data: any;
    @Input('errorForm') private errorForm: any;
    @Input('static') private staticField: boolean = false;
    @Input('field') private field: FormControl;

    constructor ( ) {

    }

    ngOnInit() { }
}