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
    public filterForm = new FormGroup ({});
    public openVilla;
    public rentalQuote = 0;

    constructor ( private dashboardService: DashboardService,
                  private lookupsService: LookupsService,
                  private propertiesService: PropertiesService,
                  public builder: FormBuilder) { }

    ngOnInit(){
        localStorage.setItem('title', '');

        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        $('.modal').appendTo("body");

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
            PropertyId: new FormControl(),
            ClientFirstName: new FormControl(),
            ClientLastName: new FormControl(),
            CheckIn: new FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            Message: new FormControl(''),
        });

        /*
        this.filterForm.valueChanges.subscribe(
            d => {
                // this.enquiryForm.controls['CheckIn'].setValue(moment().add(6, 'day').format('MM/DD/YYYY'));
                // this.enquiryForm.controls['CheckOut'].setValue(moment().add(1, 'day').format('MM/DD/YYYY'));
                this.enquiryForm.controls['CheckIn'].setValue(d.CheckIn);
                this.enquiryForm.controls['CheckOut'].setValue(d.CheckOut);
            },
            e => {
                console.log('Error change form ', e)
            }
        )
        */
    }

    public openEnquiry(villa: any) {
        this.enquiryForm.reset();
        this.enquiryForm.controls['CheckIn'].setValue(this.filterForm.controls['CheckIn'].value);
        this.enquiryForm.controls['CheckOut'].setValue(this.filterForm.controls['CheckOut'].value);
        this.enquiryForm.controls['PropertyId'].setValue(villa.Id);
        this.propertiesService.getRentalQuote({
            PropertyId: villa.Id,
            CheckIn: this.filterForm.controls['CheckIn'].value,
            CheckOut: this.filterForm.controls['CheckOut'].value
        }).subscribe(
            d => {
                this.rentalQuote = Math.round(d * 100) / 100
                console.log('Quote',this.rentalQuote)
            },
            e => {
                console.log('Quote error', e)
            }
        )
        this.openVilla = villa;
    }
}
