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
var EditpropertyComponent = (function () {
    function EditpropertyComponent(propertiesService, loginService, route, builder) {
        var _this = this;
        this.propertiesService = propertiesService;
        this.loginService = loginService;
        this.route = route;
        this.builder = builder;
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
        this.role = !this.loginService.getRoles('Admin');
        setTimeout(function () {
            _this.propertyForm = _this.builder.group({
                Id: _this.propertyId,
                Active: { value: _this.propertiesService.property.Active, disabled: _this.permission },
                OwnerName: { value: _this.propertiesService.property.OwnerName, disabled: _this.permission },
                InternalName: { value: _this.propertiesService.property.InternalName, disabled: _this.permission },
                Name: [{ value: _this.propertiesService.property.Name, disabled: _this.permission }],
                Address: { value: _this.propertiesService.property.Address, disabled: _this.permission },
                Region: { value: { Id: _this.propertiesService.property.Region.Id, Name: _this.propertiesService.property.Region.Name }, disabled: _this.permission },
                ManagementCompany: { value: {
                        Id: _this.propertiesService.property.ManagementCompany.Id,
                        Name: _this.propertiesService.property.ManagementCompany.Name,
                    },
                    disabled: _this.role || _this.permission
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
                CollaboratorInitials: { value: _this.propertiesService.property.CollaboratorInitials, disabled: _this.permission },
                BoxUrl: [{ value: _this.propertiesService.property.BoxUrl, disabled: _this.permission }, forms_1.Validators.pattern('https?://.+')],
                AgencyPackUrl: [{ value: _this.propertiesService.property.AgencyPackUrl, disabled: _this.permission }, forms_1.Validators.pattern('https?://.+')],
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
                EventsAllowed: { value: _this.propertiesService.property.EventsAllowed, disabled: _this.permission },
                LiftAvailable: { value: _this.propertiesService.property.LiftAvailable, disabled: _this.permission },
                Benefits: { value: _this.propertiesService.property.Benefits, disabled: _this.permission },
                Housekeeping: { value: _this.propertiesService.property.Housekeeping, disabled: _this.permission },
                OtherHousekeepingInfo: { value: _this.propertiesService.property.OtherHousekeepingInfo, disabled: _this.permission },
                MetaDataTmp: {},
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
            }, 1500);
            */
            localStorage.setItem('title', _this.propertiesService.property.Name);
        }, 1500);
    };
    EditpropertyComponent.prototype.setContacts = function (contacts) {
        var _this = this;
        var contactFGs = contacts.map(function (contact) { return _this.builder.group({
            JobTitle: { value: contact.JobTitle, disabled: _this.permission },
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
        console.log('Point Form Array ', points);
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
    EditpropertyComponent.prototype.onSubmit = function (form) {
        var newArr = [];
        _.mapValues(form.MetaDataTmp, function (el) {
            return newArr = _.concat(newArr, el);
        });
        form.MetaData = newArr;
        console.log('save ', this.propertyForm);
        if (this.propertyForm.valid) {
            this.propertiesService.addProperty(form).subscribe(function (d) {
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
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, login_service_1.LoginService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], EditpropertyComponent);
    return EditpropertyComponent;
}());
exports.EditpropertyComponent = EditpropertyComponent;
//# sourceMappingURL=editproperty.component.js.map