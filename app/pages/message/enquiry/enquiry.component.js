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
var EnquiryComponent = (function () {
    function EnquiryComponent(router) {
        this.router = router;
        router.events.subscribe(function (val) {
            var hash = window.location.hash;
            hash && $('ul.nav a[href="' + hash + '"]').tab('show');
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
        $('.messages-wrp').perfectScrollbar({
            'wheelPropagation': true
        });
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        setTimeout(function () {
            var dataTableQuery = $('#datatables');
            var tableWidget = dataTableQuery.DataTable({
                bLengthChange: false,
                ordering: false,
                info: false,
            });
        }, 10);
    };
    EnquiryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'enquiry-cmp',
            templateUrl: 'enquiry.component.html',
            styleUrls: ['enquiry.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], EnquiryComponent);
    return EnquiryComponent;
}());
exports.EnquiryComponent = EnquiryComponent;
//# sourceMappingURL=enquiry.component.js.map