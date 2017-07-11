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
var login_service_1 = require("../../../providers/login/login.service");
var EnquiriesTableComponent = (function () {
    function EnquiriesTableComponent(loginService) {
        this.loginService = loginService;
        this.datatableInited = false;
    }
    EnquiriesTableComponent.prototype.ngOnInit = function () { };
    EnquiriesTableComponent.prototype.finishReading = function () {
        var dataTableQuery = $('#datatables');
        dataTableQuery.DataTable({
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    };
    EnquiriesTableComponent.prototype.dateFormat = function (date, format) {
        return moment.utc(date).local().format(format);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EnquiriesTableComponent.prototype, "data", void 0);
    EnquiriesTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'enquiries-table-cmp ',
            templateUrl: 'enquiries.component.html',
            styleUrls: ['enquiries.component.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], EnquiriesTableComponent);
    return EnquiriesTableComponent;
}());
exports.EnquiriesTableComponent = EnquiriesTableComponent;
//# sourceMappingURL=enquiries.component.js.map