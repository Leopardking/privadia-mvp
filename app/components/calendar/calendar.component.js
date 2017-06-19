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
        this.months = [];
        this.selected = this._removeTime(this.selected || moment());
        this.startCalendar = this.selected.month("May").clone();
        for (var i = 0; i < 6; i++) {
            var start = this.startCalendar.clone();
            start.date(1);
            this._removeTime(start.day(0));
            this._buildMonth(start, this.startCalendar);
            this.startCalendar.add(1, 'month');
        }
    };
    CalendarComponent.prototype._removeTime = function (date) {
        return date.day(0)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0);
    };
    CalendarComponent.prototype._buildMonth = function (start, month) {
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
            monthName: month.format('MMMM'),
            weeks: this.weeks
        });
    };
    CalendarComponent.prototype._buildWeek = function (date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd")
                    .substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    };
    ;
    CalendarComponent.prototype.isIn = function (dayNumber, isCurrentMonth) {
        if (isCurrentMonth) {
            if (this.bookingDays) {
                var startIndex = _.findIndex(this.bookingDays.startDay, { 'day': dayNumber });
                var selectedIndex = _.findIndex(this.bookingDays.selectedDay, { 'day': dayNumber }); // scope.bookingDays.selectedDay.indexOf(dayNumber);
                var endIndex = _.findIndex(this.bookingDays.endDay, { 'day': dayNumber }); // scope.bookingDays.endDay.indexOf(dayNumber);
                if (startIndex > -1 && endIndex > -1) {
                    return "start end";
                }
                if (endIndex > -1) {
                    return "end";
                }
                if (startIndex > -1) {
                    return "start";
                }
                if (selectedIndex > -1) {
                    return "selected";
                }
            }
        }
    };
    ;
    CalendarComponent.prototype.changeYear = function (changer) {
        this.months = [];
        this.selected = this.startCalendar.add(changer, 'year');
        this.startCalendar = this.selected.month("May").clone();
        for (var i = 0; i < 6; i++) {
            var start = this.startCalendar.clone();
            start.date(1);
            this._removeTime(start.day(0));
            this._buildMonth(start, this.startCalendar);
            this.startCalendar.add(1, 'month');
        }
    };
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', forms_1.FormGroup)
    ], CalendarComponent.prototype, "propertyForm", void 0);
    __decorate([
        core_1.Input('errorForm'), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "errorForm", void 0);
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