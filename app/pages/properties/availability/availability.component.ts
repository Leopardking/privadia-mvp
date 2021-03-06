import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { CalendarService } from "../../../providers/calendar/calendar.service";
import { LookupsService } from "../../../providers/lookups/lookups.service";
import {handlerErrorFieds, handlerErrorNotify, handlerSuccessMessage} from "../../../helpers/helpers";
import {LoginService} from "../../../providers/login/login.service";

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
        CheckIn: new FormControl(null),
        CheckOut: new FormControl(null),
        EntryType: new FormControl({
            Id: 1,
            Name: 'Internal Booking',
        }),
        Notes: new FormControl(null),
        Reference: new FormControl(null, Validators.required),
        ViaAgency: new FormControl(null),
        ClientFirstName: new FormControl(null),
        ClientLastName: new FormControl(null),
        ClientTel: new FormControl(null),
        ClientEmail: new FormControl(null),
        AgencyCompanyName: new FormControl(null),
        AgentName: new FormControl(null),
        AgentTel: new FormControl(null),
        AgentEmail: new FormControl(null)
    });

    private propertyId: any;

    private calendarEntryTypes: Array<{ Id: number, Name: string }>;
    private bookingDays;
    private bookingDaysClear;
    private isCalendarView: boolean = true;


    private UpdateBlock: boolean = false;
    private disabledDatesIn: any;
    private disabledDatesOut: any;

    public maxDate: any;
    public minDate: any;

    public role = false;

    public maxDatePicker: any;
    public minDatePicker: any;

    private isAgent: boolean;
    private errorForm: boolean;

    constructor ( private route: ActivatedRoute,
                  public propertiesService: PropertiesService,
                  public lookupsService: LookupsService,
                  public calendarService: CalendarService,
                  private builder: FormBuilder,
                  private loginService: LoginService) {

        this.isAgent = this.loginService.getRoles('Agent');

        route.params.subscribe(params => {
            this.propertyId = params['id'];
            this.availabilityForm.controls['PropertyId'].patchValue(this.propertyId);

            propertiesService.readDataProperty(params['id']);

            lookupsService.getCalendarEntryTypes().subscribe(
                d => {
                    this.calendarEntryTypes = d
                },
                e => {
                    handlerErrorNotify('Error ');
                    console.log('Error   calendarEntryTypes', e);
                }
            );

            calendarService.getCalendarByProperty(this.propertyId).subscribe(
                d => {
                    this.bookingDays = _.clone(d);
                    this.bookingDaysClear = _.clone(d);
                },
                e => {
                    console.log('Error calendar  ', e);
                }
            );
        });
    }

    ngOnInit() {}

    // private CheckIn  = moment().startOf('days');
    // private CheckOut = moment(this.CheckIn).add(1, 'day').startOf('days');
    private CheckIn ;
    private CheckOut;
    public handlerUpdateDate(value, CheckOut = null, init = null) {
        this.CheckIn = moment(value, 'DD/MM/YYYY').startOf('days');

        if(CheckOut)
            this.CheckOut = moment(CheckOut, 'DD/MM/YYYY');
        else if(!this.role)
            this.CheckOut = moment(this.CheckIn.format('DD/MM/YYYY'), 'DD/MM/YYYY').add(1, 'day');

        setTimeout(() => {
            $('.checkIn').data("DateTimePicker")
                .minDate(moment().format('DD/MM/YYYY'));
            $('.checkOut').data("DateTimePicker")
                .minDate(false)
                .maxDate(false);
        },10980);


        const nextDate = _(this.bookingDays);
        nextDate.next();

        // console.log('bookingDays', this.bookingDays);
        this.bookingDays.some((booking, index) => {
            const tmpNextDate = nextDate.next();

            const tmpStart = moment(booking.CheckIn).startOf('days');
            const tmpEnd   = moment(booking.CheckOut).startOf('days');

            const tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
            const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');

            if(index === 0 && this.CheckOut.isSameOrBefore(tmpStart)) {
                this.minDatePicker = this.CheckIn.clone().add(1, 'days');
                this.maxDatePicker = tmpStart.clone();
                return true;
            } else if(this.CheckOut.isBetween(tmpStart, tmpEnd, null, '(]')) {
                this.CheckIn = tmpEnd.clone();
                this.CheckOut = tmpEnd.add(1, 'days').clone();

                this.minDatePicker = this.CheckIn.clone();
                this.maxDatePicker = tmpNextStart.clone();

                if(this.CheckOut.isSameOrBefore(tmpNextStart) || tmpNextDate.done) {
                    return true;
                } else {
                    this.minDatePicker = this.CheckIn.clone().add(1, 'days');
                    this.maxDatePicker = tmpNextStart.clone();
                    return false;
                }
            } else if(this.CheckIn.isSameOrAfter(tmpEnd) && this.CheckOut.isSameOrBefore(tmpNextStart)) {
                this.minDatePicker = this.CheckIn.clone().add(1, 'days');
                this.maxDatePicker = tmpNextStart.clone();
                return false;
            } else {
                this.minDatePicker = this.CheckIn.clone().add(1, 'days');
                return false;
            }

        });
        setTimeout(() => {
            if(this.maxDatePicker && this.maxDatePicker.isSameOrBefore((this.minDatePicker)))
                this.maxDatePicker = false;
            if (!init) {
                $('.checkOut').data("DateTimePicker")
                    .minDate(this.minDatePicker.format('DD/MM/YYYY'))
                    .maxDate(this.maxDatePicker && this.maxDatePicker.format('DD/MM/YYYY') || false);
            }
        },990);
        this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('DD/MM/YYYY'));
        this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('DD/MM/YYYY'));
        if (init) {
            this.availabilityForm.controls['CheckIn'].patchValue(null);
            this.availabilityForm.controls['CheckOut'].patchValue(null);
        }
    };

    toggleUpdateBlock() {
        this.availabilityForm.reset()
        this.UpdateBlock = !this.UpdateBlock;
        this.bookingDays = this.bookingDaysClear;
        // this.calendarService.getCalendarByProperty(this.propertyId).subscribe(
        //     data => {
        //         this.bookingDays = data;
        //         this.bookingDaysClear = data;
        //         handlerSuccessMessage('New Availability Successfully Added');
        //         this.UpdateBlock = !this.UpdateBlock;
        //     },
        //     e => {
        //         handlerErrorNotify(`Error Message: ${e.Message}`);
        //     }
        // );
        switch (this.UpdateBlock) {
            case true:
                this.resetForm();
                this.disabledDates();
                this.handlerUpdateDate(this.CheckIn.format('DD/MM/YYYY'),null, true);
                break;
            case false:
                this.resetForm();
                break;
        }

        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
    }

    private disabledDates() {
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDays.forEach((booking) => {
            if(booking.Id) {
                const checkInMoment = moment(booking.CheckIn).startOf('days');
                const checkOutMoment = moment(booking.CheckOut).startOf('days');
                const diff = checkOutMoment.diff(checkInMoment,'days');

                this.disabledDatesIn.push(checkInMoment.format('MM/DD/YYYY'));
                this.disabledDatesOut.push(checkOutMoment.format('MM/DD/YYYY'));
                for(let i = 1; i < diff; i++) {
                    this.disabledDatesIn.push(checkInMoment.add(1, 'day').format('MM/DD/YYYY'));
                    this.disabledDatesOut.push(checkOutMoment.add(-1, 'day').format('MM/DD/YYYY'));
                }
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
        console.log('Form save',this.availabilityForm.value, formData);
        if(formData.EntryType.Id == 1 && !this.availabilityForm.valid) {
            handlerErrorNotify('There were errors with your submission, please see form for details.');
            this.errorForm = true;
            return false;
        }
        // fixes with dates
        formData.CheckIn = moment(formData.CheckIn, 'DD/MM/YYYY').format('YYYY-MM-DD');
        formData.CheckOut = moment(formData.CheckOut, 'DD/MM/YYYY').format('YYYY-MM-DD');
        // ----------------
        formData.EntryType = formData.EntryType.Id;
        if(formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(
                d => {
                    this.calendarService.getCalendarByProperty(this.propertyId).subscribe(
                        data => {
                            this.bookingDays = data;
                            this.bookingDaysClear = data;
                            handlerSuccessMessage('New Availability Successfully Added');
                            this.UpdateBlock = !this.UpdateBlock;
                        },
                        e => {
                            handlerErrorNotify(`Error Message: ${e.Message}`);
                        }
                    );
                },
                e => {
                    handlerErrorFieds(e, this.availabilityForm);
                    handlerErrorNotify(`Error Message: ${e.Message}`);
                }
            );
        } else {
            this.calendarService.addCalendar(formData).subscribe(
                d => {
                    this.calendarService.getCalendarByProperty(this.propertyId).subscribe(
                        data => {
                            this.bookingDays = data;
                            this.bookingDaysClear = data;
                            handlerSuccessMessage('New Availability Successfully Added');
                            this.UpdateBlock = !this.UpdateBlock;
                        },
                        e => {
                            handlerErrorNotify(`Error Message: ${e.Message}`);
                        }
                    );
                },
                e => {
                    handlerErrorFieds(e, this.availabilityForm);
                    handlerErrorNotify(`Error Message: ${e.Message}`);
                }
            );
        }
        console.log("save form", formData)
    }

    handlerEditAvailability(id) {
        this.availabilityForm.reset();
        this.role = true;

        this.calendarService.getCalendar(id).subscribe(
            d => {
                this.disabledDates();
                this.availabilityForm = new FormGroup({
                    Id: new FormControl(d.Id),
                    PropertyId: new FormControl(this.propertyId),
                    CheckIn: new FormControl(moment(d.CheckIn).format('DD/MM/YYYY')),
                    CheckOut: new FormControl(moment(d.CheckOut).format('DD/MM/YYYY')),
                    EntryType: new FormControl(d.EntryType),
                    Notes: new FormControl(d.Notes),
                    Reference: new FormControl(d.Reference || null),
                    ViaAgency: new FormControl(d.ViaAgency || null),
                    ClientFirstName: new FormControl(d.ClientFirstName || null),
                    ClientLastName: new FormControl(d.ClientLastName || null),
                    ClientTel: new FormControl(d.ClientTel || null),
                    ClientEmail: new FormControl(d.ClientEmail || null),
                    AgencyCompanyName: new FormControl(d.AgencyCompanyName || null),
                    AgentName: new FormControl(d.AgentName || null),
                    AgentTel: new FormControl(d.AgentTel || null),
                    AgentEmail: new FormControl(d.AgentEmail || null)
                });

                this.isCalendarView = true;

                // _.remove(this.bookingDays, (o) => {
                //     return o.Id == id;
                // });

                this.UpdateBlock = !this.UpdateBlock;

                this.disabledDates();
                this.handlerUpdateDate(moment(d.CheckIn).format('DD/MM/YYYY'), moment(d.CheckOut).format('DD/MM/YYYY'));
            },
            e => {
                console.log('Error availability', e);
            }
        );
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
                console.log('Deleted Availability ERROR ', e);

            }
        )
    }

    private resetForm() {
        this.CheckIn  = moment().startOf('days');
        this.availabilityForm.patchValue({
            CheckIn: null,
            CheckOut: null,
            PropertyId: this.propertyId,
            EntryType: {
                Id: 4,
                Name: 'Other',
            }
        });
    }
}