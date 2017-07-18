import { Component, OnInit } from '@angular/core';

import { BookingService } from '../../../providers/booking/booking.service';

import initDataTable = require('../../../../assets/js/init/initDataTable.js');
import {ActivatedRoute} from "@angular/router";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import {LoginService} from "../../../providers/login/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {handlerErrorNotify, handlerErrorFieds} from "../../../helpers/helpers";

declare const $: any;

@Component({
    moduleId: module.id,
    selector: ' booking-id-cmp ',
    templateUrl: 'booking-id.component.html',
    styleUrls: [ 'booking-id.component.css' ]
})

export class BookingIdComponent implements OnInit{
    private booking;

    private bookingForm = new FormGroup({
        BookingId: new FormControl(),
        ClientContactEmail: new FormControl(null, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
        Notes: new FormControl(),
    });

    constructor ( private bookingService: BookingService,
                  private enquiryService: EnquiryService,
                  private loginService: LoginService,
                  private route: ActivatedRoute) { }

    ngOnInit(){
        this.route.params.subscribe(params => {
            this.bookingService.readDataBookingById(params['id']);
            this.bookingForm.controls['BookingId'].setValue(params['id']);

            setTimeout(() => {
                this.bookingForm.controls['ClientContactEmail'].setValue(this.bookingService.booking.ClientContactEmail);
                this.bookingForm.controls['Notes'].setValue(this.bookingService.booking.Notes);
                this.enquiryService.readDataEnquiry(this.bookingService.booking.EnquiryMessageThreadId)
            }, 1000)
        });
    }
    
    private finishReading() {
        // initDataTable();
        // this.datatableInited = true;
    }

    private addBooking() {
        console.log('add');
    }

    private editBooking() {
        console.log('edit');
    }

    private cancelBooking() {
        console.log('Cancel booking');
    }

    private saveBooking() {
        console.log('Save booking', this.bookingForm);
        this.bookingService.updateBooking(this.bookingForm.value).subscribe(
            d => {
                $.notify({
                    icon: "notifications",
                    message: "Booking Updated Successfully"

                },{
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
            },
            e => {
                handlerErrorFieds(e, this.bookingForm);
                handlerErrorNotify('Error')
            }
        )
    }
}
