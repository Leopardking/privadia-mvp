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
var properties_service_1 = require('../../../app/services/properties/properties.service');
var initDataTable = require('../../../assets/js/init/initDataTable.js');
var PropertiesComponent = (function () {
    function PropertiesComponent(propertyService) {
        this.propertyService = propertyService;
        this.reading = true;
        this.datatableInited = false;
        this.properties = [];
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    PropertiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //------------------    Reading data of properties        -----------------/
        this.propertyService.getAllProperties().subscribe(function (d) {
            _this.properties = d;
            _this.reading = false;
            _this.datatableInited = false;
        }, function (e) {
            console.log("error: ", e);
            _this.reading = false;
        });
    };
    PropertiesComponent.prototype.finishReading = function () {
        initDataTable();
        this.datatableInited = true;
    };
    PropertiesComponent.prototype.addBooking = function () {
        console.log('add');
    };
    PropertiesComponent.prototype.editBooking = function () {
        console.log('edit');
    };
    PropertiesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' properties-cmp ',
            templateUrl: 'properties.component.html',
            styleUrls: ['properties.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService])
    ], PropertiesComponent);
    return PropertiesComponent;
}());
exports.PropertiesComponent = PropertiesComponent;
//# sourceMappingURL=properties.component.js.map