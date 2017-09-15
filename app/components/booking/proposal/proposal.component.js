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
var forms_1 = require("@angular/forms");
var login_service_1 = require("../../../providers/login/login.service");
var booking_service_1 = require("../../../providers/booking/booking.service");
var router_1 = require("@angular/router");
var ProposalComponent = (function () {
    function ProposalComponent(builder, loginService, bookingService, route) {
        var _this = this;
        this.builder = builder;
        this.loginService = loginService;
        this.bookingService = bookingService;
        this.route = route;
        this.isAgent = true;
        this.isCreateProposal = false;
        this.TermsContract = [{
                Id: 1,
                Name: 'Contract',
            }, {
                Id: 2,
                Name: 'Contract 2',
            }, {
                Id: 3,
                Name: 'Contract 3',
            }, {
                Id: 4,
                Name: 'Contract 4',
            }];
        route.params.subscribe(function (params) {
            _this.bookingId = params['id'];
        });
    }
    ProposalComponent.prototype.ngOnInit = function () {
        this.initForm(this.data);
    };
    ProposalComponent.prototype.initForm = function (data) {
        this.proposalManagerForm = this.builder.group({
            EnquiryMessageThreadId: new forms_1.FormControl(this.data.Id),
            CheckIn: new forms_1.FormControl({ value: moment(data.CheckIn).format('DD/MM/YYYY'), disabled: true }),
            CheckOut: new forms_1.FormControl({ value: moment(data.CheckOut).format('DD/MM/YYYY'), disabled: true }),
            CustomerName: new forms_1.FormControl({ value: data.ClientName, disabled: true }),
            PropertyName: new forms_1.FormControl({ value: data.PropertyName, disabled: true }),
            RentalCost: new forms_1.FormControl({
                value: Math.round(data.RentalCost * 100) / 100 || 0,
                disabled: this.isAgent
            }),
            Fees: new forms_1.FormControl({
                value: data.Fees || 0,
                disabled: true
            }),
            ExchangeFeePercentage: new forms_1.FormControl({
                value: data.ExchangeFeePercentage || 0,
                disabled: true
            }),
            TermsList: new forms_1.FormArray([]),
            DepositPercentage: new forms_1.FormControl({
                value: data.DepositPercentage || null,
                disabled: true
            }),
            BalancePercentage: new forms_1.FormControl({
                value: data.BalancePercentage || 0,
                disabled: true
            }),
            BalanceDaysBeforeCheckIn: new forms_1.FormControl({
                value: data.BalanceDaysBeforeCheckIn || 0,
                disabled: true
            }),
            DefaultTerms: new forms_1.FormControl({
                value: data.DefaultTerms || null,
                disabled: true
            }),
            CancellationPolicy: new forms_1.FormControl({
                value: data.CancellationPolicy || null,
                disabled: true
            }),
        });
    };
    ProposalComponent.prototype.signContract = function () {
        this.bookingService.readDataSignContract({ BookingId: this.bookingId });
    };
    ProposalComponent.prototype.createProposal = function () {
        // this.enquiryService.createProposal({EnquiryMessageThreadId: this.data.Id});
        //
        // setTimeout(() => {
        // 	this.initForm(this.enquiryService.enquiry)
        // }, 500)
    };
    ProposalComponent.prototype.acceptProposal = function () {
        // this.enquiryService.acceptProposal({EnquiryMessageThreadId: this.data.Id});
        // setTimeout(() => {
        // 	this.initForm(this.enquiryService.enquiry)
        // }, 500)
    };
    ProposalComponent.prototype.submitProposal = function () {
        // this.enquiryService.submitProposal({EnquiryMessageThreadId: this.data.Id});
        //
        // setTimeout(() => {
        // 	this.initForm(this.enquiryService.enquiry)
        // }, 500)
    };
    ProposalComponent.prototype.saveProposal = function () {
        // console.log('Save Proposal');
        // this.proposalsService.saveProposals(this.proposalManagerForm.value).subscribe(
        // 	d => {
        // 		console.log('Submit Proposal ', d)
        // 	},
        // 	e => {
        // 		console.log('Submit Proposal Error', e)
        // 	}
        // )
    };
    ProposalComponent.prototype.declineProposal = function () {
        //this.enquiryService.declineProposal({EnquiryThreadId: this.data.Id})
    };
    ProposalComponent.prototype.cancelProposal = function () {
        //this.enquiryService.cancelProposal({EnquiryThreadId: this.data.Id})
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProposalComponent.prototype, "data", void 0);
    ProposalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'proposal-cmp ',
            templateUrl: 'proposal.component.html',
            styleUrls: ['proposal.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService, booking_service_1.BookingService, router_1.ActivatedRoute])
    ], ProposalComponent);
    return ProposalComponent;
}());
exports.ProposalComponent = ProposalComponent;
//# sourceMappingURL=proposal.component.js.map