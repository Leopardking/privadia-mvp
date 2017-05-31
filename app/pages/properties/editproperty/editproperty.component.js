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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var homeservice_1 = require('../../../providers/homeservice');
var properties_service_1 = require('../../../providers/properties/properties.service');
var EditpropertyComponent = (function () {
    function EditpropertyComponent(mainService, propertyService, route, builder) {
        this.mainService = mainService;
        this.propertyService = propertyService;
        this.route = route;
        this.builder = builder;
        this.reading = false;
        this.datatableInited = false;
        this.property = [];
        this.isActive = true;
        //propertyForm: any;
        this.isLoad = false;
        this.propertyForm = new forms_1.FormGroup({
            OwnerName: new forms_1.FormControl(),
            InternalName: new forms_1.FormControl(),
            Name: new forms_1.FormControl(),
            Address: new forms_1.FormControl(),
            RegionId: new forms_1.FormControl(),
            RegionName: new forms_1.FormControl(),
            Headline: new forms_1.FormControl(),
            Summary: new forms_1.FormControl(),
            Description: new forms_1.FormControl(),
            OtherInfo: new forms_1.FormControl(),
            CollaboratorInitials: new forms_1.FormControl(),
            BoxUrl: new forms_1.FormControl(),
            Bathrooms: new forms_1.FormControl(),
            Bedrooms: new forms_1.FormControl(),
            Sleeps: new forms_1.FormControl(),
            Capacity: new forms_1.FormControl(),
            LivingAreaSize: new forms_1.FormControl(),
            DiningCapacity: new forms_1.FormControl(),
            KitchenInfo: new forms_1.FormControl(),
            ChildrenAllowed: new forms_1.FormControl(),
            SmokingAllowed: new forms_1.FormControl(),
            WheelchairAccessible: new forms_1.FormControl(),
            PetsAllowed: new forms_1.FormControl(),
            EventsAllowed: new forms_1.FormControl(),
        });
        console.log('this.property mainService', this.mainService.metadata);
        /*
                this.propertyForm = builder.group({
                    'InternalName': '1',
                    'OwnerName': '1',
                    'Address': '1 33',
                    'Name': '1     1',
                });
        */
        //console.log('Form ', this.propertyForm.controls)
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net
    EditpropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('this.property mainService', this.mainService.metadata);
        this.sub = this.route.params.subscribe(function (params) {
            _this.propertyService.getPropertyById(params['id']).subscribe(function (d) {
                _this.property = d;
                _this.propertyForm = _this.builder.group({
                    OwnerName: d.OwnerName,
                    InternalName: d.InternalName,
                    Name: d.Name,
                    Address: d.Address,
                    RegionId: d.RegionId,
                    RegionName: d.RegionName,
                    Headline: d.Headline,
                    Summary: d.Summary,
                    Description: d.Description,
                    OtherInfo: d.OtherInfo,
                    CollaboratorInitials: d.CollaboratorInitials,
                    BoxUrl: d.BoxUrl,
                    Bathrooms: d.Bathrooms,
                    Bedrooms: d.Bedrooms,
                    Sleeps: d.Sleeps,
                    Capacity: d.Capacity,
                    LivingAreaSize: d.LivingAreaSize,
                    DiningCapacity: d.DiningCapacity,
                    KitchenInfo: d.KitchenInfo,
                    ChildrenAllowed: d.ChildrenAllowed,
                    SmokingAllowed: d.SmokingAllowed,
                    WheelchairAccessible: d.WheelchairAccessible,
                    PetsAllowed: d.PetsAllowed,
                    EventsAllowed: d.EventsAllowed,
                });
                _this.isLoad = true;
                console.log('This properties', _this.property);
                console.log('This properties Form', _this.propertyForm);
            }, function (e) { console.log("error:", e); });
            console.log('This id', params['id']);
            // this.id = +params['id']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
        });
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        //this.villadescription = this.propertyInfo.villadescription;
    };
    EditpropertyComponent.prototype.saveInfo = function () {
        /*
        $(".title-error").removeClass("title-error");
        $(".metafilter-names li a.has-error").removeClass("has-error");

        let validateErrors = $(".tab-content .has-error");
        if ( validateErrors.length ) {
            $.notify({
                icon: "notifications",
                message: $(".tab-content .has-error").length + " Validation Errors Found"

            },{
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

            for (let i = 0; i < validateErrors.length; i++) {
                let ele = validateErrors[i];

                while (!ele.className.includes('card-content')) {
                    if (ele.className.includes('panel-group')) {
                        $(ele).addClass('title-error');
                    }
                    ele = ele.parentElement;
                }

                let eleTabName = document.getElementsByClassName(ele.id + "-tab-name");
                $(eleTabName).addClass("has-error");
            }

            return;
        }

        $('.has-error').removeClass("has-error");

        let metaData = [];
        for (let i = 1; i < 125; i++) {
            let available = this.pointsOfInterest.metafilters[i]
                        ||  this.features.metafilters[i]
                        ||  this.services.metafilters[i]
                        ||  this.villadescription.metafilters[i]
                        ||  this.localActivities.metafilters[i]
                        ||  this.trip.metafilters[i] ;
            metaData.push({
                Available: available ? 1 : 0,
                MetaDataId: i
            });
        }

        let contacts = this.propertyInfo.contacts.map( (item, index) => {
            return {
                EmailAddress: item.email,
                FirstName: item.firstName,
                JobTitle: item.jobTitle,
                LastName: item.lastName,
                Telephone: parseInt(item.telephone)
            };
        });

        let bathrooms = this.propertyInfo.bathrooms.map( (item, index) => {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 2
            }
        });

        let bedrooms = this.propertyInfo.bedrooms.map( (item, index) => {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 1
            }
        });
        
        let poi = this.pointsOfInterest.metafilterHeading.PoITypes.map( (item, index) => {
            return {
                Available: item.checked ? 1 : 0,
                Distance: item.distance,
                Name: item.typeName,
                PointOfInterestTypeId: item.Id
            };
        })
        let data = {
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
        }
        this.propertyService.addProperty(data).subscribe(
            d => {
                $.notify({
                    icon: "notifications",
                    message: "Property Added Successfully"

                },{
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                this.mainService.readData();
            },
            e => { console.log("error:", e); }
        );
        */
        //console.log(data);
        console.log('Save form ', this.propertyForm);
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
            selector: ' editproperty-cmp ',
            templateUrl: 'editproperty.component.html',
            styleUrls: ['editproperty.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, properties_service_1.PropertiesService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], EditpropertyComponent);
    return EditpropertyComponent;
}());
exports.EditpropertyComponent = EditpropertyComponent;
//# sourceMappingURL=editproperty.component.js.map