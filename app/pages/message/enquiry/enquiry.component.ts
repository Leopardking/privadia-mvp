import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

declare const $: any;
declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'enquiry-cmp',
    templateUrl: 'enquiry.component.html',
    styleUrls: ['enquiry.component.css']
})

export class EnquiryComponent implements OnInit {
    constructor( private router: Router,private route: ActivatedRoute,
                 private enquiryService: EnquiryService) {
        console.log('Load enquiry Module', EnquiryService);
        // router.events.subscribe((val) => {
        //     console.log('Load route', val);
        //     const hash = window.location.hash;
        //     hash && $('ul.nav a[href="' + hash + '"]').tab('show');
        //     enquiryService.readDataEnquiry(val)
        // });
        route.params.subscribe(params => {
                enquiryService.readDataEnquiry(params['id'])
            }
        )
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
        /*
        setTimeout(() => {
            let dataTableQuery: any = $('#datatables');
            const tableWidget = dataTableQuery.DataTable({
                bLengthChange: false,
                ordering: false,
                info: false,
            });
        }, 10);*/
    }
}
