import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PropertiesService } from '../../../providers/properties/properties.service';
import {LoginService} from "../../../providers/login/login.service";
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {handlerErrorFieds, handlerErrorNotify} from "../../../helpers/helpers";

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
    private permission;
    private role;

    public propertyForm: FormGroup;

    constructor ( public propertiesService: PropertiesService,
                  public lookupsService: LookupsService,
                  private loginService: LoginService,
                  private route: ActivatedRoute,
                  private builder: FormBuilder) {
        this.route.params.subscribe(params => {
            propertiesService.readDataProperty(this.propertyId = params['id']);
            propertiesService.readDataMetadata();
            propertiesService.readDataOwners();
            propertiesService.readDataRegions();
            propertiesService.readDataCompanies();
        });
    }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        this.permission = !this.loginService.getPermission('Properties/Put');

        setTimeout(() => {
            this.propertyForm = this.builder.group({
                Id: this.propertyId,
                Active: { value: this.propertiesService.property.Active || null, disabled: this.permission },
                // OwnerUser: { value: this.propertiesService.property.OwnerUser, disabled: this.permission },
                OwnerUser: { value:
                    {
                        Id: this.propertiesService.property.OwnerUser && this.propertiesService.property.OwnerUser.Id,
                        Name: this.propertiesService.property.OwnerUser && this.propertiesService.property.OwnerUser.Name,
                    },
                    disabled: this.permission
                },
                InternalName: { value: this.propertiesService.property.InternalName, disabled: this.permission },
                Name: [{ value: this.propertiesService.property.Name, disabled: this.permission}],
                AddressLine1: { value: this.propertiesService.property.AddressLine1, disabled: this.permission },
                AddressLine2: { value: this.propertiesService.property.AddressLine2, disabled: this.permission },
                AddressPostalCode: { value: this.propertiesService.property.AddressPostalCode, disabled: this.permission },
                AddressCountry: { value: this.propertiesService.property.AddressCountry, disabled: this.permission },
                Longitude: [
                    {
                        value: this.propertiesService.property.Longitude,
                        disabled: this.permission
                    },
                    Validators.pattern(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
                ],
                Latitude: [
                    {
                        value: this.propertiesService.property.Latitude,
                        disabled: this.permission
                    },
                    Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/)
                ],
                Region: { value: { Id: this.propertiesService.property.Region.Id, Name: this.propertiesService.property.Region.Name}, disabled: this.permission },
                ManagementCompany: { value:
                    {
                        Id: this.propertiesService.property.ManagementCompany.Id,
                        Name: this.propertiesService.property.ManagementCompany.Name,
                    },
                    disabled: this.permission
                },
                ManagerUser: { value:
                    {
                        Id: this.propertiesService.property.ManagerUser.Id,
                        Name: this.propertiesService.property.ManagerUser.Name,
                    },
                    disabled: this.permission
                },
                Headline: { value: this.propertiesService.property.Headline, disabled: this.permission },
                Summary: { value: this.propertiesService.property.Summary, disabled: this.permission },
                Description: { value: this.propertiesService.property.Description, disabled: this.permission },
                OtherInfo: { value: this.propertiesService.property.OtherInfo, disabled: this.permission },
                // CollaboratorInitials: { value: this.propertiesService.property.CollaboratorInitials, disabled: this.permission },
                PropertyUrl: { value: this.propertiesService.property.PropertyUrl, disabled: this.permission },
                PropertyAssetsUrl: { value: this.propertiesService.property.PropertyAssetsUrl, disabled: this.permission },
                MinimumStay: [{ value: this.propertiesService.property.MinimumStay, disabled: this.permission }, Validators.pattern('^[0-9]*$')],
                Bathrooms: [{ value: this.propertiesService.property.Bathrooms, disabled: this.permission }],
                Bedrooms: [{ value: this.propertiesService.property.Bedrooms, disabled: this.permission }],
                Sleeps: [{ value: this.propertiesService.property.Sleeps, disabled: this.permission }],
                Capacity: { value: this.propertiesService.property.Capacity, disabled: this.permission },
                LivingAreaSize: { value: this.propertiesService.property.LivingAreaSize, disabled: this.permission },
                DiningCapacity: { value: this.propertiesService.property.DiningCapacity, disabled: this.permission },
                KitchenInfo: { value: this.propertiesService.property.KitchenInfo, disabled: this.permission },
                ChildrenAllowed: { value: this.propertiesService.property.ChildrenAllowed, disabled: this.permission },
                SmokingAllowed: { value: this.propertiesService.property.SmokingAllowed, disabled: this.permission },
                WheelchairAccessible: { value: this.propertiesService.property.WheelchairAccessible, disabled: this.permission },
                PetsAllowed: {value: this.propertiesService.property.PetsAllowed, disabled: this.permission},
                // PetsConsidered: {},
                EventsAllowed: { value: this.propertiesService.property.EventsAllowed, disabled: this.permission },
                // LiftAvailable: { value: this.propertiesService.property.LiftAvailable, disabled: this.permission },
                Benefits: { value: this.propertiesService.property.Benefits, disabled: this.permission },
                Housekeeping: { value: this.propertiesService.property.Housekeeping, disabled: this.permission },
                OtherHousekeepingInfo: { value: this.propertiesService.property.OtherHousekeepingInfo, disabled: this.permission },
                MetaDataTmp: {},
                PropertyType: {
                    value:
                    {
                        Id: this.propertiesService.property.PropertyType && this.propertiesService.property.PropertyType.Id || null,
                        Name: this.propertiesService.property.PropertyType && this.propertiesService.property.PropertyType.Name || null,
                    },
                    disabled: this.permission
                },
            });
            this.setContacts(this.propertiesService.property.Contacts);
            this.setRooms(this.propertiesService.property.Rooms);
            this.setImages(this.propertiesService.property.Images);
            this.setPointsOfInterest(this.propertiesService.property.PointsOfInterest);
            this.setMetaData(this.propertiesService.property.MetaData);
            this.setMetaDataTmp();
            this.propertiesService.readDataManagers(this.propertiesService.property.ManagementCompany.Id);

            $('.property-tabs a:first').tab('show')
            this.propertyForm.controls['ManagementCompany'].valueChanges.subscribe( company => {
                this.propertyForm.controls['ManagerUser'].reset({
                    Id: null,
                    Name: null,
                });
                this.propertiesService.readDataManagers(company.Id);
                const selectQuery = $(".custompicker");
                setTimeout(() => {
                    selectQuery.selectpicker('destroy');
                    selectQuery.selectpicker('render');
                    selectQuery.selectpicker('refresh');
                }, 500);
            });
            /*
            const selectQuery = $(".custompicker");
            setTimeout(() => {
                selectQuery.selectpicker('destroy');
                selectQuery.selectpicker('render');
                selectQuery.selectpicker('refresh');
            }, 1500);
            */
            localStorage.setItem('title', this.propertiesService.property.Name);
        }, 3000);
    }

    setContacts(contacts) {
        const contactFGs = contacts.map(contact => this.builder.group({
                JobTitle: { value: contact.JobTitle, disabled: this.permission },
                PropertyContactType: { value: {Id: 1, Name: 'qwert'}, disabled: this.permission },
                FirstName: { value: contact.FirstName, disabled: this.permission },
                LastName: { value: contact.LastName, disabled: this.permission },
                EmailAddress: { value: contact.EmailAddress, disabled: this.permission },
                Telephone: { value: contact.Telephone, disabled: this.permission },
        }));

        const contactFormArray = this.builder.array(contactFGs);
        this.propertyForm.setControl('Contacts', contactFormArray);
    }

    setRooms(rooms) {
        const roomFGs = rooms.map(room => this.builder.group({
            Name: { value: room.Name, disabled: this.permission },
            Description: { value: room.Description, disabled: this.permission },
            PropertyRoomType: { value: room.PropertyRoomType, disabled: this.permission },
        }));
        const roomFormArray = this.builder.array(roomFGs);
        this.propertyForm.setControl('Rooms', roomFormArray);
    }

    setImages(images) {
        const imageFGs = images.map(image => this.builder.group({
            Id: { value: image.Id, disabled: this.permission },
            FileName: { value: image.FileName, disabled: this.permission },
            ImageId: { value: image.ImageId, disabled: this.permission },
            OrderIdx: { value: image.OrderIdx, disabled: this.permission },
        }));
        const imageFormArray = this.builder.array(imageFGs);
        this.propertyForm.setControl('Images', imageFormArray);
    }

    setPointsOfInterest(points) {
        const pointFGs = points.map(point => this.builder.group({
            Id: { value: point.Id, disabled: this.permission },
            Name: { value: point.Name, disabled: this.permission },
            PointOfInterestTypeId: { value: point.PointOfInterestTypeId, disabled: this.permission },
            PointOfInterestTypeName: { value: point.PointOfInterestTypeName, disabled: this.permission },
            Available: { value: point.Available, disabled: this.permission },
            Distance: { value: point.Distance, disabled: this.permission },
        }));
        const pointFormArray = this.builder.array(pointFGs);
        this.propertyForm.setControl('PointsOfInterest', pointFormArray);
    }

    setMetaData(metaDatas) {
        const metaDataFGs = metaDatas.map(metaDate => this.builder.group({
            MetaDataId: { value: metaDate.MetaDataId, disabled: this.permission },
            MetaDataName: { value: metaDate.MetaDataName, disabled: this.permission },
            Available: { value: metaDate.Available, disabled: this.permission },
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

        console.log('save ',this.propertyForm)
        if(!this.propertyForm.valid) {
            handlerErrorNotify('There were errors with your submission, please see form for details.');
            return false;
        }

        this.propertiesService.addProperty(form).subscribe(
            d => {
                this.errorForm = false;

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
            e => {
                this.errorForm = true;

                handlerErrorFieds(e, this.propertyForm);
                handlerErrorNotify('There were errors with your submission, please see form for details.');
            }
        );
    }
}
