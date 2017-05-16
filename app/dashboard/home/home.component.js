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
var homeservice_1 = require('../../../app/services/homeservice');
var login_service_1 = require('../../../app/services/login/login.service');
var properties_service_1 = require('../../../app/services/properties/properties.service');
var HomeComponent = (function () {
    function HomeComponent(mainService, loginService, propertiesService) {
        this.mainService = mainService;
        this.loginService = loginService;
        this.propertiesService = propertiesService;
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginService.login("steve@freelancemvc.net", "password")
            .subscribe(function (d) {
            _this.mainService.setToken(d.token_type + ' ' + d.access_token);
            _this.mainService.getVillas().subscribe(function (d) {
                _this.villas = d;
            }, function (e) { console.log("error:", e); });
            _this.propertiesService.getregions().subscribe(function (d) {
                _this.regions = d;
            }, function (e) { console.log(e); });
        }, function (e) { console.log("error:", e); });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' home-cmp ',
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, login_service_1.LoginService, properties_service_1.PropertiesService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map