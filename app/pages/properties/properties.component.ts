import { Component, OnInit } from '@angular/core';

//import { MainService } from './../../providers/homeservice';
import { DashboardService } from './../../providers/dashboard/dashboard.service';
import { PropertiesService } from './../../providers/properties/properties.service';
import {LoginService} from "../../providers/login/login.service";

declare const $:any;

//import initDataTable = require('../../../assets/js/init/initDataTable.js');

@Component({
    moduleId: module.id,
    selector: ' properties-cmp ',
    templateUrl: 'properties.component.html',
    styleUrls: [ 'properties.component.css' ]
})

export class PropertiesComponent implements OnInit{
    private datatableInited = false;

    constructor ( private propertiesService: PropertiesService, private loginService: LoginService ) {
        propertiesService.readDataProperties()
    }

    ngOnInit(){
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    }

    private finishReading() {
        let dataTableQuery: any = $('#datatables');
        const tableWidget = dataTableQuery.DataTable({
            bLengthChange: false,
            ordering: false,
            //searching: false,
            info: false,
        });
        $('#datatableSearch').on( 'keyup', function () {
            tableWidget.search( this.value ).draw();
        } );
        this.datatableInited = true;
    }

    private removeProperty(el) {
        this.propertiesService.deleteProperty(el.propertyId).subscribe(
            d => {
                this.propertiesService.properties.splice(el.index,1);
                console.log('Delete property ', d);
            },
            e => {
                this.propertiesService.properties.splice(el.index,1);
                // console.log("error:", e);
            }
        );
    }

    private addBooking() {
        console.log('add');
    }

    private editBooking() {
        console.log('edit');
    }

    public permitoins(Permissions) {

    }
}
