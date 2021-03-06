import {Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { PropertiesService } from '../../../providers/properties/properties.service';
import * as _ from 'lodash'
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {LoginService} from "../../../providers/login/login.service";
import {handlerErrorFieds, handlerErrorNotify, handlerSuccessMessage} from "../../../helpers/helpers";

declare const $:any;
//declare const _:any;

@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit {
    // private isActive = true;
    private isLoad = true;
    private errorForm = false;
    private sending = false;
    private role = !this.loginService.getRoles('Admin');

    public propertyForm = new FormGroup ({
        Active: new FormControl(true),
        InternalName: new FormControl(),
        // OwnerUser: new FormControl(),
        Name: new FormControl(null),
        AddressLine1: new FormControl(),
        AddressLine2: new FormControl(),
        AddressPostalCode: new FormControl(),
        AddressCountry: new FormControl(),
        Longitude: new FormControl(null, Validators.pattern(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)),
        Latitude: new FormControl(null, Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/)),
        Region: new FormControl({
            Id: '',
            Name: '',
        }),
        ManagementCompany: new FormControl({
            value: {
                Id: null,
                Name: null,
            }
        }),
        ManagerUser: new FormControl({
            Id: null,
            Name: null,
        }),
        OwnerUser: new FormControl({
            Id: null,
            Name: null,
        }, Validators.required),
        Headline: new FormControl(),
        Summary: new FormControl(),
        Description: new FormControl(),
        OtherInfo: new FormControl(),
        // CollaboratorInitials: new FormControl(),
        PropertyUrl: new FormControl(null, Validators.pattern('https?://.+')),
        PropertyAssetsUrl: new FormControl(null, Validators.pattern('https?://.+')),
        Bathrooms: new FormControl(null),
        Bedrooms: new FormControl(null),
        Sleeps: new FormControl(null),
        Capacity: new FormControl(null),
        LivingAreaSize: new FormControl(null),
        DiningCapacity: new FormControl(null),
        KitchenInfo: new FormControl(),
        ChildrenAllowed: new FormControl(null),
        SmokingAllowed: new FormControl(null),
        WheelchairAccessible: new FormControl(null),
        PetsAllowed: new FormControl(null),
        // PetsConsidered: new FormControl(false),
        EventsAllowed: new FormControl(null),
        Contacts: new FormArray([]),
        Rooms: new FormArray([]),
        Images: new FormArray([]),
        MinimumStay: new FormControl(0, Validators.pattern('^[0-9]*$')),
        PointsOfInterest: new FormArray([]),
        MetaData: new FormArray([]),
        MetaDataTmp: new FormGroup({}),
        OtherHousekeepingInfo: new FormControl(),
        Housekeeping: new FormControl(0),
        // LiftAvailable: new FormControl(false),
        Benefits: new FormControl(),

        PropertyType: new FormControl({Id: 1, Name: 'Villa'})
    });

    constructor ( private router:Router,
                  private loginService: LoginService,
                  private propertiesService: PropertiesService ) {
        propertiesService.readDataMetadata();
        propertiesService.readDataOwners();
        propertiesService.readDataRegions();
        propertiesService.readDataCompanies();
    }

    ngOnInit(){
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        if(this.role) {
            setTimeout(() => {
                this.propertyForm.controls['ManagementCompany'].setValue(this.propertiesService.companies[0])
                this.propertiesService.readDataManagers(this.propertiesService.companies[0].Id);
            }, 1000);
        }

        this.propertyForm.controls['ManagementCompany'].valueChanges.subscribe( company => {
            this.propertiesService.readDataManagers(company.Id);
            const selectQuery = $(".custompicker");
            setTimeout(() => {
                selectQuery.selectpicker('render');
                selectQuery.selectpicker('refresh');
            }, 1000);
        });

        setTimeout(() => {
            $('.property-tabs a:first').tab('show');

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

    private continueInfo() {
        console.log('Continue Info form')
    }

    private discardInfo() {
        console.log('Discard Info form')
    }

    private onSubmit(isRedirect=false) {
        console.log('Form ', this.propertyForm)
        let form = this.propertyForm.value;
        this.sending = true;
        let newArr = [];
        _.mapValues(form.MetaDataTmp, (el) => {
            return newArr = _.concat(newArr, el)
        });
        form.MetaData = newArr;

        if(!this.propertyForm.valid) {
            handlerErrorNotify('There were errors with your submission, please see form for details.');
            return false;
        }

        this.propertiesService.addProperty(form).subscribe(
            d => {
                this.errorForm = false;
                handlerSuccessMessage('Property Added Successfully');

                if(isRedirect) { this.router.navigate(['properties']);}
                this.sending = false;
            },
            e => {
                console.log("error:", e);
                this.errorForm = true;
                this.sending = false;

                handlerErrorFieds(e, this.propertyForm);
                handlerErrorNotify('There were errors with your submission, please see form for details.');
                console.log('Error Form ', this.propertyForm)
            }
        );
    }
}
