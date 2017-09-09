"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_cloudinary_1 = require('ng2-cloudinary');
var forms_1 = require("@angular/forms");
var login_service_1 = require("../../../providers/login/login.service");
var PropertyimageoComponent = (function () {
    function PropertyimageoComponent(loginService) {
        this.loginService = loginService;
        this.images = [];
        this.options = {
            onUpdate: function (event) {
                console.log('event', event);
                //this.postChangesToServer();
            }
        };
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({
            cloudName: 'privadia',
            uploadPreset: 'blmelyur',
            resourceType: 'image'
        }));
    }
    PropertyimageoComponent.prototype.ngOnInit = function () {
        //$.getScript('../../../../assets/js/plugins/jssor.slider-23.1.6.mini.js');
        var _this = this;
        this.propertyForm.controls['Images'].valueChanges.subscribe(function () {
            console.log('Value change');
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            $.notify({
                icon: "notifications",
                message: "Successfully uploaded"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            var img = JSON.parse(response);
            var image = {
                FileName: img.url,
                ImageId: img.public_id
            };
            // this.images.push(image);
            //$.getScript('../../../../assets/js/init/initImageGallery.js');
            //Add a new image to Main Form
            _this.addImage(image);
            return { item: item, response: response, status: status, headers: headers };
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            $.notify({
                icon: "notifications",
                message: "Image Upload Failed"
            }, {
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            return { item: item, response: response, status: status, headers: headers };
        };
        //$.getScript('../../../../assets/js/init/initImageGallery.js');
    };
    PropertyimageoComponent.prototype.deleteImage = function (item) {
    };
    PropertyimageoComponent.prototype.uploadImage = function () {
    };
    PropertyimageoComponent.prototype.fileChange = function () {
        this.uploader.uploadAll();
    };
    /**
     * Add the image to main Form
     *
     * @param image
     */
    PropertyimageoComponent.prototype.addImage = function (image) {
        var control = this.propertyForm.controls['Images'];
        control.push(new forms_1.FormGroup({
            FileName: new forms_1.FormControl(image.FileName),
            ImageId: new forms_1.FormControl(image.ImageId),
        }));
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertyimageoComponent.prototype, "propertyForm", void 0);
    PropertyimageoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertyimage-cmp',
            templateUrl: 'propertyimage.component.html',
            styleUrls: ['propertyimage.component.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], PropertyimageoComponent);
    return PropertyimageoComponent;
}());
exports.PropertyimageoComponent = PropertyimageoComponent;
//# sourceMappingURL=propertyimage.component.js.map