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
var properties_service_1 = require('../../../providers/properties/properties.service');
var _ = require('lodash');
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
//declare const _:any;
var AddpropertyComponent = (function () {
    function AddpropertyComponent(router, propertiesService, lookupsService, builder) {
        this.router = router;
        this.propertiesService = propertiesService;
        this.lookupsService = lookupsService;
        this.builder = builder;
        // private isActive = true;
        this.isLoad = true;
        this.errorForm = false;
        this.sending = false;
        this.propertyForm = new forms_1.FormGroup({
            Active: new forms_1.FormControl(true),
            OwnerName: new forms_1.FormControl(),
            InternalName: new forms_1.FormControl(),
            Name: new forms_1.FormControl(null, forms_1.Validators.required),
            Address: new forms_1.FormControl(),
            RegionId: new forms_1.FormControl(),
            RegionName: new forms_1.FormControl(),
            Region: new forms_1.FormControl({
                Id: 1,
                Name: 'Ibiza',
            }),
            ManagementCompanyId: new forms_1.FormControl(),
            ManagementCompanyName: new forms_1.FormControl(),
            ManagementCompany: new forms_1.FormControl({
                Id: null,
                Name: null,
            }),
            ManagerUserId: new forms_1.FormControl(),
            ManagerUserName: new forms_1.FormControl(),
            ManagerUser: new forms_1.FormControl({
                Id: null,
                Name: null,
            }),
            Headline: new forms_1.FormControl(),
            Summary: new forms_1.FormControl(),
            Description: new forms_1.FormControl(),
            OtherInfo: new forms_1.FormControl(),
            CollaboratorInitials: new forms_1.FormControl(),
            BoxUrl: new forms_1.FormControl(null, forms_1.Validators.pattern('https?://.+')),
            AgencyPackUrl: new forms_1.FormControl(null, forms_1.Validators.pattern('https?://.+')),
            Bathrooms: new forms_1.FormControl(null, forms_1.Validators.required),
            Bedrooms: new forms_1.FormControl(null, forms_1.Validators.required),
            Sleeps: new forms_1.FormControl(null, forms_1.Validators.required),
            Capacity: new forms_1.FormControl(null),
            LivingAreaSize: new forms_1.FormControl(null),
            DiningCapacity: new forms_1.FormControl(null),
            KitchenInfo: new forms_1.FormControl(),
            ChildrenAllowed: new forms_1.FormControl(0),
            SmokingAllowed: new forms_1.FormControl(false),
            WheelchairAccessible: new forms_1.FormControl(false),
            PetsAllowed: new forms_1.FormControl(false),
            EventsAllowed: new forms_1.FormControl(false),
            Contacts: new forms_1.FormArray([]),
            Rooms: new forms_1.FormArray([]),
            Images: new forms_1.FormArray([]),
            MinimumStay: new forms_1.FormControl(0, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]*$')])),
            PointsOfInterest: new forms_1.FormArray([]),
            MetaData: new forms_1.FormArray([]),
            MetaDataTmp: new forms_1.FormGroup({}),
            OtherHousekeepingInfo: new forms_1.FormControl(),
            Housekeeping: new forms_1.FormControl(0),
            LiftAvailable: new forms_1.FormControl(false),
            Benefits: new forms_1.FormControl(),
        });
        propertiesService.readDataMetadata();
        propertiesService.readDataOwners();
        propertiesService.readDataRegions();
        propertiesService.getDataCompanies();
        propertiesService.getDataManagers();
        console.log('Form init', this.propertiesService);
    }
    AddpropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        setTimeout(function () {
            $('.property-tabs a:first').tab('show');
            $('button[data-toggle="tab"]').click(function (e) {
                if (_this.propertyForm.valid) {
                    var target = $(e.target).attr("href");
                    $('a[href="' + target + '"]').tab('show');
                    e.preventDefault();
                }
                else {
                    _this.errorForm = true;
                    e.stopPropagation();
                }
            });
        });
    };
    AddpropertyComponent.prototype.setRegion = function (region) {
        var regionFGs = this.builder.group({
            Id: [region.RegionId],
            Name: [region.RegionName]
        });
        this.propertyForm.setControl('Region', regionFGs);
    };
    AddpropertyComponent.prototype.continueInfo = function () {
        console.log('Continue Info form');
    };
    AddpropertyComponent.prototype.discardInfo = function () {
        console.log('Discard Info form');
    };
    AddpropertyComponent.prototype.onSubmit = function () {
        var _this = this;
        var newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, function (el) {
            return newArr = _.concat(newArr, el);
        });
        this.propertyForm.value.MetaData = newArr;
        if (this.propertyForm.valid) {
            this.sending = true;
            this.propertiesService.addProperty(this.propertyForm.value).subscribe(function (d) {
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
                _this.router.navigate(['properties']);
                _this.sending = false;
                //this.dashboardService.readData();
            }, function (e) { console.log("error:", e); });
        }
        else {
            this.errorForm = true;
        }
    };
    AddpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'addproperty.component.html',
            styleUrls: ['addproperty.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, properties_service_1.PropertiesService, lookups_service_1.LookupsService, forms_1.FormBuilder])
    ], AddpropertyComponent);
    return AddpropertyComponent;
}());
exports.AddpropertyComponent = AddpropertyComponent;
//# sourceMappingURL=addproperty.component.js.map