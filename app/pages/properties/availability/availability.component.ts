import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PropertiesService } from '../../../providers/properties/properties.service';
import {CalendarService} from "../../../providers/calendar/calendar.service";

declare const moment:any;
declare const $:any;

@Component({
    moduleId: module.id,
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit {
    public availabilityForm = new FormGroup({});
    public CheckIn = moment();
    public CheckOut = moment().add(1, 'day');

    private UpdateTypeList: Array<{ Id: number, Name: string }>;
    private UpdateBlock: boolean = null;
    private isCalendarView: boolean = true;
    private disabledDatesIn: any;
    private disabledDatesOut: any;
    private maxDate: any;

    private data = {
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
    public bookingDays;

    public bookingDayss = [
        {startDay: '08/16/2017', endDay: '08/19/2017', Type: 'external'},
        {startDay: '08/20/2017', endDay: '08/26/2017', Type: 'other'},
        {startDay: '08/26/2017', endDay: '08/31/2017', Type: 'external'},
        {startDay: '09/02/2017', endDay: '09/10/2017', Type: 'internal'},
        {startDay: null, endDay: null, Type: 'external'},
    ];

    constructor ( public propertiesService: PropertiesService,
                  public calendarService: CalendarService,
                  private builder: FormBuilder) {
        calendarService.getCalendarByProperty(2).subscribe(
            d => {
                this.bookingDays = d;
                console.log('booking ', d, this.bookingDays, this.bookingDayss);
                this.bookingDays.every((booking, index) => {
                    const tmpStart = moment(booking.CheckIn);
                    const tmpEnd   = moment(booking.CheckOut);

                    if(index === 0 && this.CheckIn < tmpStart && this.CheckOut <= tmpStart) {
                        this.data.CheckIn = this.CheckIn.format('MM/DD/YYYY');
                        this.data.CheckOut = this.CheckOut.format('MM/DD/YYYY');
                        return true;
                    }
                    console.log(index)
                    if(this.CheckIn > tmpStart && this.CheckIn >= tmpEnd) {
                        this.data.CheckIn = this.CheckIn.format('MM/DD/YYYY');
                        return true
                    }

                });
                this.bookingDays.push({
                    CheckIn: null,
                    CheckOut:null,
                    EntryType: 4,
                    EntryTypeDesc: "Other",
                    Id: null,
                    Notes: "Internal Test"
                })

            },
            e => {
                console.log('Error calendar', e);
            }
        )
    }

    ngOnInit(){
        let nowDate = moment();
        let CheckIn = moment();
        let CheckOut = moment().add(1, 'day');

        this.UpdateTypeList = [
            {Id: 1, Name: 'Internal Booking'},
            {Id: 2, Name: 'External Booking'},
            {Id: 3, Name: 'Owner Present'},
            {Id: 4, Name: 'Not Available for Rent'},
            {Id: 5, Name: 'Other'}
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
    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

    public initForm(data) {

        this.availabilityForm.reset();
        this.availabilityForm = this.builder.group({
            CheckIn: new FormControl(data.CheckIn),
            CheckOut: new FormControl(data.CheckOut),
            UpdateType: new FormControl({
                Id: data.UpdateType.Id,
                Name: data.UpdateType.Name,
            }),
            Notes: new FormControl(data.Notes),
            isAgency: new FormControl(data.isAgency),
            FirstName: new FormControl(data.FirstName),
            LastName: new FormControl(data.LastName),
            Email: new FormControl(data.Email),
            Phone: new FormControl(data.Email),
            CompanyName: new FormControl(data.CompanyName),
            ContactName: new FormControl(data.ContactName),
            AgencyEmail: new FormControl(data.AgencyEmail),
            AgencyPhone: new FormControl(data.AgencyPhone)
        });
    }

    toggleUpdateBlock() {
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

        if (this.UpdateBlock === null) {
            this.UpdateBlock = true;
        } else {
            this.UpdateBlock = !this.UpdateBlock;
            this.bookingDays[this.bookingDays.length - 1].CheckIn = null;
            this.bookingDays[this.bookingDays.length - 1].CheckOut = null;
            console.log('toggle ', this.UpdateBlock,this.bookingDays)
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
            this.bookingDays[this.bookingDays.length - 1].CheckIn = data;
            this.bookingDays[this.bookingDays.length - 1].CheckOut = moment(data).add(1,'day').format('MM/DD/YYYY');
            this.disabledDatesIn.some((disabledDate) => {
                if(moment(this.bookingDays[this.bookingDays.length - 1].CheckOut).diff(moment(disabledDate), 'days') <= 0) {
                    setTimeout(() => {
                        $('.checkOut').data("DateTimePicker")
                                      .minDate(moment(data).add(1,'day').format('MM/DD/YYYY'))
                                      .maxDate(moment(disabledDate).format('MM/DD/YYYY'));
                    }, 500);
                    return true;
                }
                else {
                    $('.checkOut').data("DateTimePicker").maxDate(false);
                }
            });

            setTimeout(() => {
                $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1,'day').format('MM/DD/YYYY'));
            }, 600);
        });

        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
            this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        })
    }

    handlerEditAvailability(data) {
        const dataForm = {
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
        } else {
            this.UpdateBlock = !this.UpdateBlock;
        }

        this.initForm(dataForm);
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
            this.bookingDays[this.bookingDays.length - 1].CheckIn = data;
        });

        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
            this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        })
    }

    toggleCalendarView() {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    }

    saveForm() {
        console.log("save form", this.availabilityForm)
    }

    changeDate() {
        console.log('changeDate ',this.availabilityForm)
    }
}
