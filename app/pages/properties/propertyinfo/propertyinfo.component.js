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
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        this.ownerNames = [];
        this.regions = [];
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
        this.contacts.push({
            id: this.contacts.length == 0 ? 0 : this.contacts[this.contacts.length - 1].id + 1,
            jobTitle: "",
            firstName: "",
            lastName: "",
            email: "",
            telephone: ""
        });
    };
    PropertyinfoComponent.prototype.removeContact = function (id) {
        var i;
        for (i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == id) {
                break;
            }
        }
        this.contacts.splice(i, 1);
    };
    PropertyinfoComponent.prototype.addBedroom = function () {
        this.bedrooms.push({
            id: this.bedrooms.length == 0 ? 0 : this.bedrooms[this.bedrooms.length - 1].id + 1,
            name: "",
            description: ""
        });
    };
    PropertyinfoComponent.prototype.removeBedroom = function (id) {
        var i;
        for (i = 0; i < this.bedrooms.length; i++) {
            if (this.bedrooms[i].id == id) {
                break;
            }
        }
        this.bedrooms.splice(i, 1);
    };
    PropertyinfoComponent.prototype.addBathroom = function () {
        this.bathrooms.push({
            id: this.bathrooms.length == 0 ? 0 : this.bathrooms[this.bathrooms.length - 1].id + 1,
            name: "",
            description: ""
        });
    };
    PropertyinfoComponent.prototype.removeBathroom = function (id) {
        var i;
        for (i = 0; i < this.bathrooms.length; i++) {
            if (this.bathrooms[i].id == id) {
                break;
            }
        }
        this.bathrooms.splice(i, 1);
    };
    PropertyinfoComponent.prototype.ownerChanged = function (e) {
        this.ownerName = e;
        var owernIndex = this.ownerNames.indexOf(this.ownerName);
        this.owner = this.owners[owernIndex];
        if (owernIndex == -1) {
            this.owner = {
                Id: "",
                Name: e
            };
        }
        if (e) {
            $("#ownerName").removeClass('is-empty');
        }
    };
    PropertyinfoComponent.prototype.regionChanged = function (e) {
        this.regionName = e;
        var index = this.regions.indexOf(e);
        this.region = this.regionArray[index];
        if (index == -1) {
            this.region = {
                Id: "",
                Name: e
            };
        }
        if (e) {
            $("#regionName").removeClass('is-empty');
            $("#regionName").removeClass('has-error');
        }
    };
    PropertyinfoComponent.prototype.listingNameChanged = function (e) {
        this.InternalName = e.target.value;
    };
    PropertyinfoComponent.prototype.officialNameChanged = function (e) {
        this.officialName = e.target.value;
    };
    PropertyinfoComponent.prototype.addressChanged = function (e) {
        this.address = e.target.value;
    };
    PropertyinfoComponent.prototype.adminInfoChanged = function (id, key, e) {
        var i;
        for (i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == id) {
                break;
            }
        }
        this.contacts[i][key] = e.target.value;
    };
    PropertyinfoComponent.prototype.bedroomChanged = function (id, key, e) {
        var i;
        for (i = 0; i < this.bedrooms.length; i++) {
            if (this.bedrooms[i].id == id) {
                break;
            }
        }
        this.bedrooms[i][key] = e.target.value;
    };
    PropertyinfoComponent.prototype.bathroomChanged = function (id, key, e) {
        var i;
        for (i = 0; i < this.bathrooms.length; i++) {
            if (this.bathrooms[i].id == id) {
                break;
            }
        }
        this.bathrooms[i][key] = e.target.value;
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