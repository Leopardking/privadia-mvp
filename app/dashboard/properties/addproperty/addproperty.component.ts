import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { PropertyinfoComponent } from '../propertyinfo/propertyinfo.component';

import { MainService } from '../../../../app/services/homeservice';
import { PropertiesService } from '../../../../app/services/properties/properties.service';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit{
    @ViewChild('propertyInfo') propertyInfo;
    @ViewChild('propertyMargeting') propertyMargeting;

    @ViewChild('pointsOfInterest') pointsOfInterest;
    @ViewChild('localActivities') localActivities;
    @ViewChild('features') features;
    @ViewChild('services') services;
    @ViewChild('trip') trip;

    private villadescription;
    private reading:boolean = false;
    private datatableInited:boolean = false;
    
    private properties = [];

    private contacts;
    private bedrooms;
    private bathrooms;

    private isActive = true;

    constructor ( private mainService: MainService, private propertyService: PropertiesService ) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        this.villadescription = this.propertyInfo.villadescription;
    }

    private saveInfo() {
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
            Images: [],
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

        console.log(data);
    }

    private continueInfo() {

    }

    private discardInfo() {

    }

    private activeChange(e) {
        this.isActive = e.target.checked;
    }
}
