import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { CalendarService } from "../../../providers/calendar/calendar.service";
import { LookupsService } from "../../../providers/lookups/lookups.service";

declare const moment: any;
declare const $: any;
declare const _: any;

@Component({
    moduleId: module.id,
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit {
    private availabilityForm = new FormGroup({
        Id: new FormControl(null),
        PropertyId: new FormControl(null),
        CheckIn: new FormControl(moment().format('MM/DD/YYYY')),
        CheckOut: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
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
    private CheckIn = moment();
    private CheckOut = moment().add(1, 'day');
    private propertyId: any;

    private calendarEntryTypes: Array<{ Id: number, Name: string }>;
    private bookingDays;
    private isCalendarView: boolean = true;


    private UpdateBlock: boolean = null;
    private disabledDatesIn: any;
    private disabledDatesOut: any;

    constructor ( private route: ActivatedRoute,
                  public propertiesService: PropertiesService,
                  public lookupsService: LookupsService,
                  public calendarService: CalendarService,
                  private builder: FormBuilder) {
        route.params.subscribe(params => {
            this.propertyId = params['id'];
            this.availabilityForm.controls['PropertyId'].patchValue(this.propertyId);

            propertiesService.readDataProperty(params['id']);

            lookupsService.getCalendarEntryTypes().subscribe(
                d => {
                    this.calendarEntryTypes = d
                },
                e => {
                    console.log('Error calendarEntryTypes', e);
                }
            );

            calendarService.getCalendarByProperty(this.propertyId).subscribe(
                d => {
                    this.bookingDays = d;
                    this.bookingDays.every((booking, index) => {
                        const tmpStart = moment(booking.CheckIn);
                        const tmpEnd   = moment(booking.CheckOut);

                        if(index === 0 && this.CheckIn < tmpStart && this.CheckOut <= tmpStart) {
                            this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('MM/DD/YYYY'));
                            this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('MM/DD/YYYY'));
                            return true;
                        }
                        if(this.CheckIn > tmpStart && this.CheckIn >= tmpEnd) {
                            this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('MM/DD/YYYY'));
                            return true
                        }

                    });
                },
                e => {
                    console.log('Error calendar', e);
                }
            )
        });
    }

    ngOnInit(){ }

    toggleUpdateBlock() {
        if (this.UpdateBlock === null) {
            this.disabledDates();
            this.UpdateBlock = true;
        } else {
            // this.disabledDates();
            this.UpdateBlock = !this.UpdateBlock;
            // this.bookingDays[this.bookingDays.length - 1].CheckIn = null;
            // this.bookingDays[this.bookingDays.length - 1].CheckOut = null;
            // console.log('toggle ', this.UpdateBlock,this.bookingDays)
        }


        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }

        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
            // this.availabilityForm.controls['CheckOut'].patchValue(moment(data).add(1,'day').format('MM/DD/YYYY'));
            this.disabledDatesIn.some((disabledDate) => {
                if(moment(data).add(1,'day').diff(moment(disabledDate), 'days') <= 0) {
                    setTimeout(() => {
                        console.log('Disabled date 100 IF',);
                        $('.checkOut').data("DateTimePicker")
                                      .minDate(moment(data).add(1,'day').format('MM/DD/YYYY'))
                                      .maxDate(moment(disabledDate).format('MM/DD/YYYY'));
                    }, 100);
                    return true;
                }
                else {
                    setTimeout(() => {
                        console.log('Disabled date 100 ELSE',);
                        $('.checkOut').data("DateTimePicker").maxDate(false);
                    }, 100);
                }
            });

            setTimeout(() => {
                console.log('Disabled date',);
                $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1,'day').format('MM/DD/YYYY'));
            }, 200);

            const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
            if(index < 0) {
                console.log('if',);
                this.bookingDays.push(this.availabilityForm.value);
            }
            else {
                console.log('else',);
                this.bookingDays[index] = this.availabilityForm.value;
            }
            // console.log('Booking Days CheckIN ',this.bookingDays);
        });


        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
            // this.availabilityForm.controls['CheckIn'].patchValue(moment(data).add(-1,'day').format('MM/DD/YYYY'));
            // const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
            // if(index < 0)
            //     this.bookingDays.push(this.availabilityForm.value);
            // else
            //     this.bookingDays[index] = this.availabilityForm.value;
            // console.log('Booking Days CheckIN after', this.availabilityForm.value);
            // console.log('Booking Days CheckOUT ',this.bookingDays);
            // this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        })
        // console.log('Data update ', data);
        // console.log('Booking update ', _.unionBy(this.bookingDays, data, 'Id'));
        // console.log('Booking update ', this.bookingDays);
    }

    private disabledDates() {
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDays.forEach((booking) => {
            const checkInMoment = moment(booking.CheckIn);
            const checkOutMoment = moment(booking.CheckOut);
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
        // formData.EntryType = 4;
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
