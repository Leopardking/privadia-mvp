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
var properties_service_1 = require('../properties/properties.service');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var DashboardService = (function () {
    function DashboardService(propertiesService) {
        this.propertiesService = propertiesService;
        this.filter = {};
        this.regions = [];
        this.villas = [];
        this.properties = [];
        this.metadata = [];
        this.readData();
    }
    DashboardService.prototype.readData = function () {
        var _this = this;
        this.isReading = true;
        //--------------		Reading data       -----------///////////
        this.propertiesService.getVillas(this.filter).subscribe(function (d) {
            _this.villas = d;
            _this.propertiesService.getMetaData().subscribe(function (d) {
                _this.metadata = d;
            }, function (e) { console.log("error metadata: ", e); });
            _this.propertiesService.getRegions().subscribe(function (d) {
                _this.regions = d;
            }, function (e) { console.log('error regions', e); });
            _this.isReading = false;
        }, function (e) {
            console.log("error villas:", e);
            // localStorage.removeItem('id_token');
            // this.router.navigate(['/login']);
        });
    };
    DashboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map