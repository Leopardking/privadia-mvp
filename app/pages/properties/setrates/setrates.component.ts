import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MainService } from '../../../providers/homeservice';
import { PropertiesService } from '../../../providers/properties/properties.service';

@Component({
    moduleId: module.id,
    selector: ' setrates-cmp ',
    templateUrl: 'setrates.component.html',
    styleUrls: [ 'setrates.component.css' ]
})

export class SetratesComponent implements OnInit{

    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService,
                  private builder: FormBuilder ) {
        console.log('Form init')
    }

    ngOnInit(){
    }

    private saveInfo() {
        console.log('Save Info')
    }

    private continueInfo() {
        console.log('Continue Info form')
    }

    private discardInfo() {
        console.log('Discard Info form')
    }

    private onSubmit() {
        console.log('On submit')
    }
}
