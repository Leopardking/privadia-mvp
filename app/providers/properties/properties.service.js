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
var PropertiesService = (function () {
    function PropertiesService(http) {
        this.http = http;
        // public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
    }
    PropertiesService.prototype.setToken = function (str) {
        this.token = str;
    };
    PropertiesService.prototype.setApiURL = function (url) {
        this.apiUrl = url;
    };
    PropertiesService.prototype.getAllProperties = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Properties/', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getPropertyById = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Properties/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.updateProperty = function (data) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Properties/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.addProperty = function (data) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Properties/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.deleteProperty = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.delete(this.apiUrl + '/api/Properties/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getVillas = function (filter) {
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
        return this.http.get(this.apiUrl + '/api/Rates/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.saveRates = function (data) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Rates/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getRegions = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetRegions', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getOwners = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetOwners', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getPoITypes = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetPointOfInterestTypes', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getMetaData = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetMetaData', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getChildrenAllowed = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetChildrenOptions', options)
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
    PropertiesService.prototype.getHousekeepingOptions = function () {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetHousekeepingOptions/', options)
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
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            console.log('body', err);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    PropertiesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PropertiesService);
    return PropertiesService;
}());
exports.PropertiesService = PropertiesService;
//# sourceMappingURL=properties.service.js.map