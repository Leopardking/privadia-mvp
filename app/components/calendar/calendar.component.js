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
var forms_1 = require("@angular/forms");
var CalendarComponent = (function () {
    function CalendarComponent() {
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Test calendar');
        this.months = [];
        this.selected = moment().startOf('day');
        this.startCalendar = this.selected.month(this.selected.month()).clone();
        for (var i = 0; i < 6; i++) {
            var start = this.startCalendar.clone();
            this._buildMonth(start.date(1).day(0), this.startCalendar);
            this.startCalendar.add(1, 'month');
        }
        this.availabilityForm.valueChanges.subscribe(function (data) {
            _this.months = [];
            _this.selected = moment().startOf('day');
            _this.startCalendar = _this.selected.month(_this.selected.month()).clone();
            for (var i = 0; i < 6; i++) {
                var start = _this.startCalendar.clone();
                _this._buildMonth(start.date(1).day(0), _this.startCalendar);
                _this.startCalendar.add(1, 'month');
            }
        });
        console.log('Month ', this.months);
    };
    CalendarComponent.prototype._buildMonth = function (start, month) {
        // console.log('Rebuild calendar',this.availabilityForm.value);
        this.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            this.weeks.push({
                days: this._buildWeek(date.clone(), month)
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
        this.months.push({
            monthName: month.format('MMMM YYYY'),
            weeks: this.weeks
        });
    };
    CalendarComponent.prototype._buildWeek = function (date, month) {
        var days = [];
        var dayType = {};
        for (var i = 0; i < 7; i++) {
            if (date.month() === month.month()) {
                dayType = this.isBetween(date);
            }
            else {
                dayType = {};
            }
            days.push({
                name: date.format("dd")
                    .substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                dayType: dayType
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    };
    ;
    // private isIn(dayNumber, isCurrentMonth) {
    //    // this.bookingDays[0].startDay = moment(this.bookingDays.startDay).format('MM/DD/YYYY')
    // 	// if (isCurrentMonth) {
    // 	// 	if (this.bookingDays) {
    // 	// 		const startIndex = _.findIndex(this.bookingDays.CheckIn, { 'day': dayNumber });
    //     //        const selectedIndex = _.findIndex(this.bookingDays.selectedDay, { 'day': dayNumber });// scope.bookingDays.selectedDay.indexOf(dayNumber);
    //     //        const endIndex = _.findIndex(this.bookingDays.endDay, { 'day': dayNumber });  // scope.bookingDays.endDay.indexOf(dayNumber);
    //     //        if (startIndex > -1 && endIndex > -1) {
    // 	// 			return "start end";
    // 	// 		}
    //    //
    // 	// 		if (endIndex > -1) {
    // 	// 			return "end";
    // 	// 		}
    // 	// 		if (startIndex > -1) {
    //     //            console.log('Booking start',startIndex,  _.findIndex(this.bookingDays.CheckIn, { 'day': dayNumber }));
    // 	// 			return "start";
    // 	// 		}
    // 	// 		if (selectedIndex > -1) {
    // 	// 			return "selected";
    // 	// 		}
    // 	// 	}
    // 	// }
    // };
    CalendarComponent.prototype.isBetween = function (date) {
        var day = {
            type: null,
            typeStart: null,
            typeEnd: null,
            isStart: false,
            isEnd: false
        };
        this.bookingDays.forEach(function (bookingDay) {
            if (bookingDay.EntryType.Name)
                if (moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day'), moment(bookingDay.CheckOut).startOf('day'), null, '()')) {
                    day.type = bookingDay.EntryType.Name.toLowerCase();
                }
                else if (moment(date).isSame(moment(bookingDay.CheckIn).startOf('day'))) {
                    day.typeStart = bookingDay.EntryType.Name.toLowerCase();
                    day.isStart = true;
                }
                else if (moment(date).isSame(moment(bookingDay.CheckOut).startOf('day'))) {
                    day.typeEnd = bookingDay.EntryType.Name.toLowerCase();
                    day.isEnd = true;
                }
        });
        return day;
    };
    CalendarComponent.prototype.changePeriod = function (changer) {
        this.months = [];
        this.selected.add(changer, 'months');
        this.startCalendar = this.selected.month(this.selected.month()).clone();
        for (var i = 0; i < 6; i++) {
            var start = this.startCalendar.clone();
            this._buildMonth(start.date(1).day(0), this.startCalendar);
            this.startCalendar.add(1, 'month');
        }
    };
    __decorate([
        core_1.Input('bookingDays'), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "bookingDays", void 0);
    __decorate([
        core_1.Input('calendarEntryTypes'), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "calendarEntryTypes", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], CalendarComponent.prototype, "availabilityForm", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' calendar-cmp ',
            templateUrl: 'calendar.component.html',
            styleUrls: ['calendar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map