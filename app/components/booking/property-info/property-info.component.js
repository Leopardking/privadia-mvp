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
var properties_service_1 = require("../../../providers/properties/properties.service");
var PropertyInfoComponent = (function () {
    function PropertyInfoComponent(propertiesService) {
        this.propertiesService = propertiesService;
    }
    PropertyInfoComponent.prototype.ngOnInit = function () { };
    PropertyInfoComponent.prototype.autosize = function (e) {
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    };
    PropertyInfoComponent.prototype.dateFormat = function (date, format) {
        return moment(date).format(format);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PropertyInfoComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PropertyInfoComponent.prototype, "errorForm", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', Object)
    ], PropertyInfoComponent.prototype, "bookingForm", void 0);
    PropertyInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'property-info-cmp ',
            templateUrl: 'property-info.component.html',
            styleUrls: ['property-info.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService])
    ], PropertyInfoComponent);
    return PropertyInfoComponent;
}());
exports.PropertyInfoComponent = PropertyInfoComponent;
//# sourceMappingURL=property-info.component.js.map