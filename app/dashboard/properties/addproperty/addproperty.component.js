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
var homeservice_1 = require('../../../../app/services/homeservice');
var AddpropertyComponent = (function () {
    function AddpropertyComponent(mainService) {
        this.mainService = mainService;
        this.reading = false;
        this.datatableInited = false;
        this.properties = [];
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    AddpropertyComponent.prototype.ngOnInit = function () {
        this.metafilters = [];
        for (var i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
    };
    AddpropertyComponent.prototype.subfilterChange = function (e) {
        var optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');
        this.metafilters[optionId] = !this.metafilters[optionId];
    };
    AddpropertyComponent.prototype.finished = function () {
        //$(".selectpicker").selectpicker();
        return "";
    };
    AddpropertyComponent.prototype.saveInfo = function () {
        var data = {
            Active: true,
            Address: this.propertyInfo.address,
            AgencyPackUrl: null,
            Bathrooms: this.propertyInfo.bathrooms,
            Bedrooms: this.propertyInfo.bedrooms,
            Benefits: null,
            BoxUrl: this.propertyInfo.boxUrl,
            Capacity: this.propertyInfo.maximumCapacity,
            ChildrenAllowed: this.propertyInfo.allowChildren,
            CollaboratorInitials: this.propertyInfo.collaboratorInitial,
            Contacts: this.propertyInfo.contacts,
            Description: this.propertyInfo.description,
            DiningCapacity: this.propertyInfo.diningCapacity,
            EventsAllowed: this.propertyInfo.eventsAllowed,
            Headline: this.propertyInfo.headline,
            Housekeeping: 0,
            Id: 0,
            Images: [],
            InternalName: this.propertyInfo.listingName,
            KitchenInfo: this.propertyInfo.kitchenInfo,
            LAState: [],
            LiftAvailable: false,
            LivingAreaSize: this.propertyInfo.livingSquare,
            ManagedBySupplier: false,
            MetaData: [],
            MinimumStay: 0,
            Name: this.propertyInfo.officialName,
            OtherHousekeepingInfo: null,
            OtherInfo: this.propertyInfo.otherInfo,
            OtherServicesState: null,
            Owner: {},
            OwnerName: this.propertyInfo.ownerName,
            PetsAllowed: this.propertyInfo.petsAllowed,
            PointsOfInterest: [],
            Region: {},
            RegionId: 1,
            RegionName: this.propertyInfo.regionName,
            Rooms: [],
            Sleeps: this.propertyInfo.sleepCount,
            SmokingAllowed: this.propertyInfo.smokeAllowed,
            Summary: this.propertyInfo.summary,
            TripState: [],
            UserId: '',
            ViaSupplier: false,
            WheelchairAccessible: this.propertyInfo.wheelchairAllowed,
            bathroomsInfo: this.propertyInfo.bathrooms,
            bedroomsInfo: this.propertyInfo.bedrooms,
            childrenAllowed: this.propertyInfo.allowChildren,
            contactsInfo: this.propertyInfo.contacts,
            featureState: [],
            localServicesState: [],
            propertyId: 14485,
            propertyName: this.propertyInfo.officialName,
            villaDescriptionState: []
        };
    };
    AddpropertyComponent.prototype.continueInfo = function () {
    };
    AddpropertyComponent.prototype.discardInfo = function () {
    };
    __decorate([
        core_1.ViewChild('propertyInfo'), 
        __metadata('design:type', Object)
    ], AddpropertyComponent.prototype, "propertyInfo", void 0);
    AddpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'addproperty.component.html',
            styleUrls: ['addproperty.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService])
    ], AddpropertyComponent);
    return AddpropertyComponent;
}());
exports.AddpropertyComponent = AddpropertyComponent;
//# sourceMappingURL=addproperty.component.js.map