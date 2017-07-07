import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {LoginService} from "../../../providers/login/login.service";
import {ProposalsService} from "../../../providers/proposals/proposals.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'proposal-cmp ',
    templateUrl: 'proposal.component.html',
    styleUrls: [ 'proposal.component.css' ]
})  

export class ProposalComponent implements OnInit{
    @Input() private data;
    public proposalForm: FormGroup;
    public proposalManagerForm: FormGroup;
    public isCreateProposal = false;

    public TermsContract = [{
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

	constructor( private builder: FormBuilder,
				 private loginService: LoginService,
				 private enquiryService: EnquiryService ) {
		console.log('Data ', this.data)
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

    }

	ngOnInit() {
	    console.log('Data Proposal', this.data);
	    console.log('Proposal Form', this.proposalForm);
	    console.log('Proposal Manager Form', this.proposalManagerForm);

	    this.proposalManagerForm = this.builder.group({
			EnquiryMessageThreadId: new FormControl(this.data.Id),
			CheckIn: new FormControl(this.data.Enquiry.CheckIn),
			CheckOut: new FormControl(this.data.Enquiry.CheckOut),
			CustomerName: new FormControl({ value: this.data.Enquiry.ClientName, disabled: false}),
			PropertyName: new FormControl({ value: this.data.Enquiry.PropertyName, disabled: false}),
			RentalCost: new FormControl(1500),
			Fees: new FormControl(11),
			ExchangeFeePercentage: new FormControl(10),
			TermsList: new FormArray([]),
			DepositPercentage: new FormControl(40),
			BalancePercentage: new FormControl(40),
			BalanceDaysBeforeCheckIn: new FormControl(2),
			DefaultTerms: new FormControl({
				Id: 0,
				Name: 'Default Contract'
			}),
			CancellationPolicy: new FormControl({
				Id: 0,
				Name: 'Default Contract'
			}),
		})
    }

    private onSubmitManager() {
	}
    private addTerm() {
		const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
		control.push(new FormControl('Term 1'));
		console.log('Add Term')
	}

    private removeTerm(i: number) {
		const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
		control.removeAt(i);
		console.log('remove Term')
	}

	private createProposal() {
		console.log('Create Proposal')
		this.enquiryService.createProposal({EnquiryMessageThreadId: this.data.Id});
	}

	private acceptProposal() {
	    console.log('Accept Proposal')
    }

    private submitProposal() {
		console.log('Submit Proposal Form', this.proposalManagerForm);
	    console.log('Submit Proposal')
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
    }

    private saveProposal() {
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
    }

    private declineProposal() {
	    console.log('Decline Proposal')
    }
}