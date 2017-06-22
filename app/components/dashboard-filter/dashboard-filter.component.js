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
var dashboard_service_1 = require('../../providers/dashboard/dashboard.service');
//import initSemanticSelect = require('../../../assets/js/init/initSemanticSelect.js');
var forms_1 = require('@angular/forms');
var DashboardfilterComponent = (function () {
    /*
        private collapsed:boolean;
        private subfilters;
        private metafilters;
        private order;
    */
    function DashboardfilterComponent(dashboardService, builder) {
        this.dashboardService = dashboardService;
        this.builder = builder;
        this.filterFrom = new forms_1.FormGroup({});
        //console.log('Matedata ',this.dashboardService.metadata)
    }
    DashboardfilterComponent.prototype.ngOnInit = function () {
        this.filterFrom = this.builder.group({
            Bedrooms: new forms_1.FormControl(1),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            MaxRate: new forms_1.FormControl(3000),
            MinRate: new forms_1.FormControl(100),
            OrderBy: new forms_1.FormControl(),
            Regions: new forms_1.FormControl(),
            MetaDataFilters: new forms_1.FormControl(),
        });
        /*
        setTimeout(() => {
            console.log('Matedata ',this.dashboardService.metadata)
        },9000)
        /*
        this.collapsed = true;
        console.log('metafilter');
        this.metafilters = [];
        for (let i = 0; i < 10000; i++) {
            this.metafilters.push(false);
        }
        */
    };
    __decorate([
        core_1.Input('metafilters'), 
        __metadata('design:type', Object)
    ], DashboardfilterComponent.prototype, "metafilters", void 0);
    DashboardfilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard-filter-cmp',
            templateUrl: 'dashboard-filter.component.html',
            styleUrls: ['dashboard-filter.component.css']
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, forms_1.FormBuilder])
    ], DashboardfilterComponent);
    return DashboardfilterComponent;
}());
exports.DashboardfilterComponent = DashboardfilterComponent;
//# sourceMappingURL=dashboard-filter.component.js.map