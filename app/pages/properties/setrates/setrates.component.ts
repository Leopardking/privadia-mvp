import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import { MainService } from '../../../providers/homeservice';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';
import { PropertiesService } from '../../../providers/properties/properties.service';

import initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
import {handlerErrorNotify, handlerErrorFieds} from "../../../helpers/helpers";
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
    private propertyId: number;

    private isEdit = [];
    private saveMessage = '';
    public rateForm = new FormGroup ({
        Currency: new FormControl(),
        EndDate: new FormControl(),
        Id: new FormControl(),
        LengthOfStay: new FormControl(),
        PropertyId: new FormControl(),
        StartDate: new FormControl(),
        Value: new FormControl(),
    });
    public date;

    constructor ( private route: ActivatedRoute,
                  private propertyService: PropertiesService,
                  private builder: FormBuilder ) {
        console.log('Form init')
    }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        this.route.params.subscribe(params => {
            this.propertyService.readDataRates(this.propertyId = params['id']);
        });
    }

    private finishReading() {
        let DataTable: any = $('#datatables');
        DataTable.DataTable({
            paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    }

    private initRateToForm(data) {
        this.rateForm = this.builder.group({
            Currency: data.Currency || 'EUR',
            EndDate: moment(data.EndDate).format('MM/DD/YYYY') || moment().format('MM/DD/YYYY'),
            Id: data.Id,
            PropertyId: this.propertyId,
            StartDate: moment(data.StartDate).format('MM/DD/YYYY') || moment().format('MM/DD/YYYY'),
            Value: data.Value,
        });
        setTimeout(() => {
            initDatetimepickers();
        }, 1000)
    }

    private addRow() {
        this.isEdit = [];
        this.propertyService.rates.push({
            Currency: 'EUR',
            EndDate: moment().add(1, 'day'),
            PropertyId: this.propertyId,
            StartDate: moment(),
            Value: null,
        });
        this.rateForm = this.builder.group({
            Currency: new FormControl('EUR'),
            EndDate: new FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            PropertyId: new FormControl(this.propertyId),
            StartDate: new FormControl(moment().format('MM/DD/YYYY')),
            Value: new FormControl(),
        });
        this.isEdit[this.propertyService.rates.length - 1] = !this.isEdit[this.propertyService.rates.length - 1];
    }

    private editRates(object) {
        this.isEdit[object.index] = !this.isEdit[object.index];
        this.initRateToForm(this.propertyService.rates[object.index]);
    }

    private formatDate(date, format) {
        return moment(date).format(format);
    }

    private clearRates(rate) {
        this.isEdit[rate.index] = !this.isEdit[rate.index];
    }

    private saveRates(object) {
        if (this.rateForm.controls['Id']) {
            this.saveMessage = 'Property Updated Successfully'
        } else {
            this.saveMessage = 'Property Added Successfully'
        }
        this.propertyService.saveRate(this.rateForm.value).subscribe(
            d => {
                $.notify({
                    icon: "notifications",
                    message: this.saveMessage

                },{
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                this.isEdit[object.index] = !this.isEdit[object.index];
                this.propertyService.rates[object.index] = d;

                setTimeout(() => {
                    initDatetimepickers();
                }, 100);
            },
            e => {
                console.log('Error ', e)
                handlerErrorFieds(e, this.rateForm);
                handlerErrorNotify('There were errors with your submission, please see form for details.')
            }
        )

    }

    private deleteRate(object) {
        console.log('delete ', this.propertyService.rates[object.index].Id)
        this.propertyService.deleteRate(this.propertyService.rates[object.index].Id).subscribe(
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
                this.propertyService.rates.splice(object.index, 1);

                setTimeout(() => {
                    initDatetimepickers();
                }, 100);
            },
            e => {
                console.log('Error ', e)
                handlerErrorNotify('Delete error')
            }
        )
    }

}
