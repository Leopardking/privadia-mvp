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
var login_service_1 = require("../../../providers/login/login.service");
var helpers_1 = require("../../../helpers/helpers");
//declare const _:any;
var AddpropertyComponent = (function () {
    function AddpropertyComponent(router, loginService, propertiesService) {
        this.router = router;
        this.loginService = loginService;
        this.propertiesService = propertiesService;
        // private isActive = true;
        this.isLoad = true;
        this.errorForm = false;
        this.sending = false;
        this.role = !this.loginService.getRoles('Admin');
        this.propertyForm = new forms_1.FormGroup({
            Active: new forms_1.FormControl(true),
            InternalName: new forms_1.FormControl(),
            OwnerName: new forms_1.FormControl(),
            Name: new forms_1.FormControl(null),
            Address: new forms_1.FormControl(),
            Region: new forms_1.FormControl({
                Id: '',
                Name: '',
            }),
            ManagementCompany: new forms_1.FormControl({
                value: {
                    Id: null,
                    Name: null,
                }
            }),
            ManagerUser: new forms_1.FormControl({
                Id: null,
                Name: null,
            }),
            /*
            OwnerUser: new FormControl({
                Id: null,
                Name: null,
            }, Validators.required),
            */
            Headline: new forms_1.FormControl(),
            Summary: new forms_1.FormControl(),
            Description: new forms_1.FormControl(),
            OtherInfo: new forms_1.FormControl(),
            CollaboratorInitials: new forms_1.FormControl(),
            BoxUrl: new forms_1.FormControl(null, forms_1.Validators.pattern('https?://.+')),
            AgencyPackUrl: new forms_1.FormControl(null, forms_1.Validators.pattern('https?://.+')),
            Bathrooms: new forms_1.FormControl(null),
            Bedrooms: new forms_1.FormControl(null),
            Sleeps: new forms_1.FormControl(null),
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
            MinimumStay: new forms_1.FormControl(0, forms_1.Validators.pattern('^[0-9]*$')),
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
        propertiesService.readDataCompanies();
    }
    AddpropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        if (this.role) {
            setTimeout(function () {
                _this.propertyForm.controls['ManagementCompany'].setValue(_this.propertiesService.companies[0]);
                _this.propertiesService.readDataManagers(_this.propertiesService.companies[0].Id);
            }, 500);
        }
        this.propertyForm.controls['ManagementCompany'].valueChanges.subscribe(function (company) {
            _this.propertiesService.readDataManagers(company.Id);
            var selectQuery = $(".custompicker");
            setTimeout(function () {
                selectQuery.selectpicker('render');
                selectQuery.selectpicker('refresh');
            }, 1000);
        });
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
    AddpropertyComponent.prototype.continueInfo = function () {
        console.log('Continue Info form');
    };
    AddpropertyComponent.prototype.discardInfo = function () {
        console.log('Discard Info form');
    };
    AddpropertyComponent.prototype.onSubmit = function (form) {
        var _this = this;
        console.log('Form ', this.propertyForm);
        this.sending = true;
        var newArr = [];
        _.mapValues(form.MetaDataTmp, function (el) {
            return newArr = _.concat(newArr, el);
        });
        form.MetaData = newArr;
        this.propertiesService.addProperty(form).subscribe(function (d) {
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
        }, function (e) {
            console.log("error:", e);
            _this.errorForm = true;
            _this.sending = false;
            helpers_1.handlerErrorFieds(e, _this.propertyForm);
            helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
        });
    };
    AddpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' addproperty-cmp ',
            templateUrl: 'addproperty.component.html',
            styleUrls: ['addproperty.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, properties_service_1.PropertiesService])
    ], AddpropertyComponent);
    return AddpropertyComponent;
}());
exports.AddpropertyComponent = AddpropertyComponent;
//# sourceMappingURL=addproperty.component.js.map