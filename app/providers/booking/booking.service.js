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
var helpers_1 = require("../../helpers/helpers");
var BookingService = (function () {
    function BookingService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.apiUrl = 'http://privadia-mvp-api-dev.azurewebsites.net';
        // public apiUrl:string = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        this.bookings = [];
    }
    BookingService.prototype.getDataBookings = function () {
        var _this = this;
        this.allBookings().subscribe(function (d) {
            _this.bookings = d;
        }, function (e) {
            console.log("error: ", e);
        });
    };
    BookingService.prototype.readDataBookingById = function (id) {
        var _this = this;
        this.getBookingById(id).subscribe(function (d) {
            _this.booking = d;
        }, function (e) {
            console.log("error: ", e);
        });
    };
    BookingService.prototype.readDataConfirmPayment = function (data) {
        var _this = this;
        this.confirmPayment(data).subscribe(function (d) {
            _this.booking = d;
            $.notify({
                icon: "notifications",
                message: "Payment Confirmed Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
        }, function (e) {
            console.log("error: ", e);
            helpers_1.handlerErrorNotify(e.ExceptionMessage);
        });
    };
    BookingService.prototype.readDataSignContract = function (id) {
        var _this = this;
        this.signContract(id).subscribe(function (d) {
            _this.booking = d;
            $.notify({
                icon: "notifications",
                message: "Contract Signed Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
        }, function (e) {
            console.log("error: ", e);
        });
    };
    BookingService.prototype.allBookings = function () {
        if (!this.loginService.getPermission('Bookings/Get'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Bookings/', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Get Booking By Id
    BookingService.prototype.getBookingById = function (id) {
        if (!this.loginService.getPermission('Bookings/GetById'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/Bookings/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Update Booking
    BookingService.prototype.updateBooking = function (data) {
        if (!this.loginService.getPermission('Bookings/Put'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.put(this.apiUrl + '/api/Bookings/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookingService.prototype.signContract = function (data) {
        if (!this.loginService.getPermission('Bookings/SignContract'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Bookings/SignContract', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookingService.prototype.confirmPayment = function (data) {
        if (!this.loginService.getPermission('Bookings/ConfirmPayment'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Bookings/ConfirmPayment', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Add New Booking
    BookingService.prototype.addBooking = function (data) {
        if (!this.loginService.getPermission('Properties/GetById'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/Bookings/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Delete Booking
    BookingService.prototype.deleteBooking = function (id) {
        if (!this.loginService.getPermission('Properties/GetById'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.delete(this.apiUrl + '/api/Bookings/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Searchh Properties
    BookingService.prototype.searchProperties = function (name) {
        if (!this.loginService.getPermission('Properties/GetById'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + '/api/properties/search?name=' + name, null, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //All Properties
    BookingService.prototype.allProperties = function (name) {
        if (!this.loginService.getPermission('Properties/GetById'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.get(this.apiUrl + '/api/properties/', options)
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
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map