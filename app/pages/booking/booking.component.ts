import { Component, OnInit } from '@angular/core';

import { BookingService } from '../../providers/booking/booking.service';

import initDataTable = require('../../../assets/js/init/initDataTable.js');

@Component({
    moduleId: module.id,
    selector: ' booking-cmp ',
    templateUrl: 'booking.component.html',
    styleUrls: [ 'booking.component.css' ]
})

export class BookingComponent implements OnInit{
    private reading = true;
    private datatableInited = false;
    
    private bookings = [];

    private bookingTable = "";

    constructor ( private bookingService: BookingService) {
    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
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
