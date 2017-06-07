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
    // @ViewChild('propertyInfo') propertyInfo;
    // @ViewChild('propertyMargeting') propertyMargeting;
    // @ViewChild('propertyImage') propertyImage;

    // @ViewChild('pointsOfInterest') pointsOfInterest;
    // @ViewChild('localActivities') localActivities;
    // @ViewChild('features') features;
    // @ViewChild('services') services;
    // @ViewChild('trip') trip;

    // public propertyForm: any;

    // public metadata;

    // private villadescription;
    // private reading:boolean = false;
    // private datatableInited:boolean = false;
    
    private property = [];

    // private contacts;
    // private bedrooms;
    // private bathrooms;

    // private isActive = true;

    // id: number;
    private sub: any;
    //propertyForm: any;
    private isLoad = false;

    public propertyForm = new FormGroup ({});

    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService,
                  private route: ActivatedRoute,
                  private builder: FormBuilder) {

        console.log('this.property mainService', this.mainService.metadata )
    }

    // steve@freelancemvc.net, agent1@freelancemvc.net
    ngOnInit(){
        console.log('this.property mainService', this.mainService.metadata )

        this.sub = this.route.params.subscribe(params => {
            this.propertyService.getPropertyById(params['id']).subscribe(
                d => {
                    this.property = d;

                    this.propertyForm = this.builder.group({
                        Active: d.Active,
                        OwnerName: d.OwnerName,
                        InternalName: d.InternalName,
                        Name: d.Name,
                        Address: d.Address,
                        RegionId: d.RegionId,
                        RegionName: d.RegionName,
                        Region: { Id: d.RegionId, Name: d.RegionName},
                        Headline: d.Headline,
                        Summary: d.Summary,
                        Description: d.Description,
                        OtherInfo: d.OtherInfo,
                        CollaboratorInitials: d.CollaboratorInitials,
                        BoxUrl: d.BoxUrl,
                        AgencyPackUrl: d.AgencyPackUrl,
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

                    this.setContacts(d.Contacts);
                    this.setRooms(d.Rooms);
                    // this.setRegion({RegionId: d.RegionId, RegionName: d.RegionName});

                    this.isLoad = true;
                    console.log('This properties', this.property);
                    console.log('This properties Form', this.propertyForm);
                },
                e => { console.log("error:", e); }
            );
        });
    }

    setContacts(contacts) {
        const contactFGs = contacts.map(contact => this.builder.group({
            JobTitle: contact.JobTitle,
            FirstName: contact.FirstName,
            LastName: contact.LastName,
            EmailAddress: contact.EmailAddress,
            Telephone: contact.Telephone,
        }));
        const contactFormArray = this.builder.array(contactFGs);
        this.propertyForm.setControl('Contacts', contactFormArray);
    }

    setRooms(rooms) {
        const roomFGs = rooms.map(room => this.builder.group({
            Name: room.Name,
            Description: room.Description,
            PropertyRoomType: room.PropertyRoomType,
        }));
        const roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    }

    setImages(rooms) {
        const roomFGs = rooms.map(room => this.builder.group({
            Name: room.Name,
            Description: room.Description,
            PropertyRoomType: room.PropertyRoomType,
        }));
        const roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    }

    setPointsOfInterest(rooms) {
        const roomFGs = rooms.map(room => this.builder.group({
            Name: room.Name,
            Description: room.Description,
            PropertyRoomType: room.PropertyRoomType,
        }));
        const roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    }

    setMetaData(rooms) {
        const roomFGs = rooms.map(room => this.builder.group({
            Name: room.Name,
            Description: room.Description,
            PropertyRoomType: room.PropertyRoomType,
        }));
        const roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    }

    setMetaDataTmp(rooms) {
        const roomFGs = rooms.map(room => this.builder.group({
            Name: room.Name,
            Description: room.Description,
            PropertyRoomType: room.PropertyRoomType,
        }));
        const roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
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
        console.log('Save form ', this.propertyForm.value)
    }

    private continueInfo() {

    }

    private discardInfo() {

    }

    private activeChange(e) {
        // this.isActive = e.target.checked;
    }
}
