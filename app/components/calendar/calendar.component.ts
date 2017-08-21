import { Component, OnInit, Input, ViewChild } from '@angular/core';

import {FormGroup, FormArray, FormControl} from "@angular/forms";
import initFullCalendar = require('../../../assets/js/init/initFullCalendar.js');

declare var moment: any;
declare var _: any;

@Component({
    moduleId: module.id,
    selector: ' calendar-cmp ',
    templateUrl: 'calendar.component.html',
    styleUrls: [ 'calendar.component.css' ]
})  

export class CalendarComponent implements OnInit{
	@Input('group')
	private propertyForm: FormGroup;

	@Input('errorForm')
	public errorForm: any;

	private selected;
	//private month;
	private months;
	private weeks;
	//private date;
	private bookingDays;

	private startCalendar;

	constructor( ) {
	}

	ngOnInit() {
		this.months = [];
		this.selected = this._removeTime(this.selected || moment());
        this.startCalendar = this.selected.month(this.selected.month()).clone();
		for(let i = 0; i < 6; i++) {
			let start = this.startCalendar.clone();
			start.date(1);
			this._removeTime(start.day(0));
			this._buildMonth(start, this.startCalendar);
			this.startCalendar.add(1, 'month');
		}
	}

	private _removeTime(date) {
		return date.day(0)
				.hour(0)
				.minute(0)
				.second(0)
				.millisecond(0);
	}

	private _buildMonth(start, month) {
		this.weeks = [];
		let done = false,
			date = start.clone(),
			monthIndex = date.month(),
			count = 0;
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
		})
    }

	private _buildWeek(date, month) {
		let days = [];
		for (let i = 0; i < 7; i++) {
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

	private isIn(dayNumber, isCurrentMonth) {
		if (isCurrentMonth) {
			if (this.bookingDays) {
				const startIndex = _.findIndex(this.bookingDays.startDay, { 'day': dayNumber });
				const selectedIndex = _.findIndex(this.bookingDays.selectedDay, { 'day': dayNumber });// scope.bookingDays.selectedDay.indexOf(dayNumber);
				const endIndex = _.findIndex(this.bookingDays.endDay, { 'day': dayNumber });// scope.bookingDays.endDay.indexOf(dayNumber);
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

	private changePeriod(changer) {
		this.months = [];
		this.selected.add(changer, 'months');
        this.startCalendar = this.selected.month(this.selected.month()).clone();
		for(let i = 0; i < 6; i++) {
			let start = this.startCalendar.clone();
			start.date(1);
			this._removeTime(start.day(0));
			this._buildMonth(start, this.startCalendar);
			this.startCalendar.add(1, 'month')
		}
	}
}