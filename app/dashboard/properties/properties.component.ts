import { Component, OnInit } from '@angular/core';

import { MainService } from '../../../app/services/homeservice';


import initDataTable = require('../../../assets/js/init/initDataTable.js');

@Component({
    moduleId: module.id,
    selector: ' properties-cmp ',
    templateUrl: 'properties.component.html',
    styleUrls: [ 'properties.component.css' ]
})

export class PropertiesComponent implements OnInit{
    private addproperty = false;

    private datatableInited = false;
    
    private properties = [];
    private addPropertyLink = "addproperty";


    constructor ( private mainService: MainService) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){

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
