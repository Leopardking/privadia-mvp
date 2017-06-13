import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

import { MainService } from '../../../providers/homeservice';
import { PropertiesService } from '../../../providers/properties/properties.service';

declare var $:any;


@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit{
    // private isActive = true;
    private isLoad = true;
    private errorForm = false;

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
        Headline: new FormControl(),
        Summary: new FormControl(),
        Description: new FormControl(),
        OtherInfo: new FormControl(),
        CollaboratorInitials: new FormControl(),
        BoxUrl: new FormControl(),
        AgencyPackUrl: new FormControl(),
        Bathrooms: new FormControl(null, Validators.required),
        Bedrooms: new FormControl(null, Validators.required),
        Sleeps: new FormControl(null, Validators.required),
        Capacity: new FormControl(null, Validators.required),
        LivingAreaSize: new FormControl(null, Validators.required),
        DiningCapacity: new FormControl(null, Validators.required),
        KitchenInfo: new FormControl(),
        ChildrenAllowed: new FormControl(0),
        SmokingAllowed: new FormControl(false),
        WheelchairAccessible: new FormControl(false),
        PetsAllowed: new FormControl(false),
        EventsAllowed: new FormControl(false),
        Contacts: new FormArray([]),
        Rooms: new FormArray([]),
        Images: new FormArray([]),
        PointsOfInterest: new FormArray([]),
        MetaData: new FormArray([]),
        MetaDataTmp: new FormGroup({}),
        OtherHousekeepingInfo: new FormControl(),
        Housekeeping: new FormControl(0),
        LiftAvailable: new FormControl(false),
        Benefits: new FormControl(),
    });

    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService,
                  private builder: FormBuilder ) {
        console.log('Form init',this.propertyForm)
    }

    // steve@freelancemvc.net, agent1@freelancemvc.net
    ngOnInit(){
        $.getScript('../../../../assets/js/core/jquery.validate.min.js');
        //$.getScript('../../../../assets/js/init/initImageGallery.js');
        //$('#registerFormValidation').validate();
    }

    setRegion(region) {
        const regionFGs = this.builder.group({
            Id: [region.RegionId],
            Name: [region.RegionName]
        });
        // const regionFormArray = this.builder.array(regionFGs);
        this.propertyForm.setControl('Region', regionFGs);
    }

    private saveInfo() {
        //console.log('Save FORM', this.propertyForm.value.MetaDataTmp);
        let newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, (el) => {
            return newArr = _.concat(newArr, el)
        })
        this.propertyForm.value.MetaData = newArr;
        //console.log('this.propertyForm.value.MetaDataTmp', this.propertyForm.value)
        /*
        $(".title-error").removeClass("title-error");
        $(".metafilter-names li a.has-error").removeClass("has-error");

        let validateErrors = $(".tab-content .has-error");
        if ( validateErrors.length ) {
            $.notify({
                icon: "notifications",
                message: $(".tab-content .has-error").length + " Validation Errors Found"

            },{
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

            for (let i = 0; i < validateErrors.length; i++) {
                let ele = validateErrors[i];

                while (!ele.className.includes('card-content')) {
                    if (ele.className.includes('panel-group')) {
                        $(ele).addClass('title-error');
                    }
                    ele = ele.parentElement;
                }

                let eleTabName = document.getElementsByClassName(ele.id + "-tab-name");
                $(eleTabName).addClass("has-error");
            }

            return;
        }

        $('.has-error').removeClass("has-error");

        let metaData = [];
        for (let i = 1; i < 125; i++) {
            let available = this.pointsOfInterest.metafilters[i] 
                        ||  this.features.metafilters[i] 
                        ||  this.services.metafilters[i] 
                        ||  this.villadescription.metafilters[i] 
                        ||  this.localActivities.metafilters[i] 
                        ||  this.trip.metafilters[i] ;
            metaData.push({ 
                Available: available ? 1 : 0,
                MetaDataId: i
            });
        }

        let poi = this.pointsOfInterest.metafilterHeading.PoITypes.map( (item, index) => {
            return {
                Available: item.checked ? 1 : 0,
                Distance: item.distance,
                Name: item.typeName,
                PointOfInterestTypeId: item.Id
            };
        })
        let data = {
            Active: this.isActive,
            Images: this.propertyImage.images,
            MetaData: metaData,
            Owner: this.propertyInfo.owner,
            UserId: this.propertyInfo.owner.Id,
            PointsOfInterest: poi,
            Region: this.propertyInfo.region,
        }*/
        if(this.propertyForm.valid) {
            this.propertyService.addProperty(this.propertyForm.value).subscribe(
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
                    this.mainService.readData();
                },
                e => { console.log("error:", e); }
            );
        }
        console.log('Property Form ', this.propertyForm);
        console.log('Property Form Value ', this.propertyForm.value);
    }

    private continueInfo() {
        console.log('Continue Info form')
    }

    private discardInfo() {
        console.log('Discard Info form')
    }

    private onSubmit() {
        console.log('Submit form')
        let newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, (el) => {
            return newArr = _.concat(newArr, el)
        })
        this.propertyForm.value.MetaData = newArr;

        if(this.propertyForm.valid) {
            this.propertyService.addProperty(this.propertyForm.value).subscribe(
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
                    this.mainService.readData();
                },
                e => { console.log("error:", e); }
            );
        } else {
            this.errorForm = true
        }
        console.log('Property Form ', this.propertyForm);
        console.log('Property Form Value ', this.propertyForm.value);
    }
}
