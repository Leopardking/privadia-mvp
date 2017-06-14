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
var homeservice_1 = require('../../../providers/homeservice');
var properties_service_1 = require('../../../providers/properties/properties.service');
var initDatetimepickers = require('../../../../assets/js/init/initDatetimepickers.js');
//declare var datepicker: any
var SetratesComponent = (function () {
    function SetratesComponent(mainService, propertyService, builder) {
        this.mainService = mainService;
        this.propertyService = propertyService;
        this.builder = builder;
        this.datatableInited = false;
        this.listRates = [];
        this.isEdit = [];
        this.ratesForm = new forms_1.FormGroup({
            Rates: new forms_1.FormArray([]),
        });
        console.log('Form init');
    }
    SetratesComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('moment', moment().format());
        this.propertyService.getRates(14489).subscribe(function (d) {
            _this.listRates = d;
            _this.setArray(d);
            _this.ratesForm = _this.builder.group({
                Currency: d.Currency || 'EUR',
                EndDate: d.EndDate || moment().format(),
                Id: d.Id || null,
                IsNew: d.IsNew || false,
                LengthOfStay: d.LengthOfStay,
                PropertyId: d.PropertyId || 14489,
                StartDate: d.StartDate || moment().format(),
                Value: d.Value,
            });
            _this.propertyService.isReading = false;
            console.log('Get rates ', d);
        }, function (e) {
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
            _this.propertyService.isReading = false;
            console.log('Error ', e);
        });
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
    };
    SetratesComponent.prototype.setArray = function (rates) {
        var _this = this;
        var rateFGs = rates.map(function (rate) { return _this.builder.group({
            Currency: rate.Currency || 'EUR',
            EndDate: rate.EndDate || moment().format(),
            Id: rate.Id || null,
            IsNew: rate.IsNew || false,
            LengthOfStay: rate.LengthOfStay,
            PropertyId: rate.PropertyId || 14489,
            StartDate: rate.StartDate || moment().format(),
            Value: rate.Value,
        }); });
        var rateFormArray = this.builder.array(rateFGs);
        this.ratesForm.setControl('Rates', rateFormArray);
    };
    SetratesComponent.prototype.finishReading = function () {
        var DataTable = $('#datatables');
        DataTable.DataTable({
            //select: true,
            //paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    };
    SetratesComponent.prototype.editRates = function (object) {
        this.isEdit[object.index] = !this.isEdit[object.index];
        setTimeout(function () {
            initDatetimepickers();
        }, 100);
    };
    SetratesComponent.prototype.removeRates = function (object) {
        console.log('removeRates');
        var control = this.ratesForm.controls['Rates'];
        control.removeAt(object.index);
    };
    SetratesComponent.prototype.addRow = function () {
        var control = this.ratesForm.controls['Rates'];
        control.push(new forms_1.FormGroup({
            Currency: new forms_1.FormControl('EUR'),
            EndDate: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            Id: new forms_1.FormControl(),
            IsNew: new forms_1.FormControl(),
            LengthOfStay: new forms_1.FormControl(),
            PropertyId: new forms_1.FormControl(14489),
            StartDate: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            Value: new forms_1.FormControl(),
        }));
    };
    SetratesComponent.prototype.discardInfo = function () {
        console.log('Discard Info form');
    };
    SetratesComponent.prototype.onSubmit = function () {
        console.log('On submit');
    };
    SetratesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' setrates-cmp ',
            templateUrl: 'setrates.component.html',
            styleUrls: ['setrates.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService, properties_service_1.PropertiesService, forms_1.FormBuilder])
    ], SetratesComponent);
    return SetratesComponent;
}());
exports.SetratesComponent = SetratesComponent;
//# sourceMappingURL=setrates.component.js.map