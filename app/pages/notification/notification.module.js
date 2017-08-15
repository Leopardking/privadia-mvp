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
var enquiry_service_1 = require("../../providers/enquery/enquiry.service");
/**
 *  Components
 */
var notification_component_1 = require('./notification.component');
var notification_routing_module_1 = require('./notification-routing.module');
var ng2_cloudinary_1 = require("ng2-cloudinary");
// import { EnquiriesTableComponent } from "../../components/tables/enquiries/enquiries.component";
// import {ProposalsService} from "../../providers/proposals/proposals.service";
var NotificationModule = (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                notification_routing_module_1.NotificationRoutingModule,
                router_1.RouterModule,
                ng2_cloudinary_1.Ng2CloudinaryModule
            ],
            declarations: [
                notification_component_1.NotificationComponent,
            ],
            providers: [
                enquiry_service_1.EnquiryService,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map