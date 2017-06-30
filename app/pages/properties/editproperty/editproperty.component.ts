import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PropertiesService } from '../../../providers/properties/properties.service';
import {LoginService} from "../../../providers/login/login.service";
import {LookupsService} from "../../../providers/lookups/lookups.service";

declare const $:any;
declare const _:any;

@Component({
    moduleId: module.id,
    selector: ' editproperty-cmp ',
    templateUrl: 'editproperty.component.html',
    styleUrls: [ 'editproperty.component.css' ]
})

export class EditpropertyComponent implements OnInit {
    private property;
    private propertyId;

    private errorForm = false;
    public propertyForm: FormGroup;

    constructor ( private propertiesService: PropertiesService,
                  private route: ActivatedRoute,
                  private builder: FormBuilder) {
        this.route.params.subscribe(params => {
            propertiesService.readDataProperty(this.propertyId = params['id']);
            propertiesService.readDataMetadata();
            propertiesService.readDataOwners();
            propertiesService.readDataRegions();
            propertiesService.readDataCompanies();
            propertiesService.readDataManagers();
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
                Region: { Id: this.propertiesService.property.Region.Id, Name: this.propertiesService.property.Region.Name},
                ManagementCompanyId: this.propertiesService.property.ManagementCompanyId,
                ManagementCompanyName: this.propertiesService.property.ManagementCompanyName,
                ManagerUserId: this.propertiesService.property.ManagerUserId,
                ManagerUserName: this.propertiesService.property.ManagerUserName,
                ManagementCompany: {
                    Id: this.propertiesService.property.ManagementCompany.Id,
                    Name: this.propertiesService.property.ManagementCompany.Name,
                },
                ManagerUser: {
                    Id: this.propertiesService.property.ManagerUser.Id,
                    Name: this.propertiesService.property.ManagerUser.Name,
                },
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

    private onSubmit(form) {
        let newArr = [];
        _.mapValues(form.MetaDataTmp, (el) => {
            return newArr = _.concat(newArr, el)
        });
        form.MetaData = newArr;
        form.ManagementCompanyId = form.ManagementCompany.Id;
        form.ManagementCompanyName = form.ManagementCompany.Name;
        form.ManagerUserId = form.ManagerUser.Id;
        form.ManagerUserName = form.ManagerUser.Name;

        console.log('save ',this.propertyForm)
        /*
        if(this.propertyForm.valid) {
            this.propertiesService.addProperty(form).subscribe(
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
        */
    }
}
