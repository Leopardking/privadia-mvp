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
        this.apiUrl = 'http://privadia-mvp-api-dev.azurewebsites.net';
        // private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.companies = [];
        this.managers = [];
    }
    LookupsService.prototype.readDataRegions = function () {
        var _this = this;
        this.getRegions().subscribe(function (d) {
            _this.regions = d;
        }, function (e) { console.log('Error ManagementCompanies', e); });
    };
    LookupsService.prototype.readDataMetadata = function () {
        var _this = this;
        this.getMetaData().subscribe(function (d) {
            _this.metadata = d;
        }, function (e) { console.log('Error ManagementCompanies', e); });
    };
    LookupsService.prototype.readDataHousekeepingOptions = function () {
        var _this = this;
        this.getHousekeepingOptions().subscribe(function (d) {
            _this.housekeepingOptions = d;
        }, function (e) { console.log('Error ChildrenAllowed', e); });
    };
    LookupsService.prototype.readDataPropertyTypes = function () {
        var _this = this;
        this.getPropertyTypes().subscribe(function (d) {
            _this.propertyTypes = d;
        }, function (e) { console.log('Error PropertyTypes', e); });
    };
    LookupsService.prototype.readDataPropertyContactTypes = function () {
        var _this = this;
        this.getPropertyContactTypes().subscribe(function (d) {
            _this.propertyContactTypes = d;
        }, function (e) { console.log('Error PropertyTypes', e); });
    };
    LookupsService.prototype.getManagementCompanies = function () {
        if (!this.loginService.getPermission('Lookups/GetManagementCompanies'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetManagementCompanies', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getManagersByCompany = function (id) {
        if (!this.loginService.getPermission('Lookups/GetManagersByCompany'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetManagersByCompany/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getRegions = function () {
        if (!this.loginService.getPermission('Lookups/GetRegions'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetRegions', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getOwners = function () {
        if (!this.loginService.getPermission('Lookups/GetOwners'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetOwners', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getHousekeepingOptions = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetHousekeepingOptions/', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getPoITypes = function () {
        if (!this.loginService.getPermission('Lookups/GetPointOfInterestTypes'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetPointOfInterestTypes', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getMetaData = function () {
        if (!this.loginService.getPermission('Lookups/GetMetaData'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetMetaData', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getChildrenAllowed = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetChildrenOptions', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getPropertyTypes = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetPropertyTypes', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getPropertyContactTypes = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetPropertyContactTypes', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LookupsService.prototype.getCalendarEntryTypes = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetCalendarEntryTypes', options)
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