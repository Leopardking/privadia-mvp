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
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var EnquiriesComponent = (function () {
    function EnquiriesComponent(router, enquiryService) {
        this.router = router;
        this.enquiryService = enquiryService;
        console.log('Load Enquiry Module');
        enquiryService.readDataEnquiries();
    }
    EnquiriesComponent.prototype.ngOnInit = function () {
        localStorage.setItem('title', '');
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    };
    EnquiriesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'enquiries-cmp',
            templateUrl: 'enquiries.component.html',
            styleUrls: ['enquiries.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, enquiry_service_1.EnquiryService])
    ], EnquiriesComponent);
    return EnquiriesComponent;
}());
exports.EnquiriesComponent = EnquiriesComponent;
//# sourceMappingURL=enquiries.component.js.map