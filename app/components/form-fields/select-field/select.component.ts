import { Component, OnInit, Input } from '@angular/core';

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'select-field-cmp',
    templateUrl: 'select.component.html',
    styleUrls: [ 'select.component.css' ]
})

export class SelectfieldComponent implements OnInit{
    @Input('data') private data: any;

    constructor ( ) {

    }

    ngOnInit() {
        $(".selectpicker").selectpicker();

        $('.selectpicker').on('show.bs.select', function (e) {
            $('.dropdown-menu.inner').perfectScrollbar();
        });
    }
}