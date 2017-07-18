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
var login_service_1 = require("../../../providers/login/login.service");
var router_1 = require("@angular/router");
var booking_service_1 = require("../../../providers/booking/booking.service");
var helpers_1 = require("../../../helpers/helpers");
var PaymentStatusComponent = (function () {
    function PaymentStatusComponent(bookingService, loginService, route) {
        this.bookingService = bookingService;
        this.loginService = loginService;
        this.route = route;
    }
    PaymentStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.bookingId = params['id'];
        });
    };
    PaymentStatusComponent.prototype.confirmStatus = function (TransactionId) {
        this.bookingService.confirmPayment({ BookingId: this.bookingId, TransactionId: TransactionId }).subscribe(function (d) {
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
            console.log('Error', e);
            helpers_1.handlerErrorNotify('Error');
        });
    };
    PaymentStatusComponent.prototype.dateFormat = function (date, format) {
        return moment(date).format(format);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PaymentStatusComponent.prototype, "data", void 0);
    PaymentStatusComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'payment-status-cmp',
            templateUrl: 'payment-status.component.html',
            styleUrls: ['payment-status.component.css']
        }), 
        __metadata('design:paramtypes', [booking_service_1.BookingService, login_service_1.LoginService, router_1.ActivatedRoute])
    ], PaymentStatusComponent);
    return PaymentStatusComponent;
}());
exports.PaymentStatusComponent = PaymentStatusComponent;
//# sourceMappingURL=payment-status.component.js.map