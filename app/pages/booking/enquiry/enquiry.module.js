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
var commons_module_1 = require('../commons/commons.module');
/**
 *  Providers
 */
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var messages_service_1 = require("../../../providers/messages/messages.service");
/**
 *  Components
 */
var enquiry_component_1 = require("./enquiry.component");
var enquiry_routing_module_1 = require('./enquiry-routing.module');
var dialog_component_1 = require("../../../components/enquiry/dialog/dialog.component");
var property_info_component_1 = require("../../../components/enquiry/property-info/property-info.component");
var proposal_component_1 = require("../../../components/enquiry/proposal/proposal.component");
/**
 *  My Modules
 */
var form_field_module_1 = require("../../../modules/form-fields/form-field.module");
var properties_service_1 = require("../../../providers/properties/properties.service");
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
var proposals_service_1 = require("../../../providers/proposals/proposals.service");
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
                ng2_cloudinary_1.Ng2CloudinaryModule,
                form_field_module_1.FormFieldsModule,
                commons_module_1.CommonsModule
            ],
            declarations: [
                enquiry_component_1.EnquiryComponent,
                dialog_component_1.DialogComponent,
                property_info_component_1.PropertyInfoComponent,
                proposal_component_1.ProposalComponent
            ],
            providers: [enquiry_service_1.EnquiryService, messages_service_1.MessagesService, properties_service_1.PropertiesService, lookups_service_1.LookupsService, proposals_service_1.ProposalsService]
        }), 
        __metadata('design:paramtypes', [])
    ], EnquiryModule);
    return EnquiryModule;
}());
exports.EnquiryModule = EnquiryModule;
//# sourceMappingURL=enquiry.module.js.map