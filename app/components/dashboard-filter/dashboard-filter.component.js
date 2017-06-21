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
var DashboardfilterComponent = (function () {
    /*
        private collapsed:boolean;
        private subfilters;
        private metafilters;
        private order;
    */
    function DashboardfilterComponent(dashboardService) {
        this.dashboardService = dashboardService;
        //console.log('Matedata ',this.dashboardService.metadata)
    }
    DashboardfilterComponent.prototype.ngOnInit = function () {
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
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], DashboardfilterComponent);
    return DashboardfilterComponent;
}());
exports.DashboardfilterComponent = DashboardfilterComponent;
//# sourceMappingURL=dashboard-filter.component.js.map