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
var PropertiesService = (function () {
    function PropertiesService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        // public apiUrl:string = 'http://privadia-mvp-api-dev.azurewebsites.net';
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.properties = [];
        // private ownerNames;
        // public owner;
        // public ownerName;
        // public ownerName = "";
        // public regionName = "";
        /*
        public owner = {
            Id: '',
            Name: ''
        };
        */
        this.region = {
            Id: '',
            Name: ''
        };
    }
    PropertiesService.prototype.getDataProperties = function () {
        var _this = this;
        this.getAllProperties().subscribe(function (d) {
            _this.properties = d;
        }, function (e) {
            console.log("error properties: ", e);
        });
    };
    PropertiesService.prototype.getDataProperty = function (id) {
        var _this = this;
        this.isReading = true;
        this.getPropertyById(id).subscribe(function (d) {
            _this.property = d;
            _this.getMetaData().subscribe(function (d) {
                _this.metadata = d;
            }, function (e) { console.log("Error MetaData: ", e); });
            _this.getRegions().subscribe(function (d) {
                _this.regionArray = d;
                _this.regions = d.map(function (item, i) { return item.Name; });
            }, function (e) { console.log("Error Regions: ", e); });
            _this.getOwners().subscribe(function (d) {
                _this.owners = d;
                // this.ownerNames = d.map( (item, i) => { return item.Name; } );
            }, function (e) { console.log("Error Owner: ", e); });
            _this.isReading = false;
        }, function (e) { console.log("Error Properties: ", e); });
    };
    PropertiesService.prototype.getDataEmptyProperty = function () {
        var _this = this;
        this.isReading = true;
        this.getOwners().subscribe(function (d) {
            _this.owners = d;
            // this.ownerNames = d.map( (item, i) => { return item.Name; } );
            _this.getRegions().subscribe(function (d) {
                _this.regionArray = d;
                _this.regions = d.map(function (item, i) { return item.Name; });
                _this.getMetaData().subscribe(function (d) {
                    _this.metadata = d;
                    _this.isReading = false;
                }, function (e) { console.log("Error MetaData: ", e); });
            }, function (e) { console.log("Error Regions: ", e); });
        }, function (e) { console.log("Error Owner: ", e); });
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
        if (!this.loginService.getPermission('Lookups/GetRegions'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Lookups/GetRegions', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PropertiesService.prototype.getOwners = function () {
        if (!this.loginService.getPermission('Lookups/GetOwners'))
            return Observable_1.Observable.throw(null);
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
        if (!this.loginService.getPermission('Lookups/GetMetaData'))
            return Observable_1.Observable.throw(null);
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
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService])
    ], PropertiesService);
    return PropertiesService;
}());
exports.PropertiesService = PropertiesService;
//# sourceMappingURL=properties.service.js.map