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
/**
 *  Providers
 */
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
/**
 *  Components
 */
var enquiry_component_1 = require("./enquiry.component");
var enquiry_routing_module_1 = require('./enquiry-routing.module');
var ng2_cloudinary_1 = require("ng2-cloudinary");
var dialog_component_1 = require("../../../components/enquiry/dialog/dialog.component");
var forms_1 = require("@angular/forms");
var input_field_component_1 = require("../../../components/form-fields/input-field/input-field.component");
var EnquiryModule = (function () {
    function EnquiryModule() {
    }
    EnquiryModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                enquiry_routing_module_1.EnquiryRoutingModule,
                router_1.RouterModule,
                ng2_cloudinary_1.Ng2CloudinaryModule
            ],
            declarations: [
                enquiry_component_1.EnquiryComponent,
                dialog_component_1.DialogComponent,
                input_field_component_1.InputfieldComponent
            ],
            providers: [enquiry_service_1.EnquiryService]
        }), 
        __metadata('design:paramtypes', [])
    ], EnquiryModule);
    return EnquiryModule;
}());
exports.EnquiryModule = EnquiryModule;
//# sourceMappingURL=enquiry.module.js.map