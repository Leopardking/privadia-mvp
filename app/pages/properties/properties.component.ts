import { Component, OnInit } from '@angular/core';

import { MainService } from './../../providers/homeservice';
import { PropertiesService } from './../../providers/properties/properties.service';


//import initDataTable = require('../../../assets/js/init/initDataTable.js');

@Component({
    moduleId: module.id,
    selector: ' properties-cmp ',
    templateUrl: 'properties.component.html',
    styleUrls: [ 'properties.component.css' ]
})

export class PropertiesComponent implements OnInit{
    // private addproperty = false;

    private datatableInited = false;
    private tableWidget: any;

    //private properties = [];
    //private addPropertyLink = "addproperty";


    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService ) {}

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

    private removeProperty(el) {
        this.propertyService.deleteProperty(el.propertyId).subscribe(
            d => {
                this.mainService.properties.splice(el.index,1);
                console.log('Delete property ', d);
            },
            e => { console.log("error:", e); }
        );
    }

    private addBooking() {
        console.log('add');
    }

    private editBooking() {
        console.log('edit');
    }
}
