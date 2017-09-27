import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {FormGroup, FormArray, FormControl, FormBuilder} from "@angular/forms";

declare const $: any;
import * as _ from "lodash";

@Component({
    moduleId: module.id,
    selector: 'singleselect-field-cmp',
    templateUrl: 'single-select.component.html',
    styleUrls: [ 'single-select.component.css' ]
})

export class SingleSelectfieldComponent implements OnInit, AfterViewInit {
    @Input('field') public field: FormGroup;
    @Input('dataList') public dataList = [];
    @Input('options') public options: any;
    @Input() public errorForm: any;
    @Input() public disabled = false;

    constructor ( ) {}

    ngOnInit() {
        const selectQuery = $(".custompicker");

        selectQuery.selectpicker();
    }

    ngAfterViewInit() {
        const selectQuery = $(".custompicker");
        setTimeout(() => {
            selectQuery.selectpicker('render');
            selectQuery.selectpicker('refresh');
        });

        selectQuery.on('show.bs.select', function (e) {
            $('.dropdown-menu.inner').perfectScrollbar('update');
        });
    }
}