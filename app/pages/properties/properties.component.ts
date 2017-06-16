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
    private datatableInited = false;

    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService ) {}

    ngOnInit(){}
    
    private finishReading() {
        let dataTableQuery: any = $('#datatables');
        let tableWidget = dataTableQuery.DataTable({
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        $('#datatableSearch').on( 'keyup', function () {
            tableWidget.search( this.value ).draw();
        } );
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
