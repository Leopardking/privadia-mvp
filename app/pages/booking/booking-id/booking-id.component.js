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
var booking_service_1 = require('../../../providers/booking/booking.service');
var BookingIdComponent = (function () {
    function BookingIdComponent(bookingService) {
        this.bookingService = bookingService;
    }
    BookingIdComponent.prototype.ngOnInit = function () {
        this.bookingService.getDataBookings();
    };
    BookingIdComponent.prototype.finishReading = function () {
        // initDataTable();
        // this.datatableInited = true;
    };
    BookingIdComponent.prototype.addBooking = function () {
        console.log('add');
    };
    BookingIdComponent.prototype.editBooking = function () {
        console.log('edit');
    };
    BookingIdComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' booking-id-cmp ',
            templateUrl: 'booking-id.component.html',
            styleUrls: ['booking-id.component.css']
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService])
    ], BookingIdComponent);
    return BookingIdComponent;
}());
exports.BookingIdComponent = BookingIdComponent;
//# sourceMappingURL=booking-id.component.js.map