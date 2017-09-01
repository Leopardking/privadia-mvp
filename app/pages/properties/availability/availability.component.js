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
var forms_1 = require('@angular/forms');
var properties_service_1 = require('../../../providers/properties/properties.service');
var calendar_service_1 = require("../../../providers/calendar/calendar.service");
var AvailabilityComponent = (function () {
    function AvailabilityComponent(propertiesService, calendarService, builder) {
        var _this = this;
        this.propertiesService = propertiesService;
        this.calendarService = calendarService;
        this.builder = builder;
        this.availabilityForm = new forms_1.FormGroup({});
        this.CheckIn = moment();
        this.CheckOut = moment().add(1, 'day');
        this.UpdateBlock = null;
        this.isCalendarView = true;
        this.data = {
            CheckIn: moment().format('MM/DD/YYYY'),
            CheckOut: moment().add(1, 'day').format('MM/DD/YYYY'),
            UpdateType: {
                Id: 1,
                Name: 'Internal Booking',
            },
            Notes: null,
            isAgency: null,
            FirstName: null,
            LastName: null,
            Email: null,
            Phone: null,
            CompanyName: null,
            ContactName: null,
            AgencyEmail: null,
            AgencyPhone: null
        };
        this.bookingDayss = [
            { startDay: '08/16/2017', endDay: '08/19/2017', Type: 'external' },
            { startDay: '08/20/2017', endDay: '08/26/2017', Type: 'other' },
            { startDay: '08/26/2017', endDay: '08/31/2017', Type: 'external' },
            { startDay: '09/02/2017', endDay: '09/10/2017', Type: 'internal' },
            { startDay: null, endDay: null, Type: 'external' },
        ];
        calendarService.getCalendarByProperty(2).subscribe(function (d) {
            _this.bookingDays = d;
            console.log('booking ', d, _this.bookingDays, _this.bookingDayss);
            _this.bookingDays.every(function (booking, index) {
                var tmpStart = moment(booking.CheckIn);
                var tmpEnd = moment(booking.CheckOut);
                if (index === 0 && _this.CheckIn < tmpStart && _this.CheckOut <= tmpStart) {
                    _this.data.CheckIn = _this.CheckIn.format('MM/DD/YYYY');
                    _this.data.CheckOut = _this.CheckOut.format('MM/DD/YYYY');
                    return true;
                }
                console.log(index);
                if (_this.CheckIn > tmpStart && _this.CheckIn >= tmpEnd) {
                    _this.data.CheckIn = _this.CheckIn.format('MM/DD/YYYY');
                    return true;
                }
            });
            _this.bookingDays.push({
                CheckIn: null,
                CheckOut: null,
                EntryType: 4,
                EntryTypeDesc: "Other",
                Id: null,
                Notes: "Internal Test"
            });
        }, function (e) {
            console.log('Error calendar', e);
        });
    }
    AvailabilityComponent.prototype.ngOnInit = function () {
        var nowDate = moment();
        var CheckIn = moment();
        var CheckOut = moment().add(1, 'day');
        this.UpdateTypeList = [
            { Id: 1, Name: 'Internal Booking' },
            { Id: 2, Name: 'External Booking' },
            { Id: 3, Name: 'Owner Present' },
            { Id: 4, Name: 'Not Available for Rent' },
            { Id: 5, Name: 'Other' }
        ];
        // this.bookingDays.every((booking, index) => {
        //     const tmpStart = moment(booking.startDay);
        //     const tmpEnd   = moment(booking.endDay);
        //
        //     //console.log('fgsd', index === 0, CheckIn < tmpStart, CheckOut <= tmpStart)
        //     if(index === 0 && CheckIn < tmpStart && CheckOut <= tmpStart) {
        //         this.data.CheckIn = CheckIn.format('MM/DD/YYYY');
        //         this.data.CheckOut = CheckOut.format('MM/DD/YYYY');
        //         console.log('fgsd')
        //         return true;
        //     }
        //     console.log(index)
        //     if(CheckIn > tmpStart && CheckIn >= tmpEnd) {
        //         this.data.CheckIn = CheckIn.format('MM/DD/YYYY');
        //         console.log('CheckIn ', index, CheckIn > tmpStart && CheckIn >= tmpEnd);
        //         return true
        //     }
        //
        // });
        this.initForm(this.data);
    };
    AvailabilityComponent.prototype.autosize = function (e) {
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    };
    AvailabilityComponent.prototype.initForm = function (data) {
        this.availabilityForm.reset();
        this.availabilityForm = this.builder.group({
            CheckIn: new forms_1.FormControl(data.CheckIn),
            CheckOut: new forms_1.FormControl(data.CheckOut),
            UpdateType: new forms_1.FormControl({
                Id: data.UpdateType.Id,
                Name: data.UpdateType.Name,
            }),
            Notes: new forms_1.FormControl(data.Notes),
            isAgency: new forms_1.FormControl(data.isAgency),
            FirstName: new forms_1.FormControl(data.FirstName),
            LastName: new forms_1.FormControl(data.LastName),
            Email: new forms_1.FormControl(data.Email),
            Phone: new forms_1.FormControl(data.Email),
            CompanyName: new forms_1.FormControl(data.CompanyName),
            ContactName: new forms_1.FormControl(data.ContactName),
            AgencyEmail: new forms_1.FormControl(data.AgencyEmail),
            AgencyPhone: new forms_1.FormControl(data.AgencyPhone)
        });
    };
    AvailabilityComponent.prototype.toggleUpdateBlock = function () {
        var _this = this;
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDays.forEach(function (booking) {
            var checkInMoment = moment(booking.CheckIn);
            var checkOutMoment = moment(booking.CheckOut);
            var diff = checkOutMoment.diff(checkInMoment, 'days');
            _this.disabledDatesIn.push(checkInMoment.format('MM/DD/YYYY'));
            _this.disabledDatesOut.push(checkOutMoment.format('MM/DD/YYYY'));
            for (var i = 1; i < diff; i++) {
                _this.disabledDatesIn.push(checkInMoment.add(1, 'day').format('MM/DD/YYYY'));
                _this.disabledDatesOut.push(checkOutMoment.add(-1, 'day').format('MM/DD/YYYY'));
            }
        });
        if (this.UpdateBlock === null) {
            this.UpdateBlock = true;
        }
        else {
            this.UpdateBlock = !this.UpdateBlock;
            this.bookingDays[this.bookingDays.length - 1].CheckIn = null;
            this.bookingDays[this.bookingDays.length - 1].CheckOut = null;
            console.log('toggle ', this.UpdateBlock, this.bookingDays);
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(function (data) {
            _this.bookingDays[_this.bookingDays.length - 1].CheckIn = data;
            _this.bookingDays[_this.bookingDays.length - 1].CheckOut = moment(data).add(1, 'day').format('MM/DD/YYYY');
            _this.disabledDatesIn.some(function (disabledDate) {
                if (moment(_this.bookingDays[_this.bookingDays.length - 1].CheckOut).diff(moment(disabledDate), 'days') <= 0) {
                    setTimeout(function () {
                        $('.checkOut').data("DateTimePicker")
                            .minDate(moment(data).add(1, 'day').format('MM/DD/YYYY'))
                            .maxDate(moment(disabledDate).format('MM/DD/YYYY'));
                    }, 500);
                    return true;
                }
                else {
                    $('.checkOut').data("DateTimePicker").maxDate(false);
                }
            });
            setTimeout(function () {
                $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1, 'day').format('MM/DD/YYYY'));
            }, 600);
        });
        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(function (data) {
            _this.bookingDays[_this.bookingDays.length - 1].CheckOut = data;
        });
    };
    AvailabilityComponent.prototype.handlerEditAvailability = function (data) {
        var _this = this;
        var dataForm = {
            CheckIn: '09/16/2017',
            CheckOut: '09/18/2017',
            UpdateType: {
                Id: 1,
                Name: 'Internal Booking',
            },
            Notes: null,
            isAgency: null,
            FirstName: 'Alex',
            LastName: 'Loginov',
            Email: null,
            Phone: null,
            CompanyName: null,
            ContactName: null,
            AgencyEmail: null,
            AgencyPhone: null
        };
        this.isCalendarView = true;
        if (this.UpdateBlock === null) {
            this.UpdateBlock = true;
        }
        else {
            this.UpdateBlock = !this.UpdateBlock;
        }
        this.initForm(dataForm);
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(function (data) {
            _this.bookingDays[_this.bookingDays.length - 1].CheckIn = data;
        });
        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(function (data) {
            _this.bookingDays[_this.bookingDays.length - 1].CheckOut = data;
        });
    };
    AvailabilityComponent.prototype.toggleCalendarView = function () {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    };
    AvailabilityComponent.prototype.saveForm = function () {
        console.log("save form", this.availabilityForm);
    };
    AvailabilityComponent.prototype.changeDate = function () {
        console.log('changeDate ', this.availabilityForm);
    };
    AvailabilityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' availability-cmp ',
            templateUrl: 'availability.component.html',
            styleUrls: ['availability.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, calendar_service_1.CalendarService, forms_1.FormBuilder])
    ], AvailabilityComponent);
    return AvailabilityComponent;
}());
exports.AvailabilityComponent = AvailabilityComponent;
//# sourceMappingURL=availability.component.js.map