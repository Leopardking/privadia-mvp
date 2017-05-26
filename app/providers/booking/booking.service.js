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
    }
    BookingService.prototype.setToken = function (str) {
        this.token = str;
        this.header = new http_1.Headers({ 'Authorization': this.token });
        this.options = new http_1.RequestOptions({ headers: this.header });
    };
    BookingService.prototype.setApiURL = function (url) {
        this.apiUrl = url;
    };
    BookingService.prototype.allBookings = function () {
        return this.http.get(this.apiUrl + '/api/bookings/', this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Get Booking By Id
    BookingService.prototype.getBookingById = function (id) {
        return this.http.get(this.apiUrl + '/api/bookings/' + id, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Update Booking
    BookingService.prototype.updateBooking = function (data) {
        return this.http.post(this.apiUrl + '/api/bookings/', data, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Add New Booking
    BookingService.prototype.addBooking = function (data) {
        return this.http.post(this.apiUrl + '/api/bookings/', data, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Delete Booking
    BookingService.prototype.deleteBooking = function (id) {
        return this.http.delete(this.apiUrl + '/api/bookings/' + id, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Searchh Properties
    BookingService.prototype.searchProperties = function (name) {
        return this.http.post(this.apiUrl + '/api/properties/search?name=' + name, null, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //All Properties
    BookingService.prototype.allProperties = function (name) {
        return this.http.get(this.apiUrl + '/api/properties/', this.options)
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
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
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
//# sourceMappingURL=booking.service.js.map