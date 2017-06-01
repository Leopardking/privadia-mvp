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
var properties_service_1 = require('../../../providers/properties/properties.service');
var homeservice_1 = require('../../../providers/homeservice');
var forms_1 = require("@angular/forms");
var PropertyinfoComponent = (function () {
    function PropertyinfoComponent(propertyService, mainService) {
        this.propertyService = propertyService;
        this.mainService = mainService;
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    PropertyinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('this.property mainService', this.mainService.metadata);
        //this.property// = this.getInfo();
        //console.log('Property ', this.property)
        //this.contacts = [];
        //this.bedrooms = [];
        //this.bathrooms = [];
        //this.ownerNames = [];
        //this.regions = [];
        this.ownerName = "";
        this.regionName = "";
        this.owner = {
            Id: '',
            Name: ''
        };
        this.region = {
            Id: '',
            Name: ''
        };
        // description
        this.propertyService.getOwners().subscribe(function (d) {
            _this.owners = d;
            _this.ownerNames = d.map(function (item, i) { return item.Name; });
        }, function (e) { console.log("error: ", e); });
        this.propertyService.getregions().subscribe(function (d) {
            _this.regionArray = d;
            _this.regions = d.map(function (item, i) { return item.Name; });
        }, function (e) { console.log("error: ", e); });
    };
    PropertyinfoComponent.prototype.showAddContact = function () {
        var control = this.propertyForm.controls['Contacts'];
        control.push(new forms_1.FormGroup({
            JobTitle: new forms_1.FormControl('JobTitle'),
            FirstName: new forms_1.FormControl('FirstName'),
            LastName: new forms_1.FormControl('LastName'),
            Email: new forms_1.FormControl('Email'),
            Telephone: new forms_1.FormControl('Telephone'),
        }));
    };
    PropertyinfoComponent.prototype.removeContact = function (i) {
        var control = this.propertyForm.controls['Contacts'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addBedroom = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl('Description'),
            Name: new forms_1.FormControl('Name'),
            PropertyRoomType: new forms_1.FormControl(1),
        }));
    };
    PropertyinfoComponent.prototype.removeBedroom = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    PropertyinfoComponent.prototype.addBathroom = function () {
        var control = this.propertyForm.controls['Rooms'];
        control.push(new forms_1.FormGroup({
            Description: new forms_1.FormControl('Description'),
            Name: new forms_1.FormControl('Name'),
            PropertyRoomType: new forms_1.FormControl(2),
        }));
    };
    PropertyinfoComponent.prototype.removeBathroom = function (i) {
        var control = this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    };
    __decorate([
        core_1.Input('property'), 
        __metadata('design:type', Object)
    ], PropertyinfoComponent.prototype, "property", void 0);
    __decorate([
        core_1.Input('name'), 
        __metadata('design:type', Object)
    ], PropertyinfoComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], PropertyinfoComponent.prototype, "propertyForm", void 0);
    __decorate([
        core_1.ViewChild('villadescription'), 
        __metadata('design:type', Object)
    ], PropertyinfoComponent.prototype, "villadescription", void 0);
    PropertyinfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertyinfo-cmp ',
            templateUrl: 'propertyinfo.component.html',
            styleUrls: ['propertyinfo.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, homeservice_1.MainService])
    ], PropertyinfoComponent);
    return PropertyinfoComponent;
}());
exports.PropertyinfoComponent = PropertyinfoComponent;
//# sourceMappingURL=propertyinfo.component.js.map