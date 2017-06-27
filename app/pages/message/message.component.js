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
var dashboard_service_1 = require('../../providers/dashboard/dashboard.service');
var forms_1 = require('@angular/forms');
var MessageComponent = (function () {
    function MessageComponent(dashboardService, builder) {
        this.dashboardService = dashboardService;
        this.builder = builder;
        this.enquiryForm = new forms_1.FormGroup({});
        this.proposalForm = new forms_1.FormGroup({});
    }
    MessageComponent.prototype.ngOnInit = function () {
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        $('.modal').appendTo("body");
        setTimeout(function () {
            $('.modal-content').perfectScrollbar();
        }, 100);
        this.enquiryForm = this.builder.group({
            FirstName: new forms_1.FormControl(),
            LastName: new forms_1.FormControl(),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            Message: new forms_1.FormControl(),
        });
        this.proposalForm = this.builder.group({
            ClientName: new forms_1.FormControl('Johnathan Robinson'),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            RentalPrice: new forms_1.FormControl(1200),
            BookingPrice: new forms_1.FormControl(1495),
        });
    };
    MessageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'message-cmp ',
            templateUrl: 'message.component.html',
            styleUrls: ['message.component.css']
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, forms_1.FormBuilder])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map