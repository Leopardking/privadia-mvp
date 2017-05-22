import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { PropertyinfoComponent } from '../propertyinfo/propertyinfo.component';

import { MainService } from '../../../../app/services/homeservice';

@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit{
    @ViewChild('propertyInfo') propertyInfo;

    private reading:boolean = false;
    private datatableInited:boolean = false;
    
    private properties = [];
    private metafilters;

    private contacts;
    private bedrooms;
    private bathrooms;

    constructor ( private mainService: MainService) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        this.metafilters = [];
        for (let i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }

        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
    }

    private subfilterChange(e) {
        let optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');

        this.metafilters[optionId] = !this.metafilters[optionId];
    }

    private finished() {
        //$(".selectpicker").selectpicker();
        return "";
    }

    private saveInfo() {
        let data = {
            Active: true,
            Address: this.propertyInfo.address,
            AgencyPackUrl: null,
            Bathrooms: this.propertyInfo.bathrooms,
            Bedrooms: this.propertyInfo.bedrooms,
            Benefits: null,
            BoxUrl: this.propertyInfo.boxUrl,
            Capacity: this.propertyInfo.maximumCapacity,
            ChildrenAllowed: this.propertyInfo.allowChildren,
            CollaboratorInitials: this.propertyInfo.collaboratorInitial,
            Contacts: this.propertyInfo.contacts,
            Description: this.propertyInfo.description,
            DiningCapacity: this.propertyInfo.diningCapacity,
            EventsAllowed: this.propertyInfo.eventsAllowed,
            Headline: this.propertyInfo.headline,
            Housekeeping: 0,
            Id: 0,
            Images: [],
            InternalName: this.propertyInfo.listingName,
            KitchenInfo: this.propertyInfo.kitchenInfo,
            LAState: [],
            LiftAvailable: false,
            LivingAreaSize: this.propertyInfo.livingSquare,
            ManagedBySupplier: false,
            MetaData: [],
            MinimumStay: 0,
            Name: this.propertyInfo.officialName,
            OtherHousekeepingInfo: null,
            OtherInfo: this.propertyInfo.otherInfo,
            OtherServicesState: null,
            Owner: {},
            OwnerName: this.propertyInfo.ownerName,
            PetsAllowed: this.propertyInfo.petsAllowed,
            PointsOfInterest: [],
            Region: {},
            RegionId: 1,
            RegionName: this.propertyInfo.regionName,
            Rooms: [],
            Sleeps: this.propertyInfo.sleepCount,
            SmokingAllowed: this.propertyInfo.smokeAllowed,
            Summary: this.propertyInfo.summary,
            TripState: [],
            UserId: '',
            ViaSupplier: false,
            WheelchairAccessible: this.propertyInfo.wheelchairAllowed,
            bathroomsInfo: this.propertyInfo.bathrooms,
            bedroomsInfo: this.propertyInfo.bedrooms,
            childrenAllowed: this.propertyInfo.allowChildren,
            contactsInfo: this.propertyInfo.contacts,
            featureState: [],
            localServicesState: [],
            propertyId: 14485,
            propertyName: this.propertyInfo.officialName,
            villaDescriptionState: []
        }
    }

    private continueInfo() {

    }

    private discardInfo() {

    }
}
