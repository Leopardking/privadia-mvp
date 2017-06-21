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
var common_1 = require('@angular/common');
var homeservice_1 = require('../providers/homeservice');
var login_service_1 = require("../providers/login/login.service");
var properties_service_1 = require("../providers/properties/properties.service");
var booking_service_1 = require("../providers/booking/booking.service");
var layout_routing_module_1 = require('./layout-routing.module');
var layout_component_1 = require('./layout.component');
var header_component_1 = require('../shared/components/header/header.component');
var sidebar_component_1 = require('../shared/components/sidebar/sidebar.component');
var LayoutModule = (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                layout_routing_module_1.LayoutRoutingModule,
            ],
            declarations: [
                layout_component_1.LayoutComponent,
                header_component_1.HeaderComponent,
                sidebar_component_1.SidebarComponent,
            ],
            providers: [homeservice_1.MainService, login_service_1.LoginService, properties_service_1.PropertiesService, booking_service_1.BookingService]
        }), 
        __metadata('design:paramtypes', [])
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map