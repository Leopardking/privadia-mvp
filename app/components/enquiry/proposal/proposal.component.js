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
var ProposalComponent = (function () {
    function ProposalComponent(builder, loginService, enquiryService, proposalsService) {
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
        console.log('Data ', this.data);
        /*
        this.proposalForm = builder.group({
            CustomerName: new FormControl({ value: 'Customer Name', disabled: true}),
            PropertyName: new FormControl({ value: 'Property Name', disabled: true}),
            CheckIn: new FormControl({ value: '06/27/2017', disabled: true}),
            CheckOut: new FormControl({ value: '06/29/2017', disabled: true}),
            RentalPrice: new FormControl({ value: '1500', disabled: true}),
            TermsPdf: new FormControl({ value: 'Customer Name', disabled: true}),
            TermsList: new FormArray([
                new FormControl({ value: 'Term 1', disabled: true}),
                new FormControl({ value: 'Term 2', disabled: true}),
                new FormControl({ value: 'Term 3', disabled: true}),
                new FormControl({ value: 'Term 4', disabled: true}),
            ]),
            Payment: new FormGroup({
                PayUpfront: new FormControl({ value: 40, disabled: true}),
                PayPercent: new FormControl({ value: 40, disabled: true}),
                PayWeeks: new FormControl({ value: 2, disabled: true}),
            }),
            PolicyPdf: new FormControl({ value: 'Customer Name', disabled: true})
        });
        */
    }
    ProposalComponent.prototype.ngOnInit = function () {
        console.log('Data Proposal');
        console.log('Proposal Form', this.proposalForm);
        console.log('Proposal Manager Form', this.proposalManagerForm);
        this.initForm(this.data);
    };
    ProposalComponent.prototype.initForm = function (data) {
        this.proposalManagerForm = this.builder.group({
            EnquiryMessageThreadId: new forms_1.FormControl(this.data.Id),
            CheckIn: new forms_1.FormControl({ value: moment(data.Enquiry.CheckIn).format('MM/DD/YYYY'), disabled: true }),
            CheckOut: new forms_1.FormControl({ value: moment(data.Enquiry.CheckOut).format('MM/DD/YYYY'), disabled: true }),
            CustomerName: new forms_1.FormControl({ value: data.Enquiry.ClientName, disabled: true }),
            PropertyName: new forms_1.FormControl({ value: data.Enquiry.PropertyName, disabled: true }),
            RentalCost: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.RentalCost || 0,
                disabled: this.isAgent
            }),
            Fees: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.Fees || 0,
                disabled: this.isAgent
            }),
            ExchangeFeePercentage: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.ExchangeFeePercentage || 0,
                disabled: this.isAgent
            }),
            TermsList: new forms_1.FormArray([]),
            DepositPercentage: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.DepositPercentage || null,
                disabled: this.isAgent
            }),
            BalancePercentage: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalancePercentage || 0,
                disabled: this.isAgent
            }),
            BalanceDaysBeforeCheckIn: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalanceDaysBeforeCheckIn || 0,
                disabled: this.isAgent
            }),
            DefaultTerms: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.DefaultTerms || null,
                disabled: this.isAgent
            }),
            CancellationPolicy: new forms_1.FormControl({
                value: data.Enquiry.Proposal && data.Enquiry.Proposal.CancellationPolicy || null,
                disabled: this.isAgent
            }),
        });
    };
    ProposalComponent.prototype.onSubmitManager = function () {
    };
    ProposalComponent.prototype.addTerm = function () {
        var control = this.proposalManagerForm.controls['TermsList'];
        control.push(new forms_1.FormControl('Term 1'));
        console.log('Add Term');
    };
    ProposalComponent.prototype.removeTerm = function (i) {
        var control = this.proposalManagerForm.controls['TermsList'];
        control.removeAt(i);
        console.log('remove Term');
    };
    ProposalComponent.prototype.createProposal = function () {
        var _this = this;
        console.log('Create Proposal set', this.enquiryService.enquiry);
        console.log('Create Proposal', this.proposalManagerForm);
        this.enquiryService.createProposal({ EnquiryMessageThreadId: this.data.Id });
        setTimeout(function () {
            _this.initForm(_this.enquiryService.enquiry);
        }, 500);
    };
    ProposalComponent.prototype.acceptProposal = function () {
        console.log('Accept Proposal');
    };
    ProposalComponent.prototype.submitProposal = function () {
        var _this = this;
        this.enquiryService.submitProposal({ EnquiryMessageThreadId: this.data.Id });
        setTimeout(function () {
            _this.initForm(_this.enquiryService.enquiry);
        }, 1000);
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
        console.log('Decline Proposal');
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
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService, enquiry_service_1.EnquiryService, proposals_service_1.ProposalsService])
    ], ProposalComponent);
    return ProposalComponent;
}());
exports.ProposalComponent = ProposalComponent;
//# sourceMappingURL=proposal.component.js.map