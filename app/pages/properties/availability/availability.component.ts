import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { CalendarService } from "../../../providers/calendar/calendar.service";
import { LookupsService } from "../../../providers/lookups/lookups.service";
import {handlerErrorNotify} from "../../../helpers/helpers";

declare const moment: any;
declare const $: any;
declare const _: any;

@Component({
    moduleId: module.id,
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
    private availabilityForm = new FormGroup({
        Id: new FormControl(null),
        PropertyId: new FormControl(null),
        CheckIn: new FormControl(null),
        CheckOut: new FormControl(null),
        // CheckIn: new FormControl(moment('09/10/2017 14:23').format('MM/DD/YYYY')),
        // CheckOut: new FormControl(moment('09/10/2017 14:23').add(1, 'day').format('MM/DD/YYYY')),
        EntryType: new FormControl({
            Id: null,
            Name: null,
        }),
        Notes: new FormControl(null),
        isAgency: new FormControl(null),
        FirstName: new FormControl(null),
        LastName: new FormControl(null),
        Email: new FormControl(null),
        Phone: new FormControl(null),
        CompanyName: new FormControl(null),
        ContactName: new FormControl(null),
        AgencyEmail: new FormControl(null),
        AgencyPhone: new FormControl(null)
    });
    private CheckIn = moment().startOf('days');
    private CheckOut = moment(this.CheckIn).add(1, 'day').startOf('days');
    private propertyId: any;

    private calendarEntryTypes: Array<{ Id: number, Name: string }>;
    private bookingDays;
    private isCalendarView: boolean = true;


    private UpdateBlock: boolean = null;
    private disabledDatesIn: any;
    private disabledDatesOut: any;

    private maxDate: any;
    private minDate: any;

    constructor ( private route: ActivatedRoute,
                  public propertiesService: PropertiesService,
                  public lookupsService: LookupsService,
                  public calendarService: CalendarService,
                  private builder: FormBuilder ) {
        route.params.subscribe(params => {
            this.propertyId = params['id'];
            this.availabilityForm.controls['PropertyId'].patchValue(this.propertyId);

            propertiesService.readDataProperty(params['id']);

            lookupsService.getCalendarEntryTypes().subscribe(
                d => {
                    this.calendarEntryTypes = d
                },
                e => {
                    handlerErrorNotify('Error');
                    console.log('Error calendarEntryTypes', e);
                }
            );

            calendarService.getCalendarByProperty(this.propertyId).subscribe(
                d => {
                    this.bookingDays = d;
                    const nextDate = _(d);
                    nextDate.next();

                    this.bookingDays.some((booking, index) => {
                        const tmpNextDate = nextDate.next();

                        const tmpStart = moment(booking.CheckIn).startOf('days');
                        const tmpEnd   = moment(booking.CheckOut).startOf('days');

                        const tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
                        // const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');

                        if(index === 0 && this.CheckOut.isSameOrBefore(tmpStart)) {
                            return true;
                        } else if(this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)')) {
                            this.CheckIn = tmpEnd;
                            this.CheckOut = tmpNextStart;
                            if(this.CheckIn.isBefore(this.CheckOut) || tmpNextDate.done) {
                                this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('MM/DD/YYYY'));
                                this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'day').format('MM/DD/YYYY'));
                                this.minDate = tmpEnd.format('MM/DD/YYYY');
                                this.maxDate = tmpNextDate.value.CheckIn;
                                return true;
                            } else {
                                return false;
                            }
                        }
                    });
                },
                e => {
                    console.log('Error calendar', e);
                }
            );
            this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('MM/DD/YYYY'));
            this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('MM/DD/YYYY'));
        });
    }

    ngOnInit() {
        // console.log('',this.availabilityForm.value);
    }

    ngAfterContentInit() {
        // console.log('Content Init qq', this.availabilityForm.value);
    }

    ngAfterViewInit() {
        // console.log('View Init qq', this.availabilityForm.value);
    }

    ngAfterContentChecked() {
        // console.log('Content Checked qq', this.availabilityForm.value);
    }

    ngAfterViewChecked() {
        // console.log('View Checked qq', this.availabilityForm.value);
    }

    handlerUpdateDate(value) {
        this.CheckIn = moment(value);
        this.CheckOut = this.CheckIn.add(1, 'day');
        $('.checkOut').data("DateTimePicker")
                      .minDate(false)
                      .maxDate(false);

        const nextDate = _(this.bookingDays);
        nextDate.next();

        this.bookingDays.some((booking, index) => {
            const tmpNextDate = nextDate.next();

            const tmpStart = moment(booking.CheckIn).startOf('days');
            const tmpEnd   = moment(booking.CheckOut).startOf('days');

            const tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
            const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');

            if(index === 0 && this.CheckOut.isSameOrBefore(tmpStart)) {
                console.log('1',);
                return true;
            } else if(this.CheckOut.isBetween(tmpNextStart, tmpNextEnd, null, '[)')) {
                console.log('2',);
                if(this.CheckOut.isSameOrBefore(tmpNextStart) || tmpNextDate.done) {
                    // console.log('3',);
                    this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('MM/DD/YYYY'));
                    this.minDate = tmpEnd.format('MM/DD/YYYY');
                    this.maxDate = moment(tmpNextDate.value.CheckIn).format('MM/DD/YYYY');
                    $('.checkOut').data("DateTimePicker")
                                  .minDate(this.minDate)
                                  .maxDate(this.maxDate);
                    return true;
                } else {
                    console.log('4',);
                    return false;
                }
            } else if(this.CheckOut.isBefore(tmpNextStart)) {
                this.availabilityForm.controls['CheckOut'].patchValue(this.CheckIn.format('MM/DD/YYYY'));
                $('.checkOut').data("DateTimePicker")
                    .minDate(this.CheckIn.format('MM/DD/YYYY'))
                    .maxDate(tmpNextStart.format('MM/DD/YYYY'));
                console.log('5',this.CheckIn.format('MM/DD/YYYY'));
                return true;
            }

        });
    };

    toggleUpdateBlock() {
        if (this.UpdateBlock === null) {
            this.disabledDates();
            this.UpdateBlock = true;
        } else {
            this.disabledDates();
            this.UpdateBlock = !this.UpdateBlock;
            // this.bookingDays[this.bookingDays.length - 1].CheckIn = null;
            // this.bookingDays[this.bookingDays.length - 1].CheckOut = null;
            // console.log('toggle ', this.UpdateBlock,this.bookingDays)
        }


        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }

        // this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckOut'].patchValue(moment(data).add(1,'day').format('MM/DD/YYYY'));
        //     this.disabledDatesIn.some((disabledDate) => {
        //         if(moment(data).add(1,'day').diff(moment(disabledDate), 'days') <= 0) {
        //             setTimeout(() => {
        //                 console.log('Disabled date 100 IF',);
        //                 $('.checkOut').data("DateTimePicker")
        //                               .minDate(moment(data).add(1,'day').format('MM/DD/YYYY'))
        //                               .maxDate(moment(disabledDate).format('MM/DD/YYYY'));
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
        //         $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1,'day').format('MM/DD/YYYY'));
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
        //
        //
        // this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckIn'].patchValue(moment(data).add(-1,'day').format('MM/DD/YYYY'));
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
    }

    private disabledDates() {
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDays.forEach((booking) => {
            const checkInMoment = moment(booking.CheckIn).startOf('days');
            const checkOutMoment = moment(booking.CheckOut).startOf('days');
            const diff = checkOutMoment.diff(checkInMoment,'days');

            this.disabledDatesIn.push(checkInMoment.format('MM/DD/YYYY'));
            this.disabledDatesOut.push(checkOutMoment.format('MM/DD/YYYY'));
            for(let i = 1; i < diff; i++) {
                this.disabledDatesIn.push(checkInMoment.add(1, 'day').format('MM/DD/YYYY'));
                this.disabledDatesOut.push(checkOutMoment.add(-1, 'day').format('MM/DD/YYYY'));
            }
        });
    }


    toggleCalendarView() {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    }

    saveForm(formData) {
        formData.EntryType = formData.EntryType.Id;

        if(formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(
                d => {
                    _.replace(this.bookingDays, { Id: formData.Id }, d);
                    this.UpdateBlock = !this.UpdateBlock;
                },
                e => {
                    console.log('Error save availability', e);
                }
            );
        } else {
            this.calendarService.addCalendar(formData).subscribe(
                d => {
                    this.bookingDays.push(d);
                    this.UpdateBlock = !this.UpdateBlock;
                },
                e => {
                    console.log('Error save availability', e);
                }
            );
        }
        console.log("save form", formData)
    }

    handlerEditAvailability(id) {
        this.calendarService.getCalendar(id).subscribe(
            d => {
                this.availabilityForm = new FormGroup({
                    Id: new FormControl(d.Id),
                    PropertyId: new FormControl(this.propertyId),
                    CheckIn: new FormControl(d.CheckIn),
                    CheckOut: new FormControl(d.CheckOut),
                    EntryType: new FormControl(d.EntryType),
                    Notes: new FormControl(d.Notes),
                });

                this.isCalendarView = true;
                if (this.UpdateBlock === null) {
                    this.UpdateBlock = true;
                } else {
                    this.UpdateBlock = !this.UpdateBlock;
                }
            },
            e => {
                console.log('Error availability', e);
            }
        );

        //     this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //         this.bookingDays[this.bookingDays.length - 1].CheckIn = data;
        //     });
        //
        //     this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //         this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        //     })
    }

    handlerDeleteAvailability(id) {
        this.bookingDays = _.remove(this.bookingDays, (o) => {
            return o.Id != id;
        });
        this.calendarService.deleteAvailability(id).subscribe(
            d => {
                console.log('Deleted Availability  ', d);
            },
            e => {
                console.log('Deleted Availability ERROR', e);

            }
        )
    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

}
