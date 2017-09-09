import {Component, OnInit, Input, ViewChild, AfterContentChecked} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AutoComplete } from '../../../components/autocomplete/autocomplete.component';
import { AutoCompleteConfig } from '../../../components/autocomplete/autocomplete.config';

import { PropertiesService } from '../../../providers/properties/properties.service';
//import { MainService } from '../../../providers/homeservice';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {LoginService} from "../../../providers/login/login.service";
import initWizard = require("../../../../assets/js/init/initWizard.js");

declare const $: any;

@Component({
    moduleId: module.id,
    selector: ' propertyinfo-cmp ',
    templateUrl: 'propertyinfo.component.html',
    styleUrls: [ 'propertyinfo.component.css' ]
})

export class PropertyinfoComponent implements OnInit, AfterContentChecked {
    @Input('group') public propertyForm: FormGroup;
    @Input() public errorForm: any;

    private permission;
    public role = !this.loginService.getRoles('Admin');
    // private PropertyType: Array<{ Id: number, Name: string }>;
    private PropertyType;
    private PropertyContactTypes;

    constructor ( private propertiesService: PropertiesService,
                  private loginService: LoginService,
                  private lookupsService: LookupsService,
                  private _sanitizer: DomSanitizer ) {
        this.lookupsService.readDataPropertyTypes();
        this.lookupsService.readDataPropertyContactTypes();
    }

    ngOnInit(){
        initWizard();
        this.permission = !this.loginService.getPermission('Properties/Put');
        $('.property-tab a:first').tab('show');
    }

    ngAfterContentChecked() {
        this.PropertyType = this.lookupsService.propertyTypes;
        this.PropertyContactTypes = this.lookupsService.propertyContactTypes;
    }

    private regionChanged(e) { }

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
                JobTitle: new FormControl({ value: { Id: null, Name: null}, disabled: this.permission }),
                PropertyContactType: new FormControl({ value: { Id: 1, Name: null}, disabled: this.permission }),
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

    private addKitchen() {
        const control = <FormArray>this.propertyForm.controls['Rooms'];
        control.push(
            new FormGroup({
                Description: new FormControl({ value: null, disabled: this.permission }),
                Name: new FormControl({ value: null, disabled: this.permission }),
                PropertyRoomType: new FormControl({ value: 3, disabled: this.permission }),
            }),
        );
    }

    private removeKitchen(i: number) {
        const control = <FormArray>this.propertyForm.controls['Rooms'];
        control.removeAt(i);
    }
}
