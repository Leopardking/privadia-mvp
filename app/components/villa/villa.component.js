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
var login_service_1 = require("../../providers/login/login.service");
var VillaComponent = (function () {
    function VillaComponent(loginService) {
        this.loginService = loginService;
        this.openEnquiry = new core_1.EventEmitter();
    }
    VillaComponent.prototype.ngOnInit = function () { };
    VillaComponent.prototype.roundRate = function (rate) {
        return this.numberWithCommas(rate && parseFloat(rate).toFixed(2) || 0);
    };
    VillaComponent.prototype.open = function (villa) {
        this.openEnquiry.emit(villa);
    };
    VillaComponent.prototype.copy = function () {
        document.execCommand('copy');
    };
    VillaComponent.prototype.numberWithCommas = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], VillaComponent.prototype, "openEnquiry", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VillaComponent.prototype, "villa", void 0);
    VillaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' villa-cmp ',
            templateUrl: 'villa.component.html',
            styleUrls: ['villa.component.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], VillaComponent);
    return VillaComponent;
}());
exports.VillaComponent = VillaComponent;
//# sourceMappingURL=villa.component.js.map