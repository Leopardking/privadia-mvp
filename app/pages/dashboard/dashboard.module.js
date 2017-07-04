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
var common_1 = require("@angular/common");
var router_1 = require('@angular/router');
var forms_1 = require("@angular/forms");
var ng2_cloudinary_1 = require("ng2-cloudinary");
/**
 *  Providers
 */
var dashboard_service_1 = require("../../providers/dashboard/dashboard.service");
var properties_service_1 = require("../../providers/properties/properties.service");
var lookups_service_1 = require("../../providers/lookups/lookups.service");
var enquiry_service_1 = require("../../providers/enquery/enquiry.service");
/**
 *  Components
 */
var dashboard_component_1 = require('./dashboard.component');
var villa_component_1 = require('../../components/villa/villa.component');
var dashboard_routing_module_1 = require('./dashboard-routing.module');
var dashboard_filter_component_1 = require("../../components/dashboard-filter/dashboard-filter.component");
var datetimepicker_field_component_1 = require("../../components/form-fields/datetimepicker-field/datetimepicker-field.component");
var select_component_1 = require("../../components/form-fields/select-field/select.component");
var enquiry_component_1 = require("../../components/modal/enquiry/enquiry.component");
/**
 *  My Modules
 */
var form_field_module_1 = require("../../modules/form-fields/form-field.module");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                dashboard_routing_module_1.DashboardRoutingModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                form_field_module_1.FormFieldsModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                villa_component_1.VillaComponent,
                dashboard_filter_component_1.DashboardfilterComponent,
                datetimepicker_field_component_1.DatetimefieldComponent,
                select_component_1.SelectfieldComponent,
                enquiry_component_1.EnquiryComponent
            ],
            providers: [dashboard_service_1.DashboardService, properties_service_1.PropertiesService, lookups_service_1.LookupsService, enquiry_service_1.EnquiryService]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map