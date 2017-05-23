import { Component, OnInit } from '@angular/core';

import { MainService } from '../../../services/homeservice';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' propertyimage-cmp ',
    templateUrl: 'propertyimage.component.html',
    styleUrls: [ 'propertyimage.component.css' ]
})  

export class PropertyimageoComponent implements OnInit{
	private images = [];

	constructor( private mainService: MainService ) {
	}

	ngOnInit() {
		this.images = this.mainService.villas.map((item, index) => { return item.ImageId; });

		$.getScript('../../../../assets/js/plugins/jssor.slider-23.1.6.mini.js');
		$.getScript('../../../../assets/js/init/initImageGallery.js');
	}

}