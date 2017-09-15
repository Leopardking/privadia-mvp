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
        this.fullCalendar = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Test calendar', this.bookingDays);
        this.availabilityForm.valueChanges.subscribe(function () {
            _this.bookingDays[_this.bookingDays.length - 1] = _this.availabilityForm.value;
        });
        console.log('Test calendar', this.bookingDays);
        var startWeek = moment().startOf('month');
        var endWeek = moment().endOf('month');
        for (var i = 0; i < 6; i++) {
            this.fullCalendar.push({
                monthName: startWeek.format('MMMM'),
                weeks: [],
            });
            console.log('week', endWeek.week());
            var _loop_1 = function(week) {
                this_1.fullCalendar[i].weeks.push({
                    week: week,
                    days: Array(7).fill(0).map(function (n, i) { return moment().week(week).startOf('week').clone().add(n + i, 'day'); })
                });
            };
            var this_1 = this;
            for (var week = startWeek.week(); week <= endWeek.week(); week++) {
                _loop_1(week);
            }
            startWeek.add(1, 'month');
            endWeek.add(1, 'month');
        }
        // console.log('Full calendar ', this.fullCalendar);
        // this.months = [];
        //
        // this.selected = moment().startOf('day');
        // this.startCalendar = this.selected.month(this.selected.month()).clone();
        // for(let i = 0; i < 6; i++) {
        // 	let start = this.startCalendar.clone();
        // 	this._buildMonth(start.date(1).day(0), this.startCalendar);
        // 	this.startCalendar.add(1, 'month');
        // }
        //
        // this.availabilityForm.valueChanges.subscribe(data => {
        // 	this.months = [];
        //    this.selected = moment().startOf('day');
        //    this.startCalendar = this.selected.month(this.selected.month()).clone();
        // 	for(let i = 0; i < 6; i++) {
        //        let start = this.startCalendar.clone();
        //        this._buildMonth(start.date(1).day(0), this.startCalendar);
        //        this.startCalendar.add(1, 'month');
        // 	};
        // 	this.bookingDays.push(this.availabilityForm.value)
        // });
        //
        // console.log('Month ', this.months)
    };
    // private _buildMonth(start, month) {
    //    // console.log('Rebuild calendar',this.availabilityForm.value);
    // 	this.weeks = [];
    // 	let done = false,
    // 		date = start.clone(),
    // 		monthIndex = date.month(),
    // 		count = 0;
    // 	while (!done) {
    // 		this.weeks.push({
    // 			days: this._buildWeek(date.clone(), month)
    // 		});
    // 		date.add(1, "w");
    // 		done = count++ > 2 && monthIndex !== date.month();
    // 		monthIndex = date.month();
    // 	}
    // 	this.months.push({
    // 		monthName: month.format('MMMM YYYY'),
    // 		weeks: this.weeks
    // 	})
    // }
    //
    // private _buildWeek(date, month) {
    // 	let days = [];
    //    let dayType = {};
    // 	for (let i = 0; i < 7; i++) {
    // 		if (date.month() === month.month()) {
    //        	dayType = this.isBetween(date);
    // 		} else {
    // 			dayType = {}
    // 		}
    //        days.push({
    // 			name: date.format("dd")
    // 				.substring(0, 1),
    // 			number: date.date(),
    // 			isCurrentMonth: date.month() === month.month(),
    // 			isToday: date.isSame(new Date(), "day"),
    // 			date: date,
    // 			dayType: dayType
    // 		});
    // 		date = date.clone();
    // 		date.add(1, "d");
    // 	}
    //    return days;
    // };
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
    // private isBetween(date) {
    // 	let day = {
    // 		type: <string> null,
    // 		typeStart: <string> null,
    // 		typeEnd: <string> null,
    // 		isStart: false,
    // 		isEnd: false
    // 	};
    //
    // 	this.bookingDays.forEach((bookingDay) => {
    // 	    if(bookingDay.EntryType.Name)
    //            if (moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day'), moment(bookingDay.CheckOut).startOf('day'), null, '()' )) {
    //                day.type = bookingDay.EntryType.Name.toLowerCase();
    //            } else if (moment(date).isSame(moment(bookingDay.CheckIn).startOf('day'))) {
    //                day.typeStart = bookingDay.EntryType.Name.toLowerCase();
    //                day.isStart = true;
    //            } else if (moment(date).isSame(moment(bookingDay.CheckOut).startOf('day'))) {
    //                day.typeEnd = bookingDay.EntryType.Name.toLowerCase();
    //                day.isEnd = true;
    //            }
    // 	});
    //
    // 	return day;
    // }
    CalendarComponent.prototype.isBetweens = function (date) {
        var day = {
            type: null,
            typeStart: null,
            typeEnd: null,
            isStart: false,
            isEnd: false
        };
        // console.log('Day ',date);
        this.bookingDays.some(function (bookingDay) {
            if (bookingDay.EntryType.Name) {
                // console.log('Date  ', moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day')));
                if (moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day'), moment(bookingDay.CheckOut).startOf('day'), null, '()')) {
                    day.type = bookingDay.EntryType.Name.toLowerCase();
                    return true;
                }
                else if (moment(date).isSame(moment(bookingDay.CheckIn).startOf('day'))) {
                    day.typeStart = bookingDay.EntryType.Name.toLowerCase();
                    day.isStart = true;
                }
                else if (moment(date).isSame(moment(bookingDay.CheckOut).startOf('day'))) {
                    day.typeEnd = bookingDay.EntryType.Name.toLowerCase();
                    day.isEnd = true;
                }
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
            // this._buildMonth(start.date(1).day(0), this.startCalendar);
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