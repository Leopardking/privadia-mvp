import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'select-tags-field-cmp',
    templateUrl: 'select-tags.component.html',
    styleUrls: [ 'select-tags.component.css' ]
})

export class SelectTagsFieldComponent implements OnInit {
    @Input('data') private data: any;
    @Input('subtype') private subtype: any;
    @Input('group') private field: FormGroup;

    constructor () { }

    ngOnInit() {
        const selectQuery = $(".selectpicker");
        setTimeout(()=> {
            selectQuery.selectpicker({
                selectedTextFormat: 'static'
            });

            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.inner').perfectScrollbar();
            });
        }, 1)
    }

    private subfilterModelChange(e, type) {
        const controlSubtype = <FormArray>this.field.controls[type];
        controlSubtype.controls.forEach((key, value) => {
            e.find((el) => {
                if(el.MetaDataId == key.value.MetaDataId) {
                    key.setValue({
                        MetaDataId: el.MetaDataId,
                        MetaDataName: el.MetaDataName,
                        Available: !el.Available,
                    });
                }
            })
        })
    }

    private removeMetafilter(e) {
        const controlSubtype = <FormArray>this.field.controls[e.type];
        controlSubtype.controls[e.index].setValue({
            MetaDataId: controlSubtype.controls[e.index].value.MetaDataId,
            MetaDataName: controlSubtype.controls[e.index].value.MetaDataName,
            Available: !controlSubtype.controls[e.index].value.Available,
        });
    }
}