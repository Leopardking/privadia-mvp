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
var forms_1 = require('@angular/forms');
var _ = require("lodash");
var properties_service_1 = require("../../providers/properties/properties.service");
var DashboardfilterComponent = (function () {
    function DashboardfilterComponent(dashboardService, propertiesService) {
        this.dashboardService = dashboardService;
        this.propertiesService = propertiesService;
    }
    DashboardfilterComponent.prototype.ngOnInit = function () {
        //Tmp select picker init
        $('.custompicker').selectpicker();
        $(document).mouseup(function (event) {
            var container = $(".extend-filter-container.collapse");
            var _opened = container.hasClass("in");
            if (_opened && !container.is(event.target) && container.has(event.target).length === 0) {
                $('.nav-pills li.active').removeClass('active');
                $('.tab-content div.active').removeClass('active');
                $("#openFilter").click();
            }
        });
    };
    DashboardfilterComponent.prototype.onSubmit = function (form) {
        var _this = this;
        // fixes with dates
        form.CheckIn = moment(form.CheckIn, 'DD/MM/YYYY').format('MM/DD/YYYY');
        form.CheckOut = moment(form.CheckOut, 'DD/MM/YYYY').format('MM/DD/YYYY');
        // ----------------
        this.propertiesService.getVillas(form).subscribe(function (d) {
            _this.dashboardService.villas = d;
            _this.dashboardService.isReading = false;
        }, function (e) {
            console.log('Get Villas Error', e);
        });
    };
    DashboardfilterComponent.prototype.metadataChange = function (e) {
        var control = this.filterForm.controls['MetaDataFilters'];
        var index = _.findIndex(control.value, function (val) { return val == e.target.value; });
        if (index == -1)
            return control.push(new forms_1.FormControl(e.target.value));
        return control.removeAt(index);
    };
    __decorate([
        core_1.Input('metafilters'), 
        __metadata('design:type', Object)
    ], DashboardfilterComponent.prototype, "metafilters", void 0);
    __decorate([
        core_1.Input('group'), 
        __metadata('design:type', Object)
    ], DashboardfilterComponent.prototype, "filterForm", void 0);
    DashboardfilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard-filter-cmp',
            templateUrl: 'dashboard-filter.component.html',
            styleUrls: ['dashboard-filter.component.css']
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, properties_service_1.PropertiesService])
    ], DashboardfilterComponent);
    return DashboardfilterComponent;
}());
exports.DashboardfilterComponent = DashboardfilterComponent;
//# sourceMappingURL=dashboard-filter.component.js.map