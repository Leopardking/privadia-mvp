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
var enquiry_service_1 = require("../../../providers/enquery/enquiry.service");
var ProposalComponent = (function () {
    function ProposalComponent(builder, loginService, enquiryService) {
        this.builder = builder;
        this.loginService = loginService;
        this.enquiryService = enquiryService;
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
        this.proposalForm = builder.group({
            CustomerName: new forms_1.FormControl({ value: 'Customer Name', disabled: true }),
            PropertyName: new forms_1.FormControl({ value: 'Property Name', disabled: true }),
            CheckIn: new forms_1.FormControl({ value: '06/27/2017', disabled: true }),
            CheckOut: new forms_1.FormControl({ value: '06/29/2017', disabled: true }),
            RentalPrice: new forms_1.FormControl({ value: '1500', disabled: true }),
            TermsPdf: new forms_1.FormControl({ value: 'Customer Name', disabled: true }),
            TermsList: new forms_1.FormArray([
                new forms_1.FormControl({ value: 'Term 1', disabled: true }),
                new forms_1.FormControl({ value: 'Term 2', disabled: true }),
                new forms_1.FormControl({ value: 'Term 3', disabled: true }),
                new forms_1.FormControl({ value: 'Term 4', disabled: true }),
            ]),
            Payment: new forms_1.FormGroup({
                PayUpfront: new forms_1.FormControl({ value: 40, disabled: true }),
                PayPercent: new forms_1.FormControl({ value: 40, disabled: true }),
                PayWeeks: new forms_1.FormControl({ value: 2, disabled: true }),
            }),
            PolicyPdf: new forms_1.FormControl({ value: 'Customer Name', disabled: true })
        });
    }
    ProposalComponent.prototype.ngOnInit = function () {
        console.log('Data Proposal', this.data);
        console.log('Proposal Form', this.proposalForm);
        console.log('Proposal Manager Form', this.proposalManagerForm);
        this.proposalManagerForm = this.builder.group({
            EnquiryMessageThreadId: new forms_1.FormControl(this.data.Id),
            CheckIn: new forms_1.FormControl(this.data.Enquiry.CheckIn),
            CheckOut: new forms_1.FormControl(this.data.Enquiry.CheckOut),
            CustomerName: new forms_1.FormControl({ value: this.data.Enquiry.ClientName, disabled: false }),
            PropertyName: new forms_1.FormControl({ value: this.data.Enquiry.PropertyName, disabled: false }),
            RentalCost: new forms_1.FormControl(1500),
            Fees: new forms_1.FormControl(11),
            ExchangeFeePercentage: new forms_1.FormControl(10),
            TermsList: new forms_1.FormArray([]),
            DepositPercentage: new forms_1.FormControl(40),
            BalancePercentage: new forms_1.FormControl(40),
            BalanceDaysBeforeCheckIn: new forms_1.FormControl(2),
            DefaultTerms: new forms_1.FormControl({
                Id: 0,
                Name: 'Default Contract'
            }),
            CancellationPolicy: new forms_1.FormControl({
                Id: 0,
                Name: 'Default Contract'
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
        console.log('Create Proposal');
        this.enquiryService.createProposal({ EnquiryMessageThreadId: this.data.Id });
    };
    ProposalComponent.prototype.acceptProposal = function () {
        console.log('Accept Proposal');
    };
    ProposalComponent.prototype.submitProposal = function () {
        console.log('Submit Proposal Form', this.proposalManagerForm);
        console.log('Submit Proposal');
        /*
        this.proposalsService.submitProposals(this.proposalManagerForm.value).subscribe(
            d => {
                console.log('Submit Proposal ', d)
            },
            e => {
                console.log('Submit Proposal Error', e)
            }
        )
        */
    };
    ProposalComponent.prototype.saveProposal = function () {
        console.log('Save Proposal');
        /*
        this.proposalsService.saveProposals({EnquiryMessageThreadId: this.data.Id}).subscribe(
            d => {
                console.log('Submit Proposal ', d)
            },
            e => {
                console.log('Submit Proposal Error', e)
            }
        )
        */
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
        __metadata('design:paramtypes', [forms_1.FormBuilder, login_service_1.LoginService, enquiry_service_1.EnquiryService])
    ], ProposalComponent);
    return ProposalComponent;
}());
exports.ProposalComponent = ProposalComponent;
//# sourceMappingURL=proposal.component.js.map