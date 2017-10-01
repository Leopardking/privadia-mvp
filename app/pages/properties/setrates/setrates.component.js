"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var properties_service_1 = require('../../../providers/properties/properties.service');
var initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
var helpers_1 = require("../../../helpers/helpers");
var SetratesComponent = (function () {
    function SetratesComponent(route, propertyService, builder) {
        this.route = route;
        this.propertyService = propertyService;
        this.builder = builder;
        this.datatableInited = false;
        this.isEdit = [];
        this.saveMessage = '';
        this.rateForm = new forms_1.FormGroup({
            Currency: new forms_1.FormControl(),
            EndDate: new forms_1.FormControl(),
            Id: new forms_1.FormControl(),
            LengthOfStay: new forms_1.FormControl(),
            PropertyId: new forms_1.FormControl(),
            StartDate: new forms_1.FormControl(),
            Value: new forms_1.FormControl(),
            CommissionPercentage: new forms_1.FormControl(),
            Fees: new forms_1.FormControl()
        });
        console.log('Form init');
    }
    SetratesComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        this.route.params.subscribe(function (params) {
            _this.propertyId = params['id'];
            _this.propertyService.readDataRates(_this.propertyId);
            _this.propertyService.readDataProperty(_this.propertyId);
        });
    };
    SetratesComponent.prototype.finishReading = function () {
        var DataTable = $('#datatables');
        DataTable.DataTable({
            paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    };
    SetratesComponent.prototype.initRateToForm = function (data) {
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
        setTimeout(function () {
            initDatetimepickers();
        }, 1000);
    };
    SetratesComponent.prototype.addRow = function () {
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
            Currency: new forms_1.FormControl('EUR'),
            LengthOfStay: 7,
            EndDate: new forms_1.FormControl(moment().add(1, 'day').format('DD/MM/YYYY')),
            PropertyId: new forms_1.FormControl(this.propertyId),
            StartDate: new forms_1.FormControl(moment().format('DD/MM/YYYY')),
            Value: new forms_1.FormControl(),
            CommissionPercentage: new forms_1.FormControl(this.propertyService.commissionPercentage),
            Fees: new forms_1.FormControl(this.propertyService.fees)
        });
        this.isEdit[this.propertyService.rates.length - 1] = !this.isEdit[this.propertyService.rates.length - 1];
        setTimeout(function () {
            initDatetimepickers();
        }, 100);
    };
    SetratesComponent.prototype.editRates = function (object) {
        this.isEdit[object.index] = !this.isEdit[object.index];
        this.initRateToForm(this.propertyService.rates[object.index]);
    };
    SetratesComponent.prototype.formatDate = function (date, format) {
        return moment(date).format(format);
    };
    SetratesComponent.prototype.clearRates = function (rate) {
        this.isEdit[rate.index] = !this.isEdit[rate.index];
    };
    SetratesComponent.prototype.saveRates = function (object) {
        var _this = this;
        if (this.rateForm.controls['Id']) {
            this.saveMessage = 'Property Updated Successfully';
            var form = Object.assign({}, this.rateForm.value);
            form.EndDate = moment(form.EndDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
            form.StartDate = moment(form.StartDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
            // modified to have update with PUT HTTP request
            this.propertyService.updateRate(form).subscribe(function (d) {
                $.notify({
                    icon: "notifications",
                    message: _this.saveMessage
                }, {
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                _this.isEdit[object.index] = !_this.isEdit[object.index];
                _this.propertyService.rates[object.index] = d;
                setTimeout(function () {
                    initDatetimepickers();
                }, 100);
            }, function (e) {
                console.log('Error ', e);
                helpers_1.handlerErrorFieds(e, _this.rateForm);
                helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
            });
        }
        else {
            this.saveMessage = 'Property Added Successfully';
            // fixes with dates
            var form = Object.assign({}, this.rateForm.value);
            form.EndDate = moment(form.EndDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
            form.StartDate = moment(form.StartDate, 'DD/MM/YYYY').format('MM/DD/YYYY');
            // ----------------
            console.log(JSON.stringify(form));
            this.propertyService.saveRate(form).subscribe(function (d) {
                $.notify({
                    icon: "notifications",
                    message: _this.saveMessage
                }, {
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                _this.isEdit[object.index] = !_this.isEdit[object.index];
                _this.propertyService.rates[object.index] = d;
                setTimeout(function () {
                    initDatetimepickers();
                }, 100);
            }, function (e) {
                console.log('Error ', e);
                helpers_1.handlerErrorFieds(e, _this.rateForm);
                helpers_1.handlerErrorNotify('There were errors with your submission, please see form for details.');
            });
        }
    };
    SetratesComponent.prototype.deleteRate = function (object) {
        var _this = this;
        console.log('delete ', this.propertyService.rates[object.index].Id);
        if (typeof (this.propertyService.rates[object.index].Id) == undefined || this.propertyService.rates[object.index].Id == undefined) {
            this.propertyService.rates.splice(object.index, 1);
        }
        else {
            this.propertyService.deleteRate(this.propertyService.rates[object.index].Id).subscribe(function (d) {
                if (d == true) {
                    $.notify({
                        icon: "notifications",
                        message: "Property Deleted Successfully"
                    }, {
                        type: 'success',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                    _this.propertyService.rates.splice(object.index, 1);
                    setTimeout(function () {
                        initDatetimepickers();
                    }, 100);
                }
            }, function (e) {
                console.log('Error ', e);
                helpers_1.handlerErrorNotify('Delete error');
            });
        }
    };
    SetratesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' setrates-cmp ',
            templateUrl: 'setrates.component.html',
            styleUrls: ['setrates.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, properties_service_1.PropertiesService, forms_1.FormBuilder])
    ], SetratesComponent);
    return SetratesComponent;
}());
exports.SetratesComponent = SetratesComponent;
//# sourceMappingURL=setrates.component.js.map