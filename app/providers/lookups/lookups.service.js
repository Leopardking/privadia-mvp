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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var login_service_1 = require("../login/login.service");
var LookupsService = (function () {
    function LookupsService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.companies = [];
        this.managers = [];
    }
    LookupsService.prototype.getDataCompanies = function () {
        var _this = this;
        this.getManagementCompanies().subscribe(function (d) {
            _this.companies = d;
        }, function (e) { console.log('Error ManagementCompanies', e); });
    };
    LookupsService.prototype.getDataManagers = function () {
        var _this = this;
        this.getManagersByCompany().subscribe(function (d) {
            _this.managers = d;
        }, function (e) { console.log('Error ManagersByCompany', e); });
    };
    LookupsService.prototype.getManagementCompanies = function () {
        // if(!this.loginService.getPermission('Lookups/GetManagementCompanies'))
        // 	return Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetManagementCompanies', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getManagersByCompany = function () {
        // if(!this.loginService.getPermission('Lookups/GetManagersByCompany'))
        // 	return Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetManagersByCompany/6e78b138-4d18-4691-b988-c5057f599bf0', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    LookupsService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    LookupsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService])
    ], LookupsService);
    return LookupsService;
}());
exports.LookupsService = LookupsService;
//# sourceMappingURL=lookups.service.js.map