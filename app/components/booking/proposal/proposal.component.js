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
var ProposalComponent = (function () {
    function ProposalComponent(builder, loginService, 
        // private enquiryService: EnquiryService,
        proposalsService) {
        this.builder = builder;
        this.loginService = loginService;
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
        /*
        const date = moment('2017-07-10T14:23:28+00:00').utcOffset(moment().utcOffset());
        console.log('Date ', date.format())
        console.log('Moment ', moment().utc().format())
        console.log('Moment ', moment().utcOffset())
        */
    };
    ProposalComponent.prototype.initForm = function (data) {
        // this.proposalManagerForm = this.builder.group({
        // 	EnquiryMessageThreadId: new FormControl(this.data.Id),
        // 	CheckIn: new FormControl({ value: moment(data.Enquiry.CheckIn).format('MM/DD/YYYY'), disabled: this.isAgent}),
        // 	CheckOut: new FormControl({ value: moment(data.Enquiry.CheckOut).format('MM/DD/YYYY'), disabled: this.isAgent}),
        // 	CustomerName: new FormControl({ value: data.Enquiry.ClientName, disabled: true}),
        // 	PropertyName: new FormControl({ value: data.Enquiry.PropertyName, disabled: true}),
        // 	RentalCost: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.RentalCost || 0,
        // 		disabled: this.isAgent
        // 	}),
        // 	Fees: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.Fees || 0,
        // 		disabled: this.isAgent
        // 	}),
        // 	ExchangeFeePercentage: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.ExchangeFeePercentage || 0,
        // 		disabled: this.isAgent
        // 	}),
        // 	TermsList: new FormArray([
        // 		/*new FormControl('Term 1'),
        // 		new FormControl('Term 2'),
        // 		new FormControl('Term 3'),
        // 		new FormControl('Term 4'),*/
        // 	]),
        // 	DepositPercentage: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.DepositPercentage || null,
        // 		disabled: this.isAgent
        // 	}),
        // 	BalancePercentage: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalancePercentage || 0,
        // 		disabled: this.isAgent
        // 	}),
        // 	BalanceDaysBeforeCheckIn: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalanceDaysBeforeCheckIn || 0,
        // 		disabled: this.isAgent
        // 	}),
        // 	DefaultTerms: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.DefaultTerms || null,
        // 		disabled: this.isAgent
        // 	}),
        // 	CancellationPolicy: new FormControl({
        // 		value: data.Enquiry.Proposal && data.Enquiry.Proposal.CancellationPolicy || null,
        // 		disabled: this.isAgent
        // 	}),
        // })
    };
    ProposalComponent.prototype.addTerm = function () {
        // const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
        // control.push(new FormControl('Term 1'));
    };
    ProposalComponent.prototype.removeTerm = function (i) {
        // const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
        // control.removeAt(i);
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
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService, proposals_service_1.ProposalsService])
    ], ProposalComponent);
    return ProposalComponent;
}());
exports.ProposalComponent = ProposalComponent;
//# sourceMappingURL=proposal.component.js.map