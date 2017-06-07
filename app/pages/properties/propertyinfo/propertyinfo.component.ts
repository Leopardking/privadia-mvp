import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AutoComplete } from '../../../components/autocomplete/autocomplete.component';
import { AutoCompleteConfig } from '../../../components/autocomplete/autocomplete.config';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { MainService } from '../../../providers/homeservice';
import {FormGroup, FormArray, FormControl} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: ' propertyinfo-cmp ',
    templateUrl: 'propertyinfo.component.html',
    styleUrls: [ 'propertyinfo.component.css' ]
})

export class PropertyinfoComponent implements OnInit{
    @Input('group')
    public propertyForm: FormGroup;

    @ViewChild('villadescription') villadescription;

    // name & address
    // public contacts;
    public bedrooms;
    // public bathrooms;
    private ownerNames;
    private regions;
    private regionArray;
    private owners;

    public owner;
    public ownerName; 
    public regionName;
    public region;
    public InternalName;
    // public officialName;
    public address;

    constructor ( private propertyService: PropertiesService, private mainService: MainService, private _sanitizer: DomSanitizer ) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        console.log('this.property mainService', this.mainService.metadata )
        //this.property// = this.getInfo();
        //console.log('Property ', this.property)
        //this.contacts = [];
        //this.bedrooms = [];
        //this.bathrooms = [];
        //this.ownerNames = [];
        //this.regions = [];

        this.ownerName = "";
        this.regionName = "";

        this.owner = {
            Id: '',
            Name: ''
        }

        this.region = {
            Id: '',
            Name: ''
        };
        // description

        this.propertyService.getOwners().subscribe(
            d => { 
                this.owners = d;
                this.ownerNames = d.map( (item, i) => { return item.Name; } );
            },
            e => { console.log("error: ", e); }
        );

        this.propertyService.getregions().subscribe(
            d => {
                this.regionArray = d;
                this.regions = d.map( (item, i) => { return item.Name; } );
            },
            e => { console.log("error: ", e); }
        )
    }

    private autocompleListFormatter = (data: any) : SafeHtml => {
        let html = `${data.Name}`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    private showAddContact() {
        const control = <FormArray>this.propertyForm.controls['Contacts'];
        control.push(
            new FormGroup({
                JobTitle: new FormControl('JobTitle'),
                FirstName: new FormControl('FirstName'),
                LastName: new FormControl('LastName'),
                EmailAddress: new FormControl('EmailAddress'),
                Telephone: new FormControl('123456789'),
            }),
        );
    }

    private removeContact(i: number) {
        const control = <FormArray>this.propertyForm.controls['Contacts'];
        control.removeAt(i);
    }


    private addBedroom() {
        const control = <FormArray>this.propertyForm.controls['Rooms'];
        control.push(
            new FormGroup({
                Description: new FormControl('Description'),
                Name: new FormControl('Name'),
                PropertyRoomType: new FormControl(1),
            }),
        );
    }

    private removeBedroom(i: number) {
        const control = <FormArray>this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    }

    private addBathroom() {
        const control = <FormArray>this.propertyForm.controls['Rooms'];
        control.push(
            new FormGroup({
                Description: new FormControl('Description'),
                Name: new FormControl('Name'),
                PropertyRoomType: new FormControl(2),
            }),
        );
    }

    private removeBathroom(i: number) {
        const control = <FormArray>this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    }

    private regionChanged(e) {
        const controlId = <FormControl>this.propertyForm.controls['RegionId'];
        controlId.setValue(e.Id);

        const controlName = <FormControl>this.propertyForm.controls['RegionName'];
        controlName.setValue(e.Name);

        $("#regionName").removeClass('is-empty');
        $("#regionName").removeClass('has-error');
    }

    /*
     private ownerChanged(e) {
         this.ownerName = e;
         let owernIndex = this.ownerNames.indexOf(this.ownerName);
         this.owner = this.owners[owernIndex];

         if (owernIndex == -1) {
             this.owner = {
                 Id: "",
                 Name: e
             }
         }

         if (e) {
             $("#ownerName").removeClass('is-empty');
         }
     }

     private regionChanged(e) {
         this.regionName = e;
         let index = this.regions.indexOf(e);
         this.region = this.regionArray[index];

         if (index == -1) {
             this.region = {
                 Id: "",
                 Name: e
             }
         }

         if (e) {
             $("#regionName").removeClass('is-empty');
             $("#regionName").removeClass('has-error');
         }
     }

     private listingNameChanged(e) {
         this.InternalName = e.target.value;
     }

     private officialNameChanged(e) {
         this.officialName = e.target.value;
     }

     private addressChanged(e) {
         this.address = e.target.value;
     }
     private adminInfoChanged(id, key, e) {
         let i;
         for (i = 0; i < this.contacts.length; i++) {
             if (this.contacts[i].id == id) {
                 break;
             }
         }
         this.contacts[i][key] = e.target.value;
     }
     private bedroomChanged(id, key, e) {
         let i;
         for (i = 0; i < this.bedrooms.length; i++) {
             if (this.bedrooms[i].id == id) {
                 break;
             }
         }
         this.bedrooms[i][key] = e.target.value;
     }

     private bathroomChanged(id, key, e) {
         let i;
         for (i = 0; i < this.bathrooms.length; i++) {
             if (this.bathrooms[i].id == id) {
                 break;
             }
         }
         this.bathrooms[i][key] = e.target.value;
     }
 */
}
