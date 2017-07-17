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
var router_1 = require('@angular/router');
var properties_routes_1 = require('./properties.routes');
var common_1 = require("@angular/common");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var forms_1 = require("@angular/forms");
var dashboard_service_1 = require("../../providers/dashboard/dashboard.service");
var properties_service_1 = require("../../providers/properties/properties.service");
var lookups_service_1 = require("../../providers/lookups/lookups.service");
var form_field_module_1 = require("../../modules/form-fields/form-field.module");
var PropertiesModule = (function () {
    function PropertiesModule() {
    }
    PropertiesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                form_field_module_1.FormFieldsModule,
                router_1.RouterModule.forChild(properties_routes_1.MODULE_ROUTES)
            ],
            declarations: [properties_routes_1.MODULE_COMPONENTS],
            providers: [dashboard_service_1.DashboardService, properties_service_1.PropertiesService, lookups_service_1.LookupsService]
        }), 
        __metadata('design:paramtypes', [])
    ], PropertiesModule);
    return PropertiesModule;
}());
exports.PropertiesModule = PropertiesModule;
//# sourceMappingURL=properties.module.js.map