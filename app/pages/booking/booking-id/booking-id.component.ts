import { Component, OnInit } from '@angular/core';

import { BookingService } from '../../../providers/booking/booking.service';

import initDataTable = require('../../../../assets/js/init/initDataTable.js');

@Component({
    moduleId: module.id,
    selector: ' booking-id-cmp ',
    templateUrl: 'booking-id.component.html',
    styleUrls: [ 'booking-id.component.css' ]
})

export class BookingIdComponent implements OnInit{
    private booking;

    constructor ( private bookingService: BookingService) { }

    ngOnInit(){
        this.bookingService.getDataBookings();
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
