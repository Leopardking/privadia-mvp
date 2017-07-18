import { Component, OnInit } from '@angular/core';

import { BookingService } from '../../../providers/booking/booking.service';

import initDataTable = require('../../../../assets/js/init/initDataTable.js');
import {ActivatedRoute} from "@angular/router";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

@Component({
    moduleId: module.id,
    selector: ' booking-id-cmp ',
    templateUrl: 'booking-id.component.html',
    styleUrls: [ 'booking-id.component.css' ]
})

export class BookingIdComponent implements OnInit{
    private booking;

    constructor ( private bookingService: BookingService,
                  private enquiryService: EnquiryService,
                  private route: ActivatedRoute) { }

    ngOnInit(){
        this.route.params.subscribe(params => {
            this.bookingService.readDataBookingById(params['id']);
            setTimeout(() => {
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
}
