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
var booking_service_1 = require('../../providers/booking/booking.service');
var initDataTable = require('../../../assets/js/init/initDataTable.js');
var BookingComponent = (function () {
    function BookingComponent(bookingService) {
        this.bookingService = bookingService;
        this.reading = true;
        this.datatableInited = false;
        this.bookings = [];
        this.bookingTable = "";
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        //------------------    Reading data of booking        -----------------/
        this.bookingService.allBookings().subscribe(function (d) {
            _this.bookings = d;
            _this.reading = false;
            _this.datatableInited = false;
        }, function (e) {
            console.log("error: ", e);
            _this.reading = false;
        });
    };
    BookingComponent.prototype.finishReading = function () {
        initDataTable();
        this.datatableInited = true;
    };
    BookingComponent.prototype.addBooking = function () {
        console.log('add');
    };
    BookingComponent.prototype.editBooking = function () {
        console.log('edit');
    };
    BookingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' booking-cmp ',
            templateUrl: 'booking.component.html',
            styleUrls: ['booking.component.css']
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService])
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map