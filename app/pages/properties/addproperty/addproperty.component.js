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
var _ = require("lodash");
var homeservice_1 = require('../../../providers/homeservice');
var properties_service_1 = require('../../../providers/properties/properties.service');
var AddpropertyComponent = (function () {
    function AddpropertyComponent(mainService, propertyService, builder) {
        this.mainService = mainService;
        this.propertyService = propertyService;
        this.builder = builder;
        //@ViewChild('propertyInfo') propertyInfo;
        //@ViewChild('propertyMargeting') propertyMargeting;
        //@ViewChild('propertyImage') propertyImage;
        //@ViewChild('pointsOfInterest') pointsOfInterest;
        //@ViewChild('localActivities') localActivities;
        //@ViewChild('features') features;
        //@ViewChild('services') services;
        //@ViewChild('trip') trip;
        // private villadescription;
        // private reading:boolean = false;
        // private datatableInited:boolean = false;
        // private properties = [];
        // private contacts;
        // private bedrooms;
        // private bathrooms;
        this.isActive = true;
        this.isLoad = true;
        this.propertyForm = new forms_1.FormGroup({
            Active: new forms_1.FormControl(true),
            OwnerName: new forms_1.FormControl('OwnerName'),
            InternalName: new forms_1.FormControl('InternalName'),
            Name: new forms_1.FormControl('Name'),
            Address: new forms_1.FormControl('Address'),
            RegionId: new forms_1.FormControl(1),
            RegionName: new forms_1.FormControl('Ibiza'),
            Headline: new forms_1.FormControl('Headline'),
            Summary: new forms_1.FormControl('Summary'),
            Description: new forms_1.FormControl('Description'),
            OtherInfo: new forms_1.FormControl('OtherInfo'),
            CollaboratorInitials: new forms_1.FormControl(''),
            BoxUrl: new forms_1.FormControl('BoxUrl'),
            AgencyPackUrl: new forms_1.FormControl('AgencyPackUrl'),
            Bathrooms: new forms_1.FormControl(1),
            Bedrooms: new forms_1.FormControl(2),
            Sleeps: new forms_1.FormControl(6),
            Capacity: new forms_1.FormControl(3),
            LivingAreaSize: new forms_1.FormControl(4),
            DiningCapacity: new forms_1.FormControl(5),
            KitchenInfo: new forms_1.FormControl('KitchenInfo'),
            ChildrenAllowed: new forms_1.FormControl(2),
            SmokingAllowed: new forms_1.FormControl(false),
            WheelchairAccessible: new forms_1.FormControl(true),
            PetsAllowed: new forms_1.FormControl(false),
            EventsAllowed: new forms_1.FormControl(true),
            Contacts: new forms_1.FormArray([]),
            Rooms: new forms_1.FormArray([]),
            Images: new forms_1.FormArray([]),
            PointsOfInterest: new forms_1.FormArray([]),
            MetaData: new forms_1.FormArray([]),
            MetaDataTmp: new forms_1.FormGroup({}),
            OtherHousekeepingInfo: new forms_1.FormControl('OtherHousekeepingInfo'),
            Housekeeping: new forms_1.FormControl('Housekeeping'),
            LiftAvailable: new forms_1.FormControl(true),
            Benefits: new forms_1.FormControl('Benefits'),
        });
        /*
                this.propertyForm = this.builder.group({
                    Contacts: this.builder.array([
                        this.initAddress(),
                    ])
                });*/
        console.log('Form init', this.propertyForm);
    }
    /*
        initAddress() {
            // initialize our address
            return this.builder.group({
                street: ['', Validators.required],
                postcode: ['']
            });
        }
    */
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    AddpropertyComponent.prototype.ngOnInit = function () {
        // this.contacts = [];
        // this.bedrooms = [];
        // this.bathrooms = [];
        // this.villadescription = this.propertyInfo.villadescription;
    };
    AddpropertyComponent.prototype.saveInfo = function () {
        var _this = this;
        console.log('Save FORM', this.propertyForm.value.MetaDataTmp);
        var newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, function (el) {
            console.log('elem', el);
            return newArr = _.concat(newArr, el);
        });
        this.propertyForm.value.MetaData = newArr;
        console.log('this.propertyForm.value.MetaDataTmp', this.propertyForm.value);
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
            Images: this.propertyImage.images,
            MetaData: metaData,
            Owner: this.propertyInfo.owner,
            UserId: this.propertyInfo.owner.Id,
            PointsOfInterest: poi,
            Region: this.propertyInfo.region,
        }*/
        this.propertyService.addProperty(this.propertyForm.value).subscribe(function (d) {
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
        console.log(this.propertyForm.value);
    };
    AddpropertyComponent.prototype.continueInfo = function () {
    };
    AddpropertyComponent.prototype.discardInfo = function () {
    };
    AddpropertyComponent.prototype.activeChange = function (e) {
        this.isActive = e.target.checked;
    };
    AddpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'addproperty.component.html',
            styleUrls: ['addproperty.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, properties_service_1.PropertiesService, forms_1.FormBuilder])
    ], AddpropertyComponent);
    return AddpropertyComponent;
}());
exports.AddpropertyComponent = AddpropertyComponent;
//# sourceMappingURL=addproperty.component.js.map