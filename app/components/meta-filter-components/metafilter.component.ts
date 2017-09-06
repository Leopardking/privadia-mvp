import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import * as _ from 'lodash'

declare const $:any;


@Component({
    moduleId: module.id,
    selector: ' property-metafilter-cmp',
    templateUrl: 'metafilter.component.html',
    styleUrls: [ 'metafilter.component.css' ]
})  

export class PropertyMetafilterComponent implements OnInit{
	@Input('metadata') metadata;
	@Input('metadataId') metadataId;
	@Input('group') public propertyForm: FormGroup;
	public metadataView;

	public metafilters;
	constructor(  ) {}

	ngOnInit() {
        this.metafilters = [];
        const values = this.propertyForm.controls['MetaData'].value;
		this.metadataView = _.find(this.metadata, (o) => {
			return o['Id'] == this.metadataId;
		});

		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];

        for (let i = 0; i < this.metadataView['MetaDataSubTypes'].length; i++) {
		    control.addControl(
				'type_' + this.metadataView['MetaDataSubTypes'][i].Id,
				new FormArray([])
            );
            const controlSubtype = <FormArray>control.controls['type_' + this.metadataView['MetaDataSubTypes'][i].Id];
            for (let j = 0; j < this.metadataView['MetaDataSubTypes'][i].MetaData.length; j++) {
				const obj = _.find(values, (el) => {
					return el['MetaDataId'] == this.metadataView['MetaDataSubTypes'][i].MetaData[j].Id;
				});

				controlSubtype.push(
					new FormGroup({
						MetaDataId: new FormControl(this.metadataView['MetaDataSubTypes'][i].MetaData[j].Id),
						MetaDataName: new FormControl(this.metadataView['MetaDataSubTypes'][i].MetaData[j].Name),
						Available: new FormControl(obj && obj['Available'] || false),
					}),
				);
				this.metafilters[this.metadataView['MetaDataSubTypes'][i].MetaData[j].Id] = obj && obj['Available'] || false;
            }
        }

		setTimeout(() => {
			$(".selectpicker").selectpicker({
				selectedTextFormat: 'static'
			});
		}, 1000);
		$('.dropdown-menu.inner').perfectScrollbar();
	}

	/*
	private subfilterModelChange(e, type) {
		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];
		const controlSubtype = <FormArray>control.controls[type];
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
		console.log('remove', e.index)
		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];
		const controlSubtype = <FormArray>control.controls[e.type];
		controlSubtype.controls[e.index].setValue({
			MetaDataId: controlSubtype.controls[e.index].value.MetaDataId,
			MetaDataName: controlSubtype.controls[e.index].value.MetaDataName,
			Available: !controlSubtype.controls[e.index].value.Available,
		});
	}
	*/
}