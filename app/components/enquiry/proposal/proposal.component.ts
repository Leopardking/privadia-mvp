import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {LoginService} from "../../../providers/login/login.service";

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

	constructor( private builder: FormBuilder,
				 private loginService: LoginService ) {
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

	    this.proposalManagerForm = builder.group({
	        CustomerName: new FormControl({ value: 'Customer Name', disabled: true}),
            PropertyName: new FormControl({ value: 'Property Name', disabled: true}),
	        CheckIn: new FormControl('06/27/2017'),
	        CheckOut: new FormControl('06/29/2017'),
	        RentalPrice: new FormControl('1500'),
            FeesPrice: new FormControl('100'),
	        TermsPdf: new FormControl('Customer Name'),
	        TermsContract: new FormArray([
	        	new FormGroup({
	        		Id: new FormControl(1),
					Name: new FormControl('Contract'),
				}),
	        	new FormGroup({
	        		Id: new FormControl(2),
					Name: new FormControl('Contract 2'),
				}),
	        	new FormGroup({
	        		Id: new FormControl(3),
					Name: new FormControl('Contract 3'),
				}),
	        	new FormGroup({
	        		Id: new FormControl(4),
					Name: new FormControl('Contract 4'),
				}),
			]),
			TermsContractGroup: new FormControl({
				Id: 1,
				Name: 'Contract',
			}),
	        TermsList: new FormArray([]),
	        Payment: new FormGroup({
                PayUpfront: new FormControl(40),
                PayPercent: new FormControl(40),
                PayWeeks: new FormControl(2),
            }),
	        PolicyPdf: new FormControl('Customer Name')
        })
    }

	ngOnInit() {
	    console.log('Data Proposal', this.data);
	    console.log('Proposal Form', this.proposalForm);
	    console.log('Proposal Manager Form', this.proposalManagerForm);
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

	private acceptProposal() {
	    console.log('Accept Proposal')
    }

    private submitProposal() {
		console.log('Submit Proposal Form', this.proposalManagerForm);
	    console.log('Submit Proposal')
    }

    private saveProposal() {
	    console.log('Save Proposal')
    }

    private declineProposal() {
	    console.log('Decline Proposal')
    }
}