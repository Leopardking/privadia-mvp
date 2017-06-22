import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormArray, FormControl} from "@angular/forms";

declare const $: any;
import * as _ from "lodash";

@Component({
    moduleId: module.id,
    selector: 'select-field-cmp',
    templateUrl: 'select.component.html',
    styleUrls: [ 'select.component.css' ]
})

export class SelectfieldComponent implements OnInit {
    @Input('data') private data: any;
    @Input('regions') private regions: any;
    @Input('group') private filterForm: FormGroup;

    //private selectQuery = $(".selectpicker");
    constructor () {

    }

    ngOnInit() {
        const selectQuery = $(".selectpicker");
        setTimeout(()=> {
            selectQuery.selectpicker({
                selectedTextFormat: 'static'
            });

            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.inner').perfectScrollbar();
            });
        }, 10)
    }

    private regionChange(e) {
        const control = <FormArray>this.filterForm.controls['Regions'];

        const arr = $(e.target).val();
        arr.forEach((value) => {
            const index = _.findIndex(control.value, (val) => { return val == value});
            return control.push(new FormControl(value));
        });
    }
}