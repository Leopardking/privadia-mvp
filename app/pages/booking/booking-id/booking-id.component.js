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
var router_1 = require("@angular/router");
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var BookingIdComponent = (function () {
    function BookingIdComponent(bookingService, enquiryService, route) {
        this.bookingService = bookingService;
        this.enquiryService = enquiryService;
        this.route = route;
    }
    BookingIdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.bookingService.readDataBookingById(params['id']);
            setTimeout(function () {
                _this.enquiryService.readDataEnquiry(_this.bookingService.booking.EnquiryMessageThreadId);
            }, 1000);
        });
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
        __metadata('design:paramtypes', [booking_service_1.BookingService, enquiry_service_1.EnquiryService, router_1.ActivatedRoute])
    ], BookingIdComponent);
    return BookingIdComponent;
}());
exports.BookingIdComponent = BookingIdComponent;
//# sourceMappingURL=booking-id.component.js.map