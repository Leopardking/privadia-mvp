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
var router_1 = require("@angular/router");
var forms_1 = require('@angular/forms');
var properties_service_1 = require('../../../providers/properties/properties.service');
var calendar_service_1 = require("../../../providers/calendar/calendar.service");
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
var helpers_1 = require("../../../helpers/helpers");
var login_service_1 = require("../../../providers/login/login.service");
var AvailabilityComponent = (function () {
    function AvailabilityComponent(route, propertiesService, lookupsService, calendarService, builder, loginService) {
        var _this = this;
        this.route = route;
        this.propertiesService = propertiesService;
        this.lookupsService = lookupsService;
        this.calendarService = calendarService;
        this.builder = builder;
        this.loginService = loginService;
        this.availabilityForm = new forms_1.FormGroup({
            Id: new forms_1.FormControl(null),
            PropertyId: new forms_1.FormControl(null),
            CheckIn: new forms_1.FormControl(null),
            CheckOut: new forms_1.FormControl(null),
            EntryType: new forms_1.FormControl({
                Id: 1,
                Name: 'Internal Booking',
            }),
            Notes: new forms_1.FormControl(null),
            Reference: new forms_1.FormControl(null, forms_1.Validators.required),
            ViaAgency: new forms_1.FormControl(null),
            ClientFirstName: new forms_1.FormControl(null),
            ClientLastName: new forms_1.FormControl(null),
            ClientTel: new forms_1.FormControl(null),
            ClientEmail: new forms_1.FormControl(null),
            AgencyCompanyName: new forms_1.FormControl(null),
            AgentName: new forms_1.FormControl(null),
            AgentTel: new forms_1.FormControl(null),
            AgentEmail: new forms_1.FormControl(null)
        });
        this.isCalendarView = true;
        this.UpdateBlock = false;
        this.role = false;
        this.isAgent = this.loginService.getRoles('Agent');
        route.params.subscribe(function (params) {
            _this.propertyId = params['id'];
            _this.availabilityForm.controls['PropertyId'].patchValue(_this.propertyId);
            propertiesService.readDataProperty(params['id']);
            lookupsService.getCalendarEntryTypes().subscribe(function (d) {
                _this.calendarEntryTypes = d;
            }, function (e) {
                helpers_1.handlerErrorNotify('Error ');
                console.log('Error   calendarEntryTypes', e);
            });
            calendarService.getCalendarByProperty(_this.propertyId).subscribe(function (d) {
                _this.bookingDays = _.clone(d);
                _this.bookingDaysClear = _.clone(d);
            }, function (e) {
                console.log('Error calendar  ', e);
            });
        });
    }
    AvailabilityComponent.prototype.ngOnInit = function () { };
    AvailabilityComponent.prototype.handlerUpdateDate = function (value, CheckOut, init) {
        var _this = this;
        if (CheckOut === void 0) { CheckOut = null; }
        if (init === void 0) { init = null; }
        this.CheckIn = moment(value, 'DD/MM/YYYY').startOf('days');
        if (CheckOut)
            this.CheckOut = moment(CheckOut, 'DD/MM/YYYY');
        else if (!this.role)
            this.CheckOut = moment(this.CheckIn.format('DD/MM/YYYY'), 'DD/MM/YYYY').add(1, 'day');
        setTimeout(function () {
            $('.checkIn').data("DateTimePicker")
                .minDate(moment().format('DD/MM/YYYY'));
            $('.checkOut').data("DateTimePicker")
                .minDate(false)
                .maxDate(false);
        }, 10980);
        var nextDate = _(this.bookingDays);
        nextDate.next();
        // console.log('bookingDays', this.bookingDays);
        this.bookingDays.some(function (booking, index) {
            var tmpNextDate = nextDate.next();
            var tmpStart = moment(booking.CheckIn).startOf('days');
            var tmpEnd = moment(booking.CheckOut).startOf('days');
            var tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
            var tmpNextEnd = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');
            if (index === 0 && _this.CheckOut.isSameOrBefore(tmpStart)) {
                _this.minDatePicker = _this.CheckIn.clone().add(1, 'days');
                _this.maxDatePicker = tmpStart.clone();
                return true;
            }
            else if (_this.CheckOut.isBetween(tmpStart, tmpEnd, null, '(]')) {
                _this.CheckIn = tmpEnd.clone();
                _this.CheckOut = tmpEnd.add(1, 'days').clone();
                _this.minDatePicker = _this.CheckIn.clone();
                _this.maxDatePicker = tmpNextStart.clone();
                if (_this.CheckOut.isSameOrBefore(tmpNextStart) || tmpNextDate.done) {
                    return true;
                }
                else {
                    _this.minDatePicker = _this.CheckIn.clone().add(1, 'days');
                    _this.maxDatePicker = tmpNextStart.clone();
                    return false;
                }
            }
            else if (_this.CheckIn.isSameOrAfter(tmpEnd) && _this.CheckOut.isSameOrBefore(tmpNextStart)) {
                _this.minDatePicker = _this.CheckIn.clone().add(1, 'days');
                _this.maxDatePicker = tmpNextStart.clone();
                return false;
            }
            else {
                _this.minDatePicker = _this.CheckIn.clone().add(1, 'days');
                return false;
            }
        });
        setTimeout(function () {
            if (_this.maxDatePicker && _this.maxDatePicker.isSameOrBefore((_this.minDatePicker)))
                _this.maxDatePicker = false;
            if (!init) {
                $('.checkOut').data("DateTimePicker")
                    .minDate(_this.minDatePicker.format('DD/MM/YYYY'))
                    .maxDate(_this.maxDatePicker && _this.maxDatePicker.format('DD/MM/YYYY') || false);
            }
        }, 990);
        this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('DD/MM/YYYY'));
        this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('DD/MM/YYYY'));
        if (init) {
            this.availabilityForm.controls['CheckIn'].patchValue(null);
            this.availabilityForm.controls['CheckOut'].patchValue(null);
        }
    };
    ;
    AvailabilityComponent.prototype.toggleUpdateBlock = function () {
        this.availabilityForm.reset();
        this.UpdateBlock = !this.UpdateBlock;
        this.bookingDays = this.bookingDaysClear;
        // this.calendarService.getCalendarByProperty(this.propertyId).subscribe(
        //     data => {
        //         this.bookingDays = data;
        //         this.bookingDaysClear = data;
        //         handlerSuccessMessage('New Availability Successfully Added');
        //         this.UpdateBlock = !this.UpdateBlock;
        //     },
        //     e => {
        //         handlerErrorNotify(`Error Message: ${e.Message}`);
        //     }
        // );
        switch (this.UpdateBlock) {
            case true:
                this.resetForm();
                this.disabledDates();
                this.handlerUpdateDate(this.CheckIn.format('DD/MM/YYYY'), null, true);
                break;
            case false:
                this.resetForm();
                break;
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
    };
    AvailabilityComponent.prototype.disabledDates = function () {
        var _this = this;
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDays.forEach(function (booking) {
            if (booking.Id) {
                var checkInMoment = moment(booking.CheckIn).startOf('days');
                var checkOutMoment = moment(booking.CheckOut).startOf('days');
                var diff = checkOutMoment.diff(checkInMoment, 'days');
                _this.disabledDatesIn.push(checkInMoment.format('MM/DD/YYYY'));
                _this.disabledDatesOut.push(checkOutMoment.format('MM/DD/YYYY'));
                for (var i = 1; i < diff; i++) {
                    _this.disabledDatesIn.push(checkInMoment.add(1, 'day').format('MM/DD/YYYY'));
                    _this.disabledDatesOut.push(checkOutMoment.add(-1, 'day').format('MM/DD/YYYY'));
                }
            }
        });
    };
    AvailabilityComponent.prototype.toggleCalendarView = function () {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    };
    AvailabilityComponent.prototype.saveForm = function (formData) {
        var _this = this;
        console.log('Form save', this.availabilityForm.value, formData);
        if (formData.EntryType.Id == 1 && !this.availabilityForm.valid) {
            helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
            this.errorForm = true;
            return false;
        }
        // fixes with dates
        formData.CheckIn = moment(formData.CheckIn, 'DD/MM/YYYY').format('YYYY-MM-DD');
        formData.CheckOut = moment(formData.CheckOut, 'DD/MM/YYYY').format('YYYY-MM-DD');
        // ----------------
        formData.EntryType = formData.EntryType.Id;
        if (formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(function (d) {
                _this.calendarService.getCalendarByProperty(_this.propertyId).subscribe(function (data) {
                    _this.bookingDays = data;
                    _this.bookingDaysClear = data;
                    helpers_1.handlerSuccessMessage('New Availability Successfully Added');
                    _this.UpdateBlock = !_this.UpdateBlock;
                }, function (e) {
                    helpers_1.handlerErrorNotify("Error Message: " + e.Message);
                });
            }, function (e) {
                helpers_1.handlerErrorFieds(e, _this.availabilityForm);
                helpers_1.handlerErrorNotify("Error Message: " + e.Message);
            });
        }
        else {
            this.calendarService.addCalendar(formData).subscribe(function (d) {
                _this.calendarService.getCalendarByProperty(_this.propertyId).subscribe(function (data) {
                    _this.bookingDays = data;
                    _this.bookingDaysClear = data;
                    helpers_1.handlerSuccessMessage('New Availability Successfully Added');
                    _this.UpdateBlock = !_this.UpdateBlock;
                }, function (e) {
                    helpers_1.handlerErrorNotify("Error Message: " + e.Message);
                });
            }, function (e) {
                helpers_1.handlerErrorFieds(e, _this.availabilityForm);
                helpers_1.handlerErrorNotify("Error Message: " + e.Message);
            });
        }
        console.log("save form", formData);
    };
    AvailabilityComponent.prototype.handlerEditAvailability = function (id) {
        var _this = this;
        this.availabilityForm.reset();
        this.role = true;
        this.calendarService.getCalendar(id).subscribe(function (d) {
            _this.disabledDates();
            _this.availabilityForm = new forms_1.FormGroup({
                Id: new forms_1.FormControl(d.Id),
                PropertyId: new forms_1.FormControl(_this.propertyId),
                CheckIn: new forms_1.FormControl(moment(d.CheckIn).format('DD/MM/YYYY')),
                CheckOut: new forms_1.FormControl(moment(d.CheckOut).format('DD/MM/YYYY')),
                EntryType: new forms_1.FormControl(d.EntryType),
                Notes: new forms_1.FormControl(d.Notes),
                Reference: new forms_1.FormControl(d.Reference || null),
                ViaAgency: new forms_1.FormControl(d.ViaAgency || null),
                ClientFirstName: new forms_1.FormControl(d.ClientFirstName || null),
                ClientLastName: new forms_1.FormControl(d.ClientLastName || null),
                ClientTel: new forms_1.FormControl(d.ClientTel || null),
                ClientEmail: new forms_1.FormControl(d.ClientEmail || null),
                AgencyCompanyName: new forms_1.FormControl(d.AgencyCompanyName || null),
                AgentName: new forms_1.FormControl(d.AgentName || null),
                AgentTel: new forms_1.FormControl(d.AgentTel || null),
                AgentEmail: new forms_1.FormControl(d.AgentEmail || null)
            });
            _this.isCalendarView = true;
            // _.remove(this.bookingDays, (o) => {
            //     return o.Id == id;
            // });
            _this.UpdateBlock = !_this.UpdateBlock;
            _this.disabledDates();
            _this.handlerUpdateDate(moment(d.CheckIn).format('DD/MM/YYYY'), moment(d.CheckOut).format('DD/MM/YYYY'));
        }, function (e) {
            console.log('Error availability', e);
        });
    };
    AvailabilityComponent.prototype.handlerDeleteAvailability = function (id) {
        this.bookingDays = _.remove(this.bookingDays, function (o) {
            return o.Id != id;
        });
        this.calendarService.deleteAvailability(id).subscribe(function (d) {
            console.log('Deleted Availability  ', d);
        }, function (e) {
            console.log('Deleted Availability ERROR ', e);
        });
    };
    AvailabilityComponent.prototype.resetForm = function () {
        this.CheckIn = moment().startOf('days');
        this.availabilityForm.patchValue({
            CheckIn: null,
            CheckOut: null,
            PropertyId: this.propertyId,
            EntryType: {
                Id: 4,
                Name: 'Other',
            }
        });
    };
    AvailabilityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' availability-cmp ',
            templateUrl: 'availability.component.html',
            styleUrls: ['availability.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, properties_service_1.PropertiesService, lookups_service_1.LookupsService, calendar_service_1.CalendarService, forms_1.FormBuilder, login_service_1.LoginService])
    ], AvailabilityComponent);
    return AvailabilityComponent;
}());
exports.AvailabilityComponent = AvailabilityComponent;
//# sourceMappingURL=availability.component.js.map