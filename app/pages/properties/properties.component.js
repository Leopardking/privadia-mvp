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
var properties_service_1 = require('./../../providers/properties/properties.service');
var login_service_1 = require("../../providers/login/login.service");
//import initDataTable = require('../../../assets/js/init/initDataTable.js');
var PropertiesComponent = (function () {
    function PropertiesComponent(propertiesService, loginService) {
        this.propertiesService = propertiesService;
        this.loginService = loginService;
        this.datatableInited = false;
        propertiesService.readDataProperties();
    }
    PropertiesComponent.prototype.ngOnInit = function () {
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    };
    PropertiesComponent.prototype.finishReading = function () {
        var dataTableQuery = $('#datatables');
        var tableWidget = dataTableQuery.DataTable({
            bLengthChange: false,
            ordering: false,
            //searching: false,
            info: false,
        });
        $('#datatableSearch').on('keyup', function () {
            tableWidget.search(this.value).draw();
        });
        this.datatableInited = true;
    };
    PropertiesComponent.prototype.removeProperty = function (el) {
        var _this = this;
        this.propertiesService.deleteProperty(el.propertyId).subscribe(function (d) {
            _this.propertiesService.properties.splice(el.index, 1);
            console.log('Delete property ', d);
        }, function (e) {
            _this.propertiesService.properties.splice(el.index, 1);
            // window.location.reload();
            // console.log("error:", e);
        });
    };
    PropertiesComponent.prototype.addBooking = function () {
        console.log('add');
    };
    PropertiesComponent.prototype.editBooking = function () {
        console.log('edit');
    };
    PropertiesComponent.prototype.permitoins = function (Permissions) {
    };
    PropertiesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' properties-cmp ',
            templateUrl: 'properties.component.html',
            styleUrls: ['properties.component.css']
        }), 
        __metadata('design:paramtypes', [properties_service_1.PropertiesService, login_service_1.LoginService])
    ], PropertiesComponent);
    return PropertiesComponent;
}());
exports.PropertiesComponent = PropertiesComponent;
//# sourceMappingURL=properties.component.js.map