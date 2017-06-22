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
//import { RouterModule } from '@angular/router';
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var ng2_auto_complete_1 = require('ng2-auto-complete');
var ng2_cloudinary_1 = require('ng2-cloudinary');
var ng2_file_upload_1 = require('ng2-file-upload');
var _dashboard_routes_1 = require('./_dashboard.routes');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng2_auto_complete_1.Ng2AutoCompleteModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                ng2_file_upload_1.FileUploadModule,
                router_1.RouterModule.forRoot(_dashboard_routes_1.MODULE_ROUTES)
            ],
            declarations: [_dashboard_routes_1.MODULE_COMPONENTS]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=_dashboard.module.js.map