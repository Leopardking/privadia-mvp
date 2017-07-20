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
var login_service_1 = require("../../../providers/login/login.service");
var forms_1 = require("@angular/forms");
var helpers_1 = require("../../../helpers/helpers");
var properties_service_1 = require("../../../providers/properties/properties.service");
var BookingIdComponent = (function () {
    function BookingIdComponent(bookingService, propertiesService, loginService, route) {
        this.bookingService = bookingService;
        this.propertiesService = propertiesService;
        this.loginService = loginService;
        this.route = route;
        this.isAgent = this.loginService.getRoles('Agent');
        this.errorForm = false;
        this.bookingForm = new forms_1.FormGroup({});
    }
    BookingIdComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        this.route.params.subscribe(function (params) {
            _this.bookingService.readDataBookingById(params['id']);
            setTimeout(function () {
                _this.bookingForm = new forms_1.FormGroup({
                    BookingId: new forms_1.FormControl(params['id']),
                    ClientContactEmail: new forms_1.FormControl({
                        value: _this.bookingService.booking.ClientContactEmail,
                        disabled: _this.isAgent
                    }, forms_1.Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
                    Notes: new forms_1.FormControl({
                        value: _this.bookingService.booking.Notes,
                        disabled: _this.isAgent
                    }),
                });
                _this.propertiesService.readDataProperty(_this.bookingService.booking.PropertyId);
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
    BookingIdComponent.prototype.cancelBooking = function () {
        console.log('Cancel booking');
    };
    BookingIdComponent.prototype.saveBooking = function () {
        var _this = this;
        console.log('Save booking', this.bookingForm);
        if (this.bookingForm.status === 'INVALID') {
            helpers_1.handlerErrorNotify('Error field');
            return this.errorForm = true;
        }
        this.errorForm = false;
        this.bookingService.updateBooking(this.bookingForm.value).subscribe(function (d) {
            $.notify({
                icon: "notifications",
                message: "Booking Updated Successfully"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
        }, function (e) {
            helpers_1.handlerErrorFieds(e, _this.bookingForm);
            helpers_1.handlerErrorNotify('Error');
        });
    };
    BookingIdComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' booking-id-cmp ',
            templateUrl: 'booking-id.component.html',
            styleUrls: ['booking-id.component.css']
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService, properties_service_1.PropertiesService, login_service_1.LoginService, router_1.ActivatedRoute])
    ], BookingIdComponent);
    return BookingIdComponent;
}());
exports.BookingIdComponent = BookingIdComponent;
//# sourceMappingURL=booking-id.component.js.map