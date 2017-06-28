import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormArray, FormControl, FormBuilder} from "@angular/forms";

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
    @Input('group') private field: FormArray;

    //private selectQuery = $(".selectpicker");
    private metafiltersModel;
    constructor ( private builder: FormBuilder) {

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

        this.regions.forEach(() => {
            this.field.push(new FormControl());
        })
    }

    private regionChange(e) {
        this.field.reset();
        this.field.patchValue(this.metafiltersModel)
    }
}