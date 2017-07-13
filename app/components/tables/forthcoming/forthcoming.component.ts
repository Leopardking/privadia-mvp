import { Component, OnInit, Input } from '@angular/core';
import {LoginService} from "../../../providers/login/login.service";

declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'forthcoming-table-cmp ',
    templateUrl: 'forthcoming.component.html',
    styleUrls: [ 'forthcoming.component.css' ]
})  

export class ForthcomingTableComponent implements OnInit{
    @Input() data;
    private datatableInited = false;

    constructor( private loginService: LoginService ) { }

	ngOnInit() {
        setTimeout(() => {
            console.log('data ', this.data)
        }, 1500)
    }

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