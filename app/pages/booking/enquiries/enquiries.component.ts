import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

declare const $:any;

@Component({
    moduleId: module.id,
    selector: 'enquiries-cmp',
    templateUrl: 'enquiries.component.html',
    styleUrls: [ 'enquiries.component.css' ]
})

export class EnquiriesComponent implements OnInit{
    constructor ( private router: Router, private enquiryService: EnquiryService) {
        console.log('Load Enquiry Module');
        enquiryService.readDataEnquiries();
    }

    ngOnInit(){
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    }
}
