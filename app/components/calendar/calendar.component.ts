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

	private fullCalendar = [];

	constructor( ) {
	}

	ngOnInit() {
        console.log('Test calendar', this.bookingDays);

        this.availabilityForm.valueChanges.subscribe(() => {
			this.bookingDays[this.bookingDays.length -1] = this.availabilityForm.value;
		});
		console.log('Test calendar', this.bookingDays);

		const startWeek = moment().startOf('month');
		const endWeek = moment().endOf('month');

		for(let i = 0; i < 6; i++) {
			this.fullCalendar.push({
				monthName: startWeek.format('MMMM'),
				weeks: [],
			});
			console.log('week', endWeek.week());
			for(let week = startWeek.week(); week<=endWeek.week();week++){
				this.fullCalendar[i].weeks.push({
					week:week,
					days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
				})
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
	}

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

	public isBetweens(date) {
		let day = {
			type: <string> null,
			typeStart: <string> null,
			typeEnd: <string> null,
			isStart: false,
			isEnd: false
		};
		// console.log('Day ',date);
		this.bookingDays.some((bookingDay) => {
		    if(bookingDay.EntryType.Name) {
				// console.log('Date  ', moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day')));
				if (moment(date).isBetween(moment(bookingDay.CheckIn).startOf('day'), moment(bookingDay.CheckOut).startOf('day'), null, '()' )) {
					day.type = bookingDay.EntryType.Name.toLowerCase();
					return true;
				} else if (moment(date).isSame(moment(bookingDay.CheckIn).startOf('day'))) {
					day.typeStart = bookingDay.EntryType.Name.toLowerCase();
					day.isStart = true;
					// return true;
				} else if (moment(date).isSame(moment(bookingDay.CheckOut).startOf('day'))) {
					day.typeEnd = bookingDay.EntryType.Name.toLowerCase();
					day.isEnd = true;
					// return true;
				}
			}
		});

	 	return day;
	}

	private changePeriod(changer) {
		this.months = [];
		this.selected.add(changer, 'months');
        this.startCalendar = this.selected.month(this.selected.month()).clone();
		for(let i = 0; i < 6; i++) {
			let start = this.startCalendar.clone();
			// this._buildMonth(start.date(1).day(0), this.startCalendar);
			this.startCalendar.add(1, 'month')
		}
	}
    //
	// public formatDate(date) {
	// 	console.log('date   ', date);
	// 	if(date)
	// 		return date.format('DD')
	// 	else
	// 		return 'f'
	// }
}