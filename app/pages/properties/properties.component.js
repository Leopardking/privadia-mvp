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
var homeservice_1 = require('../../providers/homeservice');
var PropertiesComponent = (function () {
    function PropertiesComponent(mainService) {
        this.mainService = mainService;
        this.addproperty = false;
        this.datatableInited = false;
        //private properties = [];
        this.addPropertyLink = "addproperty";
    }
    // steve@freelancemvc.net, agent1@freelancemvc.net 
    PropertiesComponent.prototype.ngOnInit = function () {
    };
    PropertiesComponent.prototype.finishReading = function () {
        var DataTable = $('#datatables');
        this.tableWidget = DataTable.DataTable({
            //select: true,
            //paging: false,
            bLengthChange: false,
            ordering: false,
            searching: false,
            info: false,
        });
        this.datatableInited = true;
    };
    PropertiesComponent.prototype.addBooking = function () {
        console.log('add');
    };
    PropertiesComponent.prototype.editBooking = function () {
        console.log('edit');
    };
    PropertiesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' properties-cmp ',
            templateUrl: 'properties.component.html',
            styleUrls: ['properties.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService])
    ], PropertiesComponent);
    return PropertiesComponent;
}());
exports.PropertiesComponent = PropertiesComponent;
//# sourceMappingURL=properties.component.js.map