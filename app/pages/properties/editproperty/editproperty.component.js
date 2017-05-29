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
var homeservice_1 = require('../../../providers/homeservice');
var properties_service_1 = require('../../../providers/properties/properties.service');
var EditpropertyComponent = (function () {
    function EditpropertyComponent(mainService, propertyService) {
        this.mainService = mainService;
        this.propertyService = propertyService;
        this.reading = false;
        this.datatableInited = false;
        this.properties = [];
        this.isActive = true;
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    EditpropertyComponent.prototype.ngOnInit = function () {
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        this.villadescription = this.propertyInfo.villadescription;
    };
    EditpropertyComponent.prototype.saveInfo = function () {
        var _this = this;
        $(".title-error").removeClass("title-error");
        $(".metafilter-names li a.has-error").removeClass("has-error");
        var validateErrors = $(".tab-content .has-error");
        if (validateErrors.length) {
            $.notify({
                icon: "notifications",
                message: $(".tab-content .has-error").length + " Validation Errors Found"
            }, {
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            for (var i = 0; i < validateErrors.length; i++) {
                var ele = validateErrors[i];
                while (!ele.className.includes('card-content')) {
                    if (ele.className.includes('panel-group')) {
                        $(ele).addClass('title-error');
                    }
                    ele = ele.parentElement;
                }
                var eleTabName = document.getElementsByClassName(ele.id + "-tab-name");
                $(eleTabName).addClass("has-error");
            }
            return;
        }
        $('.has-error').removeClass("has-error");
        var metaData = [];
        for (var i = 1; i < 125; i++) {
            var available = this.pointsOfInterest.metafilters[i]
                || this.features.metafilters[i]
                || this.services.metafilters[i]
                || this.villadescription.metafilters[i]
                || this.localActivities.metafilters[i]
                || this.trip.metafilters[i];
            metaData.push({
                Available: available ? 1 : 0,
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
        var poi = this.pointsOfInterest.metafilterHeading.PoITypes.map(function (item, index) {
            return {
                Available: item.checked ? 1 : 0,
                Distance: item.distance,
                Name: item.typeName,
                PointOfInterestTypeId: item.Id
            };
        });
        var data = {
            Active: this.isActive,
            Address: this.propertyInfo.address,
            AgencyPackUrl: this.propertyMargeting.agencyPackUrl,
            Bathrooms: parseInt(this.propertyInfo.bathroomCount),
            Bedrooms: parseInt(this.propertyInfo.bedroomCount),
            Benefits: this.features.metafilterHeading.uniqueBenefits,
            BoxUrl: this.propertyInfo.boxUrl,
            Capacity: parseInt(this.propertyInfo.maximumCapacity),
            CollaboratorInitials: this.propertyInfo.collaboratorInitial,
            Contacts: contacts,
            Description: this.propertyInfo.description,
            DiningCapacity: parseInt(this.propertyInfo.diningCapacity),
            EventsAllowed: this.propertyInfo.eventsAllowed,
            Headline: this.propertyInfo.headline,
            Housekeeping: this.services.metafilterHeading.housekeeperState,
            Images: this.propertyImage.images,
            InternalName: this.propertyInfo.listingName,
            KitchenInfo: this.propertyInfo.kitchenInfo,
            LiftAvailable: this.features.metafilterHeading.liftAvailable,
            LivingAreaSize: parseInt(this.propertyInfo.livingSquare),
            MetaData: metaData,
            Name: this.propertyInfo.officialName,
            OtherHousekeepingInfo: this.services.metafilterHeading.housekeepOtherInfo,
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
        this.propertyService.addProperty(data).subscribe(function (d) {
            $.notify({
                icon: "notifications",
                message: "Property Added Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            _this.mainService.readData();
        }, function (e) { console.log("error:", e); });
        console.log(data);
    };
    EditpropertyComponent.prototype.continueInfo = function () {
    };
    EditpropertyComponent.prototype.discardInfo = function () {
    };
    EditpropertyComponent.prototype.activeChange = function (e) {
        this.isActive = e.target.checked;
    };
    __decorate([
        core_1.ViewChild('propertyInfo'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "propertyInfo", void 0);
    __decorate([
        core_1.ViewChild('propertyMargeting'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "propertyMargeting", void 0);
    __decorate([
        core_1.ViewChild('propertyImage'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "propertyImage", void 0);
    __decorate([
        core_1.ViewChild('pointsOfInterest'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "pointsOfInterest", void 0);
    __decorate([
        core_1.ViewChild('localActivities'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "localActivities", void 0);
    __decorate([
        core_1.ViewChild('features'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "features", void 0);
    __decorate([
        core_1.ViewChild('services'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "services", void 0);
    __decorate([
        core_1.ViewChild('trip'), 
        __metadata('design:type', Object)
    ], EditpropertyComponent.prototype, "trip", void 0);
    EditpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'editproperty.component.html',
            styleUrls: ['editproperty.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, properties_service_1.PropertiesService])
    ], EditpropertyComponent);
    return EditpropertyComponent;
}());
exports.EditpropertyComponent = EditpropertyComponent;
//# sourceMappingURL=editproperty.component.js.map