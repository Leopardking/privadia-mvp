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
var initDatetimepickers = require("../../../../assets/js/init/initDatetimepickers.js");
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var properties_service_1 = require("../../../providers/properties/properties.service");
var EnquiryComponent = (function () {
    function EnquiryComponent(route, enquiryService, propertiesService) {
        var _this = this;
        this.route = route;
        this.enquiryService = enquiryService;
        this.propertiesService = propertiesService;
        route.params.subscribe(function (params) {
            _this.enquiryId = params['id'];
            enquiryService.readDataEnquiry(params['id']);
        });
    }
    EnquiryComponent.prototype.ngOnInit = function () {
        initDatetimepickers();
        setTimeout(function () {
            var selectQuery = $(".selectpicker");
            selectQuery.selectpicker();
            selectQuery.on('show.bs.select', function (e) {
                $('.dropdown-menu.inner').perfectScrollbar();
            });
        }, 10);
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
    };
    EnquiryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'enquiry-cmp',
            templateUrl: 'enquiry.component.html',
            styleUrls: ['enquiry.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, enquiry_service_1.EnquiryService, properties_service_1.PropertiesService])
    ], EnquiryComponent);
    return EnquiryComponent;
}());
exports.EnquiryComponent = EnquiryComponent;
//# sourceMappingURL=enquiry.component.js.map