import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from "@angular/forms";

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'select-field-cmp',
    templateUrl: 'select.component.html',
    styleUrls: [ 'select.component.css' ]
})

export class SelectfieldComponent implements OnInit{
    @Input('data') private data: any;
    @Input('group') private filterForm: FormGroup;

    constructor ( ) {

    }

    ngOnInit() {
        $(".selectpicker").selectpicker();

        $('.selectpicker').on('show.bs.select', function (e) {
            $('.dropdown-menu.inner').perfectScrollbar();
        });
    }
}