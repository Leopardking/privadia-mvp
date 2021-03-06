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
var proposals_service_1 = require("../../../providers/proposals/proposals.service");
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var router_1 = require("@angular/router");
var ProposalComponent = (function () {
    function ProposalComponent(router, builder, loginService, enquiryService, proposalsService) {
        this.router = router;
        this.builder = builder;
        this.loginService = loginService;
        this.enquiryService = enquiryService;
        this.proposalsService = proposalsService;
        this.isAgent = this.loginService.getRoles('Agent');
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
    }
    ProposalComponent.prototype.ngOnInit = function () {
        this.initForm(this.data);
    };
    ProposalComponent.prototype.initForm = function (data) {
        this.proposalManagerForm = this.builder.group({
            EnquiryMessageThreadId: new forms_1.FormControl(this.data.Id),
            CheckIn: new forms_1.FormControl({ value: moment(data.Enquiry.CheckIn).format('DD/MM/YYYY'), disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt) }),
            CheckOut: new forms_1.FormControl({ value: moment(data.Enquiry.CheckOut).format('DD/MM/YYYY'), disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt) }),
            CustomerName: new forms_1.FormControl({ value: data.Enquiry.ClientName, disabled: true }),
            PropertyName: new forms_1.FormControl({ value: data.Enquiry.PropertyName, disabled: true }),
            RentalCost: new forms_1.FormControl({
                value: Math.round(data.Enquiry.Proposal && data.Enquiry.Proposal.RentalCost * 100) / 100 || 0,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            Fees: new forms_1.FormControl({
                value: Math.round(data.Enquiry.Proposal && data.Enquiry.Proposal.Fees * 100) / 100 || 0,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            ExchangeFeePercentage: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.ExchangeFeePercentage || 0,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            TermsList: new forms_1.FormArray([]),
            DepositPercentage: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.DepositPercentage || null,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            BalancePercentage: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalancePercentage || 0,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            BalanceDaysBeforeCheckIn: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalanceDaysBeforeCheckIn || 0,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            DefaultTerms: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.DefaultTerms || null,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
            CancellationPolicy: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.CancellationPolicy || null,
                disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
            }),
        });
    };
    ProposalComponent.prototype.addTerm = function () {
        var control = this.proposalManagerForm.controls['TermsList'];
        control.push(new forms_1.FormControl('Term 1'));
    };
    ProposalComponent.prototype.removeTerm = function (i) {
        var control = this.proposalManagerForm.controls['TermsList'];
        control.removeAt(i);
    };
    ProposalComponent.prototype.createProposal = function () {
        var _this = this;
        this.enquiryService.createProposal({ EnquiryMessageThreadId: this.data.Id });
        setTimeout(function () {
            _this.initForm(_this.enquiryService.enquiry);
        }, 500);
    };
    ProposalComponent.prototype.acceptProposal = function () {
        var _this = this;
        this.enquiryService.acceptProposal({ EnquiryMessageThreadId: this.data.Id });
        setTimeout(function () {
            _this.initForm(_this.enquiryService.enquiry);
            _this.router.navigate(['/booking/forthcoming/' + _this.enquiryService.enquiry.Enquiry.Proposal.BookingId]);
        }, 500);
    };
    ProposalComponent.prototype.submitProposal = function () {
        var _this = this;
        this.enquiryService.submitProposal({ EnquiryMessageThreadId: this.data.Id });
        setTimeout(function () {
            _this.initForm(_this.enquiryService.enquiry);
        }, 500);
    };
    ProposalComponent.prototype.saveProposal = function () {
        console.log('Save Proposal');
        this.proposalsService.saveProposals(this.proposalManagerForm.value).subscribe(function (d) {
            console.log('Submit Proposal ', d);
        }, function (e) {
            console.log('Submit Proposal Error', e);
        });
    };
    ProposalComponent.prototype.declineProposal = function () {
        this.enquiryService.declineProposal({ EnquiryThreadId: this.data.Id });
    };
    ProposalComponent.prototype.cancelProposal = function () {
        this.enquiryService.cancelProposal({ EnquiryThreadId: this.data.Id });
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
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, login_service_1.LoginService, enquiry_service_1.EnquiryService, proposals_service_1.ProposalsService])
    ], ProposalComponent);
    return ProposalComponent;
}());
exports.ProposalComponent = ProposalComponent;
//# sourceMappingURL=proposal.component.js.map