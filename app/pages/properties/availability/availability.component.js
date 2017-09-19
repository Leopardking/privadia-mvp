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
            // CheckIn: new FormControl(moment('09/09/2017 14:23', 'DD/MM/YYYY').format('DD/MM/YYYY')),
            // CheckOut: new FormControl(moment('09/09/2017 14:23', 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY')),
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
        this.CheckIn = moment('04/12/2017', 'DD/MM/YYYY').startOf('days');
        this.CheckOut = moment(this.CheckIn).add(1, 'day').startOf('days');
        this.isCalendarView = true;
        this.UpdateBlock = false;
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
                _this.bookingDays = d;
                _this.bookingDaysClear = d;
                // const nextDate = _(d);
                // nextDate.next();
                //
                // this.bookingDays.some((booking, index) => {
                //     const tmpNextDate = nextDate.next();
                //
                //     const tmpStart = moment(booking.CheckIn, 'DD/MM/YYYY').startOf('days');
                //     const tmpEnd   = moment(booking.CheckOut, 'DD/MM/YYYY').startOf('days');
                //
                //     const tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn, 'DD/MM/YYYY').startOf('days');
                //     // const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');
                //
                //     if(index === 0 && this.CheckOut.isSameOrBefore(tmpStart)) {
                //         return true;
                //     } else if(this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)')) {
                //         this.CheckIn = tmpEnd;
                //         this.CheckOut = tmpNextStart;
                //         if(this.CheckIn.isBefore(this.CheckOut) || tmpNextDate.done) {
                //             this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('DD/MM/YYYY'));
                //             this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'day').format('DD/MM/YYYY'));
                //             this.minDate = tmpEnd.format('MM/DD/YYYY');
                //             //this.maxDate = tmpNextDate.value.CheckIn;
                //             return true;
                //         } else {
                //             return false;
                //         }
                //     }
                // });
                setTimeout(function () {
                    _this.bookingDays.push({ CheckIn: null, CheckOut: null, EntryType: { Id: 1, Name: 'Internal Booking' } });
                }, 2000);
            }, function (e) {
                console.log('Error calendar', e);
            });
        });
    }
    AvailabilityComponent.prototype.ngOnInit = function () {
        // console.log('',this.availabilityForm.value);
    };
    AvailabilityComponent.prototype.handlerUpdateDate = function (value) {
        var _this = this;
        // console.log('Update date TEST', value);
        // console.log('Booking New In 1', this.CheckIn.format('DD/MM/YYYY'));
        // console.log('Booking New OUt 1', this.CheckOut.format('DD/MM/YYYY'));
        this.CheckIn = moment(value, 'DD/MM/YYYY').startOf('days');
        this.CheckOut = moment(this.CheckIn.format('DD/MM/YYYY'), 'DD/MM/YYYY').add(1, 'day');
        // console.log('Booking New In 2', this.CheckIn.format('DD/MM/YYYY'));
        // console.log('Booking New OUt 2', this.CheckOut.format('DD/MM/YYYY'));
        // $('.checkOut').data("DateTimePicker")
        //               .minDate(false)
        //               .maxDate(false);
        var nextDate = _(this.bookingDays);
        nextDate.next();
        this.bookingDaysClear.some(function (booking, index) {
            var tmpNextDate = nextDate.next();
            var tmpStart = moment(booking.CheckIn).startOf('days');
            var tmpEnd = moment(booking.CheckOut).startOf('days');
            var tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
            var tmpNextEnd = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');
            console.log('Update', tmpNextStart.format("DD/MM/YYYY"));
            if (index === 0 && _this.CheckOut.isSameOrBefore(tmpStart)) {
                console.log('Is Same Or Before');
                return true;
            }
            else if (_this.CheckOut.isBetween(tmpStart, tmpEnd, null, '[)')) {
                _this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('DD/MM/YYYY'));
                _this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'day').format('DD/MM/YYYY'));
                console.log('Is Between');
            }
            else if (_this.CheckOut.isBefore(tmpNextStart)) {
                console.log('Is Before');
                // this.availabilityForm.controls['CheckOut'].patchValue(this.CheckIn.format('DD/MM/YYYY'));
                // $('.checkOut').data("DateTimePicker")
                //               .minDate(this.CheckIn.format('MM/DD/YYYY'))
                //               .maxDate(tmpNextStart.format('MM/DD/YYYY'));
                return true;
            }
            else {
                console.log('Else');
                return false;
            }
        });
        console.log('Booking New In 3', this.CheckIn.format('DD/MM/YYYY'));
        console.log('Booking New OUt 3', this.CheckOut.format('DD/MM/YYYY'));
        // this.bookingDays.push(this.availabilityForm.value);
    };
    ;
    AvailabilityComponent.prototype.toggleUpdateBlock = function () {
        console.log('Toggle Update Block');
        if (this.UpdateBlock === null) {
            this.disabledDates();
            this.UpdateBlock = true;
        }
        else {
            this.disabledDates();
            this.UpdateBlock = !this.UpdateBlock;
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
        this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('DD/MM/YYYY'));
        this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('DD/MM/YYYY'));
        this.handlerUpdateDate(this.CheckIn.format('DD/MM/YYYY'));
        // this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckOut'].patchValue(moment(data).add(1,'day').format('DD/MM/YYYY'));
        //     this.disabledDatesIn.some((disabledDate) => {
        //         if(moment(data).add(1,'day').diff(moment(disabledDate), 'days') <= 0) {
        //             setTimeout(() => {
        //                 console.log('Disabled date 100 IF',);
        //                 $('.checkOut').data("DateTimePicker")
        //                               .minDate(moment(data).add(1,'day').format('DD/MM/YYYY'))
        //                               .maxDate(moment(disabledDate).format('DD/MM/YYYY'));
        //             }, 100);
        //             return true;
        //         }
        //         else {
        //             setTimeout(() => {
        //                 console.log('Disabled date 100 ELSE',);
        //                 $('.checkOut').data("DateTimePicker").maxDate(false);
        //             }, 100);
        //         }
        //     });
        //
        //     setTimeout(() => {
        //         console.log('Disabled date',);
        //         $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1,'day').format('DD/MM/YYYY'));
        //     }, 200);
        //
        //     const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
        //     if(index < 0) {
        //         console.log('if',);
        //         this.bookingDays.push(this.availabilityForm.value);
        //     }
        //     else {
        //         console.log('else',);
        //         this.bookingDays[index] = this.availabilityForm.value;
        //     }
        //     // console.log('Booking Days CheckIN ',this.bookingDays);
        // });
        // this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckIn'].patchValue(moment(data).add(-1,'day').format('DD/MM/YYYY'));
        //     // const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
        //     // if(index < 0)
        //     //     this.bookingDays.push(this.availabilityForm.value);
        //     // else
        //     //     this.bookingDays[index] = this.availabilityForm.value;
        //     // console.log('Booking Days CheckIN after', this.availabilityForm.value);
        //     // console.log('Booking Days CheckOUT ',this.bookingDays);
        //     // this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        // })
        // console.log('Data update ', data);
        // console.log('Booking update ', _.unionBy(this.bookingDays, data, 'Id'));
        // console.log('Booking update ', this.bookingDays);
    };
    AvailabilityComponent.prototype.disabledDates = function () {
        var _this = this;
        console.log('toggleUpdateBlock');
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDaysClear.forEach(function (booking) {
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
        if (formData.EntryType.Id == 1 && !this.availabilityForm.valid) {
            helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
            this.errorForm = true;
            return false;
        }
        // fixes with dates
        formData.CheckIn = moment(formData.CheckIn, 'DD/MM/YYYY').format('MM/DD/YYYY');
        formData.CheckOut = moment(formData.CheckOut, 'DD/MM/YYYY').format('MM/DD/YYYY');
        // ----------------
        formData.EntryType = formData.EntryType.Id;
        if (formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(function (d) {
                _.replace(_this.bookingDays, { Id: formData.Id }, d);
                _this.UpdateBlock = !_this.UpdateBlock;
            }, function (e) {
                helpers_1.handlerErrorFieds(e, _this.availabilityForm);
            });
        }
        else {
            this.calendarService.addCalendar(formData).subscribe(function (d) {
                _this.bookingDays.push(d);
                _this.UpdateBlock = !_this.UpdateBlock;
            }, function (e) {
                helpers_1.handlerErrorFieds(e, _this.availabilityForm);
                helpers_1.handlerErrorNotify("Error Message: " + e.Message);
                console.log('Error save availability', e);
            });
        }
        console.log("save form", formData);
    };
    AvailabilityComponent.prototype.handlerEditAvailability = function (id) {
        var _this = this;
        this.calendarService.getCalendar(id).subscribe(function (d) {
            _this.disabledDates();
            _this.availabilityForm = new forms_1.FormGroup({
                Id: new forms_1.FormControl(d.Id),
                PropertyId: new forms_1.FormControl(_this.propertyId),
                CheckIn: new forms_1.FormControl(moment(d.CheckIn).format('DD/MM/YYYY')),
                CheckOut: new forms_1.FormControl(moment(d.CheckOut).format('DD/MM/YYYY')),
                EntryType: new forms_1.FormControl(d.EntryType),
                Notes: new forms_1.FormControl(d.Notes),
                Reference: new forms_1.FormControl(null),
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
            _this.isCalendarView = true;
            if (_this.UpdateBlock === null) {
                _this.UpdateBlock = true;
            }
            else {
                _this.UpdateBlock = !_this.UpdateBlock;
            }
            setTimeout(function () {
                _this.availabilityForm.controls['CheckIn'].patchValue(moment(d.CheckIn).format('DD/MM/YYYY'));
                _this.availabilityForm.controls['CheckOut'].patchValue(moment(d.CheckOut).format('DD/MM/YYYY'));
            }, 1000);
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
            console.log('Deleted Availability ERROR', e);
        });
    };
    AvailabilityComponent.prototype.autosize = function (e) {
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
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