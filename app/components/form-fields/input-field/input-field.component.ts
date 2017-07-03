import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'input-field-cmp',
    templateUrl: 'input-field.component.html',
    styleUrls: [ 'input-field.component.css' ]
})

export class InputfieldComponent implements OnInit{
    @Input('data') private data: any;
    @Input('static') private static: boolean = false;
    @Input('field') private field: FormControl;

    constructor ( ) {

    }

    ngOnInit() { }
}