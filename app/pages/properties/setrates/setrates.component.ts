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
    private isEditing:boolean = false;
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
        this.isEditing = true ;
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
        this.isEditing = true ;
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
            Value: new FormControl([null,Validators.pattern(/^[0-9]*$/)]),
            CommissionPercentage: new FormControl(this.propertyService.commissionPercentage,Validators.pattern(/^[0-9][0-9]?$|^100$/)),
            Fees: new FormControl(this.propertyService.fees,Validators.pattern(/^[0-9]*$/))
        });
        this.isEdit[this.propertyService.rates.length - 1] = !this.isEdit[this.propertyService.rates.length - 1];

        setTimeout(() => {
            initDatetimepickers();
        }, 100);
    }

    private editRates(object) {
        this.isEdit[object.index] = !this.isEdit[object.index];
        this.initRateToForm(this.propertyService.rates[object.index]);
    }

    private formatDate(date, format) {
        return moment(date).format(format);
    }

    private clearRates(rate) {
        if(typeof(this.propertyService.rates[rate.index].Id) == undefined || this.propertyService.rates[rate.index].Id == undefined){
            this.isEdit[rate.index] = !this.isEdit[rate.index];
            this.propertyService.rates.splice(rate.index, 1);
        }else{
            this.isEdit[rate.index] = !this.isEdit[rate.index];
        }        
        this.isEditing = false ;
    }

    private saveRates(object) {
        // fixes with dates
        let form = Object.assign({}, this.rateForm.value);
        form.EndDate = moment(form.EndDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
        form.StartDate = moment(form.StartDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
        // ----------------
        // set commition persentage and fees to default if null
        if(this.rateForm.controls['CommissionPercentage'].value == null || this.rateForm.controls['CommissionPercentage'].value.length == 0 ){
            form.CommissionPercentage =this.propertyService.commissionPercentage
        }else{
            form.CommissionPercentage =this.rateForm.controls['CommissionPercentage'].value 
        }

        if(this.rateForm.controls['Fees'].value == null || this.rateForm.controls['Fees'].value.length == 0 ){
            form.Fees =this.propertyService.fees
        }else{
            form.Fees =this.rateForm.controls['Fees'].value 
        }
        //-----------------------
        console.log(JSON.stringify(form));

        if (this.rateForm.controls['Id'] && this.rateForm.controls['Id'].value != null) {
            this.saveMessage = 'Property Rate Updated Successfully';
            // modified to have update with PUT HTTP request
            this.propertyService.updateRate(form).subscribe(
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
                    if(d.Warning != null){
                        this.showWarning(d.Warning);
                    }
                    this.isEdit[object.index] = !this.isEdit[object.index];
                    this.propertyService.rates[object.index] = d;
                    
                    // getting rate data again and sort it
                    this.propertyService.readDataRates(this.propertyId);

                    setTimeout(() => {
                        initDatetimepickers();
                    }, 100);

                    this.isEditing = false ;
                },
                e => {
                    console.log('Error ', e)
                    this.specialHandleErrorFields(e, this.rateForm);
                    handlerErrorNotify('There were errors with your submission, please see form for details.');
                }
            )
        } else {
            this.saveMessage = 'Property Rate Added Successfully';

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
                    if(d.Warning != null){
                        this.showWarning(d.Warning);
                    }
                    this.isEdit[object.index] = !this.isEdit[object.index];
                    this.propertyService.rates[object.index] = d;
                    
                    // getting rate data again and sort it
                    this.propertyService.readDataRates(this.propertyId);

                    setTimeout(() => {
                        initDatetimepickers();
                    }, 100);

                    this.isEditing = false ;
                },
                e => {
                    console.log('Error ', e)
                    this.specialHandleErrorFields(e, this.rateForm);
                    handlerErrorNotify('There were errors with your submission, please see form for details.');
                }
            )
        }
    }
    
    private showWarning(message){
        $.notify({
            icon: "notifications",
            message: message
        },{
            type: 'warning',
            timer: 3000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
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
    private specialHandleErrorFields(e,form:FormGroup){
        const fileds = Object.keys( e.ModelState || {});
        fileds.forEach((field) => {
            let f = field;
            if(field === 'CheckOut'){
                f = 'EndDate'
            }
            if(field === 'CheckIn'){
                f = 'StartDate'
            }
            form.controls[f].setErrors({ serverError: e.ModelState[field] });
        });
        console.log(form);
    }
    validateFees(){
        if(parseInt(this.rateForm.controls['Fees'].value) <= 0 ){
            // this.rateForm.controls.Fees.invalid = true;
            this.rateForm.controls['Fees'].setErrors({ serverError: 'Must be a postive number or 0' });
            return true
        }
        return false
    }
    validateCommissionPercentage(){
        if(parseInt(this.rateForm.controls['CommissionPercentage'].value) < 0 || parseInt(this.rateForm.controls['CommissionPercentage'].value) > 100 ){
            // this.rateForm.controls.CommissionPercentage.invalid = true;
            this.rateForm.controls['CommissionPercentage'].setErrors({ serverError: 'Must be a number from 0 to 100' });
            return true
        }
        return false
    }
    validateValue(){
        if(parseInt(this.rateForm.controls['Value'].value) <= 0 ){
            // this.rateForm.controls.Value.invalid = true;
            this.rateForm.controls['Value'].setErrors({ serverError: 'Must be a postive number or 0' });
            return true
        }
        return false
    }
}
