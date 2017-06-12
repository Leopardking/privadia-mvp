import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {FormGroup,FormArray,FormControl} from "@angular/forms";
import * as _ from 'lodash';
declare var $:any;


@Component({
    moduleId: module.id,
    selector: ' property-metafilter-cmp',
    templateUrl: 'metafilter.component.html',
    styleUrls: [ 'metafilter.component.css' ]
})  

export class PropertyMetafilterComponent implements OnInit{
	@Input('metadata') metadata;
	@Input('group')
	public propertyForm: FormGroup;

	//@ViewChild('metafilterHeading') metafilterHeading;

	public metafilters;
	constructor(  ) {}

	ngOnInit() {
        this.metafilters = [];
        const values = this.propertyForm.controls['MetaData'].value;
		// console.log('MetaDataTmp ', );
		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];

        for (let i = 0; i < this.metadata.MetaDataSubTypes.length; i++) {
			control.addControl(
				'type_' + this.metadata.MetaDataSubTypes[i].Id,
				new FormArray([])
			);

			const controlSubtype = <FormArray>control.controls['type_' + this.metadata.MetaDataSubTypes[i].Id];
            for (let j = 0; j < this.metadata.MetaDataSubTypes[i].MetaData.length; j++) {
				const obj = _.find(values, (el) => {
					return el['MetaDataId'] == this.metadata.MetaDataSubTypes[i].MetaData[j].Id;
				});
				// console.log('Available', obj)
				controlSubtype.push(
					new FormGroup({
						MetaDataId: new FormControl(this.metadata.MetaDataSubTypes[i].MetaData[j].Id),
						MetaDataName: new FormControl(this.metadata.MetaDataSubTypes[i].MetaData[j].Name),
						Available: new FormControl(obj && obj['Available'] || false),
					}),
				);
				this.metafilters[this.metadata.MetaDataSubTypes[i].MetaData[j].Id] = obj && obj['Available'] || false;
            }
        }

		if($(".selectpicker").length != 0){
			setTimeout(() => {
				$(".selectpicker").selectpicker();
			},500);
		}
	}

	private subfilterChange(e) {
		// let optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
		// let optionName = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-name') : e.target.parentElement.parentElement.getAttribute('option-name');
		// let optionSubtype = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-subtype') : e.target.parentElement.parentElement.getAttribute('option-subtype');
		// let optionIndex = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-index') : e.target.parentElement.parentElement.getAttribute('option-index');
        /// this.metafilters[optionId] = !this.metafilters[optionId];

   		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];
		const controlSubtype = <FormArray>control.controls[e.target.getAttribute('option-subtype')];
		controlSubtype.controls[e.target.value].setValue({
			MetaDataId: controlSubtype.controls[e.target.value].value.MetaDataId,
			MetaDataName: controlSubtype.controls[e.target.value].value.MetaDataName,
			Available: !controlSubtype.controls[e.target.value].value.Available,
		});
		//console.log('Control metadata after', e.target.value, controlSubtype)
	}

	private removeMetafilter(el) {
		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];
		const controlSubtype = <FormArray>control.controls[el.type];
		controlSubtype.controls[el.index].setValue({
			MetaDataId: controlSubtype.controls[el.index].value.MetaDataId,
			MetaDataName: controlSubtype.controls[el.index].value.MetaDataName,
			Available: !controlSubtype.controls[el.index].value.Available,
		});
	}

// 	let poi = this.pointsOfInterest.metafilterHeading.PoITypes.map( (item, index) => {
// 	return {
// 		Available: item.checked ? 1 : 0,
// 		Distance: item.distance,
// 		Name: item.typeName,
// 		PointOfInterestTypeId: item.Id
// 	};
// })
}