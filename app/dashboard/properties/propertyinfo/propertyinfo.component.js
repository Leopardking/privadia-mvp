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
var properties_service_1 = require('../../../services/properties/properties.service');
var PropertyinfoComponent = (function () {
    function PropertyinfoComponent(propertyService) {
        this.propertyService = propertyService;
        //description
        this.headline = "";
        this.summary = "";
        this.description = "";
        this.otherInfo = "";
        this.collaboratorInitial = "";
        this.boxUrl = "";
        //property size and rooms
        this.bathroomCount = "";
        this.bedroomCount = "";
        this.sleepCount = "";
        this.maximumCapacity = "";
        this.livingSquare = "";
        this.diningCapacity = "";
        this.kitchenInfo = "";
        //children
        this.allowChildren = 0;
        this.smokeAllowed = false;
        this.petsAllowed = false;
        this.eventsAllowed = false;
        this.wheelchairAllowed = false;
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    PropertyinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        this.owners = [];
        this.regions = [];
        this.ownerName = "";
        this.regionName = "";
        // description
        this.propertyService.getOwners().subscribe(function (d) {
            _this.owners = d.map(function (item, i) { return item.Name; });
        }, function (e) { console.log("error: ", e); });
        this.propertyService.getregions().subscribe(function (d) {
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
        if (e) {
            $("#ownerName").removeClass('is-empty');
        }
    };
    PropertyinfoComponent.prototype.regionChanged = function (e) {
        this.regionName = e;
        if (e) {
            $("#regionName").removeClass('is-empty');
        }
    };
    PropertyinfoComponent.prototype.listingNameChanged = function (e) {
        this.listingName = e.target.value;
    };
    PropertyinfoComponent.prototype.officialNameChanged = function (e) {
        this.officialName = e.target.value;
    };
    PropertyinfoComponent.prototype.addressChanged = function (e) {
        this.address = e.target.value;
    };
    PropertyinfoComponent.prototype.headlineChanged = function (e) {
        this.headline = e.target.value;
    };
    PropertyinfoComponent.prototype.summaryChanged = function (e) {
        this.summary = e.target.value;
    };
    PropertyinfoComponent.prototype.otherInfoChanged = function (e) {
        this.otherInfo = e.target.value;
    };
    PropertyinfoComponent.prototype.descriptionChanged = function (e) {
        this.description = e.target.value;
    };
    PropertyinfoComponent.prototype.collaboratorInitialChanged = function (e) {
        this.collaboratorInitial = e.target.value;
    };
    PropertyinfoComponent.prototype.boxUrlChanged = function (e) {
        this.boxUrl = e.target.value;
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
    PropertyinfoComponent.prototype.bathroomsCountChanged = function (e) {
        this.bathroomCount = e.target.value;
    };
    PropertyinfoComponent.prototype.bedroomsCountChanged = function (e) {
        this.bedroomCount = e.target.value;
    };
    PropertyinfoComponent.prototype.sleepsChanged = function (e) {
        this.sleepCount = e.target.value;
    };
    PropertyinfoComponent.prototype.maximumCapacityChanged = function (e) {
        this.maximumCapacity = e.target.value;
    };
    PropertyinfoComponent.prototype.livingareaSquareChanged = function (e) {
        this.livingSquare = e.target.value;
    };
    PropertyinfoComponent.prototype.diningCapacityChanged = function (e) {
        this.diningCapacity = e.target.value;
    };
    PropertyinfoComponent.prototype.kitchenInfoChanged = function (e) {
        this.kitchenInfo = e.target.value;
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
    PropertyinfoComponent.prototype.childrenAllowChanged = function (e) {
        this.allowChildren = e.target.value;
    };
    PropertyinfoComponent.prototype.smokeAllowChange = function (e) {
        this.smokeAllowed = e.target.checked;
    };
    PropertyinfoComponent.prototype.petsAllowChange = function (e) {
        this.petsAllowed = e.target.checked;
    };
    PropertyinfoComponent.prototype.eventsAllowChange = function (e) {
        this.eventsAllowed = e.target.checked;
    };
    PropertyinfoComponent.prototype.wheelchairAllowChange = function (e) {
        this.wheelchairAllowed = e.target.checked;
    };
    PropertyinfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertyinfo-cmp ',
            templateUrl: 'propertyinfo.component.html',
            styleUrls: ['propertyinfo.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService])
    ], PropertyinfoComponent);
    return PropertyinfoComponent;
}());
exports.PropertyinfoComponent = PropertyinfoComponent;
//# sourceMappingURL=propertyinfo.component.js.map