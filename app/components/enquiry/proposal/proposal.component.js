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
var ProposalComponent = (function () {
    function ProposalComponent(builder) {
        this.builder = builder;
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
        this.proposalManagerForm = builder.group({
            CustomerName: new forms_1.FormControl({ value: 'Customer Name', disabled: true }),
            PropertyName: new forms_1.FormControl({ value: 'Property Name', disabled: true }),
            CheckIn: new forms_1.FormControl('06/27/2017'),
            CheckOut: new forms_1.FormControl('06/29/2017'),
            RentalPrice: new forms_1.FormControl('1500'),
            FeesPrice: new forms_1.FormControl('100'),
            TermsPdf: new forms_1.FormControl('Customer Name'),
            TermsContract: new forms_1.FormArray([
                new forms_1.FormGroup({
                    Id: new forms_1.FormControl(1),
                    Name: new forms_1.FormControl('Contract'),
                }),
                new forms_1.FormGroup({
                    Id: new forms_1.FormControl(2),
                    Name: new forms_1.FormControl('Contract 2'),
                }),
                new forms_1.FormGroup({
                    Id: new forms_1.FormControl(3),
                    Name: new forms_1.FormControl('Contract 3'),
                }),
                new forms_1.FormGroup({
                    Id: new forms_1.FormControl(4),
                    Name: new forms_1.FormControl('Contract 4'),
                }),
            ]),
            TermsContractGroup: new forms_1.FormControl({
                Id: 1,
                Name: 'Contract',
            }),
            TermsList: new forms_1.FormArray([]),
            Payment: new forms_1.FormGroup({
                PayUpfront: new forms_1.FormControl(40),
                PayPercent: new forms_1.FormControl(40),
                PayWeeks: new forms_1.FormControl(2),
            }),
            PolicyPdf: new forms_1.FormControl('Customer Name')
        });
    }
    ProposalComponent.prototype.ngOnInit = function () {
        console.log('Data Proposal', this.data);
        console.log('Proposal Form', this.proposalForm);
        console.log('Proposal Manager Form', this.proposalManagerForm);
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
    ProposalComponent.prototype.acceptProposal = function () {
        console.log('Accept Proposal');
    };
    ProposalComponent.prototype.submitProposal = function () {
        console.log('Submit Proposal Form', this.proposalManagerForm);
        console.log('Submit Proposal');
    };
    ProposalComponent.prototype.saveProposal = function () {
        console.log('Save Proposal');
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
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ProposalComponent);
    return ProposalComponent;
}());
exports.ProposalComponent = ProposalComponent;
//# sourceMappingURL=proposal.component.js.map