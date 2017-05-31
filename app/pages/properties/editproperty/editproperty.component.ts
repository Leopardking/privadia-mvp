import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MainService } from '../../../providers/homeservice';
import { PropertiesService } from '../../../providers/properties/properties.service';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' editproperty-cmp ',
    templateUrl: 'editproperty.component.html',
    styleUrls: [ 'editproperty.component.css' ]
})

export class EditpropertyComponent implements OnInit{
    @ViewChild('propertyInfo') propertyInfo;
    @ViewChild('propertyMargeting') propertyMargeting;
    @ViewChild('propertyImage') propertyImage;

    @ViewChild('pointsOfInterest') pointsOfInterest;
    @ViewChild('localActivities') localActivities;
    @ViewChild('features') features;
    @ViewChild('services') services;
    @ViewChild('trip') trip;

    // public propertyForm: any;

    // public metadata;

    private villadescription;
    private reading:boolean = false;
    private datatableInited:boolean = false;
    
    private property = [];

    private contacts;
    private bedrooms;
    private bathrooms;

    private isActive = true;

    // id: number;
    private sub: any;
    //propertyForm: any;
    private isLoad = false;

    public propertyForm = new FormGroup ({
        OwnerName: new FormControl(),
        InternalName: new FormControl(),
        Name: new FormControl(),
        Address: new FormControl(),
        RegionId: new FormControl(),
        RegionName: new FormControl(),
        Headline: new FormControl(),
        Summary: new FormControl(),
        Description: new FormControl(),
        OtherInfo: new FormControl(),
        CollaboratorInitials: new FormControl(),
        BoxUrl: new FormControl(),
        Bathrooms: new FormControl(),
        Bedrooms: new FormControl(),
        Sleeps: new FormControl(),
        Capacity: new FormControl(),
        LivingAreaSize: new FormControl(),
        DiningCapacity: new FormControl(),
        KitchenInfo: new FormControl(),
        ChildrenAllowed: new FormControl(),
        SmokingAllowed: new FormControl(),
        WheelchairAccessible: new FormControl(),
        PetsAllowed: new FormControl(),
        EventsAllowed: new FormControl(),
    });
    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService,
                  private route: ActivatedRoute,
                  private builder: FormBuilder) {

        console.log('this.property mainService', this.mainService.metadata )
/*
        this.propertyForm = builder.group({
            'InternalName': '1',
            'OwnerName': '1',
            'Address': '1 33',
            'Name': '1     1',
        });
*/

        //console.log('Form ', this.propertyForm.controls)
    }

    // steve@freelancemvc.net, agent1@freelancemvc.net
    ngOnInit(){
        console.log('this.property mainService', this.mainService.metadata )

        this.sub = this.route.params.subscribe(params => {
            this.propertyService.getPropertyById(params['id']).subscribe(
                d => {
                    this.property = d;

                    this.propertyForm = this.builder.group({
                        OwnerName: d.OwnerName,
                        InternalName: d.InternalName,
                        Name: d.Name,
                        Address: d.Address,
                        RegionId: d.RegionId,
                        RegionName: d.RegionName,
                        Headline: d.Headline,
                        Summary: d.Summary,
                        Description: d.Description,
                        OtherInfo: d.OtherInfo,
                        CollaboratorInitials: d.CollaboratorInitials,
                        BoxUrl: d.BoxUrl,
                        Bathrooms: d.Bathrooms,
                        Bedrooms: d.Bedrooms,
                        Sleeps: d.Sleeps,
                        Capacity: d.Capacity,
                        LivingAreaSize: d.LivingAreaSize,
                        DiningCapacity: d.DiningCapacity,
                        KitchenInfo: d.KitchenInfo,
                        ChildrenAllowed: d.ChildrenAllowed,
                        SmokingAllowed: d.SmokingAllowed,
                        WheelchairAccessible: d.WheelchairAccessible,
                        PetsAllowed: d.PetsAllowed,
                        EventsAllowed: d.EventsAllowed,

                    });
                    this.isLoad = true;
                    console.log('This properties', this.property);
                    console.log('This properties Form', this.propertyForm);
                },
                e => { console.log("error:", e); }
            );
            console.log('This id', params['id']);
            // this.id = +params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        //this.villadescription = this.propertyInfo.villadescription;
    }

    private saveInfo() {

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

        let contacts = this.propertyInfo.contacts.map( (item, index) => { 
            return {
                EmailAddress: item.email,
                FirstName: item.firstName,
                JobTitle: item.jobTitle,
                LastName: item.lastName,
                Telephone: parseInt(item.telephone)
            };
        });

        let bathrooms = this.propertyInfo.bathrooms.map( (item, index) => {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 2
            }
        });

        let bedrooms = this.propertyInfo.bedrooms.map( (item, index) => {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 1
            }
        });
        
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
            Address: this.propertyInfo.address,
            AgencyPackUrl: this.propertyMargeting.agencyPackUrl,
            Bathrooms: parseInt(this.propertyInfo.bathroomCount),
            Bedrooms: parseInt(this.propertyInfo.bedroomCount),
            Benefits: this.features.metafilterHeading.uniqueBenefits,
            BoxUrl: this.propertyInfo.boxUrl,
            Capacity: parseInt(this.propertyInfo.maximumCapacity),
            CollaboratorInitials: this.propertyInfo.collaboratorInitial,
            Contacts: contacts,
            Description: this.propertyInfo.description,
            DiningCapacity: parseInt(this.propertyInfo.diningCapacity),
            EventsAllowed: this.propertyInfo.eventsAllowed,
            Headline: this.propertyInfo.headline,
            Housekeeping: this.services.metafilterHeading.housekeeperState,
            Images: this.propertyImage.images,
            InternalName: this.propertyInfo.listingName,
            KitchenInfo: this.propertyInfo.kitchenInfo,
            LiftAvailable: this.features.metafilterHeading.liftAvailable,
            LivingAreaSize: parseInt(this.propertyInfo.livingSquare),
            MetaData: metaData,
            Name: this.propertyInfo.officialName,
            OtherHousekeepingInfo: this.services.metafilterHeading.housekeepOtherInfo,
            OtherInfo: this.propertyInfo.otherInfo,
            Owner: this.propertyInfo.owner,
            UserId: this.propertyInfo.owner.Id,
            OwnerName: this.propertyInfo.ownerName,
            PetsAllowed: this.propertyInfo.petsAllowed,
            PointsOfInterest: poi,
            Region: this.propertyInfo.region,
            RegionId: this.propertyInfo.region.Id,
            RegionName: this.propertyInfo.regionName,
            Rooms: bedrooms.concat(bathrooms),
            Sleeps: parseInt(this.propertyInfo.sleepCount),
            SmokingAllowed: this.propertyInfo.smokeAllowed,
            Summary: this.propertyInfo.summary,
            WheelchairAccessible: this.propertyInfo.wheelchairAllowed,
            childrenAllowed: parseInt(this.propertyInfo.allowChildren),
            propertyName: this.propertyInfo.officialName
        }
        this.propertyService.addProperty(data).subscribe(
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
        */
        //console.log(data);
        console.log('Save form ', this.propertyForm)
    }

    private continueInfo() {

    }

    private discardInfo() {

    }

    private activeChange(e) {
        this.isActive = e.target.checked;
    }
}
