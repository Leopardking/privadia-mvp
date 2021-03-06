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
var helpers_1 = require("../../../helpers/helpers");
var EditpropertyComponent = (function () {
    function EditpropertyComponent(propertiesService, lookupsService, loginService, route, router, builder) {
        var _this = this;
        this.propertiesService = propertiesService;
        this.lookupsService = lookupsService;
        this.loginService = loginService;
        this.route = route;
        this.router = router;
        this.builder = builder;
        this.urlPattern = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?', '');
        this.errorForm = false;
        this.route.params.subscribe(function (params) {
            propertiesService.readDataProperty(_this.propertyId = params['id']);
            propertiesService.readDataMetadata();
            propertiesService.readDataOwners();
            propertiesService.readDataRegions();
            propertiesService.readDataCompanies();
        });
    }
    EditpropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        this.permission = !this.loginService.getPermission('Properties/Put');
        setTimeout(function () {
            _this.propertyForm = _this.builder.group({
                Id: _this.propertyId,
                Active: { value: _this.propertiesService.property.Active || null, disabled: _this.permission },
                // OwnerUser: { value: this.propertiesService.property.OwnerUser, disabled: this.permission },
                OwnerUser: { value: {
                        Id: _this.propertiesService.property.OwnerUser && _this.propertiesService.property.OwnerUser.Id,
                        Name: _this.propertiesService.property.OwnerUser && _this.propertiesService.property.OwnerUser.Name,
                    },
                    disabled: _this.permission
                },
                InternalName: { value: _this.propertiesService.property.InternalName, disabled: _this.permission },
                Name: [{ value: _this.propertiesService.property.Name, disabled: _this.permission }],
                AddressLine1: { value: _this.propertiesService.property.AddressLine1, disabled: _this.permission },
                AddressLine2: { value: _this.propertiesService.property.AddressLine2, disabled: _this.permission },
                AddressPostalCode: { value: _this.propertiesService.property.AddressPostalCode, disabled: _this.permission },
                AddressCountry: { value: _this.propertiesService.property.AddressCountry, disabled: _this.permission },
                Longitude: [
                    {
                        value: _this.propertiesService.property.Longitude,
                        disabled: _this.permission
                    },
                    forms_1.Validators.pattern(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
                ],
                Latitude: [
                    {
                        value: _this.propertiesService.property.Latitude,
                        disabled: _this.permission
                    },
                    forms_1.Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/)
                ],
                Region: { value: { Id: _this.propertiesService.property.Region.Id, Name: _this.propertiesService.property.Region.Name }, disabled: _this.permission },
                ManagementCompany: { value: {
                        Id: _this.propertiesService.property.ManagementCompany.Id,
                        Name: _this.propertiesService.property.ManagementCompany.Name,
                    },
                    disabled: _this.permission
                },
                ManagerUser: { value: {
                        Id: _this.propertiesService.property.ManagerUser.Id,
                        Name: _this.propertiesService.property.ManagerUser.Name,
                    },
                    disabled: _this.permission
                },
                Headline: { value: _this.propertiesService.property.Headline, disabled: _this.permission },
                Summary: { value: _this.propertiesService.property.Summary, disabled: _this.permission },
                Description: { value: _this.propertiesService.property.Description, disabled: _this.permission },
                OtherInfo: { value: _this.propertiesService.property.OtherInfo, disabled: _this.permission },
                // CollaboratorInitials: { value: this.propertiesService.property.CollaboratorInitials, disabled: this.permission },
                PropertyUrl: [{ value: _this.propertiesService.property.PropertyUrl, disabled: _this.permission }, forms_1.Validators.pattern(_this.urlPattern)],
                PropertyAssetsUrl: [{ value: _this.propertiesService.property.PropertyAssetsUrl, disabled: _this.permission }, forms_1.Validators.pattern(_this.urlPattern)],
                MinimumStay: [{ value: _this.propertiesService.property.MinimumStay, disabled: _this.permission }, forms_1.Validators.pattern('^[0-9]*$')],
                Bathrooms: [{ value: _this.propertiesService.property.Bathrooms, disabled: _this.permission }],
                Bedrooms: [{ value: _this.propertiesService.property.Bedrooms, disabled: _this.permission }],
                Sleeps: [{ value: _this.propertiesService.property.Sleeps, disabled: _this.permission }],
                Capacity: { value: _this.propertiesService.property.Capacity, disabled: _this.permission },
                LivingAreaSize: { value: _this.propertiesService.property.LivingAreaSize, disabled: _this.permission },
                DiningCapacity: { value: _this.propertiesService.property.DiningCapacity, disabled: _this.permission },
                KitchenInfo: { value: _this.propertiesService.property.KitchenInfo, disabled: _this.permission },
                ChildrenAllowed: { value: _this.propertiesService.property.ChildrenAllowed, disabled: _this.permission },
                SmokingAllowed: { value: _this.propertiesService.property.SmokingAllowed, disabled: _this.permission },
                WheelchairAccessible: { value: _this.propertiesService.property.WheelchairAccessible, disabled: _this.permission },
                PetsAllowed: { value: _this.propertiesService.property.PetsAllowed, disabled: _this.permission },
                // PetsConsidered: {},
                EventsAllowed: { value: _this.propertiesService.property.EventsAllowed, disabled: _this.permission },
                // LiftAvailable: { value: this.propertiesService.property.LiftAvailable, disabled: this.permission },
                Benefits: { value: _this.propertiesService.property.Benefits, disabled: _this.permission },
                Housekeeping: { value: _this.propertiesService.property.Housekeeping, disabled: _this.permission },
                OtherHousekeepingInfo: { value: _this.propertiesService.property.OtherHousekeepingInfo, disabled: _this.permission },
                MetaDataTmp: {},
                PropertyType: {
                    value: {
                        Id: _this.propertiesService.property.PropertyType && _this.propertiesService.property.PropertyType.Id || null,
                        Name: _this.propertiesService.property.PropertyType && _this.propertiesService.property.PropertyType.Name || null,
                    },
                    disabled: _this.permission
                },
            });
            _this.setContacts(_this.propertiesService.property.Contacts);
            _this.setRooms(_this.propertiesService.property.Rooms);
            _this.setImages(_this.propertiesService.property.Images);
            _this.setPointsOfInterest(_this.propertiesService.property.PointsOfInterest);
            _this.setMetaData(_this.propertiesService.property.MetaData);
            _this.setMetaDataTmp();
            _this.propertiesService.readDataManagers(_this.propertiesService.property.ManagementCompany.Id);
            $('.property-tabs a:first').tab('show');
            _this.propertyForm.controls['ManagementCompany'].valueChanges.subscribe(function (company) {
                _this.propertyForm.controls['ManagerUser'].reset({
                    Id: null,
                    Name: null,
                });
                _this.propertiesService.readDataManagers(company.Id);
                var selectQuery = $(".custompicker");
                setTimeout(function () {
                    selectQuery.selectpicker('destroy');
                    selectQuery.selectpicker('render');
                    selectQuery.selectpicker('refresh');
                }, 500);
            });
            /*
            const selectQuery = $(".custompicker");
            setTimeout(() => {
                selectQuery.selectpicker('destroy');
                selectQuery.selectpicker('render');
                selectQuery.selectpicker('refresh');
            },  1500);
             */
            console.log('this.propertiesService.property', _this.propertyForm);
            localStorage.setItem('title', _this.propertiesService.property.Name);
        }, 3000);
    };
    EditpropertyComponent.prototype.setContacts = function (contacts) {
        var _this = this;
        var contactFGs = contacts.map(function (contact) { return _this.builder.group({
            ContactType: { value: { Id: contact.ContactType.Id, Name: contact.ContactType.Name }, disabled: _this.permission },
            ContactTypeOther: { value: contact.ContactTypeOther, disabled: _this.permission },
            FirstName: { value: contact.FirstName, disabled: _this.permission },
            LastName: { value: contact.LastName, disabled: _this.permission },
            EmailAddress: { value: contact.EmailAddress, disabled: _this.permission },
            Telephone: { value: contact.Telephone, disabled: _this.permission },
        }); });
        var contactFormArray = this.builder.array(contactFGs);
        this.propertyForm.setControl('Contacts', contactFormArray);
    };
    EditpropertyComponent.prototype.setRooms = function (rooms) {
        var _this = this;
        var roomFGs = rooms.map(function (room) { return _this.builder.group({
            Name: { value: room.Name, disabled: _this.permission },
            Description: { value: room.Description, disabled: _this.permission },
            PropertyRoomType: { value: room.PropertyRoomType, disabled: _this.permission },
        }); });
        var roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    };
    EditpropertyComponent.prototype.setImages = function (images) {
        var _this = this;
        var imageFGs = images.map(function (image) { return _this.builder.group({
            Id: { value: image.Id, disabled: _this.permission },
            FileName: { value: image.FileName, disabled: _this.permission },
            ImageId: { value: image.ImageId, disabled: _this.permission },
            OrderIdx: { value: image.OrderIdx, disabled: _this.permission },
        }); });
        var imageFormArray = this.builder.array(imageFGs);
        this.propertyForm.setControl('Images', imageFormArray);
    };
    EditpropertyComponent.prototype.setPointsOfInterest = function (points) {
        var _this = this;
        var pointFGs = points.map(function (point) { return _this.builder.group({
            Id: { value: point.Id, disabled: _this.permission },
            Name: { value: point.Name, disabled: _this.permission },
            PointOfInterestTypeId: { value: point.PointOfInterestTypeId, disabled: _this.permission },
            PointOfInterestTypeName: { value: point.PointOfInterestTypeName, disabled: _this.permission },
            Available: { value: point.Available, disabled: _this.permission },
            Distance: { value: point.Distance, disabled: _this.permission },
        }); });
        var pointFormArray = this.builder.array(pointFGs);
        this.propertyForm.setControl('PointsOfInterest', pointFormArray);
    };
    EditpropertyComponent.prototype.setMetaData = function (metaDatas) {
        var _this = this;
        var metaDataFGs = metaDatas.map(function (metaDate) { return _this.builder.group({
            MetaDataId: { value: metaDate.MetaDataId, disabled: _this.permission },
            MetaDataName: { value: metaDate.MetaDataName, disabled: _this.permission },
            Available: { value: metaDate.Available, disabled: _this.permission },
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
    EditpropertyComponent.prototype.onSubmit = function (isRedirect) {
        var _this = this;
        if (isRedirect === void 0) { isRedirect = false; }
        var form = this.propertyForm.value;
        var newArr = [];
        _.mapValues(form.MetaDataTmp, function (el) {
            return newArr = _.concat(newArr, el);
        });
        form.MetaData = newArr;
        form.OwnerUser = null;
        if (!this.propertyForm.valid) {
            helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.)');
            return false;
        }
        this.propertiesService.addProperty(form).subscribe(function (d) {
            _this.errorForm = false;
            if (isRedirect) {
                _this.router.navigate(['properties']);
            }
            helpers_1.handlerSuccessMessage('Property Updated Successfully');
        }, function (e) {
            _this.errorForm = true;
            helpers_1.handlerErrorFieds(e, _this.propertyForm);
            helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
        });
    };
    EditpropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' editproperty-cmp ',
            templateUrl: 'editproperty.component.html',
            styleUrls: ['editproperty.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, lookups_service_1.LookupsService, login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router, forms_1.FormBuilder])
    ], EditpropertyComponent);
    return EditpropertyComponent;
}());
exports.EditpropertyComponent = EditpropertyComponent;
//# sourceMappingURL=editproperty.component.js.map