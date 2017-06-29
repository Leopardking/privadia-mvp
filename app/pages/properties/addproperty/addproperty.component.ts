import {Component, OnInit, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { PropertiesService } from '../../../providers/properties/properties.service';
import * as _ from 'lodash'
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {LoginService} from "../../../providers/login/login.service";
declare const $:any;
//declare const _:any;

@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit, AfterViewInit{
    // private isActive = true;
    private isLoad = true;
    private errorForm = false;
    private sending = false;

    public propertyForm = new FormGroup ({
        Active: new FormControl(true),
        OwnerName: new FormControl(),
        InternalName: new FormControl(),
        Name: new FormControl(null, Validators.required),
        Address: new FormControl(),

        RegionId: new FormControl(),
        RegionName: new FormControl(),
        Region: new FormControl({
            Id: 1,
            Name: 'Ibiza',
        }),
        ManagementCompanyId: new FormControl(),
        ManagementCompanyName: new FormControl(),
        ManagementCompany: new FormControl({
            Id: null,
            Name: null,
        }),
        ManagerUserId: new FormControl(),
        ManagerUserName: new FormControl(),
        ManagerUser: new FormControl({
            Id: null,
            Name: null,
        }),
        Headline: new FormControl(),
        Summary: new FormControl(),
        Description: new FormControl(),
        OtherInfo: new FormControl(),
        CollaboratorInitials: new FormControl(),
        BoxUrl: new FormControl(null, Validators.pattern('https?://.+')),
        AgencyPackUrl: new FormControl(null, Validators.pattern('https?://.+')),
        Bathrooms: new FormControl(null, Validators.required),
        Bedrooms: new FormControl(null, Validators.required),
        Sleeps: new FormControl(null, Validators.required),
        Capacity: new FormControl(null),
        LivingAreaSize: new FormControl(null),
        DiningCapacity: new FormControl(null),
        KitchenInfo: new FormControl(),
        ChildrenAllowed: new FormControl(0),
        SmokingAllowed: new FormControl(false),
        WheelchairAccessible: new FormControl(false),
        PetsAllowed: new FormControl(false),
        EventsAllowed: new FormControl(false),
        Contacts: new FormArray([]),
        Rooms: new FormArray([]),
        Images: new FormArray([]),
        MinimumStay: new FormControl(0, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
        PointsOfInterest: new FormArray([]),
        MetaData: new FormArray([]),
        MetaDataTmp: new FormGroup({}),
        OtherHousekeepingInfo: new FormControl(),
        Housekeeping: new FormControl(0),
        LiftAvailable: new FormControl(false),
        Benefits: new FormControl(),
    });

    constructor ( private router:Router,
                  private propertiesService: PropertiesService,
                  private lookupsService: LookupsService,
                  private builder: FormBuilder ) {

        propertiesService.getDataEmptyProperty();
        lookupsService.getDataCompanies();
        lookupsService.getDataManagers();
        console.log('Form init',this.propertiesService)
    }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        setTimeout(() => {
            $('.property-tabs a:first').tab('show')

            $('button[data-toggle="tab"]').click((e)=>{
                if(this.propertyForm.valid) {
                    const target = $(e.target).attr("href");
                    $('a[href="' + target+ '"]').tab('show');
                    e.preventDefault()
                }
                else {
                    this.errorForm = true;
                    e.stopPropagation()
                }
            });
        });
    }

    ngAfterViewInit () {
    }

    setRegion(region) {
        const regionFGs = this.builder.group({
            Id: [region.RegionId],
            Name: [region.RegionName]
        });

        this.propertyForm.setControl('Region', regionFGs);
    }

    private continueInfo() {
        console.log('Continue Info form')
    }

    private discardInfo() {
        console.log('Discard Info form')
    }

    private onSubmit() {
        console.log('Sub',this.propertyForm.value)
        /*
        let newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, (el) => {
            return newArr = _.concat(newArr, el)
        })
        this.propertyForm.value.MetaData = newArr;

        if(this.propertyForm.valid) {
            this.sending = true;

            this.propertiesService.addProperty(this.propertyForm.value).subscribe(
                d => {
                    $.notify({
                        icon: "notifications",
                        message: "Property Added Successfully"

                    },{
                        type: 'success',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });

                    this.router.navigate(['properties']);
                    this.sending = false;

                    //this.dashboardService.readData();
                },
                e => { console.log("error:", e); }
            );
        } else {
            this.errorForm = true
        }
        */
    }
}
