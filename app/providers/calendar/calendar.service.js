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
var BookingService = (function () {
    function BookingService(http) {
        this.http = http;
        this.apiUrl = 'http://privadia-mvp-api-dev.azurewebsites.net';
        // public apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.bookings = [];
    }
    BookingService.prototype.getCalendarByProperty = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + "/api/Calendar/GetByProperty/" + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Get Booking By Id
    BookingService.prototype.getCalendar = function (id) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + "/api/Calendar/" + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookingService.prototype.addCalendar = function (data) {
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + "/api/Calendar", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookingService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    BookingService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.json() || '';
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    BookingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=calendar.service.js.map