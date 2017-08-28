import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PropertiesService } from '../../../providers/properties/properties.service';
import {LoginService} from "../../../providers/login/login.service";
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {handlerErrorFieds, handlerErrorNotify} from "../../../helpers/helpers";

declare const moment:any;
declare const $:any;

@Component({
    moduleId: module.id,
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit {
    public availabilityForm = new FormGroup({});
    public checkedDates = {
        CheckIn: '',
        CheckOut: '',
    };
    private UpdateTypeList: Array<{ Id: number, Name: string }>;
    private UpdateBlock: boolean = null;
    private isCalendarView: boolean = true;

    private data = {
        CheckIn: moment().format('MM/DD/YYYY'),
        CheckOut: moment().add(1, 'day').format('MM/DD/YYYY'),
        UpdateType: {
            Id: 1,
            Name: 'Internal Booking',
        },
        Notes: null,
        isAgency: null,
        FirstName: null,
        LastName: null,
        Email: null,
        Phone: null,
        CompanyName: null,
        ContactName: null,
        AgencyEmail: null,
        AgencyPhone: null
    };

    public bookingDays = [
        {startDay: '08/16/2017', endDay: '08/20/2017', Type: 'external'},
        {startDay: '09/02/2017', endDay: '09/10/2017', Type: 'internal'},
        {startDay: '08/20/2017', endDay: '08/26/2017', Type: 'other'},
        {startDay: '08/26/2017', endDay: '08/30/2017', Type: 'external'},
        {startDay: null, endDay: null, Type: 'external'},
    ];

    constructor ( public propertiesService: PropertiesService,
                  private loginService: LoginService,
                  private route: ActivatedRoute,
                  private builder: FormBuilder) {
    }

    ngOnInit(){
        this.UpdateTypeList = [
            {Id: 1, Name: 'Internal Booking'},
            {Id: 2, Name: 'External Booking'},
            {Id: 3, Name: 'Owner Present'},
            {Id: 4, Name: 'Not Available for Rent'},
            {Id: 5, Name: 'Other'}
        ];
        this.initForm(this.data);

    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

    public initForm(data) {

        this.availabilityForm.reset();
        this.availabilityForm = this.builder.group({
            CheckIn: new FormControl(data.CheckIn),
            CheckOut: new FormControl(data.CheckOut),
            UpdateType: new FormControl({
                Id: data.UpdateType.Id,
                Name: data.UpdateType.Name,
            }),
            Notes: new FormControl(data.Notes),
            isAgency: new FormControl(data.isAgency),
            FirstName: new FormControl(data.FirstName),
            LastName: new FormControl(data.LastName),
            Email: new FormControl(data.Email),
            Phone: new FormControl(data.Email),
            CompanyName: new FormControl(data.CompanyName),
            ContactName: new FormControl(data.ContactName),
            AgencyEmail: new FormControl(data.AgencyEmail),
            AgencyPhone: new FormControl(data.AgencyPhone)
        });
    }

    toggleUpdateBlock() {
        if (this.UpdateBlock === null) {
            this.UpdateBlock = true;
        } else {
            this.UpdateBlock = !this.UpdateBlock;
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
            this.bookingDays[4].startDay = data;
            //console.log('Form changes', data)
        });

        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
            this.bookingDays[4].endDay = data;
        })
    }

    handlerEditAvailability(data) {
        const dataForm = {
            CheckIn: '09/16/2017',
            CheckOut: '09/18/2017',
            UpdateType: {
                Id: 1,
                Name: 'Internal Booking',
            },
            Notes: null,
            isAgency: null,
            FirstName: 'Alex',
            LastName: 'Loginov',
            Email: null,
            Phone: null,
            CompanyName: null,
            ContactName: null,
            AgencyEmail: null,
            AgencyPhone: null
        };
        this.isCalendarView = true;
        if (this.UpdateBlock === null) {
            this.UpdateBlock = true;
        } else {
            this.UpdateBlock = !this.UpdateBlock;
        }

        this.initForm(dataForm);
        this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
            this.bookingDays[4].startDay = data;
        });

        this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
            this.bookingDays[4].endDay = data;
        })
    }

    toggleCalendarView() {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    }

    saveForm() {
        console.log("save form", this.availabilityForm)
    }

    changeDate() {
        console.log('changeDate ',this.availabilityForm)
    }
}
