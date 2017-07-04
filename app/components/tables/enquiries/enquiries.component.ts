import { Component, OnInit, Input } from '@angular/core';

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

    constructor( ) { }

	ngOnInit() {

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
        return moment(date).format(format);
    }
}