import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {FormGroup,FormArray,FormControl} from "@angular/forms";
//import * as _ from 'lodash';

declare var $:any;
declare var _:any;


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
	public metafiltersModel = [];
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
				/*
				this.metafiltersModel.push({
					MetaDataId: this.metadata.MetaDataSubTypes[i].MetaData[j].Id,
					MetaDataName: this.metadata.MetaDataSubTypes[i].MetaData[j].Name,
					Available: obj && obj['Available'] || false,
				})
				*/
				this.metafilters[this.metadata.MetaDataSubTypes[i].MetaData[j].Id] = obj && obj['Available'] || false;
            }
        }
		console.log('control',this.metafilters)
		$(".selectpicker").selectpicker({
			selectedTextFormat: 'static'
		});
		console.log('Metafilters Model', this.metafiltersModel)
		console.log('Property Form', this.propertyForm.value)
	}

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

	private subfilterChange(e) {
		console.log('event ',e.target.value)
		// let optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
		// let optionName = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-name') : e.target.parentElement.parentElement.getAttribute('option-name');
		// let optionSubtype = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-subtype') : e.target.parentElement.parentElement.getAttribute('option-subtype');
		// let optionIndex = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-index') : e.target.parentElement.parentElement.getAttribute('option-index');
        /// this.metafilters[optionId] = !this.metafilters[optionId];
		/*
		$(e.target).change(function() {
			var latest_value = $("option:selected:first",this).val();
			//alert(latest_value);

		});
		$(e.target).on('change',function() {
			//alert($(this).val());
			console.log($('option:selected:first',this).val());
		});
		let selectedValue = $("option:selected",$(e.target)).val();
		console.log('Selected Value', selectedValue);

   		const control = <FormGroup>this.propertyForm.controls['MetaDataTmp'];
		const controlSubtype = <FormArray>control.controls[e.target.getAttribute('option-subtype')];
		controlSubtype.controls[selectedValue].setValue({
			MetaDataId: controlSubtype.controls[selectedValue].value.MetaDataId,
			MetaDataName: controlSubtype.controls[selectedValue].value.MetaDataName,
			Available: !controlSubtype.controls[selectedValue].value.Available,
		});
		*/
		//console.log('Control Form after', this.propertyForm.value)
		//console.log('Control metadata after', this.metafilters)
		//console.log('Control metafiltersModel after', this.metafiltersModel)
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

// 	let poi = this.pointsOfInterest.metafilterHeading.PoITypes.map( (item, index) => {
// 	return {
// 		Available: item.checked ? 1 : 0,
// 		Distance: item.distance,
// 		Name: item.typeName,
// 		PointOfInterestTypeId: item.Id
// 	};
// })
}