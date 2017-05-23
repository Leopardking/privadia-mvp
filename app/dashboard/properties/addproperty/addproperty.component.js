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
var properties_service_1 = require('../../../../app/services/properties/properties.service');
var AddpropertyComponent = (function () {
    function AddpropertyComponent(mainService, propertyService) {
        this.mainService = mainService;
        this.propertyService = propertyService;
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
        var metaData = [];
        for (var i = 1; i < 125; i++) {
            metaData.push({
                Available: this.metafilters[i] == 0 ? 0 : 1,
                MetaDataId: i
            });
        }
        var contacts = this.propertyInfo.contacts.map(function (item, index) {
            return {
                EmailAddress: item.email,
                FirstName: item.firstName,
                JobTitle: item.jobTitle,
                LastName: item.lastName,
                Telephone: parseInt(item.telephone)
            };
        });
        var bathrooms = this.propertyInfo.bathrooms.map(function (item, index) {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 2
            };
        });
        var bedrooms = this.propertyInfo.bedrooms.map(function (item, index) {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 1
            };
        });
        var poi = this.metafilterHeading.PoITypes.map(function (item, index) {
            return {
                Available: item.checked ? 1 : 0,
                Distance: item.distance,
                Name: item.typeName,
                PointOfInterestTypeId: item.Id
            };
        });
        var data = {
            Active: true,
            Address: this.propertyInfo.address,
            AgencyPackUrl: this.propertyMargeting.agencyPackUrl,
            Bathrooms: parseInt(this.propertyInfo.bathroomCount),
            Bedrooms: parseInt(this.propertyInfo.bedroomCount),
            Benefits: this.metafilterHeading.uniqueBenefits,
            BoxUrl: this.propertyInfo.boxUrl,
            Capacity: parseInt(this.propertyInfo.maximumCapacity),
            CollaboratorInitials: this.propertyInfo.collaboratorInitial,
            Contacts: contacts,
            Description: this.propertyInfo.description,
            DiningCapacity: parseInt(this.propertyInfo.diningCapacity),
            EventsAllowed: this.propertyInfo.eventsAllowed,
            Headline: this.propertyInfo.headline,
            Housekeeping: this.metafilterHeading.housekeeperState,
            Images: [],
            InternalName: this.propertyInfo.listingName,
            KitchenInfo: this.propertyInfo.kitchenInfo,
            LiftAvailable: false,
            LivingAreaSize: parseInt(this.propertyInfo.livingSquare),
            MetaData: metaData,
            Name: this.propertyInfo.officialName,
            OtherHousekeepingInfo: this.metafilterHeading.housekeepOtherInfo,
            OtherInfo: this.propertyInfo.otherInfo,
            Owner: this.propertyInfo.owner,
            UserId: this.propertyInfo.owner.Id,
            OwnerName: this.propertyInfo.ownerName,
            PetsAllowed: this.propertyInfo.petsAllowed,
            PointsOfInterest: poi,
            Region: this.propertyInfo.region,
            RegionId: this.propertyInfo.region.Id,
            RegionName: this.propertyInfo.regionName,
            Rooms: bedrooms.concat(bathrooms),
            Sleeps: parseInt(this.propertyInfo.sleepCount),
            SmokingAllowed: this.propertyInfo.smokeAllowed,
            Summary: this.propertyInfo.summary,
            WheelchairAccessible: this.propertyInfo.wheelchairAllowed,
            childrenAllowed: parseInt(this.propertyInfo.allowChildren),
            propertyName: this.propertyInfo.officialName
        };
        this.propertyService.addProperty(data).subscribe(function (d) { console.log(d); }, function (e) { console.log("error:", e); });
    };
    AddpropertyComponent.prototype.continueInfo = function () {
    };
    AddpropertyComponent.prototype.discardInfo = function () {
    };
    __decorate([
        core_1.ViewChild('propertyInfo'), 
        __metadata('design:type', Object)
    ], AddpropertyComponent.prototype, "propertyInfo", void 0);
    __decorate([
        core_1.ViewChild('metafilterHeading'), 
        __metadata('design:type', Object)
    ], AddpropertyComponent.prototype, "metafilterHeading", void 0);
    __decorate([
        core_1.ViewChild('propertyMargeting'), 
        __metadata('design:type', Object)
    ], AddpropertyComponent.prototype, "propertyMargeting", void 0);
    AddpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'addproperty.component.html',
            styleUrls: ['addproperty.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, properties_service_1.PropertiesService])
    ], AddpropertyComponent);
    return AddpropertyComponent;
}());
exports.AddpropertyComponent = AddpropertyComponent;
//# sourceMappingURL=addproperty.component.js.map