import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {PropertiesService} from "../../providers/properties/properties.service";
import {LookupsService} from "../../providers/lookups/lookups.service";

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
    public filterForm = new FormGroup ({});
    public openVilla;

    constructor ( private dashboardService: DashboardService,
                  private lookupsService: LookupsService,
                  public builder: FormBuilder) { }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        $('.modal').appendTo("body");
        /*
        setTimeout(()=> {
            $('.modal-content').perfectScrollbar();
        },100)
        */

        this.filterForm = this.builder.group({
            Bedrooms: new FormControl(),
            CheckIn: new FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            MaxRate: new FormControl(),
            MinRate: new FormControl(),
            OrderBy: new FormControl(),
            Regions: new FormArray([]),
            MetaDataFilters: new FormArray([]),
        });

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
        });
        this.filterForm.valueChanges.subscribe(
            d => {
                this.enquiryForm.controls['CheckIn'].setValue(d.CheckIn);
                this.enquiryForm.controls['CheckOut'].setValue(d.CheckOut);
            },
            e => {
                console.log('Error change form ', e)
            }
        )
        console.log('Open filter ', this);
    }

    public openEnquiry(villa: any) {
        console.log('onvoted ', villa);
        this.openVilla = villa;
    }

    /*
    public openEnquiry(villa) {
        console.log('Open filter ', this.filterForm.controls['CheckIn'].value);
        console.log('Open enquiry villa DASHBOARD', villa)
        this.openVilla = villa;
    }
    */
}
