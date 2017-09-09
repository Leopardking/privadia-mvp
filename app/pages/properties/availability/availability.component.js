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
var AvailabilityComponent = (function () {
    function AvailabilityComponent(route, propertiesService, lookupsService, calendarService, builder) {
        var _this = this;
        this.route = route;
        this.propertiesService = propertiesService;
        this.lookupsService = lookupsService;
        this.calendarService = calendarService;
        this.builder = builder;
        this.availabilityForm = new forms_1.FormGroup({
            Id: new forms_1.FormControl(null),
            PropertyId: new forms_1.FormControl(null),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            EntryType: new forms_1.FormControl({
                Id: null,
                Name: null,
            }),
            Notes: new forms_1.FormControl(null),
            isAgency: new forms_1.FormControl(null),
            FirstName: new forms_1.FormControl(null),
            LastName: new forms_1.FormControl(null),
            Email: new forms_1.FormControl(null),
            Phone: new forms_1.FormControl(null),
            CompanyName: new forms_1.FormControl(null),
            ContactName: new forms_1.FormControl(null),
            AgencyEmail: new forms_1.FormControl(null),
            AgencyPhone: new forms_1.FormControl(null)
        });
        this.CheckIn = moment();
        this.CheckOut = moment().add(1, 'day');
        this.isCalendarView = true;
        this.UpdateBlock = null;
        route.params.subscribe(function (params) {
            _this.propertyId = params['id'];
            _this.availabilityForm.controls['PropertyId'].patchValue(_this.propertyId);
            propertiesService.readDataProperty(params['id']);
            lookupsService.getCalendarEntryTypes().subscribe(function (d) {
                _this.calendarEntryTypes = d;
            }, function (e) {
                console.log('Error calendarEntryTypes', e);
            });
            calendarService.getCalendarByProperty(_this.propertyId).subscribe(function (d) {
                _this.bookingDays = d;
                _this.bookingDays.every(function (booking, index) {
                    var tmpStart = moment(booking.CheckIn);
                    var tmpEnd = moment(booking.CheckOut);
                    if (index === 0 && _this.CheckIn < tmpStart && _this.CheckOut <= tmpStart) {
                        _this.availabilityForm.controls['CheckIn'].patchValue(_this.CheckIn.format('MM/DD/YYYY'));
                        _this.availabilityForm.controls['CheckOut'].patchValue(_this.CheckOut.format('MM/DD/YYYY'));
                        return true;
                    }
                    if (_this.CheckIn > tmpStart && _this.CheckIn >= tmpEnd) {
                        _this.availabilityForm.controls['CheckIn'].patchValue(_this.CheckIn.format('MM/DD/YYYY'));
                        return true;
                    }
                });
            }, function (e) {
                console.log('Error calendar', e);
            });
        });
    }
    AvailabilityComponent.prototype.ngOnInit = function () { };
    AvailabilityComponent.prototype.toggleUpdateBlock = function () {
        var _this = this;
        if (this.UpdateBlock === null) {
            this.disabledDates();
            this.UpdateBlock = true;
        }
        else {
            // this.disabledDates();
            this.UpdateBlock = !this.UpdateBlock;
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(function (data) {
            // this.availabilityForm.controls['CheckOut'].patchValue(moment(data).add(1,'day').format('MM/DD/YYYY'));
            _this.disabledDatesIn.some(function (disabledDate) {
                if (moment(data).add(1, 'day').diff(moment(disabledDate), 'days') <= 0) {
                    setTimeout(function () {
                        console.log('Disabled date 100 IF');
                        $('.checkOut').data("DateTimePicker")
                            .minDate(moment(data).add(1, 'day').format('MM/DD/YYYY'))
                            .maxDate(moment(disabledDate).format('MM/DD/YYYY'));
                    }, 100);
                    return true;
                }
                else {
                    setTimeout(function () {
                        console.log('Disabled date 100 ELSE');
                        $('.checkOut').data("DateTimePicker").maxDate(false);
                    }, 100);
                }
            });
            setTimeout(function () {
                console.log('Disabled date');
                $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1, 'day').format('MM/DD/YYYY'));
            }, 200);
            var index = _.findIndex(_this.bookingDays, function (o) { return o.Id == null; });
            if (index < 0) {
                console.log('if');
                _this.bookingDays.push(_this.availabilityForm.value);
            }
            else {
                console.log('else');
                _this.bookingDays[index] = _this.availabilityForm.value;
            }
            // console.log('Booking Days CheckIN ',this.bookingDays);
        });
        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(function (data) {
            // this.availabilityForm.controls['CheckIn'].patchValue(moment(data).add(-1,'day').format('MM/DD/YYYY'));
            // const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
            // if(index < 0)
            //     this.bookingDays.push(this.availabilityForm.value);
            // else
            //     this.bookingDays[index] = this.availabilityForm.value;
            // console.log('Booking Days CheckIN after', this.availabilityForm.value);
            // console.log('Booking Days CheckOUT ',this.bookingDays);
            // this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        });
        // console.log('Data update ', data);
        // console.log('Booking update ', _.unionBy(this.bookingDays, data, 'Id'));
        // console.log('Booking update ', this.bookingDays);
    };
    AvailabilityComponent.prototype.disabledDates = function () {
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
    };
    AvailabilityComponent.prototype.toggleCalendarView = function () {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    };
    AvailabilityComponent.prototype.saveForm = function (formData) {
        var _this = this;
        // formData.EntryType = 4;
        formData.EntryType = formData.EntryType.Id;
        if (formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(function (d) {
                _.replace(_this.bookingDays, { Id: formData.Id }, d);
                _this.UpdateBlock = !_this.UpdateBlock;
            }, function (e) {
                console.log('Error save availability', e);
            });
        }
        else {
            this.calendarService.addCalendar(formData).subscribe(function (d) {
                _this.bookingDays.push(d);
                _this.UpdateBlock = !_this.UpdateBlock;
            }, function (e) {
                console.log('Error save availability', e);
            });
        }
        console.log("save form", formData);
    };
    AvailabilityComponent.prototype.handlerEditAvailability = function (id) {
        var _this = this;
        this.calendarService.getCalendar(id).subscribe(function (d) {
            _this.availabilityForm = new forms_1.FormGroup({
                Id: new forms_1.FormControl(d.Id),
                PropertyId: new forms_1.FormControl(_this.propertyId),
                CheckIn: new forms_1.FormControl(d.CheckIn),
                CheckOut: new forms_1.FormControl(d.CheckOut),
                EntryType: new forms_1.FormControl(d.EntryType),
                Notes: new forms_1.FormControl(d.Notes),
            });
            _this.isCalendarView = true;
            if (_this.UpdateBlock === null) {
                _this.UpdateBlock = true;
            }
            else {
                _this.UpdateBlock = !_this.UpdateBlock;
            }
        }, function (e) {
            console.log('Error availability', e);
        });
        //     this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //         this.bookingDays[this.bookingDays.length - 1].CheckIn = data;
        //     });
        //
        //     this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //         this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        //     })
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
        __metadata('design:paramtypes', [router_1.ActivatedRoute, properties_service_1.PropertiesService, lookups_service_1.LookupsService, calendar_service_1.CalendarService, forms_1.FormBuilder])
    ], AvailabilityComponent);
    return AvailabilityComponent;
}());
exports.AvailabilityComponent = AvailabilityComponent;
//# sourceMappingURL=availability.component.js.map