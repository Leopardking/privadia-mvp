import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");
import { EnquiryService } from "../../../providers/enquery/enquiry.service";
import {PropertiesService} from "../../../providers/properties/properties.service";

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'enquiry-cmp',
    templateUrl: 'enquiry.component.html',
    styleUrls: ['enquiry.component.css']
})

export class EnquiryComponent implements OnInit {
    public enquiryId: any;

    constructor( private route: ActivatedRoute,
                 private enquiryService: EnquiryService,
                 private propertiesService: PropertiesService ) {
        route.params.subscribe(params => {
            this.enquiryId = params['id'];
            enquiryService.readDataEnquiry(params['id'])
        })
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

        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    }
}
