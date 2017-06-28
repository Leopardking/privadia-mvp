import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

declare const $:any;
declare const moment:any;

@Component({
    moduleId: module.id,
    selector: ' dashboard-cmp ',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit{
    public enquiryForm = new FormGroup ({});
    public proposalForm = new FormGroup ({});

    constructor ( private dashboardService: DashboardService, private builder: FormBuilder) { }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        $('.modal').appendTo("body");
        /*
        setTimeout(()=> {
            $('.modal-content').perfectScrollbar();
        },100)
        */

        this.enquiryForm = this.builder.group({
            FirstName: new FormControl(),
            LastName: new FormControl(),
            CheckIn: new FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            Message: new FormControl(),
        });

        this.proposalForm = this.builder.group({
            ClientName: new FormControl('Johnathan Robinson'),
            CheckIn: new FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            RentalPrice: new FormControl(1200),
            BookingPrice: new FormControl(1495),
        })
    }
}
