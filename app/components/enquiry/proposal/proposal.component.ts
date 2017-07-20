import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {LoginService} from "../../../providers/login/login.service";
import {ProposalsService} from "../../../providers/proposals/proposals.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";
import {Router} from "@angular/router";

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
	public isAgent = this.loginService.getRoles('Agent');
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

	constructor( private router: Router,
				 private builder: FormBuilder,
				 private loginService: LoginService,
				 private enquiryService: EnquiryService,
				 private proposalsService: ProposalsService ) {
    }

	ngOnInit() {
		this.initForm(this.data);
    }

    private initForm(data) {
		this.proposalManagerForm = this.builder.group({
			EnquiryMessageThreadId: new FormControl(this.data.Id),
			CheckIn: new FormControl({ value: moment(data.Enquiry.CheckIn).format('MM/DD/YYYY'), disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)}),
			CheckOut: new FormControl({ value: moment(data.Enquiry.CheckOut).format('MM/DD/YYYY'), disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)}),
			CustomerName: new FormControl({ value: data.Enquiry.ClientName, disabled: true}),
			PropertyName: new FormControl({ value: data.Enquiry.PropertyName, disabled: true}),
			RentalCost: new FormControl({
				value: Math.round(data.Enquiry.Proposal && data.Enquiry.Proposal.RentalCost * 100) / 100 || 0,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			Fees: new FormControl({
				value:Math.round(data.Enquiry.Proposal && data.Enquiry.Proposal.Fees * 100) / 100 || 0,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			ExchangeFeePercentage: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.ExchangeFeePercentage || 0,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			TermsList: new FormArray([
				/*new FormControl('Term 1'),
				new FormControl('Term 2'),
				new FormControl('Term 3'),
				new FormControl('Term 4'),*/
			]),
			DepositPercentage: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.DepositPercentage || null,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			BalancePercentage: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalancePercentage || 0,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			BalanceDaysBeforeCheckIn: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalanceDaysBeforeCheckIn || 0,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			DefaultTerms: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.DefaultTerms || null,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
			CancellationPolicy: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.CancellationPolicy || null,
				disabled: this.isAgent || (data.Enquiry.Proposal && data.Enquiry.Proposal.AcceptedAt)
			}),
		})
	}

    private addTerm() {
		const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
		control.push(new FormControl('Term 1'));
	}

    private removeTerm(i: number) {
		const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
		control.removeAt(i);
	}

	private createProposal() {
		this.enquiryService.createProposal({EnquiryMessageThreadId: this.data.Id});

		setTimeout(() => {
			this.initForm(this.enquiryService.enquiry)
		}, 500)
	}

	private acceptProposal() {
		this.enquiryService.acceptProposal({EnquiryMessageThreadId: this.data.Id});

		setTimeout(() => {
			this.initForm(this.enquiryService.enquiry)
			this.router.navigate(['/booking/forthcoming/' + this.enquiryService.enquiry.Enquiry.Proposal.BookingId]);
		}, 500)
    }

    private submitProposal() {
		this.enquiryService.submitProposal({EnquiryMessageThreadId: this.data.Id});

		setTimeout(() => {
			this.initForm(this.enquiryService.enquiry)
		}, 500)
    }

    private saveProposal() {
	    console.log('Save Proposal');
		this.proposalsService.saveProposals(this.proposalManagerForm.value).subscribe(
			d => {
				console.log('Submit Proposal ', d)
			},
			e => {
				console.log('Submit Proposal Error', e)
			}
		)
    }

    private declineProposal() {
		this.enquiryService.declineProposal({EnquiryThreadId: this.data.Id})
    }

    private cancelProposal() {
		this.enquiryService.cancelProposal({EnquiryThreadId: this.data.Id})
    }
}