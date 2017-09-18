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
var platform_browser_1 = require("@angular/platform-browser");
var properties_service_1 = require('../../../providers/properties/properties.service');
var forms_1 = require("@angular/forms");
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
var login_service_1 = require("../../../providers/login/login.service");
var initWizard = require("../../../../assets/js/init/initWizard.js");
var PropertyinfoComponent = (function () {
    function PropertyinfoComponent(propertiesService, loginService, lookupsService, _sanitizer) {
        var _this = this;
        this.propertiesService = propertiesService;
        this.loginService = loginService;
        this.lookupsService = lookupsService;
        this._sanitizer = _sanitizer;
        this.role = !this.loginService.getRoles('Admin');
        this.autocompleListFormatter = function (data) {
            var html = "" + data.Name;
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
        this.lookupsService.readDataPropertyTypes();
        this.lookupsService.readDataPropertyContactTypes();
    }
    PropertyinfoComponent.prototype.ngOnInit = function () {
        initWizard();
        this.permission = !this.loginService.getPermission('Properties/Put');
        $('.property-tab a:first').tab('show');
    };
    PropertyinfoComponent.prototype.ngAfterContentChecked = function () {
        this.PropertyType = this.lookupsService.propertyTypes;
        this.PropertyContactTypes = this.lookupsService.propertyContactTypes;
    };
    PropertyinfoComponent.prototype.regionChanged = function (e) { };
    PropertyinfoComponent.prototype.autosize = function (e, minHeight) {
        console.log('min height', e.target);
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px !important';
    };
    PropertyinfoComponent.prototype.showAddContact = function () {
        var control = this.propertyForm.controls['Contacts'];
        control.push(new forms_1.FormGroup({
            ContactType: new forms_1.FormControl({ value: { Id: 1, Name: null }, disabled: this.permission }),
            ContactTypeOther: new forms_1.FormControl({ value: null, disabled: this.permission }),
            FirstName: new forms_1.FormControl({ value: null, disabled: this.permission }),
            LastName: new forms_1.FormControl({ value: null, disabled: this.permission }),
            EmailAddress: new forms_1.FormControl({ value: null, disabled: this.permission }, forms_1.Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
            Telephone: new forms_1.FormControl({ value: null, disabled: this.permission }),
        }));
    };
    PropertyinfoComponent.prototype.removeContact = function (i) {
        var control = this.propertyForm.controls['Contacts'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addBedroom = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl({ value: null, disabled: this.permission }),
            Name: new forms_1.FormControl({ value: null, disabled: this.permission }),
            PropertyRoomType: new forms_1.FormControl({ value: 1, disabled: this.permission }),
        }));
    };
    PropertyinfoComponent.prototype.removeBedroom = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addBathroom = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl({ value: null, disabled: this.permission }),
            Name: new forms_1.FormControl({ value: null, disabled: this.permission }),
            PropertyRoomType: new forms_1.FormControl({ value: 2, disabled: this.permission }),
        }));
    };
    PropertyinfoComponent.prototype.removeBathroom = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addKitchen = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl({ value: null, disabled: this.permission }),
            Name: new forms_1.FormControl({ value: null, disabled: this.permission }),
            PropertyRoomType: new forms_1.FormControl({ value: 3, disabled: this.permission }),
        }));
    };
    PropertyinfoComponent.prototype.removeKitchen = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertyinfoComponent.prototype, "propertyForm", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PropertyinfoComponent.prototype, "errorForm", void 0);
    PropertyinfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertyinfo-cmp ',
            templateUrl: 'propertyinfo.component.html',
            styleUrls: ['propertyinfo.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, login_service_1.LoginService, lookups_service_1.LookupsService, platform_browser_1.DomSanitizer])
    ], PropertyinfoComponent);
    return PropertyinfoComponent;
}());
exports.PropertyinfoComponent = PropertyinfoComponent;
//# sourceMappingURL=propertyinfo.component.js.map