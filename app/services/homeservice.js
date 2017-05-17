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
var login_service_1 = require('../../app/services/login/login.service');
var properties_service_1 = require('../../app/services/properties/properties.service');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var MainService = (function () {
    function MainService(http, loginService, propertiesService) {
        var _this = this;
        this.http = http;
        this.loginService = loginService;
        this.propertiesService = propertiesService;
        this.token = "";
        this.apiUrl = 'http://privadia-production.azurewebsites.net';
        this.filter = new Filter(1, [1, 2, 3, 4, 5, 6, 7, 8], this.dateToDateTime(new Date('05-01-2017')), this.dateToDateTime(new Date('05-31-2017')), 0, 0, [], 0);
        this.loginService.login("steve@freelancemvc.net", "password")
            .subscribe(function (d) {
            _this.setToken(d.token_type + ' ' + d.access_token);
            _this.propertiesService.setToken(_this.token);
            _this.isReading = true;
            _this.propertiesService.getregions().subscribe(function (d) {
                _this.regions = d;
                _this.getVillas().subscribe(function (d) {
                    _this.villas = d;
                    _this.isReading = false;
                }, function (e) { console.log("error:", e); });
            }, function (e) { console.log(e); });
        }, function (e) { console.log("error:", e); });
    }
    MainService.prototype.setToken = function (token) {
        this.token = token;
    };
    MainService.prototype.getToken = function () {
        return this.token;
    };
    // Fixes Local Time to UTC offsets.
    MainService.prototype.dateToDateTime = function (pDate) {
        var mDate = new Date(pDate);
        var mHoursOffset = (mDate.getTimezoneOffset() / 60) * -1;
        var mMinutesOffset = (mDate.getTimezoneOffset() % 60) * -1;
        mDate.setHours(pDate.getHours() + mHoursOffset);
        mDate.setMinutes(pDate.getMinutes() + mMinutesOffset);
        return mDate;
    };
    ;
    MainService.prototype.getVillas = function () {
        this.isReading = true;
        var header = new http_1.Headers();
        header.append('Authorization', this.token);
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/properties/searchavailable', this.filter.getCompat(), options)
            .map(this.extractVillaData)
            .catch(this.handleError);
    };
    MainService.prototype.logFunc = function (str) {
        console.log(str);
    };
    MainService.prototype.extractVillaData = function (res) {
        var body = res.json();
        return body || {};
    };
    MainService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.isReading = false;
        return Observable_1.Observable.throw(errMsg);
    };
    MainService.prototype.setFilter = function (filter, type) {
        var _this = this;
        if (type == 1) {
            this.filter.bedrooms = filter.bedrooms;
            this.filter.locations = filter.locations;
            this.filter.checkIn = filter.checkIn;
            this.filter.checkOut = filter.checkOut;
            this.filter.minRate = filter.minRate;
            this.filter.maxRate = filter.maxRate;
        }
        else if (type == 2) {
            this.filter.MetaDataFilters = filter.MetaDataFilters;
            this.filter.orderBy = filter.orderBy;
        }
        this.isReading = true;
        this.getVillas().subscribe(function (d) {
            _this.villas = d;
            _this.isReading = false;
        }, function (e) { console.log("error:", e); });
    };
    MainService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService, properties_service_1.PropertiesService])
    ], MainService);
    return MainService;
}());
exports.MainService = MainService;
var Filter = (function () {
    function Filter(pBedrooms, pLocations, pCheckIn, pCheckOut, pMinRate, pMaxRate, pMetaDataFilters, pOrderBy) {
        this.bedrooms = pBedrooms;
        this.locations = pLocations;
        this.checkIn = pCheckIn;
        this.checkOut = pCheckOut;
        this.minRate = pMinRate;
        this.maxRate = pMaxRate;
        this.MetaDataFilters = pMetaDataFilters;
        this.orderBy = pOrderBy;
    }
    Filter.prototype.check = function (pVilla) {
        var bedroomCheck = (this.bedrooms === pVilla.bedrooms);
        var locationCheck = (this.locations.indexOf(pVilla.location) !== -1);
        var rateCheck = ((pVilla.totalRate >= this.minRate) && (pVilla.totalRate <=
            this.maxRate));
        return (bedroomCheck && locationCheck && rateCheck);
    };
    Filter.prototype.getCompat = function () {
        return {
            Bedrooms: this.bedrooms,
            Regions: this.locations,
            CheckIn: this.dateToDateTime(this.checkIn),
            CheckOut: this.dateToDateTime(this.checkOut),
            MinRate: this.minRate,
            MaxRate: this.maxRate,
            MetaDataFilters: this.MetaDataFilters,
            OrderBy: this.orderBy
        };
    };
    Filter.prototype.dateToDateTime = function (pDate) {
        var mDate = new Date(pDate);
        var mHoursOffset = (mDate.getTimezoneOffset() / 60) * -1;
        var mMinutesOffset = (mDate.getTimezoneOffset() % 60) * -1;
        mDate.setHours(pDate.getHours() + mHoursOffset);
        mDate.setMinutes(pDate.getMinutes() + mMinutesOffset);
        return mDate;
    };
    ;
    return Filter;
}());
exports.Filter = Filter;
var Villa = (function () {
    function Villa(name, id, headline, imageId, location, bedrooms, sleeps, boxUrl, collaboratorInitial, totalRate, bathroom) {
        this.name = name;
        this.headline = headline;
        this.imageId = imageId;
        this.location = location;
        this.bedrooms = bedrooms;
        this.sleeps = sleeps;
        this.boxUrl = boxUrl;
        this.collaboratorInitials = collaboratorInitial;
        this.totalRate = totalRate;
        this.bathrooms = bathroom;
    }
    Villa.prototype.getRichInfo = function () {
        return "<b>" + this.name + "</b>" +
            "<br>" + this.bedrooms.toString() +
            ((this.bedrooms === 1) ? " Bedroom" : " Bedrooms") +
            " | " + this.collaboratorInitials +
            "<br>Area: " + this.location +
            "<br>Full Info: <a href='" + this.boxUrl + "'>" +
            this.boxUrl + "</a>" +
            "<br><b><u>Price: €" + this.totalRate + "</u></b><br><br><br>";
    };
    Villa.prototype.getInfo = function () {
        return this.name +
            "\n" + this.bedrooms.toString() +
            ((this.bedrooms === 1) ? " Bedroom" : " Bedrooms") +
            " | " + this.collaboratorInitials +
            "\nArea: " + this.location +
            "\nFull Info: " + this.boxUrl +
            "\nPrice: €" + this.totalRate + '\n\n';
    };
    return Villa;
}());
exports.Villa = Villa;
//# sourceMappingURL=homeservice.js.map