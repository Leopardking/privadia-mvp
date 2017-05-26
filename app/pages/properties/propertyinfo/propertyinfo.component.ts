import { Component, OnInit, ViewChild } from '@angular/core';

import { AutoComplete } from '../../../components/autocomplete/autocomplete.component';
import { AutoCompleteConfig } from '../../../components/autocomplete/autocomplete.config';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { MainService } from '../../../providers/homeservice';

@Component({
    moduleId: module.id,
    selector: ' propertyinfo-cmp ',
    templateUrl: 'propertyinfo.component.html',
    styleUrls: [ 'propertyinfo.component.css' ]
})

export class PropertyinfoComponent implements OnInit{
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
    public listingName;
    public officialName;
    public address;

    //description
    public headline = "";
    public summary = "";
    public description = "";
    public otherInfo = "";
    public collaboratorInitial = "";
    public boxUrl = "";

    //property size and rooms
    public bathroomCount = 0;
    public bedroomCount = 0;
    public sleepCount = 0;
    public maximumCapacity = 0;
    public livingSquare = 0;
    public diningCapacity = 0;
    public kitchenInfo = "";

    //children
    public allowChildren = 0;
    public smokeAllowed = false;
    public petsAllowed = false;
    public eventsAllowed = false;
    public wheelchairAllowed = false;

    constructor ( private propertyService: PropertiesService, private mainService: MainService ) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
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
        this.listingName = e.target.value;
    }

    private officialNameChanged(e) {
        this.officialName = e.target.value;
    }

    private addressChanged(e) {
        this.address = e.target.value;
    }

    private headlineChanged(e) {
        this.headline = e.target.value;
    }

    private summaryChanged(e) {
        this.summary = e.target.value;
    }

    private otherInfoChanged(e) {
        this.otherInfo = e.target.value;
    }

    private descriptionChanged(e) {
        this.description = e.target.value;
    }

    private collaboratorInitialChanged(e) {
        this.collaboratorInitial = e.target.value;
    }

    private boxUrlChanged(e) {
        this.boxUrl = e.target.value;
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

    private bathroomsCountChanged(e) {
        this.bathroomCount = e.target.value;
    }

    private bedroomsCountChanged(e) {
        this.bedroomCount = e.target.value;
    }

    private sleepsChanged(e) {
        this.sleepCount = e.target.value;
    }

    private maximumCapacityChanged(e) {
        this.maximumCapacity = e.target.value;
    }

    private livingareaSquareChanged(e) {
        this.livingSquare = e.target.value;
    }

    private diningCapacityChanged(e) {
        this.diningCapacity = e.target.value;
    }

    private kitchenInfoChanged(e) {
        this.kitchenInfo = e.target.value;
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

    private childrenAllowChanged(e) {
        this.allowChildren = e.target.value;
    }

    private smokeAllowChange(e) {
        this.smokeAllowed = e.target.checked;
    }

    private petsAllowChange(e) {
        this.petsAllowed = e.target.checked;
    }

    private eventsAllowChange(e) {
        this.eventsAllowed = e.target.checked;
    }

    private wheelchairAllowChange(e) {
        this.wheelchairAllowed = e.target.checked;
    }
}
