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
var homeservice_1 = require('../../../providers/homeservice');
var properties_service_1 = require('../../../providers/properties/properties.service');
var SetratesComponent = (function () {
    function SetratesComponent(mainService, propertyService, builder) {
        this.mainService = mainService;
        this.propertyService = propertyService;
        this.builder = builder;
        console.log('Form init');
    }
    SetratesComponent.prototype.ngOnInit = function () {
    };
    SetratesComponent.prototype.saveInfo = function () {
        console.log('Save Info');
    };
    SetratesComponent.prototype.continueInfo = function () {
        console.log('Continue Info form');
    };
    SetratesComponent.prototype.discardInfo = function () {
        console.log('Discard Info form');
    };
    SetratesComponent.prototype.onSubmit = function () {
        console.log('On submit');
    };
    SetratesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' setrates-cmp ',
            templateUrl: 'setrates.component.html',
            styleUrls: ['setrates.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, properties_service_1.PropertiesService, forms_1.FormBuilder])
    ], SetratesComponent);
    return SetratesComponent;
}());
exports.SetratesComponent = SetratesComponent;
//# sourceMappingURL=setrates.component.js.map