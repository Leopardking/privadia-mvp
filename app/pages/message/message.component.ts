import { Component, OnInit } from '@angular/core';

declare const $:any;

@Component({
    moduleId: module.id,
    selector: 'message-cmp ',
    templateUrl: 'message.component.html',
    styleUrls: [ 'message.component.css' ]
})

export class MessageComponent implements OnInit{
    constructor ( ) { }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        setTimeout(()=> {
            let dataTableQuery: any = $('#datatables');
            const tableWidget = dataTableQuery.DataTable({
                bLengthChange: false,
                ordering: false,
                info: false,
            });
        }, 10)
    }
}
