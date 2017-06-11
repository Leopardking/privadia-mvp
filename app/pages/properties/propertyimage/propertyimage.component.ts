import {Component, OnInit, Input} from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {FormGroup, FormArray, FormControl} from "@angular/forms";

declare var $:any;
declare var window: any;

@Component({
    moduleId: module.id,
    selector: ' propertyimage-cmp',
    templateUrl: 'propertyimage.component.html',
    styleUrls: [ 'propertyimage.component.css' ]
})

export class PropertyimageoComponent implements OnInit{
	private images = [];
	private uploader: CloudinaryUploader;
	@Input('group')	propertyForm: FormGroup;

	constructor() {
		this.uploader = new CloudinaryUploader(
			new CloudinaryOptions({
				cloudName: 'privadia',
				uploadPreset: 'blmelyur'
			})
		);
	}

	ngOnInit() {
		//$.getScript('../../../../assets/js/plugins/jssor.slider-23.1.6.mini.js');

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
			let image = {
				FileName: img.url,
				ImageId: img.public_id
			};
			// this.images.push(image);

			//$.getScript('../../../../assets/js/init/initImageGallery.js');

			//Add a new image to Main Form
			this.addImage(image);

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
		};
		//$.getScript('../../../../assets/js/init/initImageGallery.js');
	}

	private uploadImage() {
	}

	private fileChange() {
		this.uploader.uploadAll();
	}

	/**
	 * Add the image to main Form
	 *
	 * @param image
	 */
	private addImage(image) {
		const control = <FormArray>this.propertyForm.controls['Images'];
		control.push(
			new FormGroup({
				FileName: new FormControl(image.FileName),
				ImageId: new FormControl(image.ImageId),
			})
		);
	}
}