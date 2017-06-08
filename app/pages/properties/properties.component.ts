import { Component, OnInit } from '@angular/core';

import { MainService } from '../../providers/homeservice';


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
    private tableWidget: any;

    //private properties = [];
    private addPropertyLink = "addproperty";


    constructor ( private mainService: MainService) {}

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
    }
    
    private finishReading() {
        let DataTable: any = $('#datatables');
        this.tableWidget = DataTable.DataTable({
            //select: true,
            //paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    }

    private addBooking() {
        console.log('add');
    }

    private editBooking() {
        console.log('edit');
    }
}
