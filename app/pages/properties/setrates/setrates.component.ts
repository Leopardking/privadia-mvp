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
    private propertyId: string;

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
        CommissionPercentage: new FormControl(),
        Fees: new FormControl()
    });
    public date;

    constructor ( private route: ActivatedRoute,
                  private propertyService: PropertiesService,
                  private builder: FormBuilder ) {
        console.log('Form init');
    }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);

        this.route.params.subscribe(params => {
            this.propertyId = params['id'];
            this.propertyService.readDataRates(this.propertyId);
            this.propertyService.readDataProperty(this.propertyId);
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
            EndDate: moment(data.EndDate).format('DD/MM/YYYY') || moment().format('DD/MM/YYYY'),
            LengthOfStay: 7,
            Id: data.Id,
            PropertyId: this.propertyId,
            StartDate: moment(data.StartDate).format('DD/MM/YYYY') || moment().format('DD/MM/YYYY'),
            Value: data.Value,
            CommissionPercentage: data.CommissionPercentage,
            Fees: data.Fees
        });
        setTimeout(() => {
            initDatetimepickers();
        }, 1000)
    }

    private addRow() {
        this.isEdit = [];
        this.propertyService.rates.push({
            Currency: 'EUR',
            LengthOfStay: 7,
            EndDate: moment().add(1, 'day'),
            PropertyId: this.propertyId,
            StartDate: moment(),
            Value: null,
            CommissionPercentage: this.propertyService.commissionPercentage,
            Fees: this.propertyService.fees
        });
        this.rateForm = this.builder.group({
            Currency: new FormControl('EUR'),
            LengthOfStay: 7,
            EndDate: new FormControl(moment().add(1, 'day').format('DD/MM/YYYY')),
            PropertyId: new FormControl(this.propertyId),
            StartDate: new FormControl(moment().format('DD/MM/YYYY')),
            Value: new FormControl(),
            CommissionPercentage: new FormControl(this.propertyService.commissionPercentage),
            Fees: new FormControl(this.propertyService.fees)
        });
        this.isEdit[this.propertyService.rates.length - 1] = !this.isEdit[this.propertyService.rates.length - 1];

        setTimeout(() => {
            initDatetimepickers();
        }, 100);
    }

    private editRates(object) {
        this.isEdit[object.index] = !this.isEdit[object.index];
        this.initRateToForm(this.propertyService.rates[object.index],this.propertyService.commissionPercentage,this.propertyService.fees);
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
        // fixes with dates
        let form = Object.assign({}, this.rateForm.value);
        form.EndDate = moment(form.EndDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
        form.StartDate = moment(form.StartDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
        // ----------------
        // console.log(JSON.stringify(form));
        
        this.propertyService.saveRate(form).subscribe(
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
                handlerErrorNotify('There were errors with your submission, please see form for details.');
            }
        )

    }

    private deleteRate(object) {
        console.log('delete ', this.propertyService.rates[object.index].Id)
        if(typeof(this.propertyService.rates[object.index].Id) == undefined || this.propertyService.rates[object.index].Id == undefined){
            this.propertyService.rates.splice(object.index, 1);
        }else{
            this.propertyService.deleteRate(this.propertyService.rates[object.index].Id).subscribe(
                d => {
                    if(d == true){
                        $.notify({
                            icon: "notifications",
                            message: "Property Deleted Successfully"
        
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
                    }
                },
                e => {
                    console.log('Error ', e)
                    handlerErrorNotify('Delete error')
                }
            )
        }
    }

}
