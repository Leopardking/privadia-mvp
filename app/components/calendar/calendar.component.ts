import {Component, OnInit, Input } from '@angular/core';

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

export class CalendarComponent implements OnInit {
	@Input('bookingDays') public bookingDays;
	@Input('calendarEntryTypes') public calendarEntryTypes;
	@Input('group') private availabilityForm: FormGroup;

	private selected;
	private months;
	private weeks;
	private startCalendar;

	constructor( ) { }

	ngOnInit() {
		this._buildCalendar();

		this.availabilityForm.valueChanges.subscribe(data => {
			this._buildCalendar();
			console.log('Length ', this.bookingDays);
		});
		// this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
		// 	this._buildCalendar();
		// 	this.bookingDays[this.bookingDays.length - 1] = this.availabilityForm.value;
		// });
	}

	private _buildCalendar() {
		this.months = [];
		this.selected = moment().startOf('day');
		this.startCalendar = this.selected.month(this.selected.month()).clone();
		for(let i = 0; i < 6; i++) {
			let start = this.startCalendar.clone();
			this._buildMonth(start.date(1).day(0), this.startCalendar);
			this.startCalendar.add(1, 'month');
		}
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
        let dayType = {};
		for (let i = 0; i < 7; i++) {
			if (date.month() === month.month()) {
            	dayType = this.isBetween(date);
			} else {
				dayType = {}
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

	private isBetween(date) {
		let day = {
			type: <string> null,
			typeStart: <string> null,
			typeEnd: <string> null,
			isStart: false,
			isEnd: false
		};

		this.bookingDays.forEach((bookingDay) => {
		    if(bookingDay.EntryType.Name)
                if (moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day'), moment(bookingDay.CheckOut).startOf('day'), null, '()' )) {
                    day.type = bookingDay.EntryType.Name.toLowerCase();
                } else if (moment(date).isSame(moment(bookingDay.CheckIn).startOf('day'))) {
                    day.typeStart = bookingDay.EntryType.Name.toLowerCase();
                    day.isStart = true;
                } else if (moment(date).isSame(moment(bookingDay.CheckOut).startOf('day'))) {
                    day.typeEnd = bookingDay.EntryType.Name.toLowerCase();
                    day.isEnd = true;
                }
		});

		if (moment(date).isBetween(moment(this.availabilityForm.controls['CheckIn'].value, 'DD/MM/YYYY').startOf('day'), moment(this.availabilityForm.controls['CheckOut'].value, 'DD/MM/YYYY').startOf('day'), null, '()' )) {
			day.type = this.availabilityForm.controls['EntryType'].value.Name.toLowerCase();
		} else if (moment(date).isSame(moment(this.availabilityForm.controls['CheckIn'].value, 'DD/MM/YYYY').startOf('day'))) {
			day.typeStart = this.availabilityForm.controls['EntryType'].value.Name.toLowerCase();
			day.isStart = true;
		} else if (moment(date).isSame(moment(this.availabilityForm.controls['CheckOut'].value, 'DD/MM/YYYY').startOf('day'))) {
			day.typeEnd = this.availabilityForm.controls['EntryType'].value.Name.toLowerCase();
			day.isEnd = true;
		}

		return day;
	}

	private changePeriod(changer) {
		this.months = [];
		this.selected.add(changer, 'months');
        this.startCalendar = this.selected.month(this.selected.month()).clone();
		for(let i = 0; i < 6; i++) {
			let start = this.startCalendar.clone();
			this._buildMonth(start.date(1).day(0), this.startCalendar);
			this.startCalendar.add(1, 'month')
		}
	}
}