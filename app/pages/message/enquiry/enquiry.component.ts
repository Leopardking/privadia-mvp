import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");

declare const $: any;
declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'enquiry-cmp',
    templateUrl: 'enquiry.component.html',
    styleUrls: ['enquiry.component.css']
})

export class EnquiryComponent implements OnInit {
    constructor(private router: Router) {
        router.events.subscribe((val) => {
            const hash = window.location.hash;
            hash && $('ul.nav a[href="' + hash + '"]').tab('show');
        });
    }

    ngOnInit() {
        initDatetimepickers();

        setTimeout(()=> {
            const selectQuery = $(".selectpicker");

            selectQuery.selectpicker();

            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.inner').perfectScrollbar();
            });
        }, 10)

        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });

        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        setTimeout(() => {
            let dataTableQuery: any = $('#datatables');
            const tableWidget = dataTableQuery.DataTable({
                bLengthChange: false,
                ordering: false,
                info: false,
            });
        }, 10);
    }
}
