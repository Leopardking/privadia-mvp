import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { AutoComplete } from '../../../components/autocomplete/autocomplete.component';
import { AutoCompleteConfig } from '../../../components/autocomplete/autocomplete.config';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { MainService } from '../../../providers/homeservice';
import {FormGroup} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: ' propertyinfo-cmp ',
    templateUrl: 'propertyinfo.component.html',
    styleUrls: [ 'propertyinfo.component.css' ]
})

export class PropertyinfoComponent implements OnInit{
    @Input('property') property;
    @Input('name') name;
    @Input('group')
    public propertyForm: FormGroup;

    @ViewChild('villadescription') villadescription;

    // name & address
    public contacts;
    public bedrooms;
    public bathrooms;
    private ownerNames;
    private regions;
    private regionArray;
    private owners;

    public owner;
    public ownerName; 
    public regionName;
    public region;
    public InternalName;
    public officialName;
    public address;

    constructor ( private propertyService: PropertiesService, private mainService: MainService ) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        console.log('this.property mainService', this.mainService.metadata )
        //this.property// = this.getInfo();
        //console.log('Property ', this.property)
        this.contacts = [];
        this.bedrooms = [];
        this.bathrooms = [];
        this.ownerNames = [];
        this.regions = [];

        this.ownerName = "";
        this.regionName = "";

        this.owner = {
            Id: '',
            Name: ''
        }

        this.region = {
            Id: '',
            Name: ''
        }
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

    private showAddContact() {
        this.contacts.push({
            id: this.contacts.length == 0 ? 0 : this.contacts[this.contacts.length-1].id + 1,
            jobTitle: "",
            firstName: "",
            lastName: "",
            email: "",
            telephone: ""
        });
    }

    private removeContact(id) {
        let i;
        for (i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == id) {
                break;
            }
        }
        this.contacts.splice(i, 1);
    }

    private addBedroom() {
        this.bedrooms.push({
            id: this.bedrooms.length == 0 ? 0 : this.bedrooms[this.bedrooms.length-1].id + 1,
            name: "",
            description: ""
        });
    }

    private removeBedroom(id) {
        let i;
        for (i = 0; i < this.bedrooms.length; i++) {
            if (this.bedrooms[i].id == id) {
                break;
            }
        }
        this.bedrooms.splice(i, 1);
    }

    private addBathroom() {
        this.bathrooms.push({
            id: this.bathrooms.length == 0 ? 0 : this.bathrooms[this.bathrooms.length-1].id + 1,
            name: "",
            description: ""
        });
    }

    private removeBathroom(id) {
        let i;
        for (i = 0; i < this.bathrooms.length; i++) {
            if (this.bathrooms[i].id == id) {
                break;
            }
        }
        this.bathrooms.splice(i, 1);
    }

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
}
