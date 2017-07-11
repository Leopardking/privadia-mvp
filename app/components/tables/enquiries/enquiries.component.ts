import { Component, OnInit, Input } from '@angular/core';
import {LoginService} from "../../../providers/login/login.service";

declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'enquiries-table-cmp ',
    templateUrl: 'enquiries.component.html',
    styleUrls: [ 'enquiries.component.css' ]
})  

export class EnquiriesTableComponent implements OnInit{
    @Input() data;
    private datatableInited = false;

    constructor( private loginService: LoginService ) { }

	ngOnInit() { }

    public finishReading() {
        let dataTableQuery: any = $('#datatables');
        dataTableQuery.DataTable({
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    }

    private dateFormat(date, format) {
        return moment.utc(date).local().format(format);
    }
}