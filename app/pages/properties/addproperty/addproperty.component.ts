import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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

    public propertyForm = new FormGroup ({
        Active: new FormControl(true),
        OwnerName: new FormControl('OwnerName'),
        InternalName: new FormControl('InternalName'),
        Name: new FormControl('Name'),
        Address: new FormControl('Address'),
        RegionId: new FormControl(1),
        RegionName: new FormControl('Ibiza'),
        Headline: new FormControl('Headline'),
        Summary: new FormControl('Summary'),
        Description: new FormControl('Description'),
        OtherInfo: new FormControl('OtherInfo'),
        CollaboratorInitials: new FormControl('CollaboratorInitials'),
        BoxUrl: new FormControl('BoxUrl'),
        AgencyPackUrl: new FormControl('AgencyPackUrl'),
        Bathrooms: new FormControl(1),
        Bedrooms: new FormControl(2),
        Sleeps: new FormControl(6),
        Capacity: new FormControl(3),
        LivingAreaSize: new FormControl(4),
        DiningCapacity: new FormControl(5),
        KitchenInfo: new FormControl('KitchenInfo'),
        ChildrenAllowed: new FormControl(2),
        SmokingAllowed: new FormControl(false),
        WheelchairAccessible: new FormControl(true),
        PetsAllowed: new FormControl(false),
        EventsAllowed: new FormControl(true),
        Contacts: new FormArray([]),
        Rooms: new FormArray([]),
        Images: new FormArray([]),
        PointsOfInterest: new FormArray([]),
        MetaData: new FormArray([]),
        MetaDataTmp: new FormGroup({}),
        OtherHousekeepingInfo: new FormControl('OtherHousekeepingInfo'),
        Housekeeping: new FormControl('Housekeeping'),
        LiftAvailable: new FormControl(true),
        Benefits: new FormControl('Benefits'),
    });

    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService ) {
        console.log('Form init',this.propertyForm)
    }

    // steve@freelancemvc.net, agent1@freelancemvc.net
    ngOnInit(){}

    private saveInfo() {
        console.log('Save FORM', this.propertyForm.value.MetaDataTmp);
        let newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, (el) => {

            console.log('elem', el)
            return newArr = _.concat(newArr, el)
        })
        this.propertyForm.value.MetaData = newArr;
        console.log('this.propertyForm.value.MetaDataTmp', this.propertyForm.value)
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
        console.log(this.propertyForm.value);
    }

    private continueInfo() {

    }

    private discardInfo() {

    }
}
