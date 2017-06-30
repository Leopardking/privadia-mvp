import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AutoComplete } from '../../../components/autocomplete/autocomplete.component';
import { AutoCompleteConfig } from '../../../components/autocomplete/autocomplete.config';

import { PropertiesService } from '../../../providers/properties/properties.service';
//import { MainService } from '../../../providers/homeservice';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {LoginService} from "../../../providers/login/login.service";

declare const $: any;

@Component({
    moduleId: module.id,
    selector: ' propertyinfo-cmp ',
    templateUrl: 'propertyinfo.component.html',
    styleUrls: [ 'propertyinfo.component.css' ]
})

export class PropertyinfoComponent implements OnInit{
    @Input('group') public propertyForm: FormGroup;
    @Input('errorForm') public errorForm: any;

    // @ViewChild('villadescription') villadescription;
    // public changeTab
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

    private permission;

    constructor ( private propertiesService: PropertiesService,
                  private loginService: LoginService,
                  private _sanitizer: DomSanitizer ) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        this.permission = !this.loginService.getPermission('Properties/Put');

        /*
        const role = this.loginService.userInfo.Roles.filter( role => role.Name === 'Admin')[0];

        if(role)
            this.propertyForm.controls['ManagementCompany'].reset({
                value: this.lookupsService.companies[0],
                disabled: true
            });
        */
        /*
        $('button[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href") // activated tab
            console.log('Target 1',target);
            $(target).tab('show')
            e.preventDefault()
        });
        */
        //console.log('this.property mainService', this.dashboardService.metadata )
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
    /*
        this.propertiesService.getOwners().subscribe(
            d => { 
                this.owners = d;
                this.ownerNames = d.map( (item, i) => { return item.Name; } );
            },
            e => { console.log("error: ", e); }
        );

        this.propertiesService.getRegions().subscribe(
            d => {
                this.regionArray = d;
                this.regions = d.map( (item, i) => { return item.Name; } );
            },
            e => { console.log("error: ", e); }
        );
        */
        $('.property-tab a:first').tab('show')
    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

    private autocompleListFormatter = (data: any) : SafeHtml => {
        let html = `${data.Name}`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    private showAddContact() {
        const control = <FormArray>this.propertyForm.controls['Contacts'];
        control.push(
            new FormGroup({
                JobTitle: new FormControl({ value: null, disabled: this.permission }),
                FirstName: new FormControl({ value: null, disabled: this.permission }),
                LastName: new FormControl({ value: null, disabled: this.permission }),
                EmailAddress: new FormControl({ value: null, disabled: this.permission }, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)),
                Telephone: new FormControl({ value: null, disabled: this.permission }),
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
                Description: new FormControl({ value: null, disabled: this.permission }),
                Name: new FormControl({ value: null, disabled: this.permission }),
                PropertyRoomType: new FormControl({ value: 1, disabled: this.permission }),
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
                Description: new FormControl({ value: null, disabled: this.permission }),
                Name: new FormControl({ value: null, disabled: this.permission }),
                PropertyRoomType: new FormControl({ value: 2, disabled: this.permission }),
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

    public changeTab(test: any, test1: any) {
        //const liNavID = "ID" + test.toString().split(/#(.+)?/)[1];

        //document.getElementById(test1).classList.remove('active');
        //document.getElementById(liNavID).classList.add('active');

        //console.log(liNavID);
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
