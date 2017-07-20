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
require('rxjs/add/observable/throw');
var login_service_1 = require("../login/login.service");
var lookups_service_1 = require("../lookups/lookups.service");
var PropertiesService = (function () {
    function PropertiesService(http, loginService, lookupsService) {
        this.http = http;
        this.loginService = loginService;
        this.lookupsService = lookupsService;
        this.apiUrl = 'http://privadia-mvp-api-dev.azurewebsites.net';
        // private apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.owners = [];
        this.properties = [];
        this.rates = [];
        this.regions = [];
        this.metadata = [];
        this.companies = [];
        this.managers = [];
        this.PoITypes = [];
        this.region = {
            Id: '',
            Name: ''
        };
        console.log('Load Properties Service');
    }
    PropertiesService.prototype.readDataProperties = function () {
        var _this = this;
        this.getAllProperties().subscribe(function (d) {
            _this.properties = d;
        }, function (e) {
            console.log("error properties: ", e);
        });
    };
    PropertiesService.prototype.readDataProperty = function (id) {
        var _this = this;
        this.isReading = true;
        this.getPropertyById(id).subscribe(function (d) {
            _this.property = d;
            _this.isReading = false;
        }, function (e) {
            console.log("error properties: ", e);
        });
    };
    PropertiesService.prototype.readDataRegions = function () {
        var _this = this;
        this.lookupsService.getRegions().subscribe(function (d) {
            _this.regions = d;
        }, function (e) {
            console.log("error regions:", e);
        });
    };
    PropertiesService.prototype.readDataMetadata = function () {
        var _this = this;
        this.lookupsService.getMetaData().subscribe(function (d) {
            _this.metadata = d;
        }, function (e) {
            console.log("error metadata:", e);
        });
    };
    PropertiesService.prototype.readDataOwners = function () {
        var _this = this;
        this.lookupsService.getOwners().subscribe(function (d) {
            _this.owners = d;
        }, function (e) {
            console.log("error owner:", e);
        });
    };
    PropertiesService.prototype.readDataPoITypes = function () {
        var _this = this;
        this.lookupsService.getPoITypes().subscribe(function (d) {
            _this.PoITypes = d;
        }, function (e) {
            console.log("error owner:", e);
        });
    };
    PropertiesService.prototype.readDataCompanies = function () {
        var _this = this;
        this.lookupsService.getManagementCompanies().subscribe(function (d) {
            _this.companies = d;
        }, function (e) { console.log('Error ManagementCompanies', e); });
    };
    PropertiesService.prototype.readDataManagers = function (Id) {
        var _this = this;
        this.lookupsService.getManagersByCompany(Id).subscribe(function (d) {
            _this.managers = d;
        }, function (e) { console.log('Error ManagersByCompany', e); });
    };
    PropertiesService.prototype.readDataRates = function (Id) {
        var _this = this;
        this.getRates(Id).subscribe(function (d) {
            _this.rates = d;
        }, function (e) { console.log('Error readDataManagers', e); });
    };
    PropertiesService.prototype.getAllProperties = function () {
        if (!this.loginService.getPermission('Properties/Get'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Properties/', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getPropertyById = function (id) {
        if (!this.loginService.getPermission('Properties/GetById'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Properties/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.updateProperty = function (data) {
        if (!this.loginService.getPermission('Properties/Put'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Properties/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.addProperty = function (data) {
        if (!this.loginService.getPermission('Properties/Post'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Properties/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.deleteProperty = function (id) {
        if (!this.loginService.getPermission('Properties/Delete'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.delete(this.apiUrl + '/api/Properties/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getVillas = function (filter) {
        if (!this.loginService.getPermission('Properties/SearchAvailable'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Properties/SearchAvailable', filter, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getRates = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        this.isReading = true;
        return this.http.get(this.apiUrl + '/api/Rates/ByProperty/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.saveRate = function (data) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Rates/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.deleteRate = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.delete(this.apiUrl + '/api/Rates/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getQuote = function (data) {
        if (!this.loginService.getPermission('Rates/GetQuote'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Rates/GetQuote', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getBookings = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/bookings/property/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    PropertiesService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.json() || '';
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    PropertiesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService, lookups_service_1.LookupsService])
    ], PropertiesService);
    return PropertiesService;
}());
exports.PropertiesService = PropertiesService;
//# sourceMappingURL=properties.service.js.map