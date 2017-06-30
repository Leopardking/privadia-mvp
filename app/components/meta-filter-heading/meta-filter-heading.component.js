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
var properties_service_1 = require('../../providers/properties/properties.service');
var forms_1 = require("@angular/forms");
var lookups_service_1 = require("../../providers/lookups/lookups.service");
var login_service_1 = require("../../providers/login/login.service");
var MetafilterheadingComponent = (function () {
    function MetafilterheadingComponent(propertiesService, lookupsService, loginService) {
        this.propertiesService = propertiesService;
        this.lookupsService = lookupsService;
        this.loginService = loginService;
    }
    MetafilterheadingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.permission = !this.loginService.getPermission('Properties/Put');
        switch (this.name) {
            case "Points of Interest":
                var control_1 = this.propertyForm.controls['PointsOfInterest'];
                this.lookupsService.getPoITypes().subscribe(function (d) {
                    if (!control_1.value.length) {
                        d.forEach(function (item, index) {
                            control_1.push(new forms_1.FormGroup({
                                Name: new forms_1.FormControl({ value: null, disabled: _this.permission }),
                                PointOfInterestTypeId: new forms_1.FormControl({ value: item.Id, disabled: _this.permission }),
                                PointOfInterestTypeName: new forms_1.FormControl({ value: item.Name, disabled: _this.permission }),
                                Available: new forms_1.FormControl({ value: false, disabled: _this.permission }),
                                Distance: new forms_1.FormControl({ value: null, disabled: _this.permission }),
                            }));
                        });
                    }
                }, function (e) {
                    console.log("Get Points of Types error: ", e);
                });
                break;
        }
    };
    MetafilterheadingComponent.prototype.autosize = function (e) {
        e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MetafilterheadingComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], MetafilterheadingComponent.prototype, "propertyForm", void 0);
    MetafilterheadingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' metafilter-heading-cmp ',
            templateUrl: 'meta-filter-heading.component.html',
            styleUrls: ['meta-filter-heading.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, lookups_service_1.LookupsService, login_service_1.LoginService])
    ], MetafilterheadingComponent);
    return MetafilterheadingComponent;
}());
exports.MetafilterheadingComponent = MetafilterheadingComponent;
//# sourceMappingURL=meta-filter-heading.component.js.map