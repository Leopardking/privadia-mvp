import { Component, OnInit } from '@angular/core';

import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { MainService } from '../../../providers/homeservice';

declare var $:any;
declare var window: any;

@Component({
    moduleId: module.id,
    selector: ' propertyimage-cmp ',
    templateUrl: 'propertyimage.component.html',
    styleUrls: [ 'propertyimage.component.css' ]
})  


export class PropertyimageoComponent implements OnInit{
	private images = [];

	private uploader: CloudinaryUploader;

	constructor( private mainService: MainService ) {
		this.uploader = new CloudinaryUploader( 
			new CloudinaryOptions({
				cloudName: 'privadia', 
				uploadPreset: 'blmelyur'
			}) 
		);

	}

	ngOnInit() {
		$.getScript('../../../../assets/js/plugins/jssor.slider-23.1.6.mini.js');

		this.uploader.onSuccessItem = ( item, response, status, headers) => {
			$.notify({
                icon: "notifications",
                message: "Successfully uploaded"
            },{
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

			let img = JSON.parse(response);
			
			this.images.push({
				FileName: img.url,
				ImageId: img.public_id
			});
			$.getScript('../../../../assets/js/init/initImageGallery.js');

			console.log(img);

			return {item, response, status, headers};
		};

		this.uploader.onErrorItem = ( item, response, status, headers) => {
			$.notify({
                icon: "notifications",
                message: "Image Upload Failed"
            },{
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

          	return {item, response, status, headers};  
		}
	}

	private uploadImage() {

	}

	private fileChange() {
		this.uploader.uploadAll();
	}
}