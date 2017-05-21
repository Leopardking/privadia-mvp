import { Component, OnInit } from '@angular/core';

import { MainService } from '../../../../app/services/homeservice';

@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit{
    private reading:boolean = false;
    private datatableInited:boolean = false;
    
    private properties = [];
    private metafilters;

    private contacts;

    constructor ( private mainService: MainService) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        this.metafilters = [];
        for (let i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }

        this.contacts = [];
    }

    private subfilterChange(e) {
        let optionId = e.target.tagName == "BUTTON" ? e.target.getAttribute('option-id') : e.target.parentElement.parentElement.getAttribute('option-id');

        this.metafilters[optionId] = !this.metafilters[optionId];
    }

    private finished() {
        //$(".selectpicker").selectpicker();
        return "";
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
}
