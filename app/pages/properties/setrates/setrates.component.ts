import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import { MainService } from '../../../providers/homeservice';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';
import { PropertiesService } from '../../../providers/properties/properties.service';

import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
declare const moment: any
declare const $: any


@Component({
    moduleId: module.id,
    selector: ' setrates-cmp ',
    templateUrl: 'setrates.component.html',
    styleUrls: [ 'setrates.component.css' ]
})

export class SetratesComponent implements OnInit{
    private datatableInited = false;
    private listRates = [];

    private isEdit = [];
    public ratesForm = new FormGroup ({
        Rates: new FormArray([]),
    });
    public date;

    constructor ( private dashboardService: DashboardService,
                  private propertyService: PropertiesService,
                  private builder: FormBuilder ) {
        console.log('Form init')
    }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        console.log('moment',moment().format())
        this.propertyService.getRates(14489).subscribe(
            d => {
                this.listRates = d;
                this.setArray(d);
                this.ratesForm = this.builder.group({
                    Currency: d.Currency || 'EUR',
                    EndDate: d.EndDate || moment().format(),
                    Id: d.Id || null,
                    IsNew: d.IsNew || false,
                    LengthOfStay: d.LengthOfStay,
                    PropertyId: d.PropertyId || 14489,
                    StartDate: d.StartDate || moment().format(),
                    Value: d.Value,
                });

                this.propertyService.isReading = false;
                console.log('Get rates ', d)
            },
            e => {
                /*
                this.ratesForm = this.builder.group({
                    Currency: 'EUR',
                    EndDate: moment().format(),
                    Id: null,
                    IsNew: false,
                    LengthOfStay: null,
                    PropertyId: 14489,
                    StartDate: moment().format(),
                    Value: null,
                });
                */
                this.propertyService.isReading = false;
                console.log('Error ', e)
            }
        )
        /*
        let DataTable: any = $('#datatables');
        DataTable.DataTable({
            //select: true,
            //paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;

        let datepickerWidget: any = $(".datepicker");
        datepickerWidget.datetimepicker({
            format: 'MM/DD/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true,
            },
            //sideBySide: true,
            //keepOpen: true,
            //debug:true,
        });
        */
    }

    private setArray(rates) {
        const rateFGs = rates.map(rate => this.builder.group({
            Currency: rate.Currency || 'EUR',
            EndDate: rate.EndDate || moment().format(),
            Id: rate.Id || null,
            IsNew: rate.IsNew || false,
            LengthOfStay: rate.LengthOfStay,
            PropertyId: rate.PropertyId || 14489,
            StartDate: rate.StartDate || moment().format(),
            Value: rate.Value,
        }));
        const rateFormArray = this.builder.array(rateFGs);
        this.ratesForm.setControl('Rates', rateFormArray);
    }

    private finishReading() {
        let DataTable: any = $('#datatables');
        DataTable.DataTable({
            //select: true,
            paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    }

    private changeDate(e) {
        console.log('Change Rate',e.target.value)
    }

    private editRates(object) {
        this.isEdit[object.index] = !this.isEdit[object.index];

        setTimeout(() => {
            initDatetimepickers();
        }, 100);
    }

    private removeRates(object) {
        console.log('removeRates')
        const control = <FormArray>this.ratesForm.controls['Rates'];
        control.removeAt(object.index);
    }

    private clearRates(rate) {
        this.isEdit[rate.index] = !this.isEdit[rate.index];

        rate.rate.setValue({
            Currency: 'EUR',
            Id: rate.rate.controls.Id.value,
            IsNew: rate.rate.controls.IsNew.value,
            LengthOfStay: rate.rate.controls.LengthOfStay.value,
            PropertyId: rate.rate.controls.PropertyId.value,
            EndDate: moment().format('MM/DD/YYYY'),
            StartDate: moment().format('MM/DD/YYYY'),
            Value: null,
        });
    }

    private addRow() {
        console.log('Data', this.date)
        const control = <FormArray>this.ratesForm.controls['Rates'];
        control.push(
            new FormGroup({
                Currency: new FormControl('EUR'),
                EndDate: new FormControl(moment().format('MM/DD/YYYY')),
                Id: new FormControl(),
                IsNew: new FormControl(),
                LengthOfStay: new FormControl(),
                PropertyId: new FormControl(),
                StartDate: new FormControl(moment().format('MM/DD/YYYY')),
                Value: new FormControl(),
            }),
        );
    }

    private onSubmit() {
        console.log('On submit ', this.ratesForm.controls['Rates'].value)
        this.propertyService.saveRates(this.ratesForm.controls['Rates'].value).subscribe(
            d => {
                $.notify({
                    icon: "notifications",
                    message: "Property Added Successfully"

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
                console.log('Error ', e)
            }
        )
    }
}
