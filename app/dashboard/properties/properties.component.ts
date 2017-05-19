import { Component, OnInit } from '@angular/core';

import { PropertiesService } from '../../../app/services/properties/properties.service';

import initDataTable = require('../../../assets/js/init/initDataTable.js');

@Component({
    moduleId: module.id,
    selector: ' properties-cmp ',
    templateUrl: 'properties.component.html',
    styleUrls: [ 'properties.component.css' ]
})

export class PropertiesComponent implements OnInit{
    private reading = true;
    private datatableInited = false;
    
    private properties = [];

    constructor ( private propertyService: PropertiesService) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){

        //------------------    Reading data of properties        -----------------/
        this.propertyService.getAllProperties().subscribe(
            d => {
                this.properties = d;
                this.reading = false;
                this.datatableInited = false;
            },
            e => {
                console.log("error: ", e);
                this.reading = false;
            }
        );
    }
    
    private finishReading() {
        initDataTable();
        this.datatableInited = true;
    }

    private addBooking() {
        console.log('add');
    }

    private editBooking() {
        console.log('edit');
    }
}
