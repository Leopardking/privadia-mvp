import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

//import { MainService } from '../../../providers/homeservice';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';
import { PropertiesService } from '../../../providers/properties/properties.service';

declare const $:any;

@Component({
    moduleId: module.id,
    selector: ' editproperty-cmp ',
    templateUrl: 'editproperty.component.html',
    styleUrls: [ 'editproperty.component.css' ]
})

export class EditpropertyComponent implements OnInit{
    private property;
    private sub: any;
    private propertyId;

    private errorForm = false;
    public propertyForm: FormGroup;

    constructor ( private propertiesService: PropertiesService,
                  private route: ActivatedRoute,
                  private builder: FormBuilder) {
        this.sub = this.route.params.subscribe(params => {
            propertiesService.getDataProperty(this.propertyId = params['id']);
        });
    }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        setTimeout(() => {

            this.propertyForm = this.builder.group({
                Id: this.propertyId,
                Active: this.propertiesService.property.Active,
                OwnerName: this.propertiesService.property.OwnerName,
                InternalName: this.propertiesService.property.InternalName,
                Name: [this.propertiesService.property.Name, Validators.required],
                Address: this.propertiesService.property.Address,
                RegionId: this.propertiesService.property.RegionId,
                RegionName: this.propertiesService.property.RegionName,
                Region: { Id: this.propertiesService.property.RegionId, Name: this.propertiesService.property.RegionName},
                Headline: this.propertiesService.property.Headline,
                Summary: this.propertiesService.property.Summary,
                Description: this.propertiesService.property.Description,
                OtherInfo: this.propertiesService.property.OtherInfo,
                CollaboratorInitials: this.propertiesService.property.CollaboratorInitials,
                BoxUrl: [this.propertiesService.property.BoxUrl, Validators.pattern('https?://.+')],
                AgencyPackUrl: [this.propertiesService.property.AgencyPackUrl, Validators.pattern('https?://.+')],
                MinimumStay: [this.propertiesService.property.MinimumStay, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
                Bathrooms: [this.propertiesService.property.Bathrooms, Validators.required],
                Bedrooms: [this.propertiesService.property.Bedrooms, Validators.required],
                Sleeps: [this.propertiesService.property.Sleeps, Validators.required],
                Capacity: this.propertiesService.property.Capacity,
                LivingAreaSize: this.propertiesService.property.LivingAreaSize,
                DiningCapacity: this.propertiesService.property.DiningCapacity,
                KitchenInfo: this.propertiesService.property.KitchenInfo,
                ChildrenAllowed: this.propertiesService.property.ChildrenAllowed,
                SmokingAllowed: this.propertiesService.property.SmokingAllowed,
                WheelchairAccessible: this.propertiesService.property.WheelchairAccessible,
                PetsAllowed: this.propertiesService.property.PetsAllowed,
                EventsAllowed: this.propertiesService.property.EventsAllowed,
                LiftAvailable: this.propertiesService.property.LiftAvailable,
                Benefits: this.propertiesService.property.Benefits,
                Housekeeping: this.propertiesService.property.Housekeeping,
                OtherHousekeepingInfo: this.propertiesService.property.OtherHousekeepingInfo,
                MetaDataTmp: {},
            });
            this.setContacts(this.propertiesService.property.Contacts);
            this.setRooms(this.propertiesService.property.Rooms);
            this.setImages(this.propertiesService.property.Images);
            this.setPointsOfInterest(this.propertiesService.property.PointsOfInterest);
            this.setMetaData(this.propertiesService.property.MetaData);
            this.setMetaDataTmp();

            $('.property-tabs a:first').tab('show')
            console.log('Form ', this.propertyForm)

        }, 1000);
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

    setImages(images) {
        const imageFGs = images.map(image => this.builder.group({
            Id: image.Id,
            FileName: image.FileName,
            ImageId: image.ImageId,
            OrderIdx: image.OrderIdx,
        }));
        const imageFormArray = this.builder.array(imageFGs);
        this.propertyForm.setControl('Images', imageFormArray);
    }

    setPointsOfInterest(points) {
        const pointFGs = points.map(point => this.builder.group({
            Id: point.Id,
            Name: point.Name,
            PointOfInterestTypeId: point.PointOfInterestTypeId,
            PointOfInterestTypeName: point.PointOfInterestTypeName,
            Available: point.Available,
            Distance: point.Distance,
        }));
        const pointFormArray = this.builder.array(pointFGs);
        console.log('Point Form Array ',points)
        this.propertyForm.setControl('PointsOfInterest', pointFormArray);
    }

    setMetaData(metaDatas) {
        const metaDataFGs = metaDatas.map(metaDate => this.builder.group({
            MetaDataId: metaDate.MetaDataId,
            MetaDataName: metaDate.MetaDataName,
            Available: metaDate.Available,
        }));
        const metaDataFormArray = this.builder.array(metaDataFGs);
        this.propertyForm.setControl('MetaData', metaDataFormArray);
    }

    setMetaDataTmp() {
        const metaDataFormArray = this.builder.group({});
        this.propertyForm.setControl('MetaDataTmp', metaDataFormArray);
    }

    private continueInfo() {
        console.log('Continue Info form')
    }

    private discardInfo() {
        console.log('Discard Info form')
    }

    private onSubmit() {
        let newArr = [];
        _.mapValues(this.propertyForm.value.MetaDataTmp, (el) => {
            return newArr = _.concat(newArr, el)
        });
        this.propertyForm.value.MetaData = newArr;

        console.log('save ',this.propertyForm)
        if(this.propertyForm.valid) {
            this.propertiesService.addProperty(this.propertyForm.value).subscribe(
                d => {
                    $.notify({
                        icon: "notifications",
                        message: "Property Updated Successfully"

                    },{
                        type: 'success',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                },
                e => { console.log("error:", e); }
            );
        } else {
            this.errorForm = true;
        }
    }
}
