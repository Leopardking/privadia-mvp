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
var login_service_1 = require("../../../providers/login/login.service");
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
var EditpropertyComponent = (function () {
    function EditpropertyComponent(propertiesService, loginService, lookupsService, route, builder) {
        this.propertiesService = propertiesService;
        this.loginService = loginService;
        this.lookupsService = lookupsService;
        this.route = route;
        this.builder = builder;
        this.errorForm = false;
        this.route.params.subscribe(function (params) {
            //propertiesService.getDataProperty(this.propertyId = params['id']);
            //lookupsService.getDataCompanies();
            //lookupsService.getDataManagers();
        });
    }
    EditpropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        setTimeout(function () {
            _this.propertyForm = _this.builder.group({
                Id: _this.propertyId,
                Active: _this.propertiesService.property.Active,
                OwnerName: _this.propertiesService.property.OwnerName,
                InternalName: _this.propertiesService.property.InternalName,
                Name: [_this.propertiesService.property.Name, forms_1.Validators.required],
                Address: _this.propertiesService.property.Address,
                RegionId: _this.propertiesService.property.RegionId,
                RegionName: _this.propertiesService.property.RegionName,
                Region: { Id: _this.propertiesService.property.RegionId, Name: _this.propertiesService.property.RegionName },
                ManagementCompanyId: _this.propertiesService.property.ManagementCompanyId,
                ManagementCompanyName: _this.propertiesService.property.ManagementCompanyName,
                ManagerUserId: _this.propertiesService.property.ManagerUserId,
                ManagerUserName: _this.propertiesService.property.ManagerUserName,
                ManagementCompany: {
                    Id: _this.propertiesService.property.ManagementCompanyId,
                    Name: _this.propertiesService.property.ManagementCompanyName,
                },
                ManagerUser: {
                    Id: _this.propertiesService.property.ManagerUserId,
                    Name: _this.propertiesService.property.ManagerUserName,
                },
                Headline: _this.propertiesService.property.Headline,
                Summary: _this.propertiesService.property.Summary,
                Description: _this.propertiesService.property.Description,
                OtherInfo: _this.propertiesService.property.OtherInfo,
                CollaboratorInitials: _this.propertiesService.property.CollaboratorInitials,
                BoxUrl: [_this.propertiesService.property.BoxUrl, forms_1.Validators.pattern('https?://.+')],
                AgencyPackUrl: [_this.propertiesService.property.AgencyPackUrl, forms_1.Validators.pattern('https?://.+')],
                MinimumStay: [_this.propertiesService.property.MinimumStay, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]*$')])],
                Bathrooms: [_this.propertiesService.property.Bathrooms, forms_1.Validators.required],
                Bedrooms: [_this.propertiesService.property.Bedrooms, forms_1.Validators.required],
                Sleeps: [_this.propertiesService.property.Sleeps, forms_1.Validators.required],
                Capacity: _this.propertiesService.property.Capacity,
                LivingAreaSize: _this.propertiesService.property.LivingAreaSize,
                DiningCapacity: _this.propertiesService.property.DiningCapacity,
                KitchenInfo: _this.propertiesService.property.KitchenInfo,
                ChildrenAllowed: _this.propertiesService.property.ChildrenAllowed,
                SmokingAllowed: _this.propertiesService.property.SmokingAllowed,
                WheelchairAccessible: _this.propertiesService.property.WheelchairAccessible,
                PetsAllowed: _this.propertiesService.property.PetsAllowed,
                EventsAllowed: _this.propertiesService.property.EventsAllowed,
                LiftAvailable: _this.propertiesService.property.LiftAvailable,
                Benefits: _this.propertiesService.property.Benefits,
                Housekeeping: _this.propertiesService.property.Housekeeping,
                OtherHousekeepingInfo: _this.propertiesService.property.OtherHousekeepingInfo,
                MetaDataTmp: {},
            });
            _this.setContacts(_this.propertiesService.property.Contacts);
            _this.setRooms(_this.propertiesService.property.Rooms);
            _this.setImages(_this.propertiesService.property.Images);
            _this.setPointsOfInterest(_this.propertiesService.property.PointsOfInterest);
            _this.setMetaData(_this.propertiesService.property.MetaData);
            _this.setMetaDataTmp();
            $('.property-tabs a:first').tab('show');
        }, 1000);
    };
    EditpropertyComponent.prototype.setContacts = function (contacts) {
        var _this = this;
        var contactFGs = contacts.map(function (contact) { return _this.builder.group({
            JobTitle: contact.JobTitle,
            FirstName: contact.FirstName,
            LastName: contact.LastName,
            EmailAddress: contact.EmailAddress,
            Telephone: contact.Telephone,
        }); });
        var contactFormArray = this.builder.array(contactFGs);
        this.propertyForm.setControl('Contacts', contactFormArray);
    };
    EditpropertyComponent.prototype.setRooms = function (rooms) {
        var _this = this;
        var roomFGs = rooms.map(function (room) { return _this.builder.group({
            Name: room.Name,
            Description: room.Description,
            PropertyRoomType: room.PropertyRoomType,
        }); });
        var roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    };
    EditpropertyComponent.prototype.setImages = function (images) {
        var _this = this;
        var imageFGs = images.map(function (image) { return _this.builder.group({
            Id: image.Id,
            FileName: image.FileName,
            ImageId: image.ImageId,
            OrderIdx: image.OrderIdx,
        }); });
        var imageFormArray = this.builder.array(imageFGs);
        this.propertyForm.setControl('Images', imageFormArray);
    };
    EditpropertyComponent.prototype.setPointsOfInterest = function (points) {
        var _this = this;
        var pointFGs = points.map(function (point) { return _this.builder.group({
            Id: point.Id,
            Name: point.Name,
            PointOfInterestTypeId: point.PointOfInterestTypeId,
            PointOfInterestTypeName: point.PointOfInterestTypeName,
            Available: point.Available,
            Distance: point.Distance,
        }); });
        var pointFormArray = this.builder.array(pointFGs);
        console.log('Point Form Array ', points);
        this.propertyForm.setControl('PointsOfInterest', pointFormArray);
    };
    EditpropertyComponent.prototype.setMetaData = function (metaDatas) {
        var _this = this;
        var metaDataFGs = metaDatas.map(function (metaDate) { return _this.builder.group({
            MetaDataId: metaDate.MetaDataId,
            MetaDataName: metaDate.MetaDataName,
            Available: metaDate.Available,
        }); });
        var metaDataFormArray = this.builder.array(metaDataFGs);
        this.propertyForm.setControl('MetaData', metaDataFormArray);
    };
    EditpropertyComponent.prototype.setMetaDataTmp = function () {
        var metaDataFormArray = this.builder.group({});
        this.propertyForm.setControl('MetaDataTmp', metaDataFormArray);
    };
    EditpropertyComponent.prototype.continueInfo = function () {
        console.log('Continue Info form');
    };
    EditpropertyComponent.prototype.discardInfo = function () {
        console.log('Discard Info form');
    };
    EditpropertyComponent.prototype.onSubmit = function () {
        var newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, function (el) {
            return newArr = _.concat(newArr, el);
        });
        this.propertyForm.value.MetaData = newArr;
        console.log('save ', this.propertyForm);
        if (this.propertyForm.valid) {
            this.propertiesService.addProperty(this.propertyForm.value).subscribe(function (d) {
                $.notify({
                    icon: "notifications",
                    message: "Property Updated Successfully"
                }, {
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
            }, function (e) { console.log("error:", e); });
        }
        else {
            this.errorForm = true;
        }
    };
    EditpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' editproperty-cmp ',
            templateUrl: 'editproperty.component.html',
            styleUrls: ['editproperty.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, login_service_1.LoginService, lookups_service_1.LookupsService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], EditpropertyComponent);
    return EditpropertyComponent;
}());
exports.EditpropertyComponent = EditpropertyComponent;
//# sourceMappingURL=editproperty.component.js.map