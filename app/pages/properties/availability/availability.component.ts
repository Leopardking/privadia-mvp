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
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit {
    private availabilityForm: FormGroup;
    private UpdateTypeList: Array<{ Id: number, Name: string }>;
    private UpdateBlock: boolean = true;
    private isCalendarView: boolean = true;

    constructor ( public propertiesService: PropertiesService,
                  private loginService: LoginService,
                  private route: ActivatedRoute) {
    }

    ngOnInit(){
        this.UpdateTypeList = [
            {Id: 1, Name: 'Internal Booking'},
            {Id: 2, Name: 'External Booking'},
            {Id: 3, Name: 'Owner Present'},
            {Id: 4, Name: 'Not Available for Rent'},
            {Id: 5, Name: 'Other'}
        ];
        this.availabilityForm = new FormGroup({
            CheckIn: new FormControl('08/16/2017'),
            CheckOut: new FormControl('08/18/2017'),
            UpdateType: new FormControl({
                Id: null,
                Name: null,
            })
        })

    }

    toggleUpdateBlock() {
        this.UpdateBlock = !this.UpdateBlock;
    }

    toggleCalendarView() {
        this.isCalendarView = !this.isCalendarView;
    }
}
